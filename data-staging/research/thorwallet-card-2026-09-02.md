# THORWallet Card — 2026-09-02 research note

## Inclusion decision

THORWallet Card is in scope for Crypto Card Lifecycle Registry as a live crypto-linked Mastercard spending program integrated with the THORWallet self-custody wallet.

The new Basic/Premium offering must be modeled separately from THORWallet's existing Swiss IBAN card program. THORWallet's first-party card page explicitly describes Basic/Premium as an offering additional to the existing Swiss IBAN card program.

## Proposed canonical program

- proposed id: `ccr_program_000043`
- slug: `thorwallet-card`
- canonical name: `THORWallet Card`
- status: `active`
- official URL: `https://www.thorwallet.org/`
- confidence: `high`
- summary: self-custody-connected Mastercard card program with Basic virtual and Premium physical/virtual tiers; current first-party material advertises broad international availability.
- launch chronology: THORWallet's current homepage lists `31 Aug 2026 — Swap Anything, Spend Anywhere: The THORWallet Card Is Live`.

## Confirmed first-party facts

1. THORWallet describes itself as self-custody/non-custodial and says wallet funds remain under user control.
2. The current homepage advertises spending anywhere Mastercard is accepted and currently displays `175+ countries`, including the US.
3. Basic is virtual; Premium is physical + virtual and advertises 0.5% USDC cashback.
4. The separate THORWallet Card page currently says Basic/Premium will be available in `174+ countries and territories`.
5. The current first-party surfaces therefore disagree on the exact global country count. Do not reduce this to one undated canonical count.
6. The card page explicitly says the Basic/Premium offering is additional to the existing Swiss IBAN card program.

## Network relation

Mastercard is directly established by first-party THORWallet material. The existing registry provider `ccr_provider_000005` (Mastercard) should be linked as network once the canonical batch is promoted.

## Provider / issuer boundary

Do **not** automatically map Fiat24 to the new Basic/Premium program. Fiat24 is clearly tied to THORWallet's older/current Swiss IBAN account/card generation, while THORWallet itself distinguishes the new Basic/Premium program from that offering.

Earlier 2026 promotional material referenced Unblock in connection with non-custodial Mastercard access, but issuer/program-manager attribution for the new Basic/Premium generation requires current first-party/legal/cardholder terms before canonical relation assignment.

Until that is resolved, the canonical program can be added with the Mastercard network relation and issuer/program-manager left unresolved rather than inferred.

## Evidence priority

Primary:
- https://www.thorwallet.org/
- https://whitelist.thorwallet.org/

Supporting promotional coverage may be retained only as supplemental evidence; it must not override contradictory/current first-party availability wording.

## Cross-registry boundary

- CCLR: card program itself.
- WLR: THORWallet entity/product plus card-launch capability event.
- HEI: no canonical addition; wallet-integrated routing/swaps do not by themselves establish THORWallet as an exchange venue.
