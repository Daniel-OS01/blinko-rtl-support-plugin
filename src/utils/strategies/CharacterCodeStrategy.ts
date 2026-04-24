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

  /**
   * Fast integer-based evaluation to check if character code is RTL
   */
  private isRTLCode(code: number): boolean {
    return (code >= 0x0590 && code <= 0x05FF) || // Hebrew
           (code >= 0x0600 && code <= 0x06FF) || // Arabic
           (code >= 0x0700 && code <= 0x074F) || // Syriac
           (code >= 0x0750 && code <= 0x077F) || // Arabic Supplement
           (code >= 0x0780 && code <= 0x07BF) || // Thaana
           (code >= 0x08A0 && code <= 0x08FF) || // Arabic Extended-A
           (code >= 0xFB1D && code <= 0xFB4F) || // Hebrew Presentation Forms
           (code >= 0xFB50 && code <= 0xFDFF) || // Arabic Presentation Forms-A
           (code >= 0xFE70 && code <= 0xFEFF);   // Arabic Presentation Forms-B
  }

  /**
   * Fast integer-based evaluation to check if character code is whitespace or punctuation
   */
  private isWhitespaceOrPunctuation(code: number): boolean {
    // Basic whitespace (\s: 9, 10, 11, 12, 13, 32)
    // Punctuation [.,!?;:()[\]{}]
    if (code <= 125) {
      if (code === 32 || code === 9 || code === 10 || code === 13) return true;
      if (code === 46 || code === 44 || code === 33 || code === 63 ||
          code === 59 || code === 58 || code === 40 || code === 41 ||
          code === 91 || code === 93 || code === 123 || code === 125) {
          return true;
      }
    }
    return false;
  }

  /**
   * Detect RTL content in text
   */
  public detect(text: string): boolean {
    if (!text || text.length === 0) return false;

    let rtlCharCount = 0;
    let totalSignificantChars = 0;

    // Take sample from beginning of text for performance without allocating a new string
    const maxLen = Math.min(text.length, this.config.sampleSize);

    for (let i = 0; i < maxLen; i++) {
      const code = text.charCodeAt(i);

      if (!this.isWhitespaceOrPunctuation(code)) {
        totalSignificantChars++;
        if (this.isRTLCode(code)) {
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

    let threshold = 0.15; // medium default
    if (this.config.sensitivity === 'high') {
      threshold = 0.1;
    } else if (this.config.sensitivity === 'low') {
      threshold = 0.4;
    }

    return rtlPercentage >= threshold;
  }

  public updateConfig(config: Partial<RTLDetectionConfig>): void {
      this.config = { ...this.config, ...config };
  }
}
