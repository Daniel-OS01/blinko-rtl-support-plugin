import { useState, useEffect } from 'preact/hooks';
import { JSX } from 'preact';
import { RTLSettings, Preset } from './types';
import { DEFAULT_DYNAMIC_CSS, DEFAULT_TARGET_SELECTORS, DEFAULT_SETTINGS } from './services/constants';
import { RTLDetector } from './utils/rtlDetector';

const BUILT_IN_PRESETS: Preset[] = [
  {
    id: 'default',
    name: 'Default CSS',
    css: DEFAULT_SETTINGS.customCSS,
    dynamicCSS: DEFAULT_DYNAMIC_CSS,
    targetSelectors: DEFAULT_TARGET_SELECTORS,
    disabledSelectors: [],
    isBuiltIn: true
  },
  // We can add more presets here if needed
];

export function RTLSetting(): JSX.Element {
  const [settings, setSettings] = useState<RTLSettings>({
    ...DEFAULT_SETTINGS,
    // Ensure all fields are present even if loading from older storage
    targetSelectors: DEFAULT_TARGET_SELECTORS,
    disabledSelectors: [],
    savedPresets: []
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [customSelector, setCustomSelector] = useState('');
  const [testText, setTestText] = useState('');
  const [testResult, setTestResult] = useState('');
  const [selectedPresetId, setSelectedPresetId] = useState('');
  const [actionLog, setActionLog] = useState<{ timestamp: string; element: string; direction: string; textPreview: string }[]>([]);
  const [cssError, setCssError] = useState('');
  const [importError, setImportError] = useState('');

  useEffect(() => {
    // Load initial settings
    const loadInitialSettings = () => {
        const currentSettings = (window as any).blinkoRTL?.settings();
        if (currentSettings) {
            setSettings({ ...DEFAULT_SETTINGS, ...currentSettings });
        }
    };

    loadInitialSettings();

    const handleSettingsChange = (e: CustomEvent) => {
        setSettings(prev => ({ ...prev, ...e.detail }));
    };

    const handleLogUpdate = (e: CustomEvent) => {
        setActionLog(prev => [e.detail, ...prev].slice(0, 50));
    };

    if ((window as any).blinkoRTL?.service?.getActionLog) {
        setActionLog((window as any).blinkoRTL.service.getActionLog());
    }

    window.addEventListener('rtl-settings-changed', handleSettingsChange as EventListener);
    window.addEventListener('rtl-action-logged', handleLogUpdate as EventListener);

    return () => {
        window.removeEventListener('rtl-settings-changed', handleSettingsChange as EventListener);
        window.removeEventListener('rtl-action-logged', handleLogUpdate as EventListener);
    };
  }, []);

  const validateCSS = (css: string): boolean => {
      let openBraces = 0;
      for (let i = 0; i < css.length; i++) {
          if (css[i] === '{') openBraces++;
          if (css[i] === '}') openBraces--;
          if (openBraces < 0) return false;
      }
      return openBraces === 0;
  };

  const saveSettings = (newSettings: Partial<RTLSettings>) => {
    if (newSettings.dynamicCSS !== undefined) {
        if (!validateCSS(newSettings.dynamicCSS)) {
            setCssError('Invalid CSS: Unbalanced curly braces');
        } else {
            setCssError('');
        }
    }

    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    
    if ((window as any).blinkoRTL?.service) {
        (window as any).blinkoRTL.service.updateSettings(newSettings);
    } else {
        localStorage.setItem('blinko-rtl-settings', JSON.stringify(updatedSettings));
        window.dispatchEvent(
            new CustomEvent('rtl-settings-changed', {
                detail: updatedSettings
            })
        );
    }
  };

  const testRTL = () => {
    if (!testText.trim()) return;
    const detector = (window as any).blinkoRTL?.detector;
    if (detector) {
        const result = detector.detectRTL(testText);
        setTestResult(result ? 'RTL' : 'LTR');
    } else {
        try {
            const tempDetector = new RTLDetector();
            const result = tempDetector.detectRTL(testText);
            setTestResult(result ? 'RTL' : 'LTR');
        } catch (e) {
            console.error(e);
        }
    }
  };

  const processAllContent = () => {
    if ((window as any).blinkoRTL) {
        (window as any).blinkoRTL.processAll();
        if (settings.notifications) window.Blinko.toast.success('Content processed!');
    }
  };

  const addCustomSelector = () => {
    if (customSelector.trim() && !settings.targetSelectors.includes(customSelector.trim())) {
      saveSettings({
        targetSelectors: [...settings.targetSelectors, customSelector.trim()]
      });
      setCustomSelector('');
    }
  };

  const removeSelector = (selector: string) => {
    // Only remove if it's not a default? Or allow removing anything?
    // If we remove it from targetSelectors, it's gone.
    // But if it's in DEFAULT, we might want to just disable it?
    // Let's assume we just filter it out of the array.
    saveSettings({
      targetSelectors: settings.targetSelectors.filter(s => s !== selector),
      disabledSelectors: settings.disabledSelectors.filter(s => s !== selector)
    });
  };

  const toggleSelector = (selector: string, isChecked: boolean) => {
      const isDisabled = settings.disabledSelectors.includes(selector);
      let newDisabledSelectors: string[];

      if (isChecked) {
           newDisabledSelectors = settings.disabledSelectors.filter(s => s !== selector);
      } else {
           if (!isDisabled) {
               newDisabledSelectors = [...settings.disabledSelectors, selector];
           } else {
               newDisabledSelectors = settings.disabledSelectors;
           }
      }
      saveSettings({ disabledSelectors: newDisabledSelectors });
  };

  // Presets Logic
  const loadPreset = () => {
    if (!selectedPresetId) return;
    const allPresets = [...BUILT_IN_PRESETS, ...(settings.savedPresets || [])];
    const preset = allPresets.find(p => p.id === selectedPresetId);
    if (preset) {
      saveSettings({
          customCSS: preset.css,
          dynamicCSS: preset.dynamicCSS || settings.dynamicCSS,
          targetSelectors: preset.targetSelectors || settings.targetSelectors,
          disabledSelectors: preset.disabledSelectors || settings.disabledSelectors
      });
      if (settings.notifications) window.Blinko.toast.success(`Preset "${preset.name}" loaded!`);
    }
  };

  const saveAsPreset = () => {
    const name = prompt('Enter a name for this Full Preset (CSS, Dynamic Rules, Selectors):');
    if (!name) return;
    const newPreset: Preset = {
      id: `custom-${Date.now()}`,
      name: name,
      css: settings.customCSS,
      dynamicCSS: settings.dynamicCSS,
      targetSelectors: settings.targetSelectors,
      disabledSelectors: settings.disabledSelectors,
      isBuiltIn: false
    };
    saveSettings({
      savedPresets: [...(settings.savedPresets || []), newPreset]
    });
    setSelectedPresetId(newPreset.id);
    if (settings.notifications) window.Blinko.toast.success('Preset saved!');
  };

  const deletePreset = () => {
    if (!selectedPresetId) return;
    const isBuiltIn = BUILT_IN_PRESETS.some(p => p.id === selectedPresetId);
    if (isBuiltIn) {
      if (settings.notifications) window.Blinko.toast.error('Cannot delete built-in presets.');
      return;
    }
    if (confirm('Are you sure you want to delete this preset?')) {
      saveSettings({
        savedPresets: (settings.savedPresets || []).filter(p => p.id !== selectedPresetId)
      });
      setSelectedPresetId('');
    }
  };

  const resetToDefaults = () => {
    if (confirm('Reset all settings to defaults? This cannot be undone.')) {
        const defaultSettings: RTLSettings = {
        ...DEFAULT_SETTINGS,
        savedPresets: settings.savedPresets || []
        };
        saveSettings(defaultSettings);
        if (settings.notifications) window.Blinko.toast.success('Settings reset to defaults');
    }
  };

  const resetDynamicCSS = () => {
      saveSettings({ dynamicCSS: DEFAULT_DYNAMIC_CSS });
      if (settings.notifications) window.Blinko.toast.success('Dynamic CSS reset');
  };

  const exportSettings = () => {
      const service = (window as any).blinkoRTL?.service;
      if (service) {
          const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(service.exportSettings());
          const downloadAnchorNode = document.createElement('a');
          downloadAnchorNode.setAttribute("href", dataStr);
          downloadAnchorNode.setAttribute("download", `blinko-rtl-settings-v1.json`);
          document.body.appendChild(downloadAnchorNode);
          downloadAnchorNode.click();
          downloadAnchorNode.remove();
      } else {
          if (settings.notifications) window.Blinko.toast.error('Export failed: Service not available');
      }
  };

  const importSettings = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
          try {
              const content = e.target?.result as string;
              const service = (window as any).blinkoRTL?.service;

              if (service) {
                  service.importSettings(content);
                  setImportError('');
                  if (settings.notifications) window.Blinko.toast.success('Settings imported successfully!');
              } else {
                  throw new Error('Service not available');
              }

          } catch (err) {
              console.error('Import failed', err);
              setImportError('Failed to import settings: ' + (err instanceof Error ? err.message : 'Invalid file'));
              if (settings.notifications) window.Blinko.toast.error('Import failed');
          }
      };
      reader.readAsText(file);
      (event.target as HTMLInputElement).value = '';
  };

  const RenderToggle = ({ label, checked, onChange, desc, disabled }: { label: string, checked: boolean, onChange: (v: boolean) => void, desc?: string, disabled?: boolean }) => (
    <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.6 : 1 }}>
            <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange((e.target as HTMLInputElement).checked)}
            disabled={disabled}
            />
            <span>{label}</span>
        </label>
        {desc && <p style={{ margin: '0 0 0 30px', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>{desc}</p>}
    </div>
  );

  return (
    <div 
      className={settings.darkMode ? 'rtl-settings-dark' : ''}
      style={{ 
        maxWidth: '800px',
        margin: '0 auto', 
        padding: '20px', 
        fontFamily: 'system-ui, sans-serif',
        background: settings.darkMode ? '#1a1a1a' : 'white',
        color: settings.darkMode ? '#e0e0e0' : '#000'
      }}>

      {/* Header */}
      <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '2px solid #eee' }}>
        <h2 style={{ margin: '0 0 10px 0', color: settings.darkMode ? '#fff' : '#333' }}>
          🔧 Blinko RTL Support
        </h2>
        <p style={{ margin: '0', color: settings.darkMode ? '#aaa' : '#666', fontSize: '14px' }}>
          Comprehensive Right-to-Left language support for Hebrew, Arabic, and more.
        </p>
      </div>

      {/* Basic Settings */}
      <div style={{ marginBottom: '20px' }}>
          <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>Basic Settings</h3>
          <RenderToggle
              label="Enable RTL Support"
              checked={settings.enabled}
              onChange={v => saveSettings({ enabled: v })}
              desc="Master switch for the entire plugin functionality."
          />
          <RenderToggle
              label="Mobile View Optimization"
              checked={settings.mobileView || false}
              onChange={v => saveSettings({ mobileView: v })}
              desc="Adjusts layout and button positioning for mobile devices."
          />
          <RenderToggle
              label="Manual Mode"
              checked={settings.manualMode}
              onChange={v => saveSettings({ manualMode: v })}
              desc="If enabled, RTL is applied only when explicitly detected or requested."
              disabled={!settings.enabled}
          />
          <RenderToggle
              label="Dark Mode UI"
              checked={settings.darkMode}
              onChange={v => {
                  saveSettings({ darkMode: v });
                  if (v) document.body.classList.add('dark');
                  else document.body.classList.remove('dark');
              }}
              desc="Apply dark theme to this settings panel."
          />
      </div>

      {/* Quick Actions */}
      <div style={{ 
        marginBottom: '20px',
        padding: '15px',
        borderRadius: '8px', 
        background: settings.darkMode ? '#2c3e50' : '#f0f4f8'
      }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#007bff' }}>⚡ Quick Actions</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={processAllContent}
            disabled={!settings.enabled}
            style={{ 
              background: '#28a745', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer'
            }}
          >
            🔄 Process All Content
          </button>
          <button
            onClick={() => {
              (window as any).blinkoRTL?.toggle();
              if(settings.notifications) window.Blinko.toast.success('RTL toggled!');
            }}
            style={{ 
              background: '#007bff', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer'
            }}
          >
            🔄 Toggle RTL (ع/א)
          </button>
        </div>
      </div>

      {/* Advanced Toggle */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            style={{
                background: 'transparent',
                border: '1px solid #aaa',
                color: settings.darkMode ? '#aaa' : '#666',
                padding: '8px 20px',
                borderRadius: '20px',
                cursor: 'pointer'
            }}
          >
              {showAdvanced ? '🔼 Hide Advanced Settings' : '🔽 Show Advanced Settings'}
          </button>
      </div>

      {/* Advanced Settings Section */}
      {showAdvanced && (
          <div style={{
              padding: '20px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              marginBottom: '30px',
              background: settings.darkMode ? '#222' : '#fcfcfc'
          }}>
              {/* Detection & Performance */}
              <h4 style={{ color: settings.darkMode ? '#fff' : '#333', marginTop: 0 }}>🧠 Detection & Performance</h4>
              <RenderToggle
                  label="Background Auto-Detection (Interval)"
                  checked={settings.autoDetect}
                  onChange={v => saveSettings({ autoDetect: v })}
                  desc="Periodically scans the page for new content."
                  disabled={!settings.enabled}
              />
              <div style={{ marginLeft: '30px', marginBottom: '15px' }}>
                  <label style={{ fontSize: '13px', display: 'block', marginBottom: '5px' }}>Interval (ms):</label>
                  <input
                      type="number"
                      value={settings.processInterval}
                      onChange={(e) => saveSettings({ processInterval: parseInt((e.target as HTMLInputElement).value) })}
                      disabled={!settings.enabled || !settings.autoDetect}
                      style={{ padding: '4px', width: '80px' }}
                  />
              </div>

              <RenderToggle
                  label="Use Mutation Observer"
                  checked={settings.mutationObserver}
                  onChange={v => saveSettings({ mutationObserver: v })}
                  desc="Reacts immediately to DOM changes. Recommended for dynamic apps."
                  disabled={!settings.enabled}
              />

              <div style={{ marginBottom: '15px' }}>
                  <label style={{ fontSize: '13px', display: 'block', marginBottom: '5px' }}>Debounce Delay (ms):</label>
                  <input
                      type="number"
                      value={settings.debounceDelay || 200}
                      onChange={(e) => saveSettings({ debounceDelay: parseInt((e.target as HTMLInputElement).value) })}
                      disabled={!settings.enabled}
                      style={{ padding: '4px', width: '80px' }}
                  />
                  <p style={{ margin: '3px 0', fontSize: '11px', color: '#888' }}>Delay processing to group rapid updates.</p>
              </div>

              {/* Strategies */}
              <h4 style={{ color: settings.darkMode ? '#fff' : '#333' }}>🎯 Strategies</h4>
              <RenderToggle
                  label="Hebrew Regex Detection"
                  checked={settings.hebrewRegex}
                  onChange={v => saveSettings({ hebrewRegex: v })}
                  disabled={!settings.enabled}
              />
              <RenderToggle
                  label="Arabic Regex Detection"
                  checked={settings.arabicRegex}
                  onChange={v => saveSettings({ arabicRegex: v })}
                  disabled={!settings.enabled}
              />

              {/* Interactions */}
              <h4 style={{ color: settings.darkMode ? '#fff' : '#333' }}>🤝 Interactions</h4>
              <RenderToggle
                  label="Smart Paste Interception"
                  checked={settings.pasteInterception}
                  onChange={v => saveSettings({ pasteInterception: v })}
                  desc="Detects mixed content on paste and offers formatting options."
                  disabled={!settings.enabled}
              />
              <RenderToggle
                  label="Enable Notifications"
                  checked={settings.notifications}
                  onChange={v => saveSettings({ notifications: v })}
                  desc="Show toast notifications for actions."
              />

              {/* Debugging */}
              <h4 style={{ color: settings.darkMode ? '#fff' : '#333' }}>🐞 Debugging</h4>
              <RenderToggle
                  label="Visual Debugger"
                  checked={settings.debugMode || false}
                  onChange={v => {
                      saveSettings({ debugMode: v });
                      (window as any).blinkoRTL?.service?.toggleDebugMode();
                  }}
                  desc="Highlights RTL (Red) and LTR (Blue) elements."
                  disabled={!settings.enabled}
              />

              {/* Target Selectors Editor */}
              <h4 style={{ color: settings.darkMode ? '#fff' : '#333' }}>🎯 Target Selectors</h4>
              <p style={{ fontSize: '12px', color: '#888' }}>Control which elements are processed. Uncheck to disable.</p>
              <div style={{
                  maxHeight: '200px',
                  overflowY: 'auto',
                  border: '1px solid #ccc',
                  padding: '10px',
                  marginBottom: '10px',
                  borderRadius: '4px',
                  background: settings.darkMode ? '#333' : '#fff'
              }}>
                  {settings.targetSelectors.map((selector, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                          <input
                              type="checkbox"
                              checked={!settings.disabledSelectors.includes(selector)}
                              onChange={(e) => toggleSelector(selector, (e.target as HTMLInputElement).checked)}
                              style={{ marginRight: '8px' }}
                          />
                          <span style={{ fontSize: '13px', fontFamily: 'monospace', flex: 1 }}>{selector}</span>
                          <button
                              onClick={() => removeSelector(selector)}
                              style={{
                                  background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer', fontSize: '16px'
                              }}
                              title="Remove selector"
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
                      placeholder="Add CSS selector (e.g. .my-class)"
                      style={{ flex: 1, padding: '6px' }}
                  />
                  <button
                      onClick={addCustomSelector}
                      style={{ background: '#28a745', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                      Add
                  </button>
              </div>

              {/* CSS Editors (Collapsed by default or inside Advanced) */}
              <h4 style={{ color: settings.darkMode ? '#fff' : '#333', marginTop: '20px' }}>🎨 Dynamic CSS Rules</h4>
              <textarea
                value={settings.dynamicCSS}
                onChange={(e) => saveSettings({ dynamicCSS: (e.target as HTMLTextAreaElement).value })}
                style={{ width: '100%', height: '150px', fontFamily: 'monospace', fontSize: '12px', padding: '5px' }}
              />
              <button
                  onClick={() => saveSettings({ dynamicCSS: settings.dynamicCSS })}
                  style={{ marginTop: '5px', padding: '5px 10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                  Save Dynamic CSS
              </button>

              <h4 style={{ color: settings.darkMode ? '#fff' : '#333', marginTop: '20px' }}>📌 Permanent CSS</h4>
              <RenderToggle
                  label="Enable Permanent CSS"
                  checked={settings.permanentCSS}
                  onChange={v => saveSettings({ permanentCSS: v })}
              />
              <textarea
                value={settings.customCSS}
                onChange={(e) => saveSettings({ customCSS: (e.target as HTMLTextAreaElement).value })}
                placeholder="Permanent CSS overrides..."
                style={{ width: '100%', height: '150px', fontFamily: 'monospace', fontSize: '12px', padding: '5px' }}
              />
          </div>
      )}

      {/* Action Log */}
      <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
          <h3 style={{ fontSize: '16px' }}>📜 Activity Log</h3>
          <div style={{ maxHeight: '150px', overflowY: 'auto', background: settings.darkMode ? '#333' : '#fafafa', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
              {actionLog.length === 0 ? <span style={{color:'#888'}}>No activity.</span> : (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '12px' }}>
                      {actionLog.map((log, i) => (
                          <li key={i} style={{ marginBottom: '5px', borderBottom: '1px solid #eee', paddingBottom: '2px' }}>
                              <span style={{ color: '#888' }}>[{log.timestamp}]</span> <strong>{log.direction}</strong>: {log.element.substring(0, 30)}...
                          </li>
                      ))}
                  </ul>
              )}
          </div>
      </div>

      {/* Footer / Advanced Actions */}
      <div style={{ marginTop: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={resetToDefaults} style={{ padding: '8px 12px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Reset Defaults</button>
          <button onClick={exportSettings} style={{ padding: '8px 12px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Export JSON</button>
          <label style={{ padding: '8px 12px', background: '#6c757d', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>
              Import JSON
              <input type="file" accept=".json" onChange={importSettings} style={{ display: 'none' }} />
          </label>
      </div>

    </div>
  );
}
