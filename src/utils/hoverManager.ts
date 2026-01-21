
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
    if (this.styleElement) {
        this.styleElement.remove();
        this.styleElement = null;
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
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
        z-index: 99999; /* Very high z-index */
        background: var(--bg-card, #fff);
        border: 1px solid var(--border-color, #ddd);
        border-radius: 4px;
        padding: 2px 4px; /* Smaller padding */
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
        font-size: 12px;
        height: 20px;
        width: 24px;
      }
      .rtl-hover-action-btn.visible {
        opacity: 1;
        pointer-events: auto;
        transform: scale(1);
      }
      .rtl-hover-action-btn:hover {
        background: var(--bg-hover, #f5f5f5);
        color: var(--primary-color, #0066cc);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
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

    let target = e.target as HTMLElement;

    // Safety check
    if (!target || !document.body.contains(target)) return;

    // Ignore interactive elements to prevent obstruction
    if (target.closest('button, a, input, select, textarea, [role="button"], .btn')) {
        this.scheduleHide(); // Hide if moving onto a button
        return;
    }

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

    // Position: Float ABOVE the top-right corner, outside the element content flow
    // This prevents blocking text or interactions inside the top-right corner

    // If there isn't space above (e.g. top of page), put it inside but shifted
    const spaceAbove = rect.top;

    let top = rect.top - 25; // 25px above
    let left = rect.right - 30; // Aligned right

    if (spaceAbove < 30) {
        // Not enough space above, put it inside at top-right, BUT slightly lower to avoid header overlap if any?
        // Or just accept overlap.
        top = rect.top + 5;
    }

    this.button.style.top = `${top}px`;
    this.button.style.left = `${left}px`;
  }

  private onButtonClick = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault(); // Prevent focus change or other side effects

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
    // Force re-processing to apply the manual direction immediately
    // We can manually trigger the class update here since processElement does checking
    this.options.processElement(this.currentTarget);

    // Also force style update directly for instant feedback
    if (newDir === 'rtl') {
        this.currentTarget.style.direction = 'rtl';
        this.currentTarget.style.textAlign = 'right';
        this.currentTarget.classList.add('rtl-force');
        this.currentTarget.classList.remove('ltr-force');
    } else {
        this.currentTarget.style.direction = 'ltr';
        this.currentTarget.style.textAlign = 'left';
        this.currentTarget.classList.add('ltr-force');
        this.currentTarget.classList.remove('rtl-force');
    }
  };
}
