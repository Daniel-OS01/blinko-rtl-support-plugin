import React, { useState, useEffect } from 'react';
import { RTLDetector, RTLDetectionConfig } from './utils/rtlDetector';
import { RTLStyler, RTLStyleConfig } from './utils/rtlStyler';

interface RTLPluginProps {
  detector: RTLDetector;
  styler: RTLStyler;
}

interface RTLPluginState {
  isEnabled: boolean;
  detectionConfig: RTLDetectionConfig;
  styleConfig: RTLStyleConfig;
  stats: {
    totalProcessed: number;
    rtlDetected: number;
  };
}

export default function App({ detector, styler }: RTLPluginProps) {
  const [state, setState] = useState<RTLPluginState>({
    isEnabled: true,
    detectionConfig: {
      sensitivity: 'medium',
      minRTLChars: 3,
      sampleSize: 100
    },
    styleConfig: {
      autoDetect: true,
      forceDirection: 'auto',
      applyToSelectors: [
        '.note-content',
        '.note-editor',
        'textarea',
        '.markdown-content',
        '.note-text'
      ]
    },
    stats: {
      totalProcessed: 0,
      rtlDetected: 0
    }
  });

  useEffect(() => {
    if (state.isEnabled) {
      styler.startObserving();
    } else {
      styler.stopObserving();
    }
    // No cleanup here, as the styler lifecycle is managed by the plugin's main init/destroy
  }, [state.isEnabled, styler]);

  const togglePlugin = () => {
    setState(prev => ({ ...prev, isEnabled: !prev.isEnabled }));
  };

  const updateDetectionConfig = (config: Partial<RTLDetectionConfig>) => {
    const newConfig = { ...state.detectionConfig, ...config };
    detector.updateConfig(newConfig);
    setState(prev => ({
      ...prev,
      detectionConfig: newConfig
    }));
  };

  const updateStyleConfig = (config: Partial<RTLStyleConfig>) => {
    const newConfig = { ...state.styleConfig, ...config };
    styler.updateConfig(newConfig);
    setState(prev => ({
      ...prev,
      styleConfig: newConfig
    }));
  };

  const testRTLDetection = (text: string) => {
    const isRTL = detector.detectRTL(text);
    setState(prev => ({
      ...prev,
      stats: {
        totalProcessed: prev.stats.totalProcessed + 1,
        rtlDetected: prev.stats.rtlDetected + (isRTL ? 1 : 0)
      }
    }));
    return isRTL;
  };

  return (
    <div className="rtl-plugin-container">
      <div className="plugin-header">
        <h2>RTL Language Support</h2>
        <div className="plugin-status">
          <label className="switch">
            <input
              type="checkbox"
              checked={state.isEnabled}
              onChange={togglePlugin}
            />
            <span className="slider"></span>
          </label>
          <span>{state.isEnabled ? 'Enabled' : 'Disabled'}</span>
        </div>
      </div>

      <div className="plugin-content">
        <div className="section">
          <h3>Detection Settings</h3>
          <div className="setting-group">
            <label>Sensitivity:</label>
            <select
              value={state.detectionConfig.sensitivity}
              onChange={(e) => updateDetectionConfig({
                sensitivity: e.target.value as 'high' | 'medium' | 'low'
              })}
            >
              <option value="high">High (10%)</option>
              <option value="medium">Medium (20%)</option>
              <option value="low">Low (40%)</option>
            </select>
          </div>

          <div className="setting-group">
            <label>Min RTL Characters:</label>
            <input
              type="number"
              min="1"
              max="20"
              value={state.detectionConfig.minRTLChars}
              onChange={(e) => updateDetectionConfig({
                minRTLChars: parseInt(e.target.value)
              })}
            />
          </div>
        </div>

        <div className="section">
          <h3>Style Settings</h3>
          <div className="setting-group">
            <label>Direction Mode:</label>
            <select
              value={state.styleConfig.forceDirection}
              onChange={(e) => updateStyleConfig({
                forceDirection: e.target.value as 'auto' | 'rtl' | 'ltr'
              })}
            >
              <option value="auto">Auto Detect</option>
              <option value="rtl">Force RTL</option>
              <option value="ltr">Force LTR</option>
            </select>
          </div>

          <div className="setting-group">
            <label>
              <input
                type="checkbox"
                checked={state.styleConfig.autoDetect}
                onChange={(e) => updateStyleConfig({
                  autoDetect: e.target.checked
                })}
              />
              Auto-detect new content
            </label>
          </div>
        </div>

        <div className="section">
          <h3>Statistics</h3>
          <div className="stats">
            <div className="stat-item">
              <span>Total Processed:</span>
              <span>{state.stats.totalProcessed}</span>
            </div>
            <div className="stat-item">
              <span>RTL Detected:</span>
              <span>{state.stats.rtlDetected}</span>
            </div>
            <div className="stat-item">
              <span>Detection Rate:</span>
              <span>
                {state.stats.totalProcessed > 0
                  ? Math.round((state.stats.rtlDetected / state.stats.totalProcessed) * 100)
                  : 0}%
              </span>
            </div>
          </div>
        </div>

        <div className="section">
          <h3>Test Detection</h3>
          <div className="test-area">
            <textarea
              placeholder="Enter text to test RTL detection..."
              onBlur={(e) => {
                const isRTL = testRTLDetection(e.target.value);
                alert(`Text is ${isRTL ? 'RTL' : 'LTR'}`);
              }}
            />
            <p className="test-examples">
              Try these examples:<br/>
              Hebrew: שלום עולם - זהו טקסט בעברית<br/>
              Arabic: مرحبا بالعالم - هذا نص باللغة العربية<br/>
              English: Hello world - this is English text
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .rtl-plugin-container {
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .plugin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
        }

        .plugin-status {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
          border-radius: 34px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: #2196F3;
        }

        input:checked + .slider:before {
          transform: translateX(26px);
        }

        .section {
          margin-bottom: 30px;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
        }

        .section h3 {
          margin-top: 0;
          margin-bottom: 15px;
          color: #333;
        }

        .setting-group {
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .setting-group label {
          min-width: 150px;
          font-weight: 500;
        }

        .setting-group select,
        .setting-group input[type="number"] {
          padding: 5px 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 10px;
        }

        .stat-item {
          display: flex;
          justify-content: space-between;
          padding: 10px;
          background: #f5f5f5;
          border-radius: 4px;
        }

        .test-area textarea {
          width: 100%;
          height: 100px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          resize: vertical;
          font-family: inherit;
        }

        .test-examples {
          margin-top: 10px;
          font-size: 14px;
          color: #666;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
