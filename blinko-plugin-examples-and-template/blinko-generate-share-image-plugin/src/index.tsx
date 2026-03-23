/** @jsxImportSource preact */
/// <reference types="systemjs" />

import { render } from 'preact/compat';
import { App } from "./app";
import type { BasePlugin } from 'blinko';
import { Setting } from './setting';
import { Note, Tag } from 'blinko/dist/types/src/server/types';
import en from './locales/en.json';
import zh from './locales/zh.json';
import pluginJSON from '../plugin.json';
/**
 * Main plugin entry point registered with SystemJS
 * Exports the plugin class implementing BasePlugin interface
 */
System.register([], (exports) => ({
  execute: () => {
    exports('default', class Plugin implements BasePlugin {
      constructor() {
        // Initialize plugin with metadata from plugin.json
        Object.assign(this, pluginJSON);
      }

      // Flag indicating this plugin has a settings panel
      withSettingPanel = true;

      /**
       * Renders the settings panel UI
       * @returns {HTMLElement} Container element with rendered settings component
       */
      renderSettingPanel = () => {
        const container = document.createElement('div');
        render(<Setting />, container);
        return container;
      }

      /**
       * Initializes the plugin
       * Sets up toolbar icons, right-click menus, and AI write prompts
       */
      async init() {
        // Initialize internationalization
        this.initI18n();

        // Add custom right-click menu item
        window.Blinko.addRightClickMenu({
          name: 'generate-share-image',
          label: window.Blinko.i18n.t("generateShareImage"),
          icon: 'tabler:share',
          onClick: (item: Note) => {
            console.log(JSON.parse(JSON.stringify(item)))
            window.Blinko.showDialog({
              title: window.Blinko.i18n.t("generateShareImage"),
              size: 'full',
              content: () => {
                const container = document.createElement('div');
                container.setAttribute('data-plugin', 'generate-share-image');
                render(<App note={{
                  title: item.title,
                  content: item.content,
                  createdAt: item.createdAt,
                  tags: item.tags.map((t: Tag) => t.name),
                  attachments: item.attachments ? item.attachments.map((attachment: any) => ({
                    path: attachment.path,
                    type: attachment.type
                  })) : []
                }} />, container);
                return container;
              }
            })
          }
        });

      }

      /**
       * Initializes internationalization resources
       * Adds English and Chinese translation bundles
       */
      initI18n() {
        window.Blinko.i18n.addResourceBundle('en', 'translation', en);
        window.Blinko.i18n.addResourceBundle('zh', 'translation', zh);
      }

      /**
       * Cleanup function called when plugin is disabled
       */
      destroy() {
        console.log('Plugin destroyed');
      }
    });
  }
}));