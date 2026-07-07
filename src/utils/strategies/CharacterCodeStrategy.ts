import { DetectionStrategy } from './types';

export interface RTLDetectionConfig {
  sensitivity: 'high' | 'medium' | 'low';
  minRTLChars: number;
  sampleSize: number;
}

export class CharacterCodeStrategy implements DetectionStrategy {
  readonly name = 'CharacterCode';
  private config: RTLDetectionConfig;

  // Cached regex to prevent recreating the pattern on every loop iteration
  // Performance Pattern: using a cached static regex avoids memory allocation overhead inside hot parsing loops.
  private static readonly IGNORE_PATTERN = /\s|[.,!?;:()[\]{}]/;

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
    // Performance Pattern: Replace .some() array closure with a flat for-loop
    // and direct bounds checking to avoid callback overhead in hot paths.
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

    // Take sample from beginning of text for performance
    // Performance Pattern: Replace text.substring allocation with a limit bound for the loop
    const limit = Math.min(text.length, this.config.sampleSize);

    let rtlCharCount = 0;
    let totalSignificantChars = 0;

    // Performance Pattern: Flat index-based for loop over characters is faster than for..of
    for (let i = 0; i < limit; i++) {
      const char = text[i];
      // Skip whitespace and punctuation for analysis
      if (!CharacterCodeStrategy.IGNORE_PATTERN.test(char)) {
        totalSignificantChars++;
        if (this.isRTLCode(text.charCodeAt(i))) {
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
