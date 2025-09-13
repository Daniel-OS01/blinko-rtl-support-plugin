import { useState } from 'preact/hooks';
import { RTLDetector } from './utils/rtlDetector';
import { RTLStyler } from './utils/rtlStyler';

interface RTLPluginProps {
  detector: RTLDetector;
  styler: RTLStyler;
}

export default function App({ detector }: RTLPluginProps) {
  const [testText, setTestText] = useState('');
  const [testResult, setTestResult] = useState<string | null>(null);

  const testRTLDetection = () => {
    if (!testText.trim()) return;
    const isRTL = detector.detectRTL(testText);
    setTestResult(isRTL ? 'RTL' : 'LTR');
  };

  const toggleRTL = () => {
    if ((window as any).blinkoRTL) {
      (window as any).blinkoRTL.toggle();
    }
  };

  return (
    <div className="rtl-plugin-container">
      <div className="plugin-header">
        <h2>RTL Language Support</h2>
        <button onClick={toggleRTL} className="toggle-btn">
          Toggle RTL
        </button>
      </div>

      <div className="plugin-content">
        <div className="section">
          <h3>Test RTL Detection</h3>
          <div className="test-area">
            <textarea
              placeholder="Enter text to test RTL detection..."
              value={testText}
              onChange={(e) => setTestText((e.target as HTMLTextAreaElement).value)}
            />
            <button onClick={testRTLDetection}>Test</button>
            {testResult && (
              <div className="test-result">
                Result: <strong>{testResult}</strong>
              </div>
            )}
            <div className="test-examples">
              <strong>Examples:</strong><br/>
              Hebrew: שלום עולם<br/>
              Arabic: مرحبا بالعالم<br/>
              English: Hello world
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .rtl-plugin-container {
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          max-width: 500px;
        }

        .plugin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
        }

        .toggle-btn {
          background: #007bff;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }

        .toggle-btn:hover {
          background: #0056b3;
        }

        .section {
          margin-bottom: 20px;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
        }

        .section h3 {
          margin-top: 0;
          margin-bottom: 15px;
          color: #333;
        }

        .test-area {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .test-area textarea {
          width: 100%;
          height: 80px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          resize: vertical;
          font-family: inherit;
        }

        .test-area button {
          background: #28a745;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          align-self: flex-start;
        }

        .test-result {
          padding: 10px;
          background: #f8f9fa;
          border-radius: 4px;
          border-left: 4px solid #007bff;
        }

        .test-examples {
          font-size: 14px;
          color: #666;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
