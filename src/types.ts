export interface Preset {
  id: string;
  name: string;
  css: string;
  isBuiltIn?: boolean;
}

export interface RTLSettings {
  enabled: boolean;
  sensitivity: 'high' | 'medium' | 'low';
  forceDirection: 'auto' | 'rtl' | 'ltr';
  autoDetect: boolean;
  manualMode: boolean;
  manualToggle: boolean;
  darkMode: boolean;
  method: 'direct' | 'attributes' | 'css' | 'unicode' | 'all';
  customCSS: string;
  permanentCSS: boolean;
  targetSelectors: string[];
  minRTLChars: number;
  processInterval: number;
  hebrewRegex: boolean;
  arabicRegex: boolean;
  mixedContent: boolean;
  savedPresets: Preset[];
  // Additional settings from RTLProcessor that might be useful
  vditorSupport?: boolean;
  markdownSupport?: boolean;
  enhancedTextProcessing?: boolean;
  customSelectors?: string[];
  unicodeBidiMode?: string;
  processMixedContent?: boolean;
}
