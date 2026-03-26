# Documentation Protocol — Universal Implementation Guide

> **Document type:** Reusable project-agnostic protocol for coding agents and developers
> **Version:** 2.0
> **Transferability:** This document can be copied to any software repository unchanged.
> **Last updated:** 2026-03-26

---

## Purpose

This protocol defines the documentation standards, triggers, templates, and quality criteria that any coding agent or developer must follow when implementing changes to a software project. It ensures that every implementation is:

- **Traceable** — any change can be mapped back to its originating requirement
- **Reproducible** — another agent/developer can understand and re-implement the work
- **Recoverable** — the documentation provides enough context to diagnose and reverse changes

---

## Table of Contents

1. [Required Documentation Artifacts](#1-required-documentation-artifacts)
2. [When to Update Documentation](#2-when-to-update-documentation)
3. [Templates](#3-templates)
4. [Formatting Conventions](#4-formatting-conventions)
5. [Granularity Guide](#5-granularity-guide)
6. [Pre-Work Checklist](#6-pre-work-checklist)
7. [Post-Work Checklist](#7-post-work-checklist)
8. [Agent-Specific Instructions](#8-agent-specific-instructions)
9. [Multi-Agent & Multi-Provider Guidance](#9-multi-agent--multi-provider-guidance)

---

## 1. Required Documentation Artifacts

All documentation lives in the `/docs` folder at the repository root. Never place documentation in source code directories.

### Core Artifacts (Required in Every Repository)

These six files form the minimum viable documentation set. Every repository must have all of them.

| File | Purpose | Update Frequency |
|------|---------|-----------------|
| `USER_REQUIREMENTS.md` | Original requests, interpreted requirements, acceptance criteria | On each new user request |
| `IMPLEMENTATION_PLAN.md` | Architecture, execution strategy, milestones, rollback procedures | Before starting work; update if plan changes |
| `CHANGE_LOG.md` | Chronological record of every modification with before/after code | After each logical change |
| `ERROR_RESOLUTION.md` | Error catalog, root causes, unsuccessful attempts, resolutions, lessons learned | When an error is encountered and resolved |
| `OUTCOME_SUMMARY.md` | What succeeded, what failed, deviations, build results, recommendations | After completing a body of work |
| `DOCUMENTATION_PROTOCOL.md` | This file — protocol, templates, granularity guide | When protocol evolves |

### Extended Artifacts (Add When Relevant)

Create these files when the project reaches the complexity threshold described for each.

| File | Purpose | Create When |
|------|---------|-------------|
| `ARCHITECTURE.md` | System design, component relationships, data flows, build system | Project has ≥2 services or ≥1 external API integration |
| `DECISION_LOG.md` | Architectural decisions — context, alternatives, rationale (ADR format) | A non-obvious technical choice is made that future devs might reverse |
| `API_REFERENCE.md` | External API endpoints, request/response contracts, auth patterns | Project calls any external HTTP API |
| `TESTING_GUIDE.md` | How to run tests, test patterns, environment limitations, authoring guide | Project has ≥10 tests or a non-trivial test environment |
| `SECURITY.md` | Auth token storage, known vulnerabilities, threat model, future hardening | Project handles credentials, tokens, or PII |
| `TROUBLESHOOTING.md` | Common failure modes, diagnostic steps, user-facing error guide | Project is deployed to production users |
| `RELEASE_NOTES.md` | User-facing changelog per version | Project has versioned releases |
| `DEPENDENCY_MAP.md` | All external dependencies, versions, purpose, last-updated date | Project has ≥5 external dependencies or a complex build chain |

### Artifact Flow Diagram

```
User message / new request
    │
    ▼
USER_REQUIREMENTS.md    ──────────────►  IMPLEMENTATION_PLAN.md
  (capture verbatim)                       (plan before coding)
                                                  │
                              ┌───────────────────┴─────────────────────┐
                              │ during implementation                   │
                              ▼                                         ▼
                       CHANGE_LOG.md                          ERROR_RESOLUTION.md
                    (after each change)                    (when errors occur)
                              │
                              └──────────────────┬──────────────────────┘
                                                 │ after completing work
                                                 ▼
                                        OUTCOME_SUMMARY.md
                                      (post-implementation)
                                                 │
                                    ┌────────────┤ also update if relevant
                                    ▼            ▼
                            DECISION_LOG.md   ARCHITECTURE.md
                           (if key decision)  (if structure changed)
```

---

## 2. When to Update Documentation

### Always Update Before Starting Work

- `USER_REQUIREMENTS.md` — capture the user's request verbatim before interpretation
- `IMPLEMENTATION_PLAN.md` — document the plan before touching any source file

### Update During Work

| Trigger | File to Update |
|---------|---------------|
| A source file is modified | `CHANGE_LOG.md` — add entry |
| A new file is created | `CHANGE_LOG.md` — add entry |
| A file is deleted | `CHANGE_LOG.md` — add entry with reason |
| An error is encountered | `ERROR_RESOLUTION.md` — add entry while context is fresh |
| An error is resolved | `ERROR_RESOLUTION.md` — update entry with resolution |
| The plan changes materially | `IMPLEMENTATION_PLAN.md` — add revision note |

### Always Update After Completing Work

- `CHANGE_LOG.md` — verify all changes are recorded
- `ERROR_RESOLUTION.md` — verify all errors are documented
- `OUTCOME_SUMMARY.md` — write a complete post-mortem

### Skip Documentation Only When

- The change is a single-character typo fix with zero logic impact
- The change is purely documentation (updating a doc file)
- An automated tool (linter, formatter) made the change with no human decision involved

---

## 3. Templates

### USER_REQUIREMENTS.md Entry

```markdown
### REQ-NNN — Short requirement title

**Source:** Which user message / session introduced this
**Priority:** Critical / High / Medium / Low
**Summary:** One paragraph describing what the user needs and why

**Interpreted requirement:** What the implementation must actually do,
translated from user language to technical terms.
```

### IMPLEMENTATION_PLAN.md Entry

```markdown
### Plan Revision NNN — YYYY-MM-DD

**Trigger:** What prompted this plan or revision
**Scope:** Which files and components are affected

#### Steps
1. Step description — file: `path/to/file.ts`, change: what and why
2. ...

#### Acceptance Criteria
- [ ] Testable criterion 1
- [ ] Testable criterion 2

#### Risks
| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Description | Low/Med/High | Approach |
```

### CHANGE_LOG.md Entry

```markdown
### [CL-NNN] Short title

**Date:** YYYY-MM-DD
**Branch:** `branch-name`
**Commit:** `sha` (if known)

**Files modified:**
- `path/to/file.ts` — what changed

**Changes:**
```code block showing before/after for non-trivial changes```

**Rationale:** Why this change was made; what requirement it addresses
```

### ERROR_RESOLUTION.md Entry

```markdown
### ERR-NNN — Short error title

**Date:** YYYY-MM-DD
**Severity:** Blocker / Critical / High / Medium / Low
**Component:** Which file/function/system
**Status:** Open / Resolved

#### Error Message
```exact error text or behavior description```

#### Root Cause Analysis
Technical explanation of why the error occurs.

#### Unsuccessful Approaches
- Approach 1 tried — why it failed
- Approach 2 tried — why it failed

#### Successful Resolution
What ultimately fixed it. Include before/after code if relevant.

#### Lesson Learned
Generalizable principle derived from this error.
```

### OUTCOME_SUMMARY.md Entry

```markdown
### Session YYYY-MM-DD — Short session title

#### What Succeeded
| Item | Evidence of Success |
|------|-------------------|
| Feature X | Build passed; behavior Y observed |

#### What Failed / Was Deferred
| Item | Reason | Risk if Left | Recommendation |
|------|--------|-------------|----------------|

#### Deviations from Plan
| Planned | Actual | Reason |
|---------|--------|--------|

#### Build Results
Paste relevant build output

#### Recommendations
Prioritized list of next steps
```

---

## 4. Formatting Conventions

### File Structure

```
# Document Title

> **Document type:** ...
> **Version:** ...
> **Last updated:** YYYY-MM-DD

## Table of Contents
1. [Section](#section)

---

## Section
```

### Versioning

- Increment **minor** version (1.1 → 1.2) for additions that don't change existing content
- Increment **major** version (1.x → 2.0) for structural reorganizations or significant rewrites
- Always update `**Last updated:**` date on any modification

### Code Blocks

- Always specify the language in fenced code blocks: ` ```typescript `, ` ```bash `, ` ```css `
- For "before/after" comparisons, use separate blocks with `// Before` and `// After` comments
- For inline code in prose, use backticks: `` `fileName.ts` ``, `` `functionName()` ``

### Tables

- Use tables for: error indexes, requirement lists, risk assessments, file change manifests
- Align pipes vertically for readability
- Keep table cells concise — move details to body text below the table

### Cross-References

- Reference other docs by filename: `see ERROR_RESOLUTION.md ERR-003`
- Reference code by file:line when known: `uiuxService.ts:149`
- Reference requirements: `addresses REQ-01`

---

## 5. Granularity Guide

The appropriate level of documentation detail depends on the nature and risk of the change.

### Level 1 — Minimal (Low-risk, additive changes)

**Applicable to:** Adding a new CSS rule, updating a string constant, adding a field to an interface with empty-string default

**Required documentation:**
- `CHANGE_LOG.md` entry with: date, file modified, one-sentence rationale
- No `ERROR_RESOLUTION.md` entry needed unless an error occurred

**Example CHANGE_LOG entry:**
```
### [CL-005] Add blinkoApiUrl field to AIPostSettings
Date: 2026-03-26 | Files: src/types.ts
Added empty-string default field. Prerequisite for CL-007.
```

---

### Level 2 — Standard (Logic changes, new features)

**Applicable to:** New methods, modified algorithms, new UI components, API integrations

**Required documentation:**
- `CHANGE_LOG.md` entry with: before/after code, rationale, key decisions
- `USER_REQUIREMENTS.md` entry if change addresses a new user request
- `ERROR_RESOLUTION.md` entry if errors were encountered during development

**Example trigger:** Adding a REST API fallback path to an existing service method

---

### Level 3 — Detailed (High-risk, architectural changes)

**Applicable to:** Changes to auth mechanisms, changes to `window.fetch` wrapping, significant behavior changes to widely-used utilities, changes affecting plugin lifecycle (init/destroy)

**Required documentation:**
- Full Level 2 documentation
- `IMPLEMENTATION_PLAN.md` entry with risk assessment and rollback procedure
- `OUTCOME_SUMMARY.md` section after implementation
- Explicit "Why this approach was chosen over alternatives" paragraph

**Example trigger:** Modifying the `MutationObserver` + debounce pattern in `applySingleTap()`

---

### Level 4 — Architectural (System-wide changes)

**Applicable to:** Changes to build system, new service classes, new tab structures in settings, changes to plugin entry point (`index.tsx`), changes to the `UIUXService.apply()` dispatch chain

**Required documentation:**
- All Level 3 documentation
- Updated architecture diagram or prose description in `IMPLEMENTATION_PLAN.md`
- Session notes in `OUTCOME_SUMMARY.md` explaining the architectural decision

---

## 6. Pre-Work Checklist

Before writing a single line of source code, complete this checklist:

```
PRE-WORK CHECKLIST
==================
□ Read the user's request verbatim — do not paraphrase yet
□ Update USER_REQUIREMENTS.md with the verbatim request and your interpretation
□ Read all files you plan to modify (do not modify without reading)
□ Identify all files that will be affected (direct + transitive)
□ Check if the change touches any of these high-risk areas:
  □ window.fetch wrapping
  □ MutationObserver callbacks
  □ history.pushState / popstate
  □ Plugin lifecycle (init, destroy, apply)
  □ localStorage read/write
  □ Event listeners on document or body
□ Write an IMPLEMENTATION_PLAN.md entry covering:
  □ Steps in order
  □ Risk assessment
  □ Rollback approach
□ Run the build once BEFORE making changes to confirm it was already passing
```

---

## 7. Post-Work Checklist

After completing all code changes:

```
POST-WORK CHECKLIST
===================
□ Run the build and capture output
□ Verify build size has not regressed unexpectedly (>20% increase = investigate)
□ Update CHANGE_LOG.md — one entry per logical change (not per file)
□ Update ERROR_RESOLUTION.md for any errors encountered
□ Write OUTCOME_SUMMARY.md section covering this session
□ Verify USER_REQUIREMENTS.md acceptance criteria can be checked off
□ Commit source changes + documentation changes in the same commit
  OR as a documentation-only follow-up commit immediately after
□ Push to the designated feature branch
```

---

## 8. Agent-Specific Instructions

These instructions apply when an AI coding agent (Claude Code, Copilot, Gemini CLI, etc.) is executing the implementation.

### Before Touching Any File

1. **Read the file first.** Never edit a file without reading it. The `Read` tool / file read operation is mandatory before any `Edit` or `Write`.

2. **Understand existing patterns.** Read related files to understand naming conventions, import styles, error handling patterns before adding new code. New code should look like existing code.

3. **Update `USER_REQUIREMENTS.md` immediately.** Capture the user's request before you start implementing. The verbatim request section must contain the user's actual words, not a paraphrase.

### During Implementation

4. **Update `CHANGE_LOG.md` per logical change, not per file.** If one requirement causes changes to 3 files, that is one `CHANGE_LOG.md` entry (with all 3 files listed), not 3 entries.

5. **Document errors while the context is fresh.** When you encounter an error, add to `ERROR_RESOLUTION.md` before you forget the exact error message and the approaches you tried.

6. **Call out unexpected findings.** If you discover something surprising about the codebase (e.g., an antipattern, a partially-completed feature, a security concern), document it in `ERROR_RESOLUTION.md` or `OUTCOME_SUMMARY.md` even if it was not your task to fix it.

### Verification

7. **Run the build before committing.** A passing build is the minimum bar. If the build fails, fix it before committing documentation.

8. **Read back your documentation.** After writing a documentation file, read the key sections to verify they are accurate and would be understandable to a developer unfamiliar with this session's context.

### Commit Discipline

9. **Commit source + docs together.** Documentation commits orphaned from their source change commits are difficult to correlate. Prefer one commit per feature that includes both source and docs.

10. **Use descriptive commit messages.** Format:
    ```
    Verb: short title (50 chars max)

    - Bullet 1: what was changed and why
    - Bullet 2: ...
    - Key decision rationale if non-obvious
    ```

### Session Handoff

11. **Write `OUTCOME_SUMMARY.md` as if handing off to a new agent.** The next agent (or a human reviewer) should be able to read `OUTCOME_SUMMARY.md` and know exactly what was done, what wasn't done, and what the highest-priority next steps are.

12. **Explicitly call out deferred items.** Any task that was identified but not completed must appear in `OUTCOME_SUMMARY.md §What Failed or Was Deferred` with: what it is, why it was deferred, and the risk of leaving it.

---

## Appendix A — Documentation Quick-Start for New Repositories

To bootstrap this documentation system in a new repository:

```bash
mkdir -p docs
# Create each artifact file using this protocol as the template guide
touch docs/USER_REQUIREMENTS.md
touch docs/IMPLEMENTATION_PLAN.md
touch docs/CHANGE_LOG.md
touch docs/ERROR_RESOLUTION.md
touch docs/OUTCOME_SUMMARY.md
cp docs/DOCUMENTATION_PROTOCOL.md docs/DOCUMENTATION_PROTOCOL.md  # already exists
```

Initialize each file with:
- The document header block (type, version, date)
- An empty entry using the appropriate template from Section 3
- The note: `*No entries yet. First entry due before next implementation session begins.*`

---

## Appendix B — Severity Definitions

Use these definitions consistently across `ERROR_RESOLUTION.md` and `USER_REQUIREMENTS.md`:

| Severity | Definition |
|----------|-----------|
| **Blocker** | Prevents the build or prevents any testing from proceeding |
| **Critical** | Core feature does not work for primary use case; no workaround |
| **High** | Feature partially works or works inconsistently; workaround exists but is uncomfortable |
| **Medium** | Feature works but with side effects, noise, or occasional failures |
| **Low** | Cosmetic issue, minor UX degradation, or edge-case behavior |

---

## 9. Multi-Agent & Multi-Provider Guidance

This section contains additional instructions for AI coding agents from different providers (Claude Code, GitHub Copilot, Cursor, Gemini CLI, etc.) to ensure consistent documentation behavior regardless of which tool is working on the repository.

### Universal Behaviors (All Agents)

1. **Never start coding without reading** — use the equivalent of `Read`/`cat`/file-read before any edit
2. **Capture the user's request verbatim** in `USER_REQUIREMENTS.md` before interpreting it
3. **Document while context is fresh** — write `ERROR_RESOLUTION.md` entries while debugging, not after
4. **One CHANGE_LOG entry per logical change** — changes to 3 files for one requirement = 1 entry
5. **Mark deferred tasks explicitly** — anything not completed must appear in `OUTCOME_SUMMARY.md`

### Claude Code Specifics

- Use `TodoWrite` to track progress across multi-step implementations
- Run `bun run build` before committing — never commit broken builds
- Use `Grep` and `Read` tools for code searches, not Bash `grep`/`cat`
- Commit source + documentation in the same commit when possible

### GitHub Copilot / Copilot Chat

- After generating code, explicitly generate documentation entries for each changed file
- Use the CHANGE_LOG template from Section 3 verbatim — do not summarize
- Copilot does not auto-read files; always include `@workspace` or explicit file references in prompts
- After completing a PR, write the `OUTCOME_SUMMARY.md` entry before merging

### Cursor

- Cursor's agent mode auto-reads open files; still verify the correct file was read before editing
- Use `/docs/DOCUMENTATION_PROTOCOL.md` as a reference in the Cursor chat window when asking it to document
- After applying a diff, immediately update `CHANGE_LOG.md` in the same edit session

### Gemini CLI / Gemini in IDEs

- Gemini's context window is large — provide the full `DOCUMENTATION_PROTOCOL.md` as context when documenting
- Use structured prompts: "Update CHANGE_LOG.md with entry for: [description of change]"
- After any error encounter, add to `ERROR_RESOLUTION.md` with the exact error text pasted verbatim

### Session Handoff Protocol

When switching between AI coding tools (e.g., Claude Code → Copilot), the outgoing agent must:

1. Write `OUTCOME_SUMMARY.md` with a "Handoff" section listing:
   - Files modified in this session (with brief descriptions)
   - Tests that were added or changed
   - Any failing tests and their known root causes
   - Next highest-priority tasks in priority order
2. Commit all documentation before ending the session
3. Ensure the build is passing (`bun run build` or equivalent)

The incoming agent must:
1. Read `OUTCOME_SUMMARY.md` → `CHANGE_LOG.md` → `IMPLEMENTATION_PLAN.md` in that order
2. Run the test suite before making any changes to establish a baseline
3. Do NOT make changes until the above reading is complete

### Preventing Documentation Drift

Documentation drift occurs when code and docs diverge. Signs of drift:
- `CHANGE_LOG.md` last updated more than 1 session ago
- `ARCHITECTURE.md` references files that no longer exist
- `ERROR_RESOLUTION.md` has no entries despite known bugs

**Recovery:** Before starting new work, run a "documentation audit":
1. Check that every `src/**/*.ts` change since the last doc update has a `CHANGE_LOG.md` entry
2. Verify `ARCHITECTURE.md` file paths still exist (`ls src/services/`, `ls src/utils/`)
3. Check that all `OUTCOME_SUMMARY.md` deferred items are either in the backlog or completed

---

## Appendix C — Extended Artifact Templates

### ARCHITECTURE.md Template

```markdown
# Architecture — [Project Name]

> **Version:** 1.0 | **Last updated:** YYYY-MM-DD

## Overview
[2-3 sentence description of what the system does and how it's structured]

## File Structure
[Directory tree with brief descriptions]

## Core Components
[One section per major service/module with:
- Responsibility description
- Key methods and their purpose
- Data flow (input → processing → output)]

## Data Flow: [Key Scenario]
[Step-by-step data flow for the most important user-facing operation]

## External Dependencies
[Table: Dependency | Version | Purpose | Auth required]

## Build System
[Commands, outputs, key config files]
```

---

### DECISION_LOG.md Entry Template (ADR format)

```markdown
### DEC-NNN — Short decision title

**Date:** YYYY-MM-DD
**Status:** Proposed | Accepted | Superseded by DEC-XXX | Deprecated

**Context:**
What situation or problem drove this decision? What constraints existed?

**Alternatives Considered:**
1. Option A — why it was rejected
2. Option B — why it was rejected
3. **Chosen: Option C** — full rationale

**Consequences:**
- Positive: what this enables
- Negative: what this makes harder or impossible
- Neutral: what changes without being better or worse
```

---

### TESTING_GUIDE.md Template

```markdown
# Testing Guide — [Project Name]

## Running Tests
[Commands for: all tests, single file, specific describe block, with flags]

## Test Architecture
[Environment setup, test runner, DOM environment if applicable]

## Common Patterns
[Code examples for: async timing, event dispatch, mock setup, teardown]

## Known Limitations
[Environment-specific issues (e.g. happy-dom CSS selector compat)]

## Writing New Tests
[Checklist for new test files]
```

---

### API_REFERENCE.md Entry Template

```markdown
### `METHOD /path/to/endpoint`

**Auth:** Bearer token | Session cookie | None
**Content-Type:** application/json

**Request:**
\`\`\`json
{ "field": "value" }
\`\`\`

**Success Response (200):**
\`\`\`json
{ "result": "..." }
\`\`\`

**Error Responses:**
| Status | Meaning | Action |
|--------|---------|--------|

**Implementation:** `src/services/xxx.ts` → `methodName()`
```

---

*Document version: 2.0 — Updated 2026-03-26 (added extended artifacts, multi-provider guidance, section 9, appendix C)*
*Transferable to any software repository without modification.*
