# Roadmap

## Phase 0 — Bootstrap — COMPLETE

- repository operating rules
- scope boundary
- five-layer canonical model
- empty canonical datasets
- research/staging boundary

## Phase 1 — Rain incident evidence package — COMPLETE / FOLLOW-UP OPEN

Completed:
- Rain provider profile
- Avici program profile
- Tria program profile
- Solayer Pay program profile
- KAST program profile
- provider-program relationship evidence where supported
- Rain Solana contract incident timeline
- explicit affected / unaffected program impact states
- direct first-party evidence upgrade

Ongoing follow-up is tracked separately in Issue #1:
- reimbursement completion
- Rain/forensics technical postmortem
- authoritative cross-program loss total

These follow-ups do not block record growth.

## Phase 2 — Validation and CI — COMPLETE

- equivalent schema validation in `scripts/validate.mjs`
- ID uniqueness
- required-field validation
- status/type/event/source enum validation
- URL/date validation
- referential integrity
- evidence-link requirements
- relation evidence must name both endpoints
- event evidence must name the event entity
- provider/program incident-boundary enforcement through evidence scoping

## Phase 3 — Initial public dataset — CURRENT

- reviewed first batch of additional programs/providers
- material launch/provider-change/incident events
- evidence coverage requirements
- bounded review batches
- no thin card-list growth for count alone

See `docs/RECORD_GROWTH_POLICY.md`.

## Phase 4 — Public UI — COMPLETE / FOUR-MODE REFACTOR IN VISUAL QA

CCLR does not use the standard Ledger Series KPI-card/table dashboard shell. The public interface is documented in `docs/UI_SPEC.md`.

Current interaction contract:
- Overview is a compact master-detail ecosystem view with no all-record graph
- Explore is a bounded node-and-edge focus graph
- highly connected providers/networks paginate direct program neighbors
- only one connected program expands to a second hop at a time
- History is an independent canonical event surface
- Incidents is an independent incident/remediation surface
- evidence stays inside the current mode
- mode changes are explicit; no relationship/event click may auto-scroll into another mode
- one router owns public hash state
- `/index.html` and `#/overview` are legacy entry forms and normalize to `/`

Preserved graph-first capabilities:
- canonical data loader / normalized entity-relation model
- node and edge focus exploration
- role-distinct program/provider/network nodes
- relationship evidence access
- provider-incident vs program-impact separation
- program/provider/network focus routes
- mobile focus-first relationship navigation
- keyboard semantics and reduced-motion/accessibility support

The former all-record Overview graph and its independent Overview router/height controller are retired from the active public shell because they became unreadable as canonical record growth increased.

Visual/browser QA may still produce bounded polish fixes, but Phase 3 record growth remains the primary canonical-data lane.

## Phase 5 — Monitoring

- program/provider lifecycle monitoring
- security incident monitoring
- provider migration monitoring
- reimbursement follow-up
- canonical data remains review-gated

## Current lanes

1. Phase 3 reviewed record growth is the primary canonical-data lane.
2. Phase 4 four-mode UI refactor is in browser/device visual QA; fixes must preserve the one-mode/one-router interaction contract.
3. Rain follow-up in Issue #1 runs separately and must not stall record growth.
