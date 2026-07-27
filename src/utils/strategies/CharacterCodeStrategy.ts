import { DetectionStrategy } from './types';

export interface RTLDetectionConfig {
  sensitivity: 'high' | 'medium' | 'low';
  minRTLChars: number;
  sampleSize: number;
}

export class CharacterCodeStrategy implements DetectionStrategy {
  readonly name = 'CharacterCode';
  private config: RTLDetectionConfig;

  constructor(config: RTLDetectionConfig = {
    sensitivity: 'medium',
    minRTLChars: 3,
    sampleSize: 100
  }) {
    this.config = config;
  }

  // Pre-compiled regex for skipping characters (non-ASCII)
  private readonly skipRegex = /\s|[.,!?;:()[\]{}]/;

  /**
   * Check if a character code is RTL
   */
  private isRTLChar(code: number): boolean {
    if (code < 0x0590) return false;
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

    // Limit sample size for performance without memory allocation
    const limit = Math.min(text.length, this.config.sampleSize);

    let rtlCharCount = 0;
    let totalSignificantChars = 0;

    for (let i = 0; i < limit; i++) {
      const code = text.charCodeAt(i);

      // Fast check for common ASCII whitespace and punctuation
      let isSkip = false;
      if (code <= 128) {
          if (code === 32 || code === 10 || code === 13 || code === 9 || // space, newline, tab
              code === 46 || code === 44 || code === 33 || code === 63 || // . , ! ?
              code === 59 || code === 58 || code === 40 || code === 41 || // ; : ( )
              code === 91 || code === 93 || code === 123 || code === 125) { // [ ] { }
              isSkip = true;
          }
      } else {
          // For non-ASCII whitespace, fallback to regex
          isSkip = this.skipRegex.test(text[i]);
      }

      if (!isSkip) {
        totalSignificantChars++;
        if (this.isRTLChar(code)) {
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
