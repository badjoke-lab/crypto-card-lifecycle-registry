# Phase 3 batch 013 review — Plasma One, Jupiter Card, Slash Global Card

Date: 2026-09-01

## Candidate set

- Plasma One
- Jupiter Card
- Slash Global Card

## Accepted

### Plasma One

Plasma's current first-party product page identifies Plasma One as a stablecoin card issued by Rain, a Visa Principal Member, pursuant to a Visa licence. Plasma also identifies Bridge-powered global account services with different Bridge legal entities by region. This batch promotes the directly evidenced Rain issuer and Visa network relationships. The Bridge service layer is documented in evidence and review notes but is not flattened into a single unscoped provider relation because the disclosed legal entity varies by jurisdiction and the exact provider-role classification is broader than card issuance.

Plasma's 2025-09-22 first-party announcement is recorded as the product launch/announcement milestone.

### Jupiter Card

Jupiter's official documentation identifies the Jupiter Card as a Visa debit card funded from deposited USDC and explicitly states that cards are issued by Rain or DCS depending on the user's country of residence. Both issuer relationships are therefore canonical, with scope notes preserving the mutually exclusive country-dependent assignment. No claim is made that one user receives cards from both issuers.

Jupiter's documentation also separates Spend balances handled by regulated financial partners from the user's DeFi wallet funds. No unsupported custody role is assigned to Jupiter itself.

### Slash Global Card

Slash's 2026-05-12 first-party launch announcement identifies the Global Card as a stablecoin-funded Visa card issued by Rain. Current Slash product documentation confirms Rain converts the stablecoin-backed balance into USD for Visa purchases.

This record is intentionally separate from the regular Slash Visa Platinum charge card, which is issued by Column N.A. and funded from a U.S. business checking account rather than the crypto/stablecoin Global USD stack. Only the Global Card is promoted in this batch.

## Boundary decisions

- no UI changes
- no Bridge legal entity is collapsed into an unscoped global provider relation for Plasma One
- Jupiter's Rain and DCS issuer relations represent country-dependent alternatives, not simultaneous issuance to one cardholder
- no exact Jupiter global launch date is invented from documentation that does not establish one
- Slash Global Card is distinct from the non-crypto Slash Visa Platinum charge card
- rewards/cashback are not canonicalized

## Expected totals

After promotion:
- 39 programs
- 43 providers
- 93 relations
- 45 events
- 80 evidence records
