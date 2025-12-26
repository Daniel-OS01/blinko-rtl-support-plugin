import { useState } from 'preact/hooks';
import type { JSXInternal } from 'preact/src/jsx';
import type { RTLDetector } from './utils/rtlDetector';

interface RTLAppProps {
  detector: RTLDetector;
}

export function RTLApp({ detector }: RTLAppProps): JSXInternal.Element {
  const [testText, setTestText] = useState('');
  const [testResult, setTestResult] = useState('');
  const i18n = window.Blinko.i18n;

  const testRTL = () => {
    if (!testText.trim()) return;
    const result = detector.detectRTL(testText);
    setTestResult(result ? 'RTL' : 'LTR');
    window.Blinko.toast.success(`Text is ${result ? 'RTL' : 'LTR'}`);
  };

  const toggleRTL = () => {
    (window as any).blinkoRTL?.toggle();
    const isEnabled = (window as any).blinkoRTL?.isEnabled();
    window.Blinko.toast.success(
      isEnabled ? i18n.t('rtl_enabled') : i18n.t('rtl_disabled')
    );
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif', maxWidth: '400px' }}>
      <h2>{i18n.t('rtl_support')}</h2>
      <p>Click the floating ع/א button to toggle RTL support.</p>
      
      <div style={{ margin: '20px 0' }}>
        <button 
          onClick={toggleRTL}
          style={{ 
            background: '#007bff', 
            color: 'white', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: '4px', 
            cursor: 'pointer' 
          }}
        >
          {i18n.t('manual_toggle')}
        </button>
      </div>

      <div style={{ margin: '20px 0' }}>
        <h3>Test RTL Detection</h3>
        <textarea
          value={testText}
          onChange={(e) => setTestText((e.target as HTMLTextAreaElement).value)}
          placeholder="Enter text to test..."
          style={{ 
            width: '100%', 
            height: '80px', 
            padding: '10px', 
            border: '1px solid #ccc', 
            borderRadius: '4px',
            resize: 'vertical'
          }}
        />
        <button 
          onClick={testRTL}
          style={{ 
            background: '#28a745', 
            color: 'white', 
            border: 'none', 
            padding: '8px 16px', 
            borderRadius: '4px', 
            cursor: 'pointer', 
            marginTop: '10px' 
          }}
        >
          Test
        </button>
        {testResult && (
          <div style={{ 
            marginTop: '10px', 
            padding: '10px', 
            background: '#f8f9fa', 
            borderRadius: '4px',
            borderLeft: '4px solid #007bff'
          }}>
            Result: <strong>{testResult}</strong>
          </div>
        )}
        <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          <strong>Examples:</strong><br/>
          Hebrew: שלום עולם<br/>
          Arabic: مرحبا بالعالم<br/>
          English: Hello world
        </div>
      </div>
    </div>
  );
}
