import { useState, useEffect } from 'preact/hooks';
import type { JSXInternal } from 'preact/src/jsx';
import { RTLSettings, Preset } from './types';
import { DEFAULT_DYNAMIC_CSS, DEFAULT_TARGET_SELECTORS, DEFAULT_SETTINGS } from './services/constants';

const DEFAULT_CSS = `/* Enhanced RTL Support from Blinko-RTL.css */
*:lang(he), *:lang(ar), *:lang(fa), *:lang(ur), *[dir="rtl"] {
    text-align: right !important;
    direction: rtl !important;
}

.markdown-body div, .markdown-body p, .markdown-body span {
    unicode-bidi: plaintext !important;
}

.vditor-reset, .vditor-reset > div, .vditor-reset > p {
    unicode-bidi: plaintext !important;
}

.card-masonry-grid .markdown-body {
    line-height: 1.35 !important;
}

.card-masonry-grid .markdown-body > div {
    margin-bottom: 0.3em !important;
}

*:dir(rtl) input[type="text"], *:dir(rtl) textarea {
    text-align: right !important;
    direction: rtl !important;
}

*:dir(rtl) ol, *:dir(rtl) ul {
    list-style-position: outside !important;
    padding-left: 0 !important;
    padding-right: 2em !important;
}

*:dir(rtl) blockquote {
    border-left: none !important;
    border-right: 3px solid currentcolor !important;
    padding-left: 0 !important;
    padding-right: 0.9em !important;
}`;

const APP_SHELL_CSS = `/* ==========================================================================
   1. App Shell & UI Protection
   Prevents the main interface (buttons, toolbars, layout) from flipping incorrectly.
   ========================================================================== */
#page-wrap,
#page-wrap > div,
#page-wrap > header,
header,
nav,
.sidebar,
.toolbar,
.flex,
.grid,
button,
.btn {
    direction: unset; /* Or 'ltr' if unset doesn't work specific cases */
}

/* ==========================================================================
   2. General Text Content (BiDi Support)
   Forces browser to auto-detect direction (LTR vs RTL) per paragraph.
   ========================================================================== */
.markdown-body p,
.markdown-body div,
.markdown-body span,
.vditor-reset p,
.vditor-reset div,
.vditor-reset span,
.card-masonry-grid p,
.card-masonry-grid div,
textarea,
[contenteditable],
input[type="text"] {
    unicode-bidi: plaintext !important;
}

/* Specific spacing for editor paragraphs */
.vditor-reset p {
    margin-bottom: 8px;
}

/* Force RTL on the last element to ensure cursor behaves in editor */
.vditor-reset p:last-child,
.vditor-reset blockquote:last-child,
.vditor-reset pre:last-child,
.vditor-reset ul:last-child,
.vditor-reset ol:last-child,
.vditor-reset hr:last-child {
    direction: rtl;
}

/* ==========================================================================
   3. Headings
   Ensures titles respect bidirectional text and spacing.
   ========================================================================== */
.expanded-container .markdown-body h1,
.expanded-container .markdown-body h2,
.expanded-container .markdown-body h3,
.expanded-container .markdown-body h4,
.expanded-container .markdown-body h5,
.expanded-container .markdown-body h6,
.vditor-reset h1,
.vditor-reset h2,
.vditor-reset h3,
.vditor-reset h4,
.vditor-reset h5,
.vditor-reset h6 {
    unicode-bidi: plaintext;
}

/* Heading margins for the editor */
.vditor-reset h1,
.vditor-reset h2,
.vditor-reset h3,
.vditor-reset h4,
.vditor-reset h5,
.vditor-reset h6 {
    margin-top: 12px;
    margin-bottom: 8px;
}

/* ==========================================================================
   4. Lists & Indentation
   Aligns bullets and numbers to the right and handles nesting.
   ========================================================================== */
ol,
ul,
menu,
.markdown-body ul,
.vditor-reset ul,
.vditor-reset ol {
    direction: rtl;
    unicode-bidi: plaintext;
    margin: 0;
}

/* specific padding adjustment for editor lists */
.vditor-reset ul,
.vditor-reset ol {
    padding: 0px 1em 0px 1px;
}

/* ==========================================================================
   5. Tasks & Checkboxes
   Ensures checkboxes align correctly with text.
   ========================================================================== */
.vditor-task {
    direction: rtl;
    margin-left: 0px;
}

.vditor-task input {
    margin: 0;
    direction: rtl;
    unicode-bidi: plaintext;
}

/* ==========================================================================
   6. Expanded / Reading View
   Specific layout tweaks for the expanded note view.
   ========================================================================== */
.expanded-container .markdown-body p,
.expanded-container .markdown-body blockquote,
.expanded-container .markdown-body ul,
.expanded-container .markdown-body ol,
.expanded-container .markdown-body dl,
.expanded-container .markdown-body pre,
.expanded-container .markdown-body details {
    margin-bottom: var(--base-size-8);
    padding: 0px 20px; /* 20PX normalized to lowercase */
    direction: rtl;
    unicode-bidi: plaintext;
}

ul {
    direction: unset;
}`;

