import { DetectionStrategy } from './types';

export class CombinedStrategy implements DetectionStrategy {
  readonly name = 'Combined';
  private strategies: DetectionStrategy[];

  constructor(strategies: DetectionStrategy[]) {
    this.strategies = strategies;
  }

  detect(text: string): boolean {
    // Returns true if ANY strategy detects RTL
    return this.strategies.some(strategy => strategy.detect(text));
  }

  addStrategy(strategy: DetectionStrategy) {
      this.strategies.push(strategy);
  }

  getStrategies() {
      return this.strategies;
  }
}
