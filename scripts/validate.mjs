import { readFile } from 'node:fs/promises';

const readArray = async (path) => {
  const raw = await readFile(path, 'utf8');
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) throw new Error(`${path} must contain a top-level JSON array`);
  return parsed;
};

const programs = await readArray('data/programs.json');
const providers = await readArray('data/providers.json');
const relations = await readArray('data/relations.json');
const events = await readArray('data/events.json');
const evidence = await readArray('data/evidence.json');

const required = (record, fields, label) => {
  for (const field of fields) {
    if (!(field in record)) throw new Error(`${label} ${record.id ?? '<no-id>'} missing ${field}`);
  }
};

const uniqueIds = (records, label) => {
  const seen = new Set();
  for (const record of records) {
    if (!record.id) throw new Error(`${label} record missing id`);
    if (seen.has(record.id)) throw new Error(`duplicate ${label} id: ${record.id}`);
    seen.add(record.id);
  }
  return seen;
};

const assertArray = (value, label, { nonEmpty = false } = {}) => {
  if (!Array.isArray(value)) throw new Error(`${label} must be an array`);
  if (nonEmpty && value.length === 0) throw new Error(`${label} must not be empty`);
};

const assertStringArray = (value, label) => {
  assertArray(value, label, { nonEmpty: true });
  if (value.some((item) => typeof item !== 'string' || !item.trim())) throw new Error(`${label} must contain non-empty strings`);
};

const assertHttpUrl = (value, label) => {
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error(`${label} must be a valid URL`);
  }
  if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error(`${label} must use http/https`);
};

const assertDate = (value, label, { nullable = false } = {}) => {
  if (nullable && value === null) return;
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(`${value}T00:00:00Z`))) {
    throw new Error(`${label} must be YYYY-MM-DD${nullable ? ' or null' : ''}`);
  }
};

const programStatuses = new Set(['active', 'limited', 'suspended', 'migrated', 'discontinued', 'unknown']);
const providerStatuses = new Set(['active', 'limited', 'suspended', 'migrated', 'discontinued', 'unknown']);
const providerTypes = new Set(['issuer', 'processor', 'program_manager', 'custody', 'collateral_contract', 'settlement', 'network', 'other']);
const relationTypes = new Set(['uses_provider', 'issued_by', 'processed_by', 'uses_collateral_infrastructure', 'uses_settlement_infrastructure', 'uses_network', 'replaced_by', 'migrated_to']);
const eventTypes = new Set(['launched', 'provider_changed', 'infrastructure_changed', 'vulnerability_discovered', 'exploit', 'unauthorized_withdrawal', 'card_service_limited', 'card_service_suspended', 'contract_upgraded', 'migration', 'reimbursement_announced', 'reimbursement_completed', 'forensic_investigation', 'regulatory_action', 'shutdown_announced', 'shutdown_effective', 'confirmed_unaffected', 'other']);
const impacts = new Set(['low', 'medium', 'high', 'critical']);
const confidenceValues = new Set(['low', 'medium', 'high']);
const sourceTypes = new Set(['official_statement', 'official_social', 'official_documentation', 'regulatory_document', 'onchain_analysis', 'news_article', 'archive_capture', 'other']);
const reliabilityValues = new Set(['low', 'medium', 'high']);

const programIds = uniqueIds(programs, 'program');
const providerIds = uniqueIds(providers, 'provider');
const entityIds = new Set([...programIds, ...providerIds]);
const evidenceIds = uniqueIds(evidence, 'evidence');
uniqueIds(relations, 'relation');
uniqueIds(events, 'event');

const evidenceById = new Map(evidence.map((record) => [record.id, record]));

for (const record of programs) {
  required(record, ['slug', 'canonical_name', 'status', 'summary', 'official_url', 'confidence', 'last_verified_at'], 'program');
  if (!programStatuses.has(record.status)) throw new Error(`invalid program status: ${record.status}`);
  if (!confidenceValues.has(record.confidence)) throw new Error(`invalid program confidence: ${record.confidence}`);
  assertHttpUrl(record.official_url, `program ${record.id} official_url`);
  assertDate(record.last_verified_at, `program ${record.id} last_verified_at`);
}

for (const record of providers) {
  required(record, ['slug', 'canonical_name', 'provider_types', 'status', 'summary', 'official_url', 'confidence', 'last_verified_at'], 'provider');
  assertArray(record.provider_types, `provider ${record.id} provider_types`, { nonEmpty: true });
  for (const type of record.provider_types) if (!providerTypes.has(type)) throw new Error(`invalid provider type: ${type}`);
  if (!providerStatuses.has(record.status)) throw new Error(`invalid provider status: ${record.status}`);
  if (!confidenceValues.has(record.confidence)) throw new Error(`invalid provider confidence: ${record.confidence}`);
  assertHttpUrl(record.official_url, `provider ${record.id} official_url`);
  assertDate(record.last_verified_at, `provider ${record.id} last_verified_at`);
}

