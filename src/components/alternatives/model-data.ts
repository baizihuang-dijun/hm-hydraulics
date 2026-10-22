import { resolveModelImage } from './model-image';

/**
 * A cross-brand candidate shown on a public catalog build page.
 * Commercial presentation only: brand, model/series, and a short key-specification line.
 * Evidence grade, verification status and detailed caveats stay in the internal DB, not on the page.
 * Nothing here may imply drop-in, matching mounting dimensions, or verified interchangeability.
 */
export interface CrossAlternative {
  /** Brand name, e.g. 'HKS'. */
  brand: string;
  /** Public model/series reference, e.g. 'M-DA-H F10/F5 200'. */
  seriesRef: string;
  /** Short buyer-facing key spec, e.g. 'Similar torque class'. */
  keySpec: string;
}

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
  /** Rated torque with unit, or '' when not confirmed (optional). */
  torque?: string;
  /** Free-text alternative cross-reference note, e.g. Parker series (optional). */
  crossNote?: string;
  /**
   * True when the exact Helac model code is reconstructed from supply records /
   * configuration rather than read off the unit's nameplate. When set, the page keeps
   * the code as a search anchor but avoids asserting an exact code=part identity.
   */
  modelCodeUnverified?: boolean;
  /**
   * Original actuator brand for this reference. Defaults to 'Helac' so every existing
   * Helac page renders byte-identically; set 'ECKART' / 'HKS' / 'Moveco' / 'Sungji' for
   * other-brand sourcing/alternative-supply pages.
   */
  originBrand?: string;
  /**
   * True for a non-Helac reference where HM offers sourcing / alternative supply but has
   * NOT verified an original part or a fully interchangeable drop-in. The template then uses
   * sourcing phrasing and never states direct replacement / guaranteed compatibility.
   */
  sourcingOnly?: boolean;
  /** Hide the bottom "browse all builds of this series" link when no series page exists. */
  hideSeriesLink?: boolean;
  /**
   * True for a catalog configuration page (a valid build per the Parker/Helac HY34-1001
   * model-code rule and published performance tables), rather than a unit read off a
   * specific nameplate. The page must phrase the code as a catalog/available configuration,
   * not a nameplate-verified order code, and show full engineering data instead of an OEM part.
   */
  catalogBuild?: boolean;
  /** Catalog build engineering data (Helac published tables). Numbers with units live in template. */
  catalogSpec?: {
    pressureBar?: number;
    ratedTorqueNm?: number;
    holdingTorqueNm?: number;
    momentCantileverNm?: number;
    momentStraddleNm?: string; // may carry both 180/360 figures
    axialLoadKg?: number;
    radialLoadKg?: number;
    displacementCm3?: string; // this build's displacement
    weightKg?: string; // this build's weight
    mountingStyles?: string; // e.g. 'FT foot, FF front flange, RF rear flange'
    /** Human label for the base size, e.g. 'L30-95 (9,500 in-lb class)'. */
    baseLabel?: string;
    /** Plain-English decode of this exact ordering code. */
    thisBuildDecode?: string;
    /**
     * Cross-brand candidates we are allowed to show publicly.
     * Only add entries that trace to a controlled-DB cell; level is never above 'torque-class'.
     */
    crossAlternatives?: CrossAlternative[];
    /** Sibling angle builds, to show real 180 vs 360 differences on the same base. */
    siblingAngle?: { angle: string; code: string; displacementCm3: string; weightKg: string; straddleNm: string };
    source: string; // e.g. 'Helac L30 catalog, pp. 12 & 14'
  };
  /** Public cross-brand reference note for catalog builds (parameter-close only). */
  crossBrandNote?: string;
  /** Model-specific FAQ entries appended to the generated set (optional). */
  extraFaqs?: { q: string; a: string }[];
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
    brands: ['Husqvarna'],
    parts: ['541 20 09-94'],
    machines: ['RS8500D'],
    image: '/images/alternatives/l10-3-0-e-rf-180.jpg',
    imageW: 211,
    imageH: 212,
    imageAlt: 'Replacement steering rotary actuator for Helac L10-3.0-E-RF-180, Husqvarna RS8500D part 541 20 09-94',
    intro:
      'Alternative steering rotary actuator for the Helac L10-3.0-E-RF-180-S1-O-H, a compact 180-degree helical rotary actuator in the 12 kg class rated at 3,000 in-lb. It is listed by Husqvarna as steering actuator part number 541 20 09-94 on the RS8500D ride-on concrete saw, supplied for maintenance and aftermarket replacement.',
    applicationNote:
      'Based on Husqvarna parts records, part number 541 20 09-94 is the steering (rotary) actuator in the hydraulic assembly of the RS8500D ride-on floor saw. Confirmation against your machine build plate and the actuator tag is recommended.',
    torque: '3,000 in-lb',
    crossNote:
      'May also cross to the Parker 53905-P041 series (e.g. 53905-P041-D / P065-D); the final match is verified against the tag on your unit.',
    extraFaqs: [
      {
        q: 'What other order codes are available in this same series?',
        a: 'Other catalog configurations of the same actuator family include: L10-3.0-E-RF-180-S1-C-H. These are complete Helac order codes differing in rotation angle, ports, valve or mounting/flange arrangement; they are not interchangeable with the configuration shown on this page. Send the exact code on your unit tag or a mounting drawing and we confirm the matching build before quoting.',
      },
      {
        q: 'Will this fit a Husqvarna RS8500D?',
        a: 'Yes. On the Husqvarna RS8500D ride-on concrete saw, the steering actuator in the hydraulic assembly is part number 541 20 09-94, the Helac L10-3.0-E-RF-180-S1-O-H. Before ordering we confirm the mounting face, port position and rotation against the tag and a drawing or photo of your unit.',
      },
    ],
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
    image: '/images/atlas-copco/l10-3-0-s-rf-180-s1-0-h-rotary-actuator.webp',
    imageW: 909,
    imageH: 603,
    imageAlt: 'Replacement rotary actuator for Helac L10-3.0-S-RF-180, Sandvik 76350014',
    intro:
      'Alternative rotary actuator for the Helac L10-3.0-S-RF-180-S1-0-H, a 180-degree helical actuator listed by Sandvik under part number 76350014 (BG00568383), in the 12 kg class.',
    extraFaqs: [
      {
        q: 'What other order codes are available in this same series?',
        a: 'Other catalog configurations of the same actuator family include: L10-3.0-E-RF-360-S1-C-H. These are complete Helac order codes differing in rotation angle, ports, valve or mounting/flange arrangement; they are not interchangeable with the configuration shown on this page. Send the exact code on your unit tag or a mounting drawing and we confirm the matching build before quoting.',
      },
    ], // P0-VARIANTS

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
    extraFaqs: [
      {
        q: 'What other order codes are available in this same series?',
        a: 'Other catalog configurations of the same actuator family include: L10-5.5-E-RF-360-S1-C-H. These are complete Helac order codes differing in rotation angle, ports, valve or mounting/flange arrangement; they are not interchangeable with the configuration shown on this page. Send the exact code on your unit tag or a mounting drawing and we confirm the matching build before quoting.',
      },
      {
        q: 'Is part number 3128309281 the same actuator on the Boltec 235?',
        a: 'Yes. On the Atlas Copco / Epiroc Boltec 235, 235h, Lc and Md drill rigs the 360-degree rotary actuator is supplied under part number 3128309281, corresponding to the Helac L10-5.5-E-RF-360-S1-O-H configuration (360-degree rotation, round-flange mount). Before ordering we confirm the mounting face, port position and rotation against the tag and a photo or drawing of your unit.',
      },
    ],
  },
  {
    model: 'L10-5.5-M-RF-360-S1-O-H',
    slug: 'l10-5-5-m-rf-360-s1-o-h',
    series: 'L10',
    seriesSlug: 'helac-l10-series',
    rotation: '360°',
    weight: '20.5 kg',
    brands: ['Sandvik', 'Atlas'],
    parts: ['76350015', '76350006', '3128309281', '3128010431'],
    machines: ['Boltec 235', 'Boltec 235h', 'Boltec Lc', 'Boltec Md'],
    image: '/images/atlas-copco/l10-5-5-m-rf-360-s1-o-h-rotary-actuator.webp',
    imageW: 1600,
    imageH: 1932,
    imageAlt: 'Replacement rotary actuator for Helac L10-5.5-M-RF-360, Sandvik 76350015 / 76350006, Atlas 3128309281',
    intro:
      'Alternative rotary actuator for the Helac L10-5.5-M-RF-360-S1-O-H, a 360-degree helical actuator cross-listed by Sandvik (76350015 / 76350006) and Atlas (3128309281), in the 20.5 kg class.',
    applicationNote:
      'This actuator is recorded on the following Sandvik and Atlas Boltec drill rigs. Confirmation against the machine build plate is recommended.',
    extraFaqs: [
      {
        q: 'What other order codes are available in this same series?',
        a: 'Other catalog configurations of the same actuator family include: L10-5.5-E-RF-180-S1-C-H. These are complete Helac order codes differing in rotation angle, ports, valve or mounting/flange arrangement; they are not interchangeable with the configuration shown on this page. Send the exact code on your unit tag or a mounting drawing and we confirm the matching build before quoting.',
      },
      {
        q: 'Which part numbers cross to the L10-5.5-M-RF-360 on the Boltec 235?',
        a: 'This 360-degree build is cross-listed by Sandvik under 76350015 and 76350006 and by Atlas Copco / Epiroc under 3128309281 on the Boltec 235, 235h, Lc and Md rigs, matching the Helac L10-5.5-M-RF-360-S1-O-H configuration. Send the part number on your tag or a nameplate photo and we confirm the exact variant before quoting.',
      },
    ],
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
    extraFaqs: [
      {
        q: 'What other order codes are available in this same series?',
        a: 'Other catalog configurations of the same actuator family include: L30-25-E-FT-180-S1-C-H; L30-25-E-FT-360-S1-C-H. These are complete Helac order codes differing in rotation angle, ports, valve or mounting/flange arrangement; they are not interchangeable with the configuration shown on this page. Send the exact code on your unit tag or a mounting drawing and we confirm the matching build before quoting.',
      },
    ], // P0-VARIANTS

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
    extraFaqs: [
      {
        q: 'What other order codes are available in this same series?',
        a: 'Other catalog configurations of the same actuator family include: L30-42-E-FT-180-S1-C-H. These are complete Helac order codes differing in rotation angle, ports, valve or mounting/flange arrangement; they are not interchangeable with the configuration shown on this page. Send the exact code on your unit tag or a mounting drawing and we confirm the matching build before quoting.',
      },
    ], // P0-VARIANTS

  },
  {
    model: 'L30-65-S-RF-360-S1-C-H',
    slug: 'l30-65-s-rf-360-s1-c-h',
    series: 'L30',
    seriesSlug: 'helac-l30-series',
    rotation: '360°',
    weight: '141 kg',
    brands: ['Atlas'],
    parts: ['3128312644'],
    machines: ['Boomer 282'],
    image: '/images/atlas-copco/l30-65-s-rf-360-s1-c-h-rotary-actuator.webp',
    imageW: 1280,
    imageH: 1280,
    imageAlt:
      'Replacement rotary actuator for Helac L30-65-S-RF-360-S1-C-H, Atlas Copco Epiroc part 3128312644 on Boomer 282 mining drill rig',
    intro:
      'Alternative rotary actuator for the Helac L30-65-S-RF-360-S1-C-H, a large 360-degree helical rotary actuator with round-flange mount and integral counterbalance valve, supplied for heavy-duty mining use. It is listed by Atlas Copco / Epiroc under part number 3128312644 on the Boomer 282 underground face-drill rig.',
    applicationNote:
      'Based on equipment records, part number 3128312644 is the rotary actuator on the Atlas Copco / Epiroc Boomer 282 underground drilling rig, built to the Helac L30-65-S-RF-360-S1-C-H configuration. Confirmation against your machine build plate and the actuator tag is recommended.',
    extraFaqs: [
      {
        q: 'Will this fit an Atlas Copco / Epiroc Boomer 282?',
        a: 'Yes. On the Atlas Copco / Epiroc Boomer 282 face-drill rig the rotation actuator is supplied under part number 3128312644, corresponding to the Helac L30-65-S-RF-360-S1-C-H configuration (360-degree rotation, round-flange mount, integral counterbalance valve). Before ordering we confirm the mounting face, port position and rotation against the tag and a photo or drawing of your unit.',
      },
      {
        q: 'What do the S, RF and C-H sections of the code mean?',
        a: 'Reading the Parker-Helac ordering key: the first S is the measurement-system field and marks a special/custom design (standard keys are E for English/SAE and M for metric/BSPP; custom builds are also written ES or MS). RF is the rear-flange housing, the later S1 is the shaft/end-cap flange code (S1 cantilever, S2 straddle), C is the counterbalance-valve option (0 = no valve, the digit zero rather than the letter O; V = valve-ready), and the final H is the standard seals & bearings package (S = special seals & bearings) — the exact seal compound is read from the tag/drawing, not assumed from H. Send the full code or a tag photo and we confirm the exact variant.',
      },
      {
        q: 'How do Atlas Copco/Epiroc numbers 3128312644 and 3128305918 relate?',
        a: 'Atlas Copco/Epiroc lists the L30-65 rear-flange 360-degree mining build under 3128312644. The same actuator family is also seen under 3128305918, where the build is written with the SF flange/end-cap code (L30-65-S-RF-360-SF-C-H) rather than S1 — a closely related but not necessarily identical configuration. Send the exact number and code on your tag and we confirm the precise flange, ports and rotation before quoting.',
      },
      {
        q: 'What is Atlas Copco/Epiroc part 3128307754?',
        a: '3128307754 is the seal/repair kit associated with this L30-65-S-RF-360 actuator family, not a complete actuator. If you need the full rotary actuator, the complete-unit reference on this build is 3128312644; if you only need the service/seal kit, tell us and we assist with the kit separately. Confirm against your tag before ordering either.',
      },
    ],
  },
  {
    model: 'L30-95-E-FT-360-S1-C-H',
    slug: 'l30-95-e-ft-360-s1-c-h',
    series: 'L30',
    seriesSlug: 'helac-l30-series',
    rotation: '360°',
    weight: '204.1 kg',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l30-65-s-rf-360.jpg',
    imageW: 384,
    imageH: 510,
    imageAlt: 'Heavy-duty Helac L30 series helical rotary actuator, foot-mount 360-degree configuration (L30 series representative image)',
    catalogBuild: true,
    intro:
      'Looking for an alternative to the Helac L30-95 rotary actuator? This page covers the 360° foot-mount catalog configuration, with a rated output torque of approximately 10,735 Nm at 207 bar. HM can help review your unit tag, mounting drawings and operating requirements before proposing a suitable solution.',
    catalogSpec: {
      pressureBar: 207,
      ratedTorqueNm: 10735,
      holdingTorqueNm: 26216,
      momentCantileverNm: 29521,
      momentStraddleNm: '75,145 Nm (180°) / 111,531 Nm (360°)',
      axialLoadKg: 4536,
      radialLoadKg: 6804,
      displacementCm3: '5,358.6 cm³ (360°)',
      weightKg: '204.1 kg (360°)',
      mountingStyles: 'FT foot mount · FF front flange · RF rear flange',
      baseLabel: 'L30-95 (9,500 in-lb class)',
      thisBuildDecode:
        'E = English/SAE threads & ports · FT foot mount · 360° rotation · S1 single (cantilever) flange · C counterbalance valve · H standard seals & bearings',
      crossAlternatives: [
        {
          brand: 'HKS',
          seriesRef: 'M-DA-H F10/F5 200',
          keySpec: 'Similar torque class',
        },
      ],
      siblingAngle: {
        angle: '180°',
        code: 'L30-95-E-FT-180-S1-C-H',
        displacementCm3: '2,687.5 cm³',
        weightKg: '163.3 kg',
        straddleNm: '75,145 Nm',
      },
      source: 'Helac L30 catalog, pp. 12 & 14',
    },
    extraFaqs: [
      {
        q: 'Is L30-95-E-FT-360-S1-C-H a confirmed factory order code?',
        a: 'This configuration is derived from the Parker/Helac HY34-1001 ordering key (L30 frame, 95 = 9,500 in-lb class, E English/SAE, FT foot mount, 360° rotation, S1 single/cantilever flange, C counterbalance valve, H standard seals & bearings) and the published L30 performance data. It is a configuration assembled per the catalog rules, not an independently verified factory order code read from a nameplate. The exact configuration and compatibility are confirmed against the original unit tag and mounting drawings before we quote.',
      },
      {
        q: 'What is the difference between the 180° and 360° L30-95 builds?',
        a: 'They share the same L30 frame and output torque (~10,735 Nm at 207 bar) but are different effective builds: the 360° unit displaces about 5,358.6 cm³ and weighs 204.1 kg, while the 180° unit displaces about 2,687.5 cm³ and weighs 163.3 kg; the straddle (double-flange) moment rating is also higher for the longer 360° body. They suit different travel, cycle-time and mounting-geometry requirements, so choose by the required rotation and confirm against the drawing rather than treating them as interchangeable.',
      },
      {
        q: 'Can I use the HKS F10 200 / F5 200 as a direct replacement?',
        a: 'The HKS M-DA-H F10/F5 200 is at a similar torque level, but it is built to HKS\u2019s own frame and mounting dimensions, so a similar rating does not guarantee a fit. Send us your unit tag and mounting drawing \u2014 we overlay the flange, shaft, ports and rotation and confirm whether it is a suitable option for your machine.',
      },
      {
        q: 'Which mounting styles are available for the L30-95?',
        a: 'The L30-95 base is offered in FT foot mount, FF front flange and RF rear flange housings, with S1 single-flange (cantilever) or S2 double-flange (straddle) shaft arrangements. This page covers the E-FT-360-S1-C-H build; send your tag code or a mounting drawing and we confirm the matching housing, flange and port arrangement.',
      },
    ],
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
    extraFaqs: [
      {
        q: 'What other order codes are available in this same series?',
        a: 'Other catalog configurations of the same actuator family include: L10-9.5-E-RF-180-S1-C-H; L10-9.5-E-RF-360-S1-C-H. These are complete Helac order codes differing in rotation angle, ports, valve or mounting/flange arrangement; they are not interchangeable with the configuration shown on this page. Send the exact code on your unit tag or a mounting drawing and we confirm the matching build before quoting.',
      },
      {
        q: 'Will part 9106178448 fit my Boomer 353?',
        a: 'Yes. On the Atlas Copco / Epiroc Boomer 353 face-drill rig the rotation actuator is supplied under part number 9106178448, corresponding to the Helac L10-9.5-M-RF-185-S-C-H configuration (185-degree rotation with integral counterbalance valve). Before ordering we confirm the mounting face, port position and rotation against the tag and a photo of your unit.',
      },
    ],
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
    image: '/images/atlas-copco/htx70-ms-rf-360-ss-o-h-rotary-actuator.webp',
    imageW: 1600,
    imageH: 634,
    imageAlt: 'Replacement rotary actuator for Helac HTX70-MS-RF-360, Atlas 3128307978',
    intro:
      'Alternative rotary actuator for the Helac HTX70-MS-RF-360-SS-O-H, a splined-shaft 360-degree helical actuator listed by Atlas under part number 3128307978, supplied for aftermarket replacement.',
    applicationNote:
      'This actuator is associated with the following Atlas Boomer and Simba rigs. Confirmation against your machine build plate is recommended.',
    extraFaqs: [
      {
        q: 'Which rigs use Atlas part number 3128307978?',
        a: 'The splined-shaft 360-degree actuator under Atlas Copco / Epiroc part number 3128307978 is recorded on the Boomer 104, Boomer K41, Boomer K41x and Simba H157 rigs, corresponding to the Helac HTX70-MS-RF-360-SS-O-H configuration. Send the part number on your tag or a nameplate photo and we confirm mounting, shaft and ports before quoting.',
      },
    ],
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
    image: '/images/atlas-copco/l40-110-m-rf-360-s1-c-h-rotary-actuator.webp',
    imageW: 1600,
    imageH: 857,
    imageAlt: 'Replacement rotary actuator for Helac L40-110-M-RF-360, Atlas 3128341070, heavy-duty unit',
    intro:
      'Alternative rotary actuator for the Helac L40-110-M-RF-360-S1-C-H, a heavy-duty 360-degree helical actuator listed by Atlas under part number 3128341070, in the 140 kg class. The same L40-110 360-degree rear/rail-flange family also appears on RESEMIN drilling equipment under the model code L40-110-M-RL/RF-360-S1-C-H (no separate OEM part number published).',
    extraFaqs: [
      {
        q: 'Does this cover the RESEMIN L40-110-M-RL/RF-360 code?',
        a: 'The RESEMIN listing L40-110-M-RL/RF-360-S1-C-H denotes the same L40-110 360-degree rear/rail-flange actuator family as this Atlas 3128341070 build, but no separate RESEMIN OEM part number is published. Confirm the exact RL/RF mounting and ports against your actuator nameplate and drawing before ordering; the foot-mount FT builds (including RESEMIN L40-110-M-FT-220/185 and Atlas 3128341084) are different units and are not interchangeable.',
      },
    ],
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
    modelCodeUnverified: true,
    machines: ['Boomer M2d', 'Boomer XL3', 'Boomer 353', 'Boomer L2c', 'Boomer L2d'],
    image: '/images/atlas-copco/hp125-s-rf-360-s1-c-h-rotary-actuator.webp',
    imageW: 1379,
    imageH: 521,
    imageAlt: 'Replacement rotary actuator supplied for Helac HP125-S-RF-360-S1-C-H, flange and port view',
    intro:
      'Heavy-duty 360-degree alternative rotary actuator for the Atlas Copco / Epiroc part number 3128312645 (also referenced as L3D) used on Boomer face-drill rigs. Our supply records associate this build with the Helac HP125 configuration; the exact tag model code is confirmed from your nameplate before quoting.',
    applicationNote:
      'Based on our supply records, the Atlas part 3128312645 / L3D actuator is associated with the following Atlas Boomer face-drilling and development rigs. Confirmation against your machine build plate and actuator tag is recommended.',
    crossNote:
      'Atlas Copco / Epiroc part 3128312645 (L3D) is matched to a Helac HP-series build (HP125 configuration, 208 kg class) from our supply records. The complete tag model code is not assumed &mdash; it is verified against the nameplate and mounting drawing before a replacement is confirmed.',
    extraFaqs: [
      {
        q: 'Is 3128312645 the heavy rotary actuator on the Boomer M2d and XL3?',
        a: 'Part number 3128312645 (also referenced as L3D) is the heavy-duty 360-degree rotary actuator recorded on the Atlas Copco / Epiroc Boomer M2d, XL3, 353, L2c and L2d rigs, in the 208 kg class. Our supply records associate it with a Helac HP125 build; the exact tag model code varies by machine configuration and is confirmed from your nameplate and a photo or drawing before ordering, along with the mounting face, port position and rotation.',
      },
    ],
  },
  {
    model: 'L30-95-E-FT-180-S1-C-H',
    slug: 'l30-95-e-ft-180-s1-c-h',
    series: 'L30',
    seriesSlug: 'helac-l30-series',
    rotation: '180°',
    weight: '163.3 kg',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l30-65-s-rf-360.jpg',
    imageW: 384,
    imageH: 510,
    imageAlt: 'Helac L30 series helical rotary actuator, foot-mount 180-degree configuration (L30 series representative image)',
    catalogBuild: true,
    intro: 'Looking for an alternative to the Helac L30-95 rotary actuator? This page covers the 180° foot-mount catalog configuration, with a rated output torque of approximately 10,735 Nm at 207 bar. HM can help review your unit tag, mounting drawings and operating requirements before proposing a suitable solution.',
    catalogSpec: {
      pressureBar: 207,
      ratedTorqueNm: 10735,
      holdingTorqueNm: 26216,
      momentCantileverNm: 29521,
      momentStraddleNm: '75,145 Nm (180°) / 111,531 Nm (360°)',
      axialLoadKg: 4536,
      radialLoadKg: 6804,
      displacementCm3: '2,687.5 cm³ (180°)',
      weightKg: '163.3 kg (180°)',
      mountingStyles: 'FT foot mount · FF front flange · RF rear flange',
      baseLabel: 'L30-95 (9,500 in-lb class)',
      thisBuildDecode: 'E = English/SAE threads & ports · FT foot mount · 180° rotation · S1 single (cantilever) flange · C counterbalance valve · H standard seals & bearings',
      crossAlternatives: [
        {
          brand: 'HKS',
          seriesRef: 'M-DA-H F10/F5 200',
          keySpec: 'Similar torque class',
        }
      ],
      siblingAngle: {
        angle: '360°',
        code: 'L30-95-E-FT-360-S1-C-H',
        displacementCm3: '5,358.6 cm³',
        weightKg: '204.1 kg',
        straddleNm: '111,531 Nm',
      },
      source: 'Helac L30 catalog, pp. 12 & 14'
    },
    extraFaqs: [
      {
        q: 'Is L30-95-E-FT-180-S1-C-H a confirmed factory order code?',
        a: 'This configuration is derived from the Parker/Helac HY34-1001 ordering key (L30-95 frame, L30 series, E English/SAE, FT mount, 180° rotation, S1 single/cantilever flange, C counterbalance valve, H standard seals & bearings) and the published L30 performance data. It is a configuration assembled per the catalog rules, not an independently verified factory order code read from a nameplate. The exact configuration and compatibility are confirmed against the original unit tag and mounting drawings before we quote.',
      },
      {
        q: 'What is the difference between the 180° and 360° L30-95 builds?',
        a: 'They share the same L30 frame and output torque (~10,735 Nm at 207 bar) but are different effective builds: the 360° unit displaces about 5,358.6 cm³ and weighs 204.1 kg, while the 180° unit displaces about 2,687.5 cm³ and weighs 163.3 kg; the straddle (double-flange) moment rating is also higher for the longer 360° body. They suit different travel, cycle-time and mounting-geometry requirements, so choose by the required rotation and confirm against the drawing rather than treating them as interchangeable.',
      },
      {
        q: 'Can I use the HKS M-DA-H F10/F5 200 as a direct replacement?',
        a: 'The listed alternatives are at a similar published torque level, but each is built to its own frame and mounting dimensions, so a similar rating does not guarantee a fit. Send us your unit tag and mounting drawing — we overlay the flange, shaft, ports and rotation and confirm whether one is a suitable option for your machine.',
      },
      {
        q: 'Which mounting styles are available for the L30-95?',
        a: 'This page covers the E-FT-180-S1-C-H build. Send your tag code or a mounting drawing and we confirm the matching housing, flange and port arrangement against the available L30 mounting options.',
      }
    ],
  },
  {
    model: 'L30-17-E-FT-180-S1-C-H',
    slug: 'l30-17-e-ft-180-s1-c-h',
    series: 'L30',
    seriesSlug: 'helac-l30-series',
    rotation: '180°',
    weight: '34.5 kg',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l30-65-s-rf-360.jpg',
    imageW: 384,
    imageH: 510,
    imageAlt: 'Helac L30 series helical rotary actuator, foot-mount 180-degree configuration (L30 series representative image)',
    catalogBuild: true,
    intro: 'Looking for an alternative to the Helac L30-17 rotary actuator? This page covers the 180° foot-mount catalog configuration, with a rated output torque of approximately 1,921 Nm at 207 bar. HM can help review your unit tag, mounting drawings and operating requirements before proposing a suitable solution.',
    catalogSpec: {
      pressureBar: 207,
      ratedTorqueNm: 1921,
      holdingTorqueNm: 4927,
      momentCantileverNm: 5187,
      momentStraddleNm: '13,447 Nm (180°) / 19,210 Nm (360°)',
      axialLoadKg: 1361,
      radialLoadKg: 1814,
      displacementCm3: '488.3 cm³ (180°)',
      weightKg: '34.5 kg (180°)',
      mountingStyles: 'FT foot mount · FF front flange · RF rear flange',
      baseLabel: 'L30-17 (1,700 in-lb class)',
      thisBuildDecode: 'E = English/SAE threads & ports · FT foot mount · 180° rotation · S1 single (cantilever) flange · C counterbalance valve · H standard seals & bearings',
      crossAlternatives: [
        {
          brand: 'HKS',
          seriesRef: 'M-DA-H F10/F5 115',
          keySpec: 'Similar torque class',
        },
        {
          brand: 'Moveco',
          seriesRef: 'RR34',
          keySpec: 'Similar torque class',
        },
        {
          brand: 'Sungji',
          seriesRef: 'SRC-115',
          keySpec: 'Similar torque class',
        }
      ],
      siblingAngle: {
        angle: '360°',
        code: 'L30-17-E-FT-360-S1-C-H',
        displacementCm3: '983.2 cm³',
        weightKg: '45.4 kg',
        straddleNm: '19,210 Nm',
      },
      source: 'Helac L30 catalog, pp. 12 & 14'
    },
    extraFaqs: [
      {
        q: 'Is L30-17-E-FT-180-S1-C-H a confirmed factory order code?',
        a: 'This configuration is derived from the Parker/Helac HY34-1001 ordering key (L30-17 frame, L30 series, E English/SAE, FT mount, 180° rotation, S1 single/cantilever flange, C counterbalance valve, H standard seals & bearings) and the published L30 performance data. It is a configuration assembled per the catalog rules, not an independently verified factory order code read from a nameplate. The exact configuration and compatibility are confirmed against the original unit tag and mounting drawings before we quote.',
      },
      {
        q: 'What is the difference between the 180° and 360° L30-17 builds?',
        a: 'They share the same L30 frame and output torque (~1,921 Nm at 207 bar) but are different effective builds: the 360° unit displaces about 983.2 cm³ and weighs 45.4 kg, while the 180° unit displaces about 488.3 cm³ and weighs 34.5 kg; the straddle (double-flange) moment rating is also higher for the longer 360° body. They suit different travel, cycle-time and mounting-geometry requirements, so choose by the required rotation and confirm against the drawing rather than treating them as interchangeable.',
      },
      {
        q: 'Can I use the HKS M-DA-H F10/F5 115, Moveco RR34, Sungji SRC-115 as a direct replacement?',
        a: 'The listed alternatives are at a similar published torque level, but each is built to its own frame and mounting dimensions, so a similar rating does not guarantee a fit. Send us your unit tag and mounting drawing — we overlay the flange, shaft, ports and rotation and confirm whether one is a suitable option for your machine.',
      },
      {
        q: 'Which mounting styles are available for the L30-17?',
        a: 'This page covers the E-FT-180-S1-C-H build. Send your tag code or a mounting drawing and we confirm the matching housing, flange and port arrangement against the available L30 mounting options.',
      }
    ],
  },
  {
    model: 'L30-17-E-FT-360-S1-C-H',
    slug: 'l30-17-e-ft-360-s1-c-h',
    series: 'L30',
    seriesSlug: 'helac-l30-series',
    rotation: '360°',
    weight: '45.4 kg',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l30-65-s-rf-360.jpg',
    imageW: 384,
    imageH: 510,
    imageAlt: 'Helac L30 series helical rotary actuator, foot-mount 360-degree configuration (L30 series representative image)',
    catalogBuild: true,
    intro: 'Looking for an alternative to the Helac L30-17 rotary actuator? This page covers the 360° foot-mount catalog configuration, with a rated output torque of approximately 1,921 Nm at 207 bar. HM can help review your unit tag, mounting drawings and operating requirements before proposing a suitable solution.',
    catalogSpec: {
      pressureBar: 207,
      ratedTorqueNm: 1921,
      holdingTorqueNm: 4927,
      momentCantileverNm: 5187,
      momentStraddleNm: '13,447 Nm (180°) / 19,210 Nm (360°)',
      axialLoadKg: 1361,
      radialLoadKg: 1814,
      displacementCm3: '983.2 cm³ (360°)',
      weightKg: '45.4 kg (360°)',
      mountingStyles: 'FT foot mount · FF front flange · RF rear flange',
      baseLabel: 'L30-17 (1,700 in-lb class)',
      thisBuildDecode: 'E = English/SAE threads & ports · FT foot mount · 360° rotation · S1 single (cantilever) flange · C counterbalance valve · H standard seals & bearings',
      crossAlternatives: [
        {
          brand: 'HKS',
          seriesRef: 'M-DA-H F10/F5 115',
          keySpec: 'Similar torque class',
        }
      ],
      siblingAngle: {
        angle: '180°',
        code: 'L30-17-E-FT-180-S1-C-H',
        displacementCm3: '488.3 cm³',
        weightKg: '34.5 kg',
        straddleNm: '13,447 Nm',
      },
      source: 'Helac L30 catalog, pp. 12 & 14'
    },
    extraFaqs: [
      {
        q: 'Is L30-17-E-FT-360-S1-C-H a confirmed factory order code?',
        a: 'This configuration is derived from the Parker/Helac HY34-1001 ordering key (L30-17 frame, L30 series, E English/SAE, FT mount, 360° rotation, S1 single/cantilever flange, C counterbalance valve, H standard seals & bearings) and the published L30 performance data. It is a configuration assembled per the catalog rules, not an independently verified factory order code read from a nameplate. The exact configuration and compatibility are confirmed against the original unit tag and mounting drawings before we quote.',
      },
      {
        q: 'What is the difference between the 180° and 360° L30-17 builds?',
        a: 'They share the same L30 frame and output torque (~1,921 Nm at 207 bar) but are different effective builds: the 360° unit displaces about 983.2 cm³ and weighs 45.4 kg, while the 180° unit displaces about 488.3 cm³ and weighs 34.5 kg; the straddle (double-flange) moment rating is also higher for the longer 360° body. They suit different travel, cycle-time and mounting-geometry requirements, so choose by the required rotation and confirm against the drawing rather than treating them as interchangeable.',
      },
      {
        q: 'Can I use the HKS M-DA-H F10/F5 115 as a direct replacement?',
        a: 'The listed alternatives are at a similar published torque level, but each is built to its own frame and mounting dimensions, so a similar rating does not guarantee a fit. Send us your unit tag and mounting drawing — we overlay the flange, shaft, ports and rotation and confirm whether one is a suitable option for your machine.',
      },
      {
        q: 'Which mounting styles are available for the L30-17?',
        a: 'This page covers the E-FT-360-S1-C-H build. Send your tag code or a mounting drawing and we confirm the matching housing, flange and port arrangement against the available L30 mounting options.',
      }
    ],
  },
  {
    model: 'L30-125-E-FT-180-S1-C-H',
    slug: 'l30-125-e-ft-180-s1-c-h',
    series: 'L30',
    seriesSlug: 'helac-l30-series',
    rotation: '180°',
    weight: '222.3 kg',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l30-65-s-rf-360.jpg',
    imageW: 384,
    imageH: 510,
    imageAlt: 'Helac L30 series helical rotary actuator, foot-mount 180-degree configuration (L30 series representative image)',
    catalogBuild: true,
    intro: 'Looking for an alternative to the Helac L30-125 rotary actuator? This page covers the 180° foot-mount catalog configuration, with a rated output torque of approximately 14,125 Nm at 207 bar. HM can help review your unit tag, mounting drawings and operating requirements before proposing a suitable solution.',
    catalogSpec: {
      pressureBar: 207,
      ratedTorqueNm: 14125,
      holdingTorqueNm: 34578,
      momentCantileverNm: 38844,
      momentStraddleNm: '98,875 Nm (180°) / 146,335 Nm (360°)',
      axialLoadKg: 5897,
      radialLoadKg: 8165,
      displacementCm3: '3,539.6 cm³ (180°)',
      weightKg: '222.3 kg (180°)',
      mountingStyles: 'FT foot mount · FF front flange · RF rear flange',
      baseLabel: 'L30-125 (12,500 in-lb class)',
      thisBuildDecode: 'E = English/SAE threads & ports · FT foot mount · 180° rotation · S1 single (cantilever) flange · C counterbalance valve · H standard seals & bearings',
      crossAlternatives: [
        {
          brand: 'HKS',
          seriesRef: 'M-DA-H F10/F5 220',
          keySpec: 'Similar torque class',
        },
        {
          brand: 'Moveco',
          seriesRef: 'RR58 / RR61',
          keySpec: 'Similar torque class',
        }
      ],
      siblingAngle: {
        angle: '360°',
        code: 'L30-125-E-FT-360-S1-C-H',
        displacementCm3: '7,079.2 cm³',
        weightKg: '285.8 kg',
        straddleNm: '146,335 Nm',
      },
      source: 'Helac L30 catalog, pp. 12 & 14'
    },
    extraFaqs: [
      {
        q: 'Is L30-125-E-FT-180-S1-C-H a confirmed factory order code?',
        a: 'This configuration is derived from the Parker/Helac HY34-1001 ordering key (L30-125 frame, L30 series, E English/SAE, FT mount, 180° rotation, S1 single/cantilever flange, C counterbalance valve, H standard seals & bearings) and the published L30 performance data. It is a configuration assembled per the catalog rules, not an independently verified factory order code read from a nameplate. The exact configuration and compatibility are confirmed against the original unit tag and mounting drawings before we quote.',
      },
      {
        q: 'What is the difference between the 180° and 360° L30-125 builds?',
        a: 'They share the same L30 frame and output torque (~14,125 Nm at 207 bar) but are different effective builds: the 360° unit displaces about 7,079.2 cm³ and weighs 285.8 kg, while the 180° unit displaces about 3,539.6 cm³ and weighs 222.3 kg; the straddle (double-flange) moment rating is also higher for the longer 360° body. They suit different travel, cycle-time and mounting-geometry requirements, so choose by the required rotation and confirm against the drawing rather than treating them as interchangeable.',
      },
      {
        q: 'Can I use the HKS M-DA-H F10/F5 220, Moveco RR58 / RR61 as a direct replacement?',
        a: 'The listed alternatives are at a similar published torque level, but each is built to its own frame and mounting dimensions, so a similar rating does not guarantee a fit. Send us your unit tag and mounting drawing — we overlay the flange, shaft, ports and rotation and confirm whether one is a suitable option for your machine.',
      },
      {
        q: 'Which mounting styles are available for the L30-125?',
        a: 'This page covers the E-FT-180-S1-C-H build. Send your tag code or a mounting drawing and we confirm the matching housing, flange and port arrangement against the available L30 mounting options.',
      }
    ],
  },
  {
    model: 'L30-125-E-FT-360-S1-C-H',
    slug: 'l30-125-e-ft-360-s1-c-h',
    series: 'L30',
    seriesSlug: 'helac-l30-series',
    rotation: '360°',
    weight: '285.8 kg',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l30-65-s-rf-360.jpg',
    imageW: 384,
    imageH: 510,
    imageAlt: 'Helac L30 series helical rotary actuator, foot-mount 360-degree configuration (L30 series representative image)',
    catalogBuild: true,
    intro: 'Looking for an alternative to the Helac L30-125 rotary actuator? This page covers the 360° foot-mount catalog configuration, with a rated output torque of approximately 14,125 Nm at 207 bar. HM can help review your unit tag, mounting drawings and operating requirements before proposing a suitable solution.',
    catalogSpec: {
      pressureBar: 207,
      ratedTorqueNm: 14125,
      holdingTorqueNm: 34578,
      momentCantileverNm: 38844,
      momentStraddleNm: '98,875 Nm (180°) / 146,335 Nm (360°)',
      axialLoadKg: 5897,
      radialLoadKg: 8165,
      displacementCm3: '7,079.2 cm³ (360°)',
      weightKg: '285.8 kg (360°)',
      mountingStyles: 'FT foot mount · FF front flange · RF rear flange',
      baseLabel: 'L30-125 (12,500 in-lb class)',
      thisBuildDecode: 'E = English/SAE threads & ports · FT foot mount · 360° rotation · S1 single (cantilever) flange · C counterbalance valve · H standard seals & bearings',
      crossAlternatives: [
        {
          brand: 'HKS',
          seriesRef: 'M-DA-H F10/F5 220',
          keySpec: 'Similar torque class',
        }
      ],
      siblingAngle: {
        angle: '180°',
        code: 'L30-125-E-FT-180-S1-C-H',
        displacementCm3: '3,539.6 cm³',
        weightKg: '222.3 kg',
        straddleNm: '98,875 Nm',
      },
      source: 'Helac L30 catalog, pp. 12 & 14'
    },
    extraFaqs: [
      {
        q: 'Is L30-125-E-FT-360-S1-C-H a confirmed factory order code?',
        a: 'This configuration is derived from the Parker/Helac HY34-1001 ordering key (L30-125 frame, L30 series, E English/SAE, FT mount, 360° rotation, S1 single/cantilever flange, C counterbalance valve, H standard seals & bearings) and the published L30 performance data. It is a configuration assembled per the catalog rules, not an independently verified factory order code read from a nameplate. The exact configuration and compatibility are confirmed against the original unit tag and mounting drawings before we quote.',
      },
      {
        q: 'What is the difference between the 180° and 360° L30-125 builds?',
        a: 'They share the same L30 frame and output torque (~14,125 Nm at 207 bar) but are different effective builds: the 360° unit displaces about 7,079.2 cm³ and weighs 285.8 kg, while the 180° unit displaces about 3,539.6 cm³ and weighs 222.3 kg; the straddle (double-flange) moment rating is also higher for the longer 360° body. They suit different travel, cycle-time and mounting-geometry requirements, so choose by the required rotation and confirm against the drawing rather than treating them as interchangeable.',
      },
      {
        q: 'Can I use the HKS M-DA-H F10/F5 220 as a direct replacement?',
        a: 'The listed alternatives are at a similar published torque level, but each is built to its own frame and mounting dimensions, so a similar rating does not guarantee a fit. Send us your unit tag and mounting drawing — we overlay the flange, shaft, ports and rotation and confirm whether one is a suitable option for your machine.',
      },
      {
        q: 'Which mounting styles are available for the L30-125?',
        a: 'This page covers the E-FT-360-S1-C-H build. Send your tag code or a mounting drawing and we confirm the matching housing, flange and port arrangement against the available L30 mounting options.',
      }
    ],
  },
  {
    model: 'L30-165-E-FT-180-S1-C-H',
    slug: 'l30-165-e-ft-180-s1-c-h',
    series: 'L30',
    seriesSlug: 'helac-l30-series',
    rotation: '180°',
    weight: '276.7 kg',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l30-65-s-rf-360.jpg',
    imageW: 384,
    imageH: 510,
    imageAlt: 'Helac L30 series helical rotary actuator, foot-mount 180-degree configuration (L30 series representative image)',
    catalogBuild: true,
    intro: 'Looking for an alternative to the Helac L30-165 rotary actuator? This page covers the 180° foot-mount catalog configuration, with a rated output torque of approximately 18,645 Nm at 207 bar. HM can help review your unit tag, mounting drawings and operating requirements before proposing a suitable solution.',
    catalogSpec: {
      pressureBar: 207,
      ratedTorqueNm: 18645,
      holdingTorqueNm: 45652,
      momentCantileverNm: 55935,
      momentStraddleNm: '130,515 Nm (180°) / 197,750 Nm (360°)',
      axialLoadKg: 6804,
      radialLoadKg: 9979,
      displacementCm3: '4,653.9 cm³ (180°)',
      weightKg: '276.7 kg (180°)',
      mountingStyles: 'FT foot mount · FF front flange · RF rear flange',
      baseLabel: 'L30-165 (16,500 in-lb class)',
      thisBuildDecode: 'E = English/SAE threads & ports · FT foot mount · 180° rotation · S1 single (cantilever) flange · C counterbalance valve · H standard seals & bearings',
      crossAlternatives: [
        {
          brand: 'HKS',
          seriesRef: 'M-DA-H F10/F5 245',
          keySpec: 'Similar torque class',
        },
        {
          brand: 'Moveco',
          seriesRef: 'RR66',
          keySpec: 'Similar torque class',
        }
      ],
      siblingAngle: {
        angle: '360°',
        code: 'L30-165-E-FT-360-S1-C-H',
        displacementCm3: '9,324.3 cm³',
        weightKg: '367.4 kg',
        straddleNm: '197,750 Nm',
      },
      source: 'Helac L30 catalog, pp. 12 & 14'
    },
    extraFaqs: [
      {
        q: 'Is L30-165-E-FT-180-S1-C-H a confirmed factory order code?',
        a: 'This configuration is derived from the Parker/Helac HY34-1001 ordering key (L30-165 frame, L30 series, E English/SAE, FT mount, 180° rotation, S1 single/cantilever flange, C counterbalance valve, H standard seals & bearings) and the published L30 performance data. It is a configuration assembled per the catalog rules, not an independently verified factory order code read from a nameplate. The exact configuration and compatibility are confirmed against the original unit tag and mounting drawings before we quote.',
      },
      {
        q: 'What is the difference between the 180° and 360° L30-165 builds?',
        a: 'They share the same L30 frame and output torque (~18,645 Nm at 207 bar) but are different effective builds: the 360° unit displaces about 9,324.3 cm³ and weighs 367.4 kg, while the 180° unit displaces about 4,653.9 cm³ and weighs 276.7 kg; the straddle (double-flange) moment rating is also higher for the longer 360° body. They suit different travel, cycle-time and mounting-geometry requirements, so choose by the required rotation and confirm against the drawing rather than treating them as interchangeable.',
      },
      {
        q: 'Can I use the HKS M-DA-H F10/F5 245, Moveco RR66 as a direct replacement?',
        a: 'The listed alternatives are at a similar published torque level, but each is built to its own frame and mounting dimensions, so a similar rating does not guarantee a fit. Send us your unit tag and mounting drawing — we overlay the flange, shaft, ports and rotation and confirm whether one is a suitable option for your machine.',
      },
      {
        q: 'Which mounting styles are available for the L30-165?',
        a: 'This page covers the E-FT-180-S1-C-H build. Send your tag code or a mounting drawing and we confirm the matching housing, flange and port arrangement against the available L30 mounting options.',
      }
    ],
  },
  {
    model: 'L30-165-E-FT-360-S1-C-H',
    slug: 'l30-165-e-ft-360-s1-c-h',
    series: 'L30',
    seriesSlug: 'helac-l30-series',
    rotation: '360°',
    weight: '367.4 kg',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l30-65-s-rf-360.jpg',
    imageW: 384,
    imageH: 510,
    imageAlt: 'Helac L30 series helical rotary actuator, foot-mount 360-degree configuration (L30 series representative image)',
    catalogBuild: true,
    intro: 'Looking for an alternative to the Helac L30-165 rotary actuator? This page covers the 360° foot-mount catalog configuration, with a rated output torque of approximately 18,645 Nm at 207 bar. HM can help review your unit tag, mounting drawings and operating requirements before proposing a suitable solution.',
    catalogSpec: {
      pressureBar: 207,
      ratedTorqueNm: 18645,
      holdingTorqueNm: 45652,
      momentCantileverNm: 55935,
      momentStraddleNm: '130,515 Nm (180°) / 197,750 Nm (360°)',
      axialLoadKg: 6804,
      radialLoadKg: 9979,
      displacementCm3: '9,324.3 cm³ (360°)',
      weightKg: '367.4 kg (360°)',
      mountingStyles: 'FT foot mount · FF front flange · RF rear flange',
      baseLabel: 'L30-165 (16,500 in-lb class)',
      thisBuildDecode: 'E = English/SAE threads & ports · FT foot mount · 360° rotation · S1 single (cantilever) flange · C counterbalance valve · H standard seals & bearings',
      crossAlternatives: [
        {
          brand: 'HKS',
          seriesRef: 'M-DA-H F10/F5 245',
          keySpec: 'Similar torque class',
        }
      ],
      siblingAngle: {
        angle: '180°',
        code: 'L30-165-E-FT-180-S1-C-H',
        displacementCm3: '4,653.9 cm³',
        weightKg: '276.7 kg',
        straddleNm: '130,515 Nm',
      },
      source: 'Helac L30 catalog, pp. 12 & 14'
    },
    extraFaqs: [
      {
        q: 'Is L30-165-E-FT-360-S1-C-H a confirmed factory order code?',
        a: 'This configuration is derived from the Parker/Helac HY34-1001 ordering key (L30-165 frame, L30 series, E English/SAE, FT mount, 360° rotation, S1 single/cantilever flange, C counterbalance valve, H standard seals & bearings) and the published L30 performance data. It is a configuration assembled per the catalog rules, not an independently verified factory order code read from a nameplate. The exact configuration and compatibility are confirmed against the original unit tag and mounting drawings before we quote.',
      },
      {
        q: 'What is the difference between the 180° and 360° L30-165 builds?',
        a: 'They share the same L30 frame and output torque (~18,645 Nm at 207 bar) but are different effective builds: the 360° unit displaces about 9,324.3 cm³ and weighs 367.4 kg, while the 180° unit displaces about 4,653.9 cm³ and weighs 276.7 kg; the straddle (double-flange) moment rating is also higher for the longer 360° body. They suit different travel, cycle-time and mounting-geometry requirements, so choose by the required rotation and confirm against the drawing rather than treating them as interchangeable.',
      },
      {
        q: 'Can I use the HKS M-DA-H F10/F5 245 as a direct replacement?',
        a: 'The listed alternatives are at a similar published torque level, but each is built to its own frame and mounting dimensions, so a similar rating does not guarantee a fit. Send us your unit tag and mounting drawing — we overlay the flange, shaft, ports and rotation and confirm whether one is a suitable option for your machine.',
      },
      {
        q: 'Which mounting styles are available for the L30-165?',
        a: 'This page covers the E-FT-360-S1-C-H build. Send your tag code or a mounting drawing and we confirm the matching housing, flange and port arrangement against the available L30 mounting options.',
      }
    ],
  },
  {
    model: 'L30-215-E-FT-180-S1-C-H',
    slug: 'l30-215-e-ft-180-s1-c-h',
    series: 'L30',
    seriesSlug: 'helac-l30-series',
    rotation: '180°',
    weight: '358.3 kg',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l30-65-s-rf-360.jpg',
    imageW: 384,
    imageH: 510,
    imageAlt: 'Helac L30 series helical rotary actuator, foot-mount 180-degree configuration (L30 series representative image)',
    catalogBuild: true,
    intro: 'Looking for an alternative to the Helac L30-215 rotary actuator? This page covers the 180° foot-mount catalog configuration, with a rated output torque of approximately 24,295 Nm at 207 bar. HM can help review your unit tag, mounting drawings and operating requirements before proposing a suitable solution.',
    catalogSpec: {
      pressureBar: 207,
      ratedTorqueNm: 24295,
      holdingTorqueNm: 58760,
      momentCantileverNm: 72885,
      momentStraddleNm: '170,065 Nm (180°) / 256,510 Nm (360°)',
      axialLoadKg: 8165,
      radialLoadKg: 11794,
      displacementCm3: '5,997.7 cm³ (180°)',
      weightKg: '358.3 kg (180°)',
      mountingStyles: 'FT foot mount · FF front flange · RF rear flange',
      baseLabel: 'L30-215 (21,500 in-lb class)',
      thisBuildDecode: 'E = English/SAE threads & ports · FT foot mount · 180° rotation · S1 single (cantilever) flange · C counterbalance valve · H standard seals & bearings',
      crossAlternatives: [
        {
          brand: 'HKS',
          seriesRef: 'M-DA-H F10/F5 265',
          keySpec: 'Similar torque class',
        },
        {
          brand: 'Moveco',
          seriesRef: 'RR72',
          keySpec: 'Similar torque class',
        }
      ],
      siblingAngle: {
        angle: '360°',
        code: 'L30-215-E-FT-360-S1-C-H',
        displacementCm3: '11,995.4 cm³',
        weightKg: '453.6 kg',
        straddleNm: '256,510 Nm',
      },
      source: 'Helac L30 catalog, pp. 12 & 14'
    },
    extraFaqs: [
      {
        q: 'Is L30-215-E-FT-180-S1-C-H a confirmed factory order code?',
        a: 'This configuration is derived from the Parker/Helac HY34-1001 ordering key (L30-215 frame, L30 series, E English/SAE, FT mount, 180° rotation, S1 single/cantilever flange, C counterbalance valve, H standard seals & bearings) and the published L30 performance data. It is a configuration assembled per the catalog rules, not an independently verified factory order code read from a nameplate. The exact configuration and compatibility are confirmed against the original unit tag and mounting drawings before we quote.',
      },
      {
        q: 'What is the difference between the 180° and 360° L30-215 builds?',
        a: 'They share the same L30 frame and output torque (~24,295 Nm at 207 bar) but are different effective builds: the 360° unit displaces about 11,995.4 cm³ and weighs 453.6 kg, while the 180° unit displaces about 5,997.7 cm³ and weighs 358.3 kg; the straddle (double-flange) moment rating is also higher for the longer 360° body. They suit different travel, cycle-time and mounting-geometry requirements, so choose by the required rotation and confirm against the drawing rather than treating them as interchangeable.',
      },
      {
        q: 'Can I use the HKS M-DA-H F10/F5 265, Moveco RR72 as a direct replacement?',
        a: 'The listed alternatives are at a similar published torque level, but each is built to its own frame and mounting dimensions, so a similar rating does not guarantee a fit. Send us your unit tag and mounting drawing — we overlay the flange, shaft, ports and rotation and confirm whether one is a suitable option for your machine.',
      },
      {
        q: 'Which mounting styles are available for the L30-215?',
        a: 'This page covers the E-FT-180-S1-C-H build. Send your tag code or a mounting drawing and we confirm the matching housing, flange and port arrangement against the available L30 mounting options.',
      }
    ],
  },
  {
    model: 'L30-215-E-FT-360-S1-C-H',
    slug: 'l30-215-e-ft-360-s1-c-h',
    series: 'L30',
    seriesSlug: 'helac-l30-series',
    rotation: '360°',
    weight: '453.6 kg',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l30-65-s-rf-360.jpg',
    imageW: 384,
    imageH: 510,
    imageAlt: 'Helac L30 series helical rotary actuator, foot-mount 360-degree configuration (L30 series representative image)',
    catalogBuild: true,
    intro: 'Looking for an alternative to the Helac L30-215 rotary actuator? This page covers the 360° foot-mount catalog configuration, with a rated output torque of approximately 24,295 Nm at 207 bar. HM can help review your unit tag, mounting drawings and operating requirements before proposing a suitable solution.',
    catalogSpec: {
      pressureBar: 207,
      ratedTorqueNm: 24295,
      holdingTorqueNm: 58760,
      momentCantileverNm: 72885,
      momentStraddleNm: '170,065 Nm (180°) / 256,510 Nm (360°)',
      axialLoadKg: 8165,
      radialLoadKg: 11794,
      displacementCm3: '11,995.4 cm³ (360°)',
      weightKg: '453.6 kg (360°)',
      mountingStyles: 'FT foot mount · FF front flange · RF rear flange',
      baseLabel: 'L30-215 (21,500 in-lb class)',
      thisBuildDecode: 'E = English/SAE threads & ports · FT foot mount · 360° rotation · S1 single (cantilever) flange · C counterbalance valve · H standard seals & bearings',
      crossAlternatives: [
        {
          brand: 'HKS',
          seriesRef: 'M-DA-H F10/F5 265',
          keySpec: 'Similar torque class',
        }
      ],
      siblingAngle: {
        angle: '180°',
        code: 'L30-215-E-FT-180-S1-C-H',
        displacementCm3: '5,997.7 cm³',
        weightKg: '358.3 kg',
        straddleNm: '170,065 Nm',
      },
      source: 'Helac L30 catalog, pp. 12 & 14'
    },
    extraFaqs: [
      {
        q: 'Is L30-215-E-FT-360-S1-C-H a confirmed factory order code?',
        a: 'This configuration is derived from the Parker/Helac HY34-1001 ordering key (L30-215 frame, L30 series, E English/SAE, FT mount, 360° rotation, S1 single/cantilever flange, C counterbalance valve, H standard seals & bearings) and the published L30 performance data. It is a configuration assembled per the catalog rules, not an independently verified factory order code read from a nameplate. The exact configuration and compatibility are confirmed against the original unit tag and mounting drawings before we quote.',
      },
      {
        q: 'What is the difference between the 180° and 360° L30-215 builds?',
        a: 'They share the same L30 frame and output torque (~24,295 Nm at 207 bar) but are different effective builds: the 360° unit displaces about 11,995.4 cm³ and weighs 453.6 kg, while the 180° unit displaces about 5,997.7 cm³ and weighs 358.3 kg; the straddle (double-flange) moment rating is also higher for the longer 360° body. They suit different travel, cycle-time and mounting-geometry requirements, so choose by the required rotation and confirm against the drawing rather than treating them as interchangeable.',
      },
      {
        q: 'Can I use the HKS M-DA-H F10/F5 265 as a direct replacement?',
        a: 'The listed alternatives are at a similar published torque level, but each is built to its own frame and mounting dimensions, so a similar rating does not guarantee a fit. Send us your unit tag and mounting drawing — we overlay the flange, shaft, ports and rotation and confirm whether one is a suitable option for your machine.',
      },
      {
        q: 'Which mounting styles are available for the L30-215?',
        a: 'This page covers the E-FT-360-S1-C-H build. Send your tag code or a mounting drawing and we confirm the matching housing, flange and port arrangement against the available L30 mounting options.',
      }
    ],
  },
  {
    model: 'L10-15-E-RF-180-S1-C-H',
    slug: 'l10-15-e-rf-180-s1-c-h',
    series: 'L10',
    seriesSlug: 'helac-l10-series',
    rotation: '180°',
    weight: '43.1 kg',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l10-5-5-m-rf-360.jpg',
    imageW: 333,
    imageH: 246,
    imageAlt: 'Helac L10 series helical rotary actuator, rear-flange 180-degree configuration (L10 series representative image)',
    catalogBuild: true,
    intro: 'Looking for an alternative to the Helac L10-15 rotary actuator? This page covers the 180° rear-flange catalog configuration, with a rated output torque of approximately 1,695 Nm at 207 bar. HM can help review your unit tag, mounting drawings and operating requirements before proposing a suitable solution.',
    catalogSpec: {
      pressureBar: 207,
      ratedTorqueNm: 1695,
      holdingTorqueNm: 5650,
      momentCantileverNm: 9040,
      axialLoadKg: 4990,
      radialLoadKg: 4990,
      displacementCm3: '552.2 cm³ (180°)',
      weightKg: '43.1 kg (180°)',
      mountingStyles: 'RF rear flange',
      baseLabel: 'L10-15 (1,500 in-lb class)',
      thisBuildDecode: 'E = English/SAE threads & ports · RF rear flange · 180° rotation · S1 single (cantilever) flange · C counterbalance valve · H standard seals & bearings',
      crossAlternatives: [
        {
          brand: 'HKS',
          seriesRef: 'M-DA-H 90',
          keySpec: 'Similar torque class',
        },
        {
          brand: 'Sungji',
          seriesRef: 'SRA-160',
          keySpec: 'Similar torque class',
        }
      ],
      siblingAngle: {
        angle: '360°',
        code: 'L10-15-E-RF-360-S1-C-H',
        displacementCm3: '1,104.5 cm³',
        weightKg: '54.4 kg',
        straddleNm: '',
      },
      source: 'Helac L10 catalog, p. 8'
    },
    extraFaqs: [
      {
        q: 'Is L10-15-E-RF-180-S1-C-H a confirmed factory order code?',
        a: 'This configuration is derived from the Parker/Helac HY34-1001 ordering key (L10-15 frame, L10 series, E English/SAE, RF mount, 180° rotation, S1 single/cantilever flange, C counterbalance valve, H standard seals & bearings) and the published L10 performance data. It is a configuration assembled per the catalog rules, not an independently verified factory order code read from a nameplate. The exact configuration and compatibility are confirmed against the original unit tag and mounting drawings before we quote.',
      },
      {
        q: 'What is the difference between the 180° and 360° L10-15 builds?',
        a: 'They share the same L10 frame and output torque (~1,695 Nm at 207 bar) but are different effective builds: the 360° unit displaces about 1,104.5 cm³ and weighs 54.4 kg, while the 180° unit displaces about 552.2 cm³ and weighs 43.1 kg. They suit different travel, cycle-time and mounting-geometry requirements, so choose by the required rotation and confirm against the drawing rather than treating them as interchangeable.',
      },
      {
        q: 'Can I use the HKS M-DA-H 90, Sungji SRA-160 as a direct replacement?',
        a: 'The listed alternatives are at a similar published torque level, but each is built to its own frame and mounting dimensions, so a similar rating does not guarantee a fit. Send us your unit tag and mounting drawing — we overlay the flange, shaft, ports and rotation and confirm whether one is a suitable option for your machine.',
      },
      {
        q: 'Which mounting styles are available for the L10-15?',
        a: 'This page covers the E-RF-180-S1-C-H build. Send your tag code or a mounting drawing and we confirm the matching housing, flange and port arrangement against the available L10 mounting options.',
      }
    ],
  },
  {
    model: 'L10-15-E-RF-360-S1-C-H',
    slug: 'l10-15-e-rf-360-s1-c-h',
    series: 'L10',
    seriesSlug: 'helac-l10-series',
    rotation: '360°',
    weight: '54.4 kg',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l10-5-5-m-rf-360.jpg',
    imageW: 333,
    imageH: 246,
    imageAlt: 'Helac L10 series helical rotary actuator, rear-flange 360-degree configuration (L10 series representative image)',
    catalogBuild: true,
    intro: 'Looking for an alternative to the Helac L10-15 rotary actuator? This page covers the 360° rear-flange catalog configuration, with a rated output torque of approximately 1,695 Nm at 207 bar. HM can help review your unit tag, mounting drawings and operating requirements before proposing a suitable solution.',
    catalogSpec: {
      pressureBar: 207,
      ratedTorqueNm: 1695,
      holdingTorqueNm: 5650,
      momentCantileverNm: 9040,
      axialLoadKg: 4990,
      radialLoadKg: 4990,
      displacementCm3: '1,104.5 cm³ (360°)',
      weightKg: '54.4 kg (360°)',
      mountingStyles: 'RF rear flange',
      baseLabel: 'L10-15 (1,500 in-lb class)',
      thisBuildDecode: 'E = English/SAE threads & ports · RF rear flange · 360° rotation · S1 single (cantilever) flange · C counterbalance valve · H standard seals & bearings',
      crossAlternatives: [
        {
          brand: 'HKS',
          seriesRef: 'M-DA-H 90',
          keySpec: 'Similar torque class',
        }
      ],
      siblingAngle: {
        angle: '180°',
        code: 'L10-15-E-RF-180-S1-C-H',
        displacementCm3: '552.2 cm³',
        weightKg: '43.1 kg',
        straddleNm: '',
      },
      source: 'Helac L10 catalog, p. 8'
    },
    extraFaqs: [
      {
        q: 'Is L10-15-E-RF-360-S1-C-H a confirmed factory order code?',
        a: 'This configuration is derived from the Parker/Helac HY34-1001 ordering key (L10-15 frame, L10 series, E English/SAE, RF mount, 360° rotation, S1 single/cantilever flange, C counterbalance valve, H standard seals & bearings) and the published L10 performance data. It is a configuration assembled per the catalog rules, not an independently verified factory order code read from a nameplate. The exact configuration and compatibility are confirmed against the original unit tag and mounting drawings before we quote.',
      },
      {
        q: 'What is the difference between the 180° and 360° L10-15 builds?',
        a: 'They share the same L10 frame and output torque (~1,695 Nm at 207 bar) but are different effective builds: the 360° unit displaces about 1,104.5 cm³ and weighs 54.4 kg, while the 180° unit displaces about 552.2 cm³ and weighs 43.1 kg. They suit different travel, cycle-time and mounting-geometry requirements, so choose by the required rotation and confirm against the drawing rather than treating them as interchangeable.',
      },
      {
        q: 'Can I use the HKS M-DA-H 90 as a direct replacement?',
        a: 'The listed alternatives are at a similar published torque level, but each is built to its own frame and mounting dimensions, so a similar rating does not guarantee a fit. Send us your unit tag and mounting drawing — we overlay the flange, shaft, ports and rotation and confirm whether one is a suitable option for your machine.',
      },
      {
        q: 'Which mounting styles are available for the L10-15?',
        a: 'This page covers the E-RF-360-S1-C-H build. Send your tag code or a mounting drawing and we confirm the matching housing, flange and port arrangement against the available L10 mounting options.',
      }
    ],
  },
  {
    model: 'L10-25-E-RF-180-S1-C-H',
    slug: 'l10-25-e-rf-180-s1-c-h',
    series: 'L10',
    seriesSlug: 'helac-l10-series',
    rotation: '180°',
    weight: '56.7 kg',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l10-5-5-m-rf-360.jpg',
    imageW: 333,
    imageH: 246,
    imageAlt: 'Helac L10 series helical rotary actuator, rear-flange 180-degree configuration (L10 series representative image)',
    catalogBuild: true,
    intro: 'Looking for an alternative to the Helac L10-25 rotary actuator? This page covers the 180° rear-flange catalog configuration, with a rated output torque of approximately 2,825 Nm at 207 bar. HM can help review your unit tag, mounting drawings and operating requirements before proposing a suitable solution.',
    catalogSpec: {
      pressureBar: 207,
      ratedTorqueNm: 2825,
      holdingTorqueNm: 9379,
      momentCantileverNm: 11300,
      axialLoadKg: 6804,
      radialLoadKg: 6804,
      displacementCm3: '914.4 cm³ (180°)',
      weightKg: '56.7 kg (180°)',
      mountingStyles: 'RF rear flange',
      baseLabel: 'L10-25 (2,500 in-lb class)',
      thisBuildDecode: 'E = English/SAE threads & ports · RF rear flange · 180° rotation · S1 single (cantilever) flange · C counterbalance valve · H standard seals & bearings',
      crossAlternatives: [
        {
          brand: 'HKS',
          seriesRef: 'M-DA-H 100',
          keySpec: 'Similar torque class',
        }
      ],
      siblingAngle: {
        angle: '360°',
        code: 'L10-25-E-RF-360-S1-C-H',
        displacementCm3: '1,828.8 cm³',
        weightKg: '83 kg',
        straddleNm: '',
      },
      source: 'Helac L10 catalog, p. 8'
    },
    extraFaqs: [
      {
        q: 'Is L10-25-E-RF-180-S1-C-H a confirmed factory order code?',
        a: 'This configuration is derived from the Parker/Helac HY34-1001 ordering key (L10-25 frame, L10 series, E English/SAE, RF mount, 180° rotation, S1 single/cantilever flange, C counterbalance valve, H standard seals & bearings) and the published L10 performance data. It is a configuration assembled per the catalog rules, not an independently verified factory order code read from a nameplate. The exact configuration and compatibility are confirmed against the original unit tag and mounting drawings before we quote.',
      },
      {
        q: 'What is the difference between the 180° and 360° L10-25 builds?',
        a: 'They share the same L10 frame and output torque (~2,825 Nm at 207 bar) but are different effective builds: the 360° unit displaces about 1,828.8 cm³ and weighs 83 kg, while the 180° unit displaces about 914.4 cm³ and weighs 56.7 kg. They suit different travel, cycle-time and mounting-geometry requirements, so choose by the required rotation and confirm against the drawing rather than treating them as interchangeable.',
      },
      {
        q: 'Can I use the HKS M-DA-H 100 as a direct replacement?',
        a: 'The listed alternatives are at a similar published torque level, but each is built to its own frame and mounting dimensions, so a similar rating does not guarantee a fit. Send us your unit tag and mounting drawing — we overlay the flange, shaft, ports and rotation and confirm whether one is a suitable option for your machine.',
      },
      {
        q: 'Which mounting styles are available for the L10-25?',
        a: 'This page covers the E-RF-180-S1-C-H build. Send your tag code or a mounting drawing and we confirm the matching housing, flange and port arrangement against the available L10 mounting options.',
      }
    ],
  },
  {
    model: 'L10-25-E-RF-360-S1-C-H',
    slug: 'l10-25-e-rf-360-s1-c-h',
    series: 'L10',
    seriesSlug: 'helac-l10-series',
    rotation: '360°',
    weight: '83 kg',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l10-5-5-m-rf-360.jpg',
    imageW: 333,
    imageH: 246,
    imageAlt: 'Helac L10 series helical rotary actuator, rear-flange 360-degree configuration (L10 series representative image)',
    catalogBuild: true,
    intro: 'Looking for an alternative to the Helac L10-25 rotary actuator? This page covers the 360° rear-flange catalog configuration, with a rated output torque of approximately 2,825 Nm at 207 bar. HM can help review your unit tag, mounting drawings and operating requirements before proposing a suitable solution.',
    catalogSpec: {
      pressureBar: 207,
      ratedTorqueNm: 2825,
      holdingTorqueNm: 9379,
      momentCantileverNm: 11300,
      axialLoadKg: 6804,
      radialLoadKg: 6804,
      displacementCm3: '1,828.8 cm³ (360°)',
      weightKg: '83 kg (360°)',
      mountingStyles: 'RF rear flange',
      baseLabel: 'L10-25 (2,500 in-lb class)',
      thisBuildDecode: 'E = English/SAE threads & ports · RF rear flange · 360° rotation · S1 single (cantilever) flange · C counterbalance valve · H standard seals & bearings',
      crossAlternatives: [
        {
          brand: 'HKS',
          seriesRef: 'M-DA-H 100',
          keySpec: 'Similar torque class',
        }
      ],
      siblingAngle: {
        angle: '180°',
        code: 'L10-25-E-RF-180-S1-C-H',
        displacementCm3: '914.4 cm³',
        weightKg: '56.7 kg',
        straddleNm: '',
      },
      source: 'Helac L10 catalog, p. 8'
    },
    extraFaqs: [
      {
        q: 'Is L10-25-E-RF-360-S1-C-H a confirmed factory order code?',
        a: 'This configuration is derived from the Parker/Helac HY34-1001 ordering key (L10-25 frame, L10 series, E English/SAE, RF mount, 360° rotation, S1 single/cantilever flange, C counterbalance valve, H standard seals & bearings) and the published L10 performance data. It is a configuration assembled per the catalog rules, not an independently verified factory order code read from a nameplate. The exact configuration and compatibility are confirmed against the original unit tag and mounting drawings before we quote.',
      },
      {
        q: 'What is the difference between the 180° and 360° L10-25 builds?',
        a: 'They share the same L10 frame and output torque (~2,825 Nm at 207 bar) but are different effective builds: the 360° unit displaces about 1,828.8 cm³ and weighs 83 kg, while the 180° unit displaces about 914.4 cm³ and weighs 56.7 kg. They suit different travel, cycle-time and mounting-geometry requirements, so choose by the required rotation and confirm against the drawing rather than treating them as interchangeable.',
      },
      {
        q: 'Can I use the HKS M-DA-H 100 as a direct replacement?',
        a: 'The listed alternatives are at a similar published torque level, but each is built to its own frame and mounting dimensions, so a similar rating does not guarantee a fit. Send us your unit tag and mounting drawing — we overlay the flange, shaft, ports and rotation and confirm whether one is a suitable option for your machine.',
      },
      {
        q: 'Which mounting styles are available for the L10-25?',
        a: 'This page covers the E-RF-360-S1-C-H build. Send your tag code or a mounting drawing and we confirm the matching housing, flange and port arrangement against the available L10 mounting options.',
      }
    ],
  },
  {
    model: 'L20-15-E-FT-180-S1-C-H',
    slug: 'l20-15-e-ft-180-s1-c-h',
    series: 'L20',
    seriesSlug: 'helac-l20-series',
    rotation: '180°',
    weight: '29.9 kg',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l20-15-e-cl-180-90.jpg',
    imageW: 291,
    imageH: 323,
    imageAlt: 'Helac L20 series helical rotary actuator, foot-mount 180-degree configuration (L20 series representative image)',
    catalogBuild: true,
    intro: 'Looking for an alternative to the Helac L20-15 rotary actuator? This page covers the 180° foot-mount catalog configuration, with a rated output torque of approximately 1,695 Nm at 207 bar. HM can help review your unit tag, mounting drawings and operating requirements before proposing a suitable solution.',
    catalogSpec: {
      pressureBar: 207,
      ratedTorqueNm: 1695,
      holdingTorqueNm: 4375,
      momentCantileverNm: 5424,
      momentStraddleNm: '10,170 Nm',
      axialLoadKg: 998,
      radialLoadKg: 4187,
      displacementCm3: '435.9 cm³',
      weightKg: '29.9 kg',
      mountingStyles: 'FT foot mount · FF front flange · RF rear flange · CL clevis',
      baseLabel: 'L20-15 (1,500 in-lb class)',
      thisBuildDecode: 'E = English/SAE threads & ports · FT foot mount · 180° rotation · S1 single (cantilever) flange · C counterbalance valve · H standard seals & bearings',
      crossAlternatives: [
        {
          brand: 'HKS',
          seriesRef: 'M-DA-H-F7 120',
          keySpec: 'Similar torque class',
        },
        {
          brand: 'Moveco',
          seriesRef: 'RP33',
          keySpec: 'Similar torque class',
        },
        {
          brand: 'Sungji',
          seriesRef: 'SRB-115',
          keySpec: 'Similar torque class',
        }
      ],
      source: 'Helac L20 catalog, p. 10'
    },
    extraFaqs: [
      {
        q: 'What other order codes are available in this same series?',
        a: 'Other catalog configurations of the same actuator family include: L20-15-E-FT-360-S1-C-H. These are complete Helac order codes differing in rotation angle, ports, valve or mounting/flange arrangement; they are not interchangeable with the configuration shown on this page. Send the exact code on your unit tag or a mounting drawing and we confirm the matching build before quoting.',
      },
      {
        q: 'Is L20-15-E-FT-180-S1-C-H a confirmed factory order code?',
        a: 'This configuration is derived from the Parker/Helac HY34-1001 ordering key (L20-15 frame, L20 series, E English/SAE, FT mount, 180° rotation, S1 single/cantilever flange, C counterbalance valve, H standard seals & bearings) and the published L20 performance data. It is a configuration assembled per the catalog rules, not an independently verified factory order code read from a nameplate. The exact configuration and compatibility are confirmed against the original unit tag and mounting drawings before we quote.',
      },
      {
        q: 'Can I use the HKS M-DA-H-F7 120, Moveco RP33, Sungji SRB-115 as a direct replacement?',
        a: 'The listed alternatives are at a similar published torque level, but each is built to its own frame and mounting dimensions, so a similar rating does not guarantee a fit. Send us your unit tag and mounting drawing — we overlay the flange, shaft, ports and rotation and confirm whether one is a suitable option for your machine.',
      },
      {
        q: 'Which mounting styles are available for the L20-15?',
        a: 'This page covers the E-FT-180-S1-C-H build. Send your tag code or a mounting drawing and we confirm the matching housing, flange and port arrangement against the available L20 mounting options.',
      }
    ],
  },
  {
    model: 'L20-39-E-FT-180-S1-C-H',
    slug: 'l20-39-e-ft-180-s1-c-h',
    series: 'L20',
    seriesSlug: 'helac-l20-series',
    rotation: '180°',
    weight: '76.7 kg',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l20-15-e-cl-180-90.jpg',
    imageW: 291,
    imageH: 323,
    imageAlt: 'Helac L20 series helical rotary actuator, foot-mount 180-degree configuration (L20 series representative image)',
    catalogBuild: true,
    intro: 'Looking for an alternative to the Helac L20-39 rotary actuator? This page covers the 180° foot-mount catalog configuration, with a rated output torque of approximately 4,407 Nm at 207 bar. HM can help review your unit tag, mounting drawings and operating requirements before proposing a suitable solution.',
    catalogSpec: {
      pressureBar: 207,
      ratedTorqueNm: 4407,
      holdingTorqueNm: 10532,
      momentCantileverNm: 15820,
      momentStraddleNm: '31,640 Nm',
      axialLoadKg: 1769,
      radialLoadKg: 9526,
      displacementCm3: '1,076.6 cm³',
      weightKg: '76.7 kg',
      mountingStyles: 'FT foot mount · FF front flange · RF rear flange · CL clevis',
      baseLabel: 'L20-39 (3,900 in-lb class)',
      thisBuildDecode: 'E = English/SAE threads & ports · FT foot mount · 180° rotation · S1 single (cantilever) flange · C counterbalance valve · H standard seals & bearings',
      crossAlternatives: [
        {
          brand: 'HKS',
          seriesRef: 'M-DA-H-F7 145',
          keySpec: 'Similar torque class',
        },
        {
          brand: 'Moveco',
          seriesRef: 'RP46',
          keySpec: 'Similar torque class',
        },
        {
          brand: 'Sungji',
          seriesRef: 'SRB-160',
          keySpec: 'Similar torque class',
        }
      ],
      source: 'Helac L20 catalog, p. 10'
    },
    extraFaqs: [
      {
        q: 'What other order codes are available in this same series?',
        a: 'Other catalog configurations of the same actuator family include: L20-39-E-FT-360-S1-C-H. These are complete Helac order codes differing in rotation angle, ports, valve or mounting/flange arrangement; they are not interchangeable with the configuration shown on this page. Send the exact code on your unit tag or a mounting drawing and we confirm the matching build before quoting.',
      },
      {
        q: 'Is L20-39-E-FT-180-S1-C-H a confirmed factory order code?',
        a: 'This configuration is derived from the Parker/Helac HY34-1001 ordering key (L20-39 frame, L20 series, E English/SAE, FT mount, 180° rotation, S1 single/cantilever flange, C counterbalance valve, H standard seals & bearings) and the published L20 performance data. It is a configuration assembled per the catalog rules, not an independently verified factory order code read from a nameplate. The exact configuration and compatibility are confirmed against the original unit tag and mounting drawings before we quote.',
      },
      {
        q: 'Can I use the HKS M-DA-H-F7 145, Moveco RP46, Sungji SRB-160 as a direct replacement?',
        a: 'The listed alternatives are at a similar published torque level, but each is built to its own frame and mounting dimensions, so a similar rating does not guarantee a fit. Send us your unit tag and mounting drawing — we overlay the flange, shaft, ports and rotation and confirm whether one is a suitable option for your machine.',
      },
      {
        q: 'Which mounting styles are available for the L20-39?',
        a: 'This page covers the E-FT-180-S1-C-H build. Send your tag code or a mounting drawing and we confirm the matching housing, flange and port arrangement against the available L20 mounting options.',
      }
    ],
  },
  {
    model: 'L30-125-M-FT-360-S1-C-H',
    slug: 'l30-125-m-ft-360-s1-c-h',
    series: 'L30',
    seriesSlug: 'helac-l30-series',
    rotation: '360°',
    weight: '285.8 kg',
    brands: ['Atlas'],
    parts: ['3128314313'],
    machines: ['Simba S7D', 'Simba H1257'],
    image: '/images/atlas-copco/l30-125-m-ft-360-s1-c-h-rotary-actuator.webp',
    imageW: 1600,
    imageH: 1200,
    imageAlt:
      'Helac L30-125 class heavy-duty foot-mount helical rotary actuator for Atlas Copco / Epiroc Simba drill rigs',
    intro:
      'Alternative rotary actuator for the Helac L30-125-M-FT-360-S1-C-H, a large 360-degree, foot-mount helical actuator in the L30-125 class, rated at about 14,125 Nm output torque at 207 bar. It is listed by Atlas Copco / Epiroc under part number 3128314313 (also written 3128-3143-13) and is commonly associated with Simba production-drill rigs.',
    applicationNote:
      'Part number 3128314313 is commonly listed on the Atlas Copco / Epiroc Simba S7D and Simba H1257 production-drill rigs. Several different turning devices can be fitted across a machine range depending on serial number and build, so please confirm against your machine serial number and the actuator nameplate before ordering.',
    torque: '~14,125 Nm @ 207 bar (L30-125 series rated output)',
    crossNote:
      'L30-125 series rated performance (about 14,125 Nm at 207 bar, foot/front-flange/rear-flange mounts, 180/360-degree builds) per the published Helac catalog. The exact build, ports and mounting are confirmed against the unit tag and drawing before a replacement is supplied.',
    extraFaqs: [
      {
        q: 'Which rigs use Atlas Copco / Epiroc part 3128314313?',
        a: 'Part number 3128314313 is commonly listed on the Simba S7D and Simba H1257 production-drill rigs, corresponding to the Helac L30-125-M-FT-360-S1-C-H configuration (360-degree rotation, metric BSPP ports, foot mount). Because rigs of the same range can be built with different turning devices, send the part number on your tag or a nameplate photo and we confirm mounting, shaft and ports before quoting.',
      },
      {
        q: 'What is Atlas Copco / Epiroc part 3128325839?',
        a: 'Reference 3128325839 is an MS (metric, special-port) build within the same L30-125 foot-mount family as 3128314313 rather than a different actuator class. The port/thread package and mounting detail differ from the standard S1 listing, so it should not be assumed interchangeable; send your tag number or nameplate and we confirm the exact MS configuration and whether a direct replacement can be supplied.',
      },
    ],
  },
  {
    model: 'HP50-MS-RL-230-S1-C-H',
    slug: 'hp50-ms-rl-230-s1-c-h',
    series: 'HP',
    seriesSlug: 'helac-hp-series',
    rotation: '230°',
    weight: '105 kg',
    brands: ['Atlas'],
    parts: ['3128312643', '3129316303'],
    machines: ['Boomer 104', 'Boomer K41', 'Boomer K41x', 'Simba H1257', 'Simba H157', 'Simba S7D'],
    image: '/images/atlas-copco/hp50-ms-rl-230-s1-c-h-rotary-actuator.webp',
    imageW: 1600,
    imageH: 1200,
    imageAlt:
      'Heavy-duty Helac HP-series helical rotary actuator, mining drill-rig configuration (HP series representative image)',
    intro:
      'Alternative heavy-duty rotary actuator for the Helac HP50-MS-RL-230-S1-C-H, a large 230-degree, rail/slide-mount (RL) helical actuator built for mining drill-rig duty. It is listed by Atlas Copco / Epiroc under part numbers 3128312643 and 3129316303 (also written 3128-3126-43 and 3129-3163-03).',
    applicationNote:
      'Part numbers 3128312643 and 3129316303 are commonly associated with several Atlas Copco / Epiroc Boomer and Simba drill rigs. A single rig range can carry more than one turning device depending on serial number, position and build, so please confirm the fit against your machine serial number and the actuator nameplate before ordering.',
    crossNote:
      'The HP50-MS-RL-230 is a heavy mining build of the Helac HP series. HM confirms the exact configuration, mounting and compatibility against the unit nameplate and a drawing or photo before a replacement is supplied; ratings are not assumed from the HP number alone.',
    extraFaqs: [
      {
        q: 'What is the difference between 3128312643 and 3129316303?',
        a: 'Both Atlas Copco / Epiroc references are recorded against the same Helac HP50-MS-RL-230-S1-C-H turning-device configuration for mining drill rigs; the two numbers can appear across different machine builds or parts-list revisions. Send the tag from your unit and we confirm which reference and build applies before quoting.',
      },
      {
        q: 'Will this fit a Boomer 104, K41 or K41x?',
        a: 'The HP50-MS-RL-230 actuator is commonly listed on the Boomer 104, K41 and K41x as well as Simba H1257, H157 and S7D rigs, but these ranges use several different turning devices in different positions and serial-number builds. We confirm the mounting face, rail arrangement, ports and 230-degree rotation against your nameplate and a photo or drawing before recommending a replacement.',
      },
    ],
  },
  {
    model: 'L30-65-S-FT-240/190-S1-C-H',
    slug: 'l30-65-s-ft-240-190-s1-c-h',
    series: 'L30',
    seriesSlug: 'helac-l30-series',
    rotation: '190/240°',
    weight: '115.5 kg',
    brands: ['Sandvik'],
    parts: ['76350019', '76350008'],
    machines: ['Solo 5', 'Solo 5V'],
    image: '/images/atlas-copco/l30-65-s-ft-240-s1-c-h-rotary-actuator.webp',
    imageW: 1600,
    imageH: 881,
    imageAlt:
      'Helac L30 series heavy-duty helical rotary actuator, foot-mount mining configuration (series representative image)',
    intro:
      'Alternative rotary actuator for the Helac L30-65-S-FT-240/190-S1-C-H, a large foot-mount helical actuator in the L30-65 class, rated at about 7,345 Nm output torque at 207 bar and built in 190/240-degree mining rotations. It is listed by Sandvik under part numbers 76350019 and 76350008 (also written 763-500-19 and 763-500-08) and is commonly associated with Solo drill rigs.',
    applicationNote:
      'Part numbers 76350019 and 76350008 are commonly listed on the Sandvik Solo 5 and Solo 5V drill rigs. As different builds within a machine range can use different turning devices, please confirm the fit and rotation angle against your machine serial number and the actuator nameplate before ordering.',
    torque: '~7,345 Nm @ 207 bar (L30-65 series rated output)',
    crossNote:
      'L30-65 series rated output is about 7,345 Nm at 207 bar per the published Helac catalog; the 190/240-degree FT build is a mining configuration. The exact rotation angle, foot pattern, ports and build are confirmed against the unit tag and drawing before a replacement is supplied.',
    extraFaqs: [
      {
        q: 'Which Sandvik rigs use parts 76350019 and 76350008?',
        a: 'These Sandvik references are commonly listed on the Solo 5 and Solo 5V drill rigs, corresponding to the Helac L30-65-S-FT-240/190-S1-C-H turning-device configuration (foot mount, 190/240-degree rotation). Send the part number on your tag or a nameplate photo and we confirm the exact angle, mounting and ports before quoting.',
      },
      {
        q: 'Is this a 190-degree or 240-degree unit?',
        a: 'This L30-65 foot-mount build is supplied in 190-degree and 240-degree mining rotations, reflected in the two Sandvik references 76350019 and 76350008. The exact angle for your machine is read from the actuator tag and mechanism, not assumed from the rig model alone.',
      },
      {
        q: 'What about Sandvik part 77006294?',
        a: 'Sandvik 77006294 lists the same L30-65 foot-mount mining actuator at the 240-degree rotation (L30-65-S-FT-240 build), whereas 76350019 / 76350008 cover the 240/190-degree dual-angle listing. They belong to the same FT family but the rotation angle and build must be matched to your tag; send your nameplate or part number and we confirm the exact 190- or 240-degree unit before quoting.',
      },
    ],
  },
  {
    model: 'L30-65-S-RF-360-L1-C-H',
    slug: 'l30-65-s-rf-360-l1-c-h',
    series: 'L30',
    seriesSlug: 'helac-l30-series',
    rotation: '360°',
    weight: '155 kg',
    brands: ['Sandvik'],
    parts: ['76350018', '76350007'],
    machines: ['DD210', 'Bolter'],
    image: '/images/sandvik/l30-65-s-rf-360-l1-c-h-rotary-actuator.webp',
    imageW: 1161,
    imageH: 885,
    imageAlt:
      'Replacement rotary actuator for Helac L30-65-S-RF-360-L1-C-H, Sandvik part 76350018 (also 76350007), rear-flange 360-degree mining configuration on DD210 development drill',
    intro:
      'Alternative rotary actuator for the Helac L30-65-S-RF-360-L1-C-H, a large 360-degree, rear-flange helical actuator in the L30-65 class, rated at about 7,345 Nm output torque at 207 bar, in a mining L1 configuration and weighing about 155 kg. It is listed by Sandvik under part number 76350018, also cross-referenced as 76350007 (and written 763-500-18), and is commonly associated with Sandvik development-drill and bolter rigs such as the DD210.',
    applicationNote:
      'Sandvik lists this L1 rear-flange turning device under part numbers 76350018 and 76350007; the two numbers appear together in equipment cross-references for the same L30-65-S-RF-360-L1 build and are commonly associated with DD210 development-drill and bolter-type rigs. This association rests on third-party cross-reference listings, and several turning devices can be fitted across a machine range, so please confirm the fit against your machine serial number and the actuator nameplate before ordering.',
    torque: '~7,345 Nm @ 207 bar (L30-65 series rated output)',
    crossNote:
      'L30-65 series rated output is about 7,345 Nm at 207 bar per the published Helac catalog; the -L1 rear-flange 360-degree build is a mining configuration. HM confirms the exact L1 build, mounting and ports against the unit tag and drawing before a replacement is supplied.',
    extraFaqs: [
      {
        q: 'Are Sandvik parts 76350018 and 76350007 the same actuator?',
        a: 'In Sandvik equipment cross-references the L30-65-S-RF-360-L1-C-H turning device is listed under both 76350018 and 76350007, so the two numbers are commonly treated as the same rear-flange L1 build (you may also see it written 763-500-18). Because numbering can change by machine build year, we confirm against your nameplate and a tag photo before quoting.',
      },
      {
        q: 'Which Sandvik rig uses part 76350018?',
        a: 'Sandvik references 76350018 and 76350007 are commonly listed on DD210 development-drill and bolter-type rigs, corresponding to the Helac L30-65-S-RF-360-L1-C-H turning-device configuration (360-degree rotation, rear flange, mining L1 build). Because the public evidence for this association is limited and the same rig range can use several turning devices, we confirm the mounting, ports and rotation against your nameplate and a photo or drawing before quoting.',
      },
      {
        q: 'What does the L1 section of the code mean?',
        a: 'In this mining build the L1 suffix identifies a specific rear-flange configuration rather than the standard S1/S2 shaft code; the exact meaning is read from the actuator tag and mounting drawing. Send a tag photo and we confirm the precise build before recommending a replacement.',
      },
    ],
  },
  {
    model: 'HP-90-S-RL-360-S1-C-H',
    slug: 'hp-90-s-rl-360-s1-c-h',
    series: 'HP',
    seriesSlug: 'helac-hp-series',
    rotation: '360°',
    weight: '195 kg',
    brands: ['Sandvik'],
    parts: ['76350010'],
    image: '/images/atlas-copco/hp-90-s-rl-360-s1-c-h-rotary-actuator.webp',
    imageW: 1600,
    imageH: 936,
    imageAlt:
      'Helac HP-90 class heavy-duty rail-mount helical rotary actuator for Sandvik DS311 and DS2710 bolting rigs (Sandvik part 76350010)',
    intro:
      'Alternative heavy-duty rotary actuator for the Helac HP-90-S-RL-360-S1-C-H (also coded L1-C-H in some listings), a 360-degree, rail/slide-mount (RL) helical actuator in the Helac HP series, built for heavy-duty and mining drill-rig duty. It is listed by Sandvik under part number 76350010 (also written 763-500-10) in the supplier cross-reference list and is commonly associated with the Sandvik DS311 and DS2710 rock-bolting rigs.',
    crossNote:
      'The HP-90-S-RL-360 is a heavy build of the Helac HP series. HM confirms the exact configuration, mounting, rail arrangement and ports against the unit nameplate and a drawing or photo before a replacement is supplied; ratings are not assumed from the HP number alone.',
    machines: ['Sandvik DS311', 'Sandvik DS2710'],
    extraFaqs: [
      {
        q: 'Which Sandvik machine uses part 76350010?',
        a: 'Sandvik reference 76350010 is recorded against the Helac HP-90-S-RL-360-S1-C-H in our supplier cross-reference list and is commonly associated with the Sandvik DS311 and DS2710 rock-bolting rigs. Because rig ranges can carry different turning devices by serial number, send the part number on your tag or a nameplate photo and we confirm the build, rail mounting and ports before quoting.',
      },
      {
        q: 'Are HP-90-S-RL-360-S1-C-H and HP-90-S-RL-360-L1-C-H the same actuator?',
        a: 'Both codes appear against Sandvik part 76350010 in the cross-reference list; S1 and L1 denote build/port-code variants used in different revisions of the listing. They refer to the same HP-90 rail-mount 360-degree family, but the exact port and mounting code must be confirmed against your actuator tag before ordering rather than assumed from the S1/L1 suffix alone.',
      },
    ],
  },
  {
    model: 'ECKART SZ.SM3.215-357°/SO',
    slug: 'eckart-sz-sm3-215-357-bg00334414',
    series: 'SM3',
    seriesSlug: '',
    rotation: '357°',
    weight: '255 kg',
    brands: ['Sandvik'],
    parts: ['BG00334414'],
    machines: [],
    image: '/images/sandvik/eckart-sz-sm3-215-357-bg00334414-rotary-actuator.webp',
    imageW: 1600,
    imageH: 1200,
    imageAlt:
      'Heavy-duty helical hydraulic rotary actuator for mining equipment (generic representative image, not the original ECKART unit)',
    originBrand: 'ECKART',
    sourcingOnly: true,
    hideSeriesLink: true,
    intro:
      'The ECKART SZ.SM3.215-357°/SO is a helical hydraulic rotary actuator (about 357-degree rotation) listed by Sandvik under OEM part number BG00334414 (also written BG00-334-414) in the supplier cross-reference list. HM provides sourcing and alternative-supply support for this reference. We do not assume the offered unit is an original ECKART part or a pre-verified interchangeable unit; the model, mounting dimensions and configuration are confirmed against your actuator nameplate and drawing before we quote.',
    crossNote:
      'ECKART is the original actuator brand; Sandvik lists this unit as BG00334414. HM offers a sourcing / alternative-supply route. Because interchangeability has not been independently verified, the drawing, mounting dimensions, shaft and ports and the exact configuration are checked against your unit before any alternative is recommended.',
    extraFaqs: [
      {
        q: 'Is Sandvik BG00334414 an ECKART actuator?',
        a: 'Our supplier cross-reference list maps Sandvik OEM number BG00334414 to the original ECKART actuator model SZ.SM3.215-357°/SO. HM can source or arrange alternative supply; we do not represent the offered unit as an original ECKART part or guarantee interchangeability until the configuration and mounting are checked against your unit and drawing.',
      },
      {
        q: 'Can HM supply a direct, fully compatible replacement for BG00334414?',
        a: 'We do not claim a verified drop-in or a guaranteed-compatible unit from the part number alone. Send the actuator nameplate and a mounting drawing; we confirm rotation, mounting interface, shaft and ports and then advise the available sourcing or alternative-supply option.',
      },
    ],
  },
  {
    model: 'ECKART SZ SM3.170-357°/SO',
    slug: 'eckart-sz-sm3-170-357-bg00334337',
    series: 'SM3',
    seriesSlug: '',
    rotation: '357°',
    weight: '255 kg',
    brands: ['Sandvik'],
    parts: ['BG00334337'],
    machines: [],
    image: '/images/sandvik/eckart-sz-sm3-170-357-bg00334337-rotary-actuator.webp',
    imageW: 1440,
    imageH: 810,
    imageAlt:
      'Heavy-duty helical hydraulic rotary actuator for mining equipment (generic representative image, not the original ECKART unit)',
    originBrand: 'ECKART',
    sourcingOnly: true,
    hideSeriesLink: true,
    intro:
      'The ECKART SZ SM3.170-357°/SO is a helical hydraulic rotary actuator (about 357-degree rotation) listed by Sandvik under OEM part number BG00334337 (also written BG00-334-337) in the supplier cross-reference list. HM provides sourcing and alternative-supply support for this reference. We do not assume the offered unit is an original ECKART part or a pre-verified interchangeable unit; the model, mounting dimensions and configuration are confirmed against your actuator nameplate and drawing before we quote.',
    crossNote:
      'ECKART is the original actuator brand; Sandvik lists this unit as BG00334337. HM offers a sourcing / alternative-supply route. Because interchangeability has not been independently verified, the drawing, mounting dimensions, shaft and ports and the exact configuration are checked against your unit before any alternative is recommended.',
    extraFaqs: [
      {
        q: 'Is Sandvik BG00334337 an ECKART actuator?',
        a: 'Our supplier cross-reference list maps Sandvik OEM number BG00334337 to the original ECKART actuator model SZ SM3.170-357°/SO. HM can source or arrange alternative supply; we do not represent the offered unit as an original ECKART part or guarantee interchangeability until the configuration and mounting are checked against your unit and drawing.',
      },
      {
        q: 'Can HM supply a direct, fully compatible replacement for BG00334337?',
        a: 'We do not claim a verified drop-in or a guaranteed-compatible unit from the part number alone. Send the actuator nameplate and a mounting drawing; we confirm rotation, mounting interface, shaft and ports and then advise the available sourcing or alternative-supply option.',
      },
    ],
  },


  // --- Helac P0 catalog builds added 2026-10 (sizes L20-4.5/8.2/25 + T series) ---
  {
    model: 'L20-4.5-E-FT-180-S1-C-H',
    slug: 'l20-4-5-e-ft-180-s1-c-h',
    series: 'L20',
    seriesSlug: 'helac-l20-series',
    rotation: '180°',
    weight: '12.2 kg',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l20-15-e-cl-180-90.jpg',
    imageW: 291,
    imageH: 323,
    imageAlt: 'Helac L20 series helical rotary actuator, foot-mount 180-degree configuration (L20 series representative image)',
    catalogBuild: true,
    intro: 'Looking for an alternative to the Helac L20-4.5 rotary actuator? This page covers the 180° foot-mount catalog configuration, with a rated output torque of approximately 509 Nm at 207 bar. HM can help review your unit tag, mounting drawings and operating requirements before proposing a suitable solution.',
    catalogSpec: {
      pressureBar: 207,
      ratedTorqueNm: 509,
      holdingTorqueNm: 1333,
      momentCantileverNm: 1356,
      momentStraddleNm: '2,543 Nm',
      axialLoadKg: 499,
      radialLoadKg: 1383,
      displacementCm3: '131.9 cm³',
      weightKg: '12.2 kg',
      mountingStyles: 'FT foot mount · FF front flange · RF rear flange · CL clevis',
      baseLabel: 'L20-4.5 (450 in-lb class)',
      thisBuildDecode: 'E = English/SAE threads & ports · FT foot mount · 180° rotation · S1 single (cantilever) flange · C counterbalance valve · H standard seals & bearings',
      crossAlternatives: [
        {
          brand: 'HKS',
          seriesRef: 'M-DA-H-F7 70',
          keySpec: 'Similar torque class',
        },
        {
          brand: 'Moveco',
          seriesRef: 'RP17',
          keySpec: 'Similar torque class',
        },
        {
          brand: 'Sungji',
          seriesRef: 'SRB-080',
          keySpec: 'Similar torque class',
        },
      ],
      source: 'Helac L20 catalog, p. 10'
    },
    extraFaqs: [
      {
        q: 'Is L20-4.5-E-FT-180-S1-C-H a confirmed factory order code?',
        a: 'This configuration is derived from the Parker/Helac HY34-1001 ordering key (L20-4.5 frame, L20 series, E English/SAE, FT mount, 180° rotation, S1 single/cantilever flange, C counterbalance valve, H standard seals & bearings) and the published L20 performance data. It is a configuration assembled per the catalog rules, not an independently verified factory order code read from a nameplate. The exact configuration and compatibility are confirmed against the original unit tag and mounting drawings before we quote.',
      },
      {
        q: 'Can I use the HKS M-DA-H-F7 70, Moveco RP17, Sungji SRB-080 as a direct replacement?',
        a: 'The listed alternatives are at a similar published torque level, but each is built to its own frame and mounting dimensions, so a similar rating does not guarantee a fit. Send us your unit tag and mounting drawing — we overlay the flange, shaft, ports and rotation and confirm whether one is a suitable option for your machine.',
      },
      {
        q: 'Which mounting styles are available for the L20-4.5?',
        a: 'This page covers the E-FT-180-S1-C-H build. Send your tag code or a mounting drawing and we confirm the matching housing, flange and port arrangement against the available L20 mounting options.',
      }
    ],
  },
  {
    model: 'L20-4.5-E-FT-360-S1-C-H',
    slug: 'l20-4-5-e-ft-360-s1-c-h',
    series: 'L20',
    seriesSlug: 'helac-l20-series',
    rotation: '360°',
    weight: '',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l20-15-e-cl-180-90.jpg',
    imageW: 291,
    imageH: 323,
    imageAlt: 'Helac L20 series helical rotary actuator, foot-mount 360-degree configuration (L20 series representative image)',
    catalogBuild: true,
    intro: 'Looking for an alternative to the Helac L20-4.5 rotary actuator? This page covers the 360° foot-mount catalog configuration, with a rated output torque of approximately 509 Nm at 207 bar. HM can help review your unit tag, mounting drawings and operating requirements before proposing a suitable solution.',
    catalogSpec: {
      pressureBar: 207,
      ratedTorqueNm: 509,
      holdingTorqueNm: 1333,
      momentCantileverNm: 1356,
      axialLoadKg: 499,
      radialLoadKg: 1383,
      mountingStyles: 'FT foot mount · FF front flange · RF rear flange · CL clevis',
      baseLabel: 'L20-4.5 (450 in-lb class)',
      thisBuildDecode: 'E = English/SAE threads & ports · FT foot mount · 360° rotation · S1 single (cantilever) flange · C counterbalance valve · H standard seals & bearings',
      crossAlternatives: [
        {
          brand: 'HKS',
          seriesRef: 'M-DA-H-F7 70',
          keySpec: 'Similar torque class',
        },
      ],
      source: 'Helac L20 catalog, p. 10'
    },
    extraFaqs: [
      {
        q: 'Is L20-4.5-E-FT-360-S1-C-H a confirmed factory order code?',
        a: 'This configuration is derived from the Parker/Helac HY34-1001 ordering key (L20-4.5 frame, L20 series, E English/SAE, FT mount, 360° rotation, S1 single/cantilever flange, C counterbalance valve, H standard seals & bearings) and the published L20 performance data. It is a configuration assembled per the catalog rules, not an independently verified factory order code read from a nameplate. The exact configuration and compatibility are confirmed against the original unit tag and mounting drawings before we quote.',
      },
      {
        q: 'Can I use the HKS M-DA-H-F7 70 as a direct replacement?',
        a: 'The listed alternatives are at a similar published torque level, but each is built to its own frame and mounting dimensions, so a similar rating does not guarantee a fit. Send us your unit tag and mounting drawing — we overlay the flange, shaft, ports and rotation and confirm whether one is a suitable option for your machine.',
      },
      {
        q: 'Which mounting styles are available for the L20-4.5?',
        a: 'This page covers the E-FT-360-S1-C-H build. Send your tag code or a mounting drawing and we confirm the matching housing, flange and port arrangement against the available L20 mounting options.',
      }
    ],
  },
  {
    model: 'L20-8.2-E-FT-180-S1-C-H',
    slug: 'l20-8-2-e-ft-180-s1-c-h',
    series: 'L20',
    seriesSlug: 'helac-l20-series',
    rotation: '180°',
    weight: '16.8 kg',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l20-15-e-cl-180-90.jpg',
    imageW: 291,
    imageH: 323,
    imageAlt: 'Helac L20 series helical rotary actuator, foot-mount 180-degree configuration (L20 series representative image)',
    catalogBuild: true,
    intro: 'Looking for an alternative to the Helac L20-8.2 rotary actuator? This page covers the 180° foot-mount catalog configuration, with a rated output torque of approximately 927 Nm at 207 bar. HM can help review your unit tag, mounting drawings and operating requirements before proposing a suitable solution.',
    catalogSpec: {
      pressureBar: 207,
      ratedTorqueNm: 927,
      holdingTorqueNm: 2373,
      momentCantileverNm: 2486,
      momentStraddleNm: '4,520 Nm',
      axialLoadKg: 680,
      radialLoadKg: 2132,
      displacementCm3: '234.3 cm³',
      weightKg: '16.8 kg',
      mountingStyles: 'FT foot mount · FF front flange · RF rear flange · CL clevis',
      baseLabel: 'L20-8.2 (820 in-lb class)',
      thisBuildDecode: 'E = English/SAE threads & ports · FT foot mount · 180° rotation · S1 single (cantilever) flange · C counterbalance valve · H standard seals & bearings',
      crossAlternatives: [
        {
          brand: 'HKS',
          seriesRef: 'M-DA-H-F7 85',
          keySpec: 'Similar torque class',
        },
        {
          brand: 'Moveco',
          seriesRef: 'RP24',
          keySpec: 'Similar torque class',
        },
        {
          brand: 'Sungji',
          seriesRef: 'SRB-090',
          keySpec: 'Similar torque class',
        },
      ],
      source: 'Helac L20 catalog, p. 10'
    },
    extraFaqs: [
      {
        q: 'Is L20-8.2-E-FT-180-S1-C-H a confirmed factory order code?',
        a: 'This configuration is derived from the Parker/Helac HY34-1001 ordering key (L20-8.2 frame, L20 series, E English/SAE, FT mount, 180° rotation, S1 single/cantilever flange, C counterbalance valve, H standard seals & bearings) and the published L20 performance data. It is a configuration assembled per the catalog rules, not an independently verified factory order code read from a nameplate. The exact configuration and compatibility are confirmed against the original unit tag and mounting drawings before we quote.',
      },
      {
        q: 'Can I use the HKS M-DA-H-F7 85, Moveco RP24, Sungji SRB-090 as a direct replacement?',
        a: 'The listed alternatives are at a similar published torque level, but each is built to its own frame and mounting dimensions, so a similar rating does not guarantee a fit. Send us your unit tag and mounting drawing — we overlay the flange, shaft, ports and rotation and confirm whether one is a suitable option for your machine.',
      },
      {
        q: 'Which mounting styles are available for the L20-8.2?',
        a: 'This page covers the E-FT-180-S1-C-H build. Send your tag code or a mounting drawing and we confirm the matching housing, flange and port arrangement against the available L20 mounting options.',
      }
    ],
  },
  {
    model: 'L20-8.2-E-FT-360-S1-C-H',
    slug: 'l20-8-2-e-ft-360-s1-c-h',
    series: 'L20',
    seriesSlug: 'helac-l20-series',
    rotation: '360°',
    weight: '',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l20-15-e-cl-180-90.jpg',
    imageW: 291,
    imageH: 323,
    imageAlt: 'Helac L20 series helical rotary actuator, foot-mount 360-degree configuration (L20 series representative image)',
    catalogBuild: true,
    intro: 'Looking for an alternative to the Helac L20-8.2 rotary actuator? This page covers the 360° foot-mount catalog configuration, with a rated output torque of approximately 927 Nm at 207 bar. HM can help review your unit tag, mounting drawings and operating requirements before proposing a suitable solution.',
    catalogSpec: {
      pressureBar: 207,
      ratedTorqueNm: 927,
      holdingTorqueNm: 2373,
      momentCantileverNm: 2486,
      axialLoadKg: 680,
      radialLoadKg: 2132,
      mountingStyles: 'FT foot mount · FF front flange · RF rear flange · CL clevis',
      baseLabel: 'L20-8.2 (820 in-lb class)',
      thisBuildDecode: 'E = English/SAE threads & ports · FT foot mount · 360° rotation · S1 single (cantilever) flange · C counterbalance valve · H standard seals & bearings',
      crossAlternatives: [
        {
          brand: 'HKS',
          seriesRef: 'M-DA-H-F7 85',
          keySpec: 'Similar torque class',
        },
      ],
      source: 'Helac L20 catalog, p. 10'
    },
    extraFaqs: [
      {
        q: 'Is L20-8.2-E-FT-360-S1-C-H a confirmed factory order code?',
        a: 'This configuration is derived from the Parker/Helac HY34-1001 ordering key (L20-8.2 frame, L20 series, E English/SAE, FT mount, 360° rotation, S1 single/cantilever flange, C counterbalance valve, H standard seals & bearings) and the published L20 performance data. It is a configuration assembled per the catalog rules, not an independently verified factory order code read from a nameplate. The exact configuration and compatibility are confirmed against the original unit tag and mounting drawings before we quote.',
      },
      {
        q: 'Can I use the HKS M-DA-H-F7 85 as a direct replacement?',
        a: 'The listed alternatives are at a similar published torque level, but each is built to its own frame and mounting dimensions, so a similar rating does not guarantee a fit. Send us your unit tag and mounting drawing — we overlay the flange, shaft, ports and rotation and confirm whether one is a suitable option for your machine.',
      },
      {
        q: 'Which mounting styles are available for the L20-8.2?',
        a: 'This page covers the E-FT-360-S1-C-H build. Send your tag code or a mounting drawing and we confirm the matching housing, flange and port arrangement against the available L20 mounting options.',
      }
    ],
  },
  {
    model: 'L20-25-E-FT-180-S1-C-H',
    slug: 'l20-25-e-ft-180-s1-c-h',
    series: 'L20',
    seriesSlug: 'helac-l20-series',
    rotation: '180°',
    weight: '51.3 kg',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l20-15-e-cl-180-90.jpg',
    imageW: 291,
    imageH: 323,
    imageAlt: 'Helac L20 series helical rotary actuator, foot-mount 180-degree configuration (L20 series representative image)',
    catalogBuild: true,
    intro: 'Looking for an alternative to the Helac L20-25 rotary actuator? This page covers the 180° foot-mount catalog configuration, with a rated output torque of approximately 2,825 Nm at 207 bar. HM can help review your unit tag, mounting drawings and operating requirements before proposing a suitable solution.',
    catalogSpec: {
      pressureBar: 207,
      ratedTorqueNm: 2825,
      holdingTorqueNm: 7108,
      momentCantileverNm: 11300,
      momentStraddleNm: '22,597 Nm',
      axialLoadKg: 1406,
      radialLoadKg: 5579,
      displacementCm3: '725.9 cm³',
      weightKg: '51.3 kg',
      mountingStyles: 'FT foot mount · FF front flange · RF rear flange · CL clevis',
      baseLabel: 'L20-25 (2,500 in-lb class)',
      thisBuildDecode: 'E = English/SAE threads & ports · FT foot mount · 180° rotation · S1 single (cantilever) flange · C counterbalance valve · H standard seals & bearings',
      crossAlternatives: [
        {
          brand: 'HKS',
          seriesRef: 'M-DA-H-F7 125',
          keySpec: 'Similar torque class',
        },
        {
          brand: 'Moveco',
          seriesRef: 'RP40',
          keySpec: 'Similar torque class',
        },
        {
          brand: 'Sungji',
          seriesRef: 'SRB-140',
          keySpec: 'Similar torque class',
        },
      ],
      source: 'Helac L20 catalog, p. 10'
    },
    extraFaqs: [
      {
        q: 'Is L20-25-E-FT-180-S1-C-H a confirmed factory order code?',
        a: 'This configuration is derived from the Parker/Helac HY34-1001 ordering key (L20-25 frame, L20 series, E English/SAE, FT mount, 180° rotation, S1 single/cantilever flange, C counterbalance valve, H standard seals & bearings) and the published L20 performance data. It is a configuration assembled per the catalog rules, not an independently verified factory order code read from a nameplate. The exact configuration and compatibility are confirmed against the original unit tag and mounting drawings before we quote.',
      },
      {
        q: 'Can I use the HKS M-DA-H-F7 125, Moveco RP40, Sungji SRB-140 as a direct replacement?',
        a: 'The listed alternatives are at a similar published torque level, but each is built to its own frame and mounting dimensions, so a similar rating does not guarantee a fit. Send us your unit tag and mounting drawing — we overlay the flange, shaft, ports and rotation and confirm whether one is a suitable option for your machine.',
      },
      {
        q: 'Which mounting styles are available for the L20-25?',
        a: 'This page covers the E-FT-180-S1-C-H build. Send your tag code or a mounting drawing and we confirm the matching housing, flange and port arrangement against the available L20 mounting options.',
      }
    ],
  },
  {
    model: 'L20-25-E-FT-360-S1-C-H',
    slug: 'l20-25-e-ft-360-s1-c-h',
    series: 'L20',
    seriesSlug: 'helac-l20-series',
    rotation: '360°',
    weight: '',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l20-15-e-cl-180-90.jpg',
    imageW: 291,
    imageH: 323,
    imageAlt: 'Helac L20 series helical rotary actuator, foot-mount 360-degree configuration (L20 series representative image)',
    catalogBuild: true,
    intro: 'Looking for an alternative to the Helac L20-25 rotary actuator? This page covers the 360° foot-mount catalog configuration, with a rated output torque of approximately 2,825 Nm at 207 bar. HM can help review your unit tag, mounting drawings and operating requirements before proposing a suitable solution.',
    catalogSpec: {
      pressureBar: 207,
      ratedTorqueNm: 2825,
      holdingTorqueNm: 7108,
      momentCantileverNm: 11300,
      axialLoadKg: 1406,
      radialLoadKg: 5579,
      mountingStyles: 'FT foot mount · FF front flange · RF rear flange · CL clevis',
      baseLabel: 'L20-25 (2,500 in-lb class)',
      thisBuildDecode: 'E = English/SAE threads & ports · FT foot mount · 360° rotation · S1 single (cantilever) flange · C counterbalance valve · H standard seals & bearings',
      crossAlternatives: [
        {
          brand: 'HKS',
          seriesRef: 'M-DA-H-F7 125',
          keySpec: 'Similar torque class',
        },
      ],
      source: 'Helac L20 catalog, p. 10'
    },
    extraFaqs: [
      {
        q: 'Is L20-25-E-FT-360-S1-C-H a confirmed factory order code?',
        a: 'This configuration is derived from the Parker/Helac HY34-1001 ordering key (L20-25 frame, L20 series, E English/SAE, FT mount, 360° rotation, S1 single/cantilever flange, C counterbalance valve, H standard seals & bearings) and the published L20 performance data. It is a configuration assembled per the catalog rules, not an independently verified factory order code read from a nameplate. The exact configuration and compatibility are confirmed against the original unit tag and mounting drawings before we quote.',
      },
      {
        q: 'Can I use the HKS M-DA-H-F7 125 as a direct replacement?',
        a: 'The listed alternatives are at a similar published torque level, but each is built to its own frame and mounting dimensions, so a similar rating does not guarantee a fit. Send us your unit tag and mounting drawing — we overlay the flange, shaft, ports and rotation and confirm whether one is a suitable option for your machine.',
      },
      {
        q: 'Which mounting styles are available for the L20-25?',
        a: 'This page covers the E-FT-360-S1-C-H build. Send your tag code or a mounting drawing and we confirm the matching housing, flange and port arrangement against the available L20 mounting options.',
      }
    ],
  },
  {
    model: 'T20-25-E-FT-220-S1-C-H',
    slug: 't20-25-e-ft-220-s1-c-h',
    series: 'T20',
    seriesSlug: '',
    rotation: '220°',
    weight: '33.6 kg',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/products/hmr6-foot-through-splined-shaft.webp',
    imageW: 1600,
    imageH: 1130,
    imageAlt: 'Helac T-series dual-spline straddle rotary actuator (representative image)',
    catalogBuild: true,
    hideSeriesLink: true,
    intro: 'Looking for an alternative to the Helac T20-25 rotary actuator? This page covers the 220° foot-mount catalog configuration of the T-series dual splined-output-shaft build, with a rated output torque of approximately 2,825 Nm at 207 bar. HM can help review your unit tag, mounting drawings and operating requirements before proposing a suitable solution.',
    catalogSpec: {
      pressureBar: 207,
      ratedTorqueNm: 2825,
      holdingTorqueNm: 6125,
      momentStraddleNm: '4,238 Nm',
      axialLoadKg: 2041,
      radialLoadKg: 2041,
      displacementCm3: '775.1 cm³',
      weightKg: '33.6 kg',
      mountingStyles: 'FT foot mount · dual splined output shafts (straddle)',
      baseLabel: 'T20-25 (2,500 in-lb class)',
      thisBuildDecode: 'E = English/SAE threads & ports · FT foot mount · 220° rotation · S1 single (cantilever) flange · C counterbalance valve · H standard seals & bearings',
      crossAlternatives: [
        {
          brand: 'Sungji',
          seriesRef: 'SRS-115',
          keySpec: 'Similar torque class',
        }
      ],
      source: 'Helac T-series catalog, p. 18'
    },
    extraFaqs: [
      {
        q: 'Is T20-25-E-FT-220-S1-C-H a confirmed factory order code?',
        a: 'This T-series configuration is derived from the Parker/Helac HY34-1001 ordering key (T20-25 frame, T series with dual splined output shafts, E English/SAE, FT mount, 220° rotation, S1 single/cantilever flange, C counterbalance valve, H standard seals & bearings) and the published T-series performance data. It is a catalog configuration assembled per the ordering rules rather than a code independently verified from a nameplate; the exact build is confirmed against the Helac selection sheet, the original unit tag and the mounting drawing before we quote.',
      },
      {
        q: 'Can I use the Sungji SRS-115 as a direct replacement?',
        a: 'The listed alternative is at a similar published torque level, but it is built to its own frame and mounting dimensions, so a similar rating does not guarantee a fit. Send us your unit tag and mounting drawing — we overlay the flange, shaft, ports and rotation and confirm whether it is a suitable option for your machine.',
      },
      {
        q: 'What is special about the T-series dual splined shaft build?',
        a: 'The T series uses two splined output shafts for straddle mounting, so the published moment figure is the straddle (double-support) rating rather than a cantilever value. Send your tag code and mounting drawing and we confirm the shaft, flange, ports and rotation against the available T-series builds before quoting.',
      }
    ],
  },
  {
    model: 'T30-27-E-FT-220-S1-C-H',
    slug: 't30-27-e-ft-220-s1-c-h',
    series: 'T30',
    seriesSlug: '',
    rotation: '220°',
    weight: '32.7 kg',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/products/hmr6-foot-through-splined-shaft.webp',
    imageW: 1600,
    imageH: 1130,
    imageAlt: 'Helac T-series dual-spline straddle rotary actuator (representative image)',
    catalogBuild: true,
    hideSeriesLink: true,
    intro: 'Looking for an alternative to the Helac T30-27 rotary actuator? This page covers the 220° foot-mount catalog configuration of the T-series dual splined-output-shaft build, with a rated output torque of approximately 3,051 Nm at 207 bar. HM can help review your unit tag, mounting drawings and operating requirements before proposing a suitable solution.',
    catalogSpec: {
      pressureBar: 207,
      ratedTorqueNm: 3051,
      holdingTorqueNm: 6125,
      momentStraddleNm: '4,577 Nm',
      axialLoadKg: 2041,
      radialLoadKg: 2041,
      displacementCm3: '799.7 cm³',
      weightKg: '32.7 kg',
      mountingStyles: 'FT foot mount · dual splined output shafts (straddle)',
      baseLabel: 'T30-27 (2,700 in-lb class)',
      thisBuildDecode: 'E = English/SAE threads & ports · FT foot mount · 220° rotation · S1 single (cantilever) flange · C counterbalance valve · H standard seals & bearings',
      crossAlternatives: [
        {
          brand: 'Sungji',
          seriesRef: 'SRS-115',
          keySpec: 'Similar torque class',
        }
      ],
      source: 'Helac T-series catalog, p. 18'
    },
    extraFaqs: [
      {
        q: 'Is T30-27-E-FT-220-S1-C-H a confirmed factory order code?',
        a: 'This T-series configuration is derived from the Parker/Helac HY34-1001 ordering key (T30-27 frame, T series with dual splined output shafts, E English/SAE, FT mount, 220° rotation, S1 single/cantilever flange, C counterbalance valve, H standard seals & bearings) and the published T-series performance data. It is a catalog configuration assembled per the ordering rules rather than a code independently verified from a nameplate; the exact build is confirmed against the Helac selection sheet, the original unit tag and the mounting drawing before we quote.',
      },
      {
        q: 'Can I use the Sungji SRS-115 as a direct replacement?',
        a: 'The listed alternative is at a similar published torque level, but it is built to its own frame and mounting dimensions, so a similar rating does not guarantee a fit. Send us your unit tag and mounting drawing — we overlay the flange, shaft, ports and rotation and confirm whether it is a suitable option for your machine.',
      },
      {
        q: 'What is special about the T-series dual splined shaft build?',
        a: 'The T series uses two splined output shafts for straddle mounting, so the published moment figure is the straddle (double-support) rating rather than a cantilever value. Send your tag code and mounting drawing and we confirm the shaft, flange, ports and rotation against the available T-series builds before quoting.',
      }
    ],
  },
  {
    model: 'T20-45-E-FT-220-S1-C-H',
    slug: 't20-45-e-ft-220-s1-c-h',
    series: 'T20',
    seriesSlug: '',
    rotation: '220°',
    weight: '58.1 kg',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/products/hmr6-foot-through-splined-shaft.webp',
    imageW: 1600,
    imageH: 1130,
    imageAlt: 'Helac T-series dual-spline straddle rotary actuator (representative image)',
    catalogBuild: true,
    hideSeriesLink: true,
    intro: 'Looking for an alternative to the Helac T20-45 rotary actuator? This page covers the 220° foot-mount catalog configuration of the T-series dual splined-output-shaft build, with a rated output torque of approximately 5,085 Nm at 207 bar. HM can help review your unit tag, mounting drawings and operating requirements before proposing a suitable solution.',
    catalogSpec: {
      pressureBar: 207,
      ratedTorqueNm: 5085,
      holdingTorqueNm: 10622,
      momentStraddleNm: '7,628 Nm',
      axialLoadKg: 3130,
      radialLoadKg: 3130,
      displacementCm3: '1,356.9 cm³',
      weightKg: '58.1 kg',
      mountingStyles: 'FT foot mount · dual splined output shafts (straddle)',
      baseLabel: 'T20-45 (4,500 in-lb class)',
      thisBuildDecode: 'E = English/SAE threads & ports · FT foot mount · 220° rotation · S1 single (cantilever) flange · C counterbalance valve · H standard seals & bearings',
      crossAlternatives: [],
      source: 'Helac T-series catalog, p. 18'
    },
    extraFaqs: [
      {
        q: 'Is T20-45-E-FT-220-S1-C-H a confirmed factory order code?',
        a: 'This T-series configuration is derived from the Parker/Helac HY34-1001 ordering key (T20-45 frame, T series with dual splined output shafts, E English/SAE, FT mount, 220° rotation, S1 single/cantilever flange, C counterbalance valve, H standard seals & bearings) and the published T-series performance data. It is a catalog configuration assembled per the ordering rules rather than a code independently verified from a nameplate; the exact build is confirmed against the Helac selection sheet, the original unit tag and the mounting drawing before we quote.',
      },
      {
        q: 'What is special about the T-series dual splined shaft build?',
        a: 'The T series uses two splined output shafts for straddle mounting, so the published moment figure is the straddle (double-support) rating rather than a cantilever value. Send your tag code and mounting drawing and we confirm the shaft, flange, ports and rotation against the available T-series builds before quoting.',
      }
    ],
  },
  {
    model: 'T20-60-E-FT-220-S1-C-H',
    slug: 't20-60-e-ft-220-s1-c-h',
    series: 'T20',
    seriesSlug: '',
    rotation: '220°',
    weight: '75.3 kg',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/products/hmr6-foot-through-splined-shaft.webp',
    imageW: 1600,
    imageH: 1130,
    imageAlt: 'Helac T-series dual-spline straddle rotary actuator (representative image)',
    catalogBuild: true,
    hideSeriesLink: true,
    intro: 'Looking for an alternative to the Helac T20-60 rotary actuator? This page covers the 220° foot-mount catalog configuration of the T-series dual splined-output-shaft build, with a rated output torque of approximately 6,780 Nm at 207 bar. HM can help review your unit tag, mounting drawings and operating requirements before proposing a suitable solution.',
    catalogSpec: {
      pressureBar: 207,
      ratedTorqueNm: 6780,
      holdingTorqueNm: 14351,
      momentStraddleNm: '10,170 Nm',
      axialLoadKg: 3901,
      radialLoadKg: 3901,
      displacementCm3: '1,655.1 cm³',
      weightKg: '75.3 kg',
      mountingStyles: 'FT foot mount · dual splined output shafts (straddle)',
      baseLabel: 'T20-60 (6,000 in-lb class)',
      thisBuildDecode: 'E = English/SAE threads & ports · FT foot mount · 220° rotation · S1 single (cantilever) flange · C counterbalance valve · H standard seals & bearings',
      crossAlternatives: [
        {
          brand: 'Sungji',
          seriesRef: 'SRS-150',
          keySpec: 'Similar torque class',
        }
      ],
      source: 'Helac T-series catalog, p. 18'
    },
    extraFaqs: [
      {
        q: 'Is T20-60-E-FT-220-S1-C-H a confirmed factory order code?',
        a: 'This T-series configuration is derived from the Parker/Helac HY34-1001 ordering key (T20-60 frame, T series with dual splined output shafts, E English/SAE, FT mount, 220° rotation, S1 single/cantilever flange, C counterbalance valve, H standard seals & bearings) and the published T-series performance data. It is a catalog configuration assembled per the ordering rules rather than a code independently verified from a nameplate; the exact build is confirmed against the Helac selection sheet, the original unit tag and the mounting drawing before we quote.',
      },
      {
        q: 'Why does the T20-60 reference data show 200° while this code is a 220° build?',
        a: 'The published T-series performance table lists the T20-60 at a 200° standard angle, whereas the controlled order-code cross-reference assigns the complete code T20-60-E-FT-220-S1-C-H at 220°. This page uses the angle written in the complete order code. Please confirm the required rotation against your unit tag and mounting drawing, and we verify the exact build before quoting.',
      },
      {
        q: 'Can I use the Sungji SRS-150 as a direct replacement?',
        a: 'The listed alternative is at a similar published torque level, but it is built to its own frame and mounting dimensions, so a similar rating does not guarantee a fit. Send us your unit tag and mounting drawing — we overlay the flange, shaft, ports and rotation and confirm whether it is a suitable option for your machine.',
      },
      {
        q: 'What is special about the T-series dual splined shaft build?',
        a: 'The T series uses two splined output shafts for straddle mounting, so the published moment figure is the straddle (double-support) rating rather than a cantilever value. Send your tag code and mounting drawing and we confirm the shaft, flange, ports and rotation against the available T-series builds before quoting.',
      }
    ],
  },

  // --- Batch4 P1 (2026-10-19): HKS multi-brand sourcing entries (12) ---
  {
    model: 'M-DA-H 50',
    slug: 'hks-m-da-h-50',
    series: 'M-DA-H (mobile)',
    seriesSlug: '',
    rotation: '180°',
    weight: '7.4 kg @180°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l10-3-0-e-rf-180.jpg',
    imageW: 211,
    imageH: 212,
    imageAlt: 'Helical hydraulic rotary actuator, M-DA-H torque class (generic representative image, not the original HKS unit)',
    originBrand: 'HKS',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '190 Nm',
    intro: 'The HKS M-DA-H 50 is a mobile-version helical hydraulic rotary actuator in HKS\'s M-DA-H programme (German maker). HKS uses its own bore/housing size numbers; the code is a size designation, not a torque figure and not a Helac size number, rated at about 190 Nm output torque at 210 bar. In the controlled cross-reference it sits in the ~196.1 Nm torque class together with: Sungji SRA-080-180-CN-RF-SH-N-I. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Same torque class (comparable rated output; independent housing and mounting designs - do not assume matching dimensions): Sungji SRA-080-180-CN-RF-SH-N-I (~196.1 Nm). Performance neighbours only, not the same anchor class: Helac L10-3.0 (~339 Nm, +73%). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'Can HM supply the HKS M-DA-H 50?',
        a: 'HM provides technical selection and a sourcing / alternative-supply route for the HKS M-DA-H 50 base size. We do not keep stock and do not promise availability or lead time; the exact HKS configuration (S1/S2, rotation direction, valve and seal options folded into the FU/S9xxx code) is confirmed against your nameplate, with the factory when needed, before we quote.',
      },
      {
        q: 'Is the M-DA-H 50 a one-to-one replacement for the Helac-class unit in the same torque bracket?',
        a: 'They sit in the same torque class in our controlled cross-reference, but HKS uses its own bore/housing design and dimensions. We do not claim a verified drop-in or a guaranteed-compatible unit from the model number alone; rotation, mounting interface, shaft and ports are checked against your unit and drawing first.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. HKS folds valve and seal options into the FU requirement code and the S9xxx material number; a complete HKS order code must be confirmed with HKS for each requirement (torque, rotation, S1/S2, rotation direction, valve, seal).',
      }
    ],
  },
  {
    model: 'M-DA-H 63',
    slug: 'hks-m-da-h-63',
    series: 'M-DA-H (mobile)',
    seriesSlug: '',
    rotation: '180° / 360°',
    weight: '14.4 kg @180°; 18.8 kg @360°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l10-5-5-m-rf-360.jpg',
    imageW: 333,
    imageH: 246,
    imageAlt: 'Helical hydraulic rotary actuator, M-DA-H torque class (generic representative image, not the original HKS unit)',
    originBrand: 'HKS',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '720 Nm',
    intro: 'The HKS M-DA-H 63 is a mobile-version helical hydraulic rotary actuator in HKS\'s M-DA-H programme (German maker). HKS uses its own bore/housing size numbers; the code is a size designation, not a torque figure and not a Helac size number, rated at about 720 Nm output torque at 210 bar. The maker\'s table lists 180° / 360° builds for this base size. In the controlled cross-reference it sits in the ~735.5 Nm torque class together with: Sungji SRA-110-180-CN-RF-SH-N-I. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Same torque class (comparable rated output; independent housing and mounting designs - do not assume matching dimensions): Sungji SRA-110-180-CN-RF-SH-N-I (~735.5 Nm). Performance neighbours only, not the same anchor class: Helac L10-5.5 (~622 Nm, -15%). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'Can HM supply the HKS M-DA-H 63?',
        a: 'HM provides technical selection and a sourcing / alternative-supply route for the HKS M-DA-H 63 base size. We do not keep stock and do not promise availability or lead time; the exact HKS configuration (S1/S2, rotation direction, valve and seal options folded into the FU/S9xxx code) is confirmed against your nameplate, with the factory when needed, before we quote.',
      },
      {
        q: 'Is the M-DA-H 63 a one-to-one replacement for the Helac-class unit in the same torque bracket?',
        a: 'They sit in the same torque class in our controlled cross-reference, but HKS uses its own bore/housing design and dimensions. We do not claim a verified drop-in or a guaranteed-compatible unit from the model number alone; rotation, mounting interface, shaft and ports are checked against your unit and drawing first.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. HKS folds valve and seal options into the FU requirement code and the S9xxx material number; a complete HKS order code must be confirmed with HKS for each requirement (torque, rotation, S1/S2, rotation direction, valve, seal).',
      }
    ],
  },
  {
    model: 'M-DA-H 80',
    slug: 'hks-m-da-h-80',
    series: 'M-DA-H (mobile)',
    seriesSlug: '',
    rotation: '180° / 360°',
    weight: '26.5 kg @180°; 36 kg @360°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l10-9-5-m-rf-185.jpg',
    imageW: 211,
    imageH: 182,
    imageAlt: 'Helical hydraulic rotary actuator, M-DA-H torque class (generic representative image, not the original HKS unit)',
    originBrand: 'HKS',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '1073 Nm',
    intro: 'The HKS M-DA-H 80 is a mobile-version helical hydraulic rotary actuator in HKS\'s M-DA-H programme (German maker). HKS uses its own bore/housing size numbers; the code is a size designation, not a torque figure and not a Helac size number, rated at about 1073 Nm output torque at 210 bar. The maker\'s table lists 180° / 360° builds for this base size. In the controlled cross-reference it sits in the ~1074 Nm torque class together with: Helac L10-9.5; Sungji SRA-140-180-CN-RF-SH-N-I. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Same torque class (comparable rated output; independent housing and mounting designs - do not assume matching dimensions): Helac L10-9.5 (~1074 Nm); Sungji SRA-140-180-CN-RF-SH-N-I (~1074 Nm). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'Can HM supply the HKS M-DA-H 80?',
        a: 'HM provides technical selection and a sourcing / alternative-supply route for the HKS M-DA-H 80 base size. We do not keep stock and do not promise availability or lead time; the exact HKS configuration (S1/S2, rotation direction, valve and seal options folded into the FU/S9xxx code) is confirmed against your nameplate, with the factory when needed, before we quote.',
      },
      {
        q: 'Is the M-DA-H 80 a one-to-one replacement for the Helac-class unit in the same torque bracket?',
        a: 'They sit in the same torque class in our controlled cross-reference, but HKS uses its own bore/housing design and dimensions. We do not claim a verified drop-in or a guaranteed-compatible unit from the model number alone; rotation, mounting interface, shaft and ports are checked against your unit and drawing first.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. HKS folds valve and seal options into the FU requirement code and the S9xxx material number; a complete HKS order code must be confirmed with HKS for each requirement (torque, rotation, S1/S2, rotation direction, valve, seal).',
      }
    ],
  },
  {
    model: 'M-DA-H 90',
    slug: 'hks-m-da-h-90',
    series: 'M-DA-H (mobile)',
    seriesSlug: '',
    rotation: '180° / 360°',
    weight: '43 kg @180°; 55 kg @360°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l10-9-5-m-rf-185.jpg',
    imageW: 211,
    imageH: 182,
    imageAlt: 'Helical hydraulic rotary actuator, M-DA-H torque class (generic representative image, not the original HKS unit)',
    originBrand: 'HKS',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '1700 Nm',
    intro: 'The HKS M-DA-H 90 is a mobile-version helical hydraulic rotary actuator in HKS\'s M-DA-H programme (German maker). HKS uses its own bore/housing size numbers; the code is a size designation, not a torque figure and not a Helac size number, rated at about 1700 Nm output torque at 210 bar. The maker\'s table lists 180° / 360° builds for this base size. In the controlled cross-reference it sits in the ~1695 Nm torque class together with: Helac L10-15; Sungji SRA-160-180-CN-RF-SH-N-I. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Same torque class (comparable rated output; independent housing and mounting designs - do not assume matching dimensions): Helac L10-15 (~1695 Nm); Sungji SRA-160-180-CN-RF-SH-N-I (~1695 Nm). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'Can HM supply the HKS M-DA-H 90?',
        a: 'HM provides technical selection and a sourcing / alternative-supply route for the HKS M-DA-H 90 base size. We do not keep stock and do not promise availability or lead time; the exact HKS configuration (S1/S2, rotation direction, valve and seal options folded into the FU/S9xxx code) is confirmed against your nameplate, with the factory when needed, before we quote.',
      },
      {
        q: 'Is the M-DA-H 90 a one-to-one replacement for the Helac-class unit in the same torque bracket?',
        a: 'They sit in the same torque class in our controlled cross-reference, but HKS uses its own bore/housing design and dimensions. We do not claim a verified drop-in or a guaranteed-compatible unit from the model number alone; rotation, mounting interface, shaft and ports are checked against your unit and drawing first.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. HKS folds valve and seal options into the FU requirement code and the S9xxx material number; a complete HKS order code must be confirmed with HKS for each requirement (torque, rotation, S1/S2, rotation direction, valve, seal).',
      }
    ],
  },
  {
    model: 'M-DA-H 100',
    slug: 'hks-m-da-h-100',
    series: 'M-DA-H (mobile)',
    seriesSlug: '',
    rotation: '180° / 360°',
    weight: '58 kg @180°; 81.5 kg @360°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l10-9-5-m-rf-185.jpg',
    imageW: 211,
    imageH: 182,
    imageAlt: 'Helical hydraulic rotary actuator, M-DA-H torque class (generic representative image, not the original HKS unit)',
    originBrand: 'HKS',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '2900 Nm',
    intro: 'The HKS M-DA-H 100 is a mobile-version helical hydraulic rotary actuator in HKS\'s M-DA-H programme (German maker). HKS uses its own bore/housing size numbers; the code is a size designation, not a torque figure and not a Helac size number, rated at about 2900 Nm output torque at 210 bar. The maker\'s table lists 180° / 360° builds for this base size. In the controlled cross-reference it sits in the ~2825 Nm torque class together with: Helac L10-25. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Same torque class (comparable rated output; independent housing and mounting designs - do not assume matching dimensions): Helac L10-25 (~2825 Nm). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'Can HM supply the HKS M-DA-H 100?',
        a: 'HM provides technical selection and a sourcing / alternative-supply route for the HKS M-DA-H 100 base size. We do not keep stock and do not promise availability or lead time; the exact HKS configuration (S1/S2, rotation direction, valve and seal options folded into the FU/S9xxx code) is confirmed against your nameplate, with the factory when needed, before we quote.',
      },
      {
        q: 'Is the M-DA-H 100 a one-to-one replacement for the Helac-class unit in the same torque bracket?',
        a: 'They sit in the same torque class in our controlled cross-reference, but HKS uses its own bore/housing design and dimensions. We do not claim a verified drop-in or a guaranteed-compatible unit from the model number alone; rotation, mounting interface, shaft and ports are checked against your unit and drawing first.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. HKS folds valve and seal options into the FU requirement code and the S9xxx material number; a complete HKS order code must be confirmed with HKS for each requirement (torque, rotation, S1/S2, rotation direction, valve, seal).',
      }
    ],
  },
  {
    model: 'M-DA-H-F7 70',
    slug: 'hks-m-da-h-f7-70',
    series: 'M-DA-H-F7 (mobile housing variant)',
    seriesSlug: '',
    rotation: '180°',
    weight: '12.8 kg @180°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l20-15-e-cl-180-90.jpg',
    imageW: 291,
    imageH: 323,
    imageAlt: 'Helical hydraulic rotary actuator, M-DA-H-F7 torque class (generic representative image, not the original HKS unit)',
    originBrand: 'HKS',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '500 Nm',
    intro: 'The HKS M-DA-H-F7 70 is a mobile-version helical hydraulic rotary actuator in HKS\'s M-DA-H programme (German maker). HKS uses its own bore/housing size numbers; the code is a size designation, not a torque figure and not a Helac size number, rated at about 500 Nm output torque at 210 bar. In the controlled cross-reference it sits in the ~509 Nm torque class together with: Helac L20-4.5; Moveco RP17; Sungji SRB-080-180-CN-FT-SH-N-I. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Same torque class (comparable rated output; independent housing and mounting designs - do not assume matching dimensions): Helac L20-4.5 (~509 Nm); Moveco RP17 (~509 Nm); Sungji SRB-080-180-CN-FT-SH-N-I (~509 Nm). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'Can HM supply the HKS M-DA-H-F7 70?',
        a: 'HM provides technical selection and a sourcing / alternative-supply route for the HKS M-DA-H-F7 70 base size. We do not keep stock and do not promise availability or lead time; the exact HKS configuration (S1/S2, rotation direction, valve and seal options folded into the FU/S9xxx code) is confirmed against your nameplate, with the factory when needed, before we quote.',
      },
      {
        q: 'Is the M-DA-H-F7 70 a one-to-one replacement for the Helac-class unit in the same torque bracket?',
        a: 'They sit in the same torque class in our controlled cross-reference, but HKS uses its own bore/housing design and dimensions. We do not claim a verified drop-in or a guaranteed-compatible unit from the model number alone; rotation, mounting interface, shaft and ports are checked against your unit and drawing first.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. HKS folds valve and seal options into the FU requirement code and the S9xxx material number; a complete HKS order code must be confirmed with HKS for each requirement (torque, rotation, S1/S2, rotation direction, valve, seal).',
      }
    ],
  },
  {
    model: 'M-DA-H-F7 85',
    slug: 'hks-m-da-h-f7-85',
    series: 'M-DA-H-F7 (mobile housing variant)',
    seriesSlug: '',
    rotation: '180°',
    weight: '17 kg @180°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l20-15-e-cl-180-90.jpg',
    imageW: 291,
    imageH: 323,
    imageAlt: 'Helical hydraulic rotary actuator, M-DA-H-F7 torque class (generic representative image, not the original HKS unit)',
    originBrand: 'HKS',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '930 Nm',
    intro: 'The HKS M-DA-H-F7 85 is a mobile-version helical hydraulic rotary actuator in HKS\'s M-DA-H programme (German maker). HKS uses its own bore/housing size numbers; the code is a size designation, not a torque figure and not a Helac size number, rated at about 930 Nm output torque at 210 bar. In the controlled cross-reference it sits in the ~927 Nm torque class together with: Helac L20-8.2; Moveco RP24; Sungji SRB-090-180-CN-FT-SH-N-I. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Same torque class (comparable rated output; independent housing and mounting designs - do not assume matching dimensions): Helac L20-8.2 (~927 Nm); Moveco RP24 (~927 Nm); Sungji SRB-090-180-CN-FT-SH-N-I (~927 Nm). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'Can HM supply the HKS M-DA-H-F7 85?',
        a: 'HM provides technical selection and a sourcing / alternative-supply route for the HKS M-DA-H-F7 85 base size. We do not keep stock and do not promise availability or lead time; the exact HKS configuration (S1/S2, rotation direction, valve and seal options folded into the FU/S9xxx code) is confirmed against your nameplate, with the factory when needed, before we quote.',
      },
      {
        q: 'Is the M-DA-H-F7 85 a one-to-one replacement for the Helac-class unit in the same torque bracket?',
        a: 'They sit in the same torque class in our controlled cross-reference, but HKS uses its own bore/housing design and dimensions. We do not claim a verified drop-in or a guaranteed-compatible unit from the model number alone; rotation, mounting interface, shaft and ports are checked against your unit and drawing first.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. HKS folds valve and seal options into the FU requirement code and the S9xxx material number; a complete HKS order code must be confirmed with HKS for each requirement (torque, rotation, S1/S2, rotation direction, valve, seal).',
      }
    ],
  },
  {
    model: 'M-DA-H-F7 120',
    slug: 'hks-m-da-h-f7-120',
    series: 'M-DA-H-F7 (mobile housing variant)',
    seriesSlug: '',
    rotation: '180°',
    weight: '31 kg @180°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l20-15-e-cl-180-90.jpg',
    imageW: 291,
    imageH: 323,
    imageAlt: 'Helical hydraulic rotary actuator, M-DA-H-F7 torque class (generic representative image, not the original HKS unit)',
    originBrand: 'HKS',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '1700 Nm',
    intro: 'The HKS M-DA-H-F7 120 is a mobile-version helical hydraulic rotary actuator in HKS\'s M-DA-H programme (German maker). HKS uses its own bore/housing size numbers; the code is a size designation, not a torque figure and not a Helac size number, rated at about 1700 Nm output torque at 210 bar. In the controlled cross-reference it sits in the ~1695 Nm torque class together with: Helac L20-15; Moveco RP33; Sungji SRB-115-180-CN-FT-SH-N-I. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Same torque class (comparable rated output; independent housing and mounting designs - do not assume matching dimensions): Helac L20-15 (~1695 Nm); Moveco RP33 (~1695 Nm); Sungji SRB-115-180-CN-FT-SH-N-I (~1695 Nm). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'Can HM supply the HKS M-DA-H-F7 120?',
        a: 'HM provides technical selection and a sourcing / alternative-supply route for the HKS M-DA-H-F7 120 base size. We do not keep stock and do not promise availability or lead time; the exact HKS configuration (S1/S2, rotation direction, valve and seal options folded into the FU/S9xxx code) is confirmed against your nameplate, with the factory when needed, before we quote.',
      },
      {
        q: 'Is the M-DA-H-F7 120 a one-to-one replacement for the Helac-class unit in the same torque bracket?',
        a: 'They sit in the same torque class in our controlled cross-reference, but HKS uses its own bore/housing design and dimensions. We do not claim a verified drop-in or a guaranteed-compatible unit from the model number alone; rotation, mounting interface, shaft and ports are checked against your unit and drawing first.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. HKS folds valve and seal options into the FU requirement code and the S9xxx material number; a complete HKS order code must be confirmed with HKS for each requirement (torque, rotation, S1/S2, rotation direction, valve, seal).',
      }
    ],
  },
  {
    model: 'M-DA-H-F7 145',
    slug: 'hks-m-da-h-f7-145',
    series: 'M-DA-H-F7 (mobile housing variant)',
    seriesSlug: '',
    rotation: '180°',
    weight: '79.6 kg @180°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l20-15-e-cl-180-90.jpg',
    imageW: 291,
    imageH: 323,
    imageAlt: 'Helical hydraulic rotary actuator, M-DA-H-F7 torque class (generic representative image, not the original HKS unit)',
    originBrand: 'HKS',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '4400 Nm',
    intro: 'The HKS M-DA-H-F7 145 is a mobile-version helical hydraulic rotary actuator in HKS\'s M-DA-H programme (German maker). HKS uses its own bore/housing size numbers; the code is a size designation, not a torque figure and not a Helac size number, rated at about 4400 Nm output torque at 210 bar. In the controlled cross-reference it sits in the ~4407 Nm torque class together with: Helac L20-39; Moveco RP46; Sungji SRB-160-180-CN-FT-SH-N-I. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Same torque class (comparable rated output; independent housing and mounting designs - do not assume matching dimensions): Helac L20-39 (~4407 Nm); Moveco RP46 (~4407 Nm); Sungji SRB-160-180-CN-FT-SH-N-I (~4407 Nm). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'Can HM supply the HKS M-DA-H-F7 145?',
        a: 'HM provides technical selection and a sourcing / alternative-supply route for the HKS M-DA-H-F7 145 base size. We do not keep stock and do not promise availability or lead time; the exact HKS configuration (S1/S2, rotation direction, valve and seal options folded into the FU/S9xxx code) is confirmed against your nameplate, with the factory when needed, before we quote.',
      },
      {
        q: 'Is the M-DA-H-F7 145 a one-to-one replacement for the Helac-class unit in the same torque bracket?',
        a: 'They sit in the same torque class in our controlled cross-reference, but HKS uses its own bore/housing design and dimensions. We do not claim a verified drop-in or a guaranteed-compatible unit from the model number alone; rotation, mounting interface, shaft and ports are checked against your unit and drawing first.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. HKS folds valve and seal options into the FU requirement code and the S9xxx material number; a complete HKS order code must be confirmed with HKS for each requirement (torque, rotation, S1/S2, rotation direction, valve, seal).',
      }
    ],
  },
  {
    model: 'F5 115',
    slug: 'hks-f5-115',
    series: 'M-DA-H-F5 (foot) / F10 (flange)',
    seriesSlug: '',
    rotation: '180° / 360°',
    weight: '35 kg @180°; 47 kg @360°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l30-25-m-ft-180.jpg',
    imageW: 338,
    imageH: 232,
    imageAlt: 'Helical hydraulic rotary actuator, M-DA-H-F5 torque class (generic representative image, not the original HKS unit)',
    originBrand: 'HKS',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '1920 Nm',
    intro: 'The HKS F5 115 is a mobile-version helical hydraulic rotary actuator in HKS\'s M-DA-H programme (German maker). HKS uses its own bore/housing size numbers; the code is a size designation, not a torque figure and not a Helac size number, rated at about 1920 Nm output torque at 210 bar. The maker\'s table lists 180° / 360° builds for this base size. In the controlled cross-reference it sits in the ~1921 Nm torque class together with: Helac L30-17; Moveco RR34; Sungji SRC-115-180-CN-FT-SH-N-I. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Same torque class (comparable rated output; independent housing and mounting designs - do not assume matching dimensions): Helac L30-17 (~1921 Nm); Moveco RR34 (~1921 Nm); Sungji SRC-115-180-CN-FT-SH-N-I (~1921 Nm). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'Can HM supply the HKS F5 115?',
        a: 'HM provides technical selection and a sourcing / alternative-supply route for the HKS F5 115 base size. We do not keep stock and do not promise availability or lead time; the exact HKS configuration (S1/S2, rotation direction, valve and seal options folded into the FU/S9xxx code) is confirmed against your nameplate, with the factory when needed, before we quote.',
      },
      {
        q: 'Is the F5 115 a one-to-one replacement for the Helac-class unit in the same torque bracket?',
        a: 'They sit in the same torque class in our controlled cross-reference, but HKS uses its own bore/housing design and dimensions. We do not claim a verified drop-in or a guaranteed-compatible unit from the model number alone; rotation, mounting interface, shaft and ports are checked against your unit and drawing first.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. HKS folds valve and seal options into the FU requirement code and the S9xxx material number; a complete HKS order code must be confirmed with HKS for each requirement (torque, rotation, S1/S2, rotation direction, valve, seal).',
      }
    ],
  },
  {
    model: 'F5 150',
    slug: 'hks-f5-150',
    series: 'M-DA-H-F5 (foot) / F10 (flange)',
    seriesSlug: '',
    rotation: '180° / 360°',
    weight: '74 kg @180°; 99 kg @360°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l30-42-m-ft-180.jpg',
    imageW: 408,
    imageH: 246,
    imageAlt: 'Helical hydraulic rotary actuator, M-DA-H-F5 torque class (generic representative image, not the original HKS unit)',
    originBrand: 'HKS',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '4750 Nm',
    intro: 'The HKS F5 150 is a mobile-version helical hydraulic rotary actuator in HKS\'s M-DA-H programme (German maker). HKS uses its own bore/housing size numbers; the code is a size designation, not a torque figure and not a Helac size number, rated at about 4750 Nm output torque at 210 bar. The maker\'s table lists 180° / 360° builds for this base size. In the controlled cross-reference it sits in the ~4746 Nm torque class together with: Helac L30-42; Moveco RR46; Sungji SRC-150-180-CN-FT-SH-N-I. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Same torque class (comparable rated output; independent housing and mounting designs - do not assume matching dimensions): Helac L30-42 (~4746 Nm); Moveco RR46 (~4746 Nm); Sungji SRC-150-180-CN-FT-SH-N-I (~4746 Nm). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'Can HM supply the HKS F5 150?',
        a: 'HM provides technical selection and a sourcing / alternative-supply route for the HKS F5 150 base size. We do not keep stock and do not promise availability or lead time; the exact HKS configuration (S1/S2, rotation direction, valve and seal options folded into the FU/S9xxx code) is confirmed against your nameplate, with the factory when needed, before we quote.',
      },
      {
        q: 'Is the F5 150 a one-to-one replacement for the Helac-class unit in the same torque bracket?',
        a: 'They sit in the same torque class in our controlled cross-reference, but HKS uses its own bore/housing design and dimensions. We do not claim a verified drop-in or a guaranteed-compatible unit from the model number alone; rotation, mounting interface, shaft and ports are checked against your unit and drawing first.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. HKS folds valve and seal options into the FU requirement code and the S9xxx material number; a complete HKS order code must be confirmed with HKS for each requirement (torque, rotation, S1/S2, rotation direction, valve, seal).',
      }
    ],
  },
  {
    model: 'F5 200',
    slug: 'hks-f5-200',
    series: 'M-DA-H-F5 (foot) / F10 (flange)',
    seriesSlug: '',
    rotation: '180° / 360°',
    weight: '160 kg @180°; 200 kg @360°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l30-65-s-rf-360.jpg',
    imageW: 384,
    imageH: 510,
    imageAlt: 'Helical hydraulic rotary actuator, M-DA-H-F5 torque class (generic representative image, not the original HKS unit)',
    originBrand: 'HKS',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '10700 Nm',
    intro: 'The HKS F5 200 is a mobile-version helical hydraulic rotary actuator in HKS\'s M-DA-H programme (German maker). HKS uses its own bore/housing size numbers; the code is a size designation, not a torque figure and not a Helac size number, rated at about 10700 Nm output torque at 210 bar. The maker\'s table lists 180° / 360° builds for this base size. In the controlled cross-reference it sits in the ~10735 Nm torque class together with: Helac L30-95. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Same torque class (comparable rated output; independent housing and mounting designs - do not assume matching dimensions): Helac L30-95 (~10735 Nm). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'Can HM supply the HKS F5 200?',
        a: 'HM provides technical selection and a sourcing / alternative-supply route for the HKS F5 200 base size. We do not keep stock and do not promise availability or lead time; the exact HKS configuration (S1/S2, rotation direction, valve and seal options folded into the FU/S9xxx code) is confirmed against your nameplate, with the factory when needed, before we quote.',
      },
      {
        q: 'Is the F5 200 a one-to-one replacement for the Helac-class unit in the same torque bracket?',
        a: 'They sit in the same torque class in our controlled cross-reference, but HKS uses its own bore/housing design and dimensions. We do not claim a verified drop-in or a guaranteed-compatible unit from the model number alone; rotation, mounting interface, shaft and ports are checked against your unit and drawing first.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. HKS folds valve and seal options into the FU requirement code and the S9xxx material number; a complete HKS order code must be confirmed with HKS for each requirement (torque, rotation, S1/S2, rotation direction, valve, seal).',
      }
    ],
  },

  // --- Batch4 P1 (2026-10-19): Sungji multi-brand sourcing entries (8) ---
  {
    model: 'SRA-080-180-CN-RF-SH-N-I',
    slug: 'sungji-sra-080-180-cn-rf-sh-n-i',
    series: 'SRA (L10 class, rear flange)',
    seriesSlug: '',
    rotation: '180°',
    weight: '7.1 kg @180°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l10-3-0-e-rf-180.jpg',
    imageW: 211,
    imageH: 212,
    imageAlt: 'Helical hydraulic rotary actuator, SRA torque class (generic representative image, not the original Sungji unit)',
    originBrand: 'Sungji',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '196.1 Nm',
    intro: 'The Sungji SRA-080-180-CN-RF-SH-N-I is a helical hydraulic rotary actuator from Sungji (SJH, Korea); the ordering code follows the SRA/SRB/SRS family, bore size, rotation, valve, mounting and seal segments, rated at about 196.1 Nm output torque at 210 bar. In the controlled cross-reference it sits in the ~196.1 Nm torque class together with: HKS M-DA-H 50. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Same torque class (comparable rated output; independent housing and mounting designs - do not assume matching dimensions): HKS M-DA-H 50 (~196.1 Nm). Performance neighbours only, not the same anchor class: Helac L10-3.0 (~339 Nm, +73%). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'What does the Sungji code SRA-080-180-CN-RF-SH-N-I mean, and can HM source it?',
        a: 'The code encodes the SRA family, bore size, rotation, valve/port, mounting, shaft cover and seal/standard. HM can source or arrange alternative supply for this standard build after confirming the exact configuration from your nameplate; we do not hold it as stock or promise lead time.',
      },
      {
        q: 'Does it match the Helac / HKS / Moveco unit listed in the same torque class?',
        a: 'They are same-torque-class engineering references only; housings, mounts and published moment figures differ (some Sungji sizes are rated stronger). We do not claim a verified drop-in or guaranteed compatibility without checking the drawing, mounting dimensions, shaft and ports against your unit.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. Valve port (7/16-20 UNF vs G1/4), no-valve, double-flange, mounting style and special-seal variants are distinct order codes; the exact build is confirmed from your nameplate.',
      }
    ],
  },
  {
    model: 'SRA-110-180-CN-RF-SH-N-I',
    slug: 'sungji-sra-110-180-cn-rf-sh-n-i',
    series: 'SRA (L10 class, rear flange)',
    seriesSlug: '',
    rotation: '180°',
    weight: '14.8 kg @180°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l10-5-5-m-rf-360.jpg',
    imageW: 333,
    imageH: 246,
    imageAlt: 'Helical hydraulic rotary actuator, SRA torque class (generic representative image, not the original Sungji unit)',
    originBrand: 'Sungji',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '735.5 Nm',
    intro: 'The Sungji SRA-110-180-CN-RF-SH-N-I is a helical hydraulic rotary actuator from Sungji (SJH, Korea); the ordering code follows the SRA/SRB/SRS family, bore size, rotation, valve, mounting and seal segments, rated at about 735.5 Nm output torque at 210 bar. In the controlled cross-reference it sits in the ~735.5 Nm torque class together with: HKS M-DA-H 63. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Same torque class (comparable rated output; independent housing and mounting designs - do not assume matching dimensions): HKS M-DA-H 63 (~735.5 Nm). Performance neighbours only, not the same anchor class: Helac L10-5.5 (~622 Nm, -15%). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'What does the Sungji code SRA-110-180-CN-RF-SH-N-I mean, and can HM source it?',
        a: 'The code encodes the SRA family, bore size, rotation, valve/port, mounting, shaft cover and seal/standard. HM can source or arrange alternative supply for this standard build after confirming the exact configuration from your nameplate; we do not hold it as stock or promise lead time.',
      },
      {
        q: 'Does it match the Helac / HKS / Moveco unit listed in the same torque class?',
        a: 'They are same-torque-class engineering references only; housings, mounts and published moment figures differ (some Sungji sizes are rated stronger). We do not claim a verified drop-in or guaranteed compatibility without checking the drawing, mounting dimensions, shaft and ports against your unit.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. Valve port (7/16-20 UNF vs G1/4), no-valve, double-flange, mounting style and special-seal variants are distinct order codes; the exact build is confirmed from your nameplate.',
      }
    ],
  },
  {
    model: 'SRB-080-180-CN-FT-SH-N-I',
    slug: 'sungji-srb-080-180-cn-ft-sh-n-i',
    series: 'SRB (L20 class, multi-mount)',
    seriesSlug: '',
    rotation: '180°',
    weight: '12 kg @180°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l20-15-e-cl-180-90.jpg',
    imageW: 291,
    imageH: 323,
    imageAlt: 'Helical hydraulic rotary actuator, SRB torque class (generic representative image, not the original Sungji unit)',
    originBrand: 'Sungji',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '559 Nm',
    intro: 'The Sungji SRB-080-180-CN-FT-SH-N-I is a helical hydraulic rotary actuator from Sungji (SJH, Korea); the ordering code follows the SRA/SRB/SRS family, bore size, rotation, valve, mounting and seal segments, rated at about 559 Nm output torque at 210 bar. In the controlled cross-reference it sits in the ~509 Nm torque class together with: Helac L20-4.5; HKS M-DA-H-F7 70; Moveco RP17. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Same torque class (comparable rated output; independent housing and mounting designs - do not assume matching dimensions): Helac L20-4.5 (~509 Nm); HKS M-DA-H-F7 70 (~509 Nm); Moveco RP17 (~509 Nm). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'What does the Sungji code SRB-080-180-CN-FT-SH-N-I mean, and can HM source it?',
        a: 'The code encodes the SRB family, bore size, rotation, valve/port, mounting, shaft cover and seal/standard. HM can source or arrange alternative supply for this standard build after confirming the exact configuration from your nameplate; we do not hold it as stock or promise lead time.',
      },
      {
        q: 'Does it match the Helac / HKS / Moveco unit listed in the same torque class?',
        a: 'They are same-torque-class engineering references only; housings, mounts and published moment figures differ (some Sungji sizes are rated stronger). We do not claim a verified drop-in or guaranteed compatibility without checking the drawing, mounting dimensions, shaft and ports against your unit.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. Valve port (7/16-20 UNF vs G1/4), no-valve, double-flange, mounting style and special-seal variants are distinct order codes; the exact build is confirmed from your nameplate.',
      }
    ],
  },
  {
    model: 'SRB-090-180-CN-FT-SH-N-I',
    slug: 'sungji-srb-090-180-cn-ft-sh-n-i',
    series: 'SRB (L20 class, multi-mount)',
    seriesSlug: '',
    rotation: '180°',
    weight: '16 kg @180°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l20-15-e-cl-180-90.jpg',
    imageW: 291,
    imageH: 323,
    imageAlt: 'Helical hydraulic rotary actuator, SRB torque class (generic representative image, not the original Sungji unit)',
    originBrand: 'Sungji',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '1029.7 Nm',
    intro: 'The Sungji SRB-090-180-CN-FT-SH-N-I is a helical hydraulic rotary actuator from Sungji (SJH, Korea); the ordering code follows the SRA/SRB/SRS family, bore size, rotation, valve, mounting and seal segments, rated at about 1029.7 Nm output torque at 210 bar. In the controlled cross-reference it sits in the ~927 Nm torque class together with: Helac L20-8.2; HKS M-DA-H-F7 85; Moveco RP24. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Same torque class (comparable rated output; independent housing and mounting designs - do not assume matching dimensions): Helac L20-8.2 (~927 Nm); HKS M-DA-H-F7 85 (~927 Nm); Moveco RP24 (~927 Nm). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'What does the Sungji code SRB-090-180-CN-FT-SH-N-I mean, and can HM source it?',
        a: 'The code encodes the SRB family, bore size, rotation, valve/port, mounting, shaft cover and seal/standard. HM can source or arrange alternative supply for this standard build after confirming the exact configuration from your nameplate; we do not hold it as stock or promise lead time.',
      },
      {
        q: 'Does it match the Helac / HKS / Moveco unit listed in the same torque class?',
        a: 'They are same-torque-class engineering references only; housings, mounts and published moment figures differ (some Sungji sizes are rated stronger). We do not claim a verified drop-in or guaranteed compatibility without checking the drawing, mounting dimensions, shaft and ports against your unit.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. Valve port (7/16-20 UNF vs G1/4), no-valve, double-flange, mounting style and special-seal variants are distinct order codes; the exact build is confirmed from your nameplate.',
      }
    ],
  },
  {
    model: 'SRB-140-180-CN-FT-SH-N-I',
    slug: 'sungji-srb-140-180-cn-ft-sh-n-i',
    series: 'SRB (L20 class, multi-mount)',
    seriesSlug: '',
    rotation: '180°',
    weight: '49 kg @180°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l20-15-e-cl-180-90.jpg',
    imageW: 291,
    imageH: 323,
    imageAlt: 'Helical hydraulic rotary actuator, SRB torque class (generic representative image, not the original Sungji unit)',
    originBrand: 'Sungji',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '3069.5 Nm',
    intro: 'The Sungji SRB-140-180-CN-FT-SH-N-I is a helical hydraulic rotary actuator from Sungji (SJH, Korea); the ordering code follows the SRA/SRB/SRS family, bore size, rotation, valve, mounting and seal segments, rated at about 3069.5 Nm output torque at 210 bar. In the controlled cross-reference it sits in the ~2825 Nm torque class together with: Helac L20-25; Moveco RP40; HKS M-DA-H-F7 125. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Same torque class (comparable rated output; independent housing and mounting designs - do not assume matching dimensions): Helac L20-25 (~2825 Nm); Moveco RP40 (~2825 Nm); HKS M-DA-H-F7 125 (~2825 Nm). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'What does the Sungji code SRB-140-180-CN-FT-SH-N-I mean, and can HM source it?',
        a: 'The code encodes the SRB family, bore size, rotation, valve/port, mounting, shaft cover and seal/standard. HM can source or arrange alternative supply for this standard build after confirming the exact configuration from your nameplate; we do not hold it as stock or promise lead time.',
      },
      {
        q: 'Does it match the Helac / HKS / Moveco unit listed in the same torque class?',
        a: 'They are same-torque-class engineering references only; housings, mounts and published moment figures differ (some Sungji sizes are rated stronger). We do not claim a verified drop-in or guaranteed compatibility without checking the drawing, mounting dimensions, shaft and ports against your unit.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. Valve port (7/16-20 UNF vs G1/4), no-valve, double-flange, mounting style and special-seal variants are distinct order codes; the exact build is confirmed from your nameplate.',
      }
    ],
  },
  {
    model: 'SRS-090-220-CN-FT-DS-N-I',
    slug: 'sungji-srs-090-220-cn-ft-ds-n-i',
    series: 'SRS (T class, dual spline, 220°)',
    seriesSlug: '',
    rotation: '220°',
    weight: '30 kg @180°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l20-15-e-cl-180-90.jpg',
    imageW: 291,
    imageH: 323,
    imageAlt: 'Helical hydraulic rotary actuator, SRS torque class (generic representative image, not the original Sungji unit)',
    originBrand: 'Sungji',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '1696.6 Nm',
    intro: 'The Sungji SRS-090-220-CN-FT-DS-N-I is a helical hydraulic rotary actuator from Sungji (SJH, Korea); the ordering code follows the SRA/SRB/SRS family, bore size, rotation, valve, mounting and seal segments, rated at about 1696.6 Nm output torque at 210 bar. The SRS family is a fixed 220-degree, dual-spline-output, foot-mounted design. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Performance neighbours only, not the same anchor class: Helac T20-25 / T30-27 (~2825 Nm, +66%). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'What does the Sungji code SRS-090-220-CN-FT-DS-N-I mean, and can HM source it?',
        a: 'The code encodes the SRS family, bore size, rotation, valve/port, mounting, shaft cover and seal/standard. HM can source or arrange alternative supply for this standard build after confirming the exact configuration from your nameplate; we do not hold it as stock or promise lead time.',
      },
      {
        q: 'Does it match the Helac / HKS / Moveco unit listed in the same torque class?',
        a: 'They are same-torque-class engineering references only; housings, mounts and published moment figures differ (some Sungji sizes are rated stronger). We do not claim a verified drop-in or guaranteed compatibility without checking the drawing, mounting dimensions, shaft and ports against your unit.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. Valve port (7/16-20 UNF vs G1/4), no-valve, double-flange, mounting style and special-seal variants are distinct order codes; the exact build is confirmed from your nameplate.',
      }
    ],
  },
  {
    model: 'SRS-115-220-CN-FT-DS-N-I',
    slug: 'sungji-srs-115-220-cn-ft-ds-n-i',
    series: 'SRS (T class, dual spline, 220°)',
    seriesSlug: '',
    rotation: '220°',
    weight: '36.5 kg @180°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l30-25-m-ft-180.jpg',
    imageW: 338,
    imageH: 232,
    imageAlt: 'Helical hydraulic rotary actuator, SRS torque class (generic representative image, not the original Sungji unit)',
    originBrand: 'Sungji',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '3049.9 Nm',
    intro: 'The Sungji SRS-115-220-CN-FT-DS-N-I is a helical hydraulic rotary actuator from Sungji (SJH, Korea); the ordering code follows the SRA/SRB/SRS family, bore size, rotation, valve, mounting and seal segments, rated at about 3049.9 Nm output torque at 210 bar. The SRS family is a fixed 220-degree, dual-spline-output, foot-mounted design. In the controlled cross-reference it sits in the ~2825 Nm torque class together with: Helac T20-25; Helac T30-27. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Same torque class (comparable rated output; independent housing and mounting designs - do not assume matching dimensions): Helac T20-25 (~2825 Nm); Helac T30-27 (~2825 Nm). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'What does the Sungji code SRS-115-220-CN-FT-DS-N-I mean, and can HM source it?',
        a: 'The code encodes the SRS family, bore size, rotation, valve/port, mounting, shaft cover and seal/standard. HM can source or arrange alternative supply for this standard build after confirming the exact configuration from your nameplate; we do not hold it as stock or promise lead time.',
      },
      {
        q: 'Does it match the Helac / HKS / Moveco unit listed in the same torque class?',
        a: 'They are same-torque-class engineering references only; housings, mounts and published moment figures differ (some Sungji sizes are rated stronger). We do not claim a verified drop-in or guaranteed compatibility without checking the drawing, mounting dimensions, shaft and ports against your unit.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. Valve port (7/16-20 UNF vs G1/4), no-valve, double-flange, mounting style and special-seal variants are distinct order codes; the exact build is confirmed from your nameplate.',
      }
    ],
  },
  {
    model: 'SRS-150-220-CN-FT-DS-N-I',
    slug: 'sungji-srs-150-220-cn-ft-ds-n-i',
    series: 'SRS (T class, dual spline, 220°)',
    seriesSlug: '',
    rotation: '220°',
    weight: '81 kg @180°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l30-65-s-rf-360.jpg',
    imageW: 384,
    imageH: 510,
    imageAlt: 'Helical hydraulic rotary actuator, SRS torque class (generic representative image, not the original Sungji unit)',
    originBrand: 'Sungji',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '6776.4 Nm',
    intro: 'The Sungji SRS-150-220-CN-FT-DS-N-I is a helical hydraulic rotary actuator from Sungji (SJH, Korea); the ordering code follows the SRA/SRB/SRS family, bore size, rotation, valve, mounting and seal segments, rated at about 6776.4 Nm output torque at 210 bar. The SRS family is a fixed 220-degree, dual-spline-output, foot-mounted design. In the controlled cross-reference it sits in the ~6780 Nm torque class together with: Helac T20-60. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Same torque class (comparable rated output; independent housing and mounting designs - do not assume matching dimensions): Helac T20-60 (~6780 Nm). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'What does the Sungji code SRS-150-220-CN-FT-DS-N-I mean, and can HM source it?',
        a: 'The code encodes the SRS family, bore size, rotation, valve/port, mounting, shaft cover and seal/standard. HM can source or arrange alternative supply for this standard build after confirming the exact configuration from your nameplate; we do not hold it as stock or promise lead time.',
      },
      {
        q: 'Does it match the Helac / HKS / Moveco unit listed in the same torque class?',
        a: 'They are same-torque-class engineering references only; housings, mounts and published moment figures differ (some Sungji sizes are rated stronger). We do not claim a verified drop-in or guaranteed compatibility without checking the drawing, mounting dimensions, shaft and ports against your unit.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. Valve port (7/16-20 UNF vs G1/4), no-valve, double-flange, mounting style and special-seal variants are distinct order codes; the exact build is confirmed from your nameplate.',
      }
    ],
  },

  // --- Batch4 P1 (2026-10-19): Moveco multi-brand sourcing entries (13) ---
  {
    model: 'RP17',
    slug: 'moveco-rp17',
    series: 'RP (ARP, flange)',
    seriesSlug: '',
    rotation: '180°',
    weight: '12 kg @180°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l20-15-e-cl-180-90.jpg',
    imageW: 291,
    imageH: 323,
    imageAlt: 'Helical hydraulic rotary actuator, RP torque class (generic representative image, not the original Moveco unit)',
    originBrand: 'Moveco',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '505 Nm',
    intro: 'The Moveco RP17 is a helical hydraulic rotary actuator from Moveco (Italy). The maker publishes the short size designation only; the full suffix after the size code is not disclosed in the available catalogue and has to be confirmed with the factory, rated at about 505 Nm output torque at 210 bar. This entry covers the 180-degree configuration only. In the controlled cross-reference it sits in the ~509 Nm torque class together with: Helac L20-4.5; HKS M-DA-H-F7 70; Sungji SRB-080-180-CN-FT-SH-N-I. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Same torque class (comparable rated output; independent housing and mounting designs - do not assume matching dimensions): Helac L20-4.5 (~509 Nm); HKS M-DA-H-F7 70 (~509 Nm); Sungji SRB-080-180-CN-FT-SH-N-I (~509 Nm). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'Why do you list only the short code RP17?',
        a: 'Moveco\'s available catalogue publishes the short size designation; the suffix after the size (rotation, OCV/direct ports and other options) is not published and must be confirmed with the factory. HM lists RP17 as a 180-degree sourcing entry and confirms the full build from your nameplate before quoting.',
      },
      {
        q: 'Can HM offer a same-size alternative to RP17?',
        a: 'HM offers technical selection and sourcing / alternative-supply support at the same torque class. We do not claim a verified drop-in or a guaranteed-compatible unit from the short code alone; send the nameplate and mounting drawing so we can confirm rotation, mounting, shaft and ports first.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. Moveco\'s public catalogue gives the short size code only; the full suffix is not published and is confirmed with the factory for every enquiry.',
      }
    ],
  },
  {
    model: 'RP24',
    slug: 'moveco-rp24',
    series: 'RP (ARP, flange)',
    seriesSlug: '',
    rotation: '180°',
    weight: '18 kg @180°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l20-15-e-cl-180-90.jpg',
    imageW: 291,
    imageH: 323,
    imageAlt: 'Helical hydraulic rotary actuator, RP torque class (generic representative image, not the original Moveco unit)',
    originBrand: 'Moveco',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '960 Nm',
    intro: 'The Moveco RP24 is a helical hydraulic rotary actuator from Moveco (Italy). The maker publishes the short size designation only; the full suffix after the size code is not disclosed in the available catalogue and has to be confirmed with the factory, rated at about 960 Nm output torque at 210 bar. This entry covers the 180-degree configuration only. In the controlled cross-reference it sits in the ~927 Nm torque class together with: Helac L20-8.2; HKS M-DA-H-F7 85; Sungji SRB-090-180-CN-FT-SH-N-I. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Same torque class (comparable rated output; independent housing and mounting designs - do not assume matching dimensions): Helac L20-8.2 (~927 Nm); HKS M-DA-H-F7 85 (~927 Nm); Sungji SRB-090-180-CN-FT-SH-N-I (~927 Nm). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'Why do you list only the short code RP24?',
        a: 'Moveco\'s available catalogue publishes the short size designation; the suffix after the size (rotation, OCV/direct ports and other options) is not published and must be confirmed with the factory. HM lists RP24 as a 180-degree sourcing entry and confirms the full build from your nameplate before quoting.',
      },
      {
        q: 'Can HM offer a same-size alternative to RP24?',
        a: 'HM offers technical selection and sourcing / alternative-supply support at the same torque class. We do not claim a verified drop-in or a guaranteed-compatible unit from the short code alone; send the nameplate and mounting drawing so we can confirm rotation, mounting, shaft and ports first.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. Moveco\'s public catalogue gives the short size code only; the full suffix is not published and is confirmed with the factory for every enquiry.',
      }
    ],
  },
  {
    model: 'RP33',
    slug: 'moveco-rp33',
    series: 'RP (ARP, flange)',
    seriesSlug: '',
    rotation: '180°',
    weight: '31.5 kg @180°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l20-15-e-cl-180-90.jpg',
    imageW: 291,
    imageH: 323,
    imageAlt: 'Helical hydraulic rotary actuator, RP torque class (generic representative image, not the original Moveco unit)',
    originBrand: 'Moveco',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '1865 Nm',
    intro: 'The Moveco RP33 is a helical hydraulic rotary actuator from Moveco (Italy). The maker publishes the short size designation only; the full suffix after the size code is not disclosed in the available catalogue and has to be confirmed with the factory, rated at about 1865 Nm output torque at 210 bar. This entry covers the 180-degree configuration only. In the controlled cross-reference it sits in the ~1695 Nm torque class together with: Helac L20-15; HKS M-DA-H-F7 120; Sungji SRB-115-180-CN-FT-SH-N-I. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Same torque class (comparable rated output; independent housing and mounting designs - do not assume matching dimensions): Helac L20-15 (~1695 Nm); HKS M-DA-H-F7 120 (~1695 Nm); Sungji SRB-115-180-CN-FT-SH-N-I (~1695 Nm). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'Why do you list only the short code RP33?',
        a: 'Moveco\'s available catalogue publishes the short size designation; the suffix after the size (rotation, OCV/direct ports and other options) is not published and must be confirmed with the factory. HM lists RP33 as a 180-degree sourcing entry and confirms the full build from your nameplate before quoting.',
      },
      {
        q: 'Can HM offer a same-size alternative to RP33?',
        a: 'HM offers technical selection and sourcing / alternative-supply support at the same torque class. We do not claim a verified drop-in or a guaranteed-compatible unit from the short code alone; send the nameplate and mounting drawing so we can confirm rotation, mounting, shaft and ports first.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. Moveco\'s public catalogue gives the short size code only; the full suffix is not published and is confirmed with the factory for every enquiry.',
      }
    ],
  },
  {
    model: 'RP40',
    slug: 'moveco-rp40',
    series: 'RP (ARP, flange)',
    seriesSlug: '',
    rotation: '180°',
    weight: '51 kg @180°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l20-15-e-cl-180-90.jpg',
    imageW: 291,
    imageH: 323,
    imageAlt: 'Helical hydraulic rotary actuator, RP torque class (generic representative image, not the original Moveco unit)',
    originBrand: 'Moveco',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '3100 Nm',
    intro: 'The Moveco RP40 is a helical hydraulic rotary actuator from Moveco (Italy). The maker publishes the short size designation only; the full suffix after the size code is not disclosed in the available catalogue and has to be confirmed with the factory, rated at about 3100 Nm output torque at 210 bar. This entry covers the 180-degree configuration only. In the controlled cross-reference it sits in the ~2825 Nm torque class together with: Helac L20-25; Sungji SRB-140-180-CN-FT-SH-N-I; HKS M-DA-H-F7 125. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Same torque class (comparable rated output; independent housing and mounting designs - do not assume matching dimensions): Helac L20-25 (~2825 Nm); Sungji SRB-140-180-CN-FT-SH-N-I (~2825 Nm); HKS M-DA-H-F7 125 (~2825 Nm). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'Why do you list only the short code RP40?',
        a: 'Moveco\'s available catalogue publishes the short size designation; the suffix after the size (rotation, OCV/direct ports and other options) is not published and must be confirmed with the factory. HM lists RP40 as a 180-degree sourcing entry and confirms the full build from your nameplate before quoting.',
      },
      {
        q: 'Can HM offer a same-size alternative to RP40?',
        a: 'HM offers technical selection and sourcing / alternative-supply support at the same torque class. We do not claim a verified drop-in or a guaranteed-compatible unit from the short code alone; send the nameplate and mounting drawing so we can confirm rotation, mounting, shaft and ports first.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. Moveco\'s public catalogue gives the short size code only; the full suffix is not published and is confirmed with the factory for every enquiry.',
      }
    ],
  },
  {
    model: 'RP46',
    slug: 'moveco-rp46',
    series: 'RP (ARP, flange)',
    seriesSlug: '',
    rotation: '180°',
    weight: '87 kg @180°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l20-15-e-cl-180-90.jpg',
    imageW: 291,
    imageH: 323,
    imageAlt: 'Helical hydraulic rotary actuator, RP torque class (generic representative image, not the original Moveco unit)',
    originBrand: 'Moveco',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '4800 Nm',
    intro: 'The Moveco RP46 is a helical hydraulic rotary actuator from Moveco (Italy). The maker publishes the short size designation only; the full suffix after the size code is not disclosed in the available catalogue and has to be confirmed with the factory, rated at about 4800 Nm output torque at 210 bar. This entry covers the 180-degree configuration only. In the controlled cross-reference it sits in the ~4407 Nm torque class together with: Helac L20-39; HKS M-DA-H-F7 145; Sungji SRB-160-180-CN-FT-SH-N-I. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Same torque class (comparable rated output; independent housing and mounting designs - do not assume matching dimensions): Helac L20-39 (~4407 Nm); HKS M-DA-H-F7 145 (~4407 Nm); Sungji SRB-160-180-CN-FT-SH-N-I (~4407 Nm). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'Why do you list only the short code RP46?',
        a: 'Moveco\'s available catalogue publishes the short size designation; the suffix after the size (rotation, OCV/direct ports and other options) is not published and must be confirmed with the factory. HM lists RP46 as a 180-degree sourcing entry and confirms the full build from your nameplate before quoting.',
      },
      {
        q: 'Can HM offer a same-size alternative to RP46?',
        a: 'HM offers technical selection and sourcing / alternative-supply support at the same torque class. We do not claim a verified drop-in or a guaranteed-compatible unit from the short code alone; send the nameplate and mounting drawing so we can confirm rotation, mounting, shaft and ports first.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. Moveco\'s public catalogue gives the short size code only; the full suffix is not published and is confirmed with the factory for every enquiry.',
      }
    ],
  },
  {
    model: 'RR34',
    slug: 'moveco-rr34',
    series: 'RR (ARR, foot)',
    seriesSlug: '',
    rotation: '180°',
    weight: '38 kg @180°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l30-25-m-ft-180.jpg',
    imageW: 338,
    imageH: 232,
    imageAlt: 'Helical hydraulic rotary actuator, RR torque class (generic representative image, not the original Moveco unit)',
    originBrand: 'Moveco',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '2020 Nm',
    intro: 'The Moveco RR34 is a helical hydraulic rotary actuator from Moveco (Italy). The maker publishes the short size designation only; the full suffix after the size code is not disclosed in the available catalogue and has to be confirmed with the factory, rated at about 2020 Nm output torque at 210 bar. This entry covers the 180-degree configuration only. In the controlled cross-reference it sits in the ~1921 Nm torque class together with: Helac L30-17; HKS F5 115; Sungji SRC-115-180-CN-FT-SH-N-I. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Same torque class (comparable rated output; independent housing and mounting designs - do not assume matching dimensions): Helac L30-17 (~1921 Nm); HKS F5 115 (~1921 Nm); Sungji SRC-115-180-CN-FT-SH-N-I (~1921 Nm). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'Why do you list only the short code RR34?',
        a: 'Moveco\'s available catalogue publishes the short size designation; the suffix after the size (rotation, OCV/direct ports and other options) is not published and must be confirmed with the factory. HM lists RR34 as a 180-degree sourcing entry and confirms the full build from your nameplate before quoting.',
      },
      {
        q: 'Can HM offer a same-size alternative to RR34?',
        a: 'HM offers technical selection and sourcing / alternative-supply support at the same torque class. We do not claim a verified drop-in or a guaranteed-compatible unit from the short code alone; send the nameplate and mounting drawing so we can confirm rotation, mounting, shaft and ports first.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. Moveco\'s public catalogue gives the short size code only; the full suffix is not published and is confirmed with the factory for every enquiry.',
      }
    ],
  },
  {
    model: 'RR40',
    slug: 'moveco-rr40',
    series: 'RR (ARR, foot)',
    seriesSlug: '',
    rotation: '180°',
    weight: '60 kg @180°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l30-25-m-ft-180.jpg',
    imageW: 338,
    imageH: 232,
    imageAlt: 'Helical hydraulic rotary actuator, RR torque class (generic representative image, not the original Moveco unit)',
    originBrand: 'Moveco',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '3100 Nm',
    intro: 'The Moveco RR40 is a helical hydraulic rotary actuator from Moveco (Italy). The maker publishes the short size designation only; the full suffix after the size code is not disclosed in the available catalogue and has to be confirmed with the factory, rated at about 3100 Nm output torque at 210 bar. This entry covers the 180-degree configuration only. In the controlled cross-reference it sits in the ~2825 Nm torque class together with: Helac L30-25; HKS F5 125; Sungji SRC-125-180-CN-FT-SH-N-I. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Same torque class (comparable rated output; independent housing and mounting designs - do not assume matching dimensions): Helac L30-25 (~2825 Nm); HKS F5 125 (~2825 Nm); Sungji SRC-125-180-CN-FT-SH-N-I (~2825 Nm). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'Why do you list only the short code RR40?',
        a: 'Moveco\'s available catalogue publishes the short size designation; the suffix after the size (rotation, OCV/direct ports and other options) is not published and must be confirmed with the factory. HM lists RR40 as a 180-degree sourcing entry and confirms the full build from your nameplate before quoting.',
      },
      {
        q: 'Can HM offer a same-size alternative to RR40?',
        a: 'HM offers technical selection and sourcing / alternative-supply support at the same torque class. We do not claim a verified drop-in or a guaranteed-compatible unit from the short code alone; send the nameplate and mounting drawing so we can confirm rotation, mounting, shaft and ports first.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. Moveco\'s public catalogue gives the short size code only; the full suffix is not published and is confirmed with the factory for every enquiry.',
      }
    ],
  },
  {
    model: 'RR46',
    slug: 'moveco-rr46',
    series: 'RR (ARR, foot)',
    seriesSlug: '',
    rotation: '180°',
    weight: '86 kg @180°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l30-42-m-ft-180.jpg',
    imageW: 408,
    imageH: 246,
    imageAlt: 'Helical hydraulic rotary actuator, RR torque class (generic representative image, not the original Moveco unit)',
    originBrand: 'Moveco',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '5100 Nm',
    intro: 'The Moveco RR46 is a helical hydraulic rotary actuator from Moveco (Italy). The maker publishes the short size designation only; the full suffix after the size code is not disclosed in the available catalogue and has to be confirmed with the factory, rated at about 5100 Nm output torque at 210 bar. This entry covers the 180-degree configuration only. In the controlled cross-reference it sits in the ~4746 Nm torque class together with: Helac L30-42; HKS F5 150; Sungji SRC-150-180-CN-FT-SH-N-I. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Same torque class (comparable rated output; independent housing and mounting designs - do not assume matching dimensions): Helac L30-42 (~4746 Nm); HKS F5 150 (~4746 Nm); Sungji SRC-150-180-CN-FT-SH-N-I (~4746 Nm). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'Why do you list only the short code RR46?',
        a: 'Moveco\'s available catalogue publishes the short size designation; the suffix after the size (rotation, OCV/direct ports and other options) is not published and must be confirmed with the factory. HM lists RR46 as a 180-degree sourcing entry and confirms the full build from your nameplate before quoting.',
      },
      {
        q: 'Can HM offer a same-size alternative to RR46?',
        a: 'HM offers technical selection and sourcing / alternative-supply support at the same torque class. We do not claim a verified drop-in or a guaranteed-compatible unit from the short code alone; send the nameplate and mounting drawing so we can confirm rotation, mounting, shaft and ports first.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. Moveco\'s public catalogue gives the short size code only; the full suffix is not published and is confirmed with the factory for every enquiry.',
      }
    ],
  },
  {
    model: 'RR52',
    slug: 'moveco-rr52',
    series: 'RR (ARR, foot)',
    seriesSlug: '',
    rotation: '180°',
    weight: '124 kg @180°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l30-65-s-rf-360.jpg',
    imageW: 384,
    imageH: 510,
    imageAlt: 'Helical hydraulic rotary actuator, RR torque class (generic representative image, not the original Moveco unit)',
    originBrand: 'Moveco',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '8050 Nm',
    intro: 'The Moveco RR52 is a helical hydraulic rotary actuator from Moveco (Italy). The maker publishes the short size designation only; the full suffix after the size code is not disclosed in the available catalogue and has to be confirmed with the factory, rated at about 8050 Nm output torque at 210 bar. This entry covers the 180-degree configuration only. In the controlled cross-reference it sits in the ~7345 Nm torque class together with: Helac L30-65; HKS F5 175. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Same torque class (comparable rated output; independent housing and mounting designs - do not assume matching dimensions): Helac L30-65 (~7345 Nm); HKS F5 175 (~7345 Nm). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'Why do you list only the short code RR52?',
        a: 'Moveco\'s available catalogue publishes the short size designation; the suffix after the size (rotation, OCV/direct ports and other options) is not published and must be confirmed with the factory. HM lists RR52 as a 180-degree sourcing entry and confirms the full build from your nameplate before quoting.',
      },
      {
        q: 'Can HM offer a same-size alternative to RR52?',
        a: 'HM offers technical selection and sourcing / alternative-supply support at the same torque class. We do not claim a verified drop-in or a guaranteed-compatible unit from the short code alone; send the nameplate and mounting drawing so we can confirm rotation, mounting, shaft and ports first.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. Moveco\'s public catalogue gives the short size code only; the full suffix is not published and is confirmed with the factory for every enquiry.',
      }
    ],
  },
  {
    model: 'RR58',
    slug: 'moveco-rr58',
    series: 'RR (ARR, foot)',
    seriesSlug: '',
    rotation: '180°',
    weight: '185 kg @180°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l30-65-s-rf-360.jpg',
    imageW: 384,
    imageH: 510,
    imageAlt: 'Helical hydraulic rotary actuator, RR torque class (generic representative image, not the original Moveco unit)',
    originBrand: 'Moveco',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '12700 Nm',
    intro: 'The Moveco RR58 is a helical hydraulic rotary actuator from Moveco (Italy). The maker publishes the short size designation only; the full suffix after the size code is not disclosed in the available catalogue and has to be confirmed with the factory, rated at about 12700 Nm output torque at 210 bar. This entry covers the 180-degree configuration only. In the controlled cross-reference it sits in the ~14125 Nm torque class together with: Helac L30-125; HKS F5 220. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Same torque class (comparable rated output; independent housing and mounting designs - do not assume matching dimensions): Helac L30-125 (~14125 Nm); HKS F5 220 (~14125 Nm). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'Why do you list only the short code RR58?',
        a: 'Moveco\'s available catalogue publishes the short size designation; the suffix after the size (rotation, OCV/direct ports and other options) is not published and must be confirmed with the factory. HM lists RR58 as a 180-degree sourcing entry and confirms the full build from your nameplate before quoting.',
      },
      {
        q: 'Can HM offer a same-size alternative to RR58?',
        a: 'HM offers technical selection and sourcing / alternative-supply support at the same torque class. We do not claim a verified drop-in or a guaranteed-compatible unit from the short code alone; send the nameplate and mounting drawing so we can confirm rotation, mounting, shaft and ports first.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. Moveco\'s public catalogue gives the short size code only; the full suffix is not published and is confirmed with the factory for every enquiry.',
      }
    ],
  },
  {
    model: 'RR66',
    slug: 'moveco-rr66',
    series: 'RR (ARR, foot)',
    seriesSlug: '',
    rotation: '180°',
    weight: '300 kg @180°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l40-110-m-rf-360.jpg',
    imageW: 435,
    imageH: 197,
    imageAlt: 'Helical hydraulic rotary actuator, RR torque class (generic representative image, not the original Moveco unit)',
    originBrand: 'Moveco',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '20000 Nm',
    intro: 'The Moveco RR66 is a helical hydraulic rotary actuator from Moveco (Italy). The maker publishes the short size designation only; the full suffix after the size code is not disclosed in the available catalogue and has to be confirmed with the factory, rated at about 20000 Nm output torque at 210 bar. This entry covers the 180-degree configuration only. In the controlled cross-reference it sits in the ~18645 Nm torque class together with: Helac L30-165; HKS F5 245. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Same torque class (comparable rated output; independent housing and mounting designs - do not assume matching dimensions): Helac L30-165 (~18645 Nm); HKS F5 245 (~18645 Nm). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'Why do you list only the short code RR66?',
        a: 'Moveco\'s available catalogue publishes the short size designation; the suffix after the size (rotation, OCV/direct ports and other options) is not published and must be confirmed with the factory. HM lists RR66 as a 180-degree sourcing entry and confirms the full build from your nameplate before quoting.',
      },
      {
        q: 'Can HM offer a same-size alternative to RR66?',
        a: 'HM offers technical selection and sourcing / alternative-supply support at the same torque class. We do not claim a verified drop-in or a guaranteed-compatible unit from the short code alone; send the nameplate and mounting drawing so we can confirm rotation, mounting, shaft and ports first.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. Moveco\'s public catalogue gives the short size code only; the full suffix is not published and is confirmed with the factory for every enquiry.',
      }
    ],
  },
  {
    model: 'RR72',
    slug: 'moveco-rr72',
    series: 'RR (ARR, foot)',
    seriesSlug: '',
    rotation: '180°',
    weight: '390 kg @180°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l40-110-m-rf-360.jpg',
    imageW: 435,
    imageH: 197,
    imageAlt: 'Helical hydraulic rotary actuator, RR torque class (generic representative image, not the original Moveco unit)',
    originBrand: 'Moveco',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '27000 Nm',
    intro: 'The Moveco RR72 is a helical hydraulic rotary actuator from Moveco (Italy). The maker publishes the short size designation only; the full suffix after the size code is not disclosed in the available catalogue and has to be confirmed with the factory, rated at about 27000 Nm output torque at 210 bar. This entry covers the 180-degree configuration only. In the controlled cross-reference it sits in the ~24295 Nm torque class together with: Helac L30-215; HKS F5 265. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Same torque class (comparable rated output; independent housing and mounting designs - do not assume matching dimensions): Helac L30-215 (~24295 Nm); HKS F5 265 (~24295 Nm). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'Why do you list only the short code RR72?',
        a: 'Moveco\'s available catalogue publishes the short size designation; the suffix after the size (rotation, OCV/direct ports and other options) is not published and must be confirmed with the factory. HM lists RR72 as a 180-degree sourcing entry and confirms the full build from your nameplate before quoting.',
      },
      {
        q: 'Can HM offer a same-size alternative to RR72?',
        a: 'HM offers technical selection and sourcing / alternative-supply support at the same torque class. We do not claim a verified drop-in or a guaranteed-compatible unit from the short code alone; send the nameplate and mounting drawing so we can confirm rotation, mounting, shaft and ports first.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. Moveco\'s public catalogue gives the short size code only; the full suffix is not published and is confirmed with the factory for every enquiry.',
      }
    ],
  },
  {
    model: 'RR78',
    slug: 'moveco-rr78',
    series: 'RR (ARR, foot)',
    seriesSlug: '',
    rotation: '180°',
    weight: '544 kg @180°',
    brands: [],
    parts: [],
    machines: [],
    image: '/images/alternatives/l40-110-m-rf-360.jpg',
    imageW: 435,
    imageH: 197,
    imageAlt: 'Helical hydraulic rotary actuator, RR torque class (generic representative image, not the original Moveco unit)',
    originBrand: 'Moveco',
    sourcingOnly: true,
    hideSeriesLink: true,
    torque: '43000 Nm',
    intro: 'The Moveco RR78 is a helical hydraulic rotary actuator from Moveco (Italy). The maker publishes the short size designation only; the full suffix after the size code is not disclosed in the available catalogue and has to be confirmed with the factory, rated at about 43000 Nm output torque at 210 bar. This entry covers the 180-degree configuration only. In the controlled cross-reference it sits in the ~42900 Nm torque class together with: HKS F5 265S. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
    crossNote: 'All references below are engineering cross-references by torque class from HM\'s controlled multi-brand database; they are not validated substitutions. Same torque class (comparable rated output; independent housing and mounting designs - do not assume matching dimensions): HKS F5 265S (~42900 Nm). Performance neighbours only, not the same anchor class: Helac L30-215 (~24295 Nm, -43%). HM has no supply-verified interchange record for any of these pairings, so the highest claim we make is \'same torque class / comparable\'; nothing is presented as a verified interchangeable unit.',
    extraFaqs: [
      {
        q: 'Why do you list only the short code RR78?',
        a: 'Moveco\'s available catalogue publishes the short size designation; the suffix after the size (rotation, OCV/direct ports and other options) is not published and must be confirmed with the factory. HM lists RR78 as a 180-degree sourcing entry and confirms the full build from your nameplate before quoting.',
      },
      {
        q: 'Can HM offer a same-size alternative to RR78?',
        a: 'HM offers technical selection and sourcing / alternative-supply support at the same torque class. We do not claim a verified drop-in or a guaranteed-compatible unit from the short code alone; send the nameplate and mounting drawing so we can confirm rotation, mounting, shaft and ports first.',
      },
      {
        q: 'What information does HM need before quoting this actuator?',
        a: 'Send us the actuator nameplate (brand, full model code, rotation, mounting, shaft and port details) and, if available, a mounting drawing. HM then confirms the exact configuration and advises the available sourcing or alternative-supply option. Mounting dimensions and drawings are provided on request only. Moveco\'s public catalogue gives the short size code only; the full suffix is not published and is confirmed with the factory for every enquiry.',
      }
    ],
  },
  {
    model: 'L30-65-S-RF-180-S1-C-H',
    slug: 'l30-65-s-rf-180-s1-c-h',
    series: 'L30',
    seriesSlug: 'helac-l30-series',
    rotation: '180°',
    weight: '107 kg',
    brands: ['Atlas'],
    parts: ['3128312607'],
    machines: [],
    image: '/images/atlas-copco/l30-65-s-rf-180-s1-c-h-rotary-actuator.webp',
    imageW: 810,
    imageH: 950,
    imageAlt: 'Replacement rotary actuator matched to Atlas Copco / Epiroc part 3128312607, Helac L30-65-S-RF-180-S1-C-H, rear-flange mining build',
    intro:
      'Alternative rotary actuator for the Helac L30-65-S-RF-180-S1-C-H, a 180-degree, rear-flange (RF) helical actuator in the L30-65 mining class, in the 107 kg weight band. It is listed by Atlas Copco / Epiroc under part number 3128312607 (also written 3128-3126-07) in the supplier cross-reference list. This is the 180-degree rear-flange sibling of the better-documented 360-degree L30-65-RF build.',
    applicationNote:
      'Part number 3128312607 is recorded against the L30-65-S-RF-180-S1-C-H configuration; the source cross-reference does not tie it to a specific rig model. Because the same machine range can be built with 180-degree and 360-degree turning devices in different positions and serial numbers, please confirm the rotation angle, rear-flange mounting and ports against your actuator nameplate before ordering.',
    crossNote:
      'L30-65 series performance per the published Helac class, with the exact 180-degree rear-flange build, ports and mounting confirmed against the unit tag and drawing before a replacement is supplied. The rotation angle must not be assumed from the rig model alone.',
    extraFaqs: [
      {
        q: 'What is Atlas Copco / Epiroc part 3128312607?',
        a: 'Part 3128312607 is recorded against the Helac L30-65-S-RF-180-S1-C-H, the 180-degree rear-flange build of the L30-65 mining actuator, in the 107 kg class. Send the tag from your unit and we confirm the 180-degree rotation, rear-flange mounting and ports before quoting.',
      },
      {
        q: 'Is the L30-65-RF-180 the same as the L30-65-RF-360?',
        a: 'They share the same L30-65 rear-flange family but are different rotation-angle builds: this unit rotates 180 degrees, while the RF-360 builds (such as Atlas 3128312644) rotate 360 degrees. The angle, end stops and porting differ, so they are not interchangeable; confirm the rotation code on your nameplate before ordering.',
      },
    ],
  },
  {
    model: 'L40-110-M-FT-360-S1-C-H',
    slug: 'l40-110-m-ft-360-s1-c-h',
    series: 'L40',
    seriesSlug: 'helac-l40-series',
    rotation: '360°',
    weight: '150 kg',
    brands: ['Atlas'],
    parts: ['3128341084'],
    machines: ['Boomer S2'],
    image: '/images/atlas-copco/l40-110-m-ft-360-s1-c-h-rotary-actuator.webp',
    imageW: 1600,
    imageH: 857,
    imageAlt: 'Replacement rotary actuator matched to Atlas Copco / Epiroc part 3128341084, Helac L40-110-M-FT-360-S1-C-H, foot-mount mining build (L40 family representative image)',
    intro:
      'Alternative rotary actuator for the Helac L40-110-M-FT-360-S1-C-H, a heavy-duty 360-degree, foot-mount (FT) helical actuator in the L40-110 class, in the 150 kg weight band. It is listed by Atlas Copco / Epiroc under part number 3128341084 (also written 3128-3410-84) and is associated in the source parts documentation with the Boomer S2 development rig.',
    applicationNote:
      'Part number 3128341084 is recorded against the foot-mount L40-110 360-degree build. The image shows the L40-110 family; the exact foot-mount interface, shaft and ports are confirmed against your actuator nameplate and a drawing before ordering. Rigs in this range can use different turning devices by serial number and position.',
    crossNote:
      'The L40-110-M-FT-360 is the foot-mount sibling of the rear-flange L40-110-M-RF-360 build (Atlas 3128341070). Mounting interfaces differ between FT and RF, so they are not interchangeable; the mount, rotation and ports are verified against the unit tag before a replacement is supplied.',
    extraFaqs: [
      {
        q: 'What is Atlas Copco / Epiroc part 3128341084?',
        a: 'Part 3128341084 is recorded against the Helac L40-110-M-FT-360-S1-C-H, the heavy-duty 360-degree foot-mount actuator in the 150 kg class, associated with the Boomer S2 rig in the source parts documentation. Send your nameplate and we confirm the foot-mount interface, shaft and ports before quoting.',
      },
      {
        q: 'Does 3128341084 interchange with 3128341070 (L40-110-RF-360)?',
        a: 'Both are 360-degree L40-110 builds, but 3128341084 is the foot-mount (FT) version and 3128341070 is the rear-flange (RF) version. The mounting faces and bolt patterns differ, so they are not drop-in interchangeable; confirm the FT or RF mount on your tag before ordering.',
      },
    ],
  },
  {
    model: '3128309172 (HKS rotary actuator, Boltec)',
    slug: 'atlas-3128309172-hks-rotary-actuator',
    series: 'HKS',
    seriesSlug: '',
    rotation: '',
    weight: '',
    brands: ['Atlas'],
    parts: ['3128309172'],
    machines: ['Boltec 235', 'Boltec 235h', 'Boltec LC', 'Boltec MD'],
    image: '/images/products/hm-model-placeholder.png',
    imageW: 1200,
    imageH: 900,
    imageAlt: 'Heavy-duty helical hydraulic rotary actuator for mining bolting equipment (representative image, not the original HKS unit)',
    originBrand: 'HKS',
    sourcingOnly: true,
    modelCodeUnverified: true,
    hideSeriesLink: true,
    intro:
      'Atlas Copco / Epiroc part number 3128309172 (also written 3128-3091-72) is recorded in the supplier cross-reference as an HKS-make helical rotary / turning actuator fitted on the Boltec 235, 235h, LC and MD rock-bolting rigs. The exact HKS model code, rotation and mounting are not stated in the available cross-reference. HM provides sourcing and alternative-supply support for this reference; we do not represent the offered unit as an original HKS part or as a pre-verified interchangeable unit, and the configuration is confirmed against your actuator nameplate and drawing before quotation.',
    crossNote:
      'HKS is the original actuator brand; Atlas Copco / Epiroc lists the unit under part number 3128309172. Because the precise HKS model and interchangeability have not been independently verified, the drawing, mounting dimensions, shaft, ports and rotation are checked against your unit before any alternative is recommended.',
    extraFaqs: [
      {
        q: 'Which rig uses Atlas Copco / Epiroc part 3128309172?',
        a: 'Part 3128309172 is recorded as an HKS rotary actuator on the Boltec 235, 235h, LC and MD rock-bolting rigs in the supplier cross-reference. Boltec ranges can carry more than one turning device by position and serial number, so confirm the tag on your unit before ordering.',
      },
      {
        q: 'Can HM supply a replacement for the HKS unit 3128309172?',
        a: 'We offer sourcing and alternative-supply support but do not claim a verified drop-in or guaranteed-compatible unit from the part number alone, and the exact HKS model code is not in the cross-reference. Send the actuator nameplate and a mounting drawing; we confirm rotation, mounting interface, shaft and ports and then advise the available option.',
      },
    ],
  },
  {
    model: 'BG00391147 (Sandvik DD321-40 rotary / torque unit)',
    slug: 'sandvik-bg00391147-rotary-actuator',
    series: 'Sandvik mining',
    seriesSlug: '',
    rotation: '',
    weight: '380 kg',
    brands: ['Sandvik'],
    parts: ['BG00391147'],
    machines: ['DD321-40'],
    image: '/images/sandvik/bg00391147-rotary-actuator.webp',
    imageW: 1332,
    imageH: 1263,
    imageAlt: 'Heavy-duty dual-output-flange rotary / torque actuator for Sandvik DD321-40 development drill, part BG00391147 (representative unit)',
    originBrand: 'ECKART',
    sourcingOnly: true,
    modelCodeUnverified: true,
    hideSeriesLink: true,
    intro:
      'Sandvik OEM part number BG00391147 (also written BG00-391-147) is the heavy-duty rotary / torque turning unit listed on the Sandvik DD321-40 development drill, in the 380 kg class. Cross-reference records identify the fitted actuator as an ECKART-built unit; HM treats that maker attribution as a supply-record reference rather than a factory statement from Sandvik. HM provides sourcing and alternative-supply support for this reference and does not present the offered unit as an original Sandvik part or a pre-verified interchangeable unit; mounting, shaft, ports and rotation are confirmed against your nameplate and drawing before quotation.',
    crossNote:
      'BG00391147 is a Sandvik OEM reference for the DD321-40 turning unit. Because the underlying actuator brand/model and interchangeability have not been independently verified, the drawing and mounting dimensions are checked against your unit before any alternative is recommended. BG00391147 and BG01035613 are both recorded on the DD321-40 in the same weight class and should be distinguished by the tag rather than assumed identical.',
    extraFaqs: [
      {
        q: 'Which machine uses Sandvik part BG00391147?',
        a: 'BG00391147 is the heavy rotary / torque turning unit listed on the Sandvik DD321-40 development drill, in the 380 kg class, per the machine parts documentation. Confirm the part number on your actuator tag before ordering.',
      },
      {
        q: 'Are BG00391147 and BG01035613 the same unit?',
        a: 'Both references are recorded on the DD321-40 in the same weight class, but they are distinct Sandvik part numbers and may correspond to different revisions, positions or builds. They should not be treated as interchangeable from the numbers alone; send your tag and drawing and we confirm which reference applies.',
      },
      {
        q: 'Can HM supply BG00391147?',
        a: 'We provide sourcing and alternative-supply support but do not claim a verified drop-in or guaranteed-compatible unit from the part number alone. Send the nameplate and mounting drawing; we confirm rotation, mounting interface, shaft and ports before quoting.',
      },
    ],
  },
  {
    model: 'BG01035613 (Sandvik DD321-40 rotary / torque unit)',
    slug: 'sandvik-bg01035613-rotary-actuator',
    series: 'Sandvik mining',
    seriesSlug: '',
    rotation: '',
    weight: '380 kg',
    brands: ['Sandvik'],
    parts: ['BG01035613'],
    machines: ['DD321-40'],
    image: '/images/sandvik/bg01035613-rotary-actuator.webp',
    imageW: 1332,
    imageH: 1263,
    imageAlt: 'Heavy-duty dual-output-flange rotary / torque actuator for Sandvik DD321-40 development drill, part BG01035613 (representative unit)',
    originBrand: 'ECKART',
    sourcingOnly: true,
    modelCodeUnverified: true,
    hideSeriesLink: true,
    intro:
      'Sandvik OEM part number BG01035613 (also written BG01-035-613) is the heavy-duty rotary / torque turning unit recorded on the Sandvik DD321-40 development drill, in the 380 kg class. Cross-reference records identify the fitted actuator as an ECKART-built unit; HM treats that maker attribution as a supply-record reference rather than a factory statement from Sandvik. HM provides sourcing and alternative-supply support for this reference and does not present the offered unit as an original Sandvik part or a pre-verified interchangeable unit; mounting, shaft, ports and rotation are confirmed against your nameplate and drawing before quotation.',
    crossNote:
      'BG01035613 is a Sandvik OEM reference associated with the DD321-40 turning unit. The underlying actuator brand/model and interchangeability have not been independently verified, so the drawing and mounting dimensions are checked against your unit before any alternative is recommended. It should be distinguished from the similarly-rated BG00391147 by the tag rather than assumed identical.',
    extraFaqs: [
      {
        q: 'Which machine uses Sandvik part BG01035613?',
        a: 'BG01035613 is the heavy rotary / torque turning unit recorded on the Sandvik DD321-40 development drill, in the 380 kg class. Confirm the exact part number on your actuator tag before ordering.',
      },
      {
        q: 'What is the difference between BG01035613 and BG00391147?',
        a: 'Both are DD321-40 turning units in the same weight class but carry distinct Sandvik part numbers and may reflect different revisions, positions or builds. Do not treat them as interchangeable from the numbers alone; send your tag and drawing and we confirm the correct reference.',
      },
      {
        q: 'Can HM supply BG01035613?',
        a: 'We provide sourcing and alternative-supply support but do not claim a verified drop-in or guaranteed-compatible unit from the part number alone. Send the nameplate and mounting drawing; we confirm rotation, mounting interface, shaft and ports before quoting.',
      },
    ],
  },
  {
    model: 'L10-3.0-M-RF-360-S1-C-H',
    slug: 'resemin-l10-3-0-m-rf-360-s1-c-h',
    series: 'L10',
    seriesSlug: 'helac-l10-series',
    rotation: '360°',
    weight: '',
    brands: ['RESEMIN'],
    parts: [],
    machines: [],
    image: '/images/products/hm-model-placeholder.png',
    imageW: 1200,
    imageH: 900,
    imageAlt: 'Compact helical hydraulic rotary actuator, L10-3.0 class rear-flange build for RESEMIN equipment (representative image)',
    sourcingOnly: true,
    hideSeriesLink: true,
    intro:
      'The L10-3.0-M-RF-360-S1-C-H is a compact 360-degree, rear-flange (RF) helical rotary actuator in the Helac L10-3.0 class, recorded in connection with RESEMIN drilling equipment. No separate OEM part number is published for this reference; it is identified by the actuator model code rather than a machine part number. HM provides technical selection and sourcing / alternative-supply support and confirms the exact build, ports and mounting against your actuator nameplate before quotation; we do not promise stock, lead time or a pre-verified interchangeable unit from the code alone.',
    crossNote:
      'This is a model-code sourcing entry for an L10-3.0 class rear-flange 360-degree unit; no OEM cross-reference number is available in the source. Rotation, mounting, shaft and port options vary within the L10-3.0 family and are checked against your nameplate and drawing before any alternative is recommended.',
    extraFaqs: [
      {
        q: 'Does RESEMIN publish an OEM part number for the L10-3.0-M-RF-360?',
        a: 'No separate machine OEM part number is published in the available reference; the unit is identified by the actuator model code L10-3.0-M-RF-360-S1-C-H. Order or enquire using that full code, and send a nameplate photo so we confirm the exact build.',
      },
      {
        q: 'Can HM supply an L10-3.0-M-RF-360-S1-C-H for RESEMIN equipment?',
        a: 'We offer selection and sourcing / alternative-supply support for this compact 360-degree rear-flange unit. We do not claim a verified drop-in from the code alone; send the nameplate and, if available, a mounting drawing and we confirm rotation, rear-flange mounting, shaft and ports before quoting.',
      },
    ],
  },
  {
    model: 'L40-110-M-FT-220/185-S1-C-H',
    slug: 'resemin-l40-110-m-ft-220-185-s1-c-h',
    series: 'L40',
    seriesSlug: 'helac-l40-series',
    rotation: '220° / 185°',
    weight: '',
    brands: ['RESEMIN'],
    parts: [],
    machines: [],
    image: '/images/products/hm-model-placeholder.png',
    imageW: 1200,
    imageH: 900,
    imageAlt: 'Heavy-duty helical hydraulic rotary actuator, L40-110 class foot-mount dual-angle build for RESEMIN equipment (representative image)',
    sourcingOnly: true,
    hideSeriesLink: true,
    intro:
      'The L40-110-M-FT-220/185-S1-C-H is a heavy-duty foot-mount (FT) helical rotary actuator in the Helac L40-110 class, built in 220-degree and 185-degree mining rotation angles and recorded in connection with RESEMIN drilling equipment. No separate OEM part number is published for this reference; it is identified by the actuator model code. HM provides technical selection and sourcing / alternative-supply support and confirms the rotation angle, foot mounting, ports and shaft against your actuator nameplate and drawing before quotation; we do not promise stock or a pre-verified interchangeable unit from the code alone.',
    crossNote:
      'This is a model-code sourcing entry for an L40-110 class foot-mount unit offered in 220/185-degree rotations; no OEM cross-reference number is available in the source. The 220-degree and 185-degree builds differ in end-stop geometry and are not interchangeable, and FT mounting differs from the RF build; the exact angle and mount are checked against your nameplate before any alternative is recommended.',
    extraFaqs: [
      {
        q: 'What do the 220 and 185 in L40-110-M-FT-220/185 mean?',
        a: 'They are the two available rotation angles (220 degrees and 185 degrees) for this foot-mount L40-110 build. The angle changes the end-stop geometry, so the two units are not interchangeable; read the rotation from your actuator tag before ordering.',
      },
      {
        q: 'Is there an OEM part number, and can HM supply this RESEMIN unit?',
        a: 'No separate OEM part number is published in the available reference; the unit is identified by the model code L40-110-M-FT-220/185-S1-C-H. We offer selection and sourcing / alternative-supply support; send the nameplate and mounting drawing and we confirm the rotation, foot-mount interface, shaft and ports before quoting.',
      },
    ],
  },
  {
    model: 'SRA-110-360-CO-RF-SH-N',
    slug: 'putzmeister-sra-110-360-co-rf-sh-n',
    series: 'SRA',
    seriesSlug: '',
    rotation: '360°',
    weight: '',
    brands: ['Putzmeister'],
    parts: [],
    machines: [],
    image: '/images/products/hm-model-placeholder.png',
    imageW: 1200,
    imageH: 900,
    imageAlt: 'Compact helical hydraulic rotary actuator, SRA-110 class 360-degree rear-flange build for Putzmeister equipment (representative image, not the original unit)',
    sourcingOnly: true,
    hideSeriesLink: true,
    intro:
      'The SRA-110-360-CO-RF-SH-N is a compact 360-degree, rear-flange (RF) helical rotary actuator in the SRA-110 class, recorded in connection with Putzmeister equipment. No separate OEM part number is published for this reference; it is identified by the actuator ordering code. HM provides technical selection and sourcing / alternative-supply support and confirms the exact configuration, mounting, shaft and ports against your actuator nameplate before quotation; we do not represent the offered unit as an original Putzmeister part or promise stock, lead time or a pre-verified interchangeable unit from the code alone.',
    crossNote:
      'This is a model-code sourcing entry for an SRA-110 class 360-degree rear-flange unit; no OEM cross-reference number is available in the source. The same SRA-110 class is used by several equipment makers with different port, valve and seal codes, so the full suffix is confirmed against your nameplate and drawing before any alternative is recommended.',
    extraFaqs: [
      {
        q: 'What does the code SRA-110-360-CO-RF-SH-N mean?',
        a: 'It encodes the SRA family and 110 size, 360-degree rotation, port/valve segment (CO), rear-flange mounting (RF), shaft/cover and seal/standard segments. The exact build must be read from the full nameplate code because several variants share the SRA-110 base.',
      },
      {
        q: 'Can HM supply the Putzmeister SRA-110-360-CO-RF-SH-N?',
        a: 'We offer selection and sourcing / alternative-supply support for this 360-degree rear-flange unit. We do not claim a verified drop-in or that the offered unit is an original Putzmeister part; send the nameplate and a mounting drawing and we confirm mounting, shaft, ports and seal package before quoting.',
      },
    ],
  },
];

