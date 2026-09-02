import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def append_record(path: str, record: dict) -> None:
    p = ROOT / path
    text = p.read_text()
    data = json.loads(text)
    rid = record["id"]
    if any(item.get("id") == rid for item in data):
        return
    idx = text.rfind("\n]")
    if idx < 0:
        raise RuntimeError(f"array terminator not found: {path}")
    prefix = text[:idx].rstrip()
    if not prefix.endswith("["):
        prefix += ","
    rendered = json.dumps(record, ensure_ascii=False, separators=(",", ":"))
    p.write_text(prefix + "\n  " + rendered + "\n]\n")

append_record("data/programs.json", {
    "id":"ccr_program_000043",
    "slug":"thorwallet-card",
    "canonical_name":"THORWallet Card",
    "status":"active",
    "summary":"Self-custody-connected Mastercard card program integrated with THORWallet, with Basic virtual and Premium physical/virtual tiers. The Basic/Premium generation is distinct from THORWallet's existing Swiss IBAN card offering; current first-party surfaces disagree on the exact global country count, so no single undated count is canonicalized.",
    "official_url":"https://www.thorwallet.org/",
    "confidence":"high",
    "last_verified_at":"2026-09-02"
})

append_record("data/evidence.json", {
    "id":"ccr_evidence_000086",
    "subject_ids":["ccr_program_000043","ccr_provider_000005"],
    "source_type":"official_documentation",
    "title":"THORWallet card tiers and Mastercard spending",
    "url":"https://www.thorwallet.org/",
    "publisher":"THORWallet / EMM Ventures AG",
    "published_at":None,
    "accessed_at":"2026-09-02",
    "reliability":"high",
    "claim_scope":"THORWallet Card identity, Basic and Premium tiers, Mastercard network relationship, self-custody-connected spending model and current broad international availability wording"
})
append_record("data/evidence.json", {
    "id":"ccr_evidence_000087",
    "subject_ids":["ccr_program_000043"],
    "source_type":"official_documentation",
    "title":"THORWallet Card waitlist distinguishes Basic/Premium from Swiss IBAN card",
    "url":"https://whitelist.thorwallet.org/",
    "publisher":"THORWallet",
    "published_at":None,
    "accessed_at":"2026-09-02",
    "reliability":"high",
    "claim_scope":"Basic/Premium card tiers, physical-card availability, broad international scope and explicit distinction from the existing Swiss IBAN card program"
})

append_record("data/relations.json", {
    "id":"ccr_relation_000101",
    "from_id":"ccr_program_000043",
    "to_id":"ccr_provider_000005",
    "relation_type":"uses_network",
    "start_date":"2026-08-31",
    "end_date":None,
    "scope_note":"THORWallet's current first-party material identifies Mastercard acceptance for the Basic/Premium card generation. No issuer or program-manager relation is inferred because current first-party/legal evidence reviewed here does not establish that role.",
    "confidence":"high",
    "evidence_ids":["ccr_evidence_000086"]
})

append_record("data/events.json", {
    "id":"ccr_event_000049",
    "entity_id":"ccr_program_000043",
    "event_type":"launched",
    "event_date":"2026-08-31",
    "title":"THORWallet Card goes live",
    "description":"THORWallet's current first-party homepage lists a 2026-08-31 card-live announcement for its Basic/Premium Mastercard offering. The new generation is kept distinct from the existing Swiss IBAN card program, and the exact issuer/program-manager role remains unresolved rather than inferred.",
    "impact_level":"low",
    "confidence":"high",
    "evidence_ids":["ccr_evidence_000086","ccr_evidence_000087"]
})

for path in ["data/programs.json","data/evidence.json","data/relations.json","data/events.json"]:
    json.loads((ROOT / path).read_text())

print("THORWallet Card canonical promotion prepared")
