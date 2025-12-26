/** @jsxImportSource preact */
/// <reference types="systemjs" />

import { render } from 'preact/compat';
import type { BasePlugin } from 'blinko';
import { RTLApp } from './app';
import { RTLSetting } from './setting';
import plugin from '../plugin.json';
import { RTLDetector } from './utils/rtlDetector';
import { RTLProcessor } from './utils/rtlProcessor';
import { defaultConfig } from './config';
import { DOMRTLRenderer } from './renderer';
import en from './locales/en.json';
import zh from './locales/zh.json';
import he from './locales/he.json';
import ar from './locales/ar.json';

/**
 * Advanced RTL plugin with multiple detection methods
 */
System.register([], (exports) => ({
  execute: () => {
    // Core components
    const detector = new RTLDetector();
    const renderer = new DOMRTLRenderer(defaultConfig);
    
    // Initial settings
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
      customSelectors: [] as string[],
      minRTLChars: 2,
      processInterval: 2000,
      hebrewRegex: true,
      arabicRegex: true,
      mixedContent: true
    };

    const processor = new RTLProcessor(defaultConfig, renderer, detector, settings);

    let toggleButton: HTMLButtonElement | null = null;
    let permanentStyleElement: HTMLStyleElement | null = null;

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

    function enableRTL() {
      console.log('Enabling RTL with settings:', settings);
      settings.enabled = true;
      injectPermanentCSS();
      processor.enable();
      
      if (toggleButton) {
        toggleButton.classList.add('active');
      }
      
      localStorage.setItem('blinko-rtl-enabled', 'true');
    }

    function disableRTL() {
      settings.enabled = false;
      if (!settings.permanentCSS) {
        removePermanentCSS();
      }
      processor.disable();
      
      if (toggleButton) {
        toggleButton.classList.remove('active');
      }
      
      localStorage.setItem('blinko-rtl-enabled', 'false');
    }

    function toggleRTL() {
      if (settings.enabled) {
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
          
          processor.updateSettings(settings);

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

        processor.updateSettings(settings);

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

        // Restart processor if enabled to pick up new settings
        if (settings.enabled) {
            processor.disable();
            processor.enable();
        }
      });

      // Global API
      (window as any).blinkoRTL = {
        detector,
        toggle: toggleRTL,
        enable: enableRTL,
        disable: disableRTL,
        isEnabled: () => settings.enabled,
        settings: () => ({ ...settings }),
        processAll: () => processor.processAllElements(),
        processElement: (el: HTMLElement) => processor.processElement(el),
        toggleManual: () => {
          settings.manualToggle = !settings.manualToggle;
          localStorage.setItem('blinko-rtl-settings', JSON.stringify(settings));
          processor.updateSettings(settings);
          if (settings.enabled) {
            processor.processAllElements();
          }
          return settings.manualToggle;
        },
        test: (text: string) => {
          const isRTL = detector.detectRTL(text);
          console.log(`Text "${text}" -> Detected: ${isRTL ? 'RTL' : 'LTR'}`);
          return isRTL;
        }
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
            render(<RTLApp detector={detector} />, container);
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
              settings.enabled ? i18n.t('rtl_enabled') : i18n.t('rtl_disabled')
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
        console.log('Advanced RTL Plugin destroyed');
      }
    });
  }
}));
