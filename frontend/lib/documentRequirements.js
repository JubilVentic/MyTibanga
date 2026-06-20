/**
 * Document requirements shown to residents (SMS, tracker, etc.).
 * Expand REQUIREMENTS_BY_DOCUMENT as more certificates get their own lists.
 */

/** Requirement labels keyed by normalized document name. */
const REQUIREMENTS_BY_DOCUMENT = {
    'barangay clearance': ['Purok Clearance'],
    'barangay certificate for solo parents': ['Purok Clearance'],
    'barangay certificate for motorized banca': ['Purok Clearance'],
    'barangay certificate of indigency': ['Purok Clearance'],
    'barangay certificate of residency': ['Purok Clearance'],
};

const LEGACY_ALIASES = {
    'certificate of indigency': 'barangay certificate of indigency',
    'barangay certificate for solo parent': 'barangay certificate for solo parents',
    'certificate of residency': 'barangay certificate of residency',
};

function normalizeDocumentName(name) {
    const raw = String(name || '').trim().toLowerCase();
    return LEGACY_ALIASES[raw] || raw;
}

function documentNames(documents) {
    if (!Array.isArray(documents)) return [];
    return documents
        .map((doc) => (typeof doc === 'string' ? doc : doc?.name))
        .filter(Boolean);
}

/** Unique requirement labels for the requested documents. */
export function getRequirementsForDocuments(documents) {
    const reqs = new Set();
    for (const name of documentNames(documents)) {
        const key = normalizeDocumentName(name);
        const list = REQUIREMENTS_BY_DOCUMENT[key] || [];
        list.forEach((req) => reqs.add(req));
    }
    return [...reqs];
}

/** SMS body after a resident submits a document request. */
export function buildDocumentRequestSubmittedSms(requestNo, documents) {
    const requirements = getRequirementsForDocuments(documents);
    let msg = `MyTibangaPortal: Your document request (${requestNo}) has been submitted.`;
    if (requirements.length > 0) {
        msg += ` Please prepare: ${requirements.join(', ')}.`;
    }
    msg += ' Go to Track Request on the portal and enter your request number to check your status.';
    return msg;
}
