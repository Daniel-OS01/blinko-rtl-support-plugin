import { describe, it, expect, beforeEach, afterEach, mock } from 'bun:test';
import { GlobalRegistrator } from '@happy-dom/global-registrator';
import { readFileSync } from 'node:fs';
import { UIUXService } from '../../src/services/uiuxService';

try {
  GlobalRegistrator.register();
} catch {
  // Already registered
}

describe('UIUXService', () => {
  let service: UIUXService;
  let originalPushState: History['pushState'];
  let rafQueue: FrameRequestCallback[];
  let originalRAF: typeof requestAnimationFrame;

  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '';
    document.head.innerHTML = '';

    originalPushState = history.pushState.bind(history);
    originalRAF = window.requestAnimationFrame;
    rafQueue = [];

    window.requestAnimationFrame = ((cb: FrameRequestCallback) => {
      rafQueue.push(cb);
      return rafQueue.length;
    }) as typeof requestAnimationFrame;

    service = new UIUXService();
  });

  afterEach(() => {
    service.destroy();
    window.requestAnimationFrame = originalRAF;
    history.pushState = originalPushState;
    mock.restore();
  });

  const flushRAF = () => {
    const queue = [...rafQueue];
    rafQueue = [];
    queue.forEach((cb) => cb(performance.now()));
  };

  const createCard = () => {
    const card = document.createElement('div');
    card.className = 'note-card';

    const opener = document.createElement('h3');
    opener.className = 'note-title';
    opener.textContent = 'Heading opener';

    const content = document.createElement('p');
    content.textContent = 'Body content';

    const button = document.createElement('button');
    button.textContent = 'Action';

    card.appendChild(opener);
    card.appendChild(content);
    card.appendChild(button);
    document.body.appendChild(card);

    return { card, opener, content, button };
  };

  describe('Back-button sentinel guard lifecycle', () => {
    it('tracks history.pushState behavior across repeated apply() cycles while enabled', () => {
      const pushSpy = mock(() => {});
      history.pushState = pushSpy as unknown as History['pushState'];

      service.updateSettings({ backButtonClosesNote: true });
      service.apply();
      service.apply();

      // Current lifecycle re-binds back-button handling on each apply cycle.
      expect(pushSpy).toHaveBeenCalledTimes(3);
    });

    it('repushes sentinel and closes overlay on popstate when overlay exists', () => {
      const pushSpy = mock(() => {});
      history.pushState = pushSpy as unknown as History['pushState'];

      const overlay = document.createElement('div');
      overlay.className = 'note-overlay expanded';
      const close = document.createElement('button');
      close.className = 'close';
      const closeSpy = mock(() => {});
      close.addEventListener('click', closeSpy);
      overlay.appendChild(close);
      document.body.appendChild(overlay);

      service.updateSettings({ backButtonClosesNote: true });
      window.dispatchEvent(new PopStateEvent('popstate'));

      expect(pushSpy).toHaveBeenCalledTimes(2);
      expect(closeSpy).toHaveBeenCalledTimes(1);
    });

    it('does not repush sentinel when popstate fires without overlay', () => {
      const pushSpy = mock(() => {});
      history.pushState = pushSpy as unknown as History['pushState'];

      service.updateSettings({ backButtonClosesNote: true });
      window.dispatchEvent(new PopStateEvent('popstate'));

      expect(pushSpy).toHaveBeenCalledTimes(1);
    });

    it('resets sentinel guard on disable and re-enables with a fresh push', () => {
      const pushSpy = mock(() => {});
      history.pushState = pushSpy as unknown as History['pushState'];

      service.updateSettings({ backButtonClosesNote: true });
      service.updateSettings({ backButtonClosesNote: false });
      service.updateSettings({ backButtonClosesNote: true });

      expect(pushSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('Single-tap behavior', () => {
    it('redirects <p> target click to heading opener', () => {
      const { opener, content } = createCard();
      const openerSpy = mock(() => {});
      opener.addEventListener('click', openerSpy);

      service.updateSettings({ singleTapOpenNote: true });
      content.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(openerSpy).toHaveBeenCalledTimes(1);
    });

    it('does not synthesize a second opener click when heading itself is clicked', () => {
      const { opener } = createCard();
      const openerSpy = mock(() => {});
      opener.addEventListener('click', openerSpy);

      service.updateSettings({ singleTapOpenNote: true });
      opener.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(openerSpy).toHaveBeenCalledTimes(1);
    });

    it('skips synthetic open when click originates from interactive child', () => {
      const { opener, button } = createCard();
      const openerSpy = mock(() => {});
      opener.addEventListener('click', openerSpy);

      service.updateSettings({ singleTapOpenNote: true });
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(openerSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('Re-entry guard (card.dataset.opening)', () => {
    it('blocks rapid double-click synthetic duplication and clears dataset after RAF', () => {
      const { card, opener, content } = createCard();
      const openerSpy = mock(() => {});
      opener.addEventListener('click', openerSpy);

      service.updateSettings({ singleTapOpenNote: true });

      content.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      content.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(openerSpy).toHaveBeenCalledTimes(1);
      expect(card.dataset.opening).toBe('true');

      flushRAF();

      expect(card.dataset.opening).toBeUndefined();
    });
  });

  describe('CSS regression guard', () => {
    it('ensures masonry flex/col selector is absent from Blinko-UIUX.css', () => {
      const css = readFileSync('src/assets/styles/Blinko-UIUX.css', 'utf8');
      expect(css).not.toContain('.card-masonry-grid [class*="flex"][class*="col"]');
    });
  });

  describe('MutationObserver callback frequency under rapid mutations', () => {
    it('marks newly added cards once and avoids duplicate handler attachment effects', async () => {
      service.updateSettings({ singleTapOpenNote: true });

      for (let i = 0; i < 10; i++) {
        const card = document.createElement('div');
        card.className = 'note-card';
        const opener = document.createElement('h3');
        opener.className = 'title';
        const p = document.createElement('p');
        p.textContent = `card ${i}`;
        card.append(opener, p);
        document.body.appendChild(card);
      }

      await Promise.resolve();

      const marked = document.querySelectorAll('[data-single-tap="true"]');
      expect(marked.length).toBeGreaterThanOrEqual(10);

      const sample = marked[0] as HTMLElement;
      const opener = sample.querySelector('h3') as HTMLElement;
      const openerSpy = mock(() => {});
      opener.addEventListener('click', openerSpy);
      sample.querySelector('p')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(openerSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Tap-outside close behavior and destroy() listener cleanup', () => {
    it('removes listeners on destroy so synthetic single-tap no longer fires', () => {
      const { opener, content } = createCard();
      const openerSpy = mock(() => {});
      opener.addEventListener('click', openerSpy);

      service.updateSettings({ singleTapOpenNote: true, backButtonClosesNote: true });
      service.destroy();

      content.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      window.dispatchEvent(new PopStateEvent('popstate'));

      expect(openerSpy).toHaveBeenCalledTimes(0);
    });

    it.skip('supports tap-outside close lifecycle when overlay outside-click support is implemented');
  });

  describe('Vertical spacing class/custom-property behavior', () => {
    it('applies and updates line-height custom property and cleans it up on destroy', () => {
      service.apply();
      expect(document.body.classList.contains('blinko-custom-typography')).toBe(true);
      expect(document.documentElement.style.getPropertyValue('--blinko-line-height')).toBe('1.5');

      service.updateSettings({ noteLineHeight: 1.9 });
      expect(document.documentElement.style.getPropertyValue('--blinko-line-height')).toBe('1.9');

      service.destroy();
      expect(document.documentElement.style.getPropertyValue('--blinko-line-height')).toBe('');
    });
  });

  describe('AI 401 interceptor / pass-through / fetch restoration', () => {
    it.skip('intercepts 401 AI responses when fetch interceptor support is implemented');
    it.skip('passes through non-401 responses when interceptor support is implemented');
    it.skip('restores original fetch on destroy when interceptor support is implemented');
  });
});
