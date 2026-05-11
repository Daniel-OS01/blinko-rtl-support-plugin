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

    // Process up to sampleSize characters directly, avoiding substring allocation
    // Be careful since sampleSize was used on string length, but now we use it on code units
    // (surrogate pairs might count as 2 here, but we will adjust `i` to treat them as 1).
    let charsProcessed = 0;

    for (let i = 0; i < text.length && charsProcessed < this.config.sampleSize; i++) {
      const code = text.charCodeAt(i);
      charsProcessed++;

      // Fast path for ASCII whitespace and common punctuation
      if (code <= 125) {
         if (
           code === 32 || // space
           code === 10 || // newline
           code === 9 || // tab
           code === 13 || // carriage return
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
           continue;
         }
      } else if (code >= 0xD800 && code <= 0xDBFF) {
        // High surrogate (start of surrogate pair, e.g., emoji)
        // Skip the next code unit (low surrogate) so we treat the pair as one character
        if (i + 1 < text.length) {
            i++;
        }
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
