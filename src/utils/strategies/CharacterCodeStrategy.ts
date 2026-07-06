import { DetectionStrategy } from './types';

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
  private isRTLCode(code: number): boolean {
    const ranges = this.RTL_RANGES;
    for (let i = 0; i < ranges.length; i++) {
        if (code >= ranges[i][0] && code <= ranges[i][1]) {
            return true;
        }
    }
    return false;
  }

  // Custom check for punctuation and whitespace instead of regex
  private isIgnored(code: number): boolean {
      // Space, Tab, LF, CR
      if (code === 32 || code === 9 || code === 10 || code === 13) return true;
      // Basic punctuation: ! " # $ % & ' ( ) * + , - . /
      if (code >= 33 && code <= 47) return true;
      // : ; < = > ? @
      if (code >= 58 && code <= 64) return true;
      // [ \ ] ^ _ `
      if (code >= 91 && code <= 96) return true;
      // { | } ~
      if (code >= 123 && code <= 126) return true;

      return false;
  }

  /**
   * Detect RTL content in text
   */
  public detect(text: string): boolean {
    if (!text || text.length === 0) return false;

    // Take sample from beginning of text for performance
    const sampleSize = Math.min(text.length, this.config.sampleSize);

    let rtlCharCount = 0;
    let totalSignificantChars = 0;

    for (let i = 0; i < sampleSize; i++) {
      const code = text.charCodeAt(i);

      // Skip whitespace and punctuation for analysis
      if (!this.isIgnored(code)) {
        totalSignificantChars++;
        // Fast path check to skip loop if not within valid range
        if (code >= 0x0590 && this.isRTLCode(code)) {
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
