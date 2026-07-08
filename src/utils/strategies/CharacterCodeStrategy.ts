import { DetectionStrategy } from './types';

export interface RTLDetectionConfig {
  sensitivity: 'high' | 'medium' | 'low';
  minRTLChars: number;
  sampleSize: number;
}

export class CharacterCodeStrategy implements DetectionStrategy {
  readonly name = 'CharacterCode';
  private config: RTLDetectionConfig;

  // Cached regex for skip checking to avoid recompiling in loop
  private readonly skipRegex = /\s|[.,!?;:()[\]{}]/;

  constructor(config: RTLDetectionConfig = {
    sensitivity: 'medium',
    minRTLChars: 3,
    sampleSize: 100
  }) {
    this.config = config;
  }

  /**
   * Check if a character code is RTL using direct integer comparisons for performance
   */
  private isRTLCode(code: number): boolean {
    return (
      (code >= 0x0590 && code <= 0x05FF) || // Hebrew
      (code >= 0x0600 && code <= 0x06FF) || // Arabic
      (code >= 0x0700 && code <= 0x074F) || // Syriac
      (code >= 0x0750 && code <= 0x077F) || // Arabic Supplement
      (code >= 0x0780 && code <= 0x07BF) || // Thaana
      (code >= 0x08A0 && code <= 0x08FF) || // Arabic Extended-A
      (code >= 0xFB1D && code <= 0xFB4F) || // Hebrew Presentation Forms
      (code >= 0xFB50 && code <= 0xFDFF) || // Arabic Presentation Forms-A
      (code >= 0xFE70 && code <= 0xFEFF)    // Arabic Presentation Forms-B
    );
  }

  /**
   * Detect RTL content in text
   */
  public detect(text: string): boolean {
    if (!text || text.length === 0) return false;

    // 💡 What: Replaced substring allocation and for..of loop with Math.min and flat for loop.
    // 💡 What: Replaced inline regex and array .some() with cached regex and direct integer bounds checking.
    // 🎯 Why: String slicing, loop abstractions, array closures, and inline regexes introduce execution overhead in hot parsing paths.
    // 📊 Impact: Significantly reduces memory allocations and JS engine overhead during character-by-character analysis.
    // Limit calculation instead of substring to avoid memory allocation
    const limit = Math.min(text.length, this.config.sampleSize);

    let rtlCharCount = 0;
    let totalSignificantChars = 0;

    // Flat for loop for measurable speedup in frequent parsing paths
    for (let i = 0; i < limit; i++) {
      const char = text[i];
      // Skip whitespace and punctuation for analysis using cached regex
      if (!this.skipRegex.test(char)) {
        totalSignificantChars++;
        if (this.isRTLCode(text.charCodeAt(i))) {
          rtlCharCount++;
        }
      }
    }

    // Must have minimum RTL characters
    if (rtlCharCount < this.config.minRTLChars) {
      return false;
    }

    // Calculate RTL percentage based on sensitivity
    const rtlPercentage = totalSignificantChars > 0 ? rtlCharCount / totalSignificantChars : 0;

    const thresholds = {
      high: 0.1,    // 10% RTL chars
      medium: 0.15, // 15% RTL chars
      low: 0.4      // 40% RTL chars
    };

    return rtlPercentage >= thresholds[this.config.sensitivity];
  }

  public updateConfig(config: Partial<RTLDetectionConfig>): void {
      this.config = { ...this.config, ...config };
  }
}
