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

## Phase 4 — Graph-first public UI — COMPLETE / VISUAL QA CONTINUES

CCLR does not use the standard Ledger Series KPI-card/table dashboard shell. The public interface is a graph-first exploration surface documented in `docs/UI_SPEC.md`.

Implemented:
- responsive application shell and relationship-field viewport
- canonical data loader / normalized graph model
- node and edge focus/recentering
- role-directed relationship lanes
- multi-hop exploration trails with shareable/restorable routes
- registry overview and cross-entity incident atlas
- lifecycle history trace derived from canonical events
- evidence access directly from relationships/events
- provider-incident vs program-impact overlays
- incident-to-remediation chronological flows without inferred causation
- program/provider/network focus routes that preserve graph context
- public methodology and correction paths
- mobile focus-first relationship navigation
- keyboard focus semantics, skip navigation, touch-target improvements and reduced-motion support

Implementation is complete at repository level. Browser/device visual QA may still produce bounded polish fixes, but it is not a blocker for Phase 3 record growth.

## Phase 5 — Monitoring

- program/provider lifecycle monitoring
- security incident monitoring
- provider migration monitoring
- reimbursement follow-up
- canonical data remains review-gated

## Current lanes

1. Phase 3 reviewed record growth is the primary canonical-data lane.
2. Phase 4 is implementation-complete; only bounded visual/accessibility polish remains when evidence from actual QA warrants it.
3. Rain follow-up in Issue #1 runs separately and must not stall record growth.
