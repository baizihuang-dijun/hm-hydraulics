/**
 * OEM part-number groups for aerial work platform / boom lift rotary actuators.
 *
 * Source hierarchy (project rule: controlled DB > document > memory > web):
 *  - Grouping, primary/new/old numbering and product photos = factory-provided
 *    part-number/photo cross-reference (authoritative for part identity).
 *  - Machine fitment (models[]) = web-researched simple fitment sheet, NOT a
 *    controlled JLG/Genie parts catalogue. It is shown as "reported on ..." and
 *    every page asks the buyer to verify against the machine build plate/tag.
 *
 * Public-page rules: OEM numbers are used for identification only; never claim
 * original parts, drop-in fit, or guaranteed interchangeability. No internal
 * factory names, codes or confidential references appear in this file.
 */

export type AerialBrand = 'JLG' | 'Genie';

export interface OemPartGroup {
  /** Canonical slug used in /alternatives/<slug>; bare number for clean SEO. */
  slug: string;
  brand: AerialBrand;
  /** The number used for the page title / H1 (prefer current/new number). */
  primary: string;
  /** All searchable numbers: primary first, then superseded/legacy equivalents. */
  allNumbers: string[];
  /** Human-readable number history, e.g. '1001178269 (current), supersedes 0060066'. */
  numberNote: string;
  /** Equipment models this actuator is reported to fit (web-researched, verify). */
  machines: string[];
  /** Project-relative product photo. */
  image: string;
  /** One-line product / positioning copy. */
  lead: string;
  /** Additional photos (e.g. the same build under its newer number), optional. */
  extraImages?: string[];
}

const img = (dir: 'jlg' | 'genie', f: string) => `/images/${dir}/${f}-rotary-actuator.png`;

