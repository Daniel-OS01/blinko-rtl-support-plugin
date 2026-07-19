import { DetectionStrategy } from './types';

// Cache regex outside hot loop to prevent re-compilation and memory allocation
const SKIP_REGEX = /\s|[.,!?;:()[\]{}]/;

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
   */
  private isRTLChar(char: string): boolean {
    const code = char.charCodeAt(0);
    // Replace .some() closure with flat loop for performance in hot paths
    for (let i = 0; i < this.RTL_RANGES.length; i++) {
      const min = this.RTL_RANGES[i][0];
      const max = this.RTL_RANGES[i][1];
      if (code >= min && code <= max) return true;
    }
    return false;
  }

  /**
   * Detect RTL content in text
   */
  public detect(text: string): boolean {
    if (!text || text.length === 0) return false;

    // Avoid allocating a new string via substring; just calculate the loop limit
    const limit = Math.min(text.length, this.config.sampleSize);

    let rtlCharCount = 0;
    let totalSignificantChars = 0;

    // Flat loop using integer index avoids for..of iterator overhead
    for (let i = 0; i < limit; i++) {
      const char = text[i];
      // Use cached regex and avoid string allocation
      if (!SKIP_REGEX.test(char)) {
        totalSignificantChars++;
        if (this.isRTLChar(char)) {
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
