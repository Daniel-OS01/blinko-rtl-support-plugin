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

  // ⚡ Bolt Optimization: Replaced array-based RTL_RANGES with fast integer checks
  private isRTLCode(code: number): boolean {
    if (code < 0x0590) return false;
    if (code <= 0x05FF) return true; // Hebrew
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

  // ⚡ Bolt Optimization: Replaced RegExp with direct integer comparisons for whitespace and punctuation
  private isIgnoredCode(code: number): boolean {
    if (code <= 0x20) {
      return code === 0x20 || (code >= 0x09 && code <= 0x0D);
    }
    if (code >= 0x21 && code <= 0x7D) {
      return code === 0x21 || code === 0x28 || code === 0x29 || code === 0x2C ||
             code === 0x2E || code === 0x3A || code === 0x3B || code === 0x3F ||
             code === 0x5B || code === 0x5D || code === 0x7B || code === 0x7D;
    }
    if (code === 0xA0) return true;
    if (code >= 0x1680) {
        return code === 0x1680 || (code >= 0x2000 && code <= 0x200A) ||
               code === 0x2028 || code === 0x2029 || code === 0x202F ||
               code === 0x205F || code === 0x3000 || code === 0xFEFF;
    }
    return false;
  }

  /**
   * Detect RTL content in text
   */
  public detect(text: string): boolean {
    if (!text || text.length === 0) return false;

    // ⚡ Bolt Optimization: Iterating with charCodeAt directly instead of substring() allocation and for...of loop
    const limit = Math.min(text.length, this.config.sampleSize);

    let rtlCharCount = 0;
    let totalSignificantChars = 0;

    let i = 0;
    while (i < limit) {
      const code = text.charCodeAt(i);

      // Handle surrogate pairs to safely iterate by full code points
      if (code >= 0xD800 && code <= 0xDBFF && i + 1 < text.length) {
        const nextCode = text.charCodeAt(i + 1);
        if (nextCode >= 0xDC00 && nextCode <= 0xDFFF) {
          if (i + 1 < limit || limit === text.length) {
              totalSignificantChars++;
              i += 2;
              continue;
          } else {
              totalSignificantChars++;
              i += 1;
              continue;
          }
        }
      }

      if (!this.isIgnoredCode(code)) {
        totalSignificantChars++;
        if (this.isRTLCode(code)) {
          rtlCharCount++;
        }
      }
      i++;
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