export function getModel(slug: string): ModelData | undefined {
  return modelPages.find((m) => m.slug === slug);
}

function parseTorqueNm(torque?: string): number {
  if (typeof torque === 'string') {
    const n = parseFloat(torque.replace(/[^0-9.]/g, ''));
    if (!Number.isNaN(n)) return n;
  }
  return 0;
}

function torqueNumeric(m: ModelData): number {
  if (m.catalogSpec?.ratedTorqueNm) return m.catalogSpec.ratedTorqueNm;
  return parseTorqueNm(m.torque);
}

export function getSeriesSiblings(slug: string): {
  slug: string;
  model: string;
  torque?: string;
  weight?: string;
  current: boolean;
}[] {
  const model = getModel(slug);
  if (!model) return [];
  const brand = model.originBrand ?? 'Helac';
  const siblings = modelPages.filter(
    (m) => m.slug !== slug && m.series === model.series && (m.originBrand ?? 'Helac') === brand,
  );
  const sortedSiblings = siblings.sort((a, b) => {
    const ta = torqueNumeric(a);
    const tb = torqueNumeric(b);
    if (ta === 0 && tb !== 0) return 1;
    if (tb === 0 && ta !== 0) return -1;
    if (ta !== tb) return ta - tb;
    return a.slug.localeCompare(b.slug);
  });
  return [
    { slug: model.slug, model: model.model, torque: model.torque, weight: model.weight, current: true },
    ...sortedSiblings.map((m) => ({ slug: m.slug, model: m.model, torque: m.torque, weight: m.weight, current: false })),
  ];
}

