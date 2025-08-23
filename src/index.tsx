import React from 'react';
import { createRoot } from 'react-dom/client';
import type { BasePlugin } from 'blinko';
import plugin from '../plugin.json';

import App from './app';
import SettingPanel from './setting';
import { RTLDetector } from './utils/rtlDetector';
import { RTLStyler } from './utils/rtlStyler';

import en from './locales/en.json';
import zh from './locales/zh.json';
import he from './locales/he.json';
import ar from './locales/ar.json';

declare var System: any;

System.register(['react', 'react-dom/client'], (exports: any, context: any) => {
  const react = context.import('react');
  const client = context.import('react-dom/client');

  return {
    execute: () => {
      const detector = new RTLDetector();
      const styler = new RTLStyler(detector);

      function initializeRTLPlugin() {
        console.log('Initializing Blinko RTL Plugin...');

        // Load saved settings
        const savedSettings = localStorage.getItem('blinko-rtl-settings');
        if (savedSettings) {
          try {
            const settings = JSON.parse(savedSettings);
            if (settings.enabled !== false) { // enabled by default
              styler.startObserving();

              // Update detector configuration
              if (settings.sensitivity || settings.minRTLChars) {
                detector.updateConfig({
                  sensitivity: settings.sensitivity || 'medium',
                  minRTLChars: settings.minRTLChars || 3
                });
              }

              // Update styler configuration
              styler.updateConfig({
                autoDetect: settings.autoDetect !== false,
                forceDirection: settings.forceDirection || 'auto',
                applyToSelectors: settings.customSelectors || [
                  '.note-content',
                  '.note-editor',
                  'textarea',
                  '.markdown-content',
                  '.note-text'
                ]
              });
            }
          } catch (error) {
            console.error('Failed to load RTL plugin settings:', error);
          }
        } else {
          // Default behavior - start observing
          styler.startObserving();
        }

        // Listen for settings changes
        window.addEventListener('rtl-settings-changed', (event: any) => {
          const settings = event.detail;

          if (settings.enabled) {
            styler.startObserving();

            // Update configurations
            detector.updateConfig({
              sensitivity: settings.sensitivity,
              minRTLChars: settings.minRTLChars || 3
            });

            styler.updateConfig({
              autoDetect: settings.autoDetect,
              forceDirection: settings.forceDirection,
              applyToSelectors: settings.customSelectors
            });
          } else {
            styler.stopObserving();
          }
        });

        // Expose RTL functionality globally for debugging
        (window as any).blinkoRTL = {
          detector: detector,
          styler: styler,
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
          const root = client.createRoot(container);
          root.render(React.createElement(SettingPanel));
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
            tooltip: 'RTL Support Settings',
            content: () => {
              const container = document.createElement('div');
              const root = client.createRoot(container);
              root.render(React.createElement(App, { detector, styler }));
              return container;
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
          styler.destroy();
          console.log('RTL Plugin destroyed');
        }
      });
    }
  }
});