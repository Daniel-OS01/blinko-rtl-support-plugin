export interface Preset {
  id: string;
  name: string;
  css: string;
  dynamicCSS?: string; // Added dynamicCSS to presets
  targetSelectors?: string[]; // Added targetSelectors to presets
  disabledSelectors?: string[]; // Added disabledSelectors to presets
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
  permanentCSS: boolean;
  dynamicCSS: string; // New field for user-editable dynamic rules
  visualStyles?: {
    fontFamily: string;
    lineHeight: number;
    paragraphMargin: number;
  };
  targetSelectors: string[];
  disabledSelectors: string[]; // New field for toggling selectors
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
}
