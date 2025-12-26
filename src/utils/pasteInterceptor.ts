import { RTLDetector } from './rtlDetector';

/**
 * Class that intercepts paste events to handle mixed content (RTL/LTR).
 * It detects when text with mixed directionality is pasted and offers the user
 * options to split the content or wrap it for better isolation.
 */
export class PasteInterceptor {
  private detector: RTLDetector;
  private isEnabled: boolean = false;
  private activeToast: HTMLElement | null = null;

  /**
   * Creates an instance of PasteInterceptor.
   *
   * @param detector - The RTL detector to use for content analysis.
   */
  constructor(detector: RTLDetector) {
    this.detector = detector;
  }

  /**
   * Enables the paste interceptor by adding the event listener to the document.
   */
  public enable() {
    if (this.isEnabled) return;
    document.addEventListener('paste', this.handlePaste, true);
    this.isEnabled = true;
  }

  /**
   * Disables the paste interceptor and removes any active UI.
   */
  public disable() {
    if (!this.isEnabled) return;
    document.removeEventListener('paste', this.handlePaste, true);
    this.removeToast();
    this.isEnabled = false;
  }

  /**
   * Handles the paste event.
   * Checks if the target is editable and if the pasted text contains mixed content.
   *
   * @param e - The clipboard event.
   */
  private handlePaste = (e: ClipboardEvent) => {
    if (!this.isEnabled) return;

    const target = e.target as HTMLElement;
    if (!this.isEditable(target)) return;

    const text = e.clipboardData?.getData('text/plain');
    if (!text) return;

    if (this.detectMixedContent(text)) {
      e.preventDefault();
      e.stopPropagation();
      this.showSuggestionToast(text, target);
    }
  }

  /**
   * Checks if an element is editable (input, textarea, or contenteditable).
   *
   * @param element - The element to check.
   */
  private isEditable(element: HTMLElement): boolean {
    return element.isContentEditable ||
           element.tagName === 'TEXTAREA' ||
           (element.tagName === 'INPUT' && (element as HTMLInputElement).type === 'text');
  }

  /**
   * Detects if the text contains a significant amount of both RTL and LTR characters.
   *
   * @param text - The text to analyze.
   * @returns `true` if mixed content is detected, `false` otherwise.
   */
  private detectMixedContent(text: string): boolean {
    const rtlCount = (text.match(/[\u0590-\u05FF\u0600-\u06FF]/g) || []).length;
    const ltrCount = (text.match(/[a-zA-Z]/g) || []).length;

    // Threshold: at least 3 chars of each to consider it "mixed content" worth intervening
    return rtlCount > 3 && ltrCount > 3;
  }