const BUILT_IN_PRESETS: Preset[] = [
  {
    id: 'default',
    name: 'Default CSS',
    css: DEFAULT_CSS,
    isBuiltIn: true
  },
  {
    id: 'app-shell',
    name: 'Enhanced RTL (App Shell & UI)',
    css: APP_SHELL_CSS,
    isBuiltIn: true
  }
];

const STANDARD_FONTS = [
  'inherit',
  'Arial',
  'Arial Hebrew',
  'David',
  'Miriam',
  'Segoe UI',
  'Tahoma'
];

export function RTLSetting(): JSXInternal.Element {
  const [settings, setSettings] = useState<RTLSettings>({
    enabled: true,
    sensitivity: 'medium',
    threshold: 0.15,
    forceDirection: 'auto',
    autoDetect: false,
    manualMode: true,
    manualToggle: false,
    mobileView: false,
    darkMode: false,
    method: 'all',
    customCSS: '',
    dynamicCSS: DEFAULT_DYNAMIC_CSS,
    permanentCSS: false,
    dynamicCSS: DEFAULT_DYNAMIC_CSS,
    visualStyles: {
      fontFamily: 'inherit',
      lineHeight: 1.5,
      paragraphMargin: 1
    },
    targetSelectors: DEFAULT_TARGET_SELECTORS,
    disabledSelectors: [],
    minRTLChars: 3,
    processInterval: 2000,
    hebrewRegex: true,
    arabicRegex: true,
    mixedContent: true,
    savedPresets: []
  });

  const [customSelector, setCustomSelector] = useState('');
  const [testText, setTestText] = useState('');
  const [testResult, setTestResult] = useState('');
  const [selectedPresetId, setSelectedPresetId] = useState('');
  const [dynamicCSSPresetId, setDynamicCSSPresetId] = useState('');
  const [actionLog, setActionLog] = useState<{ timestamp: string; element: string; direction: string; textPreview: string }[]>([]);
  const i18n = window.Blinko.i18n;

  useEffect(() => {
    // We can also get settings from the service via global
    const currentSettings = (window as any).blinkoRTL?.settings();
    if (currentSettings) {
        setSettings(currentSettings);
    } else {
        const savedSettings = localStorage.getItem('blinko-rtl-settings');
        if (savedSettings) {
        try {
            const parsed = JSON.parse(savedSettings);
            setSettings(prev => ({ ...prev, ...parsed }));
        } catch (error) {
            console.error('Failed to load RTL plugin settings:', error);
        }
        }
    }

    // Load initial logs if available
    if ((window as any).blinkoRTL?.service?.getActionLog) {
        setActionLog((window as any).blinkoRTL.service.getActionLog());
    }

    // Listen for log updates
    const handleLogUpdate = (e: CustomEvent) => {
        setActionLog(prev => [e.detail, ...prev].slice(0, 50));
    };

    window.addEventListener('rtl-action-logged', handleLogUpdate as EventListener);
    return () => {
        window.removeEventListener('rtl-action-logged', handleLogUpdate as EventListener);
    };
  }, []);

  const saveSettings = (newSettings: Partial<RTLSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    
    // Use service to update settings
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
    
    // Toast only for manual actions, not implicit state updates if needed
    // But keeping it simple for now
    // window.Blinko.toast.success('Settings saved!');
  };

  const testRTL = () => {
    if (!testText.trim()) return;
    const result = (window as any).blinkoRTL?.test(testText);
    setTestResult(result ? 'RTL' : 'LTR');
  };

  const processAllContent = () => {
    (window as any).blinkoRTL?.processAll();
    window.Blinko.toast.success('Content processed!');
  };

  const addCustomSelector = () => {
    if (customSelector.trim() && !settings.targetSelectors.includes(customSelector.trim())) {
      saveSettings({
        targetSelectors: [...settings.targetSelectors, customSelector.trim()]
      });
      setCustomSelector('');
    }
  };

  const removeCustomSelector = (selector: string) => {
    // If we remove it completely, we also should remove it from disabled list
    saveSettings({
      targetSelectors: settings.targetSelectors.filter(s => s !== selector),
      disabledSelectors: settings.disabledSelectors.filter(s => s !== selector)
    });
  };

  const toggleSelector = (selector: string, isChecked: boolean) => {
      // Logic from feature branch: just toggle presence in disabled list
      // BUT we need to respect isChecked if provided by UI?
      // Feature branch signature was: toggleSelector = (selector: string) => ... assuming click triggers toggle
      // HEAD signature was: toggleSelector = (selector: string, isChecked: boolean) => ...
      // I should look at how it is USED in the JSX.
      // Since I can't see the JSX usage in the diff, I'll assume HEAD's signature matches the UI.
      // But Feature's logic (disabled list) is what we want.
      
      const isDisabled = settings.disabledSelectors.includes(selector);
      let newDisabledSelectors: string[];

      if (isChecked) {
           // We want to ENABLE it, so remove from disabled list
           newDisabledSelectors = settings.disabledSelectors.filter(s => s !== selector);
      } else {
           // We want to DISABLE it, so add to disabled list
           if (!isDisabled) {
               newDisabledSelectors = [...settings.disabledSelectors, selector];
           } else {
               newDisabledSelectors = settings.disabledSelectors;
           }
      }
      saveSettings({ disabledSelectors: newDisabledSelectors });
  };

  const loadPreset = () => {
    if (!selectedPresetId) return;

    const allPresets = [...BUILT_IN_PRESETS, ...(settings.savedPresets || [])];
    const preset = allPresets.find(p => p.id === selectedPresetId);

    if (preset) {
      saveSettings({ customCSS: preset.css });
      window.Blinko.toast.success(`Preset "${preset.name}" loaded!`);
    }
  };

  const saveAsPreset = () => {
    const name = prompt('Enter a name for this CSS preset:');
    if (!name) return;

    const newPreset: Preset = {
      id: `custom-${Date.now()}`,
      name: name,
      css: settings.customCSS,
      isBuiltIn: false
    };

    saveSettings({
      savedPresets: [...(settings.savedPresets || []), newPreset]
    });

    setSelectedPresetId(newPreset.id);
  };

  const deletePreset = () => {
    if (!selectedPresetId) return;

    // Check if built-in
    const isBuiltIn = BUILT_IN_PRESETS.some(p => p.id === selectedPresetId);
    if (isBuiltIn) {
      window.Blinko.toast.error('Cannot delete built-in presets.');
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
    const defaultSettings: RTLSettings = {
      enabled: true,
      sensitivity: 'medium',
      threshold: 0.15,
      forceDirection: 'auto',
      autoDetect: false,
      manualMode: true,
      manualToggle: false,
      darkMode: false,
      method: 'all',
      customCSS: '',
      dynamicCSS: DEFAULT_DYNAMIC_CSS,
      permanentCSS: false,
      dynamicCSS: DEFAULT_DYNAMIC_CSS,
      visualStyles: {
        fontFamily: 'inherit',
        lineHeight: 1.5,
        paragraphMargin: 1
      },
      targetSelectors: DEFAULT_TARGET_SELECTORS,
      disabledSelectors: [],
      minRTLChars: 3,
      processInterval: 2000,
      hebrewRegex: true,
      arabicRegex: true,
      mixedContent: true,
      savedPresets: settings.savedPresets || []
    };
    saveSettings(defaultSettings);
    window.Blinko.toast.success('Settings reset to defaults');
  };

  const resetDynamicCSS = () => {
      saveSettings({ dynamicCSS: DEFAULT_DYNAMIC_CSS });
  };

  const allPresets = [...BUILT_IN_PRESETS, ...(settings.savedPresets || [])];
  return (
    <div 
      className={settings.darkMode ? 'rtl-settings-dark' : ''}
      style={{ 
        maxWidth: '700px', 
        margin: '0 auto', 
        padding: '20px', 
        fontFamily: 'system-ui, sans-serif',
        background: settings.darkMode ? '#1a1a1a' : 'white',
        color: '#000'
      }}>
      <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '2px solid #eee' }}>
        <h2 style={{ margin: '0 0 10px 0', color: '#333' }}>
          🔧 Fixed RTL Language Support Settings
        </h2>
        <p style={{ margin: '0', color: settings.darkMode ? '#333' : '#666', fontSize: '14px' }}>
          Precise RTL support with manual control and optional permanent CSS injection.
        </p>
      </div>

      {/* Quick Actions */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        border: '2px solid #007bff', 
        borderRadius: '8px', 
        background: '#f8f9ff' 
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#007bff' }}>⚡ Quick Actions</h3>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
          <button
            onClick={processAllContent}
            disabled={!settings.enabled}
            style={{ 
              background: '#28a745', 
              color: 'white', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            🔄 Process All Content
          </button>
          
          <button
            onClick={() => {
              (window as any).blinkoRTL?.toggle();
              window.Blinko.toast.success('RTL toggled!');
            }}
            style={{ 
              background: '#007bff', 
              color: 'white', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            🔄 Toggle RTL (ع/א)
          </button>

          <button
            onClick={() => {
              const result = (window as any).blinkoRTL?.toggleManual();
              setSettings(prev => ({ ...prev, manualToggle: result }));
              window.Blinko.toast.success(`Manual RTL ${result ? 'ON' : 'OFF'}`);
            }}
            style={{ 
              background: settings.manualToggle ? '#28a745' : '#dc3545', 
              color: 'white', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            🔄 Manual Toggle {settings.manualToggle ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={() => {
              const result = (window as any).blinkoRTL?.toggleDebugMode();
              setSettings(prev => ({ ...prev, debugMode: result }));
              window.Blinko.toast.success(`Debug Mode ${result ? 'ON' : 'OFF'}`);
            }}
            style={{
              background: settings.debugMode ? '#6610f2' : '#6c757d',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            🐞 Debug Mode {settings.debugMode ? 'ON' : 'OFF'}
          </button>
        </div>

        {settings.debugMode && (
             <div style={{ fontSize: '12px', color: '#6610f2', background: 'rgba(102, 16, 242, 0.1)', padding: '10px', borderRadius: '4px' }}>
                 <strong>Debug Mode Active:</strong> RTL/LTR elements are highlighted with colored outlines. <br/>
                 Red = RTL Detected, Blue = LTR Detected.
             </div>
        )}
      </div>

      {/* Real-time Action Log */}
      <div style={{
        marginBottom: '30px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        background: '#fafafa',
        maxHeight: '300px',
        overflowY: 'auto'
      }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>📜 Real-time Action Log</h3>
          {actionLog.length === 0 ? (
              <p style={{ color: '#666', fontStyle: 'italic' }}>No actions recorded yet...</p>
          ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                  <thead>
                      <tr style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>
                          <th style={{ padding: '5px' }}>Time</th>
                          <th style={{ padding: '5px' }}>Element</th>
                          <th style={{ padding: '5px' }}>Action</th>
                          <th style={{ padding: '5px' }}>Details</th>
                      </tr>
                  </thead>
                  <tbody>
                      {actionLog.map((log, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                              <td style={{ padding: '5px', whiteSpace: 'nowrap' }}>{log.timestamp}</td>
                              <td style={{ padding: '5px', fontFamily: 'monospace' }} title={log.element}>{log.element.length > 20 ? log.element.substring(0, 20) + '...' : log.element}</td>
                              <td style={{ padding: '5px', color: log.action.includes('RTL') ? 'green' : 'blue' }}>{log.action}</td>
                              <td style={{ padding: '5px', color: '#666' }}>{log.details}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          )}
      </div>

      {/* Dynamic CSS Rules Section */}
      <div style={{
        marginBottom: '30px',
        padding: '20px',
        border: '2px solid #6610f2',
        borderRadius: '8px',
        background: '#f8f9ff'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#6610f2' }}>🎨 Dynamic CSS Rules</h3>
        <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: settings.darkMode ? '#333' : '#666' }}>
            These CSS rules are applied dynamically when RTL or LTR content is detected.
            Customize the class definitions below to control how detected elements are styled.
        </p>

        <div style={{ marginBottom: '15px' }}>
          <textarea
            value={settings.dynamicCSS}
            onChange={(e) => saveSettings({ dynamicCSS: (e.target as HTMLTextAreaElement).value })}
            placeholder="Enter your dynamic CSS rules here..."
            disabled={!settings.enabled}
            style={{
              width: '100%',
              height: '250px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace',
              fontSize: '13px',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => saveSettings({ dynamicCSS: DEFAULT_DYNAMIC_CSS })}
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
            🔄 Reset Dynamic CSS
          </button>
          <button
            onClick={() => window.Blinko.toast.success('Dynamic CSS Settings Saved')}
            disabled={!settings.enabled}
             style={{
              background: '#28a745',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
             💾 Save Settings
          </button>
        </div>
      </div>

      {/* RTL Method Selection */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        border: '2px solid #28a745', 
        borderRadius: '8px', 
        background: '#f8fff8' 
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#28a745' }}>🔧 RTL Application Method</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500' }}>
            RTL Method:
            <select
              value={settings.method}
              onChange={(e) => saveSettings({ 
                method: (e.target as HTMLSelectElement).value as 'direct' | 'attributes' | 'css' | 'unicode' | 'all'
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
              <option value="direct">🎯 Direct Styling</option>
              <option value="attributes">🏷️ HTML Attributes</option>
              <option value="css">🎨 CSS Classes</option>
              <option value="unicode">🔤 Unicode Bidi</option>
              <option value="all">🚀 All Methods (Recommended)</option>
            </select>
          </label>
        </div>
      </div>

      {/* Dynamic CSS Rules Section */}
      <div style={{
        marginBottom: '30px',
        padding: '20px',
        border: '2px solid #fd7e14',
        borderRadius: '8px',
        background: '#fff9f0'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#fd7e14' }}>🎨 Dynamic CSS Rules</h3>
        <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: settings.darkMode ? '#333' : '#666' }}>
            These styles are automatically injected when RTL is detected. The class <code>.blinko-detected-rtl</code> is applied to RTL elements.
        </p>

        <div style={{ marginBottom: '15px' }}>
          <textarea
            value={settings.dynamicCSS || DEFAULT_DYNAMIC_CSS}
            onChange={(e) => saveSettings({ dynamicCSS: (e.target as HTMLTextAreaElement).value })}
            placeholder="Enter your dynamic CSS rules here..."
            disabled={!settings.enabled}
            style={{
              width: '100%',
              height: '200px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace',
              fontSize: '13px',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={resetDynamicCSS}
            disabled={!settings.enabled}
            style={{
              background: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            🔄 Reset to Default
          </button>
        </div>
      </div>

      {/* Mode Settings */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        background: '#fafafa' 
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>🎛️ Mode Settings</h3>
        
        <div style={{ display: 'grid', gap: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.enabled}
              onChange={(e) => saveSettings({ enabled: (e.target as HTMLInputElement).checked })}
            />
            <span>🔧 Enable RTL Support</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.manualMode}
              onChange={(e) => saveSettings({ manualMode: (e.target as HTMLInputElement).checked })}
              disabled={!settings.enabled}
            />
            <span>✋ Manual Mode (Recommended)</span>
          </label>
          <p style={{ margin: '0 0 0 30px', fontSize: '12px', color: '#666' }}>
            Manual mode only applies RTL when clearly detected, preventing unwanted changes
          </p>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.mobileView}
              onChange={(e) => saveSettings({ mobileView: (e.target as HTMLInputElement).checked })}
            />
            <span>📱 Mobile View</span>
          </label>
          <p style={{ margin: '0 0 0 30px', fontSize: '12px', color: '#666' }}>
            Optimizes layout for mobile devices
          </p>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.debugMode}
              onChange={(e) => {
                  const debugMode = (e.target as HTMLInputElement).checked;
                  saveSettings({ debugMode });
                  (window as any).blinkoRTL?.service?.toggleDebugMode();
              }}
              disabled={!settings.enabled}
            />
            <span>🐞 Visual Debugger</span>
          </label>
          <p style={{ margin: '0 0 0 30px', fontSize: '12px', color: '#666' }}>
            Highlights detected RTL (Red) and LTR (Blue) elements with tooltips
          </p>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.autoDetect}
              onChange={(e) => saveSettings({ autoDetect: (e.target as HTMLInputElement).checked })}
              disabled={!settings.enabled}
            />
            <span>🤖 Auto-detect All Content</span>
          </label>
          <p style={{ margin: '0 0 0 30px', fontSize: '12px', color: '#666' }}>
            Continuously processes all content on the page every 2 seconds
          </p>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.manualToggle}
              onChange={(e) => {
                const manualToggle = (e.target as HTMLInputElement).checked;
                saveSettings({ manualToggle });
                const api = (window as any).blinkoRTL;
                if (api && api.isEnabled()) {
                  api.processAll();
                }
              }}
              disabled={!settings.enabled}
            />
            <span>🔄 Manual RTL Toggle</span>
          </label>
          <p style={{ margin: '0 0 0 30px', fontSize: '12px', color: '#666' }}>
            Forces RTL on all content when enabled, ignores detection
          </p>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={(e) => {
                const darkMode = (e.target as HTMLInputElement).checked;
                saveSettings({ darkMode });
                if (darkMode) {
                  document.body.classList.add('dark');
                } else {
                  document.body.classList.remove('dark');
                }
              }}
            />
            <span>🌙 Dark Mode Plugin UI</span>
          </label>
          <p style={{ margin: '0 0 0 30px', fontSize: '12px', color: settings.darkMode ? '#333' : '#666' }}>
            Applies dark styling to RTL plugin components only
          </p>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.hebrewRegex}
              onChange={(e) => saveSettings({ hebrewRegex: (e.target as HTMLInputElement).checked })}
              disabled={!settings.enabled}
            />
            <span>📜 Hebrew Regex Detection</span>
          </label>
          <p style={{ margin: '0 0 0 30px', fontSize: '12px', color: settings.darkMode ? '#333' : '#666' }}>
            Uses Unicode Script property for Hebrew detection
          </p>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.arabicRegex}
              onChange={(e) => saveSettings({ arabicRegex: (e.target as HTMLInputElement).checked })}
              disabled={!settings.enabled}
            />
            <span>📜 Arabic Regex Detection</span>
          </label>
          <p style={{ margin: '0 0 0 30px', fontSize: '12px', color: '#666' }}>
            Applies dark styling to RTL plugin components only
          </p>
        </div>
      </div>

      {/* Real-time Transparency Log */}
      <div style={{
        marginBottom: '30px',
        padding: '20px',
        border: '1px solid #17a2b8',
        borderRadius: '8px',
        background: '#f0faff'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#17a2b8' }}>📊 Real-time Action Log</h3>
        <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: settings.darkMode ? '#333' : '#666' }}>
            Shows real-time detection and application updates for transparency.
        </p>

        <div style={{
            maxHeight: '200px',
            overflowY: 'auto',
            background: 'white',
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '10px',
            fontSize: '12px',
            fontFamily: 'Monaco, monospace'
        }}>
            {actionLog.length === 0 ? (
                <div style={{ color: '#999', textAlign: 'center', padding: '20px' }}>No actions logged yet...</div>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #eee', textAlign: 'left' }}>
                            <th style={{ padding: '5px' }}>Time</th>
                            <th style={{ padding: '5px' }}>Element</th>
                            <th style={{ padding: '5px' }}>Dir</th>
                            <th style={{ padding: '5px' }}>Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        {actionLog.map((log, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #f5f5f5' }}>
                                <td style={{ padding: '5px', color: '#666' }}>{log.timestamp}</td>
                                <td style={{ padding: '5px', color: '#007bff' }}>{log.element}</td>
                                <td style={{ padding: '5px', fontWeight: 'bold', color: log.direction === 'RTL' ? '#28a745' : '#dc3545' }}>{log.direction}</td>
                                <td style={{ padding: '5px', color: '#333' }}>{log.textPreview}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
      </div>

      {/* Target Selectors */}
      <div style={{
        marginBottom: '30px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        background: '#fafafa'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>🎯 Target Selectors</h3>
        <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: settings.darkMode ? '#333' : '#666' }}>
          Specific elements to process for RTL detection (focused approach)
        </p>

        <div style={{ marginBottom: '15px', maxHeight: '300px', overflowY: 'auto' }}>
          {settings.targetSelectors.map((selector, index) => {
             const isDisabled = settings.disabledSelectors.includes(selector);
             return (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              marginBottom: '5px',
              background: 'white',
              border: '1px solid #ddd',
              borderRadius: '4px',
              opacity: isDisabled ? 0.6 : 1
            }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={!isDisabled}
                  onChange={(e) => toggleSelector(selector, (e.target as HTMLInputElement).checked)}
                  disabled={!settings.enabled}
                />
                <code style={{
                    fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace',
                    fontSize: '13px',
                    color: '#333',
                    textDecoration: isDisabled ? 'line-through' : 'none'
                }}>
                    {selector}
                </code>
              </label>
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
                  lineHeight: '1',
                  marginLeft: '10px'
                }}
              >
                ×
              </button>
            </div>
          )})}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={customSelector}
            onChange={(e) => setCustomSelector((e.target as HTMLInputElement).value)}
            placeholder="e.g., .markdown-body p, .vditor-reset div"
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

      {/* Visual Style Editor */}
      <div style={{
        marginBottom: '30px',
        padding: '20px',
        border: '2px solid #6610f2',
        borderRadius: '8px',
        background: '#f8f9ff'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#6610f2' }}>🎨 Visual Style Editor</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Font Family */}
          <div>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px' }}>
              Font Family:
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <select
                value={STANDARD_FONTS.includes(settings.visualStyles?.fontFamily || 'inherit')
                  ? (settings.visualStyles?.fontFamily || 'inherit')
                  : 'custom'}
                onChange={(e) => {
                  const val = (e.target as HTMLSelectElement).value;
                  if (val === 'custom') {
                    // Switch to custom mode by clearing the font or keeping current if it's already custom-like
                    if (STANDARD_FONTS.includes(settings.visualStyles?.fontFamily || 'inherit')) {
                       saveSettings({
                        visualStyles: {
                          ...settings.visualStyles,
                          fontFamily: ''
                        }
                      });
                    }
                  } else {
                    saveSettings({
                      visualStyles: {
                        ...settings.visualStyles,
                        fontFamily: val
                      }
                    });
                  }
                }}
                disabled={!settings.enabled}
                style={{
                  flex: 1,
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              >
                {STANDARD_FONTS.map(font => (
                  <option key={font} value={font}>
                    {font === 'inherit' ? 'Default (Inherit)' : font}
                  </option>
                ))}
                <option value="custom">Custom...</option>
              </select>
              <input
                type="text"
                value={settings.visualStyles?.fontFamily || ''}
                onChange={(e) => saveSettings({
                  visualStyles: {
                    ...settings.visualStyles,
                    fontFamily: (e.target as HTMLInputElement).value
                  }
                })}
                placeholder="Custom font name"
                disabled={!settings.enabled}
                style={{
                  flex: 1,
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  display: STANDARD_FONTS.includes(settings.visualStyles?.fontFamily || 'inherit') ? 'none' : 'block'
                }}
              />
            </div>
          </div>

          {/* Line Height */}
          <div>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '500', marginBottom: '8px' }}>
              <span>Line Height:</span>
              <span>{settings.visualStyles?.lineHeight || 1.5}</span>
            </label>
            <input
              type="range"
              min="1.0"
              max="3.0"
              step="0.1"
              value={settings.visualStyles?.lineHeight || 1.5}
              onChange={(e) => saveSettings({
                visualStyles: {
                  ...settings.visualStyles,
                  lineHeight: parseFloat((e.target as HTMLInputElement).value)
                }
              })}
              disabled={!settings.enabled}
              style={{ width: '100%' }}
            />
          </div>

          {/* Paragraph Margin */}
          <div>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '500', marginBottom: '8px' }}>
              <span>Paragraph Spacing (em):</span>
              <span>{settings.visualStyles?.paragraphMargin || 1.0}em</span>
            </label>
            <input
              type="range"
              min="0"
              max="3.0"
              step="0.1"
              value={settings.visualStyles?.paragraphMargin || 1.0}
              onChange={(e) => saveSettings({
                visualStyles: {
                  ...settings.visualStyles,
                  paragraphMargin: parseFloat((e.target as HTMLInputElement).value)
                }
              })}
              disabled={!settings.enabled}
              style={{ width: '100%' }}
            />
          </div>
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
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>🎯 Detection Settings</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', fontWeight: '500' }}>
              Detection Sensitivity:
              <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px', width: '100%', maxWidth: '300px' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', justifyContent: 'flex-end' }}>
                    <span style={{ fontSize: '12px', color: '#666' }}>{Math.round((settings.threshold || 0.15) * 100)}%</span>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={Math.round((settings.threshold || 0.15) * 100)}
                      onChange={(e) => {
                          const val = parseInt((e.target as HTMLInputElement).value) / 100;
                          let sens: 'high' | 'medium' | 'low' = 'medium';
                          if (val < 0.12) sens = 'high';
                          else if (val > 0.3) sens = 'low';
                          saveSettings({ threshold: val, sensitivity: sens });
                      }}
                      disabled={!settings.enabled}
                      style={{ width: '150px' }}
                    />
                 </div>
                 <select
                    value={settings.sensitivity}
                    onChange={(e) => {
                        const val = (e.target as HTMLSelectElement).value as 'high' | 'medium' | 'low';
                        const thresholds = {
                            high: 0.1,    // 10% RTL chars
                            medium: 0.15, // 15% RTL chars
                            low: 0.4      // 40% RTL chars
                        };
                        saveSettings({ sensitivity: val, threshold: thresholds[val] });
                    }}
                    disabled={!settings.enabled}
                    style={{
                      padding: '5px 10px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      minWidth: '200px'
                    }}
                 >
                    <option value="high">🔥 High - 10% RTL characters</option>
                    <option value="medium">⚖️ Medium - 15% RTL characters</option>
                    <option value="low">🎯 Low - 40% RTL characters</option>
                 </select>
              </div>
            </label>
          </div>

          <div>
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

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500' }}>
              Process Interval (ms):
              <input
                type="number"
                min="500"
                max="10000"
                step="500"
                value={settings.processInterval}
                onChange={(e) => saveSettings({ processInterval: parseInt((e.target as HTMLInputElement).value) })}
                disabled={!settings.enabled}
                style={{ 
                  marginLeft: 'auto', 
                  padding: '5px 10px', 
                  border: '1px solid #ccc', 
                  borderRadius: '4px', 
                  width: '100px' 
                }}
              />
            </label>
          </div>

          <div>
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
                <option value="auto">🤖 Auto-detect</option>
                <option value="rtl">➡️ Force RTL</option>
                <option value="ltr">⬅️ Force LTR</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* Permanent CSS Settings */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        border: '1px solid #28a745', 
        borderRadius: '8px', 
        background: '#f8fff8' 
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#28a745' }}>🎨 Permanent CSS Settings</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.permanentCSS}
              onChange={(e) => saveSettings({ permanentCSS: (e.target as HTMLInputElement).checked })}
              disabled={!settings.enabled}
            />
            <span>📌 Enable Permanent CSS Injection</span>
          </label>
          <p style={{ margin: '5px 0 0 30px', fontSize: '12px', color: '#666' }}>
            CSS will remain active even when RTL is disabled
          </p>
        </div>

        {/* CSS Presets */}
        <div style={{ marginBottom: '15px', padding: '15px', background: 'rgba(0,0,0,0.03)', borderRadius: '6px' }}>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px' }}>
            📚 CSS Presets:
          </label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <select
              value={selectedPresetId}
              onChange={(e) => setSelectedPresetId((e.target as HTMLSelectElement).value)}
              disabled={!settings.enabled}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                minWidth: '200px'
              }}
            >
              <option value="">-- Select a Preset --</option>
              <optgroup label="Built-in Presets">
                {BUILT_IN_PRESETS.map(preset => (
                  <option key={preset.id} value={preset.id}>{preset.name}</option>
                ))}
              </optgroup>
              {(settings.savedPresets && settings.savedPresets.length > 0) && (
                <optgroup label="Saved Presets">
                  {settings.savedPresets.map(preset => (
                    <option key={preset.id} value={preset.id}>{preset.name}</option>
                  ))}
                </optgroup>
              )}
            </select>

            <button
              onClick={loadPreset}
              disabled={!settings.enabled || !selectedPresetId}
              style={{
                background: '#17a2b8',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              📥 Load
            </button>

            <button
              onClick={deletePreset}
              disabled={!settings.enabled || !selectedPresetId || BUILT_IN_PRESETS.some(p => p.id === selectedPresetId)}
              style={{
                background: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                opacity: (BUILT_IN_PRESETS.some(p => p.id === selectedPresetId)) ? 0.5 : 1
              }}
              title="Delete selected preset (Built-in presets cannot be deleted)"
            >
              🗑️
            </button>
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '5px' }}>
            Custom CSS Code:
          </label>
          <textarea
            value={settings.customCSS}
            onChange={(e) => saveSettings({ customCSS: (e.target as HTMLTextAreaElement).value })}
            placeholder="Enter your custom CSS code here..."
            disabled={!settings.enabled}
            style={{ 
              width: '100%', 
              height: '200px', 
              padding: '10px', 
              border: '1px solid #ccc', 
              borderRadius: '4px',
              fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace',
              fontSize: '13px',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={saveAsPreset}
            disabled={!settings.enabled || !settings.customCSS.trim()}
            style={{ 
              background: '#28a745',
              color: 'white', 
              border: 'none', 
              padding: '8px 16px', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            💾 Save as New Preset
          </button>
          
          <button
            onClick={() => saveSettings({ customCSS: '' })}
            disabled={!settings.enabled}
            style={{ 
              background: '#dc3545', 
              color: 'white', 
              border: 'none', 
              padding: '8px 16px', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            🗑️ Clear CSS
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
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>🧪 Test RTL Detection</h3>
        
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
            🧪 Test Detection
          </button>
        </div>

        {testResult && (
          <div style={{ 
            padding: '10px', 
            background: testResult === 'RTL' ? '#d4edda' : '#f8d7da', 
            borderRadius: '4px',
            borderLeft: `4px solid ${testResult === 'RTL' ? '#28a745' : '#dc3545'}`,
            marginBottom: '15px'
          }}>
            Detection Result: <strong>{testResult === 'RTL' ? '➡️ RTL' : '⬅️ LTR'}</strong>
          </div>
        )}

        <div style={{ fontSize: '14px', color: settings.darkMode ? '#333' : '#666', lineHeight: '1.6' }}>
          <strong>🧪 Test Examples:</strong><br/>
          <strong>Hebrew:</strong> שלום עולם - זהו טקסט בעברית<br/>
          <strong>Arabic:</strong> مرحبا بالعالم - هذا نص باللغة العربية<br/>
          <strong>English:</strong> Hello world - this is English text
        </div>
      </div>

      {/* Advanced Actions */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        background: '#fafafa' 
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>🔧 Advanced Actions</h3>
        
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
            🔄 Reset to Defaults
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
            📋 Export Settings
          </button>
        </div>
      </div>
    </div>
  );
}
