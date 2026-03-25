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
  tapOutsideClosesNote: boolean;
  interceptAIErrors: boolean;

  // Accessibility
  reduceMotion: boolean;
  highContrast: boolean;
  focusIndicators: boolean;

  // Touch / Mobile
  minTouchTargets: boolean;
  touchTargetSize: number;

  // Layout
  compactMode: boolean;
  reduceVerticalSpacing: boolean;
  noteListPadding: number;
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
  tapOutsideClosesNote: false,
  interceptAIErrors: true,
  reduceMotion: false,
  highContrast: false,
  focusIndicators: true,
  minTouchTargets: false,
  touchTargetSize: 48,
  compactMode: false,
  reduceVerticalSpacing: false,
  noteListPadding: 12,
  cardBorderRadius: 8,
  shadowIntensity: 'normal',
  showToolbarLabels: false,
  mobileToolbarIconSize: 24,
};

// ─── AI Post Processing ───────────────────────────────────────────────────────

export const DEFAULT_AI_POST_PROMPT = `User's note to restructure:
"
{note}
"

# Instructions
Act as the Blinko Note Assistant. Analyze and enhance the user's note while strictly preserving the original language (English, Hebrew, or Mixed) and the original meaning (do not translate; do not change intent).

## **Output Structure:**
1. **# Title**: Concise and descriptive (H1).
2. **> Summary**: One-sentence executive summary (Blockquote).
3. **Body**: Refine structure (Markdown), fix grammar and typos. **Crucially**, maintain the original intent and meaning, and avoid unnecessary elaboration.
4. **### Action Items**: List actionable tasks as \`- [ ] ...\` (if none are present, write \`- [ ] None\`).
5. **Links**: Only when relevant, add links (Markdown format). Do not invent URLs—only include links provided by the user or clearly identifiable official sources.
6. **Tags**: Generate exactly 3 tags, one from each category below (output as hashtags, each on its own line).

## **Operational Instructions**
1. **Visualization**: Throughout the new note add relevant Markdown formatting and add relevant emojis to improve scanability and visual appearance (avoid overuse).
2. **Backup Original User Content:**
   A) Add the original user's content as a separate comment inside a code block.
   B) Also add the same original user's content again at the bottom of the restructured note inside a code block.
3. **MCP and Search**: when necessary and relevant use available search and mcp server to improve the new note output with information.
4. תוודא שאתה משתמש בשפה הנכונה. השתמש בעברית לטקסט בעברית ואנגלית לטקסט באנגלית!

## **Tagging Taxonomy (Mandatory):**
1. **#Main/Sub/Topic** (Choose best fit):
   * \`Personal\`: Health, Savta, Money, Relationships, Spiritual, MyPsyche, Financials
   * \`Education\`: Tech, AI, Psy, Spiritual
   * \`Career\`: IMS, Enosh, Freelance, Internship
2. **#Topic_Project/<Name>** (e.g., \`#Topic_Project/Tipul-Website\`)
3. **#Note_Type/<Type>** (e.g., \`#Note_Type/Meeting\`, \`#Note_Type/Idea\`).`;

export interface AIPostSettings {
  /** Show "Rerun AI Processing" in the note right-click / three-dot menu */
  enabled: boolean;
  /** Show "AI Auto-Tag" shortcut in the menu */
  enableAutoTagMenu: boolean;
  /** Show "Copy Note as Markdown" in the menu */
  enableCopyMenu: boolean;
  /** Show "Export Note as .md" in the menu */
  enableExportMenu: boolean;
  /** The prompt template – supports {note} and {tags} variables */
  customPrompt: string;
  /** When true, show a preview dialog before overwriting the note */
  showPreviewBeforeApply: boolean;
}

export const DEFAULT_AI_POST_SETTINGS: AIPostSettings = {
  enabled: true,
  enableAutoTagMenu: true,
  enableCopyMenu: true,
  enableExportMenu: true,
  customPrompt: DEFAULT_AI_POST_PROMPT,
  showPreviewBeforeApply: true,
};

// ─── BlinkoRTL public API ─────────────────────────────────────────────────────

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
