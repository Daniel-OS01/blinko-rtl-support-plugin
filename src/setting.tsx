import { useState, useEffect } from 'preact/hooks';
import type { JSXInternal } from 'preact/src/jsx';

interface RTLSettings {
  enabled: boolean;
  sensitivity: 'high' | 'medium' | 'low';
  forceDirection: 'auto' | 'rtl' | 'ltr';
  autoDetect: boolean;
  enhancedMode: boolean;
  vditorSupport: boolean;
  markdownSupport: boolean;
  customSelectors: string[];
  minRTLChars: number;
  layoutPreservation: boolean;
  unicodeBidiMode: 'plaintext' | 'embed' | 'bidi-override';
}

export function RTLSetting(): JSXInternal.Element {
  const [settings, setSettings] = useState<RTLSettings>({
    enabled: true,
    sensitivity: 'medium',
    forceDirection: 'auto',
    autoDetect: true,
    enhancedMode: true,
    vditorSupport: true,
    markdownSupport: true,
    customSelectors: [
      '.note-content',
      '.note-editor',
      'textarea',
      '.markdown-content',
      '.note-text',
      '.vditor-reset',
      '.content',
      '[contenteditable]'
    ],
    minRTLChars: 3,
    layoutPreservation: true,
    unicodeBidiMode: 'plaintext'
  });
  
  const [customSelector, setCustomSelector] = useState('');
  const [testText, setTestText] = useState('');
  const [testResult, setTestResult] = useState('');
  const i18n = window.Blinko.i18n;

  useEffect(() => {
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
    
    window.dispatchEvent(
      new CustomEvent('rtl-settings-changed', {
        detail: updatedSettings
      })
    );
    
    window.Blinko.toast.success('Settings saved!');
  };

  const testRTL = () => {
    if (!testText.trim()) return;
    const result = (window as any).blinkoRTL?.test(testText);
    setTestResult(result ? 'RTL' : 'LTR');
  };

  const processAllContent = () => {
    (window as any).blinkoRTL?.processAllElements();
    window.Blinko.toast.success('All content processed!');
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
      enhancedMode: true,
      vditorSupport: true,
      markdownSupport: true,
      customSelectors: [
        '.note-content',
        '.note-editor',
        'textarea',
        '.markdown-content',
        '.note-text',
        '.vditor-reset',
        '.content',
        '[contenteditable]'
      ],
      minRTLChars: 3,
      layoutPreservation: true,
      unicodeBidiMode: 'plaintext'
    };
    saveSettings(defaultSettings);
  };

  return (
    <div style={{ 
      maxWidth: '700px', 
      margin: '0 auto', 
      padding: '20px', 
      fontFamily: 'system-ui, sans-serif' 
    }}>
      <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '2px solid #eee' }}>
        <h2 style={{ margin: '0 0 10px 0', color: '#333' }}>
          Enhanced RTL Language Support Settings
        </h2>
        <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
          Comprehensive RTL support for Hebrew, Arabic, and other right-to-left languages with special attention to vditor, markdown-body, and text elements.
        </p>
      </div>

      {/* General Settings */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        background: '#fafafa' 
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>General Settings</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.enabled}
              onChange={(e) => saveSettings({ enabled: (e.target as HTMLInputElement).checked })}
            />
            <span>Enable RTL Support</span>
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.autoDetect}
              onChange={(e) => saveSettings({ autoDetect: (e.target as HTMLInputElement).checked })}
              disabled={!settings.enabled}
            />
            <span>Auto-detect New Content</span>
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.enhancedMode}
              onChange={(e) => saveSettings({ enhancedMode: (e.target as HTMLInputElement).checked })}
              disabled={!settings.enabled}
            />
            <span>Enhanced Mode (Comprehensive CSS)</span>
          </label>
        </div>
      </div>

      {/* Detection Settings */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        background: '#fafafa' 
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Detection Settings</h3>

        <div style={{ marginBottom: '15px' }}>
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
              <option value="high">High - 10% RTL characters</option>
              <option value="medium">Medium - 20% RTL characters</option>
              <option value="low">Low - 40% RTL characters</option>
            </select>
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500' }}>
            Min RTL Characters:
            <input
              type="number"
              min="1"
              max="20"
              value={settings.minRTLChars}
              onChange={(e) => saveSettings({ minRTLChars: parseInt((e.target as HTMLInputElement).value) })}
              disabled={!settings.enabled}
              style={{ 
                marginLeft: 'auto', 
                padding: '5px 10px', 
                border: '1px solid #ccc', 
                borderRadius: '4px', 
                width: '80px' 
              }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
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
              <option value="auto">Auto-detect</option>
              <option value="rtl">Force RTL</option>
              <option value="ltr">Force LTR</option>
            </select>
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500' }}>
            Unicode Bidi Mode:
            <select
              value={settings.unicodeBidiMode}
              onChange={(e) => saveSettings({ 
                unicodeBidiMode: (e.target as HTMLSelectElement).value as 'plaintext' | 'embed' | 'bidi-override' 
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
              <option value="plaintext">Plaintext (Recommended)</option>
              <option value="embed">Embed</option>
              <option value="bidi-override">Bidi Override</option>
            </select>
          </label>
        </div>
      </div>

      {/* Component Support */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        background: '#fafafa' 
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Component Support</h3>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.vditorSupport}
              onChange={(e) => saveSettings({ vditorSupport: (e.target as HTMLInputElement).checked })}
              disabled={!settings.enabled}
            />
            <span>Vditor Editor Support</span>
          </label>
          <p style={{ margin: '5px 0 0 30px', fontSize: '12px', color: '#666' }}>
            Enhanced RTL support for Vditor markdown editor
          </p>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.markdownSupport}
              onChange={(e) => saveSettings({ markdownSupport: (e.target as HTMLInputElement).checked })}
              disabled={!settings.enabled}
            />
            <span>Markdown Body Support</span>
          </label>
          <p style={{ margin: '5px 0 0 30px', fontSize: '12px', color: '#666' }}>
            Special attention to markdown-body elements and paragraphs
          </p>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.layoutPreservation}
              onChange={(e) => saveSettings({ layoutPreservation: (e.target as HTMLInputElement).checked })}
              disabled={!settings.enabled}
            />
            <span>Layout Preservation</span>
          </label>
          <p style={{ margin: '5px 0 0 30px', fontSize: '12px', color: '#666' }}>
            Prevent layout shifting by preserving container structure
          </p>
        </div>
      </div>

      {/* CSS Selectors */}
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
            Add
          </button>
        </div>
      </div>

      {/* Testing */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        background: '#fafafa' 
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Test RTL Detection</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <textarea
            value={testText}
            onChange={(e) => setTestText((e.target as HTMLTextAreaElement).value)}
            placeholder="Enter text to test RTL detection..."
            style={{ 
              width: '100%', 
              height: '80px', 
              padding: '10px', 
              border: '1px solid #ccc', 
              borderRadius: '4px',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <button 
            onClick={testRTL}
            style={{ 
              background: '#28a745', 
              color: 'white', 
              border: 'none', 
              padding: '8px 16px', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Test Detection
          </button>
          
          <button 
            onClick={processAllContent}
            disabled={!settings.enabled}
            style={{ 
              background: '#17a2b8', 
              color: 'white', 
              border: 'none', 
              padding: '8px 16px', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Process All Content
          </button>
        </div>

        {testResult && (
          <div style={{ 
            padding: '10px', 
            background: '#f8f9fa', 
            borderRadius: '4px',
            borderLeft: '4px solid #007bff',
            marginBottom: '15px'
          }}>
            Detection Result: <strong>{testResult}</strong>
          </div>
        )}

        <div style={{ fontSize: '14px', color: '#666' }}>
          <strong>Test Examples:</strong><br/>
          Hebrew: שלום עולם - זהו טקסט בעברית<br/>
          Arabic: مرحبا بالعالم - هذا نص باللغة العربية<br/>
          Mixed: Hello שלום world עולם<br/>
          English: Hello world - this is English text
        </div>
      </div>

      {/* Advanced */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        background: '#fafafa' 
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Advanced Actions</h3>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
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

          <button
            type="button"
            onClick={() => {
              (window as any).blinkoRTL?.toggle();
              window.Blinko.toast.success('RTL toggled!');
            }}
            style={{ 
              padding: '10px 20px', 
              background: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer', 
              fontWeight: '500' 
            }}
          >
            Toggle RTL (ع/א)
          </button>
        </div>
      </div>
    </div>
  );
}