🍴 Aloklok Fork Analysis — 162 Commits Ahead of Upstream
click to expand/collapse
Fork: Aloklok/blinko · 162 commits ahead · 18 behind · as of 2026-03-05. Sorted by integration priority. See docs/RESEARCH_FINDINGS.md for full details.

Priority	SHA	Date	Title	Category	Action
🔴	f7026780	2026-03-05	DeepSeek R1 / thinking mode config	+ Feature	PR → daniel-os01/blinko
🔴	84db3ebd	2026-02-14	iOS audio truncation fix (timeslice)	🐛 Fix	PR → daniel-os01/blinko
🔴	75cfe7ba	2026-02-20	iOS Safari blob URL loading error	🐛 Fix	PR → daniel-os01/blinko
🟡	f4bd0428	2026-02-10	ARIA labels + rAF interaction perf	♿ A11y	CSS/JS partial in plugin
🟡	a0869b04	2026-02-20	Mobile delete icon visibility	🐛 Fix	CSS in plugin
🟡	82c31233	2026-03-05	Duplicate AI tag polling alerts	🐛 Fix	PR → core
🟡	3900a159	2026-02-19	AI tag UX: instant feedback + stability	🟡 UX	PR → core
🟡	972c4562	2026-02-15	AI settings switch & select layout	🐛 Fix	CSS in plugin
🟡	8da45370	2026-02-08	Tag text/bg color collision	🐛 Fix	CSS in plugin
🟡	cb12c096	2026-02-08	Card image + redundant loading states	🐛 Fix	CSS in plugin
🟢	bbaf5bf7	2026-02-09	JS vendor split + async icons + DB index	⚡ Perf	PR → core (low risk)
🟢	71897dce	2026-02-10	Vite chunking + async icon loading	⚡ Perf	PR → core
🟢	be4fd14e	2026-02-08	@dnd-kit migration (build fix)	♻️ Refactor	PR → core
🟢	1eaed8c3	2026-02-09	Resource manager + auth cache overhaul	⚡ Perf	PR → core
🟢	f47932a3	2026-02-08	Native fetch/lodash + lazy-load heavy libs	♻️ Refactor	PR → core
⚪	~50 total	Feb 12–14	Docker/Prisma 7 + Node 22 + Zeabur fixes	🔧 Infra	Wait — high risk rebase
🔴 High priority · 🟡 Medium · 🟢 Low · ⚪ Infra only

📋 Original 15 Issues — Cross-Platform Analysis
Findings from Android + Desktop analysis. ✅ = fixable via this plugin · ⚙️ = requires core PR.

✅
1. Timestamp multi-row wrapping (mobile)
Date/time label ("2 hours ago") wraps to 2-3 lines due to oversized font. Fix: enable Compact Date/Time under Typography.

✅
2. Double-tap inconsistency (Blinko vs Article)
Blinko type notes require a double-tap to expand while Article opens on single tap. Fix: enable Single-Tap under Navigation.

✅
3. Android back button exits app
Hardware back / swipe-back closes the app instead of the open note overlay. Fix: enable Back Button Closes Note under Navigation.

✅
4. Undersized touch targets on mobile
Multiple toolbar icons and buttons are <32 px — below the 48 dp WCAG/Material minimum. Fix: enable Minimum Touch Targets under Accessibility.

✅
5. Animations on motion-sensitive devices
Slide/fade transitions play even on devices flagged with prefers-reduced-motion. Fix: enable Reduce Motion under Accessibility.

✅
6. Low information density on wide screens
Card padding and toolbar gaps waste space on desktop. Fix: enable Compact Mode under Layout.

✅
7. Card corner radius inconsistency
Different corner radii across card types break visual rhythm. Fix: use Card Border Radius slider under Layout.

✅
8. No focus rings for keyboard users
Interactive elements have outline: none — breaks keyboard navigation entirely. Fix: enable Always-Visible Focus Rings under Accessibility.

⚙️
9. Editor toolbar RTL mirroring
The formatting toolbar (B/I/S/Link) stays LTR even when editing RTL content. Requires core change.

⚙️
10. Submit button icon mismatch (RTL)
The submit arrow (➤) points left in RTL mode, suggesting "back" rather than "send". Core fix needed.

⚙️
11. Masonry grid reflow on note expand
Expanding a note causes masonry reflow and viewport scroll. Requires virtualised list or position:fixed overlay.

