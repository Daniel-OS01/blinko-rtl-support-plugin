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
   * Detect RTL content in text
   */
  public detect(text: string): boolean {
    if (!text || text.length === 0) return false;

    let rtlCharCount = 0;
    let totalSignificantChars = 0;

    // Handle potential undefined sampleSize defensively
    const limit = Math.min(text.length, this.config.sampleSize ?? text.length);

    for (let i = 0; i < limit; i++) {
      const code = text.charCodeAt(i);

      // Fast skip for ASCII punctuation and whitespace
      if (code <= 125) {
        if (
          code === 32 || code === 10 || code === 9 || code === 13 ||
          code === 46 || code === 44 || code === 33 || code === 63 ||
          code === 59 || code === 58 || code === 40 || code === 41 ||
          code === 91 || code === 93 || code === 123 || code === 125
        ) {
          continue;
        }
      }
      // Skip non-breaking space
      else if (code === 160) {
        continue;
      }

      // Handle UTF-16 surrogate pairs (e.g. emojis)
      if (code >= 0xD800 && code <= 0xDBFF) {
          // High surrogate, skip the next code unit (low surrogate)
          i++;
          // We don't count emojis as significant text characters for RTL detection
          continue;
      }

      totalSignificantChars++;

      if (
        (code >= 0x0590 && code <= 0x05FF) || // Hebrew
        (code >= 0x0600 && code <= 0x06FF) || // Arabic
        (code >= 0x0700 && code <= 0x074F) || // Syriac
        (code >= 0x0750 && code <= 0x077F) || // Arabic Supplement
        (code >= 0x0780 && code <= 0x07BF) || // Thaana
        (code >= 0x08A0 && code <= 0x08FF) || // Arabic Extended-A
        (code >= 0xFB1D && code <= 0xFB4F) || // Hebrew Presentation Forms
        (code >= 0xFB50 && code <= 0xFDFF) || // Arabic Presentation Forms-A
        (code >= 0xFE70 && code <= 0xFEFF)    // Arabic Presentation Forms-B
      ) {
        rtlCharCount++;
      }
    }

    if (rtlCharCount < this.config.minRTLChars) {
      return false;
    }

    const rtlPercentage = totalSignificantChars > 0 ? rtlCharCount / totalSignificantChars : 0;

    const thresholds = {
      high: 0.1,
      medium: 0.15,
      low: 0.4
    };

    return rtlPercentage >= thresholds[this.config.sensitivity];
  }

  public updateConfig(config: Partial<RTLDetectionConfig>): void {
      this.config = { ...this.config, ...config };
  }
}
