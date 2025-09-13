// ==UserScript==
// @name         Hebrew RTL Text Direction FIX WORKING
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Detect Hebrew text and apply RTL styling in CodeMirror and other elements
// @match        https://ticktick.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Regular expression to match Hebrew characters using Unicode property escapes
    const hebrewRegex = /\p{Script=Hebrew}/u;

    // List of HTML elements and classes to check for Hebrew text
    const elementsToCheck = [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', // Headings
        'p', 'span', // Text containers
        'ul', 'ol', 'li', // List items
        'td', 'th', // Table elements
        'textarea', 'input[type="text"]', // Form elements
        'a', 'strong', 'em', // Other inline elements
        '.break-words', '.items-center', // Additional classes
        '.CodeMirror-line > span > span', // CodeMirror elements
        '.CodeMirror-line',
        '.CodeMirror-cursor',
        '.ticktick-active-line',
        '.CodeMirror-gutter-filler',
        '.CodeMirror-scrollbar-filler',
        '.CodeMirror-hscrollbar',
        '.span.presentation',
        '.CodeMirror-cursors',
        'attachment-view',
        'textarea.pastable',
        '.CodeMirror-gutter',
        '.CodeMirror-gutters',
        '.CodeMirror-linenumber',
        '.CodeMirror-sizer',
        '.CodeMirror-code',
        '.CodeMirror-measure'
    ];

    // Function to apply RTL styling
    function applyRTLStyling(element) {
        element.style.direction = 'rtl';
        element.style.textAlign = 'right';
    }

    // Function to disable RTL styling
    function disableRTLStyling(element) {
        element.style.direction = '';
        element.style.textAlign = '';
    }

    // Function to check and apply RTL styling to elements containing Hebrew text
    function checkAndApplyRTL() {
        elementsToCheck.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (hebrewRegex.test(element.textContent)) {
                    applyRTLStyling(element);
                } else {
                    disableRTLStyling(element);
                }
            });
        });
    }

    // Function to handle CodeMirror instances
    function handleCodeMirrorInstances() {
        const codeMirrorInstances = document.querySelectorAll('.CodeMirror');
        codeMirrorInstances.forEach(instance => {
            const editor = instance.CodeMirror;
            if (editor) {
                const content = editor.getValue();
                if (hebrewRegex.test(content)) {
                    editor.setOption('direction', 'rtl');
                    editor.setOption('rtlMoveVisually', true);
                } else {
                    editor.setOption('direction', 'ltr');
                    editor.setOption('rtlMoveVisually', false);
                }
                editor.refresh();
            }
        });
    }

    // Run the function on page load
    window.addEventListener('load', () => {
        checkAndApplyRTL();
        handleCodeMirrorInstances();
    });

    // Optionally, run the function periodically to catch dynamically loaded content
    setInterval(() => {
        checkAndApplyRTL();
        handleCodeMirrorInstances();
    }, 3000);
})();
