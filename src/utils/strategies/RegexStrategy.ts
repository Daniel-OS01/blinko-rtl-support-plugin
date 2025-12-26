import { DetectionStrategy } from './types';

export class RegexStrategy implements DetectionStrategy {
  readonly name = 'Regex';

  // Hebrew regex from userscript
  private readonly hebrewRegex = /\p{Script=Hebrew}/u;
  // Arabic regex
  private readonly arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;

  private checkHebrew: boolean;
  private checkArabic: boolean;

  constructor(checkHebrew: boolean = true, checkArabic: boolean = true) {
    this.checkHebrew = checkHebrew;
    this.checkArabic = checkArabic;
  }

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
