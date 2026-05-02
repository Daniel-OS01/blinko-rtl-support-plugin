import { DetectionStrategy } from './types';

export interface RTLDetectionConfig {
  sensitivity: 'high' | 'medium' | 'low';
  minRTLChars: number;
  sampleSize: number;
}

export class CharacterCodeStrategy implements DetectionStrategy {
  readonly name = 'CharacterCode';
  private config: RTLDetectionConfig;

  // Hebrew: \u0590-\u05FF
  // Arabic: \u0600-\u06FF
  // Additional RTL: \u0700-\u074F, \u0780-\u07BF
  private readonly RTL_RANGES = [
    [0x0590, 0x05FF], // Hebrew
    [0x0600, 0x06FF], // Arabic
    [0x0700, 0x074F], // Syriac
    [0x0750, 0x077F], // Arabic Supplement
    [0x0780, 0x07BF], // Thaana
    [0x08A0, 0x08FF], // Arabic Extended-A
    [0xFB1D, 0xFB4F], // Hebrew Presentation Forms
    [0xFB50, 0xFDFF], // Arabic Presentation Forms-A
    [0xFE70, 0xFEFF], // Arabic Presentation Forms-B
  ];

  constructor(config: RTLDetectionConfig = {
    sensitivity: 'medium',
    minRTLChars: 3,
    sampleSize: 100
  }) {
    this.config = config;
  }

  /**
   * Check if a character is RTL
   * 💡 What: Replaced array .some() evaluation with raw code point bounds checking
   * 🎯 Why: Avoids array iteration and closure creation for every character.
   */
  private isRTLCode(code: number): boolean {
    // Fast path: Arabic and Hebrew
    if (code >= 0x0590 && code <= 0x05FF) return true; // Hebrew
    if (code >= 0x0600 && code <= 0x06FF) return true; // Arabic

    // Other ranges
    if (code >= 0x0700 && code <= 0x074F) return true; // Syriac
    if (code >= 0x0750 && code <= 0x077F) return true; // Arabic Supplement
    if (code >= 0x0780 && code <= 0x07BF) return true; // Thaana
    if (code >= 0x08A0 && code <= 0x08FF) return true; // Arabic Extended-A
    if (code >= 0xFB1D && code <= 0xFB4F) return true; // Hebrew Presentation Forms
    if (code >= 0xFB50 && code <= 0xFDFF) return true; // Arabic Presentation Forms-A
    if (code >= 0xFE70 && code <= 0xFEFF) return true; // Arabic Presentation Forms-B

    return false;
  }

  /**
   * Detect RTL content in text
   * 💡 What: Replaced string allocation (substring), RegExp.test, and object creation with charCodeAt
   * 🎯 Why: Reduces memory allocations and JavaScript-to-C++ boundary crossings in high-frequency text processing.
   */
  public detect(text: string): boolean {
    if (!text || text.length === 0) return false;

    let rtlCharCount = 0;
    let totalSignificantChars = 0;

    // Process up to sampleSize without allocating a new string via substring
    const limit = Math.min(text.length, this.config.sampleSize);

    for (let i = 0; i < limit; i++) {
      const code = text.charCodeAt(i);

      // Early bounds check for most ASCII whitespace and punctuation (<= 125)
      // Space (32), ! (33), , (44), . (46), : (58), ; (59), ? (63), etc.
      if (code <= 125) {
          if (
              code === 32 || code === 9 || code === 10 || code === 13 || // Whitespace
              code === 46 || code === 44 || code === 33 || code === 63 || // .,!?
              code === 58 || code === 59 || // :;
              code === 40 || code === 41 || code === 91 || code === 93 || code === 123 || code === 125 // ()[]{}
          ) {
              continue; // Skip punctuation and whitespace
          }
      }

      totalSignificantChars++;

      if (this.isRTLCode(code)) {
        rtlCharCount++;
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
