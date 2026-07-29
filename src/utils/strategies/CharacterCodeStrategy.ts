import { DetectionStrategy } from './types';

export interface RTLDetectionConfig {
  sensitivity: 'high' | 'medium' | 'low';
  minRTLChars: number;
  sampleSize: number;
}

export class CharacterCodeStrategy implements DetectionStrategy {
  readonly name = 'CharacterCode';
  private config: RTLDetectionConfig;

  private readonly ignoreRegex = /\s|[.,!?;:()[\]{}]/;

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
    if (code >= 0x0590 && code <= 0x06FF) return true; // Hebrew & Arabic
    if (code >= 0x0700 && code <= 0x077F) return true; // Syriac & Arabic Supplement
    if (code >= 0x0780 && code <= 0x07BF) return true; // Thaana
    if (code >= 0x08A0 && code <= 0x08FF) return true; // Arabic Extended-A
    if (code >= 0xFB1D && code <= 0xFDFF) return true; // Presentation Forms
    if (code >= 0xFE70 && code <= 0xFEFF) return true; // Presentation Forms
    return false;
  }

  /**
   * Detect RTL content in text
   */
  public detect(text: string): boolean {
    if (!text || text.length === 0) return false;

    // Take sample from beginning of text for performance without allocating new strings
    const sampleLen = Math.min(text.length, this.config.sampleSize);

    let rtlCharCount = 0;
    let totalSignificantChars = 0;

    for (let i = 0; i < sampleLen; i++) {
      const char = text[i];
      // Skip whitespace and punctuation for analysis using cached regex
      if (!this.ignoreRegex.test(char)) {
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
