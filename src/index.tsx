/** @jsxImportSource preact */
/// <reference types="systemjs" />

import { render } from 'preact/compat';
import type { BasePlugin } from 'blinko';
import { RTLApp } from './app';
import { RTLSetting } from './setting';
import plugin from '../plugin.json';
import { RTLDetector } from './utils/rtlDetector';
import { RTLStyler } from './utils/rtlStyler';
import en from './locales/en.json';
import zh from './locales/zh.json';
import he from './locales/he.json';
import ar from './locales/ar.json';

// Enhanced RTL CSS from Blinko-RTL.css
const enhancedRTLCSS = `
/* === ENHANCED RTL SUPPORT FOR BLINKO === */

/* Critical Layout Preservation */
#page-wrap, #page-wrap > div, #page-wrap > header, #page-wrap .app-content, #page-wrap .scroll-area,
#outer-container, #outer-container > div, .flex.max-w-full.items-center, .flex.items-center.justify-center,
.flex.items-center.select-none, .flex.items-start.gap-2, .flex.h-full.flex-1.flex-col, .overflow-y-auto,
.card-masonry-grid, .card-masonry-grid > div, .expand-container, .w-full.expand-container, header,
button, .btn, [role="button"], input[type="button"], input[type="submit"], input[type="reset"],
.group\\/sidebar, .h-\\[calc\\(100\\%_-_70px\\)\\], .\\!overflow-y-auto, .overflow-x-hidden,
.mt-\\[-4px\\], .overflow-y-scroll, .scroll-smooth, .px-2, .mt-0, .md\\:mt-4, .md\\:px-6,
.w-full, .h-full, .\\!transition-all, .hidden, .md\\:flex, ul:not(.rtl-content),
li:not(.rtl-content), nav, .sidebar, .navigation {
    direction: ltr !important;
    unicode-bidi: isolate !important;
}

/* Enhanced RTL Content Detection */
*:lang(he), *:lang(ar), *:lang(fa), *:lang(ur), *[dir="rtl"] {
    text-align: right !important;
    direction: rtl !important;
}

/* Vditor Editor RTL Support */
.vditor-reset, .vditor-reset > div, .vditor-reset > p, .vditor-content {
    unicode-bidi: plaintext !important;
}

.vditor-reset:lang(he), .vditor-reset:lang(ar), .vditor-reset[dir="rtl"] {
    direction: rtl !important;
    text-align: right !important;
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

/* Card Masonry Grid RTL */
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
`;

/**
 * Enhanced RTL plugin with comprehensive Blinko support
 */
