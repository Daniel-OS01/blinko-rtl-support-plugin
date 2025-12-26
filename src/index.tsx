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
import { HoverContextManager } from './utils/hoverManager';
import { PasteInterceptor } from './utils/pasteInterceptor';
import en from './locales/en.json';
import zh from './locales/zh.json';
import he from './locales/he.json';
import ar from './locales/ar.json';

System.register([], (exports) => ({
  execute: () => {
    // Core components instances
    const detector = new RTLDetector();
    const renderer = new DOMRTLRenderer(defaultConfig);
    // Initial settings placeholder, will be updated from localStorage
    let currentSettings = { ...defaultConfig, ...{
        enabled: false,
        sensitivity: 'medium',
        threshold: 0.15,
        forceDirection: 'auto',
        autoDetect: true,
        manualMode: false,
        manualToggle: false,
        darkMode: false,
        method: 'all',
        customCSS: '',
        permanentCSS: false,
        visualStyles: {
            fontFamily: 'inherit',
            lineHeight: 1.5,
            paragraphMargin: 1
        },
        minRTLChars: 2,
        processInterval: 2000,
        hebrewRegex: true,
        arabicRegex: true,
        mixedContent: true
    }};

    // Initialize Processor
    const processor = new RTLProcessor(defaultConfig, renderer, detector, currentSettings);

    // Initialize Managers
    const pasteInterceptor = new PasteInterceptor(detector);
    let hoverManager: HoverContextManager | null = null;
    let toggleButton: HTMLButtonElement | null = null;

    // Helper: Permanent CSS Injection (User Custom CSS)
    let permanentStyleElement: HTMLStyleElement | null = null;

    function updatePermanentCSS() {
        if (currentSettings.customCSS && currentSettings.permanentCSS) {
            if (!permanentStyleElement) {
                permanentStyleElement = document.createElement('style');
                permanentStyleElement.id = 'blinko-rtl-permanent-styles';
                document.head.appendChild(permanentStyleElement);
            }
            permanentStyleElement.textContent = currentSettings.customCSS;
        } else if (permanentStyleElement) {
            permanentStyleElement.remove();
            permanentStyleElement = null;
        }
    }

    // Helper: Visual Styles Injection (Font, Line Height)
    let visualStyleElement: HTMLStyleElement | null = null;
    function updateVisualStyles() {
        if (!currentSettings.enabled) {
            if (visualStyleElement) {
                visualStyleElement.remove();
                visualStyleElement = null;
            }
            return;
        }

        if (!visualStyleElement) {
            visualStyleElement = document.createElement('style');
            visualStyleElement.id = 'blinko-rtl-visual-styles';
            document.head.appendChild(visualStyleElement);
        }

        const { fontFamily = 'inherit', lineHeight = 1.5, paragraphMargin = 1 } = currentSettings.visualStyles || {};
        visualStyleElement.textContent = `
            :root {
                --rtl-font-family: ${fontFamily === 'inherit' || !fontFamily ? 'inherit' : `"${fontFamily}", sans-serif`};
                --rtl-line-height: ${lineHeight};
                --rtl-paragraph-margin: ${paragraphMargin}em;
            }
        `;
    }

    // Helper: Toggle Button UI
    function createToggleButton() {
        if (toggleButton) return;

        toggleButton = document.createElement('button');
        toggleButton.className = 'rtl-toggle-btn';
        toggleButton.innerHTML = 'ع/א';
        toggleButton.title = 'Toggle RTL Support';

        // Add basic styles for the button if not in global CSS yet
        toggleButton.style.cssText = `
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
        `;

        toggleButton.addEventListener('click', toggleRTL);
        document.body.appendChild(toggleButton);
        updateToggleButtonState();
    }

    function updateToggleButtonState() {
        if (!toggleButton) return;

        if (currentSettings.enabled) {
            toggleButton.style.background = '#28a745'; // Green for active
        } else {
            toggleButton.style.background = '#007bff'; // Blue for inactive
        }

        if (currentSettings.darkMode) {
            toggleButton.style.border = '2px solid #fff';
        } else {
             toggleButton.style.border = 'none';
        }
    }

    function removeToggleButton() {
        if (toggleButton) {
            toggleButton.remove();
            toggleButton = null;
        }
    }

    // Main Control Functions
    function enableRTL() {
        console.log('Enabling RTL Support...');
        currentSettings.enabled = true;
        localStorage.setItem('blinko-rtl-enabled', 'true');
        
        processor.updateSettings(currentSettings);
        processor.enable();
        pasteInterceptor.enable();

        if (!hoverManager) {
            hoverManager = new HoverContextManager({
                selectors: defaultConfig.selectors.target,
                processElement: (el) => processor.processElement(el),
                isEnabled: () => currentSettings.enabled
            });
            hoverManager.init();
        }

        updatePermanentCSS();
        updateVisualStyles();
        updateToggleButtonState();
    }

    function disableRTL() {
        console.log('Disabling RTL Support...');
        currentSettings.enabled = false;
        localStorage.setItem('blinko-rtl-enabled', 'false');

        processor.disable();
        pasteInterceptor.disable();

        if (hoverManager) {
            hoverManager.destroy();
            hoverManager = null;
        }

        // Keep permanent CSS if configured
        if (!currentSettings.permanentCSS) {
             updatePermanentCSS(); // will remove it since logic checks params
        }
        updateVisualStyles(); // will remove
        updateToggleButtonState();
    }

    function toggleRTL() {
        if (currentSettings.enabled) {
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
                currentSettings = { ...currentSettings, ...parsed };

                // Update components
                detector.updateConfig({
                    sensitivity: currentSettings.sensitivity,
                    threshold: currentSettings.threshold,
                    minRTLChars: currentSettings.minRTLChars
                });
                processor.updateSettings(currentSettings);

                updatePermanentCSS();
            } catch (error) {
                console.error('Failed to load RTL plugin settings:', error);
            }
        }
        
        // Check enabled state separately for persistence across sessions
        const savedEnabled = localStorage.getItem('blinko-rtl-enabled');
        if (savedEnabled === 'true') {
            enableRTL();
        } else {
            // Even if disabled, we might want permanent CSS
            updatePermanentCSS();
        }
    }

    function initializeRTLPlugin() {
        console.log('Initializing Blinko RTL Plugin (Refactored)...');
        loadSettings();
        createToggleButton();

        // Event Listener for Settings Change
        window.addEventListener('rtl-settings-changed', (event: any) => {
            const newSettings = event.detail;
            const wasEnabled = currentSettings.enabled;

            currentSettings = { ...currentSettings, ...newSettings };

            // Update components
            detector.updateConfig({
                sensitivity: currentSettings.sensitivity,
                threshold: currentSettings.threshold,
                minRTLChars: currentSettings.minRTLChars
            });
            processor.updateSettings(currentSettings);

            updatePermanentCSS();
            updateVisualStyles();
            updateToggleButtonState();

            // Handle Enable/Disable transition if changed in settings UI
            if (newSettings.enabled !== undefined && newSettings.enabled !== wasEnabled) {
                if (newSettings.enabled) enableRTL();
                else disableRTL();
            } else if (currentSettings.enabled) {
                // If already enabled and settings changed, re-run processor to apply changes
                processor.disable(); // Refresh
                processor.enable();
            }
        });

        // Expose API
        (window as any).blinkoRTL = {
            toggle: toggleRTL,
            enable: enableRTL,
            disable: disableRTL,
            isEnabled: () => currentSettings.enabled,
            getSettings: () => ({ ...currentSettings }),
            processAll: () => processor.processAllElements(),
            processElement: (el: HTMLElement) => processor.processElement(el),
            toggleManual: () => {
                currentSettings.manualToggle = !currentSettings.manualToggle;
                // Save this specific toggle
                localStorage.setItem('blinko-rtl-settings', JSON.stringify(currentSettings));
                processor.updateSettings(currentSettings);
                if (currentSettings.enabled) processor.processAllElements();
                return currentSettings.manualToggle;
            },
            test: (text: string) => detector.detectRTL(text),
            getStats: () => document.querySelectorAll('.rtl-detected, [dir="rtl"]').length,
            fixSelection: () => {
                 const selection = window.getSelection();
                 if (!selection || selection.rangeCount === 0) return;
                 const range = selection.getRangeAt(0);
                 let node = range.commonAncestorContainer;
                 if (node.nodeType === Node.TEXT_NODE) node = node.parentNode!;
                 if (node instanceof HTMLElement) {
                     processor.processElement(node);
                     // Also walk up to block parent
                     const block = node.closest('p, div, li, td, th');
                     if (block) processor.processElement(block as HTMLElement);
                 }
            }
        };
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
          tooltip: 'RTL Language Support',
          content: () => {
            const container = document.createElement('div');
            container.setAttribute('data-plugin', 'rtl-support');
            // RTLApp uses the global blinkoRTL or passed props.
            // We can pass the detector if needed, but it seems RTLApp is just a stats view.
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
              currentSettings.enabled ? i18n.t('rtl_enabled') : i18n.t('rtl_disabled')
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
        console.log('Blinko RTL Plugin destroyed');
      }
    });
  }
}));
