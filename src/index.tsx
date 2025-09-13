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

// Base RTL CSS - minimal and focused
const baseRTLCSS = `
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

/* Manual RTL Classes */
.rtl-manual {
    direction: rtl !important;
    text-align: right !important;
}

.ltr-manual {
    direction: ltr !important;
    text-align: left !important;
}

/* Auto-detected RTL */
.rtl-auto {
    direction: rtl !important;
    text-align: right !important;
    unicode-bidi: plaintext !important;
}

.ltr-auto {
    direction: ltr !important;
    text-align: left !important;
    unicode-bidi: plaintext !important;
}

/* Basic RTL support for common elements */
*[dir="rtl"] {
    direction: rtl !important;
    text-align: right !important;
}

*[lang="he"], *[lang="ar"] {
    direction: rtl !important;
    text-align: right !important;
}

/* Preserve layout containers */
.flex, .grid, header, nav, .sidebar, .toolbar, button, .btn {
    direction: ltr !important;
    unicode-bidi: isolate !important;
}
`;

/**
 * Fixed RTL plugin - focused and precise
 */
System.register([], (exports) => ({
  execute: () => {
    const detector = new RTLDetector();
    const styler = new RTLStyler(detector);
    let isRTLEnabled = false;
    let baseStyleElement: HTMLStyleElement | null = null;
    let customStyleElement: HTMLStyleElement | null = null;
    let toggleButton: HTMLButtonElement | null = null;
    let observer: MutationObserver | null = null;
    
    let settings = {
      enabled: true,
      sensitivity: 'medium' as 'high' | 'medium' | 'low',
      forceDirection: 'auto' as 'auto' | 'rtl' | 'ltr',
      autoDetect: false, // Disabled by default to prevent issues
      manualMode: true,
      customCSS: '',
      permanentCSS: false,
      targetSelectors: [
        '.markdown-body p',
        '.vditor-reset p',
        'textarea',
        '[contenteditable]'
      ],
      minRTLChars: 3
    };

    function injectBaseCSS() {
      if (!baseStyleElement) {
        baseStyleElement = document.createElement('style');
        baseStyleElement.id = 'blinko-rtl-base-styles';
        baseStyleElement.textContent = baseRTLCSS;
        document.head.appendChild(baseStyleElement);
      }
    }

    function injectCustomCSS() {
      if (settings.customCSS && settings.permanentCSS) {
        if (!customStyleElement) {
          customStyleElement = document.createElement('style');
          customStyleElement.id = 'blinko-rtl-custom-styles';
          document.head.appendChild(customStyleElement);
        }
        customStyleElement.textContent = settings.customCSS;
      }
    }

    function removeCustomCSS() {
      if (customStyleElement) {
        customStyleElement.remove();
        customStyleElement = null;
      }
    }

    function removeAllCSS() {
      if (baseStyleElement) {
        baseStyleElement.remove();
        baseStyleElement = null;
      }
      removeCustomCSS();
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

    function processElementManually(element: HTMLElement) {
      if (!element || !isRTLEnabled) return;
      
      // Skip if it's a layout element
      if (element.closest('.flex, .grid, header, nav, .sidebar, .toolbar, button, .btn')) {
        return;
      }

      const text = element.textContent || (element as HTMLInputElement).value || '';
      if (!text.trim()) return;

      const isRTL = detector.detectRTL(text);
      
      // Remove existing classes
      element.classList.remove('rtl-manual', 'ltr-manual', 'rtl-auto', 'ltr-auto');
      
      if (settings.manualMode) {
        // Manual mode - only apply when explicitly RTL
        if (isRTL && settings.forceDirection !== 'ltr') {
          element.classList.add('rtl-manual');
          element.setAttribute('dir', 'rtl');
          element.setAttribute('lang', 'he');
        } else if (settings.forceDirection === 'rtl') {
          element.classList.add('rtl-manual');
          element.setAttribute('dir', 'rtl');
          element.setAttribute('lang', 'he');
        } else {
          element.classList.add('ltr-manual');
          element.setAttribute('dir', 'ltr');
          element.removeAttribute('lang');
        }
      }
    }

    function processTargetElements() {
      if (!isRTLEnabled) return;
      
      settings.targetSelectors.forEach(selector => {
        try {
          document.querySelectorAll(selector).forEach(element => {
            processElementManually(element as HTMLElement);
          });
        } catch (error) {
          console.warn(`Invalid selector: ${selector}`);
        }
      });
    }

    function setupObserver() {
      if (observer) observer.disconnect();
      
      if (!settings.autoDetect) return;
      
      observer = new MutationObserver((mutations) => {
        if (!isRTLEnabled) return;
        
        let shouldProcess = false;
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            shouldProcess = true;
          }
        });

        if (shouldProcess) {
          setTimeout(processTargetElements, 200);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }

    function enableRTL() {
      isRTLEnabled = true;
      injectBaseCSS();
      injectCustomCSS();
      setupObserver();
      
      if (toggleButton) {
        toggleButton.classList.add('active');
      }
      
      localStorage.setItem('blinko-rtl-enabled', 'true');
      
      // Process existing elements
      setTimeout(processTargetElements, 100);
    }

    function disableRTL() {
      isRTLEnabled = false;
      
      if (!settings.permanentCSS) {
        removeAllCSS();
      } else {
        // Keep custom CSS if permanent
        if (baseStyleElement) {
          baseStyleElement.remove();
          baseStyleElement = null;
        }
      }
      
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      
      if (toggleButton) {
        toggleButton.classList.remove('active');
      }
      
      localStorage.setItem('blinko-rtl-enabled', 'false');
      
      // Remove RTL classes and attributes
      document.querySelectorAll('.rtl-manual, .rtl-auto, .ltr-manual, .ltr-auto').forEach(el => {
        el.classList.remove('rtl-manual', 'rtl-auto', 'ltr-manual', 'ltr-auto');
        el.removeAttribute('dir');
        el.removeAttribute('lang');
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
          
          // Apply permanent CSS if enabled
          if (settings.permanentCSS && settings.customCSS) {
            injectCustomCSS();
          }
        } catch (error) {
          console.error('Failed to load RTL plugin settings:', error);
        }
      }
    }

    function initializeRTLPlugin() {
      console.log('Initializing Fixed Blinko RTL Plugin...');
      
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

        // Update CSS
        if (settings.permanentCSS && settings.customCSS) {
          injectCustomCSS();
        } else {
          removeCustomCSS();
        }

        // Re-setup observer
        setupObserver();

        // Re-process if enabled
        if (isRTLEnabled) {
          setTimeout(processTargetElements, 100);
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
        processAll: processTargetElements,
        processElement: processElementManually,
        test: (text: string) => {
          const isRTL = detector.detectRTL(text);
          console.log(`Text "${text}" is ${isRTL ? 'RTL' : 'LTR'}`);
          return isRTL;
        }
      };

      console.log('Fixed Blinko RTL Plugin initialized successfully');
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
        if (observer) {
          observer.disconnect();
        }
        styler.destroy();
        console.log('Fixed RTL Plugin destroyed');
      }
    });
  }
}));