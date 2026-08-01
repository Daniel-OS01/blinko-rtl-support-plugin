/**
 * Blinko's DOM contract, in one place.
 *
 * These selectors depend on class names the host app happens to emit, which is
 * inherently brittle — so they live together, are documented against captured
 * markup, and are covered by tests built from that markup rather than from
 * invented fixtures.
 *
 * The previous list (`note-card`, `blinko-card`, `blinko-note`, `note-item`)
 * matched nothing: none of those names occur anywhere in the shipped app. The
 * `.card-masonry-grid > div > div` fallback resolved to a wrapper five levels
 * above the card.
 */

/**
 * A rendered note card.
 *
 * `group/card` is the Tailwind group marker the app puts on the card root, and
 * it is the only stable, card-specific token available. Descendants carry
 * `group-hover/card:…`, which does not contain the substring `group/card`, so
 * they do not collide.
 *
 * The legacy names are kept so a differently-skinned or older Blinko still
 * works; they cost nothing when absent.
 */
export const NOTE_CARD_SELECTOR =
  '[class*="group/card"], ' +
  '[class*="note-card"], [class*="blinko-card"], ' +
  '[class*="blinko-note"], [class*="note-item"]';

/**
 * Elements inside a card that own their own click behaviour — the action rail,
 * tags, menus and links. A click on one of these must be left alone.
 */
export const INTERACTIVE_SELECTOR =
  'button, a[href], input, textarea, select, svg, ' +
  '[role="button"], [role="menuitem"], [role="menu"], ' +
  '[data-slot="trigger"], [data-react-aria-pressable="true"], ' +
  '[class*="action"], [class*="toolbar"], [class*="menu"], ' +
  '[class*="tag"], [class*="more"], [class*="dropdown"]';

/** The note card containing `el`, or null when `el` is outside every card. */
export function findNoteCard(el: HTMLElement | null): HTMLElement | null {
  if (!el) return null;
  return el.closest<HTMLElement>(NOTE_CARD_SELECTOR);
}

/**
 * True when `target` is an element that handles its own clicks.
 *
 * The match is scoped to descendants of `card` so that a class on `<body>` or a
 * root container cannot make every click look interactive.
 */
export function isInteractiveTarget(card: HTMLElement, target: HTMLElement): boolean {
  const match = target.closest<HTMLElement>(INTERACTIVE_SELECTOR);
  return !!match && card.contains(match);
}
