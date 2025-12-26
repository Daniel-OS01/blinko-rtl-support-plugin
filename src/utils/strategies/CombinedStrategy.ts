import { DetectionStrategy } from './types';

/**
 * A composite detection strategy that aggregates multiple other strategies.
 * It follows the "OR" logic: if any of the contained strategies detect RTL,
 * the combined strategy returns true.
 */
export class CombinedStrategy implements DetectionStrategy {
  /**
   * The name of the strategy.
   */
  readonly name = 'Combined';

  /**
   * The list of strategies to execute.
   */
  private strategies: DetectionStrategy[];

  /**
   * Creates an instance of CombinedStrategy.
   *
   * @param strategies - An array of detection strategies to combine.
   */
  constructor(strategies: DetectionStrategy[]) {
    this.strategies = strategies;
  }

  /**
   * Detects RTL content by querying all child strategies.
   *
   * @param text - The text to analyze.
   * @returns `true` if *any* of the strategies return `true`, `false` otherwise.
   */
  detect(text: string): boolean {
    // Returns true if ANY strategy detects RTL
    return this.strategies.some(strategy => strategy.detect(text));
  }

  /**
   * Adds a new strategy to the combination.
   *
   * @param strategy - The strategy to add.
   */
  addStrategy(strategy: DetectionStrategy) {
      this.strategies.push(strategy);
  }

  /**
   * Retrieves the list of currently active strategies.
   *
   * @returns An array of the composed `DetectionStrategy` objects.
   */
  getStrategies() {
      return this.strategies;
  }
}
