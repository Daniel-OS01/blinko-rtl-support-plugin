import { useState, useEffect } from 'preact/hooks';

/**
 * Interface representing the structure of the plugin's settings.
 */
interface Settings {
    enabled: boolean;
    sensitivity: string;
    threshold: number;
    forceDirection: string;
    autoDetect: boolean;
    manualMode: boolean;
    manualToggle: boolean;
    mobileView: boolean;
    darkMode: boolean;
    customCSS: string;
    permanentCSS: boolean;
    visualStyles: {
        fontFamily: string;
        lineHeight: number;
        paragraphMargin: number;
    };
    minRTLChars: number;
    processInterval: number;
    hebrewRegex: boolean;
    arabicRegex: boolean;
    mixedContent: boolean;
}

/**
 * The Settings Panel component for configuring the RTL plugin.
 * Allows users to adjust detection sensitivity, toggle features, manage custom CSS,
 * and test detection logic.
 */
export function RTLSetting() {
    const [settings, setSettings] = useState<Settings>({
        enabled: false,
        sensitivity: 'medium',
        threshold: 0.15,
        forceDirection: 'auto',
        autoDetect: true,
        manualMode: false,
        manualToggle: false,
        mobileView: false,
        darkMode: false,
        customCSS: '',
        permanentCSS: false,
        visualStyles: {
            fontFamily: 'inherit',
            lineHeight: 1.5,
            paragraphMargin: 1
        },
        minRTLChars: 2,
        processInterval: 2000,
        hebrewRegex: true,
        arabicRegex: true,
        mixedContent: true
    });

    const [testText, setTestText] = useState('');
    const [testResult, setTestResult] = useState<boolean | null>(null);

    useEffect(() => {
        // Load settings from global if available, else localStorage
        if ((window as any).blinkoRTL) {
            setSettings((window as any).blinkoRTL.getSettings());
        } else {
             const saved = localStorage.getItem('blinko-rtl-settings');
             if (saved) {
                 try {
                     setSettings(prev => ({ ...prev, ...JSON.parse(saved) }));
                 } catch (e) {
                     console.error(e);
                 }
             }
        }
    }, []);

    const saveSettings = (newSettings: Settings) => {
        setSettings(newSettings);
        localStorage.setItem('blinko-rtl-settings', JSON.stringify(newSettings));

        // Dispatch event for live updates
        window.dispatchEvent(new CustomEvent('rtl-settings-changed', {
            detail: newSettings
        }));
    };

    const handleChange = (key: keyof Settings, value: any) => {
        const newSettings = { ...settings, [key]: value };
        saveSettings(newSettings);
    };

    const handleVisualChange = (key: string, value: any) => {
        const newVisuals = { ...settings.visualStyles, [key]: value };
        const newSettings = { ...settings, visualStyles: newVisuals };
        saveSettings(newSettings);
    };

    const runTest = () => {
        if ((window as any).blinkoRTL) {
            setTestResult((window as any).blinkoRTL.test(testText));
        }
    };

    return (
        <div className={`rtl-settings-panel ${settings.darkMode ? 'dark-mode' : ''}`} style={{ padding: '20px', maxWidth: '600px' }}>
            <h2>RTL Language Support Settings</h2>

            <section className="setting-group">
                <h3>General</h3>
                <label className="setting-item">
                    <input
                        type="checkbox"
                        checked={settings.enabled}
                        onChange={(e) => handleChange('enabled', e.currentTarget.checked)}
                    />
                    Enable Plugin
                </label>

                <label className="setting-item">
                    <input
                        type="checkbox"
                        checked={settings.darkMode}
                        onChange={(e) => handleChange('darkMode', e.currentTarget.checked)}
                    />
                    Dark Mode UI
                </label>

                <label className="setting-item">
                    <input
                        type="checkbox"
                        checked={settings.mobileView}
                        onChange={(e) => handleChange('mobileView', e.currentTarget.checked)}
                    />
                    Mobile Optimized View
                </label>
            </section>

            <section className="setting-group">
                <h3>Detection Logic</h3>
                <div className="setting-item">
                    <label>Sensitivity:</label>
                    <select
                        value={settings.sensitivity}
                        onChange={(e) => handleChange('sensitivity', e.currentTarget.value)}
                    >
                        <option value="high">High (10%)</option>
                        <option value="medium">Medium (15%)</option>
                        <option value="low">Low (25%)</option>
                    </select>
                </div>

                 <div className="setting-item">
                    <label>Min Characters:</label>
                    <input
                        type="number"
                        min="1"
                        max="20"
                        value={settings.minRTLChars}
                        onChange={(e) => handleChange('minRTLChars', parseInt(e.currentTarget.value))}
                    />
                </div>

                <label className="setting-item">
                    <input
                        type="checkbox"
                        checked={settings.mixedContent}
                        onChange={(e) => handleChange('mixedContent', e.currentTarget.checked)}
                    />
                    Handle Mixed Content (Experimental)
                </label>
            </section>

            <section className="setting-group">
                <h3>Visual Styles</h3>
                <div className="setting-item">
                    <label>Font Family:</label>
                    <input
                        type="text"
                        placeholder="inherit"
                        value={settings.visualStyles.fontFamily}
                        onChange={(e) => handleVisualChange('fontFamily', e.currentTarget.value)}
                    />
                </div>
                 <div className="setting-item">
                    <label>Line Height:</label>
                    <input
                        type="number"
                        step="0.1"
                        value={settings.visualStyles.lineHeight}
                        onChange={(e) => handleVisualChange('lineHeight', parseFloat(e.currentTarget.value))}
                    />
                </div>
            </section>

            <section className="setting-group">
                <h3>Advanced</h3>
                <div className="setting-item">
                    <label>Custom CSS:</label>
                    <textarea
                        value={settings.customCSS}
                        onChange={(e) => handleChange('customCSS', e.currentTarget.value)}
                        placeholder=".rtl-detected { color: blue; }"
                        rows={4}
                        style={{ width: '100%' }}
                    />
                </div>
                 <label className="setting-item">
                    <input
                        type="checkbox"
                        checked={settings.permanentCSS}
                        onChange={(e) => handleChange('permanentCSS', e.currentTarget.checked)}
                    />
                    Keep Custom CSS when disabled
                </label>
            </section>

            <section className="setting-group">
                <h3>Detection Test</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        value={testText}
                        onChange={(e) => setTestText(e.currentTarget.value)}
                        placeholder="Type text to test..."
                        style={{ flex: 1 }}
                    />
                    <button onClick={runTest}>Test</button>
                </div>
                {testResult !== null && (
                    <div style={{ marginTop: '10px', fontWeight: 'bold', color: testResult ? 'green' : 'red' }}>
                        Result: {testResult ? 'RTL Detected' : 'LTR / No RTL Detected'}
                    </div>
                )}
            </section>

            <style>{`
                .rtl-settings-panel {
                    font-family: sans-serif;
                }
                .setting-group {
                    margin-bottom: 20px;
                    padding: 15px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                }
                .setting-group h3 {
                    margin-top: 0;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 10px;
                }
                .setting-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                    gap: 10px;
                }
                .dark-mode {
                    background: #333;
                    color: #fff;
                }
                .dark-mode .setting-group {
                    border-color: #555;
                }
                .dark-mode input, .dark-mode select, .dark-mode textarea {
                    background: #444;
                    color: #fff;
                    border: 1px solid #666;
                }
            `}</style>
        </div>
    );
}
