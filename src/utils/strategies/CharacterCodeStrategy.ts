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
   * Check if a code point is RTL
   */
  private isRTLCodePoint(code: number): boolean {
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

  /**
   * Detect RTL content in text
   */
  public detect(text: string): boolean {
    if (!text || text.length === 0) return false;

    // Limit check to sampleSize
    const len = Math.min(text.length, this.config.sampleSize);
    let rtlCharCount = 0;
    let totalSignificantChars = 0;

    for (let i = 0; i < len; i++) {
      const code = text.charCodeAt(i);

      // Early ASCII bounds check for punctuation and whitespace
      if (code <= 125) {
        // Space, tab, newline, return
        if (code === 32 || code === 9 || code === 10 || code === 13) continue;

        // Punctuation: .,!?;:()[]{}"'
        if (
          (code >= 33 && code <= 47) ||
          (code >= 58 && code <= 64) ||
          (code >= 91 && code <= 96) ||
          (code >= 123 && code <= 126)
        ) {
          continue;
        }
      }

      // Handle surrogates
      if (code >= 0xD800 && code <= 0xDBFF) {
        totalSignificantChars++;
        i++; // skip low surrogate
        continue;
      }

      totalSignificantChars++;
      if (this.isRTLCodePoint(code)) {
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
