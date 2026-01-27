import { useState, useEffect } from 'preact/hooks';
import { JSX } from 'preact';
import { RTLSettings, Preset } from './types';
import { DEFAULT_DYNAMIC_CSS, DEFAULT_TARGET_SELECTORS, DEFAULT_SETTINGS } from './services/constants';
import { RTLDetector } from './utils/rtlDetector';

const DEFAULT_CSS = `/* Enhanced RTL Support from Blinko-RTL.css */
*:lang(he), *:lang(ar), *:lang(fa), *:lang(ur), *[dir="rtl"] {
    text-align: right !important;
    direction: rtl !important;
}

.markdown-body div, .markdown-body p, .markdown-body span {
    unicode-bidi: isolate !important;
}

.vditor-reset, .vditor-reset > div, .vditor-reset > p {
    unicode-bidi: isolate !important;
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
    dynamicCSS: DEFAULT_DYNAMIC_CSS,
    targetSelectors: DEFAULT_TARGET_SELECTORS,
    disabledSelectors: [],
    isBuiltIn: true
  },
  {
    id: 'app-shell',
    name: 'Enhanced RTL (App Shell & UI)',
    css: APP_SHELL_CSS,
    isBuiltIn: true
  }
];

export function RTLSetting(): JSX.Element {
  const [settings, setSettings] = useState<RTLSettings>({
    enabled: true,
    sensitivity: 'medium',
    threshold: 0.15,
    forceDirection: 'auto',
    autoDetect: true, // Default to true now
    manualMode: true,
    manualToggle: false,
    mobileView: false,
    enablePasteInterceptor: true,
    showManualToggle: true,
    enableActionLog: true,
    showElementNames: false,
    darkMode: false,
    method: 'all',
    customCSS: '',
    dynamicCSS: DEFAULT_DYNAMIC_CSS,
    permanentCSS: false,
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

  const [activeTab, setActiveTab] = useState<'simple' | 'advanced'>('simple');
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
            setSettings(currentSettings);
        } else {
            // Fallback if global API isn't ready immediately
            // But we should try to avoid direct localStorage access here if possible
            // to respect the StorageManager abstraction.
            // However, RTLService updates the global object.
            // If the global object isn't ready, we might just wait or use defaults.
            // Let's rely on RTLService to have initialized correctly.
        }
    };

    loadInitialSettings();

    // Listen for settings changes (if triggered externally)
    const handleSettingsChange = (e: CustomEvent) => {
        setSettings(prev => ({ ...prev, ...e.detail }));
    };

    // Listen for log updates
    const handleLogUpdate = (e: CustomEvent) => {
        setActionLog(prev => [e.detail, ...prev].slice(0, 50));
    };

    // Load initial logs
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
    
    // Call service update if available
    if ((window as any).blinkoRTL?.service) {
        (window as any).blinkoRTL.service.updateSettings(newSettings);

        // Show feedback for any change
        window.Blinko.toast.success('Settings updated');
    } else {
        // Fallback or error logging if service is missing
        console.warn('RTL Service not found, settings might not persist correctly via StorageManager');
        // We could write to localStorage as a desperate fallback but let's trust the service
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
    // Use the exposed API directly which routes to detector
    // Make sure we pass the text properly
    const detector = (window as any).blinkoRTL?.detector;
    if (detector) {
        const result = detector.detectRTL(testText);
        setTestResult(result ? 'RTL' : 'LTR');
    } else {
        // Fallback if plugin API is not available
        try {
            const tempDetector = new RTLDetector();
            const result = tempDetector.detectRTL(testText);
            setTestResult(result ? 'RTL' : 'LTR');
        } catch (e) {
            console.error('Failed to create fallback detector', e);
            console.warn('RTL Detector not found via global API or fallback');
        }
    }
  };

  const processAllContent = () => {
    if ((window as any).blinkoRTL) {
        (window as any).blinkoRTL.processAll();
        window.Blinko.toast.success('Content processed!');
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

  const removeCustomSelector = (selector: string) => {
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
      window.Blinko.toast.success(`Preset "${preset.name}" loaded!`);
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
    window.Blinko.toast.success('Preset saved!');
  };

  const deletePreset = () => {
    if (!selectedPresetId) return;
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
    if (confirm('Reset all settings to defaults? This cannot be undone.')) {
        const defaultSettings: RTLSettings = {
        ...DEFAULT_SETTINGS,
        savedPresets: settings.savedPresets || [] // Preserve user presets
        };
        saveSettings(defaultSettings);
        window.Blinko.toast.success('Settings reset to defaults');
    }
  };

  const resetDynamicCSS = () => {
      saveSettings({ dynamicCSS: DEFAULT_DYNAMIC_CSS });
      window.Blinko.toast.success('Dynamic CSS reset');
  };

  const exportSettings = () => {
      try {
          // Use settings from state directly if service export isn't behaving,
          // but service.exportSettings handles metadata nicely.
          const service = (window as any).blinkoRTL?.service;

          // Fallback: Manually constructing export data if service fails or for robustness
          const exportData = service ? service.exportSettings() : JSON.stringify({
              version: 1,
              source: 'blinko-rtl-support-plugin',
              timestamp: Date.now(),
              data: settings
          }, null, 2);

          const blob = new Blob([exportData], { type: "application/json" });
          const url = URL.createObjectURL(blob);
          const downloadAnchorNode = document.createElement('a');
          downloadAnchorNode.href = url;
          downloadAnchorNode.download = `blinko-rtl-settings-v1-${Date.now()}.json`;
          document.body.appendChild(downloadAnchorNode); // Required for Firefox
          downloadAnchorNode.click();
          document.body.removeChild(downloadAnchorNode);
          URL.revokeObjectURL(url);
          if (window.Blinko) {
              window.Blinko.toast.success('Settings exported successfully');
          }
      } catch (e) {
          console.error('Export error:', e);
          if (window.Blinko) {
              window.Blinko.toast.error('Export failed');
          }
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
                  window.Blinko.toast.success('Settings imported successfully!');
              } else {
                  throw new Error('Service not available');
              }

          } catch (err) {
              console.error('Import failed', err);
              setImportError('Failed to import settings: ' + (err instanceof Error ? err.message : 'Invalid file'));
              window.Blinko.toast.error('Import failed');
          }
      };
      reader.readAsText(file);
      // Reset input value to allow re-importing same file if needed
      (event.target as HTMLInputElement).value = '';
  };

  return (
    <div 
      className={settings.darkMode ? 'rtl-settings-dark' : ''}
      style={{ 
        maxWidth: '700px', 
        margin: '0 auto', 
        padding: '20px', 
        fontFamily: 'system-ui, sans-serif',
        background: settings.darkMode ? '#1a1a1a' : 'white',
        color: settings.darkMode ? '#e0e0e0' : '#000'
      }}>
      <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '2px solid #eee' }}>
        <h2 style={{ margin: '0 0 10px 0', color: settings.darkMode ? '#fff' : '#333' }}>
          🔧 Fixed RTL Language Support Settings
        </h2>
        <p style={{ margin: '0', color: settings.darkMode ? '#aaa' : '#666', fontSize: '14px' }}>
          Precise RTL support with manual control and optional permanent CSS injection.
        </p>
      </div>

      {/* Quick Actions */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        border: '2px solid #007bff', 
        borderRadius: '8px', 
        background: settings.darkMode ? '#2c3e50' : '#f8f9ff'
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
        </div>
      </div>

      {/* Real-time Action Log */}
      {settings.enableActionLog !== false && (
      <div style={{
        marginBottom: '30px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        background: settings.darkMode ? '#333' : '#fafafa',
        maxHeight: '300px',
        overflowY: 'auto'
      }}>
          <h3 style={{ margin: '0 0 15px 0', color: settings.darkMode ? '#fff' : '#333' }}>📜 Real-time Action Log</h3>
          {actionLog.length === 0 ? (
              <p style={{ color: settings.darkMode ? '#aaa' : '#666', fontStyle: 'italic' }}>No actions recorded yet...</p>
          ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', color: settings.darkMode ? '#ccc' : '#000' }}>
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
                          <tr key={i} style={{ borderBottom: settings.darkMode ? '1px solid #444' : '1px solid #eee' }}>
                              <td style={{ padding: '5px', whiteSpace: 'nowrap' }}>{log.timestamp}</td>
                              <td style={{ padding: '5px', fontFamily: 'monospace' }} title={log.element}>{log.element}</td>
                              <td style={{ padding: '5px', color: log.direction === 'RTL' ? '#28a745' : '#007bff' }}>{log.direction}</td>
                              <td style={{ padding: '5px', color: settings.darkMode ? '#888' : '#666' }}>{log.textPreview}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          )}
      </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', marginBottom: '20px', borderBottom: '1px solid #ddd' }}>
        <button
          onClick={() => setActiveTab('simple')}
          style={{
            flex: 1,
            padding: '10px',
            background: activeTab === 'simple' ? (settings.darkMode ? '#444' : '#eee') : 'transparent',
            color: settings.darkMode ? '#fff' : '#333',
            border: 'none',
            borderBottom: activeTab === 'simple' ? '2px solid #007bff' : 'none',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Simple
        </button>
        <button
          onClick={() => setActiveTab('advanced')}
          style={{
            flex: 1,
            padding: '10px',
            background: activeTab === 'advanced' ? (settings.darkMode ? '#444' : '#eee') : 'transparent',
            color: settings.darkMode ? '#fff' : '#333',
            border: 'none',
            borderBottom: activeTab === 'advanced' ? '2px solid #007bff' : 'none',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Advanced
        </button>
      </div>

      {/* Simple Settings */}
      {activeTab === 'simple' && (
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        background: settings.darkMode ? '#333' : '#fafafa'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: settings.darkMode ? '#fff' : '#333' }}>🎛️ Basic Settings</h3>
        
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
              checked={settings.autoDetect}
              onChange={(e) => saveSettings({ autoDetect: (e.target as HTMLInputElement).checked })}
              disabled={!settings.enabled}
            />
            <span>🤖 Auto-detect Content (Recommended)</span>
          </label>
          <p style={{ margin: '0 0 0 30px', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
            Automatically detects Hebrew/Arabic content and applies RTL direction.
          </p>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.manualToggle}
              onChange={(e) => {
                const manualToggle = (e.target as HTMLInputElement).checked;
                saveSettings({ manualToggle });
                window.Blinko.toast.success('Settings saved');
                const api = (window as any).blinkoRTL;
                if (api && api.isEnabled()) {
                  api.processAll();
                }
              }}
              disabled={!settings.enabled}
            />
            <span>🔄 Force All RTL</span>
          </label>
          <p style={{ margin: '0 0 0 30px', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
            Forces RTL direction on everything, useful if auto-detection misses something.
          </p>

          <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', marginTop: '10px' }}>
            {/* Min Character Count Setting */}
            <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>
                <span>Minimum RTL Characters:</span>
                <span>{settings.minRTLChars}</span>
            </label>
            <input
                type="range"
                min="1"
                max="20"
                value={settings.minRTLChars}
                onChange={(e) => saveSettings({ minRTLChars: parseInt((e.target as HTMLInputElement).value) })}
                style={{ width: '100%', cursor: 'pointer' }}
            />
            <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
                Elements with fewer than {settings.minRTLChars} RTL characters will be ignored.
            </p>
          </div>
        </div>
      </div>
      )}

      {/* Advanced Settings */}
      {activeTab === 'advanced' && (
      <div style={{
        marginBottom: '30px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        background: settings.darkMode ? '#333' : '#fafafa'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: settings.darkMode ? '#fff' : '#333' }}>🛠️ Advanced Configuration</h3>

        <div style={{ display: 'grid', gap: '15px' }}>

          <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '6px', background: settings.darkMode ? '#444' : '#fff' }}>
              <label style={{ display: 'block', fontWeight: '500', marginBottom: '5px' }}>
                  🔤 Minimum RTL Characters:
              </label>
              <input
                  type="number"
                  min="1"
                  max="20"
                  value={settings.minRTLChars}
                  onChange={(e) => {
                      const val = parseInt((e.target as HTMLInputElement).value, 10);
                      if (val > 0) {
                          saveSettings({ minRTLChars: val });
                          window.Blinko.toast.success('Settings saved');
                      }
                  }}
                  disabled={!settings.enabled}
                  style={{
                      padding: '5px',
                      borderRadius: '4px',
                      border: '1px solid #999',
                      width: '60px',
                      background: settings.darkMode ? '#222' : 'white',
                      color: settings.darkMode ? '#eee' : 'black'
                  }}
              />
              <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
                  Minimum number of RTL characters required to trigger detection.
              </p>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.mobileView}
              onChange={(e) => {
                  saveSettings({ mobileView: (e.target as HTMLInputElement).checked });
                  window.Blinko.toast.success('Settings saved');
              }}
              disabled={!settings.enabled}
            />
            <span>📱 Mobile Optimization View</span>
          </label>
          <p style={{ margin: '0 0 0 30px', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
            Applies specific CSS fixes for mobile layouts (e.g. preventing horizontal scroll).
          </p>

           <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.enablePasteInterceptor ?? true}
              onChange={(e) => {
                  saveSettings({ enablePasteInterceptor: (e.target as HTMLInputElement).checked });
                  window.Blinko.toast.success('Settings saved');
              }}
              disabled={!settings.enabled}
            />
            <span>📋 Paste Interceptor</span>
          </label>
          <p style={{ margin: '0 0 0 30px', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
            Detects mixed content on paste and offers to split/wrap it.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={settings.debugMode}
                  onChange={(e) => {
                      const debugMode = (e.target as HTMLInputElement).checked;
                      saveSettings({ debugMode });
                      (window as any).blinkoRTL?.service?.toggleDebugMode();
                      window.Blinko.toast.success(debugMode ? 'Debug Mode Enabled' : 'Debug Mode Disabled');
                  }}
                  disabled={!settings.enabled}
                />
                <span>🐞 Visual Debugger</span>
              </label>

              {settings.debugMode && (
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer', marginLeft: '30px' }}>
                    <input
                      type="checkbox"
                      checked={settings.showElementNames}
                      onChange={(e) => {
                          const showElementNames = (e.target as HTMLInputElement).checked;
                          saveSettings({ showElementNames });
                          window.Blinko.toast.success('Settings saved');
                          // Re-trigger debug mode to update visuals
                          (window as any).blinkoRTL?.service?.toggleDebugMode();
                          (window as any).blinkoRTL?.service?.toggleDebugMode();
                      }}
                    />
                    <span>Show Element Names (e.g. "RTL (DIV)")</span>
                  </label>
              )}
          </div>
          <p style={{ margin: '0 0 0 30px', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
            Highlights detected RTL (Red) and LTR (Blue) elements.
          </p>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.showElementNames}
              onChange={(e) => {
                  const showElementNames = (e.target as HTMLInputElement).checked;
                  saveSettings({ showElementNames });
                  (window as any).blinkoRTL?.service?.updateSettings({ showElementNames });
                  if (window.Blinko) {
                      window.Blinko.toast.success(showElementNames ? 'Element names enabled' : 'Element names disabled');
                  }
              }}
              disabled={!settings.enabled}
            />
            <span>🏷️ Show Element Names</span>
          </label>
          <p style={{ margin: '0 0 0 30px', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
            Displays the HTML tag name next to the debug label (Requires Visual Debugger).
          </p>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.enableActionLog ?? true}
              onChange={(e) => {
                  const enableActionLog = (e.target as HTMLInputElement).checked;
                  saveSettings({ enableActionLog });
                  if (window.Blinko) {
                      window.Blinko.toast.success(enableActionLog ? 'Action log enabled' : 'Action log disabled');
                  }
              }}
              disabled={!settings.enabled}
            />
            <span>📜 Enable Action Log</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.showManualToggle ?? true}
              onChange={(e) => {
                  const showManualToggle = (e.target as HTMLInputElement).checked;
                  saveSettings({ showManualToggle });
                  if (window.Blinko) {
                      window.Blinko.toast.success(showManualToggle ? 'Toggle button shown' : 'Toggle button hidden');
                  }
              }}
              disabled={!settings.enabled}
            />
            <span>🖲️ Show Manual Toggle Button</span>
          </label>

           <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.manualMode}
              onChange={(e) => {
                  saveSettings({ manualMode: (e.target as HTMLInputElement).checked });
                  window.Blinko.toast.success('Settings saved');
              }}
              disabled={!settings.enabled}
            />
            <span>✋ Manual Mode (Strict Detection)</span>
          </label>

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
        </div>
      </div>
      )}

      {/* Dynamic CSS Rules Section */}
      <div style={{
        marginBottom: '30px',
        padding: '20px',
        border: '2px solid #6610f2',
        borderRadius: '8px',
        background: settings.darkMode ? '#2c2c3e' : '#f8f9ff'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#6610f2' }}>🎨 Dynamic CSS Rules</h3>
        <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: settings.darkMode ? '#aaa' : '#666' }}>
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
              height: '350px',
              padding: '10px',
              border: cssError ? '2px solid red' : '1px solid #ccc',
              borderRadius: '4px',
              fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace',
              fontSize: '13px',
              resize: 'vertical',
              background: settings.darkMode ? '#222' : 'white',
              color: settings.darkMode ? '#eee' : 'black'
            }}
          />
          {cssError && <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{cssError}</div>}
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={resetDynamicCSS}
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
            onClick={() => {
                if (cssError) {
                    window.Blinko.toast.error('Please fix CSS errors before saving.');
                    return;
                }
                saveSettings({ dynamicCSS: settings.dynamicCSS }); // Trigger save explicitly
                window.Blinko.toast.success('Dynamic CSS Settings Saved');
            }}
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

      {/* Permanent CSS Settings */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        border: '1px solid #28a745', 
        borderRadius: '8px', 
        background: settings.darkMode ? '#1e3023' : '#f8fff8'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#28a745' }}>📌 Permanent CSS Settings</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.permanentCSS}
              onChange={(e) => saveSettings({ permanentCSS: (e.target as HTMLInputElement).checked })}
              disabled={!settings.enabled}
            />
            <span>Enable Permanent CSS Injection</span>
          </label>
          <p style={{ margin: '5px 0 0 30px', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
            This CSS is injected permanently as long as the plugin is enabled, regardless of RTL detection.
            Use this for global overrides.
          </p>
        </div>

        {/* CSS Presets */}
        <div style={{ marginBottom: '15px', padding: '15px', background: settings.darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', borderRadius: '6px' }}>
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
                minWidth: '200px',
                background: settings.darkMode ? '#333' : 'white',
                color: settings.darkMode ? '#eee' : 'black'
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
              title="Delete selected preset"
            >
              🗑️
            </button>
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '5px' }}>
            Custom CSS Code (Permanent):
          </label>
          <textarea
            value={settings.customCSS}
            onChange={(e) => saveSettings({ customCSS: (e.target as HTMLTextAreaElement).value })}
            placeholder="Enter your permanent custom CSS code here..."
            disabled={!settings.enabled}
            style={{ 
              width: '100%', 
              height: '200px', 
              padding: '10px', 
              border: '1px solid #ccc', 
              borderRadius: '4px',
              fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace',
              fontSize: '13px',
              resize: 'vertical',
              background: settings.darkMode ? '#222' : 'white',
              color: settings.darkMode ? '#eee' : 'black'
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
        background: settings.darkMode ? '#333' : '#fafafa'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: settings.darkMode ? '#fff' : '#333' }}>🧪 Test RTL Detection</h3>
        
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
              fontFamily: 'inherit',
              background: settings.darkMode ? '#222' : 'white',
              color: settings.darkMode ? '#eee' : 'black'
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
            marginBottom: '15px',
            color: '#333'
          }}>
            Detection Result: <strong>{testResult === 'RTL' ? '➡️ RTL' : '⬅️ LTR'}</strong>
          </div>
        )}
      </div>

      {/* Advanced Actions & Import/Export */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        background: settings.darkMode ? '#333' : '#fafafa'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: settings.darkMode ? '#fff' : '#333' }}>🔧 Advanced Actions</h3>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
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
            onClick={exportSettings}
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
            📋 Export Settings (JSON)
          </button>

          <label style={{
              padding: '10px 20px',
              background: '#007bff',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '500',
              display: 'inline-block'
            }}>
            📂 Import Settings (JSON)
            <input
              type="file"
              accept=".json"
              onChange={importSettings}
              style={{ display: 'none' }}
            />
          </label>
        </div>
        {importError && <p style={{ color: 'red', marginTop: '10px' }}>{importError}</p>}
      </div>
    </div>
  );
}
