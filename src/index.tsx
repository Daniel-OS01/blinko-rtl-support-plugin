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

// Advanced RTL CSS with multiple methods
const advancedRTLCSS = `
/* Method 1: Direct RTL styling */
.rtl-force {
    direction: rtl !important;
    text-align: right !important;
    unicode-bidi: embed !important;
}

.ltr-force {
    direction: ltr !important;
    text-align: left !important;
    unicode-bidi: embed !important;
}

/* Method 2: Hebrew/Arabic detection */
*[lang="he"], *[lang="ar"], *[dir="rtl"] {
    direction: rtl !important;
    text-align: right !important;
}

/* Method 3: Unicode bidi for auto-detection */
.rtl-auto {
    unicode-bidi: plaintext !important;
}

/* Method 4: CSS content detection */
p:has-text(/[\u0590-\u05FF\u0600-\u06FF]/),
div:has-text(/[\u0590-\u05FF\u0600-\u06FF]/) {
    direction: rtl !important;
    text-align: right !important;
}

/* Method 5: Comprehensive element targeting */
.markdown-body p, .markdown-body div, .markdown-body span,
.vditor-reset p, .vditor-reset div, .vditor-reset span,
.card-masonry-grid p, .card-masonry-grid div,
textarea, [contenteditable], input[type="text"] {
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

.rtl-toggle-btn.dark-mode {
    background: #1a1a1a;
    color: #fff;
}

.rtl-toggle-btn.dark-mode:hover {
    background: #333;
}

.rtl-toggle-btn.dark-mode.active {
    background: #0d7377;
}

/* Dark mode for settings */
.rtl-settings-dark {
    background: #1a1a1a !important;
    color: #000 !important;
}

.rtl-settings-dark input, .rtl-settings-dark select, .rtl-settings-dark textarea {
    background: #333 !important;
    color: #000 !important;
    border: 1px solid #555 !important;
}

.rtl-settings-dark button {
    background: #333 !important;
    color: #000 !important;
    border: 1px solid #555 !important;
}

.rtl-settings-dark h2, .rtl-settings-dark h3, .rtl-settings-dark h4,
.rtl-settings-dark p, .rtl-settings-dark span, .rtl-settings-dark label {
    color: #000 !important;
}

.rtl-settings-dark code {
    background: #2a2a2a !important;
    color: #000 !important;
}

.rtl-settings-dark small {
    color: #333 !important;
}

/* Layout preservation */
#page-wrap, #page-wrap > div, #page-wrap > header,
.flex, .grid, header, nav, .sidebar, .toolbar, button, .btn {
    direction: ltr !important;
    unicode-bidi: isolate !important;
}
`;

/**
 * Advanced RTL plugin with multiple detection methods
 */
