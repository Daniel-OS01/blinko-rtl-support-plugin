/** @jsxImportSource preact */
/// <reference types="systemjs" />

import { render } from 'preact/compat';
import type { BasePlugin } from 'blinko';
import { RTLApp } from './app';
import { RTLSetting } from './setting';
import plugin from '../plugin.json';
import { RTLDetector } from './utils/rtlDetector';
import { RTLStyler } from './utils/rtlStyler';
import { RTLProcessor } from './utils/rtlProcessor';
import en from './locales/en.json';
import zh from './locales/zh.json';
import he from './locales/he.json';
import ar from './locales/ar.json';

// Comprehensive RTL CSS from Blinko-RTL.css with enhancements
const comprehensiveRTLCSS = `
/* === COMPREHENSIVE RTL SUPPORT FOR BLINKO === */

/* Critical Layout Preservation - Prevent layout shifting */
#page-wrap, #page-wrap > div, #page-wrap > header, #page-wrap .app-content, #page-wrap .scroll-area,
#outer-container, #outer-container > div, .flex.max-w-full.items-center, .flex.items-center.justify-center,
.flex.items-center.select-none, .flex.items-start.gap-2, .flex.h-full.flex-1.flex-col, .overflow-y-auto,
.card-masonry-grid, .card-masonry-grid > div, .expand-container, .w-full.expand-container, header,
button, .btn, [role="button"], input[type="button"], input[type="submit"], input[type="reset"],
.group\\/sidebar, nav, .sidebar, .navigation, .toolbar, .menu {
    direction: ltr !important;
    unicode-bidi: isolate !important;
}

/* Enhanced RTL Content Detection */
*:lang(he), *:lang(ar), *:lang(fa), *:lang(ur), *[dir="rtl"] {
    text-align: right !important;
    direction: rtl !important;
}

/* Vditor Editor Comprehensive Support */
.vditor-reset, .vditor-content, .vditor-ir, .vditor-wysiwyg, .vditor-sv {
    unicode-bidi: plaintext !important;
}

.vditor-reset:lang(he), .vditor-reset:lang(ar), .vditor-reset[dir="rtl"],
.vditor-content:lang(he), .vditor-content:lang(ar), .vditor-content[dir="rtl"] {
    direction: rtl !important;
    text-align: right !important;
}

.vditor-reset > div, .vditor-reset > p, .vditor-reset > span,
.vditor-reset h1, .vditor-reset h2, .vditor-reset h3, .vditor-reset h4, .vditor-reset h5, .vditor-reset h6,
.vditor-reset li, .vditor-reset blockquote {
    unicode-bidi: plaintext !important;
}

.vditor-reset:lang(he) *, .vditor-reset:lang(ar) *, .vditor-reset[dir="rtl"] * {
    direction: inherit !important;
    text-align: inherit !important;
}

/* Markdown Body Enhanced Support */
.markdown-body, .markdown-body div, .markdown-body p, .markdown-body span {
    unicode-bidi: plaintext !important;
}

.markdown-body:lang(he), .markdown-body:lang(ar), .markdown-body[dir="rtl"] {
    direction: rtl !important;
    text-align: right !important;
}

.markdown-body > div, .markdown-body > p {
    unicode-bidi: plaintext !important;
}

/* Special attention to paragraph elements */
p:lang(he), p:lang(ar), p[dir="rtl"] {
    direction: rtl !important;
    text-align: right !important;
    unicode-bidi: plaintext !important;
}

/* Card Masonry Grid RTL with improved spacing */
.card-masonry-grid .markdown-body {
    line-height: 1.35 !important;
}

.card-masonry-grid .markdown-body > div {
    margin-bottom: 0.3em !important;
}

.card-masonry-grid .markdown-body div p {
    margin-bottom: 0.35em !important;
    margin-top: 0.15em !important;
}

.card-masonry-grid .markdown-body div:lang(he),
.card-masonry-grid .markdown-body div:lang(ar),
.card-masonry-grid .markdown-body div[dir="rtl"] {
    direction: rtl !important;
    text-align: right !important;
}

/* Text Elements Special Attention */
*:dir(rtl) p, [lang="he"] p, [lang="ar"] p {
    text-align: right !important;
    direction: rtl !important;
}

*:dir(rtl) h1, *:dir(rtl) h2, *:dir(rtl) h3, *:dir(rtl) h4, *:dir(rtl) h5, *:dir(rtl) h6,
[lang="he"] h1, [lang="he"] h2, [lang="he"] h3, [lang="he"] h4, [lang="he"] h5, [lang="he"] h6,
[lang="ar"] h1, [lang="ar"] h2, [lang="ar"] h3, [lang="ar"] h4, [lang="ar"] h5, [lang="ar"] h6 {
    text-align: right !important;
    direction: rtl !important;
}

/* Input and Textarea RTL */
*:dir(rtl) input[type="text"], *:dir(rtl) input[type="email"], *:dir(rtl) input[type="search"],
*:dir(rtl) textarea, [lang="he"] input[type="text"], [lang="he"] input[type="email"],
[lang="he"] input[type="search"], [lang="he"] textarea, [lang="ar"] input[type="text"],
[lang="ar"] input[type="email"], [lang="ar"] input[type="search"], [lang="ar"] textarea {
    text-align: right !important;
    direction: rtl !important;
}

/* Lists RTL Support */
*:dir(rtl) ol, *:dir(rtl) ul, [lang="he"] ol, [lang="he"] ul, [lang="ar"] ol, [lang="ar"] ul {
    list-style-position: outside !important;
    padding-left: 0 !important;
    padding-right: 2em !important;
}

*:dir(rtl) li, [lang="he"] li, [lang="ar"] li {
    text-align: right !important;
}

/* Content Containers */
.content, .note-content, .note-editor, .text-content, [contenteditable] {
    unicode-bidi: plaintext !important;
}

.content:lang(he), .content:lang(ar), .content[dir="rtl"],
.note-content:lang(he), .note-content:lang(ar), .note-content[dir="rtl"],
.note-editor:lang(he), .note-editor:lang(ar), .note-editor[dir="rtl"] {
    direction: rtl !important;
    text-align: right !important;
}

/* Code Blocks */
.markdown-body pre div, .card-masonry-grid pre div, pre div:nth-child(2) {
    unicode-bidi: plaintext !important;
}

/* Blockquotes RTL */
*:dir(rtl) blockquote, [lang="he"] blockquote, [lang="ar"] blockquote {
    border-left: none !important;
    border-right: 3px solid currentcolor !important;
    padding-left: 0 !important;
    padding-right: 0.9em !important;
}

/* Tables RTL */
*:dir(rtl) table, [lang="he"] table, [lang="ar"] table {
    direction: rtl !important;
}

*:dir(rtl) td, *:dir(rtl) th, [lang="he"] td, [lang="he"] th, [lang="ar"] td, [lang="ar"] th {
    text-align: right !important;
}

/* RTL Toggle Button */
.rtl-toggle-btn {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    font-size: 18px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.rtl-toggle-btn:hover {
    background: #0056b3;
    transform: scale(1.1);
}

.rtl-toggle-btn.active {
    background: #28a745;
}

/* Enhanced Detection Classes */
.rtl-detected {
    direction: rtl !important;
    text-align: right !important;
}

.ltr-detected {
    direction: ltr !important;
    text-align: left !important;
}

/* Mixed Content Support */
.mixed-content {
    unicode-bidi: plaintext !important;
}

/* Hebrew Character Detection */
*[title*="א"], *[title*="ב"], *[title*="ג"], *[title*="ד"], *[title*="ה"], *[title*="ו"],
*[title*="ז"], *[title*="ח"], *[title*="ט"], *[title*="י"], *[title*="כ"], *[title*="ל"],
*[title*="מ"], *[title*="ן"], *[title*="נ"], *[title*="ס"], *[title*="ע"], *[title*="פ"],
*[title*="צ"], *[title*="ק"], *[title*="ר"], *[title*="ש"], *[title*="ת"] {
    text-align: right !important;
    direction: rtl !important;
}

/* Spacing Improvements */
.expand-container .markdown-body p {
    margin-bottom: 0.4em !important;
    margin-top: 0.2em !important;
}

.scroll-area .markdown-body, .app-content .markdown-body {
    line-height: 1.35 !important;
}

/* Tags and Spans */
.markdown-body p > span, .card-masonry-grid span {
    font-size: 0.82em !important;
    vertical-align: baseline !important;
    unicode-bidi: plaintext !important;
}

/* Enhanced RTL Processing Classes */
.rtl-processing {
    transition: all 0.2s ease-in-out;
}

.rtl-force-rtl {
    direction: rtl !important;
    text-align: right !important;
    unicode-bidi: bidi-override !important;
}

.rtl-force-ltr {
    direction: ltr !important;
    text-align: left !important;
    unicode-bidi: normal !important;
}

/* Comprehensive automatic language detection for all nested content */
.card-masonry-grid .markdown-body div,
.card-masonry-grid .markdown-body p,
.card-masonry-grid .markdown-body a,
.card-masonry-grid .markdown-body span,
.app-content a,
.scroll-area a,
.markdown-body div,
.markdown-body p,
.markdown-body span {
    unicode-bidi: plaintext !important;
}
`;

