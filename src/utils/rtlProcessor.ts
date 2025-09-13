/**
 * Advanced RTL processor for comprehensive text element handling
 */
export class RTLProcessor {
  private settings: any;
  private detector: any;

  constructor(detector: any, settings: any) {
    this.detector = detector;
    this.settings = settings;
  }

  updateSettings(newSettings: any) {
    this.settings = { ...this.settings, ...newSettings };
  }

  /**
   * Process vditor elements with special attention
   */
  processVditorElements() {
    const vditorSelectors = [
      '.vditor-reset',
      '.vditor-content', 
      '.vditor-ir',
      '.vditor-wysiwyg',
      '.vditor-sv',
      '.vditor-reset p',
      '.vditor-reset div',
      '.vditor-reset span',
      '.vditor-reset h1, .vditor-reset h2, .vditor-reset h3, .vditor-reset h4, .vditor-reset h5, .vditor-reset h6',
      '.vditor-reset li',
      '.vditor-reset blockquote'
    ];

    vditorSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(element => {
        this.processTextElement(element as HTMLElement);
      });
    });
  }

  /**
   * Process markdown-body elements with enhanced detection
   */
  processMarkdownElements() {
    const markdownSelectors = [
      '.markdown-body',
      '.markdown-body p',
      '.markdown-body div',
      '.markdown-body span',
      '.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6',
      '.markdown-body li',
      '.markdown-body blockquote',
      '.markdown-body td',
      '.markdown-body th'
    ];

    markdownSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(element => {
        this.processTextElement(element as HTMLElement);
      });
    });
  }

  /**
   * Process all text-related elements
   */
  processTextElements() {
    const textSelectors = [
      'p', 'div', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'li', 'td', 'th', 'blockquote', 'pre', 'code',
      'textarea', 'input[type="text"]', 'input[type="search"]',
      '[contenteditable]', '.content', '.text', '.note-content'
    ];

    textSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(element => {
        this.processTextElement(element as HTMLElement);
      });
    });
  }

  /**
   * Enhanced text element processing
   */
  processTextElement(element: HTMLElement) {
    if (!element || !this.shouldProcessElement(element)) return;

    const text = this.getElementText(element);
    if (!text.trim()) return;

    const isRTL = this.detector.detectRTL(text);
    const shouldApplyRTL = this.shouldApplyRTL(isRTL);

    if (shouldApplyRTL) {
      this.applyRTLToElement(element, text);
    } else {
      this.applyLTRToElement(element);
    }

    // Process child text nodes
    this.processChildTextNodes(element);
  }

  /**
   * Check if element should be processed
   */
  private shouldProcessElement(element: HTMLElement): boolean {
    // Skip if element is a layout container
    const layoutClasses = [
      'flex', 'grid', 'container', 'wrapper', 'layout',
      'sidebar', 'navigation', 'header', 'footer', 'toolbar'
    ];

    const hasLayoutClass = layoutClasses.some(cls => 
      element.classList.contains(cls) || 
      element.className.includes(cls)
    );

    if (hasLayoutClass) return false;

    // Skip buttons and form controls
    const skipTags = ['BUTTON', 'INPUT', 'SELECT', 'OPTION'];
    if (skipTags.includes(element.tagName)) {
      return element.tagName === 'INPUT' && 
             ['text', 'search', 'email'].includes((element as HTMLInputElement).type);
    }

    return true;
  }

  /**
   * Get text content from element
   */
  private getElementText(element: HTMLElement): string {
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      return (element as HTMLInputElement).value || '';
    }
    return element.textContent || element.innerText || '';
  }

  /**
   * Determine if RTL should be applied
   */
  private shouldApplyRTL(isDetectedRTL: boolean): boolean {
    switch (this.settings.forceDirection) {
      case 'rtl': return true;
      case 'ltr': return false;
      case 'auto': 
      default: return isDetectedRTL;
    }
  }

  /**
   * Apply RTL styling to element
   */
  private applyRTLToElement(element: HTMLElement, text: string) {
    element.setAttribute('dir', 'rtl');
    element.style.direction = 'rtl';
    element.style.textAlign = 'right';
    element.style.unicodeBidi = this.settings.unicodeBidiMode || 'plaintext';
    
    // Detect language for better support
    const language = this.detectLanguage(text);
    if (language) {
      element.setAttribute('lang', language);
    }

    element.classList.add('rtl-detected');
    element.classList.remove('ltr-detected');

    // Special handling for specific elements
    this.applySpecialRTLHandling(element);
  }

  /**
   * Apply LTR styling to element
   */
  private applyLTRToElement(element: HTMLElement) {
    element.setAttribute('dir', 'ltr');
    element.style.direction = 'ltr';
    element.style.textAlign = 'left';
    element.style.unicodeBidi = 'normal';
    element.removeAttribute('lang');
    
    element.classList.add('ltr-detected');
    element.classList.remove('rtl-detected');
  }

  /**
   * Detect specific RTL language
   */
  private detectLanguage(text: string): string | null {
    const hebrewPattern = /[\u0590-\u05FF]/;
    const arabicPattern = /[\u0600-\u06FF]/;
    const persianPattern = /[\u06A0-\u06FF]/;

    if (hebrewPattern.test(text)) return 'he';
    if (arabicPattern.test(text)) return 'ar';
    if (persianPattern.test(text)) return 'fa';
    
    return null;
  }

  /**
   * Apply special RTL handling for specific elements
   */
  private applySpecialRTLHandling(element: HTMLElement) {
    const tagName = element.tagName.toLowerCase();
    
    switch (tagName) {
      case 'ul':
      case 'ol':
        element.style.paddingLeft = '0';
        element.style.paddingRight = '2em';
        element.style.listStylePosition = 'outside';
        break;
        
      case 'blockquote':
        element.style.borderLeft = 'none';
        element.style.borderRight = '3px solid currentcolor';
        element.style.paddingLeft = '0';
        element.style.paddingRight = '0.9em';
        break;
        
      case 'table':
        element.style.direction = 'rtl';
        break;
    }

    // Handle markdown-specific elements
    if (element.classList.contains('markdown-body') || 
        element.closest('.markdown-body')) {
      this.applyMarkdownRTLHandling(element);
    }

    // Handle vditor-specific elements
    if (element.classList.contains('vditor-reset') || 
        element.closest('.vditor-reset')) {
      this.applyVditorRTLHandling(element);
    }
  }

  /**
   * Apply markdown-specific RTL handling
   */
  private applyMarkdownRTLHandling(element: HTMLElement) {
    if (element.tagName === 'P') {
      element.style.marginBottom = '0.35em';
      element.style.marginTop = '0.15em';
    }
    
    if (element.tagName === 'DIV') {
      element.style.marginBottom = '0.3em';
    }
  }

  /**
   * Apply vditor-specific RTL handling
   */
  private applyVditorRTLHandling(element: HTMLElement) {
    element.style.unicodeBidi = 'plaintext';
    
    if (element.classList.contains('vditor-reset')) {
      element.style.lineHeight = '1.35';
    }
  }

  /**
   * Process child text nodes for mixed content
   */
  private processChildTextNodes(element: HTMLElement) {
    if (!this.settings.processMixedContent) return;

    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null
    );

    let node;
    while (node = walker.nextNode()) {
      const textNode = node as Text;
      const text = textNode.textContent || '';
      
      if (text.trim() && this.detector.detectRTL(text)) {
        const parent = textNode.parentElement;
        if (parent && parent !== element) {
          this.processTextElement(parent);
        }
      }
    }
  }

  /**
   * Process all elements based on current settings
   */
  processAllElements() {
    if (this.settings.vditorSupport) {
      this.processVditorElements();
    }
    
    if (this.settings.markdownSupport) {
      this.processMarkdownElements();
    }
    
    if (this.settings.enhancedTextProcessing) {
      this.processTextElements();
    }

    // Process custom selectors
    this.settings.customSelectors?.forEach((selector: string) => {
      try {
        document.querySelectorAll(selector).forEach(element => {
          this.processTextElement(element as HTMLElement);
        });
      } catch (error) {
        console.warn(`Invalid selector: ${selector}`, error);
      }
    });
  }

  /**
   * Remove all RTL attributes and classes
   */
  removeAllRTL() {
    document.querySelectorAll('[dir="rtl"], .rtl-detected').forEach(element => {
      element.removeAttribute('dir');
      element.removeAttribute('lang');
      (element as HTMLElement).style.direction = '';
      (element as HTMLElement).style.textAlign = '';
      (element as HTMLElement).style.unicodeBidi = '';
      element.classList.remove('rtl-detected', 'ltr-detected');
    });
  }
}