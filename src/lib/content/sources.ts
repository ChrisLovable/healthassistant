// Authoritative bodies referenced across Phila.
// These are TRUSTED RESOURCES for users to learn more / verify — NOT citations
// of where our text was sourced. Matching is by pattern so the same rule catches
// a name however it is phrased ("SADAG" and "SADAG (South African Depression...)").
// Anything without a match renders as plain text (no broken links).

const RULES: Array<[RegExp, string]> = [
  [/\bWHO\b|World Health Organization/i,   "https://www.who.int"],
  [/\bNICD\b/i,                            "https://www.nicd.ac.za"],
  [/Department of Health/i,                "https://www.health.gov.za"],
  [/Social Development/i,                  "https://www.dsd.gov.za"],
  [/SADAG/i,                               "https://www.sadag.org"],
  [/CANSA/i,                               "https://cansa.org.za"],
  [/Heart and Stroke Foundation/i,         "https://www.heartfoundation.co.za"],
  [/GINA|Global Initiative for Asthma/i,   "https://ginasthma.org"],
  [/SANCA/i,                               "https://www.sancanational.info"],
  [/Diabetes SA|Diabetes South Africa/i,   "https://www.diabetessa.org.za"],
  [/Allergy Foundation/i,                  "https://www.allergyfoundation.co.za"],
  [/Dermatolog/i,                          "https://dermatology.co.za"],
  [/Society of Psychiatrists|SASOP/i,      "https://www.sasop.co.za"],
  [/Pink ?Drive/i,                         "https://pinkdrive.co.za"],
];

export function sourceUrl(name: string): string | null {
  for (const [re, url] of RULES) if (re.test(name)) return url;
  return null;
}