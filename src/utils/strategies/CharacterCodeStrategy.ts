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
   * Check if a character code is RTL
   * ⚡ BOLT OPTIMIZATION: Replaced Array.prototype.some with direct integer comparisons
   * for faster evaluation in the hot loop.
   */
  private isRTLCode(code: number): boolean {
    if (code >= 0x0590 && code <= 0x05FF) return true; // Hebrew
    if (code >= 0x0600 && code <= 0x06FF) return true; // Arabic
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
   * Check if a character code is significant (not whitespace or common punctuation)
   * ⚡ BOLT OPTIMIZATION: Replaced Regex.test with direct integer comparisons.
   */
  private isSignificantCode(code: number): boolean {
    // Common whitespace
    if (code <= 32) return false;

    // Non-breaking space
    if (code === 160) return false;

    // Punctuation .,!?;:()[\]{}
    if (
      code === 46 || // .
      code === 44 || // ,
      code === 33 || // !
      code === 63 || // ?
      code === 59 || // ;
      code === 58 || // :
      code === 40 || // (
      code === 41 || // )
      code === 91 || // [
      code === 93 || // ]
      code === 123 || // {
      code === 125    // }
    ) {
      return false;
    }

    return true;
  }

  /**
   * Detect RTL content in text
   */
  public detect(text: string): boolean {
    if (!text || text.length === 0) return false;

    let rtlCharCount = 0;
    let totalSignificantChars = 0;
    let codePointsCount = 0;

    // ⚡ BOLT OPTIMIZATION: Standard for loop with charCodeAt over allocating string.substring
    // and using for...of. Properly handles UTF-16 surrogate pairs.
    for (let i = 0; i < text.length && codePointsCount < this.config.sampleSize; i++) {
      const code = text.charCodeAt(i);

      // Surrogate pair checking (SMP characters like emojis)
      if (code >= 0xD800 && code <= 0xDBFF) {
        const nextCode = text.charCodeAt(i + 1);
        if (nextCode >= 0xDC00 && nextCode <= 0xDFFF) {
          codePointsCount++;
          totalSignificantChars++; // Surrogate pairs are generally significant for RTL calculations
          i++; // Skip trailing surrogate
          continue;
        }
      }

      codePointsCount++;

      // Skip whitespace and punctuation for analysis
      if (this.isSignificantCode(code)) {
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
