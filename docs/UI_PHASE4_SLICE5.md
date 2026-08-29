# Phase 4 UI slice 5 — multi-hop trail and provenance

This slice extends the graph-first public UI without adding canonical facts.

## Multi-hop trail

A relationship traversal may continue across successive focused entities. Each trail step stores only an existing canonical relation ID, the traversed endpoint IDs, and the canonical relation type. The trail is presentation state only and never becomes canonical data.

## Graph provenance

When a relation is selected, the graph shows a compact provenance label derived from that relation's canonical `evidence_ids`. The label may expose evidence count and recorded reliability values. It must not synthesize a safety score or claim stronger support than the evidence records contain.

## Incident to remediation flow

The incident window renders event sequences grouped by the event's own canonical `entity_id`. Incident and remediation events are ordered by canonical event date. The visual arrow means chronological presentation only; it does not assert technical causation unless canonical data explicitly states it.

Provider incidents must not be propagated to adjacent programs. A program is shown as affected or confirmed unaffected only from its own canonical event records.

## Mobile

Mobile relationship controls extend the same multi-hop trail and show relation provenance without requiring precision taps on SVG edges.

## Non-goals

- inferred cross-entity causality
- automatically inferred affected status
- graph-derived safety or risk scoring
- creating new canonical relations from a user's navigation trail
