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

const programStatuses = new Set(['active', 'limited', 'suspended', 'migrated', 'discontinued', 'unknown']);
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

for (const record of programs) {
  required(record, ['slug', 'canonical_name', 'status', 'summary', 'official_url', 'confidence', 'last_verified_at'], 'program');
  if (!programStatuses.has(record.status)) throw new Error(`invalid program status: ${record.status}`);
  if (!confidenceValues.has(record.confidence)) throw new Error(`invalid program confidence: ${record.confidence}`);
}

for (const record of providers) {
  required(record, ['slug', 'canonical_name', 'provider_types', 'status', 'summary', 'official_url', 'confidence', 'last_verified_at'], 'provider');
  if (!Array.isArray(record.provider_types) || record.provider_types.length === 0) throw new Error(`provider ${record.id} needs provider_types`);
  for (const type of record.provider_types) if (!providerTypes.has(type)) throw new Error(`invalid provider type: ${type}`);
  if (!confidenceValues.has(record.confidence)) throw new Error(`invalid provider confidence: ${record.confidence}`);
}

for (const record of evidence) {
  required(record, ['subject_ids', 'source_type', 'title', 'url', 'publisher', 'published_at', 'accessed_at', 'reliability', 'claim_scope'], 'evidence');
  if (!Array.isArray(record.subject_ids) || record.subject_ids.length === 0) throw new Error(`evidence ${record.id} needs subject_ids`);
  if (!sourceTypes.has(record.source_type)) throw new Error(`invalid evidence source_type: ${record.source_type}`);
  if (!reliabilityValues.has(record.reliability)) throw new Error(`invalid evidence reliability: ${record.reliability}`);
}

for (const record of relations) {
  required(record, ['from_id', 'to_id', 'relation_type', 'start_date', 'end_date', 'confidence', 'evidence_ids'], 'relation');
  if (!entityIds.has(record.from_id) || !entityIds.has(record.to_id)) throw new Error(`relation ${record.id} references unknown entity`);
  if (!relationTypes.has(record.relation_type)) throw new Error(`invalid relation_type: ${record.relation_type}`);
  if (!confidenceValues.has(record.confidence)) throw new Error(`invalid relation confidence: ${record.confidence}`);
  for (const evidenceId of record.evidence_ids) if (!evidenceIds.has(evidenceId)) throw new Error(`relation ${record.id} references unknown evidence ${evidenceId}`);
}

for (const record of events) {
  required(record, ['entity_id', 'event_type', 'event_date', 'title', 'description', 'impact_level', 'confidence', 'evidence_ids'], 'event');
  if (!entityIds.has(record.entity_id)) throw new Error(`event ${record.id} references unknown entity ${record.entity_id}`);
  if (!eventTypes.has(record.event_type)) throw new Error(`invalid event_type: ${record.event_type}`);
  if (!impacts.has(record.impact_level)) throw new Error(`invalid impact_level: ${record.impact_level}`);
  if (!confidenceValues.has(record.confidence)) throw new Error(`invalid event confidence: ${record.confidence}`);
  if (!Array.isArray(record.evidence_ids) || record.evidence_ids.length === 0) throw new Error(`event ${record.id} requires evidence`);
  for (const evidenceId of record.evidence_ids) if (!evidenceIds.has(evidenceId)) throw new Error(`event ${record.id} references unknown evidence ${evidenceId}`);
}

for (const record of evidence) {
  for (const subjectId of record.subject_ids) if (!entityIds.has(subjectId)) throw new Error(`evidence ${record.id} references unknown subject ${subjectId}`);
}

console.log(`Validated ${programs.length} programs, ${providers.length} providers, ${relations.length} relations, ${events.length} events, and ${evidence.length} evidence records.`);
