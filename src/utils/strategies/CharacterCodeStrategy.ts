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
   * Check if a character code is RTL
   */
  private isRTLCode(code: number): boolean {
    // ⚡ Bolt: Array iteration using raw loop to avoid array.some overhead
    for (let i = 0; i < this.RTL_RANGES.length; i++) {
      const range = this.RTL_RANGES[i];
      if (code >= range[0] && code <= range[1]) return true;
    }
    return false;
  }

  /**
   * Detect RTL content in text
   */
  public detect(text: string): boolean {
    if (!text || text.length === 0) return false;

    // ⚡ Bolt: Use direct length checking to avoid substring allocation
    const limit = Math.min(text.length, this.config.sampleSize);

    let rtlCharCount = 0;
    let totalSignificantChars = 0;

    // ⚡ Bolt: Raw loop with charCodeAt is much faster than `for (const char of string)`
    // because it avoids string iterators and object creation.
    for (let i = 0; i < limit; i++) {
      const code = text.charCodeAt(i);

      // ⚡ Bolt: Fast path - skip ASCII whitespace and common punctuation (up to 125 '}')
      // using integer bounds checking instead of expensive RegExp.test()
      if (code <= 125) {
        if (
          code <= 32 || // Control chars and space
          code === 33 || // !
          code === 40 || // (
          code === 41 || // )
          code === 44 || // ,
          code === 46 || // .
          code === 58 || // :
          code === 59 || // ;
          code === 63 || // ?
          code === 91 || // [
          code === 93 || // ]
          code === 123 || // {
          code === 125 // }
        ) {
          continue;
        }
      } else if (
        code === 0xA0 || // NBSP
        (code >= 0x2000 && code <= 0x200A) || // EN/EM spaces
        code === 0x200E || // LRM
        code === 0x200F || // RLM
        code === 0x2028 || // Line separator
        code === 0x2029 || // Paragraph separator
        code === 0x202F || // NNBSP
        code === 0x205F || // MMSP
        code === 0x3000   // Ideographic space
      ) {
        // Skip common unicode whitespace/control chars
        continue;
      }

      // Handle surrogate pairs to correctly process code points (matching for...of behavior)
      if (code >= 0xD800 && code <= 0xDBFF && i + 1 < limit) {
        // High surrogate, skip the next code unit (low surrogate)
        i++;
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
