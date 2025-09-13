import { useState, useEffect } from 'preact/hooks';
import type { JSXInternal } from 'preact/src/jsx';

interface RTLSettings {
  enabled: boolean;
  sensitivity: 'high' | 'medium' | 'low';
  forceDirection: 'auto' | 'rtl' | 'ltr';
  autoDetect: boolean;
  customSelectors: string[];
}

export function RTLSetting(): JSXInternal.Element {
  const [settings, setSettings] = useState<RTLSettings>({
    enabled: true,
    sensitivity: 'medium',
    forceDirection: 'auto',
    autoDetect: true,
    customSelectors: [
      '.note-content',
      '.note-editor',
      'textarea',
      '.markdown-content',
      '.note-text'
    ]
  });
  
  const [customSelector, setCustomSelector] = useState('');
  const i18n = window.Blinko.i18n;

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('blinko-rtl-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Failed to load RTL plugin settings:', error);
      }
    }
  }, []);

  const saveSettings = (newSettings: Partial<RTLSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('blinko-rtl-settings', JSON.stringify(updatedSettings));
    
    // Notify main plugin of settings change
    window.dispatchEvent(
      new CustomEvent('rtl-settings-changed', {
        detail: updatedSettings
      })
    );
    
    window.Blinko.toast.success(i18n.t('settings_saved') || 'Settings saved!');
  };

  const addCustomSelector = () => {
    if (customSelector.trim() && !settings.customSelectors.includes(customSelector.trim())) {
      saveSettings({
        customSelectors: [...settings.customSelectors, customSelector.trim()]
      });
      setCustomSelector('');
    }
  };

  const removeCustomSelector = (selector: string) => {
    saveSettings({
      customSelectors: settings.customSelectors.filter(s => s !== selector)
    });
  };

  const resetToDefaults = () => {
    const defaultSettings: RTLSettings = {
      enabled: true,
      sensitivity: 'medium',
      forceDirection: 'auto',
      autoDetect: true,
      customSelectors: [
        '.note-content',
        '.note-editor',
        'textarea',
        '.markdown-content',
        '.note-text'
      ]
    };
    saveSettings(defaultSettings);
  };

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      padding: '20px', 
      fontFamily: 'system-ui, sans-serif' 
    }}>
      <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '2px solid #eee' }}>
        <h2 style={{ margin: '0 0 10px 0', color: '#333' }}>
          {i18n.t('rtl_support')} {i18n.t('settings')}
        </h2>
        <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
          {i18n.t('plugin_description')}
        </p>
      </div>

      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        background: '#fafafa' 
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>General Settings</h3>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.enabled}
              onChange={(e) => saveSettings({ enabled: (e.target as HTMLInputElement).checked })}
              style={{ margin: '0' }}
            />
            <span>{i18n.t('auto_detect')}</span>
          </label>
          <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#666', fontStyle: 'italic' }}>
            Automatically detect and apply RTL styling to content
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500' }}>
            Detection Sensitivity:
            <select
              value={settings.sensitivity}
              onChange={(e) => saveSettings({ 
                sensitivity: (e.target as HTMLSelectElement).value as 'high' | 'medium' | 'low' 
              })}
              disabled={!settings.enabled}
              style={{ 
                marginLeft: 'auto', 
                padding: '5px 10px', 
                border: '1px solid #ccc', 
                borderRadius: '4px', 
                minWidth: '200px' 
              }}
            >
              <option value="high">{i18n.t('high')} - 10% RTL characters</option>
              <option value="medium">{i18n.t('medium')} - 20% RTL characters</option>
              <option value="low">{i18n.t('low')} - 40% RTL characters</option>
            </select>
          </label>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500' }}>
            Direction Override:
            <select
              value={settings.forceDirection}
              onChange={(e) => saveSettings({ 
                forceDirection: (e.target as HTMLSelectElement).value as 'auto' | 'rtl' | 'ltr' 
              })}
              disabled={!settings.enabled}
              style={{ 
                marginLeft: 'auto', 
                padding: '5px 10px', 
                border: '1px solid #ccc', 
                borderRadius: '4px', 
                minWidth: '200px' 
              }}
            >
              <option value="auto">{i18n.t('auto')}</option>
              <option value="rtl">{i18n.t('force_rtl')}</option>
              <option value="ltr">{i18n.t('force_ltr')}</option>
            </select>
          </label>
        </div>
      </div>

      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        background: '#fafafa' 
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>CSS Selectors</h3>
        <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#666' }}>
          Define which elements should be processed for RTL detection
        </p>

        <div style={{ marginBottom: '15px' }}>
          {settings.customSelectors.map((selector, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '8px 12px', 
              marginBottom: '5px', 
              background: 'white', 
              border: '1px solid #ddd', 
              borderRadius: '4px' 
            }}>
              <code style={{ 
                fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace', 
                fontSize: '13px', 
                color: '#333' 
              }}>
                {selector}
              </code>
              <button
                type="button"
                onClick={() => removeCustomSelector(selector)}
                disabled={!settings.enabled}
                style={{ 
                  background: '#ff4757', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '50%', 
                  width: '24px', 
                  height: '24px', 
                  cursor: 'pointer', 
                  fontSize: '16px', 
                  lineHeight: '1' 
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={customSelector}
            onChange={(e) => setCustomSelector((e.target as HTMLInputElement).value)}
            placeholder="Enter CSS selector (e.g., .my-content)"
            disabled={!settings.enabled}
            onKeyPress={(e) => e.key === 'Enter' && addCustomSelector()}
            style={{ 
              flex: '1', 
              padding: '8px 12px', 
              border: '1px solid #ccc', 
              borderRadius: '4px' 
            }}
          />
          <button
            type="button"
            onClick={addCustomSelector}
            disabled={!settings.enabled || !customSelector.trim()}
            style={{ 
              padding: '8px 16px', 
              background: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Add Selector
          </button>
        </div>
      </div>

      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        background: '#fafafa' 
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Advanced</h3>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={resetToDefaults}
            style={{ 
              padding: '10px 20px', 
              background: '#dc3545', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer', 
              fontWeight: '500' 
            }}
          >
            Reset to Defaults
          </button>

          <button
            type="button"
            onClick={() => {
              const settingsData = JSON.stringify(settings, null, 2);
              navigator.clipboard.writeText(settingsData);
              window.Blinko.toast.success('Settings copied to clipboard');
            }}
            style={{ 
              padding: '10px 20px', 
              background: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer', 
              fontWeight: '500' 
            }}
          >
            Export Settings
          </button>
        </div>
      </div>
    </div>
  );
}