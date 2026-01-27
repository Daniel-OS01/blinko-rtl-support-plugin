import { RTLService } from './services/rtlService';
import { RTLDetector } from './utils/rtlDetector';
import { RTLSettings } from './types';

declare const __PLUGIN_VERSION__: string;

export interface BlinkoRTL {
    detector: RTLDetector;
    service: RTLService;
    toggle: () => void;
    enable: () => void;
    disable: () => void;
    isEnabled: () => boolean;
    settings: () => RTLSettings;
    getSettings: () => RTLSettings;
    processAll: () => void;
    processElement: (element: HTMLElement) => void;
    toggleManual: () => boolean;
    test: (text: string) => boolean;
    testHebrew: (text: string) => boolean;
    testArabic: (text: string) => boolean;
    getStats: () => number;
    setSensitivity: (val: number) => void;
    fixSelection: () => void;
}

declare global {
    interface Window {
        blinkoRTL: BlinkoRTL;
        Blinko: any;
    }
}
