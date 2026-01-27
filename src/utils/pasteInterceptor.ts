import { RTLDetector } from './rtlDetector';

export class PasteInterceptor {
  private detector: RTLDetector;
  private isEnabled: boolean = false;
  private activeToast: HTMLElement | null = null;

  constructor(detector: RTLDetector) {
    this.detector = detector;
  }

  public enable() {
    if (this.isEnabled) return;
    document.addEventListener('paste', this.handlePaste, true);
    this.isEnabled = true;
  }

  public disable() {
    if (!this.isEnabled) return;
    document.removeEventListener('paste', this.handlePaste, true);
    this.removeToast();
    this.isEnabled = false;
  }

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

  private isEditable(element: HTMLElement): boolean {
    return element.isContentEditable ||
           element.tagName === 'TEXTAREA' ||
           (element.tagName === 'INPUT' && (element as HTMLInputElement).type === 'text');
  }

  private detectMixedContent(text: string): boolean {
    const rtlCount = (text.match(/[\u0590-\u05FF\u0600-\u06FF]/g) || []).length;
    const ltrCount = (text.match(/[a-zA-Z]/g) || []).length;

    // Threshold: at least 3 chars of each to consider it "mixed content" worth intervening
    return rtlCount > 3 && ltrCount > 3;
  }

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

  private removeToast() {
    if (this.activeToast) {
      this.activeToast.remove();
      this.activeToast = null;
    }
  }

  private insertText(target: HTMLElement, text: string) {
    if (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT') {
      const input = target as HTMLInputElement | HTMLTextAreaElement;

      // Use setRangeText if available (modern browsers)
      if (typeof input.setRangeText === 'function') {
          const start = input.selectionStart || 0;
          const end = input.selectionEnd || 0;
          input.setRangeText(text, start, end, 'end');
      } else {
          // Fallback for older environments
          const start = input.selectionStart || 0;
          const end = input.selectionEnd || 0;
          input.value = input.value.substring(0, start) + text + input.value.substring(end);
          input.selectionStart = input.selectionEnd = start + text.length;
      }
      input.dispatchEvent(new Event('input', { bubbles: true }));
    } else {
       target.focus();
       const selection = window.getSelection();
       if (selection && selection.rangeCount > 0) {
           const range = selection.getRangeAt(0);
           range.deleteContents();

           const textNode = document.createTextNode(text);
           range.insertNode(textNode);

           // Move cursor to end of inserted text
           try {
             range.setStartAfter(textNode);
             range.setEndAfter(textNode);
             selection.removeAllRanges();
             selection.addRange(range);
           } catch (e) {
             console.warn('Failed to update cursor position:', e);
           }
       }
    }
  }

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
