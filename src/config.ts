export interface Config {
    selectors: {
        target: string[];
        exclude: string[];
    };
    styles: {
        rtlClass: string;
        ltrClass: string;
    };
    detector: {
        threshold: number;
    };
}

/**
 * Default configuration for the RTL plugin.
 * Includes target selectors for Blinko's DOM structure and default styling classes.
 */
export const defaultConfig: Config = {
    selectors: {
        target: [
            '.markdown-body p',
            '.markdown-body div',
            '.markdown-body li',
            '.markdown-body h1',
            '.markdown-body h2',
            '.markdown-body h3',
            '.markdown-body h4',
            '.markdown-body h5',
            '.markdown-body h6',
            '.vditor-reset p',
            '.vditor-reset div',
            '.vditor-reset li',
            '.vditor-reset h1',
            '.vditor-reset h2',
            '.vditor-reset h3',
            '.vditor-reset h4',
            '.vditor-reset h5',
            '.vditor-reset h6',
            '.card-masonry-grid .markdown-body p',
            '.card-masonry-grid .markdown-body div',
            'textarea',
            '[contenteditable="true"]'
        ],
        exclude: [
            'pre',
            'code',
            '.code-block'
        ]
    },
    styles: {
        rtlClass: 'rtl-detected',
        ltrClass: 'ltr-detected'
    },
    detector: {
        threshold: 0.15 // 15% Hebrew/Arabic characters triggers RTL
    }
};
