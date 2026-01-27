import { RTLService } from './services/rtlService';
import { RTLDetector } from './utils/rtlDetector';

declare const __PLUGIN_VERSION__: string;

declare global {
  interface Window {
    blinkoRTL: {
        detector: RTLDetector;
        service: RTLService;
        toggle: () => void;
        enable: () => void;
        disable: () => void;
        isEnabled: () => boolean;
        settings: () => any; // Keep compatible with existing calls
        getSettings: () => any;
        processAll: () => void;
        processElement: (element: HTMLElement) => void;
        toggleManual: () => boolean;
        test: (text: string) => boolean;
        testHebrew: (text: string) => boolean;
        testArabic: (text: string) => boolean;
        getStats: () => number;
        setSensitivity: (val: number) => void;
        fixSelection: () => void;
    };
  }
}
