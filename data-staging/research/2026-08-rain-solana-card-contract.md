# Research staging — Rain Solana card contract incident (2026-08)

Status: research only / not canonical

## Why this file exists

This is the first incident family used to test the registry model. It must not be promoted into canonical data until the provider/program relationships and program-specific impact states are backed by reviewable evidence.

## Currently supportable claims

### Rain provider-side

Secondary reporting attributes the following statements to Rain:

- Rain identified a vulnerability in an outdated version of a Solana card contract.
- The vulnerable version was used by a small number of programs.
- Programs using the old version were upgraded.
- Affected users were promised reimbursement.

Primary-source Rain URL still needs to be captured in the evidence package before canonical promotion.

### Avici program-side

Current reporting attributes the following to Avici:

- 1,685 users were affected.
- Reconciled affected card balances totaled $500,859.22.
- Avici said self-custodial Solana and EVM wallet funds were not affected; the affected scope was the separate Solana contract holding card balances.
- Full reimbursement was promised.

Do not conflate earlier live attacker-flow estimates with Avici's later reconciled affected-card-balance figure.

### Other programs

- Tria: reports of user drains exist, but program-specific canonical impact requires stronger source capture.
- Solayer Pay: named in early community/on-chain discussion, but canonical affected status is unresolved here.
- KAST: prior research indicates KAST publicly stated it was not affected; primary statement URL still needs to be captured before canonical promotion.

## Candidate record split

Provider candidate:

- Rain

Program candidates:

- Avici
- Tria
- Solayer Pay
- KAST

Provider events to investigate:

- `vulnerability_discovered`
- `contract_upgraded`
- `forensic_investigation`
- `reimbursement_announced`

Program events must be separate and evidence-backed:

- Avici: `unauthorized_withdrawal`, `reimbursement_announced`
- Tria: unresolved pending stronger evidence
- Solayer Pay: unresolved pending stronger evidence
- KAST: `confirmed_unaffected` only after primary-source capture

## Sources captured so far

- The Defiant, 2026-08-29: https://thedefiant.io/news/hacks/attacker-drains-more-than-usd1-million-from-avici-users-in-live-solana-neobank-attack
- TechFlow, 2026-08-29: https://www.techflowpost.com/en-US/newsletter/134042
- CryptoCard.guide incident summary: https://cryptocard.guide/news/avici-hack-rain-solana-contract

## Promotion blockers

- capture Rain primary statement URL
- capture Avici primary statement URL
- capture KAST primary unaffected statement URL
- verify Rain↔program relationships individually
- verify whether Tria and Solayer Pay were actually on the vulnerable contract version
- separate technical exploit mechanism from provider-confirmed root cause
- do not state EVM infrastructure was technically unaffected unless a primary source supports that exact claim
