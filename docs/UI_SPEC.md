# Public UI specification

## Design thesis

CCLR is not a generic registry dashboard and must not reuse the standard Ledger Series card/KPI/table shell.

The primary public experience is an **exploration graph**: a selected crypto card program or infrastructure provider sits in a relationship field and the user follows evidenced dependencies, incidents, remediations, and lifecycle changes through connected paths.

The visual direction approved for implementation is the graph-first mockup discussed on 2026-08-29. The mockup is directional, not canonical data: labels, dates, counts, edges, and statuses shown in the image must be generated from canonical records and must never be copied when unsupported.

## Core interaction model

### Relationship field

The dominant desktop surface is an interactive relationship field, not a table. Nodes may represent card programs, providers, networks, and custody/collateral/settlement infrastructure when canonical records support them. Edges represent canonical `relation` records and use canonical relation types. No inferred edge may be rendered as fact.

Selecting a node recenters the field and updates surrounding context without requiring a conventional dashboard-detail split.

### Incident overlays

Material incident/event records are overlays on the relationship field and history trace. Provider-side incidents and program-specific impact remain visually distinct. A provider incident must not make every connected program appear affected. `confirmed_unaffected` appears only when an explicit canonical event exists.

### History trace

Lifecycle is a continuous trace through time rather than a generic activity table. Event points use canonical event date, type, impact and confidence, with filters for lifecycle change, incident, remediation/reimbursement, and infrastructure change.

### Evidence access

Every rendered relationship or event exposes its supporting evidence in one interaction. Show source type, publisher, date, reliability and claim scope, with a source link.

### Focus mode

A focused entity view keeps the exploration model instead of reverting to a generic profile-card page. It shows identity/current status, immediate dependency neighborhood, history trace, incident impact states, evidence-backed paths, and official source.

## Home composition

Open with compact CCLR identity/search controls, a large live exploration field seeded from canonical relationships, a history trace aligned with selected graph context, and compact evidence/incident context where useful. Counts are secondary; avoid KPI-card rows, leaderboard-like program tables, and a permanent right detail drawer as the primary information architecture.

## Search

Search is entity/event/evidence navigation in v1, not an AI claim-generation surface. Natural-language/AI search is deferred until a separate evidence-grounding contract exists.

## Visual language

- dark field suitable for dense relationship lines
- restrained neon accents used semantically
- distinguish program/provider/network/infrastructure roles
- incident/impact colors separate from lifecycle status colors
- readable typography on ordinary mobile displays
- functional motion only: recentering, path highlighting and history focus

## Mobile

Do not shrink the desktop graph into an unreadable canvas. Use focus-first navigation: selected entity, one-hop relationships, history trace, evidence sheet from an edge/event, and persistent search/entity switching. No horizontal page overflow is required to discover relations, incidents or evidence.

## Canonical integrity rules

- derive facts only from reviewed canonical `program`, `provider`, `relation`, `event`, and `evidence`
- never copy mockup-only statuses, relations, incident dates, counts or provider roles into production data
- unknown/unresolved stays visibly unknown
- confidence is evidence confidence, never a safety score
- provider-wide facts and program-specific impact are separate visual states
- staging/monitoring data is never rendered as canonical public fact

## Initial implementation slices

1. static application shell and responsive graph viewport
2. canonical data loader and normalized graph model
3. node/edge exploration and focus state
4. history trace from canonical events
5. evidence drawer/sheet linked from edges and events
6. incident impact overlay with affected/unaffected/unknown separation
7. program/provider focus routes
8. methodology/about and correction path
9. accessibility, reduced-motion and mobile validation

## Non-goals for v1

- rankings or safety scores
- rewards/APY comparison
- merchant acceptance directory
- AI-generated conclusions
- inferred provider impact
- decorative dashboard analytics unrelated to lifecycle exploration
