# Bybit Card jurisdiction-scope review — 2026-08-29

## Decision

Bybit Card is accepted for canonical publication. The earlier batch-003 defer is superseded by a schema extension that preserves regional issuer, programme-manager, network, and migration differences instead of flattening them into one global relationship.

## Canonical programme

- Bybit Card is represented as one consumer-facing programme record where the common Bybit product identity is supported.
- Region-specific infrastructure is represented on relations with `jurisdiction_scope[]` and, where useful, `scope_note`.
- A scoped relation must not be read as applying to regions outside its declared scope.

## Accepted current network scope

Bybit's current general Card FAQ documents region-dependent card variants. The canonical record therefore keeps Mastercard and Visa as separate scoped relationships rather than asserting a single global network.

- Mastercard scope captured from the reviewed FAQ: Argentina, AIFC, Georgia, Kazakhstan, Australia, Mexico.
- Visa scope captured from the reviewed FAQ: Brazil, Peru, Asia Pacific.

## Accepted legacy EEA / CH / UK infrastructure

Reviewed legacy Bybit Card terms identify:

- UAB Onlychain Fintech Limited — programme manager for the legacy EEA/CH programme;
- Harmoniie SAS — issuer for EEA countries;
- Moorwand Ltd — issuer for the United Kingdom;
- Mastercard — network in the reviewed legacy terms.

These relationships are explicitly jurisdiction-scoped and are not generalized to every Bybit Card region.

## EEA / Switzerland transition

Bybit's official transition FAQ states that EEA residents using the legacy Bybit.com Card were directed to apply for the separate Bybit EU Card programme and recommends completing the transition by 2025-12-31 to avoid interruption.

The canonical event records the regional transition deadline as a `migration` event. It does **not** assert that every cardholder completed migration.

## Product boundary

Bybit EU Card remains a distinct programme for future review. It is not silently merged into the legacy/global Bybit Card record merely because the EEA transition points users toward it.

## Review outcome

Accepted:
- Bybit Card programme record;
- regional Mastercard/Visa relations;
- legacy EEA/CH programme-manager relation;
- legacy EEA issuer relation;
- legacy UK issuer relation;
- EEA/CH transition event;
- schema/validator/UI support for jurisdiction-scoped facts.

Rejected modeling approaches:
- one global issuer relation;
- one global network relation;
- treating a recommended migration deadline as proof of completed migration;
- treating Bybit EU Card as identical to the legacy Bybit.com EEA programme.
