/**
 * Interface defining the contract for RTL detection strategies.
 * Implementations of this interface encapsulate different algorithms
 * for determining if a given text contains Right-to-Left content.
 */
export interface DetectionStrategy {
  /**
   * Unique identifier for the strategy.
   * Used for debugging and strategy selection.
   */
  readonly name: string;

  /**
   * Detects if the given text contains RTL content.
   *
   * @param text - The text string to analyze.
   * @returns `true` if the text is determined to be RTL, `false` otherwise.
   */
  detect(text: string): boolean;
}
