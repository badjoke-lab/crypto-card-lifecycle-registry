# Scope

## Purpose

Crypto Card Lifecycle Registry is a historical registry of crypto card programs and their underlying card/payment infrastructure.

The registry exists to answer questions such as:

- What card program existed, when, and in what state?
- Which infrastructure providers did it depend on?
- Did issuer, processor, collateral, custody, settlement, or contract dependencies change?
- What material incidents occurred?
- Which users/programs were confirmed affected, unaffected, or unresolved?
- What remediation, migration, reimbursement, or shutdown followed?

## In scope

- consumer crypto card programs
- card-issuing/payment infrastructure providers used by those programs
- custody/collateral/settlement infrastructure when material to the card lifecycle
- provider-program relationships
- material security, operational, regulatory, migration, reimbursement, suspension, and shutdown events
- evidence supporting those claims

## Out of scope by default

- merchant acceptance directories
- exchanges merely because they offer trading
- wallets merely because they hold crypto
- stablecoins merely because they are used as card collateral or settlement assets
- card rankings, rewards rankings, APY comparisons, or investment recommendations
- ordinary merchant-side Visa/Mastercard acceptance records

Cross-registry duplication is allowed only when an incident changes the lifecycle/state of an entity that another registry actually covers.

## Core boundary

The card program and the infrastructure provider are different entities. A provider-side incident does not automatically mean every program using that provider was affected.
