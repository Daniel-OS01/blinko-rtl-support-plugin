import { useState, useEffect } from 'preact/hooks';
import type { JSXInternal } from 'preact/src/jsx';

interface Preset {
  id: string;
  name: string;
  css: string;
  isBuiltIn?: boolean;
}

interface RTLSettings {
  enabled: boolean;
  sensitivity: 'high' | 'medium' | 'low';
  threshold: number;
  forceDirection: 'auto' | 'rtl' | 'ltr';
  autoDetect: boolean;
  manualMode: boolean;
  manualToggle: boolean;
  darkMode: boolean;
  method: 'direct' | 'attributes' | 'css' | 'unicode' | 'all';
  customCSS: string;
  permanentCSS: boolean;
  targetSelectors: string[];
  minRTLChars: number;
  processInterval: number;
  hebrewRegex: boolean;
  arabicRegex: boolean;
  mixedContent: boolean;
  savedPresets: Preset[];
}

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

export function RTLSetting(): JSXInternal.Element {
  const [settings, setSettings] = useState<RTLSettings>({
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
    permanentCSS: false,
    targetSelectors: [
      '.markdown-body p',
      '.vditor-reset p',
      'textarea',
      '[contenteditable]'
    ],
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
    saveSettings({
      targetSelectors: settings.targetSelectors.filter(s => s !== selector)
    });
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
      permanentCSS: false,
      targetSelectors: [
        '.markdown-body p',
        '.vditor-reset p',
        'textarea',
        '[contenteditable]'
      ],
      minRTLChars: 3,
      processInterval: 2000,
      hebrewRegex: true,
      arabicRegex: true,
      mixedContent: true,
      savedPresets: settings.savedPresets || []
    };
    saveSettings(defaultSettings);
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
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
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

      {/* Detection Settings */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        background: '#fafafa' 
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>🎯 Detection Settings</h3>

        <div style={{ display: 'grid', gap: '15px' }}>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500' }}>
              Detection Sensitivity:
              <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '12px', color: '#666' }}>{Math.round(settings.threshold * 100)}%</span>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={Math.round(settings.threshold * 100)}
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

        <div style={{ marginBottom: '15px', maxHeight: '150px', overflowY: 'auto' }}>
          {settings.targetSelectors.map((selector, index) => (
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
                color: '#333',
                flex: 1
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
                  lineHeight: '1',
                  marginLeft: '10px'
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