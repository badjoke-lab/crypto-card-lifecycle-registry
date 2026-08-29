# Canonical record model

The v0 canonical model has five layers.

## 1. `program`

A consumer-facing crypto card program or product.

Minimum fields:

- `id`
- `slug`
- `canonical_name`
- `status`
- `summary`
- `official_url`
- `confidence`
- `last_verified_at`

Suggested status values:

- `active`
- `limited`
- `suspended`
- `migrated`
- `discontinued`
- `unknown`

## 2. `provider`

An infrastructure provider that materially supports issuance, processing, custody, collateral, settlement, or card-contract operation.

Minimum fields:

- `id`
- `slug`
- `canonical_name`
- `provider_types[]`
- `status`
- `summary`
- `official_url`
- `confidence`
- `last_verified_at`

Initial provider types may include:

- `issuer`
- `processor`
- `program_manager`
- `custody`
- `collateral_contract`
- `settlement`
- `network`
- `other`

A provider may have multiple provider types. The registry must not force legal or operational roles that are not evidenced.

## 3. `relation`

A time-bounded relationship between records.

Minimum fields:

- `id`
- `from_id`
- `to_id`
- `relation_type`
- `start_date`
- `end_date`
- `confidence`
- `evidence_ids[]`

Optional regional fields:

- `jurisdiction_scope[]` — explicit countries, regulatory regions, or card-program regions to which the relationship applies
- `scope_note` — a concise caveat when a legacy or regional relationship needs context that cannot be expressed by dates alone

Absence of `jurisdiction_scope` means the evidence supports the relationship without a narrower regional qualification. A region-specific issuer, processor, programme manager, or network relationship must not be generalized into an unscoped global relationship.

Initial relation types:

- `uses_provider`
- `issued_by`
- `processed_by`
- `uses_collateral_infrastructure`
- `uses_settlement_infrastructure`
- `uses_network`
- `replaced_by`
- `migrated_to`

## 4. `event`

A material lifecycle change or incident.

Minimum fields:

- `id`
- `entity_id`
- `event_type`
- `event_date`
- `title`
- `description`
- `impact_level`
- `confidence`
- `evidence_ids[]`

Optional regional fields:

- `jurisdiction_scope[]` — explicit countries or regions affected by the event when the event does not apply to the entity globally

Initial event types:

- `launched`
- `provider_changed`
- `infrastructure_changed`
- `vulnerability_discovered`
- `exploit`
- `unauthorized_withdrawal`
- `card_service_limited`
- `card_service_suspended`
- `contract_upgraded`
- `migration`
- `reimbursement_announced`
- `reimbursement_completed`
- `forensic_investigation`
- `regulatory_action`
- `shutdown_announced`
- `shutdown_effective`
- `confirmed_unaffected`
- `other`

## 5. `evidence`

Evidence backs claims in entity, relation, and event records.

Minimum fields:

- `id`
- `subject_ids[]`
- `source_type`
- `title`
- `url`
- `publisher`
- `published_at`
- `accessed_at`
- `reliability`
- `claim_scope`

Initial source types:

- `official_statement`
- `official_social`
- `official_documentation`
- `regulatory_document`
- `onchain_analysis`
- `news_article`
- `archive_capture`
- `other`

Reliability values:

- `high`
- `medium`
- `low`

## Incident modeling rule

Provider-wide facts and program-specific impact must be separated.

For example, a provider may disclose that an old contract version was vulnerable. That does not justify marking every program as affected. Each program needs its own evidence-backed impact state. `confirmed_unaffected` is an explicit event and must not be inferred from silence.
