/** @jsxImportSource preact */
/// <reference types="systemjs" />

import { render } from 'preact/compat';
import type { BasePlugin } from 'blinko';
import type { Note } from 'blinko/dist/types/src/server/types';
import { RTLApp } from './app';
import { RTLSetting } from './setting';
import plugin from '../plugin.json';
import { RTLDetector } from './utils/rtlDetector';
import { RTLService } from './services/rtlService';
import { BlinkoRTL } from './types';
import { UIUXService } from './services/uiuxService';
import { AIPostService } from './services/aiPostService';
import './assets/styles/Blinko-RTL.css';
import './assets/styles/Blinko-UIUX.css';
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
    const uiuxService = new UIUXService();
    const aiPostService = new AIPostService();
    // Inject base CSS (toggle button styles, layout protection) immediately — always present
    rtlService.injectBaseCSS();
    // Apply UI/UX enhancements based on persisted settings
    uiuxService.apply();
    let toggleButton: HTMLButtonElement | null = null;

    function createToggleButton() {
      if (toggleButton) return;
      
      const settings = rtlService.getSettings();
      if (settings.enableManualToggleBtn === false) return;

      toggleButton = document.createElement('button');
      toggleButton.className = 'rtl-toggle-btn';
      toggleButton.textContent = 'ع/א';
      toggleButton.title = 'Toggle RTL Support (Hebrew/Arabic)';
      toggleButton.setAttribute('aria-label', 'Toggle RTL Support');
      toggleButton.setAttribute('aria-pressed', 'false');
      
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
        // Respect showManualToggle setting
        if (settings.showManualToggle === false) {
            toggleButton.style.display = 'none';
        } else {
            toggleButton.style.display = 'flex';
        }

        if (rtlService.isEnabled()) {
            toggleButton.classList.add('active');
            toggleButton.setAttribute('aria-pressed', 'true');
        } else {
            toggleButton.classList.remove('active');
            toggleButton.setAttribute('aria-pressed', 'false');
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
      
      // Re-enable if settings say enabled (persisted state)
      if (rtlService.getSettings().enabled) {
        rtlService.enable();
        updateToggleButtonState();
      }

      // Listen for settings changes to update UI
      window.addEventListener('rtl-settings-changed', (event: any) => {
        const newSettings = event.detail;
        
        if (newSettings.enableManualToggleBtn === false) {
             removeToggleButton();
        } else if (newSettings.enableManualToggleBtn !== false && !toggleButton) {
             createToggleButton();
        }

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
      // Expose aiPostService for settings panel access
      (window as any).blinkoAIPost = aiPostService;

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

        // ── AI Post Processing menu item ────────────────────────────────────
        window.Blinko.addRightClickMenu({
          name: 'ai-rerun-processing',
          label: '🤖 Rerun AI Processing',
          icon: 'material-symbols:auto-fix',
          onClick: async (note: Note) => {
            const s = aiPostService.getSettings();
            if (!s.enabled) {
              window.Blinko.toast.error('AI Processing is disabled in plugin settings.');
              return;
            }
            if (!note?.id) {
              window.Blinko.toast.error('Note ID not available.');
              return;
            }

            window.Blinko.toast.success('🤖 Processing note with AI…');

            try {
              const aiContent = await aiPostService.runPostProcessing(note as any);
              if (!aiContent) {
                window.Blinko.toast.error('AI returned an empty response.');
                return;
              }

              if (s.showPreviewBeforeApply) {
                // Show a preview dialog before committing the change
                const container = document.createElement('div');
                container.style.cssText = 'padding:16px;max-height:70vh;overflow-y:auto;font-family:system-ui,sans-serif;';

                const pre = document.createElement('pre');
                pre.style.cssText = 'white-space:pre-wrap;word-break:break-word;font-size:13px;line-height:1.6;margin:0 0 16px;padding:12px;background:#1e1e2e;color:#cdd6f4;border-radius:6px;';
                pre.textContent = aiContent;

                const applyBtn = document.createElement('button');
                applyBtn.textContent = '✅ Apply to Note';
                applyBtn.style.cssText = 'background:#28a745;color:#fff;border:none;padding:10px 20px;border-radius:6px;cursor:pointer;font-size:14px;margin-right:8px;';

                const cancelBtn = document.createElement('button');
                cancelBtn.textContent = '✖ Cancel';
                cancelBtn.style.cssText = 'background:#6c757d;color:#fff;border:none;padding:10px 20px;border-radius:6px;cursor:pointer;font-size:14px;';

                applyBtn.addEventListener('click', async () => {
                  try {
                    await aiPostService.updateNoteContent(note.id!, aiContent);
                    window.Blinko.toast.success('✅ Note updated with AI result!');
                    window.Blinko.closeDialog?.();
                  } catch (err) {
                    window.Blinko.toast.error('Failed to update note: ' + (err as Error).message);
                  }
                });
                cancelBtn.addEventListener('click', () => {
                  window.Blinko.closeDialog?.();
                });

                const btnRow = document.createElement('div');
                btnRow.appendChild(applyBtn);
                btnRow.appendChild(cancelBtn);

                container.appendChild(pre);
                container.appendChild(btnRow);

                window.Blinko.showDialog({
                  title: '🤖 AI Processing Preview',
                  size: 'xl',
                  content: () => container,
                });
              } else {
                await aiPostService.updateNoteContent(note.id!, aiContent);
                window.Blinko.toast.success('✅ Note updated with AI result!');
              }
            } catch (err) {
              window.Blinko.toast.error('AI processing failed: ' + (err as Error).message);
            }
          },
        });

        // ── AI Auto-Tag menu item ──────────────────────────────────────────
        window.Blinko.addRightClickMenu({
          name: 'ai-auto-tag',
          label: '🏷️ AI Auto-Tag',
          icon: 'material-symbols:label',
          onClick: async (note: Note) => {
            const s = aiPostService.getSettings();
            if (!s.enableAutoTagMenu) return;
            if (!note?.content) {
              window.Blinko.toast.error('Note has no content to tag.');
              return;
            }
            window.Blinko.toast.success('🏷️ Generating tags…');
            try {
              const tags = await aiPostService.runAutoTag(note as any);
              if (!tags.length) {
                window.Blinko.toast.error('No tags suggested.');
                return;
              }
              window.Blinko.toast.success('Tags: ' + tags.join(' · '));
            } catch (err) {
              window.Blinko.toast.error('Auto-tag failed: ' + (err as Error).message);
            }
          },
        });

        // ── Copy Note Content menu item ────────────────────────────────────
        window.Blinko.addRightClickMenu({
          name: 'copy-note-content',
          label: '📋 Copy as Markdown',
          icon: 'material-symbols:content-copy',
          onClick: async (note: Note) => {
            const s = aiPostService.getSettings();
            if (!s.enableCopyMenu) return;
            try {
              await aiPostService.copyNoteContent(note as any);
              window.Blinko.toast.success('📋 Copied to clipboard!');
            } catch (err) {
              window.Blinko.toast.error('Copy failed: ' + (err as Error).message);
            }
          },
        });

        // ── Export Note as Markdown menu item ─────────────────────────────
        window.Blinko.addRightClickMenu({
          name: 'export-note-md',
          label: '⬇️ Export as .md',
          icon: 'material-symbols:download',
          onClick: (note: Note) => {
            const s = aiPostService.getSettings();
            if (!s.enableExportMenu) return;
            aiPostService.exportNoteAsMarkdown(note as any);
            window.Blinko.toast.success('⬇️ Note exported!');
          },
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
        uiuxService.destroy();
        removeToggleButton();
        console.log('Advanced RTL Plugin destroyed');
      }
    });
  }
}));
