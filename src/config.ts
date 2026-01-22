export interface RTLConfig {
  selectors: {
    target: string[];
    ignore: string[];
    layout: string[];
  };
  styles: {
    rtl: Record<string, string>;
    ltr: Record<string, string>;
    common: string;
  };
  attributes: {
    rtl: Record<string, string>;
    ltr: Record<string, string>;
  };
}

export const defaultConfig: RTLConfig = {
  selectors: {
    target: [
      // Vditor selectors
      '.vditor-reset',
      '.vditor-content',
      '.vditor-ir',
      '.vditor-wysiwyg',
      '.vditor-sv',
      '.vditor-reset p',
      '.vditor-reset div',
      '.vditor-reset span',
      '.vditor-reset h1, .vditor-reset h2, .vditor-reset h3, .vditor-reset h4, .vditor-reset h5, .vditor-reset h6',
      '.vditor-reset li',
      '.vditor-reset blockquote',

      // Markdown selectors
      '.markdown-body',
      '.markdown-body p',
      '.markdown-body div',
      '.markdown-body span',
      '.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6',
      '.markdown-body li',
      '.markdown-body blockquote',
      '.markdown-body td',
      '.markdown-body th',

      // General text selectors
      'textarea',
      'input[type="text"]',
      'input[type="search"]',
      '[contenteditable]',
      '.content',
      '.text',
      '.note-content',
      '.card-masonry-grid p',
      '.card-masonry-grid div'
    ],
    ignore: [
      'code',
      'pre',
      '.code-block',
      'button',
      'input[type="button"]',
      'input[type="submit"]',
      'select',
      'option'
    ],
    layout: [
      '#page-wrap',
      '.flex',
      '.grid',
      'header',
      'nav',
      '.sidebar',
      '.navigation',
      '.toolbar',
      'footer',
      '.button-group'
    ]
  },
  styles: {
    rtl: {
      direction: 'rtl',
      textAlign: 'start',
      unicodeBidi: 'plaintext'
    },
    ltr: {
      direction: 'ltr',
      textAlign: 'start',
      unicodeBidi: 'normal'
    },
    common: `
      .rtl-detected {
        direction: rtl !important;
        text-align: start !important;
        unicode-bidi: plaintext !important;
      }
      .ltr-detected {
        direction: ltr !important;
        text-align: start !important;
        unicode-bidi: normal !important;
      }

      /* Toggle Button */
      .rtl-toggle-btn {
          position: fixed;
          bottom: 20px;
          inset-inline-end: 20px; /* Logical property */
          z-index: 9999;
          background: var(--primary, #007bff);
          color: var(--text-on-primary, white);
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
          background: var(--primary-dark, #0056b3);
          transform: scale(1.1);
      }

      .rtl-toggle-btn.active {
          background: var(--success, #28a745);
      }

      .rtl-toggle-btn.dark-mode {
          background: var(--bg-secondary, #1a1a1a);
          color: var(--text-primary, #fff);
          border: 1px solid var(--border-color, #444);
      }

      .rtl-toggle-btn.dark-mode:hover {
          background: var(--bg-tertiary, #333);
      }

      .rtl-toggle-btn.dark-mode.active {
          background: var(--success-dark, #0d7377);
      }
    `
  },
  attributes: {
    rtl: {
      dir: 'rtl'
    },
    ltr: {
      dir: 'ltr'
    }
  }
};
