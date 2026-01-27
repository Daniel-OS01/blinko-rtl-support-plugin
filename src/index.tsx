/** @jsxImportSource preact */
/// <reference types="systemjs" />

import { render } from 'preact/compat';
import type { BasePlugin } from 'blinko';
import { RTLApp } from './app';
import { RTLSetting } from './setting';
import plugin from '../plugin.json';
import { RTLDetector } from './utils/rtlDetector';
import { RTLService } from './services/rtlService';
import { BlinkoRTL } from './types';
import './assets/styles/Blinko-RTL.css';
import en from './locales/en.json';
import zh from './locales/zh.json';
import he from './locales/he.json';
import ar from './locales/ar.json';

/**
 * Advanced RTL plugin with multiple detection methods
 */
System.register([], (exports) => ({
  execute: () => {
    const detector = new RTLDetector();
    const rtlService = new RTLService(detector);
    let toggleButton: HTMLButtonElement | null = null;

    function createToggleButton() {
      if (toggleButton) return;
      
      const settings = rtlService.getSettings();

      toggleButton = document.createElement('button');
      toggleButton.className = 'rtl-toggle-btn';
      toggleButton.textContent = 'ع/א';
      toggleButton.title = 'Toggle RTL Support (Hebrew/Arabic)';
      
      toggleButton.addEventListener('click', () => {
          rtlService.toggle();
          updateToggleButtonState();
      });
      document.body.appendChild(toggleButton);
      
      if (settings.darkMode) {
        toggleButton.classList.add('dark-mode');
      }
      
      updateToggleButtonState();
    }

    function updateToggleButtonState() {
        if (!toggleButton) return;

        const settings = rtlService.getSettings();
        if (settings.showManualToggle === false) {
            toggleButton.style.display = 'none';
        } else {
            toggleButton.style.display = 'flex';
        }

        if (rtlService.isEnabled()) {
            toggleButton.classList.add('active');
        } else {
            toggleButton.classList.remove('active');
        }
    }

    function removeToggleButton() {
      if (toggleButton) {
        toggleButton.remove();
        toggleButton = null;
      }
    }

    function initializeRTLPlugin() {
      console.log('Initializing Advanced Blinko RTL Plugin...');
      
      createToggleButton();
      
      // Check if previously enabled
      const savedState = localStorage.getItem('blinko-rtl-enabled');
      if (savedState === 'true') {
        rtlService.enable();
        updateToggleButtonState();
      }

      // Listen for settings changes to update UI
      window.addEventListener('rtl-settings-changed', (event: any) => {
        const newSettings = event.detail;
        
        if (toggleButton) {
          if (newSettings.darkMode) {
            toggleButton.classList.add('dark-mode');
          } else {
            toggleButton.classList.remove('dark-mode');
          }

          if (newSettings.showManualToggle !== undefined) {
              updateToggleButtonState();
          }
        }

        // Service handles its own updates, we just update local UI if needed
      });

      // Global API
      const blinkoRTL: BlinkoRTL = {
        detector,
        service: rtlService, // Expose service
        toggle: () => {
            rtlService.toggle();
            updateToggleButtonState();
        },
        enable: () => {
            rtlService.enable();
            updateToggleButtonState();
        },
        disable: () => {
            rtlService.disable();
            updateToggleButtonState();
        },
        isEnabled: () => rtlService.isEnabled(),
        settings: () => rtlService.getSettings(),
        getSettings: () => rtlService.getSettings(), // Alias for app.tsx compatibility
        processAll: rtlService.processAllElements,
        processElement: rtlService.processElement,
        toggleManual: () => rtlService.toggleManual(),
        test: (text: string) => {
          const isRTL = detector.detectRTL(text);
          const hebrewTest = rtlService.detectHebrewRegex(text);
          const arabicTest = rtlService.detectArabicRegex(text);
          console.log(`Text "${text}" -> Original: ${isRTL ? 'RTL' : 'LTR'}, Hebrew: ${hebrewTest}, Arabic: ${arabicTest}`);
          return isRTL;
        },
        testHebrew: (text: string) => rtlService.detectHebrewRegex(text),
        testArabic: (text: string) => rtlService.detectArabicRegex(text),
        getStats: () => document.querySelectorAll('.rtl-force, .rtl-auto, [dir="rtl"]').length,
        setSensitivity: (val: number) => {
             let sens: 'high' | 'medium' | 'low' = 'medium';
             if (val < 0.12) sens = 'high';
             else if (val > 0.3) sens = 'low';
             rtlService.updateSettings({ threshold: val, sensitivity: sens });
        },
        fixSelection: () => {
             const selection = window.getSelection();
             if (!selection || selection.rangeCount === 0) return;
             const range = selection.getRangeAt(0);
             let node = range.commonAncestorContainer;
             if (node.nodeType === Node.TEXT_NODE) node = node.parentNode!;
             if (node instanceof HTMLElement) {
                 rtlService.processElement(node);
                 // Also walk up to block parent
                 const block = node.closest('p, div, li, td, th');
                 if (block) rtlService.processElement(block as HTMLElement);
             }
        }
      };

      window.blinkoRTL = blinkoRTL;

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
          tooltip: `RTL Language Support (v${plugin.version}) (ع/א)`,
          content: () => {
            const container = document.createElement('div');
            container.setAttribute('data-plugin', 'rtl-support');
            render(<RTLApp detector={detector} />, container);
            return container;
          }
        });

        window.Blinko.addRightClickMenu({
          name: 'rtl-toggle',
          label: 'Toggle RTL (ع/א)',
          icon: 'material-symbols:format-textdirection-r-to-l',
          onClick: () => {
            rtlService.toggle();
            updateToggleButtonState();
            const i18n = window.Blinko.i18n;
            window.Blinko.toast.success(
              rtlService.isEnabled() ? i18n.t('rtl_enabled') : i18n.t('rtl_disabled')
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
        rtlService.disable();
        removeToggleButton();
        console.log('Advanced RTL Plugin destroyed');
      }
    });
  }
}));
