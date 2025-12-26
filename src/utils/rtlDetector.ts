import { DetectionStrategy } from './strategies/types';
import { CharacterCodeStrategy, RTLDetectionConfig } from './strategies/CharacterCodeStrategy';
import { RegexStrategy } from './strategies/RegexStrategy';
import { CombinedStrategy } from './strategies/CombinedStrategy';
export interface RTLDetectionConfig {
  sensitivity: 'high' | 'medium' | 'low'; // Kept for backward compatibility
  threshold: number; // 0.0 to 1.0, lower means more sensitive (requires less RTL content)
  minRTLChars: number;
  sampleSize: number;
}

export type { RTLDetectionConfig };

export class RTLDetector {
  private strategy: DetectionStrategy;
  private charCodeStrategy: CharacterCodeStrategy;
  private regexStrategy: RegexStrategy;

  constructor(config: RTLDetectionConfig = {
    sensitivity: 'medium',
    minRTLChars: 3,
    sampleSize: 100
  }) {
    // Initialize strategies
    this.charCodeStrategy = new CharacterCodeStrategy(config);
    this.regexStrategy = new RegexStrategy(true, true);

    // Default to combined strategy for backward compatibility with "smart" behavior
    this.strategy = new CombinedStrategy([
        this.charCodeStrategy,
        this.regexStrategy
    ]);
  constructor(config: Partial<RTLDetectionConfig> = {}) {
    this.config = {
      sensitivity: 'medium',
      threshold: 0.15, // Default for medium
      minRTLChars: 3,
      sampleSize: 100,
      ...config
    };
  }

  public setStrategy(strategyName: 'CharacterCode' | 'Regex' | 'Combined') {
      switch (strategyName) {
          case 'CharacterCode':
              this.strategy = this.charCodeStrategy;
              break;
          case 'Regex':
              this.strategy = this.regexStrategy;
              break;
          case 'Combined':
              this.strategy = new CombinedStrategy([
                  this.charCodeStrategy,
                  this.regexStrategy
              ]);
              break;
      }
  }

  /**
   * Detect RTL content in text using current strategy
   */
  public detectRTL(text: string): boolean {
    return this.strategy.detect(text);
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

    // Use threshold directly
    return rtlPercentage >= this.config.threshold;
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
    this.charCodeStrategy.updateConfig(config);
    this.config = { ...this.config, ...config };

    // If sensitivity is updated but threshold isn't, map it
    if (config.sensitivity && !config.threshold) {
      const thresholds = {
        high: 0.1,    // 10% RTL chars
        medium: 0.15, // 15% RTL chars
        low: 0.4      // 40% RTL chars
      };
      this.config.threshold = thresholds[config.sensitivity];
    }
  }
}
