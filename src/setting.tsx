import { useState, useEffect } from 'preact/hooks';
import { JSX } from 'preact';
import { RTLSettings, Preset, UIUXSettings, DEFAULT_UIUX_SETTINGS } from './types';
import { DEFAULT_DYNAMIC_CSS, DEFAULT_TARGET_SELECTORS, DEFAULT_SETTINGS } from './services/constants';
import { RTLDetector } from './utils/rtlDetector';
import { UIUXService } from './services/uiuxService';

const DEFAULT_CSS = `/* Enhanced RTL Support from Blinko-RTL.css */
*:lang(he), *:lang(ar), *:lang(fa), *:lang(ur), *[dir="rtl"] {
    text-align: right !important;
    direction: rtl !important;
}

.markdown-body div, .markdown-body p, .markdown-body span {
    unicode-bidi: isolate !important;
}

.vditor-reset, .vditor-reset > div, .vditor-reset > p {
    unicode-bidi: isolate !important;
}

.card-masonry-grid .markdown-body {
    line-height: 1.35 !important;
}

.card-masonry-grid .markdown-body > div {
    margin-bottom: 0.3em !important;
}

*:dir(rtl) input[type="text"], *:dir(rtl) textarea {
    text-align: right !important;
    direction: rtl !important;
}

*:dir(rtl) ol, *:dir(rtl) ul {
    list-style-position: outside !important;
    padding-left: 0 !important;
    padding-right: 2em !important;
}

*:dir(rtl) blockquote {
    border-left: none !important;
    border-right: 3px solid currentcolor !important;
    padding-left: 0 !important;
    padding-right: 0.9em !important;
}`;

const APP_SHELL_CSS = `/* ==========================================================================
   1. App Shell & UI Protection
   Prevents the main interface (buttons, toolbars, layout) from flipping incorrectly.
   ========================================================================== */
#page-wrap,
#page-wrap > div,
#page-wrap > header,
header,
nav,
.sidebar,
.toolbar,
.flex,
.grid,
button,
.btn {
    direction: unset; /* Or 'ltr' if unset doesn't work specific cases */
}

/* ==========================================================================
   2. General Text Content (BiDi Support)
   Forces browser to auto-detect direction (LTR vs RTL) per paragraph.
   ========================================================================== */
.markdown-body p,
.markdown-body div,
.markdown-body span,
.vditor-reset p,
.vditor-reset div,
.vditor-reset span,
.card-masonry-grid p,
.card-masonry-grid div,
textarea,
[contenteditable],
input[type="text"] {
    unicode-bidi: isolate !important;
}

/* Specific spacing for editor paragraphs */
.vditor-reset p {
    margin-bottom: 8px;
}

/* Force RTL on the last element to ensure cursor behaves in editor */
.vditor-reset p:last-child,
.vditor-reset blockquote:last-child,
.vditor-reset pre:last-child,
.vditor-reset ul:last-child,
.vditor-reset ol:last-child,
.vditor-reset hr:last-child {
    direction: rtl;
}

/* ==========================================================================
   3. Headings
   Ensures titles respect bidirectional text and spacing.
   ========================================================================== */
.expanded-container .markdown-body h1,
.expanded-container .markdown-body h2,
.expanded-container .markdown-body h3,
.expanded-container .markdown-body h4,
.expanded-container .markdown-body h5,
.expanded-container .markdown-body h6,
.vditor-reset h1,
.vditor-reset h2,
.vditor-reset h3,
.vditor-reset h4,
.vditor-reset h5,
.vditor-reset h6 {
    unicode-bidi: isolate;
}

/* Heading margins for the editor */
.vditor-reset h1,
.vditor-reset h2,
.vditor-reset h3,
.vditor-reset h4,
.vditor-reset h5,
.vditor-reset h6 {
    margin-top: 12px;
    margin-bottom: 8px;
}

/* ==========================================================================
   4. Lists & Indentation
   Aligns bullets and numbers to the right and handles nesting.
   ========================================================================== */
ol,
ul,
menu,
.markdown-body ul,
.vditor-reset ul,
.vditor-reset ol {
    direction: rtl;
    unicode-bidi: isolate;
    margin: 0;
}

/* specific padding adjustment for editor lists */
.vditor-reset ul,
.vditor-reset ol {
    padding: 0px 1em 0px 1px;
}

/* ==========================================================================
   5. Tasks & Checkboxes
   Ensures checkboxes align correctly with text.
   ========================================================================== */
.vditor-task {
    direction: rtl;
    margin-left: 0px;
}

.vditor-task input {
    margin: 0;
    direction: rtl;
    unicode-bidi: isolate;
}

/* ==========================================================================
   6. Expanded / Reading View
   Specific layout tweaks for the expanded note view.
   ========================================================================== */
.expanded-container .markdown-body p,
.expanded-container .markdown-body blockquote,
.expanded-container .markdown-body ul,
.expanded-container .markdown-body ol,
.expanded-container .markdown-body dl,
.expanded-container .markdown-body pre,
.expanded-container .markdown-body details {
    margin-bottom: var(--base-size-8);
    padding: 0px 20px; /* 20PX normalized to lowercase */
    direction: rtl;
    unicode-bidi: isolate;
}

ul {
    direction: unset;
}`;

const MINIMAL_RTL_CSS = `/* Minimal RTL — fixes content direction without touching layout */
[dir="rtl"],
.rtl-force,
[lang="he"],
[lang="ar"],
[lang="fa"],
[lang="ur"] {
    direction: rtl !important;
    text-align: right !important;
}

/* Keep code blocks LTR */
pre, code, .code-block, .cm-line, .CodeMirror-line {
    direction: ltr !important;
    text-align: left !important;
    unicode-bidi: isolate !important;
}`;

const HEBREW_READING_CSS = `/* Hebrew Long-Form Reading — optimized typography for Hebrew documents */
.markdown-body,
.vditor-reset {
    unicode-bidi: plaintext;
}

.markdown-body p, .vditor-reset p {
    direction: rtl;
    text-align: right;
    line-height: 1.85;
    margin-bottom: 14px;
    font-size: 17px;
}

.markdown-body h1, .markdown-body h2, .markdown-body h3,
.markdown-body h4, .markdown-body h5, .markdown-body h6,
.vditor-reset h1, .vditor-reset h2, .vditor-reset h3,
.vditor-reset h4, .vditor-reset h5, .vditor-reset h6 {
    direction: rtl;
    text-align: right;
    font-weight: 600;
    margin-bottom: 16px;
}

.markdown-body blockquote, .vditor-reset blockquote {
    direction: rtl;
    border-left: none !important;
    border-right: 4px solid #6f42c1 !important;
    padding-left: 0 !important;
    padding-right: 1em !important;
    font-style: italic;
    color: inherit;
}

.markdown-body ul, .markdown-body ol,
.vditor-reset ul, .vditor-reset ol {
    direction: rtl;
    padding-right: 1.8em;
    padding-left: 0;
}

/* Keep code blocks LTR */
pre, code {
    direction: ltr !important;
    text-align: left !important;
    unicode-bidi: isolate !important;
}`;

const MIXED_BIDI_CSS = `/* Mixed Hebrew-English BiDi — auto-isolates each paragraph direction */
.markdown-body p,
.markdown-body div,
.markdown-body span,
.markdown-body li,
.vditor-reset p,
.vditor-reset div,
.vditor-reset span,
.vditor-reset li,
.card-masonry-grid .markdown-body p,
.card-masonry-grid .markdown-body div {
    unicode-bidi: isolate;
    direction: rtl;
    text-align: right;
}

/* Code blocks always LTR */
pre, code, .code-block, .cm-line, .CodeMirror-line {
    direction: ltr !important;
    unicode-bidi: isolate !important;
    text-align: left !important;
}

/* Input fields: let browser decide per character */
textarea, input[type="text"], [contenteditable] {
    unicode-bidi: plaintext !important;
}

/* Block quotes flip border side */
blockquote {
    border-left: none;
    border-right: 3px solid currentcolor;
    padding-left: 0;
    padding-right: 0.9em;
}`;

