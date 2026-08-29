# Phase 4 UI slice 6 — overview, shareable trails, incident atlas

This slice adds three navigation capabilities to the graph-first public UI without changing canonical data.

## Registry overview

`#/overview` renders all reviewed canonical programs, providers, networks and canonical relations in the role-directed field. It is an orientation surface, not a KPI dashboard. Selecting an entity enters ordinary focus mode.

No extra edges are synthesized for layout purposes.

## Shareable trail

Focus routes may carry a presentation-only `trail` hash parameter. Each serialized step contains a canonical relation id and its selected destination entity id.

On load, restoration is accepted only when every relation exists, the destination is one of that relation's endpoints, and consecutive steps remain contiguous. Any invalid sequence is discarded rather than partially guessed.

The trail never becomes canonical data and does not alter entity, relation, event or evidence records.

## Incident atlas

`#/incidents` shows only entities that own at least one canonical incident or remediation event. This mode is deliberately based on `event.entity_id`; an entity is not included merely because it is adjacent to an affected provider.

The incident/remediation flow remains chronological presentation. Arrows do not assert technical causality.

## Navigation contract

- Overview returns users to the full reviewed relationship field.
- Incident atlas provides cross-entity incident browsing.
- Selecting an entity from either mode enters focus mode.
- Trail sharing updates/copies the current URL only; it does not write remote state.
- Search continues to use reviewed canonical entity text.

## Non-goals

- inferred impact propagation
- safety scoring
- ranking programs by incident count
- generated root-cause claims
- server-side/session persistence of trails
