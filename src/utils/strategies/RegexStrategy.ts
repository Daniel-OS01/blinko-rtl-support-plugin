import { DetectionStrategy } from './types';

/**
 * A detection strategy that uses Regular Expressions to identify RTL scripts.
 * It provides a fast and simple check for the presence of Hebrew or Arabic characters.
 */
export class RegexStrategy implements DetectionStrategy {
  /**
   * The name of the strategy.
   */
  readonly name = 'Regex';

  /**
   * Regex for matching Hebrew characters using Unicode property escapes.
   */
  private readonly hebrewRegex = /\p{Script=Hebrew}/u;

  /**
   * Regex for matching Arabic characters and extended ranges.
   * Includes:
   * - Arabic: \u0600-\u06FF
   * - Arabic Supplement: \u0750-\u077F
   * - Arabic Extended-A: \u08A0-\u08FF
   */
  private readonly arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;

  /**
   * Flag to enable/disable Hebrew detection.
   */
  private checkHebrew: boolean;

  /**
   * Flag to enable/disable Arabic detection.
   */
  private checkArabic: boolean;

  /**
   * Creates an instance of RegexStrategy.
   *
   * @param checkHebrew - Whether to check for Hebrew characters. Defaults to true.
   * @param checkArabic - Whether to check for Arabic characters. Defaults to true.
   */
  constructor(checkHebrew: boolean = true, checkArabic: boolean = true) {
    this.checkHebrew = checkHebrew;
    this.checkArabic = checkArabic;
  }

  /**
   * Detects RTL content using regular expressions.
   *
   * @param text - The text to analyze.
   * @returns `true` if the text matches the enabled RTL regex patterns, `false` otherwise.
   */
  detect(text: string): boolean {
    if (!text) return false;

    if (this.checkHebrew && this.hebrewRegex.test(text)) {
      return true;
    }

    if (this.checkArabic && this.arabicRegex.test(text)) {
      return true;
    }

    return false;
  }
}
