import { DetectionStrategy } from './types';

export interface RTLDetectionConfig {
  sensitivity: 'high' | 'medium' | 'low';
  minRTLChars: number;
  sampleSize: number;
}

export class CharacterCodeStrategy implements DetectionStrategy {
  readonly name = 'CharacterCode';
  private config: RTLDetectionConfig;
  private static readonly SKIP_REGEX = /\s|[.,!?;:()[\]{}]/;

  constructor(config: RTLDetectionConfig = {
    sensitivity: 'medium',
    minRTLChars: 3,
    sampleSize: 100
  }) {
    this.config = config;
  }

  /**
   * Detect RTL content in text
   */
  public detect(text: string): boolean {
    if (!text || text.length === 0) return false;

    let rtlCharCount = 0;
    let totalSignificantChars = 0;
    const limit = Math.min(text.length, this.config.sampleSize);

    for (let i = 0; i < limit; i++) {
      const code = text.charCodeAt(i);

      // Fast check for common ASCII whitespace and punctuation
      if (code <= 125) {
          if (code === 32 || code === 9 || code === 10 || code === 11 || code === 12 || code === 13 || // space, tab, LF, VT, FF, CR
              code === 46 || code === 44 || code === 33 || code === 63 || // .,!?
              code === 59 || code === 58 || code === 40 || code === 41 || // ;:()
              code === 91 || code === 93 || code === 123 || code === 125) // []{}
          {
              continue;
          }
      } else if (CharacterCodeStrategy.SKIP_REGEX.test(text[i])) {
          continue;
      }

      // Handle surrogate pairs to count them as a single character
      if (code >= 0xD800 && code <= 0xDBFF && i + 1 < limit) {
        const nextCode = text.charCodeAt(i + 1);
        if (nextCode >= 0xDC00 && nextCode <= 0xDFFF) {
          i++;
        }
      }

      totalSignificantChars++;

      // Check RTL bounds manually for performance, removing array allocation & looping
      if (code >= 0x0590) {
        if ((code >= 0x0590 && code <= 0x05FF) || // Hebrew
            (code >= 0x0600 && code <= 0x06FF) || // Arabic
            (code >= 0x0700 && code <= 0x074F) || // Syriac
            (code >= 0x0750 && code <= 0x077F) || // Arabic Supplement
            (code >= 0x0780 && code <= 0x07BF) || // Thaana
            (code >= 0x08A0 && code <= 0x08FF) || // Arabic Extended-A
            (code >= 0xFB1D && code <= 0xFB4F) || // Hebrew Presentation Forms
            (code >= 0xFB50 && code <= 0xFDFF) || // Arabic Presentation Forms-A
            (code >= 0xFE70 && code <= 0xFEFF))   // Arabic Presentation Forms-B
        {
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
