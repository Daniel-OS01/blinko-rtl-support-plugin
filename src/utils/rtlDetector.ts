import { DetectionStrategy } from './strategies/types';
import { CharacterCodeStrategy, RTLDetectionConfig } from './strategies/CharacterCodeStrategy';
import { RegexStrategy } from './strategies/RegexStrategy';
import { CombinedStrategy } from './strategies/CombinedStrategy';

export type { RTLDetectionConfig };

export class RTLDetector {
  private strategy: DetectionStrategy;
  private charCodeStrategy: CharacterCodeStrategy;
  private regexStrategy: RegexStrategy;
  private config: RTLDetectionConfig;

  constructor(config: Partial<RTLDetectionConfig> = {}) {
    this.config = {
      sensitivity: 'medium',
      minRTLChars: 3,
      sampleSize: 100,
      ...config
    } as RTLDetectionConfig;

    // Initialize strategies
    this.charCodeStrategy = new CharacterCodeStrategy(this.config);

    // Map sensitivity to threshold for RegexStrategy
    const threshold = this.getThresholdFromSensitivity(this.config.sensitivity);
    this.regexStrategy = new RegexStrategy(true, true, threshold, this.config.minRTLChars);

    // Default to combined strategy
    this.strategy = new CombinedStrategy([
        this.charCodeStrategy,
        this.regexStrategy
    ]);
  }

  private getThresholdFromSensitivity(sensitivity: 'high' | 'medium' | 'low'): number {
      switch (sensitivity) {
          case 'high': return 0.1;
          case 'medium': return 0.15;
          case 'low': return 0.4;
          default: return 0.15;
      }
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
    this.config = { ...this.config, ...config };

    this.charCodeStrategy.updateConfig(config);

    // Update RegexStrategy threshold if sensitivity changed
    const threshold = this.getThresholdFromSensitivity(this.config.sensitivity);
    this.regexStrategy.updateConfig({
        minRTLChars: config.minRTLChars,
        threshold: threshold
    });
  }
}
