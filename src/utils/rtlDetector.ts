export interface RTLDetectionConfig {
  sensitivity: 'high' | 'medium' | 'low';
  minRTLChars: number;
  sampleSize: number;
}

export class RTLDetector {
  private config: RTLDetectionConfig;

  // Hebrew: \u0590-\u05FF
  // Arabic: \u0600-\u06FF
  // Additional RTL: \u0700-\u074F, \u0780-\u07BF
  private readonly RTL_RANGES = [
    [0x0590, 0x05FF], // Hebrew
    [0x0600, 0x06FF], // Arabic
    [0x0700, 0x074F], // Syriac
    [0x0780, 0x07BF], // Thaana
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
    return this.RTL_RANGES.some(([min, max]) => code >= min && code <= max);
  }

  /**
   * Detect RTL content in text
   */
  public detectRTL(text: string): boolean {
    if (!text || text.length === 0) return false;

    // Take sample from beginning of text for performance
    const sample = text.substring(0, this.config.sampleSize);

    let rtlCharCount = 0;
    let totalSignificantChars = 0;

    for (const char of sample) {
      // Skip whitespace and punctuation for analysis
      if (!/\s|[.,!?;:()[\]{}]/.test(char)) {
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

  /**
   * Detect RTL in multiple text segments
   */
  public detectRTLInSegments(texts: string[]): boolean[] {
    return texts.map(text => this.detectRTL(text));
  }

  /**
   * Update detection configuration
   */
  public updateConfig(config: Partial<RTLDetectionConfig>): void {
    this.config = { ...this.config, ...config };
  }
}