/**
 * Robust RTL plugin with comprehensive Blinko support
 */
System.register([], (exports) => ({
  execute: () => {
    const detector = new RTLDetector();
    const styler = new RTLStyler(detector);
    let processor: RTLProcessor;
    let isRTLEnabled = false;
    let styleElement: HTMLStyleElement | null = null;
    let toggleButton: HTMLButtonElement | null = null;
    let observer: MutationObserver | null = null;
    
    let settings = {
      enabled: true,
      sensitivity: 'medium' as 'high' | 'medium' | 'low',
      forceDirection: 'auto' as 'auto' | 'rtl' | 'ltr',
      autoDetect: true,
      enhancedMode: true,
      vditorSupport: true,
      markdownSupport: true,
      enhancedTextProcessing: true,
      processMixedContent: true,
      layoutPreservation: true,
      unicodeBidiMode: 'plaintext' as 'plaintext' | 'embed' | 'bidi-override',
      customSelectors: [
        '.note-content',
        '.note-editor',
        'textarea',
        '.markdown-content',
        '.note-text',
        '.vditor-reset',
        '.content',
        '[contenteditable]',
        'p',
        'div.text',
        'span.text'
      ],
      minRTLChars: 3,
      aggressiveProcessing: false,
      realTimeProcessing: true
    };

    function injectCSS() {
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = 'blinko-rtl-styles';
        styleElement.textContent = comprehensiveRTLCSS;
        document.head.appendChild(styleElement);
      }
    }

    function removeCSS() {
      if (styleElement) {
        styleElement.remove();
        styleElement = null;
      }
    }

    function createToggleButton() {
      if (toggleButton) return;
      
      toggleButton = document.createElement('button');
      toggleButton.className = 'rtl-toggle-btn';
      toggleButton.innerHTML = 'ع/א';
      toggleButton.title = 'Toggle RTL Support (ع/א)\nClick to enable/disable RTL text direction';
      
      toggleButton.addEventListener('click', toggleRTL);
      document.body.appendChild(toggleButton);
      
      const savedState = localStorage.getItem('blinko-rtl-enabled');
      if (savedState === 'true') {
        enableRTL();
      }
    }

    function removeToggleButton() {
      if (toggleButton) {
        toggleButton.remove();
        toggleButton = null;
      }
    }

    function setupMutationObserver() {
      if (observer) observer.disconnect();
      
      observer = new MutationObserver((mutations) => {
        if (!isRTLEnabled || !settings.realTimeProcessing) return;
        
        let shouldProcess = false;
        
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                shouldProcess = true;
              }
            });
          } else if (mutation.type === 'characterData') {
            shouldProcess = true;
          }
        });

        if (shouldProcess) {
          // Debounce processing
          setTimeout(() => {
            processor.processAllElements();
          }, 100);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }

    function enableRTL() {
      isRTLEnabled = true;
      injectCSS();
      styler.startObserving();
      setupMutationObserver();
      
      if (toggleButton) {
        toggleButton.classList.add('active');
        toggleButton.title = 'RTL Support Active (ع/א)\nClick to disable RTL text direction';
      }
      
      localStorage.setItem('blinko-rtl-enabled', 'true');
      
      // Process all elements
      setTimeout(() => {
        processor.processAllElements();
      }, 100);
    }

    function disableRTL() {
      isRTLEnabled = false;
      removeCSS();
      styler.stopObserving();
      
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      
      if (toggleButton) {
        toggleButton.classList.remove('active');
        toggleButton.title = 'RTL Support Inactive (ع/א)\nClick to enable RTL text direction';
      }
      
      localStorage.setItem('blinko-rtl-enabled', 'false');
      
      // Remove all RTL attributes
      processor.removeAllRTL();
    }

    function toggleRTL() {
      if (isRTLEnabled) {
        disableRTL();
      } else {
        enableRTL();
      }
    }

    function loadSettings() {
      const savedSettings = localStorage.getItem('blinko-rtl-settings');
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          settings = { ...settings, ...parsed };
          
          detector.updateConfig({
            sensitivity: settings.sensitivity,
            minRTLChars: settings.minRTLChars
          });
          
          styler.updateConfig({
            autoDetect: settings.autoDetect,
            forceDirection: settings.forceDirection,
            applyToSelectors: settings.customSelectors
          });

          processor.updateSettings(settings);
        } catch (error) {
          console.error('Failed to load RTL plugin settings:', error);
        }
      }
    }

    function initializeRTLPlugin() {
      console.log('Initializing Robust Blinko RTL Plugin...');
      
      // Initialize processor
      processor = new RTLProcessor(detector, settings);
      
      loadSettings();
      createToggleButton();
      
      // Listen for settings changes
      window.addEventListener('rtl-settings-changed', (event: any) => {
        const newSettings = event.detail;
        settings = { ...settings, ...newSettings };
        
        detector.updateConfig({
          sensitivity: settings.sensitivity,
          minRTLChars: settings.minRTLChars
        });

        styler.updateConfig({
          autoDetect: settings.autoDetect,
          forceDirection: settings.forceDirection,
          applyToSelectors: settings.customSelectors
        });

        processor.updateSettings(settings);

        if (isRTLEnabled) {
          // Re-process all elements with new settings
          processor.removeAllRTL();
          setTimeout(() => {
            processor.processAllElements();
          }, 100);
        }
      });

      // Enhanced global API
      (window as any).blinkoRTL = {
        detector,
        styler,
        processor,
        toggle: toggleRTL,
        enable: enableRTL,
        disable: disableRTL,
        isEnabled: () => isRTLEnabled,
        settings: () => ({ ...settings }),
        updateSettings: (newSettings: any) => {
          settings = { ...settings, ...newSettings };
          processor.updateSettings(settings);
          localStorage.setItem('blinko-rtl-settings', JSON.stringify(settings));
        },
        processElement: (element: HTMLElement) => processor.processTextElement(element),
        processAllElements: () => processor.processAllElements(),
        processVditor: () => processor.processVditorElements(),
        processMarkdown: () => processor.processMarkdownElements(),
        removeAllRTL: () => processor.removeAllRTL(),
        test: (text: string) => {
          const isRTL = detector.detectRTL(text);
          console.log(`Text "${text}" is ${isRTL ? 'RTL' : 'LTR'}`);
          return isRTL;
        }
      };

      console.log('Robust Blinko RTL Plugin initialized successfully');
    }

    exports('default', class Plugin implements BasePlugin {
      constructor() {
        Object.assign(this, plugin);
      }

      withSettingPanel = true;

      renderSettingPanel = () => {
        const container = document.createElement('div');
        render(<RTLSetting />, container);
        return container;
      }

      async init() {
        this.initI18n();
        
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', initializeRTLPlugin);
        } else {
          initializeRTLPlugin();
        }

        // Enhanced toolbar icon
        window.Blinko.addToolBarIcon({
          name: "rtl-support",
          icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m5 8 6 6'/><path d='m4 14 6-6 2-3'/><path d='M2 5h12'/><path d='M7 2h1'/><path d='m22 18-6-6'/><path d='m17 12-6 6-2 3'/><path d='M14 22h1'/><path d='M22 14h-7'/></svg>",
          placement: 'top',
          tooltip: 'RTL Language Support (ع/א)',
          content: () => {
            const container = document.createElement('div');
            container.setAttribute('data-plugin', 'rtl-support');
            render(<RTLApp detector={detector} styler={styler} />, container);
            return container;
          }
        });

        // Enhanced right-click menu
        window.Blinko.addRightClickMenu({
          name: 'rtl-toggle',
          label: 'Toggle RTL (ع/א)',
          icon: 'material-symbols:format-textdirection-r-to-l',
          onClick: () => {
            toggleRTL();
            const i18n = window.Blinko.i18n;
            window.Blinko.toast.success(
              isRTLEnabled ? i18n.t('rtl_enabled') : i18n.t('rtl_disabled')
            );
          }
        });

        // Add process all content menu
        window.Blinko.addRightClickMenu({
          name: 'rtl-process-all',
          label: 'Process All RTL Content',
          icon: 'material-symbols:refresh',
          onClick: () => {
            if (isRTLEnabled) {
              processor.processAllElements();
              window.Blinko.toast.success('All content processed for RTL!');
            } else {
              window.Blinko.toast.info('Enable RTL support first');
            }
          }
        });

        // Add AI write prompt for RTL content
        window.Blinko.addAiWritePrompt(
          'Convert to RTL Format',
          'Please convert the following text to proper RTL format with Hebrew/Arabic support and appropriate text direction:',
          'material-symbols:format-textdirection-r-to-l'
        );
      }

      initI18n() {
        window.Blinko.i18n.addResourceBundle('en', 'translation', en);
        window.Blinko.i18n.addResourceBundle('zh', 'translation', zh);
        window.Blinko.i18n.addResourceBundle('he', 'translation', he);
        window.Blinko.i18n.addResourceBundle('ar', 'translation', ar);
      }

      destroy() {
        disableRTL();
        removeToggleButton();
        if (observer) {
          observer.disconnect();
        }
        styler.destroy();
        console.log('Robust RTL Plugin destroyed');
      }
    });
  }
}));