const CARD_GRID_RTL_CSS = `/* Card Grid RTL — targets card masonry grid layout specifically */
.card-masonry-grid .markdown-body,
.blog-masonry-grid .markdown-body {
    direction: rtl;
    unicode-bidi: isolate;
}

.card-masonry-grid .markdown-body p,
.card-masonry-grid .markdown-body div,
.card-masonry-grid .markdown-body span,
.blog-masonry-grid .markdown-body p,
.blog-masonry-grid .markdown-body div {
    direction: rtl;
    text-align: right;
    unicode-bidi: isolate;
    line-height: 1.35;
}

.card-masonry-grid .markdown-body > div,
.blog-masonry-grid .markdown-body > div {
    margin-bottom: 0.3em;
}

.card-masonry-grid .markdown-body ul,
.card-masonry-grid .markdown-body ol,
.blog-masonry-grid .markdown-body ul {
    direction: rtl;
    padding-right: 1.5em;
    padding-left: 0;
}

/* Protect app shell and non-content areas */
#page-wrap, header, nav, .sidebar, .toolbar, button, .btn {
    direction: ltr !important;
}`;

const BUILT_IN_PRESETS: Preset[] = [
  {
    id: 'default',
    name: 'Default CSS',
    css: DEFAULT_CSS,
    dynamicCSS: DEFAULT_DYNAMIC_CSS,
    targetSelectors: DEFAULT_TARGET_SELECTORS,
    disabledSelectors: [],
    isBuiltIn: true
  },
  {
    id: 'app-shell',
    name: 'Enhanced RTL (App Shell & UI)',
    css: APP_SHELL_CSS,
    isBuiltIn: true
  },
  {
    id: 'minimal-rtl',
    name: 'Minimal RTL (Direction Only)',
    css: MINIMAL_RTL_CSS,
    isBuiltIn: true
  },
  {
    id: 'hebrew-reading',
    name: 'Hebrew Long-Form Reading',
    css: HEBREW_READING_CSS,
    isBuiltIn: true
  },
  {
    id: 'mixed-bidi',
    name: 'Mixed Hebrew-English BiDi',
    css: MIXED_BIDI_CSS,
    isBuiltIn: true
  },
  {
    id: 'card-grid-rtl',
    name: 'Card Grid RTL',
    css: CARD_GRID_RTL_CSS,
    isBuiltIn: true
  }
];

/* ── Dynamic CSS Presets ── */
const DYNAMIC_PRESET_MINIMAL = `/* Minimal Dynamic CSS — only defines direction classes */
.blinko-detected-rtl {
    direction: rtl !important;
    text-align: right !important;
    unicode-bidi: isolate !important;
}

.rtl-force {
    direction: rtl !important;
    text-align: right !important;
    unicode-bidi: isolate !important;
}

.ltr-force {
    direction: ltr !important;
    text-align: left !important;
    unicode-bidi: isolate !important;
}`;

const DYNAMIC_PRESET_STRICT = `/* Strict RTL — high-specificity overrides, includes task list & SV protection */
.blinko-detected-rtl,
.rtl-force,
[dir="rtl"].rtl-force,
.markdown-body .rtl-force,
.vditor-reset .rtl-force {
    direction: rtl !important;
    text-align: right !important;
    unicode-bidi: isolate !important;
}

input.rtl-force, textarea.rtl-force,
.rtl-force input, .rtl-force textarea {
    direction: rtl !important;
    text-align: right !important;
}

.ltr-force {
    direction: ltr !important;
    text-align: left !important;
    unicode-bidi: isolate !important;
}

/* Task list: keep items stacked vertically in RTL */
ul.vditor-task.rtl-force,
ul.vditor-task[dir="rtl"],
[dir="rtl"] ul.vditor-task,
.rtl-force ul.vditor-task {
    display: block !important;
    flex-direction: unset !important;
}

ul.vditor-task.rtl-force > li,
ul.vditor-task[dir="rtl"] > li,
[dir="rtl"] ul.vditor-task > li {
    display: list-item !important;
    width: 100% !important;
}

/* Raw Markdown editor — per-line bidi, no direction flip */
.vditor-sv, .vditor-sv textarea {
    unicode-bidi: plaintext !important;
    direction: ltr !important;
}`;

const DYNAMIC_PRESET_BIDI_AUTO = `/* Auto BiDi — lets the browser handle direction per paragraph via plaintext */
.blinko-detected-rtl,
.rtl-force {
    unicode-bidi: plaintext !important;
    /* No forced direction — browser uses the first strong character */
}

.ltr-force {
    unicode-bidi: plaintext !important;
    direction: ltr !important;
}

/* Task list protection even in auto mode */
ul.vditor-task.rtl-force,
ul.vditor-task[dir="rtl"] {
    display: block !important;
    flex-direction: unset !important;
}

ul.vditor-task.rtl-force > li,
ul.vditor-task[dir="rtl"] > li {
    display: list-item !important;
    width: 100% !important;
}

/* Raw Markdown editor — plaintext bidi, no forced flip */
.vditor-sv, .vditor-sv textarea {
    unicode-bidi: plaintext !important;
    direction: ltr !important;
}`;

const DYNAMIC_PRESET_DEBUG = `/* Debug Visuals Always On — outlines RTL/LTR elements without toggling debugger */
.blinko-detected-rtl,
.rtl-force {
    direction: rtl !important;
    text-align: right !important;
    unicode-bidi: isolate !important;
    outline: 2px solid rgba(111, 66, 193, 0.6) !important;
    box-shadow: 0 0 4px rgba(111, 66, 193, 0.3) !important;
}

.ltr-force {
    direction: ltr !important;
    text-align: left !important;
    unicode-bidi: isolate !important;
    outline: 2px solid rgba(253, 126, 20, 0.5) !important;
    box-shadow: 0 0 4px rgba(253, 126, 20, 0.3) !important;
}

/* Task list protection */
ul.vditor-task.rtl-force,
ul.vditor-task[dir="rtl"],
[dir="rtl"] ul.vditor-task {
    display: block !important;
    flex-direction: unset !important;
}

ul.vditor-task.rtl-force > li,
ul.vditor-task[dir="rtl"] > li {
    display: list-item !important;
    width: 100% !important;
}

/* Raw Markdown editor */
.vditor-sv, .vditor-sv textarea {
    unicode-bidi: plaintext !important;
    direction: ltr !important;
}`;

interface DynamicCSSPreset {
  id: string;
  name: string;
  description: string;
  css: string;
}

const DYNAMIC_CSS_PRESETS: DynamicCSSPreset[] = [
  {
    id: 'dynamic-default',
    name: 'Default (Full RTL)',
    description: 'Full class definitions with task list & SV protection — the default.',
    css: DEFAULT_DYNAMIC_CSS
  },
  {
    id: 'dynamic-minimal',
    name: 'Minimal (Classes Only)',
    description: 'Just rtl-force / ltr-force classes, no layout overrides.',
    css: DYNAMIC_PRESET_MINIMAL
  },
  {
    id: 'dynamic-strict',
    name: 'Strict RTL',
    description: 'High-specificity overrides covering inputs, tasks, and editors.',
    css: DYNAMIC_PRESET_STRICT
  },
  {
    id: 'dynamic-bidi-auto',
    name: 'Auto BiDi (Plaintext)',
    description: 'Uses unicode-bidi: plaintext — browser picks direction per character.',
    css: DYNAMIC_PRESET_BIDI_AUTO
  },
  {
    id: 'dynamic-debug',
    name: 'Debug Visuals Always On',
    description: 'Outlines RTL/LTR elements with color without enabling the debug toggle.',
    css: DYNAMIC_PRESET_DEBUG
  }
];

