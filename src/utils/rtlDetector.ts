import { DetectionStrategy } from './strategies/types';
import { CharacterCodeStrategy, RTLDetectionConfig } from './strategies/CharacterCodeStrategy';
import { RegexStrategy } from './strategies/RegexStrategy';
import { CombinedStrategy } from './strategies/CombinedStrategy';

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
  }
}
