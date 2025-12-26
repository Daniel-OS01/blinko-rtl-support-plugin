
interface HoverManagerOptions {
  selectors: string[];
  processElement: (element: HTMLElement) => void;
  isEnabled: () => boolean;
}

export class HoverContextManager {
  private button: HTMLElement | null = null;
  private currentTarget: HTMLElement | null = null;
  private hideTimeout: any = null;
  private options: HoverManagerOptions;
  private isHoveringButton = false;
  private styleElement: HTMLStyleElement | null = null;

  constructor(options: HoverManagerOptions) {
    this.options = options;
  }

  init() {
    this.createButton();
    document.addEventListener('mouseover', this.onMouseOver);
    document.addEventListener('mouseout', this.onMouseOut);
    document.addEventListener('scroll', this.hideButton, { capture: true, passive: true });
  }

  destroy() {
    if (this.button) {
      this.button.remove();
      this.button = null;
    }
    document.removeEventListener('mouseover', this.onMouseOver);
    document.removeEventListener('mouseout', this.onMouseOut);
    document.removeEventListener('scroll', this.hideButton);
  }

  private createButton() {
    if (this.button) return;

    this.button = document.createElement('div');
    this.button.className = 'rtl-hover-action-btn';
    // Flip icon
    this.button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 9h16"/><path d="M4 9l4-4"/><path d="M20 9l-4 4"/>
        <path d="M20 15H4"/><path d="M20 15l-4 4"/><path d="M4 15l4-4"/>
      </svg>
    `;
    this.button.title = "Flip Direction";

    // Styles
    this.styleElement = document.createElement('style');
    this.styleElement.textContent = `
      .rtl-hover-action-btn {
        position: fixed;
        z-index: 10000;
        background: var(--bg-card, #fff);
        border: 1px solid var(--border-color, #ddd);
        border-radius: 4px;
        padding: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease, transform 0.2s ease;
        transform: scale(0.9);
        color: var(--text-color, #333);
      }
      .rtl-hover-action-btn.visible {
        opacity: 1;
        pointer-events: auto;
        transform: scale(1);
      }
      .rtl-hover-action-btn:hover {
        background: var(--bg-hover, #f5f5f5);
        color: var(--primary-color, #0066cc);
      }
    `;
    document.head.appendChild(this.styleElement);
    document.body.appendChild(this.button);

    this.button.addEventListener('click', this.onButtonClick);
    this.button.addEventListener('mouseenter', () => { this.isHoveringButton = true; });
    this.button.addEventListener('mouseleave', () => {
      this.isHoveringButton = false;
      this.scheduleHide();
    });
  }

  private onMouseOver = (e: MouseEvent) => {
    if (!this.options.isEnabled()) return;

    const target = e.target as HTMLElement;
    const block = target.closest(this.options.selectors.join(','));

    if (block) {
      this.showButton(block as HTMLElement);
    }
  };

  private onMouseOut = (e: MouseEvent) => {
    // If moving to the button, don't hide
    // We handle hiding via timeout and checking isHoveringButton
    this.scheduleHide();
  };

  private showButton(target: HTMLElement) {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }

    if (this.currentTarget === target && this.button?.classList.contains('visible')) {
      return;
    }

    this.currentTarget = target;
    this.updateButtonPosition();
    this.button?.classList.add('visible');
  }

  private scheduleHide() {
    if (this.hideTimeout) clearTimeout(this.hideTimeout);

    this.hideTimeout = setTimeout(() => {
      if (!this.isHoveringButton) {
        this.hideButton();
      }
    }, 300); // Small delay to allow moving to button
  }

  private hideButton = () => {
    this.button?.classList.remove('visible');
    // Clear current target only after transition?
    // Actually, keeping it is fine until next show.
    // this.currentTarget = null;
  };

  private updateButtonPosition() {
    if (!this.button || !this.currentTarget) return;

    const rect = this.currentTarget.getBoundingClientRect();

    // Position: Top-Right of the block (or Top-Left if currently RTL?)
    // Let's stick to Right side (typical for tools) or End of line.
    // Ideally it floats in the margin.

    // Check if element is RTL to decide position?
    // Let's just put it on the side that has more space or consistently on the right (like a context menu).

    const buttonRect = this.button.getBoundingClientRect();
    const top = rect.top; // Align with top of block

    // Attempt to position in right margin
    // const left = rect.right + 5;

    // If it goes off screen, put it inside
    // if (left + buttonRect.width > window.innerWidth) {
    //   // Inside right
    //   // this.button.style.left = (rect.right - buttonRect.width - 5) + 'px';
    // } else {
      // this.button.style.left = left + 'px';
    // }

    // Let's make it overlay top-right corner, subtle
    this.button.style.top = (rect.top + 2) + 'px'; // +2 offset
    // Align right
    this.button.style.left = (rect.right - 30) + 'px'; // Inside right corner

    // Handle RTL pages where "right" might be "start".
    // But getBoundingClientRect returns viewport coordinates.
  }

  private onButtonClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (!this.currentTarget) return;

    const currentDir = this.currentTarget.getAttribute('data-manual-dir');
    const computedStyle = window.getComputedStyle(this.currentTarget);
    const isRTL = computedStyle.direction === 'rtl';

    let newDir = 'ltr';
    if (currentDir === 'ltr') {
      newDir = 'rtl';
    } else if (currentDir === 'rtl') {
      newDir = 'ltr';
    } else {
      // If no manual dir, flip the computed one
      newDir = isRTL ? 'ltr' : 'rtl';
    }

    this.currentTarget.setAttribute('data-manual-dir', newDir);
    this.options.processElement(this.currentTarget);

    // Optional: Flash feedback
    // window.Blinko?.toast.success(`Direction set to ${newDir.toUpperCase()}`);
  };
}
