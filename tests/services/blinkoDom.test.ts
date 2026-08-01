/**
 * Locks the plugin's assumptions about Blinko's DOM to markup captured from
 * the running app (.planning/html-and-dev.html).
 *
 * The previous selector list — note-card, blinko-card, blinko-note, note-item —
 * matched nothing: none of those class names occur in the capture. The tests
 * that covered it built their own `note-card` fixture, so they passed while the
 * feature was inert in production.
 */

import { describe, it, expect, beforeEach } from 'bun:test';
import { GlobalRegistrator } from '@happy-dom/global-registrator';

try {
  GlobalRegistrator.register();
} catch (e) {
  // Already registered by another test file in the same run.
}

import {
  NOTE_CARD_SELECTOR,
  findNoteCard,
  isInteractiveTarget,
} from '../../src/services/blinkoDom';

/** Class attribute copied verbatim from a rendered card in the capture. */
const REAL_CARD_CLASS =
  'relative overflow-hidden h-auto text-foreground box-border outline-solid ' +
  'outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 ' +
  'data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 ' +
  'shadow-none rounded-large transition-transform-background motion-reduce:transition-none ' +
  'flex flex-col p-4 bg-background !transition-all group/card hover:translate-y-1 undefined';

/** The real nesting: the card sits seven levels below the grid. */
function buildRealCard(): { card: HTMLElement; body: HTMLElement; deleteIcon: HTMLElement } {
  document.body.innerHTML = `
    <div class="card-masonry-grid">
      <div class="card-masonry-grid_column">
        <div class="relative">
          <div class="relative">
            <div class="cursor-default!">
              <div class="menu-trigger">
                <div>
                  <div class="${REAL_CARD_CLASS}" tabindex="-1">
                    <div class="w-full">
                      <div class="flex items-center select-none mb-1">
                        <div class="text-xs text-desc cursor-pointer">27 minutes ago</div>
                        <svg id="del" class="cursor-pointer hover:text-red-500 text-desc"></svg>
                      </div>
                      <div class="markdown-body">
                        <div data-markdown-theme="dark" class="markdown-body content">
                          <p id="body">testing</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  return {
    card: document.querySelector<HTMLElement>('[class*="group/card"]')!,
    body: document.getElementById('body') as HTMLElement,
    deleteIcon: document.getElementById('del') as HTMLElement,
  };
}

describe('NOTE_CARD_SELECTOR', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('matches a real rendered card', () => {
    buildRealCard();
    const matched = document.querySelectorAll(NOTE_CARD_SELECTOR);
    expect(matched.length).toBe(1);
    expect((matched[0] as HTMLElement).className).toContain('group/card');
  });

  it('matches the card itself, not an ancestor wrapper', () => {
    const { card } = buildRealCard();
    expect(document.querySelector(NOTE_CARD_SELECTOR)).toBe(card);
  });

  it('does not match the hover-state helper classes on descendants', () => {
    // Children carry `group-hover/card:opacity-100`, which must not be
    // mistaken for `group/card`.
    document.body.innerHTML = `
      <div class="${REAL_CARD_CLASS}">
        <div class="ml-auto opacity-0 group-hover/card:opacity-100 group-hover/card:translate-x-0">x</div>
      </div>`;
    expect(document.querySelectorAll(NOTE_CARD_SELECTOR).length).toBe(1);
  });

  it('matches nothing on an unrelated page', () => {
    document.body.innerHTML = '<div class="sidebar"><p>hello</p></div>';
    expect(document.querySelectorAll(NOTE_CARD_SELECTOR).length).toBe(0);
  });
});

describe('findNoteCard', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('walks up from a descendant to the card', () => {
    const { card, body } = buildRealCard();
    expect(findNoteCard(body)).toBe(card);
  });

  it('returns the card when given the card', () => {
    const { card } = buildRealCard();
    expect(findNoteCard(card)).toBe(card);
  });

  it('returns null outside any card', () => {
    buildRealCard();
    const outside = document.querySelector<HTMLElement>('.card-masonry-grid')!;
    expect(findNoteCard(outside)).toBeNull();
  });

  it('returns null for null', () => {
    expect(findNoteCard(null)).toBeNull();
  });
});

describe('isInteractiveTarget', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('treats an action icon inside the card as interactive', () => {
    const { card, deleteIcon } = buildRealCard();
    expect(isInteractiveTarget(card, deleteIcon)).toBe(true);
  });

  it('treats the note body as not interactive', () => {
    const { card, body } = buildRealCard();
    expect(isInteractiveTarget(card, body)).toBe(false);
  });

  it('ignores matches outside the card', () => {
    const { card } = buildRealCard();
    const stray = document.createElement('button');
    document.body.appendChild(stray);
    expect(isInteractiveTarget(card, stray)).toBe(false);
  });
});