for (const record of evidence) {
  required(record, ['subject_ids', 'source_type', 'title', 'url', 'publisher', 'published_at', 'accessed_at', 'reliability', 'claim_scope'], 'evidence');
  assertArray(record.subject_ids, `evidence ${record.id} subject_ids`, { nonEmpty: true });
  if (!sourceTypes.has(record.source_type)) throw new Error(`invalid evidence source_type: ${record.source_type}`);
  if (!reliabilityValues.has(record.reliability)) throw new Error(`invalid evidence reliability: ${record.reliability}`);
  assertHttpUrl(record.url, `evidence ${record.id} url`);
  assertDate(record.published_at, `evidence ${record.id} published_at`, { nullable: true });
  assertDate(record.accessed_at, `evidence ${record.id} accessed_at`);
  for (const subjectId of record.subject_ids) if (!entityIds.has(subjectId)) throw new Error(`evidence ${record.id} references unknown subject ${subjectId}`);
}

for (const record of relations) {
  required(record, ['from_id', 'to_id', 'relation_type', 'start_date', 'end_date', 'confidence', 'evidence_ids'], 'relation');
  if (!entityIds.has(record.from_id) || !entityIds.has(record.to_id)) throw new Error(`relation ${record.id} references unknown entity`);
  if (record.from_id === record.to_id) throw new Error(`relation ${record.id} cannot self-reference`);
  if (!relationTypes.has(record.relation_type)) throw new Error(`invalid relation_type: ${record.relation_type}`);
  if (!confidenceValues.has(record.confidence)) throw new Error(`invalid relation confidence: ${record.confidence}`);
  assertDate(record.start_date, `relation ${record.id} start_date`, { nullable: true });
  assertDate(record.end_date, `relation ${record.id} end_date`, { nullable: true });
  if ('jurisdiction_scope' in record) assertStringArray(record.jurisdiction_scope, `relation ${record.id} jurisdiction_scope`);
  if ('scope_note' in record && (typeof record.scope_note !== 'string' || !record.scope_note.trim())) throw new Error(`relation ${record.id} scope_note must be a non-empty string`);
  assertArray(record.evidence_ids, `relation ${record.id} evidence_ids`, { nonEmpty: true });
  for (const evidenceId of record.evidence_ids) {
    if (!evidenceIds.has(evidenceId)) throw new Error(`relation ${record.id} references unknown evidence ${evidenceId}`);
    const subjects = new Set(evidenceById.get(evidenceId).subject_ids);
    if (!subjects.has(record.from_id) || !subjects.has(record.to_id)) {
      throw new Error(`relation ${record.id} evidence ${evidenceId} must name both relation endpoints`);
    }
  }
}

for (const record of events) {
  required(record, ['entity_id', 'event_type', 'event_date', 'title', 'description', 'impact_level', 'confidence', 'evidence_ids'], 'event');
  if (!entityIds.has(record.entity_id)) throw new Error(`event ${record.id} references unknown entity ${record.entity_id}`);
  if (!eventTypes.has(record.event_type)) throw new Error(`invalid event_type: ${record.event_type}`);
  if (!impacts.has(record.impact_level)) throw new Error(`invalid impact_level: ${record.impact_level}`);
  if (!confidenceValues.has(record.confidence)) throw new Error(`invalid event confidence: ${record.confidence}`);
  assertDate(record.event_date, `event ${record.id} event_date`);
  if ('jurisdiction_scope' in record) assertStringArray(record.jurisdiction_scope, `event ${record.id} jurisdiction_scope`);
  assertArray(record.evidence_ids, `event ${record.id} evidence_ids`, { nonEmpty: true });
  for (const evidenceId of record.evidence_ids) {
    if (!evidenceIds.has(evidenceId)) throw new Error(`event ${record.id} references unknown evidence ${evidenceId}`);
    const subjects = new Set(evidenceById.get(evidenceId).subject_ids);
    if (!subjects.has(record.entity_id)) {
      throw new Error(`event ${record.id} evidence ${evidenceId} must name event entity ${record.entity_id}`);
    }
  }
}

console.log(`Validated ${programs.length} programs, ${providers.length} providers, ${relations.length} relations, ${events.length} events, and ${evidence.length} evidence records.`);
