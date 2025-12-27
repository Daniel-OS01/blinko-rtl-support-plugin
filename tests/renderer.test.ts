import { describe, it, expect, beforeEach, afterEach } from 'bun:test';
import { DOMRTLRenderer } from '../src/renderer';
import { RTLConfig } from '../src/config';
import { GlobalRegistrator } from "@happy-dom/global-registrator";

try {
  GlobalRegistrator.register();
} catch (e) {
  // Ignore if already registered
}

describe('DOMRTLRenderer', () => {
  let renderer: DOMRTLRenderer;
  let element: HTMLElement;
  const mockConfig: RTLConfig = {
    attributes: {
      rtl: { 'dir': 'rtl', 'align': 'right' },
      ltr: { 'dir': 'ltr', 'align': 'left' }
    },
    styles: {
      rtl: { 'textAlign': 'right', 'direction': 'rtl' },
      ltr: { 'textAlign': 'left', 'direction': 'ltr' },
      common: '.rtl-detected { color: red; }'
    }
  } as unknown as RTLConfig;

  beforeEach(() => {
    renderer = new DOMRTLRenderer(mockConfig);
    element = document.createElement('div');
    document.body.appendChild(element);
  });

  afterEach(() => {
    element.remove();
    renderer.removeGlobalStyles();
  });

  it('applyRTL should add RTL attributes and styles', () => {
    renderer.applyRTL(element);

    expect(element.getAttribute('dir')).toBe('rtl');
    expect(element.getAttribute('align')).toBe('right');
    expect(element.style.textAlign).toBe('right');
    expect(element.style.direction).toBe('rtl');
    expect(element.classList.contains('rtl-detected')).toBe(true);
    expect(element.classList.contains('ltr-detected')).toBe(false);
  });

  it('applyLTR should add LTR attributes and styles', () => {
    renderer.applyLTR(element);

    expect(element.getAttribute('dir')).toBe('ltr');
    expect(element.getAttribute('align')).toBe('left');
    expect(element.style.textAlign).toBe('left');
    expect(element.style.direction).toBe('ltr');
    expect(element.classList.contains('ltr-detected')).toBe(true);
    expect(element.classList.contains('rtl-detected')).toBe(false);
  });

  it('clear should remove attributes and styles', () => {
    renderer.applyRTL(element);
    renderer.clear(element);

    expect(element.hasAttribute('dir')).toBe(false);
    expect(element.hasAttribute('align')).toBe(false);
    expect(element.style.textAlign).toBe('');
    expect(element.style.direction).toBe('');
    expect(element.classList.contains('rtl-detected')).toBe(false);
    expect(element.classList.contains('ltr-detected')).toBe(false);
  });

  it('injectGlobalStyles should add style element to head', () => {
    renderer.injectGlobalStyles();
    const styleEl = document.getElementById('blinko-rtl-global-styles');
    expect(styleEl).toBeTruthy();
    expect(styleEl?.textContent).toBe(mockConfig.styles.common);
  });

  it('removeGlobalStyles should remove style element from head', () => {
    renderer.injectGlobalStyles();
    renderer.removeGlobalStyles();
    const styleEl = document.getElementById('blinko-rtl-global-styles');
    expect(styleEl).toBeFalsy();
  });

  it('should switch correctly between RTL and LTR', () => {
      renderer.applyRTL(element);
      expect(element.classList.contains('rtl-detected')).toBe(true);
      expect(element.classList.contains('ltr-detected')).toBe(false);

      renderer.applyLTR(element);
      expect(element.classList.contains('rtl-detected')).toBe(false);
      expect(element.classList.contains('ltr-detected')).toBe(true);
  });
});
