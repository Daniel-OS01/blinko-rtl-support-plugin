/** @jsxImportSource preact */
/// <reference types="systemjs" />
import type { BasePlugin } from 'blinko';

System.register([], (exports) => ({
  execute: () => {
    exports('default', class Plugin implements BasePlugin {
      constructor() {
        // Initialize plugin with metadata from plugin.json
        Object.assign(this, __PLUGIN_JSON__);
      }
      async init() {
        // Initialize internationalization
        this.initI18n();
        const i18n = window.Blinko.i18n;
        // Add custom right-click menu item
        window.Blinko.addRightClickMenu({
          name: 'copy-private-link',
          label: i18n.t('copyPrivateLink'),
          icon: 'material-symbols:link-rounded',
          onClick: (item) => {
            const url = `${window.location.origin}/detail?id=${item.id}`
            try {
              if (window.Blinko.copyToClipboard) {
                window.Blinko.copyToClipboard(url)
              } else {
                navigator.clipboard.writeText(url);
              }
              window.Blinko.toast.success(i18n.t('copySuccess'));
            } catch (error) {
              console.error(error)
            }
          }
        });
      }

      /**
       * Initializes internationalization resources
       * Adds English and Chinese translation bundles
       */
      initI18n() {
        window.Blinko.i18n.addResourceBundle('en', 'translation', __en__);
        window.Blinko.i18n.addResourceBundle('zh', 'translation', __zh__);
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