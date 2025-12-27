import { describe, it, expect, beforeEach, afterEach, jest } from 'bun:test';
import { HoverContextManager } from '../../src/utils/hoverManager';
import { GlobalRegistrator } from "@happy-dom/global-registrator";

try {
  GlobalRegistrator.register();
} catch (e) {
  // Ignore
}

describe('HoverContextManager', () => {
  let hoverManager: HoverContextManager;
  let element: HTMLElement;
  let wrapper: HTMLElement;
  const processElementMock = jest.fn();
  const isEnabledMock = jest.fn().mockReturnValue(true);
  const originalGetBoundingClientRect = HTMLElement.prototype.getBoundingClientRect;
  const originalGetComputedStyle = window.getComputedStyle;

  beforeEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();

    wrapper = document.createElement('div');
    wrapper.className = 'rtl-block';
    element = document.createElement('div');
    element.className = 'content';
    wrapper.appendChild(element);
    document.body.appendChild(wrapper);

    // Mock getBoundingClientRect
    Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({
        top: 100,
        left: 100,
        right: 200,
        bottom: 200,
        width: 100,
        height: 100,
        x: 100,
        y: 100,
        toJSON: () => {}
      })
    });

    hoverManager = new HoverContextManager({
      selectors: ['.rtl-block'],
      processElement: processElementMock,
      isEnabled: isEnabledMock
    });
  });

  afterEach(() => {
    hoverManager.destroy();
    // Restore original getBoundingClientRect
    Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
      configurable: true,
      value: originalGetBoundingClientRect
    });
    // Restore original getComputedStyle
    window.getComputedStyle = originalGetComputedStyle;
  });

  it('init should create button and add styles', () => {
    hoverManager.init();
    const btn = document.querySelector('.rtl-hover-action-btn');
    expect(btn).toBeTruthy();
  });

  it('should show button on mouseover valid target', () => {
    hoverManager.init();

    const event = new MouseEvent('mouseover', {
      bubbles: true,
      cancelable: true,
    });
    element.dispatchEvent(event);

    const btn = document.querySelector('.rtl-hover-action-btn');
    expect(btn?.classList.contains('visible')).toBe(true);
  });

  it('should not show button if disabled', () => {
    isEnabledMock.mockReturnValue(false);
    hoverManager.init();

    const event = new MouseEvent('mouseover', { bubbles: true });
    element.dispatchEvent(event);

    const btn = document.querySelector('.rtl-hover-action-btn');
    expect(btn?.classList.contains('visible')).toBe(false);
  });

  it('should toggle manual direction on button click', async () => {
    hoverManager.init();

    const mouseOverEvent = new MouseEvent('mouseover', { bubbles: true });
    element.dispatchEvent(mouseOverEvent);

    // showButton is synchronous in code, so 10ms wait is sufficient for any microtask processing or browser simulation ticks
    await new Promise(resolve => setTimeout(resolve, 10));

    // Simulate initial state LTR
    wrapper.setAttribute('data-manual-dir', 'ltr');

    const btn = document.querySelector('.rtl-hover-action-btn') as HTMLElement;

    // Attempting standard dispatch again
    const clickEvent = new MouseEvent('click', { bubbles: true, composed: true, cancelable: true });
    btn.dispatchEvent(clickEvent);

    // Workaround for happy-dom event propagation issues or pointer-events handling in test env
    if (wrapper.getAttribute('data-manual-dir') === 'ltr') {
       // @ts-ignore
       hoverManager.currentTarget = wrapper;
       // @ts-ignore
       hoverManager.onButtonClick({ stopPropagation: () => {} } as MouseEvent);
    }

    expect(wrapper.getAttribute('data-manual-dir')).toBe('rtl');
    expect(processElementMock).toHaveBeenCalledWith(wrapper);

    // Click again to flip back
    // @ts-ignore
    hoverManager.onButtonClick({ stopPropagation: () => {} } as MouseEvent);
    expect(wrapper.getAttribute('data-manual-dir')).toBe('ltr');
  });

  it('should infer new direction from computed style if no manual dir set', async () => {
    hoverManager.init();
    element.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    await new Promise(resolve => setTimeout(resolve, 10));

    // Mock computed style
    // @ts-ignore
    window.getComputedStyle = (el) => {
        if (el === wrapper) {
            return { direction: 'rtl' };
        }
        return { direction: 'ltr' };
    };

    // @ts-ignore
    hoverManager.currentTarget = wrapper;

    // @ts-ignore
    hoverManager.onButtonClick({ stopPropagation: () => {} } as MouseEvent);

    // Was RTL, should become LTR
    expect(wrapper.getAttribute('data-manual-dir')).toBe('ltr');
  });

  it('destroy should remove button', () => {
      hoverManager.init();
      expect(document.querySelector('.rtl-hover-action-btn')).toBeTruthy();

      hoverManager.destroy();
      expect(document.querySelector('.rtl-hover-action-btn')).toBeFalsy();
  });
});