export const oemPartGroups: OemPartGroup[] = [
  // ---- Genie (GT legacy numbering) ----
  {
    slug: '94397gt',
    brand: 'Genie',
    primary: '94397GT',
    allNumbers: ['94397GT'],
    numberNote: '94397GT (GT legacy numbering)',
    machines: ['S-40', 'S-45', 'S-60', 'S-65', 'S-80', 'S-85', 'Z-62/40', 'Z-80/60'],
    image: img('genie', '94397gt'),
    lead: 'Replacement helical rotary actuator reported on Genie S-series telescopic and Z-series articulating boom lifts.',
  },
  {
    slug: '226541gt',
    brand: 'Genie',
    primary: '226541GT',
    allNumbers: ['226541GT'],
    numberNote: '226541GT (GT legacy numbering)',
    machines: ['S-80X', 'S-60', 'S-65', 'S-80', 'S-85'],
    image: img('genie', '226541gt'),
    lead: 'Replacement helical rotary actuator reported on Genie S-60 to S-85 telescopic boom lifts.',
  },
  {
    slug: '233715gt',
    brand: 'Genie',
    primary: '233715GT',
    allNumbers: ['233715GT'],
    numberNote: '233715GT (GT legacy numbering)',
    machines: ['Z-45/25', 'Z-45/25J', 'Z-51/30J RT'],
    image: img('genie', '233715gt'),
    lead: 'Replacement helical rotary actuator reported on Genie Z-45/25 and Z-51/30J rough-terrain articulating booms.',
  },
  {
    slug: '94398gt',
    brand: 'Genie',
    primary: '94398GT',
    allNumbers: ['94398GT'],
    numberNote: '94398GT (GT legacy numbering)',
    machines: ['S-40', 'S-45', 'S-60', 'S-65', 'S-80', 'S-85'],
    image: img('genie', '94398gt'),
    lead: 'Replacement helical rotary actuator reported on Genie S-40 to S-85 telescopic boom lifts.',
  },
  {
    slug: '88576gt',
    brand: 'Genie',
    primary: '88576GT',
    allNumbers: ['88576GT'],
    numberNote: '88576GT (GT legacy numbering)',
    machines: ['S-60', 'S-65', 'S-80', 'S-85'],
    image: img('genie', '88576gt'),
    lead: 'Replacement helical rotary actuator reported on Genie S-60 to S-85 telescopic boom lifts.',
  },

  // ---- JLG (10-digit current numbers + superseded 006xxx / old 10011x numbers) ----
  {
    slug: '1001178269',
    brand: 'JLG',
    primary: '1001178269',
    allNumbers: ['1001178269', '1001307714', '0060066'],
    numberNote: '1001178269 (current) · 1001307714 and 0060066 are superseded/legacy equivalents of the same actuator',
    machines: ['600A', '600AJ', '600S', '600SJ', '660SJ', '660SJC', '18RS', '18RSJ', '24RSJ'],
    image: img('jlg', '1001178269'),
    lead: 'Replacement helical rotary actuator reported on JLG 600-series boom lifts and RS scissor lift platforms.',
  },
  {
    slug: '1001217780',
    brand: 'JLG',
    primary: '1001217780',
    allNumbers: ['1001217780'],
    numberNote: '1001217780',
    machines: ['600A', '600AJ', '600S', '660SJ', '740AJ', '800A', '800AJ'],
    image: img('jlg', '1001217780'),
    lead: 'Replacement helical rotary actuator reported on JLG 600/740/800-series articulating and telescopic booms.',
  },
  {
    slug: '1001307717',
    brand: 'JLG',
    primary: '1001307717',
    allNumbers: ['1001307717', '1001181060', '0060061'],
    numberNote: '1001307717 (current) · supersedes 1001181060 and 0060061',
    machines: ['800S', '800SJ', '860SJ'],
    image: img('jlg', '1001307717'),
    lead: 'Replacement helical rotary actuator reported on JLG 800S, 800SJ and 860SJ telescopic boom lifts.',
  },
  {
    slug: '1001181058',
    brand: 'JLG',
    primary: '1001181058',
    allNumbers: ['1001181058'],
    numberNote: '1001181058',
    machines: ['600S', '660SJ'],
    image: img('jlg', '1001181058'),
    lead: 'Replacement helical rotary actuator reported on JLG 600S and 660SJ telescopic boom lifts.',
  },
  {
    slug: '1001307763',
    brand: 'JLG',
    primary: '1001307763',
    allNumbers: ['1001307763', '1001181057', '0060067'],
    numberNote: '1001307763 (current/new) · replaces 1001181057 and 0060067',
    machines: ['600S'],
    image: img('jlg', '1001307763'),
    lead: 'Replacement helical rotary actuator reported on the JLG 600S telescopic boom lift.',
  },
  {
    slug: '1001181051',
    brand: 'JLG',
    primary: '1001181051',
    allNumbers: ['1001181051', '1001307715'],
    numberNote: '1001181051 · 1001307715 is the current/new equivalent',
    machines: ['400/800 Series', '460SJ', '800S', '860SJ'],
    image: img('jlg', '1001181051'),
    extraImages: [img('jlg', '1001307715')],
    lead: 'Replacement helical rotary actuator reported on JLG 460SJ, 800S and 860SJ boom lifts.',
  },
  {
    slug: '1001307759',
    brand: 'JLG',
    primary: '1001307759',
    allNumbers: ['1001307759', '1001181050', '0060059S'],
    numberNote: '1001307759 (current) · supersedes 1001181050 and 0060059S (suffix S to confirm against tag)',
    machines: ['400S', '460SJ', '800S'],
    image: img('jlg', '1001307759'),
    lead: 'Replacement helical rotary actuator reported on JLG 400S, 460SJ and 800S boom lifts.',
  },
  {
    slug: '1001178248',
    brand: 'JLG',
    primary: '1001178248',
    allNumbers: ['1001178248'],
    numberNote: '1001178248',
    machines: ['1200SJP', '1250AJP', '1350SJP'],
    image: img('jlg', '1001178248'),
    lead: 'Replacement helical rotary actuator reported on JLG Ultra Boom 1200SJP, 1250AJP and 1350SJP platforms.',
  },
  {
    slug: '1001178247',
    brand: 'JLG',
    primary: '1001178247',
    allNumbers: ['1001178247'],
    numberNote: '1001178247',
    machines: ['1200SJP', '1250AJP', '1350SJP'],
    image: img('jlg', '1001178247'),
    lead: 'Replacement helical rotary actuator reported on JLG Ultra Boom 1200SJP, 1250AJP and 1350SJP platforms.',
  },
];

export function getOemPartBySlug(slug: string): OemPartGroup | undefined {
  return oemPartGroups.find((g) => g.slug === slug);
}

/** Resolve ANY number (current or superseded) to its canonical group. */
export function getOemPartByNumber(num: string): OemPartGroup | undefined {
  const norm = (s: string) => s.toLowerCase().replace(/[\s-]/g, '');
  const n = norm(num);
  return oemPartGroups.find((g) => g.allNumbers.some((x) => norm(x) === n));
}

export const oemPartSlugs = oemPartGroups.map((g) => g.slug);