System.register([], (exports) => ({
  execute: () => {
    const detector = new RTLDetector();
    const styler = new RTLStyler(detector);
    let isRTLEnabled = false;
    let styleElement: HTMLStyleElement | null = null;
    let permanentStyleElement: HTMLStyleElement | null = null;
    let toggleButton: HTMLButtonElement | null = null;
    let observer: MutationObserver | null = null;
    let autoProcessInterval: NodeJS.Timeout | null = null;
    
    let settings = {
      enabled: false,
      sensitivity: 'medium' as 'high' | 'medium' | 'low',
      forceDirection: 'auto' as 'auto' | 'rtl' | 'ltr',
      autoDetect: true,
      manualMode: false,
      manualToggle: false,
      darkMode: false,
      method: 'all' as 'direct' | 'attributes' | 'css' | 'unicode' | 'all',
      customCSS: '',
      permanentCSS: false,
      targetSelectors: [
        '.markdown-body p',
        '.markdown-body div',
        '.vditor-reset p', 
        '.vditor-reset div',
        '.card-masonry-grid .markdown-body p',
        '.card-masonry-grid .markdown-body div',
        'textarea',
        '[contenteditable="true"]',
        'input[type="text"]',
        '.CodeMirror-line',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'span', 'li', 'td', 'th'
      ],
      minRTLChars: 2,
      processInterval: 2000,
      hebrewRegex: true,
      arabicRegex: true,
      mixedContent: true
    };

    // Hebrew regex from userscript
    const hebrewRegex = /\p{Script=Hebrew}/u;
    const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;

    function injectCSS() {
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = 'blinko-rtl-advanced-styles';
        styleElement.textContent = advancedRTLCSS;
        document.head.appendChild(styleElement);
      }
    }

    function injectPermanentCSS() {
      if (settings.customCSS && settings.permanentCSS) {
        if (!permanentStyleElement) {
          permanentStyleElement = document.createElement('style');
          permanentStyleElement.id = 'blinko-rtl-permanent-styles';
          document.head.appendChild(permanentStyleElement);
        }
        permanentStyleElement.textContent = settings.customCSS;
      }
    }

    function removePermanentCSS() {
      if (permanentStyleElement) {
        permanentStyleElement.remove();
        permanentStyleElement = null;
      }
    }

    function removeCSS() {
      if (styleElement) {
        styleElement.remove();
        styleElement = null;
      }
      if (!settings.permanentCSS) {
        removePermanentCSS();
      }
    }

    function createToggleButton() {
      if (toggleButton) return;
      
      toggleButton = document.createElement('button');
      toggleButton.className = 'rtl-toggle-btn';
      toggleButton.innerHTML = 'ع/א';
      toggleButton.title = 'Toggle RTL Support (Hebrew/Arabic)';
      
      toggleButton.addEventListener('click', toggleRTL);
      document.body.appendChild(toggleButton);
      
      if (settings.darkMode) {
        toggleButton.classList.add('dark-mode');
      }
      
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

    // Method 1: Direct style application
    function applyDirectRTL(element: HTMLElement, isRTL: boolean) {
      if (isRTL) {
        element.style.direction = 'rtl';
        element.style.textAlign = 'right';
        element.style.unicodeBidi = 'embed';
      } else {
        element.style.direction = 'ltr';
        element.style.textAlign = 'left';
        element.style.unicodeBidi = 'normal';
      }
    }

    // Method 2: Attribute-based RTL
    function applyAttributeRTL(element: HTMLElement, isRTL: boolean) {
      if (isRTL) {
        element.setAttribute('dir', 'rtl');
        element.setAttribute('lang', 'he');
      } else {
        element.setAttribute('dir', 'ltr');
        element.removeAttribute('lang');
      }
    }

    // Method 3: CSS class-based RTL
    function applyCSSClassRTL(element: HTMLElement, isRTL: boolean) {
      element.classList.remove('rtl-force', 'ltr-force', 'rtl-auto');
      if (isRTL) {
        element.classList.add('rtl-force');
      } else {
        element.classList.add('ltr-force');
      }
    }

    // Method 4: Unicode bidi method
    function applyUnicodeBidiRTL(element: HTMLElement) {
      element.classList.add('rtl-auto');
      element.style.unicodeBidi = 'plaintext';
    }

    // Method 5: Hebrew regex detection (from userscript)
    function detectHebrewRegex(text: string): boolean {
      return hebrewRegex.test(text);
    }

    function detectArabicRegex(text: string): boolean {
      return arabicRegex.test(text);
    }

    function processElement(element: HTMLElement) {
      if (!element) return;
      
      // Skip layout elements
      if (element.closest('.flex, .grid, header, nav, .sidebar, .toolbar, button, .btn')) {
        return;
      }

      const text = element.textContent || (element as HTMLInputElement).value || '';
      if (!text.trim() || text.length < settings.minRTLChars) return;

      let isRTL = false;

      // Manual toggle - force RTL on all
      if (settings.manualToggle) {
        isRTL = true;
      }
      // Force direction override
      else if (settings.forceDirection === 'rtl') {
        isRTL = true;
      }
      else if (settings.forceDirection === 'ltr') {
        isRTL = false;
      }
      // Auto-detection with multiple methods
      else {
        // Hebrew regex detection
        if (settings.hebrewRegex && detectHebrewRegex(text)) {
          isRTL = true;
        }
        // Arabic regex detection
        else if (settings.arabicRegex && detectArabicRegex(text)) {
          isRTL = true;
        }
        // Original detector
        else {
          isRTL = detector.detectRTL(text);
        }
      }

      // Apply RTL using selected method
      switch (settings.method) {
        case 'direct':
          applyDirectRTL(element, isRTL);
          break;
        case 'attributes':
          applyAttributeRTL(element, isRTL);
          break;
        case 'css':
          applyCSSClassRTL(element, isRTL);
          break;
        case 'unicode':
          applyUnicodeBidiRTL(element);
          break;
        case 'all':
        default:
          // Apply all methods for maximum compatibility
          applyDirectRTL(element, isRTL);
          applyAttributeRTL(element, isRTL);
          applyCSSClassRTL(element, isRTL);
          break;
      }

      console.log(`Processed element with text: "${text.substring(0, 50)}..." -> ${isRTL ? 'RTL' : 'LTR'}`);
    }

    function processAllElements() {
      console.log('Processing all elements, RTL enabled:', isRTLEnabled, 'Method:', settings.method);
      
      let totalProcessed = 0;
      settings.targetSelectors.forEach(selector => {
        try {
          const elements = document.querySelectorAll(selector);
          console.log(`Found ${elements.length} elements for selector: ${selector}`);
          elements.forEach(element => {
            processElement(element as HTMLElement);
            totalProcessed++;
          });
        } catch (error) {
          console.warn(`Invalid selector: ${selector}`);
        }
      });
      
      console.log(`Total elements processed: ${totalProcessed}`);
    }

    function setupObserver() {
      if (observer) observer.disconnect();
      
      if (!settings.autoDetect) return;
      
      observer = new MutationObserver((mutations) => {
        if (!isRTLEnabled) return;
        
        let shouldProcess = false;
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as HTMLElement;
                processElement(element);
                
                settings.targetSelectors.forEach(selector => {
                  try {
                    element.querySelectorAll(selector).forEach(child => {
                      processElement(child as HTMLElement);
                    });
                  } catch (error) {
                    // Ignore invalid selectors
                  }
                });
                
                shouldProcess = true;
              }
            });
          }
        });

        if (shouldProcess) {
          setTimeout(processAllElements, 100);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }

    function startAutoProcessing() {
      if (autoProcessInterval) {
        clearInterval(autoProcessInterval);
      }
      
      if (settings.autoDetect && isRTLEnabled) {
        autoProcessInterval = setInterval(() => {
          if (isRTLEnabled && settings.autoDetect) {
            processAllElements();
          } else {
            clearInterval(autoProcessInterval!);
            autoProcessInterval = null;
          }
        }, settings.processInterval);
      }
    }

    function stopAutoProcessing() {
      if (autoProcessInterval) {
        clearInterval(autoProcessInterval);
        autoProcessInterval = null;
      }
    }

    function enableRTL() {
      console.log('Enabling RTL with settings:', settings);
      isRTLEnabled = true;
      injectCSS();
      injectPermanentCSS();
      setupObserver();
      startAutoProcessing();
      
      if (toggleButton) {
        toggleButton.classList.add('active');
      }
      
      localStorage.setItem('blinko-rtl-enabled', 'true');
      
      // Process existing elements immediately
      setTimeout(processAllElements, 100);
    }

    function disableRTL() {
      isRTLEnabled = false;
      removeCSS();
      stopAutoProcessing();
      
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      
      if (toggleButton) {
        toggleButton.classList.remove('active');
      }
      
      localStorage.setItem('blinko-rtl-enabled', 'false');
      
      // Remove RTL styling
      document.querySelectorAll('[dir="rtl"], [lang="he"], [lang="ar"]').forEach(el => {
        el.removeAttribute('dir');
        el.removeAttribute('lang');
      });
      
      document.querySelectorAll('.rtl-force, .rtl-auto, .ltr-force').forEach(el => {
        el.classList.remove('rtl-force', 'rtl-auto', 'ltr-force');
        (el as HTMLElement).style.direction = '';
        (el as HTMLElement).style.textAlign = '';
        (el as HTMLElement).style.unicodeBidi = '';
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
            minRTLChars: settings.minRTLChars
          });
          
          if (settings.permanentCSS && settings.customCSS) {
            injectPermanentCSS();
          }
        } catch (error) {
          console.error('Failed to load RTL plugin settings:', error);
        }
      }
    }

    function initializeRTLPlugin() {
      console.log('Initializing Advanced Blinko RTL Plugin...');
      
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

        if (settings.permanentCSS && settings.customCSS) {
          injectPermanentCSS();
        } else {
          removePermanentCSS();
        }

        if (toggleButton) {
          if (settings.darkMode) {
            toggleButton.classList.add('dark-mode');
          } else {
            toggleButton.classList.remove('dark-mode');
          }
        }

        setupObserver();
        startAutoProcessing();

        if (isRTLEnabled) {
          setTimeout(processAllElements, 100);
        }
      });

      // Global API
      (window as any).blinkoRTL = {
        detector,
        styler,
        toggle: toggleRTL,
        enable: enableRTL,
        disable: disableRTL,
        isEnabled: () => isRTLEnabled,
        settings: () => ({ ...settings }),
        processAll: processAllElements,
        processElement: processElement,
        toggleManual: () => {
          settings.manualToggle = !settings.manualToggle;
          localStorage.setItem('blinko-rtl-settings', JSON.stringify(settings));
          if (isRTLEnabled) {
            processAllElements();
          }
          return settings.manualToggle;
        },
        test: (text: string) => {
          const isRTL = detector.detectRTL(text);
          const hebrewTest = detectHebrewRegex(text);
          const arabicTest = detectArabicRegex(text);
          console.log(`Text "${text}" -> Original: ${isRTL ? 'RTL' : 'LTR'}, Hebrew: ${hebrewTest}, Arabic: ${arabicTest}`);
          return isRTL;
        },
        testHebrew: (text: string) => detectHebrewRegex(text),
        testArabic: (text: string) => detectArabicRegex(text)
      };

      console.log('Advanced Blinko RTL Plugin initialized successfully');
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
          setTimeout(initializeRTLPlugin, 100);
        }

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
        stopAutoProcessing();
        if (observer) {
          observer.disconnect();
        }
        styler.destroy();
        console.log('Advanced RTL Plugin destroyed');
      }
    });
  }
}));