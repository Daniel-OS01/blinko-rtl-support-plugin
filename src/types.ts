import type { RTLService } from './services/rtlService';
import type { RTLDetector } from './utils/rtlDetector';

export interface Preset {
  id: string;
  name: string;
  css: string;
  dynamicCSS?: string;
  targetSelectors?: string[];
  disabledSelectors?: string[];
  isBuiltIn?: boolean;
}

export type Direction = 'rtl' | 'ltr' | 'neutral';

export interface RTLSettings {
  enabled: boolean;
  sensitivity: 'high' | 'medium' | 'low';
  threshold: number;
  enableManualToggleBtn?: boolean;
  forceDirection: 'auto' | 'rtl' | 'ltr';
  autoDetect: boolean;
  manualMode: boolean;
  manualToggle: boolean;
  mobileView?: boolean;
  darkMode: boolean;
  method: 'direct' | 'attributes' | 'css' | 'unicode' | 'all';
  customCSS: string;
  dynamicCSS: string;
  permanentCSS: boolean;
  visualStyles?: {
    fontFamily: string;
    lineHeight: number;
    paragraphMargin: number;
  };
  targetSelectors: string[];
  disabledSelectors: string[];
  minRTLChars: number;
  processInterval: number;
  hebrewRegex: boolean;
  arabicRegex: boolean;
  mixedContent: boolean;
  savedPresets: Preset[];
  vditorSupport?: boolean;
  markdownSupport?: boolean;
  enhancedTextProcessing?: boolean;
  customSelectors?: string[];
  unicodeBidiMode?: string;
  processMixedContent?: boolean;
  debugMode?: boolean;
  enablePasteInterceptor?: boolean;
  mobileViewEnabled?: boolean;
  overrideDirectives?: boolean;
  showManualToggle?: boolean;
  enableActionLog?: boolean;
  debugShowElementNames?: boolean; // Renamed from showElementNames
}

export interface UIUXSettings {
  // Typography
  compactDatetime: boolean;
  datetimeFontSize: number;
  noteLineHeight: number;
  toolbarIconSize: number;

  // Navigation & Interactions
  singleTapOpenNote: boolean;
  backButtonClosesNote: boolean;

  // Accessibility
  reduceMotion: boolean;
  highContrast: boolean;
  focusIndicators: boolean;

  // Touch / Mobile
  minTouchTargets: boolean;
  touchTargetSize: number;

  // Layout
  compactMode: boolean;
  cardBorderRadius: number;
  shadowIntensity: 'none' | 'subtle' | 'normal' | 'strong';

  // Toolbar
  showToolbarLabels: boolean;
  mobileToolbarIconSize: number;
}

export const DEFAULT_UIUX_SETTINGS: UIUXSettings = {
  compactDatetime: false,
  datetimeFontSize: 12,
  noteLineHeight: 1.5,
  toolbarIconSize: 16,
  singleTapOpenNote: false,
  backButtonClosesNote: false,
  reduceMotion: false,
  highContrast: false,
  focusIndicators: true,
  minTouchTargets: false,
  touchTargetSize: 48,
  compactMode: false,
  cardBorderRadius: 8,
  shadowIntensity: 'normal',
  showToolbarLabels: false,
  mobileToolbarIconSize: 24,
};

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
