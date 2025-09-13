import { useState, useEffect } from 'preact/hooks';
import type { JSXInternal } from 'preact/src/jsx';

interface RTLSettings {
  enabled: boolean;
  sensitivity: 'high' | 'medium' | 'low';
  forceDirection: 'auto' | 'rtl' | 'ltr';
  autoDetect: boolean;
  manualMode: boolean;
  customCSS: string;
  permanentCSS: boolean;
  targetSelectors: string[];
  minRTLChars: number;
}

export function RTLSetting(): JSXInternal.Element {
  const [settings, setSettings] = useState<RTLSettings>({
    enabled: true,
    sensitivity: 'medium',
    forceDirection: 'auto',
    autoDetect: false,
    manualMode: true,
    customCSS: '',
    permanentCSS: false,
    targetSelectors: [
      '.markdown-body p',
      '.vditor-reset p',
      'textarea',
      '[contenteditable]'
    ],
    minRTLChars: 3
  });
  
  const [customSelector, setCustomSelector] = useState('');
  const [testText, setTestText] = useState('');
  const [testResult, setTestResult] = useState('');
  const i18n = window.Blinko.i18n;

  // Default CSS from Blinko-RTL.css
  const defaultCSS = `/* Enhanced RTL Support from Blinko-RTL.css */
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

  const loadDefaultCSS = () => {
    saveSettings({ customCSS: defaultCSS });
    window.Blinko.toast.success('Default CSS loaded!');
  };

  const resetToDefaults = () => {
    const defaultSettings: RTLSettings = {
      enabled: true,
      sensitivity: 'medium',
      forceDirection: 'auto',
      autoDetect: false,
      manualMode: true,
      customCSS: '',
      permanentCSS: false,
      targetSelectors: [
        '.markdown-body p',
        '.vditor-reset p',
        'textarea',
        '[contenteditable]'
      ],
      minRTLChars: 3
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
          🔧 Fixed RTL Language Support Settings
        </h2>
        <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
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
            <span>🤖 Auto-detect New Content</span>
          </label>
          <p style={{ margin: '0 0 0 30px', fontSize: '12px', color: '#666' }}>
            ⚠️ May cause unwanted changes. Use with caution.
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
                <option value="high">🔥 High - 10% RTL characters</option>
                <option value="medium">⚖️ Medium - 20% RTL characters</option>
                <option value="low">🎯 Low - 40% RTL characters</option>
              </select>
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
            onClick={loadDefaultCSS}
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
            📋 Load Default CSS
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
        <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#666' }}>
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

        <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
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