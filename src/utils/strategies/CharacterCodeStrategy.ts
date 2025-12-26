import { DetectionStrategy } from './types';

/**
 * Configuration options for the RTL detection logic.
 */
export interface RTLDetectionConfig {
  /**
   * Sensitivity level for detection.
   * - 'high': Requires a lower percentage of RTL characters to trigger (10%).
   * - 'medium': Balanced sensitivity (15%).
   * - 'low': Requires a higher percentage of RTL characters to trigger (40%).
   */
  sensitivity: 'high' | 'medium' | 'low';

  /**
   * Minimum number of RTL characters required to consider the text as potentially RTL.
   * This helps avoid false positives from stray characters.
   */
  minRTLChars: number;

  /**
   * The number of characters to sample from the beginning of the text for analysis.
   * Using a sample improves performance for large text blocks.
   */
  sampleSize: number;
}

/**
 * A detection strategy that analyzes the character codes of the text.
 * It checks if characters fall within known RTL Unicode ranges (Hebrew, Arabic, Syriac, Thaana).
 * It calculates the percentage of RTL characters in a sample to determine directionality based on configured sensitivity.
 */
export class CharacterCodeStrategy implements DetectionStrategy {
  /**
   * The name of the strategy.
   */
  readonly name = 'CharacterCode';

  /**
   * Current configuration for the strategy.
   */
  private config: RTLDetectionConfig;

  /**
   * Array of Unicode ranges [start, end] for RTL scripts.
   * - Hebrew: \u0590-\u05FF
   * - Arabic: \u0600-\u06FF
   * - Syriac: \u0700-\u074F
   * - Thaana: \u0780-\u07BF
   */
  private readonly RTL_RANGES = [
    [0x0590, 0x05FF], // Hebrew
    [0x0600, 0x06FF], // Arabic
    [0x0700, 0x074F], // Syriac
    [0x0780, 0x07BF], // Thaana
  ];

  /**
   * Creates an instance of CharacterCodeStrategy.
   *
   * @param config - Initial configuration for detection. Defaults to medium sensitivity, 3 min chars, and 100 sample size.
   */
  constructor(config: RTLDetectionConfig = {
    sensitivity: 'medium',
    minRTLChars: 3,
    sampleSize: 100
  }) {
    this.config = config;
  }

  /**
   * Checks if a single character is within any of the defined RTL Unicode ranges.
   *
   * @param char - The character to check.
   * @returns `true` if the character code is in an RTL range, `false` otherwise.
   */
  private isRTLChar(char: string): boolean {
    const code = char.charCodeAt(0);
    return this.RTL_RANGES.some(([min, max]) => code >= min && code <= max);
  }

  /**
   * Detects RTL content in the given text based on character code analysis.
   * It calculates the ratio of RTL characters to significant characters (excluding whitespace and punctuation)
   * in the sampled text and compares it against the sensitivity threshold.
   *
   * @param text - The text to analyze.
   * @returns `true` if the text meets the criteria for RTL, `false` otherwise.
   */
  public detect(text: string): boolean {
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
   * Updates the strategy configuration.
   *
   * @param config - Partial configuration object to merge with the current config.
   */
  public updateConfig(config: Partial<RTLDetectionConfig>): void {
      this.config = { ...this.config, ...config };
  }
}
