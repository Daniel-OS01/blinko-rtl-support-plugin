export const advancedRTLCSS = `
/* Method 1: Direct RTL styling */
.rtl-force {
    direction: rtl !important;
    text-align: right !important;
    unicode-bidi: embed !important;
}

.ltr-force {
    direction: ltr !important;
    text-align: left !important;
    unicode-bidi: embed !important;
}

/* Method 2: Hebrew/Arabic detection */
*[lang="he"], *[lang="ar"], *[dir="rtl"] {
    direction: rtl !important;
    text-align: right !important;
}

/* Method 3: Unicode bidi for auto-detection */
.rtl-auto {
    unicode-bidi: plaintext !important;
}

/* Method 4: CSS content detection */
p:has-text(/[\u0590-\u05FF\u0600-\u06FF]/),
div:has-text(/[\u0590-\u05FF\u0600-\u06FF]/) {
    direction: rtl !important;
    text-align: right !important;
}

/* Method 5: Comprehensive element targeting */
.markdown-body p, .markdown-body div, .markdown-body span,
.vditor-reset p, .vditor-reset div, .vditor-reset span,
.card-masonry-grid p, .card-masonry-grid div,
textarea, [contenteditable], input[type="text"] {
    unicode-bidi: plaintext !important;
}

/* RTL Toggle Button */
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

.rtl-toggle-btn.dark-mode {
    background: #1a1a1a;
    color: #fff;
}

.rtl-toggle-btn.dark-mode:hover {
    background: #333;
}

.rtl-toggle-btn.dark-mode.active {
    background: #0d7377;
}

/* Dark mode for settings */
.rtl-settings-dark {
    background: #1a1a1a !important;
    color: #000 !important;
}

.rtl-settings-dark input, .rtl-settings-dark select, .rtl-settings-dark textarea {
    background: #333 !important;
    color: #000 !important;
    border: 1px solid #555 !important;
}

.rtl-settings-dark button {
    background: #333 !important;
    color: #000 !important;
    border: 1px solid #555 !important;
}

.rtl-settings-dark h2, .rtl-settings-dark h3, .rtl-settings-dark h4,
.rtl-settings-dark p, .rtl-settings-dark span, .rtl-settings-dark label {
    color: #000 !important;
}

.rtl-settings-dark code {
    background: #2a2a2a !important;
    color: #000 !important;
}

.rtl-settings-dark small {
    color: #333 !important;
}

/* Layout preservation */
#page-wrap, #page-wrap > div, #page-wrap > header,
.flex, .grid, header, nav, .sidebar, .toolbar {
    direction: ltr !important;
    unicode-bidi: isolate !important;
}
`;

export const DEFAULT_DYNAMIC_CSS = `/* Dynamic CSS Rules
   These rules are applied via the 'css' method when RTL/LTR is detected.
   You can modify these rules to customize the appearance of detected elements.
*/

/* Applied when RTL is detected */
.rtl-force {
    direction: rtl !important;
    text-align: start !important;
    unicode-bidi: embed !important;
}

/* Applied when LTR is detected */
.ltr-force {
    direction: ltr !important;
    text-align: start !important;
    unicode-bidi: embed !important;
}

/* Visual Debugger - RTL Detected */
.rtl-debug-rtl {
    outline: 2px solid rgba(255, 0, 0, 0.8) !important;
    outline-offset: -2px !important;
    position: relative !important;
}
.rtl-debug-rtl::after {
    content: attr(data-rtl-debug) !important;
    position: absolute;
    top: 0;
    right: 0;
    background: rgba(255, 0, 0, 0.9);
    color: white;
    font-size: 10px;
    padding: 1px 4px;
    border-bottom-left-radius: 4px;
    z-index: 2147483647;
    pointer-events: none;
    line-height: 1.2;
    white-space: nowrap;
}

/* Visual Debugger - LTR Detected */
.rtl-debug-ltr {
    outline: 2px solid rgba(0, 0, 255, 0.6) !important;
    outline-offset: -2px !important;
    position: relative !important;
}
.rtl-debug-ltr::after {
    content: attr(data-rtl-debug) !important;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 255, 0.9);
    color: white;
    font-size: 10px;
    padding: 1px 4px;
    border-bottom-right-radius: 4px;
    z-index: 2147483647;
    pointer-events: none;
    line-height: 1.2;
    white-space: nowrap;
}
`;

export const DEFAULT_TARGET_SELECTORS = [
    // Content containers
    '.markdown-body p',
    '.markdown-body div',
    '.markdown-body span',
    '.markdown-body h1', '.markdown-body h2', '.markdown-body h3', '.markdown-body h4', '.markdown-body h5', '.markdown-body h6',
    '.markdown-body li',
    '.markdown-body blockquote',
    '.markdown-body td', '.markdown-body th',
    '.markdown-body figcaption',

    // Editor elements
    '.vditor-reset p',
    '.vditor-reset div',
    '.vditor-reset span',
    '.vditor-reset h1', '.vditor-reset h2', '.vditor-reset h3', '.vditor-reset h4', '.vditor-reset h5', '.vditor-reset h6',
    '.vditor-reset li',

    // Code blocks (Explicitly requested to be checked)
    'pre',
    'code',
    '.code-block',
    '.CodeMirror-line',
    '.notion-code-block',

    // Inputs and Editable
    'textarea',
    'input[type="text"]',
    'input[type="search"]',
    '[contenteditable="true"]',
    '[contenteditable]',

    // UI Elements that might contain text
    '[role="button"]',
    '.btn',
    'button',
    '.checkbox-label',
    'label',
    '.tooltip',
    '.popover',
    '.card-masonry-grid .markdown-body p',
    '.card-masonry-grid .markdown-body div'
];