⚙️
12. Audio player visualiser is always LTR
Waveform/progress bar plays left-to-right even in RTL context. Requires core player change.

⚙️
13. Tag pill overflow truncation
#Main/Sub/Topic tags overflow card boundaries on narrow screens. Needs text-overflow + tooltip in core.

⚙️
14. No swipe-to-delete on mobile
Deleting a note requires navigating a context menu. Native swipe gesture expected by mobile users.

⚙️
15. Loading skeleton missing on slow networks
Cards appear empty before content loads with no placeholder skeleton. Degrades perceived performance.

➕ 20 Extended Recommendations — Holistic UX/UI Audit
Format: Current state → Proposed enhancement · Expected benefit · Complexity

✅
🍴
1. Mobile delete icons invisible (Aloklok a0869b04)
Voice/attachment delete icons have near-zero opacity on mobile → CSS opacity + min-width fix → prevents accidental retained attachments · Low

✅
🍴
2. Custom icon input label overlap (Aloklok cd9419b7)
Settings icon label overlaps the text input → CSS z-index/position fix → cleaner settings form · Low

✅
🍴
3. Tag text clashes with background on custom themes (Aloklok 8da45370)
Custom primary colors cause tag text to disappear → CSS --primary-rgb fallback + contrast rule → consistent tag readability · Low

✅
🍴
4. Card images show spinner after full load (Aloklok cb12c096)
Loaded images continue showing animated spinner → CSS animation kill on loaded state → less visual noise · Low

✅
🍴
5. Duplicate / premature AI tag alerts (Aloklok 82c31233)
AI auto-tag fires multiple notifications per tagging cycle → JS debounce + timestamp guard → less interruption · Medium

✅
🔍
6. No search-term highlighting in results
Matched keywords not highlighted in result cards → inject <mark> around matches → faster visual scanning · Medium

⚙️
🔍
7. No multi-select for batch operations
Deleting/archiving multiple notes requires repeating the action → checkbox overlay + bulk toolbar → major productivity gain · High

✅
🔍
8. No offline / connectivity indicator
App silently fails when server unreachable → navigator.onLine + CSS status banner → prevents confusion and lost edits · Low

✅
🔍
9. No estimated reading time on long notes
Users cannot gauge note length → JS word-count badge at 200 wpm → better note triage · Low

✅
🔍
10. No keyboard shortcuts (Ctrl+N, Ctrl+Enter, /)
No global hotkeys for note creation or search focus → JS keydown listener → power-user productivity · Medium

✅
🔍
11. Dark mode not OLED-black
Current dark mode uses #1a1a2e instead of #000000 → CSS custom property override for --background, --card → battery saving on AMOLED · Low

⚙️
🔍
12. Quick note templates missing
No way to start from a structured template → template picker in editor footer → faster structured capture · High

⚙️
🔍
13. No file upload progress indicator
Attachments appear to hang during upload → progress bar UI → user confidence, prevents duplicate uploads · Medium

✅
🔍
14. Empty note list has no onboarding CTA
First-time users see a blank page → CSS :empty + JS injection of "Create your first note" → reduces abandonment · Low

⚙️
🔍
15. Error messages are generic ("Something went wrong")
Backend errors swallowed into a single generic toast → specific, actionable messages with recovery links → less frustration · Medium

⚙️
🔍
16. No undo after accidental note delete
Recycling a note is immediate with no undo window → toast with Undo action within 5s → prevents data-loss anxiety · Medium

✅
🔍
17. Pinned notes visually identical to unpinned
No visual distinction between pinned and normal cards → CSS pseudo-element pin badge in card corner → at-a-glance identification · Low

✅
🔍
18. Cross-platform font rendering inconsistency
Different OS-default fonts shift layout across devices → CSS system-ui font stack normalisation → consistent reading experience · Low

✅
🔍
19. No in-note heading outline / jump-to-section
Long article notes have no navigation → JS TOC injection (parse ## headings, render sticky list) → fast navigation · Medium

✅
🔍
20. Tag hierarchy (#parent/child) not visually distinct
#Main/Sub/Topic tags display as flat pills → CSS indentation + color-step per slash level → cognitive structure, reduces misreads · Low

✅ = Addressable via plugin  |  ⚙️ = Core app PR required  |  🍴 = From Aloklok fork  |  🔍 = Independent audit