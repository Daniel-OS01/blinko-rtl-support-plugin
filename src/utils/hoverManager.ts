export interface HoverManagerOptions {
  selectors: string[];
  processElement: (el: HTMLElement) => void;
  isEnabled: () => boolean;
}

/**
 * Manages a floating "toggle direction" button that appears when hovering over
 * compatible block elements. This allows users to quickly correct the direction
 * of specific paragraphs without going into settings.
 */
export class HoverContextManager {
  private options: HoverManagerOptions;
  private button: HTMLElement | null = null;
  private currentTarget: HTMLElement | null = null;
  private hideTimeout: any = null;
  private isHoveringButton = false;

  /**
   * Creates an instance of HoverContextManager.
   *
   * @param options - Configuration options including target selectors and callbacks.
   */
  constructor(options: HoverManagerOptions) {
    this.options = options;
  }

  /**
   * Initializes the manager by creating the button and attaching global event listeners.
   */
  init() {
    this.createButton();
    document.addEventListener('mouseover', this.handleMouseOver);
  }

  /**
   * Cleans up the manager, removing the button and event listeners.
   */
  destroy() {
    this.button?.remove();
    document.removeEventListener('mouseover', this.handleMouseOver);
  }

  /**
   * Creates the DOM element for the floating toggle button.
   */
  private createButton() {
    this.button = document.createElement('div');
    this.button.className = 'rtl-hover-btn';
    this.button.innerHTML = '⇄'; // Icon for switching direction
    this.button.title = 'Switch Direction';

    // Inline styles for isolation
    Object.assign(this.button.style, {
      position: 'fixed',
      display: 'none',
      zIndex: '10000',
      cursor: 'pointer',
      background: 'var(--b3-theme-background, #fff)',
      border: '1px solid var(--b3-border-color, #ccc)',
      borderRadius: '4px',
      padding: '2px 6px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      fontSize: '14px',
      color: 'var(--b3-theme-on-background, #333)',
      userSelect: 'none'
    });

    this.button.addEventListener('mouseenter', () => {
        this.isHoveringButton = true;
        if (this.hideTimeout) clearTimeout(this.hideTimeout);
    });

    this.button.addEventListener('mouseleave', () => {
        this.isHoveringButton = false;
        this.scheduleHide();
    });

    this.button.addEventListener('click', this.onButtonClick);

    document.body.appendChild(this.button);

    // Add CSS class for visibility toggle
    const style = document.createElement('style');
    style.textContent = `
      .rtl-hover-btn.visible { display: block !important; }
    `;
    document.head.appendChild(style);
  }

  /**
   * Handles global mouseover events to detect when the user hovers over a target element.
   *
   * @param e - The mouse event.
   */
  private handleMouseOver = (e: MouseEvent) => {
    if (!this.options.isEnabled()) return;

    const target = e.target as HTMLElement;
    // Check if target matches selectors
    const matched = target.closest(this.options.selectors.join(','));

    if (matched && matched instanceof HTMLElement) {
       this.showButton(matched);
    } else if (!this.isHoveringButton) {
       // If moved away from target and not on button, schedule hide
       this.scheduleHide();
    }
  };

  /**
   * Shows the floating button positioned relative to the target element.
   *
   * @param target - The HTML element being hovered.
   */
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

  /**
   * Schedules the button to be hidden after a short delay.
   * This allows the user to move the mouse from the text to the button without it disappearing.
   */
  private scheduleHide() {
    if (this.hideTimeout) clearTimeout(this.hideTimeout);

    this.hideTimeout = setTimeout(() => {
      if (!this.isHoveringButton) {
        this.hideButton();
      }
    }, 300); // Small delay to allow moving to button
  }

  /**
   * Hides the floating button.
   */
  private hideButton = () => {
    this.button?.classList.remove('visible');
  };

  /**
   * Updates the position of the button to align with the top-right of the current target.
   */
  private updateButtonPosition() {
    if (!this.button || !this.currentTarget) return;

    const rect = this.currentTarget.getBoundingClientRect();

    // Position: Top-Right of the block
    this.button.style.top = (rect.top + 2) + 'px'; // +2 offset
    // Align right (inside)
    this.button.style.left = (rect.right - 30) + 'px';
  }

  /**
   * Handles clicks on the toggle button.
   * Toggles the `data-manual-dir` attribute on the target element between 'ltr' and 'rtl'.
   *
   * @param e - The mouse event.
   */
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
  };
}
