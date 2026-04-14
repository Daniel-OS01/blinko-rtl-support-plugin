import { DetectionStrategy } from './types';

export class RegexStrategy implements DetectionStrategy {
  readonly name = 'Regex';

  // Hebrew regex range: 0590-05FF, FB1D-FB4F (Presentation forms A), FB50-FBB1 (Presentation forms B - wait, that's Arabic)
  // Hebrew: \u0590-\u05FF
  private readonly hebrewPattern = '\\u0590-\\u05FF\\uFB1D-\\uFB4F';

  // Arabic regex range
  private readonly arabicPattern = '\\u0600-\\u06FF\\u0750-\\u077F\\u08A0-\\u08FF\\uFB50-\\uFDFF\\uFE70-\\uFEFF';

  private checkHebrew: boolean;
  private checkArabic: boolean;
  private threshold: number; // Ratio 0.0 - 1.0
  private minRTLChars: number = 3;
  private rtlRegex: RegExp | null = null;

  constructor(checkHebrew: boolean = true, checkArabic: boolean = true, threshold: number = 0.3, minRTLChars: number = 3) {
    this.checkHebrew = checkHebrew;
    this.checkArabic = checkArabic;
    this.threshold = threshold;
    this.minRTLChars = minRTLChars;
    this.updateRegex();
  }

  private updateRegex(): void {
    const patterns: string[] = [];
    if (this.checkHebrew) patterns.push(this.hebrewPattern);
    if (this.checkArabic) patterns.push(this.arabicPattern);

    if (patterns.length === 0) {
      this.rtlRegex = null;
    } else {
      this.rtlRegex = new RegExp(`[${patterns.join('')}]`, 'g');
    }
  }

  updateConfig(config: { minRTLChars?: number, threshold?: number }): void {
      if (config.minRTLChars !== undefined) {
          this.minRTLChars = config.minRTLChars;
      }
      if (config.threshold !== undefined) {
          this.threshold = config.threshold;
      }
  }

  detect(text: string): boolean {
    if (!text || !text.trim()) return false;

    if (!this.rtlRegex) return false;

    const matches = text.match(this.rtlRegex);

    if (!matches) return false;

    const rtlCount = matches.length;

    // Support minRTLChars check
    if (rtlCount < this.minRTLChars) {
        // If the text is purely RTL, we accept it even if it's shorter than minRTLChars.
        // E.g. "כן" (yes) is 2 chars.
        if (rtlCount > 0 && rtlCount === text.trim().length) {
            return true;
        }
        return false;
    }

    const totalCount = text.length;
    if (totalCount === 0) return false;

    return (rtlCount / totalCount) > this.threshold;
  }
}
