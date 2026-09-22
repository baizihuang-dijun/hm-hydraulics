export interface ModelData {
  /** Exact model code as shown on the tag (kept verbatim, incl. dots). */
  model: string;
  /** URL slug (dots -> hyphens, slashes collapsed). */
  slug: string;
  series: string;
  seriesSlug: string;
  rotation: string;
  /** Weight with unit, or '' when not confirmed. */
  weight: string;
  /** OEM equipment brand(s) carrying the part, e.g. 'Atlas', 'Sandvik'. */
  brands: string[];
  /** OEM part numbers (public), or '' when none. */
  parts: string[];
  /** Known machine models (public), or [] when none. */
  machines: string[];
  /** Project-relative image path. */
  image: string;
  imageW: number;
  imageH: number;
  imageAlt: string;
  /** Short GEO-friendly lead paragraph. */
  intro: string;
  /** Text used in the Known-applications block intro (optional). */
  applicationNote?: string;
}

const base = 'https://www.hmhydraulics.com';

export const modelPages: ModelData[] = [
  {
    model: 'L10-3.0-E-RF-180-S1-O-H',
    slug: 'l10-3-0-e-rf-180-s1-o-h',
    series: 'L10',
    seriesSlug: 'helac-l10-series',
    rotation: '180°',
    weight: '12 kg',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l10-3-0-e-rf-180.jpg',
    imageW: 211,
    imageH: 212,
    imageAlt: 'Replacement rotary actuator for Helac L10-3.0-E-RF-180, 180 degree compact helical unit',
    intro:
      'Alternative rotary actuator for the Helac L10-3.0-E-RF-180-S1-O-H, a compact 180-degree helical rotary actuator in the 12 kg class, supplied for maintenance and aftermarket replacement.',
  },
  {
    model: 'L10-3.0-S-RF-180-S1-0-H',
    slug: 'l10-3-0-s-rf-180-s1-0-h',
    series: 'L10',
    seriesSlug: 'helac-l10-series',
    rotation: '180°',
    weight: '12 kg',
    brands: ['Sandvik'],
    parts: ['76350014', 'BG00568383'],
    machines: [],
    image: '/images/alternatives/l10-3-0-s-rf-180.jpg',
    imageW: 409,
    imageH: 233,
    imageAlt: 'Replacement rotary actuator for Helac L10-3.0-S-RF-180, Sandvik 76350014',
    intro:
      'Alternative rotary actuator for the Helac L10-3.0-S-RF-180-S1-0-H, a 180-degree helical actuator listed by Sandvik under part number 76350014 (BG00568383), in the 12 kg class.',
  },
  {
    model: 'L10-5.5-E-RF-360-S1-O-H',
    slug: 'l10-5-5-e-rf-360-s1-o-h',
    series: 'L10',
    seriesSlug: 'helac-l10-series',
    rotation: '360°',
    weight: '21 kg',
    brands: ['Atlas', 'Sandvik'],
    parts: ['3128309281'],
    machines: ['Boltec 235', 'Boltec 235h', 'Boltec Lc', 'Boltec Md'],
    image: '/images/alternatives/l10-5-5-e-rf-360.jpg',
    imageW: 254,
    imageH: 228,
    imageAlt: 'Replacement rotary actuator for Helac L10-5.5-E-RF-360, Atlas 3128309281',
    intro:
      'Alternative rotary actuator for the Helac L10-5.5-E-RF-360-S1-O-H, a continuous 360-degree helical actuator listed by Atlas under part number 3128309281, in the 21 kg class.',
    applicationNote:
      'Based on equipment records, this actuator is associated with the following Atlas Boltec drill rigs. Confirmation against your machine build plate is recommended.',
  },
  {
    model: 'L10-5.5-M-RF-360-S1-O-H',
    slug: 'l10-5-5-m-rf-360-s1-o-h',
    series: 'L10',
    seriesSlug: 'helac-l10-series',
    rotation: '360°',
    weight: '20.5 kg',
    brands: ['Sandvik', 'Atlas'],
    parts: ['76350015', '76350006', '3128309281'],
    machines: ['Boltec 235', 'Boltec 235h', 'Boltec Lc', 'Boltec Md'],
    image: '/images/alternatives/l10-5-5-m-rf-360.jpg',
    imageW: 333,
    imageH: 246,
    imageAlt: 'Replacement rotary actuator for Helac L10-5.5-M-RF-360, Sandvik 76350015 / 76350006, Atlas 3128309281',
    intro:
      'Alternative rotary actuator for the Helac L10-5.5-M-RF-360-S1-O-H, a 360-degree helical actuator cross-listed by Sandvik (76350015 / 76350006) and Atlas (3128309281), in the 20.5 kg class.',
    applicationNote:
      'This actuator is recorded on the following Sandvik and Atlas Boltec drill rigs. Confirmation against the machine build plate is recommended.',
  },
  {
    model: 'L20-15-E-CL-180/90-S1-O-H',
    slug: 'l20-15-e-cl-180-90-s1-o-h',
    series: 'L20',
    seriesSlug: 'helac-l20-series',
    rotation: '180/90°',
    weight: '56 kg',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l20-15-e-cl-180-90.jpg',
    imageW: 291,
    imageH: 323,
    imageAlt: 'Replacement rotary actuator for Helac L20-15-E-CL-180/90, compound rotation 180 and 90 degree unit',
    intro:
      'Alternative rotary actuator for the Helac L20-15-E-CL-180/90-S1-O-H, a compound-angle helical actuator providing 180/90-degree rotation in the 56 kg class, supplied for aftermarket replacement.',
  },
  {
    model: 'HP-15-S-FT-180-S1-O-H',
    slug: 'hp-15-s-ft-180-s1-o-h',
    series: 'HP',
    seriesSlug: 'helac-hp-series',
    rotation: '180°',
    weight: '27 kg',
    brands: ['Sandvik'],
    parts: ['76350011'],
    machines: [],
    image: '/images/alternatives/hp-15-s-ft-180.jpg',
    imageW: 214,
    imageH: 217,
    imageAlt: 'Replacement rotary actuator for Helac HP-15-S-FT-180, Sandvik 76350011',
    intro:
      'Alternative rotary actuator for the Helac HP-15-S-FT-180-S1-O-H, a flanged 180-degree helical actuator listed by Sandvik under part number 76350011, in the 27 kg class.',
  },
  {
    model: 'L30-25-M-FT-180-S1-C-H',
    slug: 'l30-25-m-ft-180-s1-c-h',
    series: 'L30',
    seriesSlug: 'helac-l30-series',
    rotation: '180°',
    weight: '49 kg',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l30-25-m-ft-180.jpg',
    imageW: 338,
    imageH: 232,
    imageAlt: 'Replacement rotary actuator for Helac L30-25-M-FT-180, flanged helical unit',
    intro:
      'Alternative rotary actuator for the Helac L30-25-M-FT-180-S1-C-H, a flanged 180-degree helical actuator in the 49 kg class, supplied for maintenance and aftermarket replacement.',
  },
  {
    model: 'L30-42-M-RF-360-S1-C-H',
    slug: 'l30-42-m-rf-360-s1-c-h',
    series: 'L30',
    seriesSlug: 'helac-l30-series',
    rotation: '360°',
    weight: '94 kg',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l30-42-m-rf-360.jpg',
    imageW: 354,
    imageH: 274,
    imageAlt: 'Replacement rotary actuator for Helac L30-42-M-RF-360, large flange helical unit',
    intro:
      'Alternative rotary actuator for the Helac L30-42-M-RF-360-S1-C-H, a large-flange 360-degree helical actuator in the 94 kg class, supplied for heavy-duty aftermarket replacement.',
  },
  {
    model: 'L30-42-M-FT-180-S1-C-H',
    slug: 'l30-42-m-ft-180-s1-c-h',
    series: 'L30',
    seriesSlug: 'helac-l30-series',
    rotation: '180°',
    weight: '73 kg',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l30-42-m-ft-180.jpg',
    imageW: 408,
    imageH: 246,
    imageAlt: 'Replacement rotary actuator for Helac L30-42-M-FT-180, flanged helical unit',
    intro:
      'Alternative rotary actuator for the Helac L30-42-M-FT-180-S1-C-H, a flanged 180-degree helical actuator in the 73 kg class, supplied for heavy-duty aftermarket replacement.',
  },
  {
    model: 'L10-5.5-M-RF-360/240-S1-CH',
    slug: 'l10-5-5-m-rf-360-240-s1-ch',
    series: 'L10',
    seriesSlug: 'helac-l10-series',
    rotation: '360/240°',
    weight: '21.5 kg',
    brands: [],
    parts: [],
    machines: ['Simba S7D', 'Simba H1257'],
    image: '/images/alternatives/l10-5-5-m-rf-360-240.jpg',
    imageW: 333,
    imageH: 252,
    imageAlt: 'Replacement rotary actuator for Helac L10-5.5-M-RF-360/240, Atlas Simba S7D and H1257',
    intro:
      'Alternative rotary actuator for the Helac L10-5.5-M-RF-360/240-S1-CH, a 360/240-degree helical actuator recorded on Atlas Simba S7D and H1257 rigs, in the 21.5 kg class.',
    applicationNote:
      'Based on equipment records, this actuator is associated with the following Atlas Simba rigs. Confirmation against your machine build plate is recommended.',
  },
  {
    model: 'L10-9.5-M-RF-185-S-C-H',
    slug: 'l10-9-5-m-rf-185-s-c-h',
    series: 'L10',
    seriesSlug: 'helac-l10-series',
    rotation: '185°',
    weight: '26 kg',
    brands: ['Atlas'],
    parts: ['9106178448'],
    machines: ['Boomer 353'],
    image: '/images/alternatives/l10-9-5-m-rf-185.jpg',
    imageW: 211,
    imageH: 182,
    imageAlt: 'Replacement rotary actuator for Helac L10-9.5-M-RF-185, Atlas 9106178448, Boomer 353',
    intro:
      'Alternative rotary actuator for the Helac L10-9.5-M-RF-185-S-C-H, a 185-degree helical actuator listed by Atlas under part number 9106178448 and used on the Boomer 353, in the 26 kg class.',
    applicationNote:
      'This actuator is recorded on the Atlas Boomer 353 face-drill rig. Confirmation against your machine build plate is recommended.',
  },
  {
    model: 'HTX70-MS-RF-360-SS-O-H',
    slug: 'htx70-ms-rf-360-ss-o-h',
    series: 'HTX',
    seriesSlug: 'helac-htx-series',
    rotation: '360°',
    weight: '',
    brands: ['Atlas'],
    parts: ['3128307978'],
    machines: ['Boomer 104', 'Boomer K41', 'Boomer K41x', 'Simba H157'],
    image: '/images/alternatives/htx70-ms-rf-360.jpg',
    imageW: 223,
    imageH: 258,
    imageAlt: 'Replacement rotary actuator for Helac HTX70-MS-RF-360, Atlas 3128307978',
    intro:
      'Alternative rotary actuator for the Helac HTX70-MS-RF-360-SS-O-H, a splined-shaft 360-degree helical actuator listed by Atlas under part number 3128307978, supplied for aftermarket replacement.',
    applicationNote:
      'This actuator is associated with the following Atlas Boomer and Simba rigs. Confirmation against your machine build plate is recommended.',
  },
  {
    model: 'L40-110-M-RF-360-S1-C-H',
    slug: 'l40-110-m-rf-360-s1-c-h',
    series: 'L40',
    seriesSlug: 'helac-l40-series',
    rotation: '360°',
    weight: '140 kg',
    brands: ['Atlas'],
    parts: ['3128341070'],
    machines: [],
    image: '/images/alternatives/l40-110-m-rf-360.jpg',
    imageW: 435,
    imageH: 197,
    imageAlt: 'Replacement rotary actuator for Helac L40-110-M-RF-360, Atlas 3128341070, heavy-duty unit',
    intro:
      'Alternative rotary actuator for the Helac L40-110-M-RF-360-S1-C-H, a heavy-duty 360-degree helical actuator listed by Atlas under part number 3128341070, in the 140 kg class.',
  },
  {
    model: 'HP125-S-RF-360-S1-C-H',
    slug: 'hp125-s-rf-360-s1-c-h',
    series: 'HP',
    seriesSlug: 'helac-hp-series',
    rotation: '360°',
    weight: '208 kg',
    brands: ['Atlas'],
    parts: ['3128312645', 'L3D'],
    machines: ['Boomer M2d', 'Boomer XL3', 'Boomer 353', 'Boomer L2c', 'Boomer L2d'],
    image: '/images/alternatives/helac-hp125.jpg',
    imageW: 467,
    imageH: 286,
    imageAlt: 'Replacement rotary actuator supplied for Helac HP125-S-RF-360-S1-C-H, flange and port view',
    intro:
      'Alternative rotary actuator for the Helac HP125-S-RF-360-S1-C-H, supplied for maintenance and aftermarket replacement on Atlas Boomer face-drill rigs.',
    applicationNote:
      'Based on equipment records, this actuator is associated with the following Atlas Boomer face-drilling and development rigs. Confirmation against your machine build plate is recommended.',
  },
];

export function getModel(slug: string): ModelData | undefined {
  return modelPages.find((m) => m.slug === slug);
}

export const SITE = base;