export { parseTorqueNm };

export function getRelatedModels(slug: string): { slug: string; model: string }[] {
  const model = getModel(slug);
  if (!model) return [];
  const brand = model.originBrand ?? 'Helac';
  const candidates = modelPages.filter(
    (m) => m.slug !== slug && m.series === model.series && (m.originBrand ?? 'Helac') === brand
  );
  if (candidates.length < 3) {
    // fallback: same series only
    candidates.push(...modelPages.filter((m) => m.slug !== slug && m.series === model.series && !candidates.some((c) => c.slug === m.slug)));
  }
  if (candidates.length < 3) {
    // final fallback: same brand
    candidates.push(...modelPages.filter((m) => m.slug !== slug && (m.originBrand ?? 'Helac') === brand && !candidates.some((c) => c.slug === m.slug)));
  }
  return candidates
    .sort((a, b) => torqueNumeric(a) - torqueNumeric(b) || a.slug.localeCompare(b.slug))
    .slice(0, 3)
    .map((m) => ({ slug: m.slug, model: m.model }));
}

export function getModelsBySeries(seriesCode: string): ModelData[] {
  return modelPages.filter((m) => m.series === seriesCode);
}

// Normalise internal brand labels to public equipment-make (OEM) names.
export function equipmentMakeName(label: string): string {
  switch (label) {
    case 'Atlas':
      return 'Atlas Copco / Epiroc';
    default:
      return label;
  }
}

