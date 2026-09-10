# MoneyGram Card — research candidate

Status: research staging / not canonical  
Reviewed: 2026-09-11  
Candidate program: `MoneyGram Card`  
Likely status: `active`  
Likely network: `Visa`  
Likely launch market: `Colombia`  
Canonical promotion: HOLD pending durable first-party card-specific source URL and provider-role confirmation

## Why this is CCLR-relevant

MoneyGram announced a stablecoin-backed card integrated into the MoneyGram app. The operator-supplied MoneyGram announcement states that the card:

- is built into the MoneyGram app;
- spends a stable-dollar balance at online and physical merchants where Visa is accepted;
- can be added to Apple Pay or Google Wallet;
- exposes card activity plus freeze/unfreeze controls in the MoneyGram app;
- is intended to turn the app's stable-dollar balance into everyday spending power.

This is a direct crypto/stablecoin card-program candidate and is in scope for CCLR.

## Current external corroboration

### Launch reporting

Coindoo published `MoneyGram Adds Visa Spending to Stablecoin Remittances` on 2026-09-10 and describes the product as MoneyGram's first stablecoin-backed Visa card for users in Colombia.

Source:
- https://coindoo.com/moneygram-adds-visa-spending-stablecoin-remittances/

Treatment: secondary corroboration only. Do not use it alone to settle issuer or processor relationships.

### Existing MoneyGram Colombia stablecoin balance

MoneyGram and Stellar previously documented that the MoneyGram app's stablecoin balance first launched in Colombia using Stellar, Crossmint and Circle's USDC. The official partnership release describes a USD-denominated balance that customers can hold and cash out at MoneyGram locations.

Source:
- https://stellar.org/press/moneygram-and-stellar-extend-partnership-to-scale-real-world-stablecoin-utility-globally

This supports the lineage of the Colombia stable-dollar balance. It does **not** prove that every MoneyGram Card transaction or future card market is funded or settled in USDC.

### MGUSD background

MoneyGram launched MGUSD in June 2026 and described it as a native U.S. dollar stablecoin intended to support a growing suite of financial services across MoneyGram's network.

Source:
- https://corporate.moneygram.com/news

Do **not** infer from this that the MoneyGram Card is MGUSD-backed. The reviewed card announcement says `stablecoin-backed` / `stable-dollar balance` but does not identify MGUSD as the card funding asset.

## Existing provider reuse candidates

CCLR already has a canonical Visa provider. If a durable first-party card-specific source confirms the Visa relation for this exact stablecoin-backed MoneyGram Card, reuse the existing Visa provider rather than creating a duplicate.

Secondary reporting and community discussion attribute the card infrastructure to Rain. That is not enough for a high-confidence `issued_by`, `program_managed_by`, or `processed_by` relation. Do not add a Rain relation until MoneyGram, Rain, card terms, or another direct first-party source confirms the role.

## Proposed canonical program shape after source closure

```json
{
  "id": "ccr_program_000067",
  "slug": "moneygram-card",
  "canonical_name": "MoneyGram Card",
  "status": "active",
  "summary": "Stablecoin-backed Visa card integrated with the MoneyGram app for spending a supported stable-dollar balance at Visa merchants, with Apple Pay / Google Wallet support and in-app card controls. The exact stablecoin funding asset and regulated card-infrastructure roles remain source-dependent by market.",
  "official_url": "<durable first-party MoneyGram card URL>",
  "confidence": "high",
  "last_verified_at": "2026-09-11"
}
```

The ID above is a reservation proposal only and must be rechecked against current `main` immediately before promotion.

## Proposed relations after source closure

1. MoneyGram Card -> Visa / `uses_network`
   - confidence: high only after first-party card-specific evidence
   - likely jurisdiction scope: Colombia for the initial generation

2. MoneyGram Card -> Rain
   - relation type: **unresolved**
   - do not choose `issued_by`, `program_managed_by`, or another provider role from secondary reporting alone

3. MoneyGram Card -> issuer
   - unresolved
   - do not infer Pathward from MoneyGram's separate U.S. MoneyGram Account debit-card help material; that may represent a different card/account generation and jurisdiction.

## Event candidate

Potential launch event:

- event type: `launched`
- event date: `2026-09-10` only if a dated first-party announcement or legal/product page supports that date
- jurisdiction scope: `Colombia` if confirmed first-party
- title: `MoneyGram launches stablecoin-backed Visa card`

Do not canonicalize the date from secondary coverage alone if a direct launch announcement can still be captured.

## Promotion checklist

- [ ] capture durable MoneyGram card-specific announcement or product URL
- [ ] confirm initial jurisdiction directly
- [ ] confirm Visa relation directly for this product generation
- [ ] identify regulated issuer / program manager / processor from card terms or first-party disclosure
- [ ] determine whether the card balance is USDC, MGUSD, multi-asset, or market-dependent
- [ ] check whether Rain is explicitly named and in what role
- [ ] recheck next unused program / relation / event / evidence IDs
- [ ] promote with at least two evidence records where possible

## Current decision

`CCLR candidate = YES`  
`Canonical program now = HOLD`  
`Reason = card existence and product function are strong, but the durable first-party card-specific source and provider-role chain are not yet complete enough for the repository's current high-confidence canonical standard.`