export function RTLSetting(): JSX.Element {
  const [settings, setSettings] = useState<RTLSettings>({
    ...DEFAULT_SETTINGS,
    threshold: 0.15, // derived UI field, not stored in DEFAULT_SETTINGS by default
  });

  const [activeTab, setActiveTab] = useState<'simple' | 'advanced' | 'uiux'>('simple');
  const [uiuxSettings, setUIUXSettings] = useState<UIUXSettings>({ ...DEFAULT_UIUX_SETTINGS });
  const [uiuxSubTab, setUIUXSubTab] = useState<'typography' | 'navigation' | 'accessibility' | 'layout' | 'analysis'>('typography');
  const [uiuxService] = useState(() => new UIUXService());

  // Sync uiux service settings into local state on mount
  useEffect(() => {
    setUIUXSettings(uiuxService.getSettings());
    uiuxService.apply();
    return () => { /* keep service alive across re-renders */ };
  }, [uiuxService]);

  const saveUIUX = (partial: Partial<UIUXSettings>) => {
    uiuxService.updateSettings(partial);
    setUIUXSettings(uiuxService.getSettings());
    window.Blinko?.toast?.success('UI/UX settings updated');
  };

  const [customSelector, setCustomSelector] = useState('');
  const [testText, setTestText] = useState('');
  const [testResult, setTestResult] = useState('');
  const [selectedPresetId, setSelectedPresetId] = useState('');
  const [selectedDynamicPresetId, setSelectedDynamicPresetId] = useState('');
  const [actionLog, setActionLog] = useState<{ timestamp: string; element: string; direction: string; textPreview: string }[]>([]);
  const [cssError, setCssError] = useState('');
  const [importError, setImportError] = useState('');

  useEffect(() => {
    // Load initial settings with retry — window.blinkoRTL is set asynchronously (100ms delay)
    const loadSettings = () => {
        const api = (window as any).blinkoRTL;
        if (api) {
            const currentSettings = typeof api.settings === 'function' ? api.settings()
                : typeof api.getSettings === 'function' ? api.getSettings()
                : null;
            if (currentSettings) {
                setSettings(currentSettings);
                return true;
            }
        }
        return false;
    };

    if (!loadSettings()) {
        const retryInterval = setInterval(() => {
            if (loadSettings()) clearInterval(retryInterval);
        }, 100);
        setTimeout(() => clearInterval(retryInterval), 3000);
    }

    // Listen for settings changes (if triggered externally)
    const handleSettingsChange = (e: CustomEvent) => {
        setSettings(prev => ({ ...prev, ...e.detail }));
    };

    // Listen for log updates
    const handleLogUpdate = (e: CustomEvent) => {
        setActionLog(prev => [e.detail, ...prev].slice(0, 50));
    };

    // Load initial logs
    if (window.blinkoRTL?.service?.getActionLog) {
        setActionLog(window.blinkoRTL.service.getActionLog());
    }

    window.addEventListener('rtl-settings-changed', handleSettingsChange as EventListener);
    window.addEventListener('rtl-action-logged', handleLogUpdate as EventListener);

    return () => {
        window.removeEventListener('rtl-settings-changed', handleSettingsChange as EventListener);
        window.removeEventListener('rtl-action-logged', handleLogUpdate as EventListener);
    };
  }, []);

  const validateCSS = (css: string): boolean => {
      let openBraces = 0;
      for (let i = 0; i < css.length; i++) {
          if (css[i] === '{') openBraces++;
          if (css[i] === '}') openBraces--;
          if (openBraces < 0) return false;
      }
      return openBraces === 0;
  };

  const saveSettings = (newSettings: Partial<RTLSettings>) => {
    if (newSettings.dynamicCSS !== undefined) {
        if (!validateCSS(newSettings.dynamicCSS)) {
            setCssError('Invalid CSS: Unbalanced curly braces');
        } else {
            setCssError('');
        }
    }

    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    
    // Call service update if available
    if (window.blinkoRTL?.service) {
        window.blinkoRTL.service.updateSettings(newSettings);

        // Show feedback for any change
        window.Blinko.toast.success('Settings updated');
    } else {
        // Fallback or error logging if service is missing
        console.warn('RTL Service not found, settings might not persist correctly via StorageManager');
        // We could write to localStorage as a desperate fallback but let's trust the service
        localStorage.setItem('blinko-rtl-settings', JSON.stringify(updatedSettings));
        window.dispatchEvent(
            new CustomEvent('rtl-settings-changed', {
                detail: updatedSettings
            })
        );
    }
  };

  const testRTL = () => {
    if (!testText.trim()) return;
    // Use the exposed API directly which routes to detector
    // Make sure we pass the text properly
    const detector = window.blinkoRTL?.detector;
    if (detector) {
        const result = detector.detectRTL(testText);
        setTestResult(result ? 'RTL' : 'LTR');
    } else {
        // Fallback if plugin API is not available
        try {
            const tempDetector = new RTLDetector();
            const result = tempDetector.detectRTL(testText);
            setTestResult(result ? 'RTL' : 'LTR');
        } catch (e) {
            console.error('Failed to create fallback detector', e);
            console.warn('RTL Detector not found via global API or fallback');
        }
    }
  };

  const processAllContent = () => {
    if (window.blinkoRTL) {
        window.blinkoRTL.processAll();
        window.Blinko.toast.success('Content processed!');
    }
  };

  const addCustomSelector = () => {
    if (customSelector.trim() && !settings.targetSelectors.includes(customSelector.trim())) {
      saveSettings({
        targetSelectors: [...settings.targetSelectors, customSelector.trim()]
      });
      setCustomSelector('');
    }
  };

  const removeCustomSelector = (selector: string) => {
    saveSettings({
      targetSelectors: settings.targetSelectors.filter(s => s !== selector),
      disabledSelectors: settings.disabledSelectors.filter(s => s !== selector)
    });
  };

  const toggleSelector = (selector: string, isChecked: boolean) => {
      const isDisabled = settings.disabledSelectors.includes(selector);
      let newDisabledSelectors: string[];

      if (isChecked) {
           newDisabledSelectors = settings.disabledSelectors.filter(s => s !== selector);
      } else {
           if (!isDisabled) {
               newDisabledSelectors = [...settings.disabledSelectors, selector];
           } else {
               newDisabledSelectors = settings.disabledSelectors;
           }
      }
      saveSettings({ disabledSelectors: newDisabledSelectors });
  };

  const loadPreset = () => {
    if (!selectedPresetId) return;

    const allPresets = [...BUILT_IN_PRESETS, ...(settings.savedPresets || [])];
    const preset = allPresets.find(p => p.id === selectedPresetId);

    if (preset) {
      saveSettings({
          customCSS: preset.css,
          dynamicCSS: preset.dynamicCSS || settings.dynamicCSS,
          targetSelectors: preset.targetSelectors || settings.targetSelectors,
          disabledSelectors: preset.disabledSelectors || settings.disabledSelectors
      });
      window.Blinko.toast.success(`Preset "${preset.name}" loaded!`);
    }
  };

  const saveAsPreset = () => {
    const name = prompt('Enter a name for this Full Preset (CSS, Dynamic Rules, Selectors):');
    if (!name) return;

    const newPreset: Preset = {
      id: `custom-${Date.now()}`,
      name: name,
      css: settings.customCSS,
      dynamicCSS: settings.dynamicCSS,
      targetSelectors: settings.targetSelectors,
      disabledSelectors: settings.disabledSelectors,
      isBuiltIn: false
    };

    saveSettings({
      savedPresets: [...(settings.savedPresets || []), newPreset]
    });

    setSelectedPresetId(newPreset.id);
    window.Blinko.toast.success('Preset saved!');
  };

  const deletePreset = () => {
    if (!selectedPresetId) return;
    const isBuiltIn = BUILT_IN_PRESETS.some(p => p.id === selectedPresetId);
    if (isBuiltIn) {
      window.Blinko.toast.error('Cannot delete built-in presets.');
      return;
    }
    if (confirm('Are you sure you want to delete this preset?')) {
      saveSettings({
        savedPresets: (settings.savedPresets || []).filter(p => p.id !== selectedPresetId)
      });
      setSelectedPresetId('');
    }
  };

  const resetToDefaults = () => {
    if (confirm('Reset all settings to defaults? This cannot be undone.')) {
        const defaultSettings: RTLSettings = {
        ...DEFAULT_SETTINGS,
        savedPresets: settings.savedPresets || [] // Preserve user presets
        };
        saveSettings(defaultSettings);
        window.Blinko.toast.success('Settings reset to defaults');
    }
  };

  const resetDynamicCSS = () => {
      saveSettings({ dynamicCSS: DEFAULT_DYNAMIC_CSS });
      window.Blinko.toast.success('Dynamic CSS reset');
  };

  const loadDynamicPreset = () => {
    if (!selectedDynamicPresetId) return;
    const preset = DYNAMIC_CSS_PRESETS.find(p => p.id === selectedDynamicPresetId);
    if (preset) {
      saveSettings({ dynamicCSS: preset.css });
      window.Blinko.toast.success(`Dynamic preset "${preset.name}" loaded!`);
    }
  };

  const exportSettings = () => {
      try {
          let exportData: string;
          try {
              const service = window.blinkoRTL?.service;
              if (service && typeof service.exportSettings === 'function') {
                  exportData = service.exportSettings();
              } else {
                   throw new Error('Service unavailable');
              }
          } catch (e) {
               console.warn('Exporting from state fallback:', e);
               // Fallback: Manually constructing export data if service fails
               exportData = JSON.stringify({
                  version: 1,
                  source: 'blinko-rtl-support-plugin',
                  timestamp: Date.now(),
                  data: settings
              }, null, 2);
          }

          const blob = new Blob([exportData], { type: "application/json" });
          const url = URL.createObjectURL(blob);
          const downloadAnchorNode = document.createElement('a');
          downloadAnchorNode.href = url;
          downloadAnchorNode.download = `blinko-rtl-settings-v1-${Date.now()}.json`;
          document.body.appendChild(downloadAnchorNode); // Required for Firefox
          downloadAnchorNode.click();
          document.body.removeChild(downloadAnchorNode);
          URL.revokeObjectURL(url);
          if (window.Blinko) {
              window.Blinko.toast.success('Settings exported successfully');
          }
      } catch (e) {
          console.error('Export error:', e);
          if (window.Blinko) {
              window.Blinko.toast.error('Export failed');
          }
      }
  };

  const importSettings = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
          try {
              const content = e.target?.result as string;
              const service = window.blinkoRTL?.service;

              if (service) {
                  service.importSettings(content);
                  setImportError('');
                  window.Blinko.toast.success('Settings imported successfully!');
              } else {
                  throw new Error('Service not available');
              }

          } catch (err) {
              console.error('Import failed', err);
              setImportError('Failed to import settings: ' + (err instanceof Error ? err.message : 'Invalid file'));
              window.Blinko.toast.error('Import failed');
          }
      };
      reader.readAsText(file);
      // Reset input value to allow re-importing same file if needed
      (event.target as HTMLInputElement).value = '';
  };

  return (
    <div 
      className={settings.darkMode ? 'rtl-settings-dark' : ''}
      style={{ 
        maxWidth: '700px', 
        margin: '0 auto', 
        padding: '20px', 
        fontFamily: 'system-ui, sans-serif',
        background: settings.darkMode ? '#1a1a1a' : 'white',
        color: settings.darkMode ? '#e0e0e0' : '#000'
      }}>
      <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '2px solid #eee' }}>
        <h2 style={{ margin: '0 0 10px 0', color: settings.darkMode ? '#fff' : '#333' }}>
          🔧 Fixed RTL Language Support Settings
        </h2>
        <p style={{ margin: '0', color: settings.darkMode ? '#aaa' : '#666', fontSize: '14px' }}>
          Precise RTL support with manual control and optional permanent CSS injection.
        </p>
      </div>

      {/* Quick Actions */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        border: '2px solid #007bff', 
        borderRadius: '8px', 
        background: settings.darkMode ? '#2c3e50' : '#f8f9ff'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#007bff' }}>⚡ Quick Actions</h3>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
          <button
            onClick={processAllContent}
            disabled={!settings.enabled}
            style={{ 
              background: '#28a745', 
              color: 'white', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            🔄 Process All Content
          </button>
          
          <button
            onClick={() => {
              window.blinkoRTL?.toggle();
              window.Blinko.toast.success('RTL toggled!');
            }}
            style={{ 
              background: '#007bff', 
              color: 'white', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            🔄 Toggle RTL (ع/א)
          </button>
        </div>
      </div>

      {/* Real-time Action Log */}
      {settings.enableActionLog !== false && (
      <div style={{
        marginBottom: '30px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        background: settings.darkMode ? '#333' : '#fafafa',
        maxHeight: '300px',
        overflowY: 'auto'
      }}>
          <h3 style={{ margin: '0 0 15px 0', color: settings.darkMode ? '#fff' : '#333' }}>📜 Real-time Action Log</h3>
          {actionLog.length === 0 ? (
              <p style={{ color: settings.darkMode ? '#aaa' : '#666', fontStyle: 'italic' }}>No actions recorded yet...</p>
          ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', color: settings.darkMode ? '#ccc' : '#000' }}>
                  <thead>
                      <tr style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>
                          <th style={{ padding: '5px' }}>Time</th>
                          <th style={{ padding: '5px' }}>Element</th>
                          <th style={{ padding: '5px' }}>Action</th>
                          <th style={{ padding: '5px' }}>Details</th>
                      </tr>
                  </thead>
                  <tbody>
                      {actionLog.map((log, i) => (
                          <tr key={i} style={{ borderBottom: settings.darkMode ? '1px solid #444' : '1px solid #eee' }}>
                              <td style={{ padding: '5px', whiteSpace: 'nowrap' }}>{log.timestamp}</td>
                              <td style={{ padding: '5px', fontFamily: 'monospace' }} title={log.element}>{log.element}</td>
                              <td style={{ padding: '5px', color: log.direction === 'RTL' ? '#28a745' : '#007bff' }}>{log.direction}</td>
                              <td style={{ padding: '5px', color: settings.darkMode ? '#888' : '#666' }}>{log.textPreview}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          )}
      </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', marginBottom: '20px', borderBottom: '1px solid #ddd' }}>
        <button
          onClick={() => setActiveTab('simple')}
          style={{
            flex: 1,
            padding: '10px',
            background: activeTab === 'simple' ? (settings.darkMode ? '#444' : '#eee') : 'transparent',
            color: settings.darkMode ? '#fff' : '#333',
            border: 'none',
            borderBottom: activeTab === 'simple' ? '2px solid #007bff' : 'none',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Simple
        </button>
        <button
          onClick={() => setActiveTab('advanced')}
          style={{
            flex: 1,
            padding: '10px',
            background: activeTab === 'advanced' ? (settings.darkMode ? '#444' : '#eee') : 'transparent',
            color: settings.darkMode ? '#fff' : '#333',
            border: 'none',
            borderBottom: activeTab === 'advanced' ? '2px solid #007bff' : 'none',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Advanced
        </button>
        <button
          onClick={() => setActiveTab('uiux')}
          style={{
            flex: 1,
            padding: '10px',
            background: activeTab === 'uiux' ? (settings.darkMode ? '#444' : '#eee') : 'transparent',
            color: settings.darkMode ? '#fff' : '#333',
            border: 'none',
            borderBottom: activeTab === 'uiux' ? '2px solid #28a745' : 'none',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🎨 UI/UX
        </button>
      </div>

      {/* Simple Settings */}
      {activeTab === 'simple' && (
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        background: settings.darkMode ? '#333' : '#fafafa'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: settings.darkMode ? '#fff' : '#333' }}>🎛️ Basic Settings</h3>
        
        <div style={{ display: 'grid', gap: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.enabled}
              onChange={(e) => saveSettings({ enabled: (e.target as HTMLInputElement).checked })}
            />
            <span>🔧 Enable RTL Support</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.autoDetect}
              onChange={(e) => saveSettings({ autoDetect: (e.target as HTMLInputElement).checked })}
              disabled={!settings.enabled}
            />
            <span>🤖 Auto-detect Content (Recommended)</span>
          </label>
          <p style={{ margin: '0 0 0 30px', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
            Automatically detects Hebrew/Arabic content and applies RTL direction.
          </p>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.manualToggle}
              onChange={(e) => {
                const manualToggle = (e.target as HTMLInputElement).checked;
                saveSettings({ manualToggle });
                window.Blinko.toast.success('Settings saved');
                const api = (window as any).blinkoRTL;
                if (api && api.isEnabled()) {
                  api.processAll();
                }
              }}
              disabled={!settings.enabled}
            />
            <span>🔄 Force All RTL</span>
          </label>
          <p style={{ margin: '0 0 0 30px', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
            Forces RTL direction on everything, useful if auto-detection misses something.
          </p>

          <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', marginTop: '10px' }}>
            {/* Min Character Count Setting */}
            <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>
                <span>Minimum RTL Characters:</span>
                <span>{settings.minRTLChars}</span>
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                    type="range"
                    min="1"
                    max="20"
                    value={settings.minRTLChars}
                    onChange={(e) => saveSettings({ minRTLChars: parseInt((e.target as HTMLInputElement).value) })}
                    style={{ flex: 1, cursor: 'pointer' }}
                />
                <input
                    type="number"
                    min="1"
                    max="20"
                    value={settings.minRTLChars}
                    onChange={(e) => saveSettings({ minRTLChars: parseInt((e.target as HTMLInputElement).value) })}
                    style={{ width: '60px', padding: '5px' }}
                />
            </div>
            <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
                Elements with fewer than {settings.minRTLChars} RTL characters will be ignored.
            </p>
          </div>
        </div>
      </div>
      )}

      {/* Advanced Settings */}
      {activeTab === 'advanced' && (
      <div style={{
        marginBottom: '30px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        background: settings.darkMode ? '#333' : '#fafafa'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: settings.darkMode ? '#fff' : '#333' }}>🛠️ Advanced Configuration</h3>

        <div style={{ display: 'grid', gap: '15px' }}>

          <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '6px', background: settings.darkMode ? '#444' : '#fff' }}>
              <label style={{ display: 'block', fontWeight: '500', marginBottom: '5px' }}>
                  🔤 Minimum RTL Characters:
              </label>
              <input
                  type="number"
                  min="1"
                  max="20"
                  value={settings.minRTLChars}
                  onChange={(e) => {
                      const val = parseInt((e.target as HTMLInputElement).value, 10);
                      if (val > 0) {
                          saveSettings({ minRTLChars: val });
                          window.Blinko.toast.success('Settings saved');
                      }
                  }}
                  disabled={!settings.enabled}
                  style={{
                      padding: '5px',
                      borderRadius: '4px',
                      border: '1px solid #999',
                      width: '60px',
                      background: settings.darkMode ? '#222' : 'white',
                      color: settings.darkMode ? '#eee' : 'black'
                  }}
              />
              <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
                  Minimum number of RTL characters required to trigger detection.
              </p>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.mobileView}
              onChange={(e) => {
                  saveSettings({ mobileView: (e.target as HTMLInputElement).checked });
                  window.Blinko.toast.success('Settings saved');
              }}
              disabled={!settings.enabled}
            />
            <span>📱 Mobile Optimization View</span>
          </label>
          <p style={{ margin: '0 0 0 30px', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
            Applies specific CSS fixes for mobile layouts (e.g. preventing horizontal scroll).
          </p>

           <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.enablePasteInterceptor ?? true}
              onChange={(e) => {
                  saveSettings({ enablePasteInterceptor: (e.target as HTMLInputElement).checked });
                  window.Blinko.toast.success('Settings saved');
              }}
              disabled={!settings.enabled}
            />
            <span>📋 Paste Interceptor</span>
          </label>
          <p style={{ margin: '0 0 0 30px', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
            Detects mixed content on paste and offers to split/wrap it.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={settings.debugMode}
                  onChange={(e) => {
                      const debugMode = (e.target as HTMLInputElement).checked;
                      saveSettings({ debugMode });
                      (window as any).blinkoRTL?.service?.toggleDebugMode();
                      window.Blinko.toast.success(debugMode ? 'Debug Mode Enabled' : 'Debug Mode Disabled');
                  }}
                  disabled={!settings.enabled}
                />
                <span>🐞 Visual Debugger</span>
              </label>

              {settings.debugMode && (
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer', marginLeft: '30px' }}>
                    <input
                      type="checkbox"
                      checked={settings.debugShowElementNames}
                      onChange={(e) => {
                          const debugShowElementNames = (e.target as HTMLInputElement).checked;
                          saveSettings({ debugShowElementNames });
                          window.Blinko.toast.success('Settings saved');
                          // Re-trigger debug mode to update visuals
                          (window as any).blinkoRTL?.service?.toggleDebugMode();
                          (window as any).blinkoRTL?.service?.toggleDebugMode();
                      }}
                    />
                    <span>Show Element Names (e.g. "RTL (DIV)")</span>
                  </label>
              )}
          </div>
          <p style={{ margin: '0 0 0 30px', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
            Highlights detected RTL (Red) and LTR (Blue) elements.
          </p>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.debugShowElementNames}
              onChange={(e) => {
                  const debugShowElementNames = (e.target as HTMLInputElement).checked;
                  saveSettings({ debugShowElementNames });
                  window.blinkoRTL?.service?.updateSettings({ debugShowElementNames });
                  if (window.Blinko) {
                      window.Blinko.toast.success(debugShowElementNames ? 'Element names enabled' : 'Element names disabled');
                  }
              }}
              disabled={!settings.enabled}
            />
            <span>🏷️ Show Element Names</span>
          </label>
          <p style={{ margin: '0 0 0 30px', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
            Displays the HTML tag name next to the debug label (Requires Visual Debugger).
          </p>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.enableActionLog ?? true}
              onChange={(e) => {
                  const enableActionLog = (e.target as HTMLInputElement).checked;
                  saveSettings({ enableActionLog });
                  if (window.Blinko) {
                      window.Blinko.toast.success(enableActionLog ? 'Action log enabled' : 'Action log disabled');
                  }
              }}
              disabled={!settings.enabled}
            />
            <span>📜 Enable Action Log</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.showManualToggle ?? true}
              onChange={(e) => {
                  const showManualToggle = (e.target as HTMLInputElement).checked;
                  saveSettings({ showManualToggle });
                  if (window.Blinko) {
                      window.Blinko.toast.success(showManualToggle ? 'Toggle button shown' : 'Toggle button hidden');
                  }
              }}
              disabled={!settings.enabled}
            />
            <span>🖲️ Show Manual Toggle Button</span>
          </label>

           <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.manualMode}
              onChange={(e) => {
                  saveSettings({ manualMode: (e.target as HTMLInputElement).checked });
                  window.Blinko.toast.success('Settings saved');
              }}
              disabled={!settings.enabled}
            />
            <span>✋ Manual Mode (Strict Detection)</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={(e) => {
                const darkMode = (e.target as HTMLInputElement).checked;
                saveSettings({ darkMode });
                if (darkMode) {
                  document.body.classList.add('dark');
                } else {
                  document.body.classList.remove('dark');
                }
              }}
            />
            <span>🌙 Dark Mode Plugin UI</span>
          </label>
        </div>
      </div>
      )}

      {/* Dynamic CSS Rules Section */}
      <div style={{
        marginBottom: '30px',
        padding: '20px',
        border: '2px solid #6610f2',
        borderRadius: '8px',
        background: settings.darkMode ? '#2c2c3e' : '#f8f9ff'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#6610f2' }}>🎨 Dynamic CSS Rules</h3>
        <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: settings.darkMode ? '#aaa' : '#666' }}>
            These CSS rules are applied dynamically when RTL or LTR content is detected.
            Customize the class definitions below to control how detected elements are styled.
        </p>

        {/* Dynamic CSS Presets */}
        <div style={{ marginBottom: '15px', padding: '15px', background: settings.darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', borderRadius: '6px' }}>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', color: settings.darkMode ? '#eee' : '#333' }}>
            📚 Dynamic CSS Presets:
          </label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '8px' }}>
            <select
              value={selectedDynamicPresetId}
              onChange={(e) => setSelectedDynamicPresetId((e.target as HTMLSelectElement).value)}
              disabled={!settings.enabled}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                minWidth: '200px',
                background: settings.darkMode ? '#333' : 'white',
                color: settings.darkMode ? '#eee' : 'black'
              }}
            >
              <option value="">-- Select a Dynamic Preset --</option>
              {DYNAMIC_CSS_PRESETS.map(preset => (
                <option key={preset.id} value={preset.id}>{preset.name}</option>
              ))}
            </select>
            <button
              onClick={loadDynamicPreset}
              disabled={!settings.enabled || !selectedDynamicPresetId}
              style={{
                background: '#6610f2',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              📥 Load
            </button>
          </div>
          {selectedDynamicPresetId && (() => {
            const p = DYNAMIC_CSS_PRESETS.find(x => x.id === selectedDynamicPresetId);
            return p ? (
              <p style={{ margin: '0', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666', fontStyle: 'italic' }}>
                {p.description}
              </p>
            ) : null;
          })()}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <textarea
            value={settings.dynamicCSS}
            onChange={(e) => saveSettings({ dynamicCSS: (e.target as HTMLTextAreaElement).value })}
            placeholder="Enter your dynamic CSS rules here..."
            disabled={!settings.enabled}
            style={{
              width: '100%',
              height: '350px',
              padding: '10px',
              border: cssError ? '2px solid red' : '1px solid #ccc',
              borderRadius: '4px',
              fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace',
              fontSize: '13px',
              resize: 'vertical',
              background: settings.darkMode ? '#222' : 'white',
              color: settings.darkMode ? '#eee' : 'black'
            }}
          />
          {cssError && <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{cssError}</div>}
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={resetDynamicCSS}
            disabled={!settings.enabled}
            style={{
              background: '#17a2b8',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            🔄 Reset Dynamic CSS
          </button>
          <button
            onClick={() => {
                if (cssError) {
                    window.Blinko.toast.error('Please fix CSS errors before saving.');
                    return;
                }
                saveSettings({ dynamicCSS: settings.dynamicCSS }); // Trigger save explicitly
                window.Blinko.toast.success('Dynamic CSS Settings Saved');
            }}
            disabled={!settings.enabled}
             style={{
              background: '#28a745',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
             💾 Save Settings
          </button>
        </div>
      </div>

      {/* Permanent CSS Settings */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        border: '1px solid #28a745', 
        borderRadius: '8px', 
        background: settings.darkMode ? '#1e3023' : '#f8fff8'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#28a745' }}>📌 Permanent CSS Settings</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.permanentCSS}
              onChange={(e) => saveSettings({ permanentCSS: (e.target as HTMLInputElement).checked })}
              disabled={!settings.enabled}
            />
            <span>Enable Permanent CSS Injection</span>
          </label>
          <p style={{ margin: '5px 0 0 30px', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
            This CSS is injected permanently as long as the plugin is enabled, regardless of RTL detection.
            Use this for global overrides.
          </p>
        </div>

        {/* CSS Presets */}
        <div style={{ marginBottom: '15px', padding: '15px', background: settings.darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', borderRadius: '6px' }}>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px' }}>
            📚 CSS Presets:
          </label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <select
              value={selectedPresetId}
              onChange={(e) => setSelectedPresetId((e.target as HTMLSelectElement).value)}
              disabled={!settings.enabled}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                minWidth: '200px',
                background: settings.darkMode ? '#333' : 'white',
                color: settings.darkMode ? '#eee' : 'black'
              }}
            >
              <option value="">-- Select a Preset --</option>
              <optgroup label="Built-in Presets">
                {BUILT_IN_PRESETS.map(preset => (
                  <option key={preset.id} value={preset.id}>{preset.name}</option>
                ))}
              </optgroup>
              {(settings.savedPresets && settings.savedPresets.length > 0) && (
                <optgroup label="Saved Presets">
                  {settings.savedPresets.map(preset => (
                    <option key={preset.id} value={preset.id}>{preset.name}</option>
                  ))}
                </optgroup>
              )}
            </select>

            <button
              onClick={loadPreset}
              disabled={!settings.enabled || !selectedPresetId}
              style={{
                background: '#17a2b8',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              📥 Load
            </button>

            <button
              onClick={deletePreset}
              disabled={!settings.enabled || !selectedPresetId || BUILT_IN_PRESETS.some(p => p.id === selectedPresetId)}
              style={{
                background: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                opacity: (BUILT_IN_PRESETS.some(p => p.id === selectedPresetId)) ? 0.5 : 1
              }}
              title="Delete selected preset"
            >
              🗑️
            </button>
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '5px' }}>
            Custom CSS Code (Permanent):
          </label>
          <textarea
            value={settings.customCSS}
            onChange={(e) => saveSettings({ customCSS: (e.target as HTMLTextAreaElement).value })}
            placeholder="Enter your permanent custom CSS code here..."
            disabled={!settings.enabled}
            style={{ 
              width: '100%', 
              height: '200px', 
              padding: '10px', 
              border: '1px solid #ccc', 
              borderRadius: '4px',
              fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace',
              fontSize: '13px',
              resize: 'vertical',
              background: settings.darkMode ? '#222' : 'white',
              color: settings.darkMode ? '#eee' : 'black'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={saveAsPreset}
            disabled={!settings.enabled || !settings.customCSS.trim()}
            style={{ 
              background: '#28a745',
              color: 'white', 
              border: 'none', 
              padding: '8px 16px', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            💾 Save as New Preset
          </button>
          
          <button
            onClick={() => saveSettings({ customCSS: '' })}
            disabled={!settings.enabled}
            style={{ 
              background: '#dc3545', 
              color: 'white', 
              border: 'none', 
              padding: '8px 16px', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            🗑️ Clear CSS
          </button>
        </div>
      </div>

      {/* Testing */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        background: settings.darkMode ? '#333' : '#fafafa'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: settings.darkMode ? '#fff' : '#333' }}>🧪 Test RTL Detection</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <textarea
            value={testText}
            onChange={(e) => setTestText((e.target as HTMLTextAreaElement).value)}
            placeholder="Enter text to test RTL detection..."
            style={{ 
              width: '100%', 
              height: '80px', 
              padding: '10px', 
              border: '1px solid #ccc', 
              borderRadius: '4px',
              resize: 'vertical',
              fontFamily: 'inherit',
              background: settings.darkMode ? '#222' : 'white',
              color: settings.darkMode ? '#eee' : 'black'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <button 
            onClick={testRTL}
            style={{ 
              background: '#28a745', 
              color: 'white', 
              border: 'none', 
              padding: '8px 16px', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            🧪 Test Detection
          </button>
        </div>

        {testResult && (
          <div style={{ 
            padding: '10px', 
            background: testResult === 'RTL' ? '#d4edda' : '#f8d7da', 
            borderRadius: '4px',
            borderLeft: `4px solid ${testResult === 'RTL' ? '#28a745' : '#dc3545'}`,
            marginBottom: '15px',
            color: '#333'
          }}>
            Detection Result: <strong>{testResult === 'RTL' ? '➡️ RTL' : '⬅️ LTR'}</strong>
          </div>
        )}
      </div>

      {/* Advanced Actions & Import/Export */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        background: settings.darkMode ? '#333' : '#fafafa'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: settings.darkMode ? '#fff' : '#333' }}>🔧 Advanced Actions</h3>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            type="button"
            onClick={resetToDefaults}
            style={{ 
              padding: '10px 20px', 
              background: '#dc3545', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer', 
              fontWeight: '500' 
            }}
          >
            🔄 Reset to Defaults
          </button>

          <button
            type="button"
            onClick={exportSettings}
            style={{ 
              padding: '10px 20px', 
              background: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer', 
              fontWeight: '500' 
            }}
          >
            📋 Export Settings (JSON)
          </button>

          <label style={{
              padding: '10px 20px',
              background: '#007bff',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '500',
              display: 'inline-block'
            }}>
            📂 Import Settings (JSON)
            <input
              type="file"
              accept=".json"
              onChange={importSettings}
              style={{ display: 'none' }}
            />
          </label>
        </div>
        {importError && <p style={{ color: 'red', marginTop: '10px' }}>{importError}</p>}
      </div>

      {/* ══════════════════════════════════════════════════════════════
          UI/UX SETTINGS TAB
         ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'uiux' && (
        <div>
          {/* Sub-tab bar */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {(
              [
                { id: 'typography',   label: '🔤 Typography'   },
                { id: 'navigation',   label: '🧭 Navigation'   },
                { id: 'accessibility',label: '♿ Accessibility' },
                { id: 'layout',       label: '📐 Layout'       },
                { id: 'analysis',     label: '📋 UX Audit'     },
              ] as const
            ).map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setUIUXSubTab(id)}
                style={{
                  padding: '7px 14px',
                  border: `1px solid ${uiuxSubTab === id ? '#28a745' : '#ccc'}`,
                  borderRadius: '20px',
                  background: uiuxSubTab === id ? '#28a745' : 'transparent',
                  color: uiuxSubTab === id ? '#fff' : (settings.darkMode ? '#ccc' : '#555'),
                  cursor: 'pointer',
                  fontWeight: uiuxSubTab === id ? '600' : '400',
                  fontSize: '13px',
                  transition: 'all 0.15s',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* ── TYPOGRAPHY ── */}
          {uiuxSubTab === 'typography' && (
            <div style={{ display: 'grid', gap: '20px' }}>

              {/* Compact datetime */}
              <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '8px', background: settings.darkMode ? '#333' : '#fafafa' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600', cursor: 'pointer', marginBottom: '6px' }}>
                  <input
                    type="checkbox"
                    checked={uiuxSettings.compactDatetime}
                    onChange={e => saveUIUX({ compactDatetime: (e.target as HTMLInputElement).checked })}
                  />
                  <span>📅 Compact Date/Time Display</span>
                </label>
                <p style={{ margin: '0 0 10px 28px', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
                  Fixes the "2 hours ago" multi-row timestamp on mobile — forces it onto a single row.
                </p>
                {uiuxSettings.compactDatetime && (
                  <div style={{ marginLeft: '28px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '500', display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span>Font size: {uiuxSettings.datetimeFontSize}px</span>
                    </label>
                    <input
                      type="range" min="9" max="16" step="1"
                      value={uiuxSettings.datetimeFontSize}
                      onInput={e => saveUIUX({ datetimeFontSize: parseInt((e.target as HTMLInputElement).value) })}
                      style={{ width: '100%' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: settings.darkMode ? '#888' : '#999' }}>
                      <span>9px</span><span>16px</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Line height */}
              <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '8px', background: settings.darkMode ? '#333' : '#fafafa' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>📏 Note Body Line Height: {uiuxSettings.noteLineHeight.toFixed(1)}</span>
                </label>
                <p style={{ margin: '0 0 10px', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
                  Adjusts line spacing in note content. Higher values improve readability for dense text.
                </p>
                <input
                  type="range" min="1.0" max="2.5" step="0.1"
                  value={uiuxSettings.noteLineHeight}
                  onInput={e => saveUIUX({ noteLineHeight: parseFloat((e.target as HTMLInputElement).value) })}
                  style={{ width: '100%' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: settings.darkMode ? '#888' : '#999' }}>
                  <span>1.0 (tight)</span><span>2.5 (spacious)</span>
                </div>
              </div>

              {/* Toolbar icon size */}
              <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '8px', background: settings.darkMode ? '#333' : '#fafafa' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>🔧 Editor Toolbar Icon Size: {uiuxSettings.toolbarIconSize}px</span>
                </label>
                <p style={{ margin: '0 0 10px', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
                  Resize the B/I/S/link icons in the note editor formatting toolbar.
                </p>
                <input
                  type="range" min="12" max="28" step="2"
                  value={uiuxSettings.toolbarIconSize}
                  onInput={e => saveUIUX({ toolbarIconSize: parseInt((e.target as HTMLInputElement).value) })}
                  style={{ width: '100%' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: settings.darkMode ? '#888' : '#999' }}>
                  <span>12px (small)</span><span>28px (large)</span>
                </div>
              </div>

              {/* Mobile bottom-bar icon size */}
              <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '8px', background: settings.darkMode ? '#333' : '#fafafa' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>📱 Mobile Bottom-Bar Icon Size: {uiuxSettings.mobileToolbarIconSize}px</span>
                </label>
                <p style={{ margin: '0 0 10px', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
                  Controls the ⚡ # 🔗 🏷️ ✏️ icons in the bottom action bar on mobile.
                </p>
                <input
                  type="range" min="16" max="36" step="2"
                  value={uiuxSettings.mobileToolbarIconSize}
                  onInput={e => saveUIUX({ mobileToolbarIconSize: parseInt((e.target as HTMLInputElement).value) })}
                  style={{ width: '100%' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: settings.darkMode ? '#888' : '#999' }}>
                  <span>16px</span><span>36px</span>
                </div>
              </div>

              {/* Toolbar labels */}
              <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '8px', background: settings.darkMode ? '#333' : '#fafafa' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={uiuxSettings.showToolbarLabels}
                    onChange={e => saveUIUX({ showToolbarLabels: (e.target as HTMLInputElement).checked })}
                  />
                  <span>🏷️ Show Text Labels on Toolbar Icons</span>
                </label>
                <p style={{ margin: '6px 0 0 28px', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
                  Displays a small text label beneath toolbar icon buttons (requires icons to carry a data-label attribute).
                </p>
              </div>

            </div>
          )}

          {/* ── NAVIGATION ── */}
          {uiuxSubTab === 'navigation' && (
            <div style={{ display: 'grid', gap: '20px' }}>

              {/* Single-tap open */}
              <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '8px', background: settings.darkMode ? '#333' : '#fafafa' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600', cursor: 'pointer', marginBottom: '6px' }}>
                  <input
                    type="checkbox"
                    checked={uiuxSettings.singleTapOpenNote}
                    onChange={e => saveUIUX({ singleTapOpenNote: (e.target as HTMLInputElement).checked })}
                  />
                  <span>☝️ Single-Tap to Open Notes</span>
                </label>
                <p style={{ margin: '0 0 0 28px', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
                  Standardizes all note types (Blinko &amp; Blinko Article) to open with a single tap/click.
                  Resolves the inconsistency where Blinko notes required a double-tap while articles opened on single tap.
                </p>
                <div style={{ margin: '10px 0 0 28px', padding: '8px 12px', borderRadius: '6px', background: settings.darkMode ? '#2c3e50' : '#fff3cd', border: '1px solid #ffc107', fontSize: '12px', color: settings.darkMode ? '#ffd' : '#856404' }}>
                  ⚠️ This attaches a JavaScript listener that monitors the DOM for note cards.
                  If a card is already interactive (e.g. Blinko Article), the handler is a no-op.
                </div>
              </div>

              {/* Back button closes note */}
              <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '8px', background: settings.darkMode ? '#333' : '#fafafa' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600', cursor: 'pointer', marginBottom: '6px' }}>
                  <input
                    type="checkbox"
                    checked={uiuxSettings.backButtonClosesNote}
                    onChange={e => saveUIUX({ backButtonClosesNote: (e.target as HTMLInputElement).checked })}
                  />
                  <span>⬅️ Android Back Button Closes Note</span>
                </label>
                <p style={{ margin: '0 0 0 28px', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
                  Intercepts the hardware back button / gesture navigation on Android to close the currently
                  expanded note instead of navigating to a previous section or exiting the app.
                  Uses the History API — pushes a dummy state when a note overlay is open.
                </p>
                <div style={{ margin: '10px 0 0 28px', padding: '8px 12px', borderRadius: '6px', background: settings.darkMode ? '#2c3e50' : '#d1ecf1', border: '1px solid #bee5eb', fontSize: '12px', color: settings.darkMode ? '#9cf' : '#0c5460' }}>
                  ℹ️ Also applies a stronger CSS visual for the close (×) button when an overlay is open.
                </div>
              </div>

            </div>
          )}

          {/* ── ACCESSIBILITY ── */}
          {uiuxSubTab === 'accessibility' && (
            <div style={{ display: 'grid', gap: '20px' }}>

              {/* Reduce motion */}
              <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '8px', background: settings.darkMode ? '#333' : '#fafafa' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600', cursor: 'pointer', marginBottom: '6px' }}>
                  <input
                    type="checkbox"
                    checked={uiuxSettings.reduceMotion}
                    onChange={e => saveUIUX({ reduceMotion: (e.target as HTMLInputElement).checked })}
                  />
                  <span>🎭 Reduce / Disable Animations</span>
                </label>
                <p style={{ margin: '0 0 0 28px', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
                  Sets all CSS animation and transition durations to 0.01 ms. Recommended for users with
                  vestibular disorders, motion sensitivity, or performance-constrained devices.
                  The OS-level <code>prefers-reduced-motion</code> media query is always respected regardless.
                </p>
              </div>

              {/* Min touch targets */}
              <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '8px', background: settings.darkMode ? '#333' : '#fafafa' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600', cursor: 'pointer', marginBottom: '6px' }}>
                  <input
                    type="checkbox"
                    checked={uiuxSettings.minTouchTargets}
                    onChange={e => saveUIUX({ minTouchTargets: (e.target as HTMLInputElement).checked })}
                  />
                  <span>👆 Enforce Minimum Touch Targets</span>
                </label>
                <p style={{ margin: '0 0 10px 28px', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
                  Applies a minimum tap area to all interactive elements. Complies with WCAG 2.5.5 and
                  Material Design's 48 dp guideline. Fixes undersized buttons on mobile.
                </p>
                {uiuxSettings.minTouchTargets && (
                  <div style={{ marginLeft: '28px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '500', display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span>Target size: {uiuxSettings.touchTargetSize}px</span>
                    </label>
                    <input
                      type="range" min="36" max="64" step="4"
                      value={uiuxSettings.touchTargetSize}
                      onInput={e => saveUIUX({ touchTargetSize: parseInt((e.target as HTMLInputElement).value) })}
                      style={{ width: '100%' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: settings.darkMode ? '#888' : '#999' }}>
                      <span>36px</span><span>64px</span>
                    </div>
                  </div>
                )}
              </div>

              {/* High contrast */}
              <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '8px', background: settings.darkMode ? '#333' : '#fafafa' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600', cursor: 'pointer', marginBottom: '6px' }}>
                  <input
                    type="checkbox"
                    checked={uiuxSettings.highContrast}
                    onChange={e => saveUIUX({ highContrast: (e.target as HTMLInputElement).checked })}
                  />
                  <span>🔆 High Contrast Mode</span>
                </label>
                <p style={{ margin: '0 0 0 28px', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
                  Boosts colour contrast by 35% using CSS filter. Improves readability for low-vision users.
                </p>
              </div>

              {/* Focus indicators */}
              <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '8px', background: settings.darkMode ? '#333' : '#fafafa' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600', cursor: 'pointer', marginBottom: '6px' }}>
                  <input
                    type="checkbox"
                    checked={uiuxSettings.focusIndicators}
                    onChange={e => saveUIUX({ focusIndicators: (e.target as HTMLInputElement).checked })}
                  />
                  <span>⌨️ Always-Visible Focus Rings</span>
                </label>
                <p style={{ margin: '0 0 0 28px', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
                  Shows a blue outline around the focused element for keyboard navigation.
                  Important for accessibility compliance (WCAG 2.4.7).
                </p>
              </div>

            </div>
          )}

          {/* ── LAYOUT ── */}
          {uiuxSubTab === 'layout' && (
            <div style={{ display: 'grid', gap: '20px' }}>

              {/* Compact mode */}
              <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '8px', background: settings.darkMode ? '#333' : '#fafafa' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600', cursor: 'pointer', marginBottom: '6px' }}>
                  <input
                    type="checkbox"
                    checked={uiuxSettings.compactMode}
                    onChange={e => saveUIUX({ compactMode: (e.target as HTMLInputElement).checked })}
                  />
                  <span>📦 Compact Layout Mode</span>
                </label>
                <p style={{ margin: '0 0 0 28px', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
                  Reduces padding and spacing across cards, toolbars, and paragraphs for higher information density.
                  Ideal for power users on larger screens.
                </p>
              </div>

              {/* Card border-radius */}
              <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '8px', background: settings.darkMode ? '#333' : '#fafafa' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>🔲 Card Border Radius: {uiuxSettings.cardBorderRadius}px</span>
                </label>
                <p style={{ margin: '0 0 10px', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
                  Controls how rounded the note card corners appear. 0 = sharp, 16 = very rounded.
                </p>
                <input
                  type="range" min="0" max="20" step="2"
                  value={uiuxSettings.cardBorderRadius}
                  onInput={e => saveUIUX({ cardBorderRadius: parseInt((e.target as HTMLInputElement).value) })}
                  style={{ width: '100%' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: settings.darkMode ? '#888' : '#999' }}>
                  <span>0 (sharp)</span><span>20 (rounded)</span>
                </div>
              </div>

              {/* Shadow intensity */}
              <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '8px', background: settings.darkMode ? '#333' : '#fafafa' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                  🌑 Card Shadow Intensity
                </label>
                <p style={{ margin: '0 0 12px', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
                  Controls the depth / elevation of note cards.
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {(['none', 'subtle', 'normal', 'strong'] as const).map(level => (
                    <button
                      key={level}
                      onClick={() => saveUIUX({ shadowIntensity: level })}
                      style={{
                        padding: '7px 16px',
                        border: `2px solid ${uiuxSettings.shadowIntensity === level ? '#007bff' : '#ccc'}`,
                        borderRadius: '6px',
                        background: uiuxSettings.shadowIntensity === level ? '#007bff' : 'transparent',
                        color: uiuxSettings.shadowIntensity === level ? '#fff' : (settings.darkMode ? '#ccc' : '#555'),
                        cursor: 'pointer',
                        fontWeight: uiuxSettings.shadowIntensity === level ? '600' : '400',
                        textTransform: 'capitalize',
                        fontSize: '13px',
                      }}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ── UX AUDIT ── */}
          {uiuxSubTab === 'analysis' && (
            <div style={{ display: 'grid', gap: '16px' }}>
              <div style={{ padding: '16px', border: '2px solid #28a745', borderRadius: '8px', background: settings.darkMode ? '#1a2e1a' : '#f0fff4' }}>
                <h3 style={{ margin: '0 0 12px 0', color: '#28a745', fontSize: '15px' }}>
                  📋 Blinko UI/UX Audit — 15 Identified Issues
                </h3>
                <p style={{ margin: '0 0 16px', fontSize: '12px', color: settings.darkMode ? '#aaa' : '#666' }}>
                  Findings from cross-platform analysis (Android + Desktop). Items marked ✅ are addressable
                  via this plugin; items marked ⚙️ require core app changes.
                </p>
                {[
                  { status: '✅', title: 'Timestamp multi-row wrapping (mobile)', detail: 'Date/time label ("2 hours ago") wraps to 2-3 lines due to oversized font. Fix: enable Compact Date/Time under Typography.' },
                  { status: '✅', title: 'Double-tap inconsistency (Blinko vs Article)', detail: 'Blinko type notes require a double-tap to expand while Blinko Article opens on single tap. Fix: enable Single-Tap under Navigation.' },
                  { status: '✅', title: 'Android back button exits app', detail: 'Hardware back / swipe-back closes the app instead of the open note overlay. Fix: enable Back Button Closes Note under Navigation.' },
                  { status: '✅', title: 'Undersized touch targets on mobile', detail: 'Multiple toolbar icons and action buttons are <32 px — below the 48 dp WCAG/Material minimum. Fix: enable Minimum Touch Targets under Accessibility.' },
                  { status: '✅', title: 'Animations on motion-sensitive devices', detail: 'Slide/fade transitions play even on devices flagged with prefers-reduced-motion. Fix: enable Reduce Motion under Accessibility.' },
                  { status: '✅', title: 'Low information density on wide screens', detail: 'Card padding and toolbar gaps are large, wasting space on desktop. Fix: enable Compact Mode under Layout.' },
                  { status: '✅', title: 'Card corner radius inconsistency', detail: 'Different corner radii across card types break visual rhythm. Fix: use Card Border Radius slider under Layout.' },
                  { status: '✅', title: 'No focus rings for keyboard users', detail: 'Interactive elements have outline: none — breaks keyboard navigation entirely. Fix: enable Always-Visible Focus Rings under Accessibility.' },
                  { status: '⚙️', title: 'Editor toolbar RTL mirroring', detail: 'The formatting toolbar (B/I/S/Link) stays LTR even when editing RTL content. Align icon order to language direction — requires core change.' },
                  { status: '⚙️', title: 'Submit button icon mismatch (RTL)', detail: 'The submit arrow button (➤) points left in RTL mode, suggesting "back" rather than "send". CSS transform: scaleX(-1) partial fix possible but fragile.' },
                  { status: '⚙️', title: 'Masonry grid reflow on note expand', detail: 'Expanding a note causes the masonry grid to reflow and scroll the viewport. Requires virtualised list or position:fixed overlay — core change.' },
                  { status: '⚙️', title: 'Audio player visualiser is always LTR', detail: 'The waveform / progress bar plays left-to-right even in RTL context. Requires core player component change.' },
                  { status: '⚙️', title: 'Tag pill overflow truncation', detail: '#Main/Sub/Topic tags overflow card boundaries on narrow screens. Requires text-overflow: ellipsis + tooltip in core card component.' },
                  { status: '⚙️', title: 'No swipe-to-delete on mobile', detail: 'Deleting a note requires navigating a context menu. Native swipe gesture expected by mobile users.' },
                  { status: '⚙️', title: 'Loading skeleton missing on slow networks', detail: 'Cards appear empty before content loads with no placeholder skeleton. Degrades perceived performance.' },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: '10px',
                      padding: '10px 12px',
                      border: `1px solid ${settings.darkMode ? '#444' : '#e0e0e0'}`,
                      borderRadius: '6px',
                      background: settings.darkMode ? '#2a2a2a' : '#fff',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <span style={{ fontSize: '16px', flexShrink: 0 }}>{item.status}</span>
                      <div>
                        <strong style={{ fontSize: '13px', color: settings.darkMode ? '#ddd' : '#222' }}>
                          {i + 1}. {item.title}
                        </strong>
                        <p style={{ margin: '4px 0 0', fontSize: '12px', color: settings.darkMode ? '#999' : '#666', lineHeight: '1.5' }}>
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <p style={{ margin: '16px 0 0', fontSize: '11px', color: settings.darkMode ? '#888' : '#999' }}>
                  ✅ = Addressable via plugin CSS/JS &nbsp;|&nbsp; ⚙️ = Requires core application change (submit PR to Daniel-OS01/blinko or Aloklok/blinko)
                </p>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
