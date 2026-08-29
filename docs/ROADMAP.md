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

## Phase 4 — Graph-first public UI — DESIGN LOCKED / IMPLEMENTATION STARTED

CCLR will not use the standard Ledger Series KPI-card/table dashboard shell. The approved direction is a graph-first exploration interface documented in `docs/UI_SPEC.md`.

Implementation slices:
- responsive application shell and relationship-field viewport
- canonical data loader / normalized graph model
- node and edge focus/recentering
- lifecycle history trace derived from canonical events
- evidence access directly from relationships/events
- provider-incident vs program-impact overlays
- program/provider focus routes that preserve graph context
- methodology/about and correction path
- mobile focus-first navigation, accessibility and reduced-motion support

Phase 4 implementation may proceed in parallel with bounded Phase 3 record-growth batches. Mockup-only facts must never be copied into canonical data.

## Phase 5 — Monitoring

- program/provider lifecycle monitoring
- security incident monitoring
- provider migration monitoring
- reimbursement follow-up
- canonical data remains review-gated

## Current lanes

1. Phase 3 reviewed record growth remains the canonical-data lane.
2. Phase 4 graph-first UI implementation runs in parallel and consumes only reviewed canonical data.
3. Rain follow-up in Issue #1 runs separately and must not stall either lane.
