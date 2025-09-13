import { useState, useEffect, useRef } from 'preact/hooks';

type SaveStatus = 'idle' | 'saving' | 'saved';

interface PluginSettings {
  enabled: boolean;
  sensitivity: 'high' | 'medium' | 'low';
  forceDirection: 'auto' | 'rtl' | 'ltr';
  autoDetect: boolean;
  customSelectors: string[];
}

export default function SettingPanel() {
  const [settings, setSettings] = useState<PluginSettings>({
    enabled: true,
    sensitivity: 'medium',
    forceDirection: 'auto',
    autoDetect: true,
    customSelectors: [
      '.note-content',
      '.note-editor',
      'textarea',
      '.markdown-content',
      '.note-text',
    ],
  });

  const [customSelector, setCustomSelector] = useState('');
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const saveTimeout = useRef<number | null>(null);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('blinko-rtl-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings((prev) => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Failed to load RTL plugin settings:', error);
      }
    }

    return () => {
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }
    };
  }, []);

  const saveSettings = (newSettings: Partial<PluginSettings>) => {
    setSaveStatus('saving');
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('blinko-rtl-settings', JSON.stringify(updatedSettings));

    // Notify main plugin of settings change
    window.dispatchEvent(
      new CustomEvent('rtl-settings-changed', {
        detail: updatedSettings,
      })
    );

    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }

    saveTimeout.current = window.setTimeout(() => {
      setSaveStatus('saved');
      saveTimeout.current = window.setTimeout(() => setSaveStatus('idle'), 2000);
    }, 300);
  };

  const addCustomSelector = () => {
    if (
      customSelector.trim() &&
      !settings.customSelectors.includes(customSelector.trim())
    ) {
      saveSettings({
        customSelectors: [...settings.customSelectors, customSelector.trim()],
      });
      setCustomSelector('');
    }
  };

  const removeCustomSelector = (selector: string) => {
    saveSettings({
      customSelectors: settings.customSelectors.filter((s) => s !== selector),
    });
  };

  const resetToDefaults = () => {
    const defaultSettings: PluginSettings = {
      enabled: true,
      sensitivity: 'medium',
      forceDirection: 'auto',
      autoDetect: true,
      customSelectors: [
        '.note-content',
        '.note-editor',
        'textarea',
        '.markdown-content',
        '.note-text',
      ],
    };
    saveSettings(defaultSettings);
  };

  return (
    <div className="rtl-settings-panel">
      <div className="settings-header">
        <h2>RTL Language Support Settings</h2>
        <p>
          Configure automatic RTL detection and styling for Hebrew, Arabic, and
          other right-to-left languages.
        </p>
      </div>

      <div className="settings-content">
        <div className="setting-section">
          <h3>General Settings</h3>

          <div className="setting-item">
            <label className="setting-label">
              <input
                type="checkbox"
                checked={settings.enabled}
                onChange={(e) => saveSettings({ enabled: e.target.checked })}
              />
              <span>Enable RTL Support</span>
            </label>
            <p className="setting-description">
              Automatically detect and apply RTL styling to content
            </p>
          </div>

          <div className="setting-item">
            <label className="setting-label">
              <input
                type="checkbox"
                checked={settings.autoDetect}
                onChange={(e) => saveSettings({ autoDetect: e.target.checked })}
                disabled={!settings.enabled}
              />
              <span>Auto-detect New Content</span>
            </label>
            <p className="setting-description">
              Automatically process new content as it appears
            </p>
          </div>
        </div>

        <div className="setting-section">
          <h3>Detection Settings</h3>

          <div className="setting-item">
            <label className="setting-label">Detection Sensitivity</label>
            <select
              value={settings.sensitivity}
              onChange={(e) =>
                saveSettings({
                  sensitivity: e.target.value as 'high' | 'medium' | 'low',
                })
              }
              disabled={!settings.enabled}
            >
              <option value="high">High - 10% RTL characters</option>
              <option value="medium">Medium - 20% RTL characters</option>
              <option value="low">Low - 40% RTL characters</option>
            </select>
            <p className="setting-description">
              Minimum percentage of RTL characters needed to trigger RTL styling
            </p>
          </div>

          <div className="setting-item">
            <label className="setting-label">Direction Override</label>
            <select
              value={settings.forceDirection}
              onChange={(e) =>
                saveSettings({
                  forceDirection: e.target.value as 'auto' | 'rtl' | 'ltr',
                })
              }
              disabled={!settings.enabled}
            >
              <option value="auto">Auto-detect</option>
              <option value="rtl">Always RTL</option>
              <option value="ltr">Always LTR</option>
            </select>
            <p className="setting-description">
              Override automatic detection with forced direction
            </p>
          </div>
        </div>

        <div className="setting-section">
          <h3>CSS Selectors</h3>
          <p className="section-description">
            Define which elements should be processed for RTL detection
          </p>

          <div className="selector-list">
            {settings.customSelectors.map((selector, index) => (
              <div key={index} className="selector-item">
                <code>{selector}</code>
                <button
                  type="button"
                  onClick={() => removeCustomSelector(selector)}
                  className="remove-btn"
                  disabled={!settings.enabled}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="add-selector">
            <input
              type="text"
              value={customSelector}
              onChange={(e) => setCustomSelector(e.target.value)}
              placeholder="Enter CSS selector (e.g., .my-content)"
              disabled={!settings.enabled}
              onKeyPress={(e) => e.key === 'Enter' && addCustomSelector()}
            />
            <button
              type="button"
              onClick={addCustomSelector}
              disabled={!settings.enabled || !customSelector.trim()}
            >
              Add Selector
            </button>
          </div>
        </div>

        <div className="setting-section">
          <div className="advanced-header">
            <h3>Advanced</h3>
            <span
              className={`save-status ${
                saveStatus !== 'idle' ? 'visible' : ''
              }`}
            >
              {saveStatus === 'saving'
                ? 'Saving...'
                : saveStatus === 'saved'
                ? 'Settings Saved!'
                : ''}
            </span>
          </div>

          <div className="setting-actions">
            <button
              type="button"
              onClick={resetToDefaults}
              className="reset-btn"
            >
              Reset to Defaults
            </button>

            <button
              type="button"
              onClick={() => {
                const settingsData = JSON.stringify(settings, null, 2);
                navigator.clipboard.writeText(settingsData);
                alert('Settings copied to clipboard');
              }}
              className="export-btn"
            >
              Export Settings
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .rtl-settings-panel {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .settings-header {
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #eee;
        }

        .settings-header h2 {
          margin: 0 0 10px 0;
          color: #333;
        }

        .settings-header p {
          margin: 0;
          color: #666;
          font-size: 14px;
        }

        .setting-section {
          margin-bottom: 30px;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background: #fafafa;
        }

        .setting-section h3 {
          margin: 0 0 15px 0;
          color: #333;
        }

        .section-description {
          margin: 0 0 15px 0;
          color: #666;
          font-size: 14px;
        }

        .setting-item {
          margin-bottom: 20px;
        }

        .setting-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 500;
          margin-bottom: 5px;
          cursor: pointer;
        }

        .setting-label input[type="checkbox"] {
          margin: 0;
        }

        .setting-label select {
          margin-left: auto;
          padding: 5px 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          min-width: 200px;
        }

        .setting-description {
          margin: 5px 0 0 0;
          font-size: 13px;
          color: #666;
          font-style: italic;
        }

        .selector-list {
          margin-bottom: 15px;
        }

        .selector-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          margin-bottom: 5px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .selector-item code {
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 13px;
          color: #333;
        }

        .remove-btn {
          background: #ff4757;
          color: white;
          border: none;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          cursor: pointer;
          font-size: 16px;
          line-height: 1;
        }

        .remove-btn:hover:not(:disabled) {
          background: #ff3838;
        }

        .add-selector {
          display: flex;
          gap: 10px;
        }

        .add-selector input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .add-selector button {
          padding: 8px 16px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .add-selector button:hover:not(:disabled) {
          background: #0056b3;
        }

        .advanced-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .advanced-header h3 {
          margin: 0;
        }

        .save-status {
          color: #28a745;
          font-weight: 500;
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
        }

        .save-status.visible {
          opacity: 1;
        }

        .setting-actions {
          display: flex;
          gap: 10px;
        }

        .reset-btn, .export-btn {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
        }

        .reset-btn {
          background: #dc3545;
          color: white;
        }

        .reset-btn:hover {
          background: #c82333;
        }

        .export-btn {
          background: #28a745;
          color: white;
        }

        .export-btn:hover {
          background: #218838;
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        button:disabled:hover {
          background: initial !important;
        }
      `}</style>
    </div>
  );
}
