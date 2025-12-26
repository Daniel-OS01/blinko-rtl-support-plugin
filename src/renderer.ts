import { RTLConfig } from './config';

export interface RTLRenderer {
  applyRTL(element: HTMLElement): void;
  applyLTR(element: HTMLElement): void;
  clear(element: HTMLElement): void;
  injectGlobalStyles(): void;
  removeGlobalStyles(): void;
}

export class DOMRTLRenderer implements RTLRenderer {
  private config: RTLConfig;
  private styleElement: HTMLStyleElement | null = null;

  constructor(config: RTLConfig) {
    this.config = config;
  }

  applyRTL(element: HTMLElement): void {
    // Apply attributes
    Object.entries(this.config.attributes.rtl).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });

    // Apply inline styles
    Object.entries(this.config.styles.rtl).forEach(([key, value]) => {
      (element.style as any)[key] = value;
    });

    element.classList.add('rtl-detected');
    element.classList.remove('ltr-detected');
  }

  applyLTR(element: HTMLElement): void {
    // Apply attributes
    Object.entries(this.config.attributes.ltr).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });

    // Apply inline styles
    Object.entries(this.config.styles.ltr).forEach(([key, value]) => {
      (element.style as any)[key] = value;
    });

    element.classList.add('ltr-detected');
    element.classList.remove('rtl-detected');
  }

  clear(element: HTMLElement): void {
    // Remove attributes
    Object.keys(this.config.attributes.rtl).forEach(key => element.removeAttribute(key));
    Object.keys(this.config.attributes.ltr).forEach(key => element.removeAttribute(key));

    // Clear inline styles
    const allStyleProps = new Set([
        ...Object.keys(this.config.styles.rtl),
        ...Object.keys(this.config.styles.ltr)
    ]);

    allStyleProps.forEach(key => {
        (element.style as any)[key] = '';
    });

    element.classList.remove('rtl-detected', 'ltr-detected');
  }

  injectGlobalStyles(): void {
    if (!this.styleElement) {
      this.styleElement = document.createElement('style');
      this.styleElement.id = 'blinko-rtl-global-styles';
      this.styleElement.textContent = this.config.styles.common;
      document.head.appendChild(this.styleElement);
    }
  }

  removeGlobalStyles(): void {
    if (this.styleElement) {
      this.styleElement.remove();
      this.styleElement = null;
    }
  }
}
