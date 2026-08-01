import { DetectionStrategy } from './types';

export class CombinedStrategy implements DetectionStrategy {
  readonly name = 'Combined';
  private strategies: DetectionStrategy[];

  constructor(strategies: DetectionStrategy[]) {
    this.strategies = strategies;
  }

  /**
   * True if any member strategy detects RTL.
   *
   * OR was previously a problem rather than a policy: the two strategies
   * normalised by different denominators over different amounts of text, so
   * whichever happened to be looser decided every outcome and `sensitivity:
   * 'low'` was not actually conservative. Now that both draw their range set,
   * denominator and sampling from the shared rtlRanges module they agree on
   * ordinary text, and OR means what it says — a positive from a
   * script-narrowed strategy still counts.
   */
  detect(text: string): boolean {
    return this.strategies.some(strategy => strategy.detect(text));
  }

  addStrategy(strategy: DetectionStrategy) {
      this.strategies.push(strategy);
  }

  getStrategies() {
      return this.strategies;
  }
}
