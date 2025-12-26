import { useState, useEffect } from 'preact/hooks';
import { RTLDetector } from './utils/rtlDetector';

/**
 * Props for the RTLApp component.
 */
interface RTLAppProps {
    /**
     * Optional detector instance to display debug info if needed.
     */
    detector?: RTLDetector;
}

/**
 * The main UI component for the RTL plugin's toolbar popup.
 * It displays current statistics about detected RTL elements and provides basic controls.
 * It polls the global `blinkoRTL` object to update its state.
 */
export function RTLApp({ detector }: RTLAppProps) {
    const [stats, setStats] = useState({ count: 0 });
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const checkStatus = () => {
            if ((window as any).blinkoRTL) {
                setStats({ count: (window as any).blinkoRTL.getStats() });
                setEnabled((window as any).blinkoRTL.isEnabled());
            }
        };

        const interval = setInterval(checkStatus, 1000);
        checkStatus();

        return () => clearInterval(interval);
    }, []);

    const togglePlugin = () => {
        if ((window as any).blinkoRTL) {
            (window as any).blinkoRTL.toggle();
            // State will update on next poll
        }
    };

    return (
        <div className="rtl-control-center" style={{ padding: '10px', minWidth: '200px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ margin: 0, fontSize: '16px' }}>RTL Support</h3>
                <div
                    className={`status-indicator ${enabled ? 'active' : ''}`}
                    style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: enabled ? '#28a745' : '#ccc'
                    }}
                />
            </div>

            <div className="stats-container" style={{ background: 'var(--b3-theme-surface-lighter, #f5f5f5)', padding: '8px', borderRadius: '4px', marginBottom: '10px' }}>
                <div style={{ fontSize: '12px', color: 'var(--b3-theme-on-surface-light, #666)' }}>
                    Detected RTL Elements: <strong>{stats.count}</strong>
                </div>
            </div>

            <button
                onClick={togglePlugin}
                style={{
                    width: '100%',
                    padding: '6px',
                    background: enabled ? 'var(--b3-theme-error, #dc3545)' : 'var(--b3-theme-primary, #007bff)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                {enabled ? 'Disable Plugin' : 'Enable Plugin'}
            </button>

            <div style={{ marginTop: '8px', fontSize: '11px', textAlign: 'center', opacity: 0.7 }}>
                Right-click for settings
            </div>
        </div>
    );
}
