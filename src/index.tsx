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

// RTL CSS styles
const rtlCSS = `
*:lang(he), *:lang(ar), *:lang(fa), *:lang(ur), *[dir="rtl"] {
    text-align: right !important;
    direction: rtl !important;
}
.markdown-body div, .markdown-body p, .markdown-body span {
    unicode-bidi: plaintext !important;
}
*:dir(rtl) input[type="text"], *:dir(rtl) textarea {
    text-align: right !important;
    direction: rtl !important;
}
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
`;

/**
 * Main RTL plugin entry point registered with SystemJS
 */
System.register([], (exports) => ({
  execute: () => {
    const detector = new RTLDetector();
    const styler = new RTLStyler(detector);
    let isRTLEnabled = false;
    let styleElement: HTMLStyleElement | null = null;
    let toggleButton: HTMLButtonElement | null = null;

    function injectCSS() {
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = 'blinko-rtl-styles';
        styleElement.textContent = rtlCSS;
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
      toggleButton.title = 'Toggle RTL Support';
      
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

    function enableRTL() {
      isRTLEnabled = true;
      injectCSS();
      styler.startObserving();
      if (toggleButton) {
        toggleButton.classList.add('active');
      }
      localStorage.setItem('blinko-rtl-enabled', 'true');
      
      document.querySelectorAll('.markdown-body, textarea, input[type="text"]').forEach(el => {
        const text = (el as HTMLElement).textContent || (el as HTMLInputElement).value || '';
        if (detector.detectRTL(text)) {
          (el as HTMLElement).setAttribute('dir', 'rtl');
          (el as HTMLElement).setAttribute('lang', 'he');
        }
      });
    }

    function disableRTL() {
      isRTLEnabled = false;
      removeCSS();
      styler.stopObserving();
      if (toggleButton) {
        toggleButton.classList.remove('active');
      }
      localStorage.setItem('blinko-rtl-enabled', 'false');
      
      document.querySelectorAll('[dir="rtl"]').forEach(el => {
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

    function initializeRTLPlugin() {
      console.log('Initializing Blinko RTL Plugin...');
      
      createToggleButton();
      
      // Expose global API
      (window as any).blinkoRTL = {
        detector,
        styler,
        toggle: toggleRTL,
        enable: enableRTL,
        disable: disableRTL,
        isEnabled: () => isRTLEnabled,
        test: (text: string) => {
          const isRTL = detector.detectRTL(text);
          console.log(`Text "${text}" is ${isRTL ? 'RTL' : 'LTR'}`);
          return isRTL;
        }
      };

      console.log('Blinko RTL Plugin initialized successfully');
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
        
        // Initialize RTL functionality
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', initializeRTLPlugin);
        } else {
          initializeRTLPlugin();
        }

        // Add toolbar icon
        window.Blinko.addToolBarIcon({
          name: "rtl-support",
          icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m5 8 6 6'/><path d='m4 14 6-6 2-3'/><path d='M2 5h12'/><path d='M7 2h1'/><path d='m22 18-6-6'/><path d='m17 12-6 6-2 3'/><path d='M14 22h1'/><path d='M22 14h-7'/></svg>",
          placement: 'top',
          tooltip: 'RTL Language Support',
          content: () => {
            const container = document.createElement('div');
            container.setAttribute('data-plugin', 'rtl-support');
            render(<RTLApp detector={detector} styler={styler} />, container);
            return container;
          }
        });

        // Add right-click menu for RTL toggle
        window.Blinko.addRightClickMenu({
          name: 'rtl-toggle',
          label: 'Toggle RTL',
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
        styler.destroy();
        console.log('RTL Plugin destroyed');
      }
    });
  }
}));