# Public UI specification

## Design thesis

CCLR is not a generic registry dashboard and must not reuse the standard Ledger Series KPI/table shell.

The public interface has four explicit modes with one responsibility each:

1. **Overview** — understand concentration and shared dependencies without drawing the full graph.
2. **Explore** — follow evidenced program/provider/network relationships through a bounded focus graph.
3. **History** — inspect canonical lifecycle events without changing graph state automatically.
4. **Incidents** — inspect canonical incident/remediation event owners without inheriting provider impact to adjacent programs.

The dark graph-first visual direction approved on 2026-08-29 remains the visual basis. Mockup labels, dates, counts, edges and statuses are directional only and must be generated from reviewed canonical data.

## Global interaction contract

### One mode at a time

Overview, Explore, History and Incidents are mutually exclusive public panels. A click inside one mode must not silently switch to another mode or scroll the page to a different mode.

Cross-mode navigation is explicit through a labelled link or top navigation control.

### Single router owner

One application router owns public route state. Secondary modules must not independently mutate hashes, route state or scroll position.

Supported public routes:

- `/` — Overview
- `/#/explore` — Explore start
- `/#/explore/program/:slug` — focused program graph
- `/#/explore/provider/:slug` — focused provider graph
- `/#/explore/network/:slug` — focused network graph
- `/#/history` — History
- `/#/incidents` — Incidents

`/index.html` and `/index.html#/overview` are legacy entry forms only. Client startup normalizes them to `/`; internal links must not generate `index.html`, and `#/overview` is not a canonical public state.

### No automatic cross-section scrolling

Selecting a relationship, node, event or incident updates the current mode in place. It must not automatically call attention to History, Evidence or another page section through `scrollIntoView()` or equivalent behaviour.

## Overview

Overview is a compact master-detail ecosystem view, not the all-record graph.

### Summary

Show reviewed canonical counts for programs, providers, relationships and lifecycle events as secondary context.

### Ecosystem master list

The left/master surface shows:

- network concentration derived from evidenced network relations
- the most shared non-network infrastructure providers

Selecting a network/provider:

- does not change the URL
- does not scroll the page
- does not switch modes
- only updates the Connection Inspector

### Connection Inspector

The right/detail surface has a stable footprint and shows:

- selected network/provider identity
- number of connected reviewed programs
- a bounded page of connected programs
- each program's other evidenced dependencies
- shared co-dependencies across the selected program set
- an explicit `Inspect in Explore` action

Large connection sets are paginated in bounded pages rather than rendered as a growing list or line field.

Overview never draws all canonical relationship edges.

## Explore

Explore preserves CCLR's node-and-edge identity but uses a bounded focus graph instead of the full-registry graph.

### Start state

Do not render a graph until a program/provider/network has been selected. Offer search plus common starting entities.

### One-hop focus graph

A focused entity renders only its direct canonical neighborhood.

For highly connected providers/networks, direct program neighbors are paginated. The graph must not place every connected program on the canvas simultaneously.

### Progressive second hop

When the focus is a provider/network, selecting one connected program may reveal that program's other evidenced provider/network dependencies. Only one connected program is expanded at a time.

This produces a bounded structure:

`selected provider/network -> visible program page -> one program's other dependencies`

rather than an accumulating all-record graph.

### Relationship evidence

Selecting an edge updates an Explore-side evidence/detail panel. It does not change routes, scroll to another section or switch modes.

Selecting a different root entity is an explicit focus change and may update the Explore route.

## History

History is an independent event surface.

- reverse chronological canonical events
- filters for launch, shutdown, provider change/migration, incident and remediation
- selecting an event updates the local event detail/evidence panel only
- `Open entity in Explore` is the explicit cross-mode action

History must not automatically recenter the graph or open Explore.

## Incidents

Incidents is an independent incident/remediation surface.

- only canonical event owners with incident/remediation events are shown
- provider-wide incidents and program-specific impact remain distinct
- adjacency never implies impact
- selecting an event updates the local detail/evidence panel only
- explicit navigation is required to inspect the related entity in Explore

## Evidence access

Every rendered relationship or event exposes supporting canonical evidence in the same mode, including source type, publisher, publication date, reliability, claim scope and source link where present.

Evidence must not require an automatic page jump.

## Search

Search is entity navigation, not AI claim generation. Selecting a result explicitly opens that entity in Explore.

Natural-language/AI search remains deferred until a separate evidence-grounding contract exists.

## Visual language

- dark field with restrained semantic neon accents
- program/provider/network roles visually distinct
- incident/remediation colors separate from lifecycle status
- dense data should be paginated or progressively disclosed instead of overplotted
- motion is functional and local; no surprise page-position changes

## Mobile

Do not shrink a desktop all-record graph into an unreadable canvas.

- Overview master/detail stacks vertically
- Explore remains focus-first and bounded
- no horizontal overflow is required to discover relations
- History and Incidents use local detail panels below their lists
- touch targets remain usable on ordinary mobile displays

## Canonical integrity rules

- derive facts only from reviewed canonical `program`, `provider`, `relation`, `event`, and `evidence`
- never copy mockup-only statuses, relations, incident dates, counts or provider roles into production data
- unknown/unresolved stays visibly unknown
- confidence is evidence confidence, never a safety score
- provider-wide facts and program-specific impact are separate visual states
- staging/monitoring data is never rendered as canonical public fact

## Non-goals

- rankings or safety scores
- rewards/APY comparison
- merchant acceptance directory
- AI-generated conclusions
- inferred provider impact
- a full-registry relationship graph as the default interactive surface
