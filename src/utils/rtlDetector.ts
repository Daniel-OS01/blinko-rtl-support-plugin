import { CombinedStrategy } from './strategies/CombinedStrategy';
import { CharacterCodeStrategy } from './strategies/CharacterCodeStrategy';
import { RegexStrategy } from './strategies/RegexStrategy';
import { DetectionStrategy } from './strategies/types';

/**
 * Interface defining the configuration for RTL detection.
 */
export interface RTLConfig {
  /**
   * Sensitivity level for detection: 'high', 'medium', or 'low'.
   */
  sensitivity: 'high' | 'medium' | 'low';
  /**
   * Minimum number of RTL characters required to trigger detection.
   */
  minRTLChars: number;
  /**
   * Numeric threshold (0.0 - 1.0) for the percentage of RTL content.
   * Used for fine-tuning detection sensitivity.
   */
  threshold: number;
  /**
   * Sample size for text analysis.
   */
  sampleSize?: number;
}

/**
 * Class responsible for detecting Right-to-Left (RTL) content in text.
 * It uses a Strategy pattern to employ different detection algorithms (Character Code, Regex).
 */
export class RTLDetector {
  /**
   * The current configuration for detection.
   */
  private config: RTLConfig;

  /**
   * The strategy object used to perform the detection.
   */
  private strategy: DetectionStrategy;

  /**
   * Creates an instance of RTLDetector.
   * Initializes with default configuration (medium sensitivity) and a CombinedStrategy
   * consisting of CharacterCodeStrategy and RegexStrategy.
   */
  constructor() {
    this.config = {
      sensitivity: 'medium',
      minRTLChars: 3,
      threshold: 0.15,
      sampleSize: 100
    };

    // Initialize with default strategies
    this.strategy = new CombinedStrategy([
        new CharacterCodeStrategy({
            sensitivity: this.config.sensitivity,
            minRTLChars: this.config.minRTLChars,
            sampleSize: this.config.sampleSize || 100
        }),
        new RegexStrategy()
    ]);
  }

  /**
   * Updates the detector's configuration.
   * Also propagates relevant configuration updates to the underlying strategies.
   *
   * @param config - Partial configuration object to update.
   */
  updateConfig(config: Partial<RTLConfig>) {
    this.config = { ...this.config, ...config };

    // Update strategy configuration if applicable
    if (this.strategy instanceof CombinedStrategy) {
        this.strategy.getStrategies().forEach(s => {
            if (s instanceof CharacterCodeStrategy) {
                s.updateConfig({
                    sensitivity: this.config.sensitivity,
                    minRTLChars: this.config.minRTLChars
                });
            }
        });
    }
  }

  /**
   * Detects if the provided text contains RTL content.
   *
   * @param text - The text string to analyze.
   * @returns `true` if RTL content is detected, `false` otherwise.
   */
  detectRTL(text: string): boolean {
    return this.strategy.detect(text);
  }

  /**
   * Checks if an HTML element should be treated as RTL.
   * It analyzes the element's text content using the configured detection strategy.
   *
   * @param element - The HTML element to check.
   * @returns `true` if the element's content is detected as RTL, `false` otherwise.
   */
  isRTL(element: HTMLElement): boolean {
    const text = element.textContent || '';
    return this.detectRTL(text);
  }
}
