export interface Preset {
  id: string;
  name: string;
  css: string;
  dynamicCSS?: string;
  targetSelectors?: string[];
  disabledSelectors?: string[];
  isBuiltIn?: boolean;
}

export interface RTLSettings {
  enabled: boolean;
  sensitivity: 'high' | 'medium' | 'low';
  threshold?: number;
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

  // Advanced granular controls
  pasteInterception: boolean;
  mutationObserver: boolean;
  fontInjection: boolean;
  notifications: boolean;
  debounceDelay: number;
}
