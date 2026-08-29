const publicLabels = new Map([
  ['uses_provider', 'infrastructure'],
  ['issued_by', 'issued by'],
  ['processed_by', 'processed by'],
  ['uses_network', 'card network'],
  ['settled_by', 'settled by'],
  ['custodied_by', 'custody by'],
  ['program_manager', 'program manager'],
  ['collateral_contract', 'collateral contract'],
  ['vulnerability_discovered', 'vulnerability discovered'],
  ['unauthorized_withdrawal', 'unauthorized withdrawal'],
  ['card_service_limited', 'card service limited'],
  ['card_service_suspended', 'card service suspended'],
  ['contract_upgraded', 'contract upgraded'],
  ['reimbursement_announced', 'reimbursement announced'],
  ['reimbursement_completed', 'reimbursement completed'],
  ['forensic_investigation', 'forensic investigation'],
  ['regulatory_action', 'regulatory action'],
  ['confirmed_unaffected', 'confirmed unaffected'],
  ['shutdown_announced', 'shutdown announced'],
  ['shutdown_effective', 'shutdown effective'],
  ['provider_changed', 'provider changed'],
  ['custody_model_changed', 'custody model changed'],
  ['official_documentation', 'official documentation'],
  ['official_statement', 'official statement'],
  ['official_social', 'official social'],
  ['onchain_transaction', 'on-chain transaction'],
  ['independent_forensics', 'independent forensics']
]);

const escapeRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const labelPatterns = [...publicLabels].map(([raw, label]) => [new RegExp(`\\b${escapeRegExp(raw)}\\b`, 'g'), label]);

function humanizeValue(value) {
  let next = String(value ?? '');
  for (const [pattern, label] of labelPatterns) next = next.replace(pattern, label);
  return next;
}

function humanizePublicText() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    const next = humanizeValue(node.nodeValue);
    if (next !== node.nodeValue) node.nodeValue = next;
  }

  document.querySelectorAll('[aria-label],[title]').forEach(element => {
    for (const attr of ['aria-label', 'title']) {
      if (!element.hasAttribute(attr)) continue;
      const current = element.getAttribute(attr);
      const next = humanizeValue(current);
      if (next !== current) element.setAttribute(attr, next);
    }
  });
}

const graph = document.querySelector('#graph');
const overviewMode = document.querySelector('#overview-mode');
let resizeQueued = false;

function requestGraphRerender() {
  if (resizeQueued) return;
  resizeQueued = true;
  requestAnimationFrame(() => {
    resizeQueued = false;
    window.dispatchEvent(new Event('resize'));
  });
}

function fitOverviewHeight() {
  if (!graph || !overviewMode) return;
  const active = overviewMode.classList.contains('active');

  if (!active) {
    if (graph.style.height) {
      graph.style.height = '';
      requestGraphRerender();
    }
    return;
  }

  const laneCounts = [0, 0, 0, 0];
  graph.querySelectorAll('.node').forEach(node => {
    for (let lane = 0; lane < laneCounts.length; lane += 1) {
      if (node.classList.contains(`lane-${lane}`)) laneCounts[lane] += 1;
    }
  });

  const maxLaneCount = Math.max(1, ...laneCounts);
  const narrow = window.matchMedia('(max-width: 820px)').matches;
  const rowHeight = narrow ? 76 : 82;
  const minimum = narrow ? 620 : 720;
  const target = Math.max(minimum, maxLaneCount * rowHeight + 120);
  const value = `${target}px`;

  if (graph.style.height !== value) {
    graph.style.height = value;
    requestGraphRerender();
  }
}

let scheduled = false;
function syncPublicPresentation() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    scheduled = false;
    humanizePublicText();
    fitOverviewHeight();
  });
}

const observer = new MutationObserver(syncPublicPresentation);
observer.observe(document.body, {subtree: true, childList: true, attributes: true, attributeFilter: ['class']});
window.addEventListener('resize', syncPublicPresentation);
syncPublicPresentation();
