import { Config } from './config';

/**
 * Interface for DOM renderers responsible for applying RTL styles.
 */
export interface Renderer {
    applyRTL(element: HTMLElement, direction: 'rtl' | 'ltr'): void;
    cleanup(): void;
}

/**
 * Implementation of the Renderer interface that manipulates the DOM directly.
 * It applies classes and inline styles to elements to enforce directionality.
 */
export class DOMRTLRenderer implements Renderer {
    /**
     * Configuration object containing class names and other settings.
     */
    private config: Config;

    /**
     * Creates an instance of DOMRTLRenderer.
     *
     * @param config - The configuration object.
     */
    constructor(config: Config) {
        this.config = config;
    }

    /**
     * Applies the specified text direction to an HTML element.
     * It sets the 'dir' attribute, adds/removes CSS classes, and applies `unicode-bidi` styles.
     *
     * @param element - The element to modify.
     * @param direction - The direction to apply ('rtl' or 'ltr').
     */
    applyRTL(element: HTMLElement, direction: 'rtl' | 'ltr'): void {
        element.setAttribute('dir', direction);

        if (direction === 'rtl') {
            element.classList.add(this.config.styles.rtlClass);
            element.classList.remove(this.config.styles.ltrClass);
            element.style.direction = 'rtl';
            element.style.textAlign = 'right';
            element.style.unicodeBidi = 'plaintext';
        } else {
            element.classList.add(this.config.styles.ltrClass);
            element.classList.remove(this.config.styles.rtlClass);
            element.style.direction = 'ltr';
            element.style.textAlign = 'left';
            element.style.unicodeBidi = 'plaintext';
        }
    }

    /**
     * Removes all applied styles and attributes from elements that were modified.
     * This restores the DOM to its original state (mostly).
     */
    cleanup(): void {
        const rtlElements = document.querySelectorAll(`.${this.config.styles.rtlClass}`);
        rtlElements.forEach(el => {
            if (el instanceof HTMLElement) {
                el.classList.remove(this.config.styles.rtlClass);
                el.removeAttribute('dir');
                el.style.direction = '';
                el.style.textAlign = '';
                el.style.unicodeBidi = '';
            }
        });

        const ltrElements = document.querySelectorAll(`.${this.config.styles.ltrClass}`);
        ltrElements.forEach(el => {
            if (el instanceof HTMLElement) {
                el.classList.remove(this.config.styles.ltrClass);
                el.removeAttribute('dir');
                el.style.direction = '';
                el.style.textAlign = '';
                el.style.unicodeBidi = '';
            }
        });
    }
}