const THUMB_DIRS = [
  '/images/alternatives/',
  '/images/sandvik/',
  '/images/atlas-copco/',
  '/images/epiroc/',
  '/images/resemin/',
  '/images/putzmeister/',
  '/images/jlg/',
  '/images/genie/',
  '/images/products/',
];

/**
 * Small optimized thumbnail (112px WebP) for client-side search result cards.
 * Every referenced product image has a generated '<stem>@112.webp'; falls back
 * to the source image if the asset is outside the processed directories.
 */
export function thumbFor(image?: string): string | undefined {
  if (!image || image.includes('placeholder')) return undefined;
  const dir = THUMB_DIRS.find((d) => image.startsWith(d));
  if (!dir) return image;
  const dot = image.lastIndexOf('.');
  return dot > 0 ? `${image.slice(0, dot)}@112.webp` : `${image}@112.webp`;
}

export function buildSearchIndex(): {
  model: string;
  slug: string;
  originBrand: string;
  equipmentMakes: string[];
  parts: string[];
  machines: string[];
  image?: string;
  thumb?: string;
}[] {
  return modelPages.map((m) => ({
    model: m.model,
    slug: m.slug,
    originBrand: m.originBrand ?? 'Helac',
    equipmentMakes: (m.brands ?? []).map(equipmentMakeName),
    parts: m.parts ?? [],
    machines: m.machines ?? [],
    ...(() => {
      const resolved = resolveModelImage(m);
      return resolved.includes('placeholder')
        ? { image: undefined, thumb: undefined }
        : { image: resolved, thumb: thumbFor(resolved) };
    })(),
  }));
}

export const SITE = base;