  /**
   * Displays a toast UI asking the user how to handle the mixed content.
   *
   * @param text - The original pasted text.
   * @param target - The element where the paste occurred.
   */
  private showSuggestionToast(text: string, target: HTMLElement) {
    this.removeToast();

    const toast = document.createElement('div');
    toast.className = 'rtl-paste-toast';
    toast.innerHTML = `
      <div style="margin-bottom: 10px;">
        <strong style="display: block; margin-bottom: 5px;">Mixed content detected</strong>
        <p style="margin: 0; font-size: 0.9em; opacity: 0.8;">How would you like to paste this text?</p>
      </div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button id="rtl-btn-split" style="flex: 1; padding: 6px 12px; border: none; border-radius: 4px; background: var(--b3-theme-primary, #007bff); color: white; cursor: pointer;">Split Blocks</button>
        <button id="rtl-btn-wrap" style="flex: 1; padding: 6px 12px; border: none; border-radius: 4px; background: var(--b3-theme-secondary, #6c757d); color: white; cursor: pointer;">Wrap (Isolation)</button>
        <button id="rtl-btn-original" style="flex: 1; padding: 6px 12px; border: 1px solid var(--b3-theme-surface-lighter, #ccc); border-radius: 4px; background: transparent; color: inherit; cursor: pointer;">Original</button>
      </div>
      <button class="rtl-toast-close" style="position: absolute; top: 5px; right: 5px; border: none; background: transparent; cursor: pointer; font-size: 16px;">&times;</button>
    `;

    // Apply styles
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: 'var(--b3-theme-surface, #fff)',
      color: 'var(--b3-theme-on-surface, #000)',
      border: '1px solid var(--b3-border-color, #ccc)',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: '10000',
      maxWidth: '350px',
      fontFamily: 'sans-serif',
      fontSize: '14px'
    });

    document.body.appendChild(toast);
    this.activeToast = toast;

    toast.querySelector('#rtl-btn-split')?.addEventListener('click', () => {
      this.insertText(target, this.processSplit(text));
      this.removeToast();
    });

    toast.querySelector('#rtl-btn-wrap')?.addEventListener('click', () => {
      this.insertText(target, this.processWrap(text));
      this.removeToast();
    });

    toast.querySelector('#rtl-btn-original')?.addEventListener('click', () => {
      this.insertText(target, text);
      this.removeToast();
    });

    toast.querySelector('.rtl-toast-close')?.addEventListener('click', () => {
      this.removeToast();
    });
  }

  /**
   * Removes the active toast notification.
   */
  private removeToast() {
    if (this.activeToast) {
      this.activeToast.remove();
      this.activeToast = null;
    }
  }

  /**
   * Inserts text into the target element at the current cursor position.
   * Supports both input/textarea and contenteditable elements.
   *
   * @param target - The target element.
   * @param text - The text to insert.
   */
  private insertText(target: HTMLElement, text: string) {
    if (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT') {
      const input = target as HTMLInputElement | HTMLTextAreaElement;
      const start = input.selectionStart || 0;
      const end = input.selectionEnd || 0;
      input.value = input.value.substring(0, start) + text + input.value.substring(end);
      input.selectionStart = input.selectionEnd = start + text.length;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    } else {
       target.focus();
       // Try execCommand first as it handles undo history better
       const success = document.execCommand('insertText', false, text);
       if (!success) {
         const selection = window.getSelection();
         if (selection && selection.rangeCount > 0) {
           const range = selection.getRangeAt(0);
           range.deleteContents();
           range.insertNode(document.createTextNode(text));
           range.collapse(false);
         }
       }
    }
  }

  /**
   * Splits mixed content into separate lines to isolate RTL and LTR blocks.
   *
   * @param text - The text to process.
   */
  private processSplit(text: string): string {
    // Split mixed content into separate lines
    // Strategy: Identify contiguous blocks of RTL (Hebrew/Arabic) vs LTR
    // and ensure they are separated by newlines.

    // This regex looks for chunks of Hebrew/Arabic characters
    const rtlChunk = /([\u0590-\u05FF\u0600-\u06FF]+[\s\u0590-\u05FF\u0600-\u06FF]*)/g;

    // Replace RTL chunks with "\nCHUNK\n" effectively
    // But we need to be careful not to introduce too many newlines.

    // Let's iterate and build.
    let processed = text.replace(rtlChunk, (match) => {
        // If the match is surrounded by newlines already, don't add more.
        // But in a replace callback we don't see context easily.
        return `\n${match}\n`;
    });

    // Clean up double newlines
    processed = processed.replace(/\n{3,}/g, '\n\n').trim();

    return processed;
  }

  /**
   * Wraps RTL parts in Unicode Isolate characters (RLI/PDI) to properly isolate them in a mixed context.
   *
   * @param text - The text to process.
   */
  private processWrap(text: string): string {
    // Wrap RTL parts in Unicode Isolation characters
    // RLI: \u2067 (Right-to-Left Isolate)
    // PDI: \u2069 (Pop Directional Isolate)

    const RLI = '\u2067';
    const PDI = '\u2069';

    // Wrap Hebrew/Arabic chunks
    return text.replace(/([\u0590-\u05FF\u0600-\u06FF]+[\s\u0590-\u05FF\u0600-\u06FF]*)/g, `${RLI}$1${PDI}`);
  }
}
