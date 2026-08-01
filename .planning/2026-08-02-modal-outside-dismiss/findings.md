# Findings — modal outside-click dismiss (2026-08-02)

## Live diagnostics (Phase 0)

Attempted Puppeteer against `https://blink.psy-tech.link/?path=all`.

| Check | Result |
|---|---|
| Auth | Redirected to `/signin` — no cards, cannot open editor |
| Plugin banner | `[blinko-rtl] v3.2.4 ready` (repo main is v3.2.5; release lag) |
| CSS load | `Failed to load CSS… Unauthorized` (known session issue, HANDOFF §6) |

Console probes that require an open note (portal children, Escape, backdrop vs wrapper) could not be re-run live.

## Evidence used instead (already verified)

From `.planning/recording.json` + HANDOFF live DOM:

- Editor surface = HeroUI `section[role="dialog"]` with `#global-editor` / `#vditor-edit` (not z-[9999] overlay).
- Portal `/html/body/div[N]`: child 1 backdrop clicks do nothing; child 2 `.flex` / `[data-slot="wrapper"]` clicks dismiss.
- Close control is unlabelled `div` with `cursor-pointer`, `rounded-full`, `z-[2002]` — no `aria-label` / `close` class / `data-dismiss`.

## Decision

Plugin must close the modal via that structural close control, falling back to clicking the wrapper; Escape last. Do not skip the modal (backdrop is not natively dismissable).
