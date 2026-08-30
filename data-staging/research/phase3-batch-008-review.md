# Phase 3 batch 008 review — Coinbase card lineage and Cryptopay provider failure

Date: 2026-08-30

## Candidate set

- initial Coinbase debit card / Shift card generation (2015)
- Coinbase Card UK/EU generation launched in 2019, including historical Paysafe issuance
- Cryptopay Card, including the 2023 PayrNet disruption and current DiPocket-issued replacement programme

## Accepted

### Initial Coinbase debit card / Shift generation

Coinbase's own retrospective states that its initial Coinbase Debit Card was introduced in November 2015, let customers spend Coinbase bitcoin balances wherever Visa was accepted, and was issued through payment processor Shift. The same retrospective states that Shift pivoted and rebranded to Apto in 2019 while Coinbase implemented a new debit card for the UK.

This is modeled as a separate discontinued historical program rather than silently folding it into the later Coinbase Card generation.

### Coinbase Card historical UK/EU infrastructure

Coinbase's 2019 launch announcement identifies the new Coinbase Card as a Visa debit card launched in the UK on 2019-04-10 and issued by Paysafe Financial Services Limited. Coinbase's 2019-06-11 Europe-expansion announcement says the same card expanded to Spain, Germany, France, Italy, Ireland and the Netherlands and again identifies Paysafe as issuer.

Existing Pathward/Marqeta relations are narrowed to the United States rather than being displayed as globally applicable.

### Cryptopay Card

Cryptopay states that in June 2023 its former partner UAB PayrNet lost its EMI licence and stopped providing payment services, causing Cryptopay EUR card operations to be discontinued for EEA/UK clients. The Bank of Lithuania independently fixes the licence-revocation date at 2023-06-22.

Current Cryptopay card terms dated 2025-03-17 identify DiPocket UAB as issuer, CPS Europe S.A. as programme manager, and Visa as card scheme/principal network. Cryptopay's current help centre says card ordering is available to EU residents.

## Boundary decisions

- no UI changes
- no exact 2015 Shift launch day is invented; Coinbase only provides month-level precision in the reviewed retrospective
- no exact Shift-card shutdown day is invented
- the PayrNet licence revocation is recorded as a dated regulatory/infrastructure event; the old-card relationship is closed on that date because PayrNet could no longer provide financial services and Cryptopay ties the card discontinuation to the revocation
- current Cryptopay relations use the 2025 terms as an evidence milestone; the terms date is not presented as proof that every replacement card first became operational that day
- the current Coinbase U.S. Pathward/Marqeta/Visa relationships remain canonical but are region-scoped

## Expected totals

After promotion:
- 24 programs
- 33 providers
- 59 relations
- 29 events
- 50 evidence records
