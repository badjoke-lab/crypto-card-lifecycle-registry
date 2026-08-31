# Phase 3 batch 011 review — RedotPay, SafePal and Ready

Date: 2026-08-31

## Candidate set

- RedotPay Card
- SafePal Banking Card / Fiat Gateway card
- Ready Card
- KuCard (researched, not promoted in this bounded batch because the reviewed first-party search did not yet establish a clean issuer relationship)
- Oobit Card (researched, deferred because the current card terms identify an unnamed issuer rather than a stable named issuer record)

## Accepted

### RedotPay Card

RedotPay's current card terms explicitly state that the service contains multiple card programmes, including a Hong Kong Visa programme and a Singapore Visa programme. A RedotPay announcement dated 2025-02-10 identifies Visa and StraitsX for the Singapore programme, with StraitsX described as BIN sponsor. The registry therefore keeps RedotPay as one consumer-facing card program while scoping the StraitsX infrastructure relation to Singapore and not inventing a Hong Kong issuer/BIN sponsor.

### SafePal Banking Card

SafePal launched its in-app Fiat Gateway with Fiat24 in March 2024 and described a linked virtual crypto Visa card at launch. Current SafePal Banking Gateway material describes virtual Master debit cards, and SafePal's 2026-01-01 announcement explicitly presents SafePal Mastercard card designs while again identifying Fiat24 as the gateway provider. The exact operational Visa-to-Mastercard cutover date is not established by the reviewed sources, so the current Mastercard relation is recorded without fabricating a start date, while lifecycle history preserves the earlier Visa launch and the 2026 Mastercard evidence milestone.

### Ready Card

Ready's first-party support material describes Ready Card as a self-custody crypto debit card spending USDC wherever Mastercard is accepted. Its privacy/security FAQ identifies Kulipa as the regulated card issuer handling KYC/compliance. Ready's 2025 rebrand FAQ states that Argent became Ready and identifies Ready as the product formerly known as Argent Mobile / Argent Card. The rebrand is preserved as lifecycle context rather than inventing a separate shutdown.

## Boundary decisions

- no UI changes
- no issuer role is assigned to StraitsX; the source calls it BIN sponsor, so it is represented as `other` infrastructure and connected with `uses_provider`
- no Hong Kong RedotPay issuer/BIN sponsor is inferred
- SafePal's 2024 Visa launch and current Mastercard generation are both preserved, but no exact network cutover day is invented
- Ready remains a self-custody card program even though Kulipa performs card-issuer/KYC functions; custody of the user's wallet assets is not attributed to Kulipa
- no rewards/rankings are added

## Expected totals

After promotion:
- 33 programs
- 40 providers
- 78 relations
- 40 events
- 68 evidence records
