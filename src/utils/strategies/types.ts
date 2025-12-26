export interface DetectionStrategy {
  /**
   * Unique identifier for the strategy
   */
  readonly name: string;

  /**
   * Detects if the given text contains RTL content
   */
  detect(text: string): boolean;
}