System.register([], (exports) => ({
  execute: () => {
    const detector = new RTLDetector();
    const styler = new RTLStyler(detector);
    let isRTLEnabled = false;
    let styleElement: HTMLStyleElement | null = null;
    let toggleButton: HTMLButtonElement | null = null;
    let settings = {
      enabled: true,
      sensitivity: 'medium' as 'high' | 'medium' | 'low',
      forceDirection: 'auto' as 'auto' | 'rtl' | 'ltr',
      autoDetect: true,
      enhancedMode: true,
      vditorSupport: true,
      markdownSupport: true,
      customSelectors: [
        '.note-content',
        '.note-editor',
        'textarea',
        '.markdown-content',
        '.note-text',
        '.vditor-reset',
        '.content',
        '[contenteditable]'
      ]
    };

    function injectCSS() {
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = 'blinko-rtl-styles';
        styleElement.textContent = enhancedRTLCSS;
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
      toggleButton.title = 'Toggle RTL Support (ع/א)';
      
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

    function processElement(element: Element) {
      const text = (element as HTMLElement).textContent || (element as HTMLInputElement).value || '';
      if (!text.trim()) return;

      const isRTL = detector.detectRTL(text);
      
      if (settings.forceDirection === 'rtl' || (settings.forceDirection === 'auto' && isRTL)) {
        element.setAttribute('dir', 'rtl');
        element.setAttribute('lang', 'he');
        element.classList.add('rtl-detected');
        element.classList.remove('ltr-detected');
      } else if (settings.forceDirection === 'ltr' || (settings.forceDirection === 'auto' && !isRTL)) {
        element.setAttribute('dir', 'ltr');
        element.removeAttribute('lang');
        element.classList.add('ltr-detected');
        element.classList.remove('rtl-detected');
      }
    }

    function processAllElements() {
      if (!isRTLEnabled) return;

      const selectors = settings.customSelectors.join(', ');
      const elements = document.querySelectorAll(selectors);
      
      elements.forEach(processElement);

      // Special handling for vditor and markdown
      if (settings.vditorSupport) {
        document.querySelectorAll('.vditor-reset, .vditor-content').forEach(processElement);
      }
      
      if (settings.markdownSupport) {
        document.querySelectorAll('.markdown-body, .markdown-body p, .markdown-body div').forEach(processElement);
      }
    }

    function enableRTL() {
      isRTLEnabled = true;
      injectCSS();
      styler.startObserving();
      if (toggleButton) {
        toggleButton.classList.add('active');
      }
      localStorage.setItem('blinko-rtl-enabled', 'true');
      
      processAllElements();
    }

    function disableRTL() {
      isRTLEnabled = false;
      removeCSS();
      styler.stopObserving();
      if (toggleButton) {
        toggleButton.classList.remove('active');
      }
      localStorage.setItem('blinko-rtl-enabled', 'false');
      
      // Remove RTL attributes
      document.querySelectorAll('[dir="rtl"], .rtl-detected').forEach(el => {
        el.removeAttribute('dir');
        el.removeAttribute('lang');
        el.classList.remove('rtl-detected', 'ltr-detected');
      });
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
            minRTLChars: settings.sensitivity === 'high' ? 1 : settings.sensitivity === 'medium' ? 3 : 5
          });
          
          styler.updateConfig({
            autoDetect: settings.autoDetect,
            forceDirection: settings.forceDirection,
            applyToSelectors: settings.customSelectors
          });
        } catch (error) {
          console.error('Failed to load RTL plugin settings:', error);
        }
      }
    }

    function initializeRTLPlugin() {
      console.log('Initializing Enhanced Blinko RTL Plugin...');
      
      loadSettings();
      createToggleButton();
      
      // Listen for settings changes
      window.addEventListener('rtl-settings-changed', (event: any) => {
        settings = { ...settings, ...event.detail };
        
        detector.updateConfig({
          sensitivity: settings.sensitivity,
          minRTLChars: settings.sensitivity === 'high' ? 1 : settings.sensitivity === 'medium' ? 3 : 5
        });

        styler.updateConfig({
          autoDetect: settings.autoDetect,
          forceDirection: settings.forceDirection,
          applyToSelectors: settings.customSelectors
        });

        if (isRTLEnabled) {
          processAllElements();
        }
      });

      // Enhanced mutation observer for dynamic content
      const observer = new MutationObserver((mutations) => {
        if (!isRTLEnabled) return;
        
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as Element;
                processElement(element);
                
                // Process child elements
                const children = element.querySelectorAll(settings.customSelectors.join(', '));
                children.forEach(processElement);
              }
            });
          } else if (mutation.type === 'characterData') {
            const parent = mutation.target.parentElement;
            if (parent) processElement(parent);
          }
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
      });

      // Expose enhanced global API
      (window as any).blinkoRTL = {
        detector,
        styler,
        toggle: toggleRTL,
        enable: enableRTL,
        disable: disableRTL,
        isEnabled: () => isRTLEnabled,
        settings: () => settings,
        processElement,
        processAllElements,
        test: (text: string) => {
          const isRTL = detector.detectRTL(text);
          console.log(`Text "${text}" is ${isRTL ? 'RTL' : 'LTR'}`);
          return isRTL;
        }
      };

      console.log('Enhanced Blinko RTL Plugin initialized successfully');
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

        // Add AI write prompt for RTL content
        window.Blinko.addAiWritePrompt(
          'Convert to RTL',
          'Please convert the following text to proper RTL format with Hebrew/Arabic support:',
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
        styler.destroy();
        console.log('Enhanced RTL Plugin destroyed');
      }
    });
  }
}));