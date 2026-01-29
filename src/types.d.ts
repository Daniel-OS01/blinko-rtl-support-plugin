import { BlinkoRTL } from './types';

declare const __PLUGIN_VERSION__: string;

declare global {
    interface Window {
        blinkoRTL: BlinkoRTL;
        Blinko: any;
    }
}
