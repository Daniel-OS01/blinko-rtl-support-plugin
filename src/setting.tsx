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
  enhancedTextProcessing: boolean;
  processMixedContent: boolean;
  layoutPreservation: boolean;
  unicodeBidiMode: 'plaintext' | 'embed' | 'bidi-override';
  customSelectors: string[];
  minRTLChars: number;
  aggressiveProcessing: boolean;
  realTimeProcessing: boolean;
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
    enhancedTextProcessing: true,
    processMixedContent: true,
    layoutPreservation: true,
    unicodeBidiMode: 'plaintext',
    customSelectors: [
      '.note-content',
      '.note-editor',
      'textarea',
      '.markdown-content',
      '.note-text',
      '.vditor-reset',
      '.content',
      '[contenteditable]',
      'p',
      'div.text',
      'span.text'
    ],
    minRTLChars: 3,
    aggressiveProcessing: false,
    realTimeProcessing: true
  });
  
  const [customSelector, setCustomSelector] = useState('');
  const [testText, setTestText] = useState('');
  const [testResult, setTestResult] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
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
    
    window.Blinko.toast.success('Settings saved and applied!');
  };

  const testRTL = () => {
    if (!testText.trim()) return;
    const result = (window as any).blinkoRTL?.test(testText);
    setTestResult(result ? 'RTL' : 'LTR');
  };

  const processAllContent = async () => {
    setIsProcessing(true);
    try {
      (window as any).blinkoRTL?.processAllElements();
      window.Blinko.toast.success('All content processed successfully!');
    } catch (error) {
      window.Blinko.toast.error('Error processing content');
      console.error('Processing error:', error);
    } finally {
      setTimeout(() => setIsProcessing(false), 1000);
    }
  };

  const processVditorOnly = () => {
    (window as any).blinkoRTL?.processVditor();
    window.Blinko.toast.success('Vditor elements processed!');
  };

  const processMarkdownOnly = () => {
    (window as any).blinkoRTL?.processMarkdown();
    window.Blinko.toast.success('Markdown elements processed!');
  };

  const removeAllRTL = () => {
    (window as any).blinkoRTL?.removeAllRTL();
    window.Blinko.toast.success('All RTL attributes removed!');
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
      enhancedTextProcessing: true,
      processMixedContent: true,
      layoutPreservation: true,
      unicodeBidiMode: 'plaintext',
      customSelectors: [
        '.note-content',
        '.note-editor',
        'textarea',
        '.markdown-content',
        '.note-text',
        '.vditor-reset',
        '.content',
        '[contenteditable]',
        'p',
        'div.text',
        'span.text'
      ],
      minRTLChars: 3,
      aggressiveProcessing: false,
      realTimeProcessing: true
    };
    saveSettings(defaultSettings);
  };

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px', 
      fontFamily: 'system-ui, sans-serif' 
    }}>
      <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '2px solid #eee' }}>
        <h2 style={{ margin: '0 0 10px 0', color: '#333' }}>
          🔄 Robust RTL Language Support Settings
        </h2>
        <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
          Comprehensive RTL support with special attention to vditor, markdown-body, and text elements. 
          Enhanced processing for Hebrew, Arabic, and other right-to-left languages.
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
            disabled={!settings.enabled || isProcessing}
            style={{ 
              background: isProcessing ? '#6c757d' : '#28a745', 
              color: 'white', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '4px', 
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              fontWeight: '500'
            }}
          >
            {isProcessing ? '🔄 Processing...' : '🔄 Process All Content'}
          </button>
          
          <button
            onClick={processVditorOnly}
            disabled={!settings.enabled || !settings.vditorSupport}
            style={{ 
              background: '#17a2b8', 
              color: 'white', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            📝 Process Vditor
          </button>
          
          <button
            onClick={processMarkdownOnly}
            disabled={!settings.enabled || !settings.markdownSupport}
            style={{ 
              background: '#6f42c1', 
              color: 'white', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            📄 Process Markdown
          </button>
          
          <button
            onClick={removeAllRTL}
            style={{ 
              background: '#dc3545', 
              color: 'white', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            🧹 Remove All RTL
          </button>
        </div>
      </div>

      {/* General Settings */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        background: '#fafafa' 
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>⚙️ General Settings</h3>
        
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
            <span>🤖 Auto-detect New Content</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.enhancedMode}
              onChange={(e) => saveSettings({ enhancedMode: (e.target as HTMLInputElement).checked })}
              disabled={!settings.enabled}
            />
            <span>⚡ Enhanced Mode (Comprehensive CSS)</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.realTimeProcessing}
              onChange={(e) => saveSettings({ realTimeProcessing: (e.target as HTMLInputElement).checked })}
              disabled={!settings.enabled}
            />
            <span>⏱️ Real-time Processing</span>
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

          <div>
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
                <option value="plaintext">📝 Plaintext (Recommended)</option>
                <option value="embed">🔗 Embed</option>
                <option value="bidi-override">🔄 Bidi Override</option>
              </select>
            </label>
          </div>
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
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>🧩 Component Support</h3>

        <div style={{ display: 'grid', gap: '15px' }}>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.vditorSupport}
                onChange={(e) => saveSettings({ vditorSupport: (e.target as HTMLInputElement).checked })}
                disabled={!settings.enabled}
              />
              <span>📝 Vditor Editor Support</span>
            </label>
            <p style={{ margin: '5px 0 0 30px', fontSize: '12px', color: '#666' }}>
              Enhanced RTL support for Vditor markdown editor (.vditor-reset, .vditor-content)
            </p>
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.markdownSupport}
                onChange={(e) => saveSettings({ markdownSupport: (e.target as HTMLInputElement).checked })}
                disabled={!settings.enabled}
              />
              <span>📄 Markdown Body Support</span>
            </label>
            <p style={{ margin: '5px 0 0 30px', fontSize: '12px', color: '#666' }}>
              Special attention to .markdown-body elements, paragraphs, and nested content
            </p>
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.enhancedTextProcessing}
                onChange={(e) => saveSettings({ enhancedTextProcessing: (e.target as HTMLInputElement).checked })}
                disabled={!settings.enabled}
              />
              <span>🔤 Enhanced Text Processing</span>
            </label>
            <p style={{ margin: '5px 0 0 30px', fontSize: '12px', color: '#666' }}>
              Process all text elements (p, div, span, h1-h6, li, etc.)
            </p>
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.processMixedContent}
                onChange={(e) => saveSettings({ processMixedContent: (e.target as HTMLInputElement).checked })}
                disabled={!settings.enabled}
              />
              <span>🌐 Process Mixed Content</span>
            </label>
            <p style={{ margin: '5px 0 0 30px', fontSize: '12px', color: '#666' }}>
              Handle mixed RTL/LTR content within the same element
            </p>
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.layoutPreservation}
                onChange={(e) => saveSettings({ layoutPreservation: (e.target as HTMLInputElement).checked })}
                disabled={!settings.enabled}
              />
              <span>🏗️ Layout Preservation</span>
            </label>
            <p style={{ margin: '5px 0 0 30px', fontSize: '12px', color: '#666' }}>
              Prevent layout shifting by preserving container structure
            </p>
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.aggressiveProcessing}
                onChange={(e) => saveSettings({ aggressiveProcessing: (e.target as HTMLInputElement).checked })}
                disabled={!settings.enabled}
              />
              <span>⚡ Aggressive Processing</span>
            </label>
            <p style={{ margin: '5px 0 0 30px', fontSize: '12px', color: '#666' }}>
              More thorough processing that may affect performance
            </p>
          </div>
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
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>🎯 CSS Selectors</h3>
        <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#666' }}>
          Define which elements should be processed for RTL detection. Includes enhanced selectors for better coverage.
        </p>

        <div style={{ marginBottom: '15px', maxHeight: '200px', overflowY: 'auto' }}>
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
            placeholder="Enter CSS selector (e.g., .my-content, div.text)"
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
              height: '100px', 
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
          <strong>Mixed:</strong> Hello שלום world עולם مرحبا<br/>
          <strong>English:</strong> Hello world - this is English text<br/>
          <strong>Persian:</strong> سلام دنیا - این متن فارسی است
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
            🔄 Toggle RTL (ع/א)
          </button>
        </div>
      </div>
    </div>
  );
}