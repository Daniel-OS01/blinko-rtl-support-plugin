import { useState, useEffect } from 'preact/hooks';
import type { JSXInternal } from 'preact/src/jsx';
import type { RTLDetector } from './utils/rtlDetector';

interface RTLAppProps {
  detector: RTLDetector;
}

export function RTLApp({ detector }: RTLAppProps): JSXInternal.Element {
  const [stats, setStats] = useState({ activeBlocks: 0 });
  const [sensitivity, setSensitivity] = useState(15); // Default 15%
  const [isFixing, setIsFixing] = useState(false);
  const i18n = window.Blinko.i18n;

  // Poll for stats
  useEffect(() => {
    const fetchStats = () => {
      const activeBlocks = (window as any).blinkoRTL?.getStats() || 0;
      setStats({ activeBlocks });
    };

    fetchStats();
    const interval = setInterval(fetchStats, 1000);
    return () => clearInterval(interval);
  }, []);

  // Load initial sensitivity
  useEffect(() => {
    // Retry finding the settings API if it's not immediately available
    const checkSettings = () => {
        const api = (window as any).blinkoRTL;
        // Try getSettings first, fall back to settings
        if (api) {
            let settings;
            if (typeof api.getSettings === 'function') {
                settings = api.getSettings();
            } else if (typeof api.settings === 'function') {
                settings = api.settings();
            }

            if (settings && settings.threshold !== undefined) {
                setSensitivity(Math.round(settings.threshold * 100));
                return true;
            }
        }
        return false;
    };

    if (!checkSettings()) {
        const interval = setInterval(() => {
            if (checkSettings()) {
                clearInterval(interval);
            }
        }, 100);
        // Clear interval after 2 seconds to stop polling if failed
        setTimeout(() => clearInterval(interval), 2000);
    }
  }, []);

  const handleFixSelection = () => {
    setIsFixing(true);
    (window as any).blinkoRTL?.fixSelection();
    setTimeout(() => {
      setIsFixing(false);
      window.Blinko.toast.success('Selection processed');
    }, 500);
  };

  const handleSensitivityChange = (e: any) => {
    const value = parseInt(e.target.value);
    setSensitivity(value);
    (window as any).blinkoRTL?.setSensitivity(value / 100);
  };

  const toggleRTL = () => {
    (window as any).blinkoRTL?.toggle();
    const isEnabled = (window as any).blinkoRTL?.isEnabled();
    window.Blinko.toast.success(
      isEnabled ? i18n.t('rtl_enabled') : i18n.t('rtl_disabled')
    );
  };

  return (
    <div style={{
      padding: '15px',
      fontFamily: 'system-ui, sans-serif',
      width: '300px',
      background: 'var(--bg-color, white)',
      color: 'var(--text-color, black)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px',
        borderBottom: '1px solid #eee',
        paddingBottom: '10px'
      }}>
        <h3 style={{ margin: 0, fontSize: '16px' }}>RTL Control Center</h3>
        <button 
          onClick={toggleRTL}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '18px',
            padding: '4px',
            borderRadius: '4px'
          }}
          title={i18n.t('manual_toggle')}
        >
          🔄
        </button>
      </div>

      {/* Stats Section */}
      <div style={{
        background: '#f8f9fa',
        padding: '12px',
        borderRadius: '8px',
        marginBottom: '15px',
        textAlign: 'center',
        borderLeft: '4px solid #007bff'
      }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>
          {stats.activeBlocks}
        </div>
        <div style={{ fontSize: '12px', color: '#666' }}>Active RTL Blocks</div>
      </div>

      {/* Actions */}
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={handleFixSelection}
          disabled={isFixing}
          style={{ 
            width: '100%',
            background: isFixing ? '#6c757d' : '#28a745',
            color: 'white', 
            border: 'none', 
            padding: '10px',
            borderRadius: '6px',
            cursor: isFixing ? 'wait' : 'pointer',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'background 0.2s'
          }}
        >
          {isFixing ? 'Processing...' : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
              </svg>
              Fix Selected Text
            </>
          )}
        </button>
      </div>

      {/* Sensitivity Slider */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
          <strong>Detection Sensitivity</strong>
          <span style={{ color: '#007bff' }}>{sensitivity}%</span>
        </div>
        <input
          type="range"
          min="1"
          max="50"
          value={sensitivity}
          onChange={handleSensitivityChange}
          style={{ width: '100%', cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#999', marginTop: '4px' }}>
          <span>More Sensitive (1%)</span>
          <span>Less Sensitive (50%)</span>
        </div>
      </div>

      <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid #eee', fontSize: '11px', color: '#888', textAlign: 'center' }}>
        Click 'Fix Selected' to force detection on specific text.
      </div>
    </div>
  );
}
