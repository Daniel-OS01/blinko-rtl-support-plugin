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

/**
 * The full-screen note detail overlay Blinko opens when a card is clicked.
 *
 * Rendered as `div.fixed.inset-0.z-[9999].bg-background.overflow-hidden`.
 */
export const DETAIL_OVERLAY_SELECTOR = 'div.fixed.inset-0[class*="z-[9999]"]';

/**
 * The scrollable content pane inside that overlay, while it is in preview mode.
 *
 * Blinko binds its preview-to-edit toggle to this element's `onDoubleClick` —
 * the same handler as the pencil button in the overlay header. Double-clicking
 * it is therefore how the editor is reached, and it is the app's own code path
 * rather than a guess at one.
 *
 * The earlier attempt dispatched `dblclick` on the *card*, which has no such
 * handler; nothing was listening and nothing happened.
 */
export const DETAIL_PREVIEW_PANE_SELECTOR =
  '.flex-1.overflow-y-auto.min-h-0.py-4';

/** The preview pane of a currently-open detail overlay, if there is one. */
export function findDetailPreviewPane(): HTMLElement | null {
  const overlay = document.querySelector<HTMLElement>(DETAIL_OVERLAY_SELECTOR);
  if (!overlay) return null;
  return overlay.querySelector<HTMLElement>(DETAIL_PREVIEW_PANE_SELECTOR);
}

/** True when the note editor is mounted. */
export function isEditorOpen(): boolean {
  return !!document.getElementById('global-editor');
}

/**
 * The content container inside the detail overlay — the max-width column the
 * app treats as "inside". Blinko holds a ref to it and stops propagation for
 * pointer events landing outside it, so it is the correct boundary for
 * outside-click detection too.
 */
export function findDetailOverlayContent(): HTMLElement | null {
  const overlay = document.querySelector<HTMLElement>(DETAIL_OVERLAY_SELECTOR);
  if (!overlay) return null;
  return overlay.querySelector<HTMLElement>('.w-full.mx-auto');
}

/**
 * Close the detail overlay.
 *
 * The header's back button closes it outright from either mode. That header is
 * only rendered on the wide layout, so the fallback is Escape — which in edit
 * mode steps back to preview rather than closing, hence the second press.
 */
export function closeDetailOverlay(): boolean {
  const overlay = document.querySelector<HTMLElement>(DETAIL_OVERLAY_SELECTOR);
  if (!overlay) return false;

  const backButton = overlay.querySelector<HTMLElement>(
    '.flex.items-center.justify-between button'
  );
  if (backButton) {
    activate(backButton);
    return true;
  }

  const escape = () =>
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })
    );
  escape();
  // Edit mode consumes the first Escape to return to preview.
  if (document.querySelector(DETAIL_OVERLAY_SELECTOR)) escape();
  return true;
}

/**
 * HeroUI modal that hosts the note editor after a card click.
 *
 * Captured structure (see `.planning/recording.json` + HANDOFF):
 *   body > div                        portal root
 *     ├── div                         backdrop (aria-hidden) — clicks do nothing
 *     └── div[data-slot="wrapper"]    fixed inset-0 z-50 — clicks dismiss
 *           └── section[role="dialog"].…modal-content
 *                 └── #global-editor
 *
 * Earlier code also looked for `editor-container`, `note-editor`,
 * `blinko-editor`, and `dialog-content`. Only `modal-content` exists in the app.
 */
export const MODAL_CONTENT_SELECTOR =
  'section[role="dialog"][class*="modal-content"], [class*="modal-content"]';

/** HeroUI's full-viewport wrapper around the dialog panel. */
export const MODAL_WRAPPER_SELECTOR = '[data-slot="wrapper"]';

/**
 * The modal's close control: an unlabelled circular `div`, not a `<button>`.
 *
 * Matched as a direct child of the dialog panel via `cursor-pointer` +
 * `rounded-full`. Do not key off arbitrary stacking tokens like `z-[2002]` —
 * those move whenever the app retunes its stacking context.
 */
export const MODAL_CLOSE_SELECTOR =
  ':scope > div.cursor-pointer[class*="rounded-full"]';

/**
 * Drive a control the way a real pointer does.
 *
 * HeroUI / react-aria `usePress` and `useInteractOutside` listen on
 * `pointerdown`/`pointerup` (with mouse fallbacks). `HTMLElement.click()`
 * dispatches only a `click` event, so both the circular close div and the
 * wrapper ignore it — which is why v3.2.6's close path was a silent no-op.
 */
export function activate(el: HTMLElement): void {
  const mouse = { bubbles: true, cancelable: true, composed: true, view: window };
  const pointer = { ...mouse, pointerId: 1, pointerType: 'mouse' as const };
  el.dispatchEvent(new PointerEvent('pointerdown', pointer));
  el.dispatchEvent(new MouseEvent('mousedown', mouse));
  el.dispatchEvent(new PointerEvent('pointerup', pointer));
  el.dispatchEvent(new MouseEvent('mouseup', mouse));
  el.dispatchEvent(new MouseEvent('click', mouse));
}

/** The visible modal dialog panel, if one is open. */
export function findModalContent(): HTMLElement | null {
  const candidates = document.querySelectorAll<HTMLElement>(MODAL_CONTENT_SELECTOR);
  for (const el of Array.from(candidates)) {
    if (el.style.display === 'none' || el.style.visibility === 'hidden') continue;
    return el;
  }
  return null;
}

/**
 * Close the HeroUI note-editor modal.
 *
 * Prefer the wrapper (recording-proven dismiss target), then the circular
 * close control, then Escape on `document`. Every rung uses `activate()` and
 * is verified before falling through — never `return true` while the dialog
 * is still mounted.
 */
export function closeModalEditor(): boolean {
  const content = findModalContent();
  if (!content) return false;

  const wrapper =
    content.closest<HTMLElement>(MODAL_WRAPPER_SELECTOR) ??
    content.parentElement;

  const closeBtn =
    content.querySelector<HTMLElement>(MODAL_CLOSE_SELECTOR) ??
    wrapper?.querySelector<HTMLElement>('div.cursor-pointer[class*="rounded-full"]') ??
    null;

  const tryActivate = (el: HTMLElement | null | undefined): boolean => {
    if (!el) return false;
    activate(el);
    return !findModalContent();
  };

  if (tryActivate(wrapper)) return true;
  if (tryActivate(closeBtn)) return true;

  document.dispatchEvent(
    new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })
  );

  // React may unmount on the next frame; retry once if still open.
  if (findModalContent()) {
    requestAnimationFrame(() => {
      if (!findModalContent()) return;
      const again = findModalContent();
      if (!again) return;
      const w =
        again.closest<HTMLElement>(MODAL_WRAPPER_SELECTOR) ?? again.parentElement;
      if (tryActivate(w)) return;
      const c =
        again.querySelector<HTMLElement>(MODAL_CLOSE_SELECTOR) ??
        w?.querySelector<HTMLElement>('div.cursor-pointer[class*="rounded-full"]');
      if (tryActivate(c)) return;
      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })
      );
    });
  }

  return true;
}
