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
    extraFaqs: [
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
    extraFaqs: [
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
    model: 'L30-65-S-RF-360-S1-C-H',
    slug: 'l30-65-s-rf-360-s1-c-h',
    series: 'L30',
    seriesSlug: 'helac-l30-series',
    rotation: '360°',
    weight: '',
    brands: ['Atlas'],
    parts: ['3128312644'],
    machines: ['Boomer 282'],
    image: '/images/alternatives/l30-65-s-rf-360.jpg',
    imageW: 384,
    imageH: 510,
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
    image: '/images/alternatives/htx70-ms-rf-360.jpg',
    imageW: 223,
    imageH: 258,
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
    modelCodeUnverified: true,
    machines: ['Boomer M2d', 'Boomer XL3', 'Boomer 353', 'Boomer L2c', 'Boomer L2d'],
    image: '/images/alternatives/helac-hp125.jpg',
    imageW: 467,
    imageH: 286,
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
    image: '/images/alternatives/l30-65-s-rf-360.jpg',
    imageW: 384,
    imageH: 510,
    imageAlt:
      'Helac L30 series heavy-duty helical rotary actuator, 360-degree configuration (series representative image)',
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
    ],
  },
  {
    model: 'HP50-MS-RL-230-S1-C-H',
    slug: 'hp50-ms-rl-230-s1-c-h',
    series: 'HP',
    seriesSlug: 'helac-hp-series',
    rotation: '230°',
    weight: '',
    brands: ['Atlas'],
    parts: ['3128312643', '3129316303'],
    machines: ['Boomer 104', 'Boomer K41', 'Boomer K41x', 'Simba H1257', 'Simba H157', 'Simba S7D'],
    image: '/images/alternatives/helac-hp125.jpg',
    imageW: 467,
    imageH: 286,
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
    weight: '',
    brands: ['Sandvik'],
    parts: ['76350019', '76350008'],
    machines: ['Solo 5', 'Solo 5V'],
    image: '/images/alternatives/l30-65-s-rf-360.jpg',
    imageW: 384,
    imageH: 510,
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
    ],
  },
  {
    model: 'L30-65-S-RF-360-L1-C-H',
    slug: 'l30-65-s-rf-360-l1-c-h',
    series: 'L30',
    seriesSlug: 'helac-l30-series',
    rotation: '360°',
    weight: '',
    brands: ['Sandvik'],
    parts: ['76350018'],
    machines: ['DD210', 'Bolter'],
    image: '/images/alternatives/l30-65-s-rf-360.jpg',
    imageW: 384,
    imageH: 510,
    imageAlt:
      'Helac L30 series heavy-duty helical rotary actuator, 360-degree rear-flange mining configuration (series representative image)',
    intro:
      'Alternative rotary actuator for the Helac L30-65-S-RF-360-L1-C-H, a large 360-degree, rear-flange helical actuator in the L30-65 class, rated at about 7,345 Nm output torque at 207 bar, in a mining L1 configuration. It is listed by Sandvik under part number 76350018 (also written 763-500-18) and is commonly associated with Sandvik development-drill and bolter rigs such as the DD210.',
    applicationNote:
      'Part number 76350018 is commonly listed on Sandvik DD210 development-drill and bolter-type rigs. This association rests on limited third-party listings, and several turning devices can be fitted across a machine range, so please confirm the fit against your machine serial number and the actuator nameplate before ordering.',
    torque: '~7,345 Nm @ 207 bar (L30-65 series rated output)',
    crossNote:
      'L30-65 series rated output is about 7,345 Nm at 207 bar per the published Helac catalog; the -L1 rear-flange 360-degree build is a mining configuration. HM confirms the exact L1 build, mounting and ports against the unit tag and drawing before a replacement is supplied.',
    extraFaqs: [
      {
        q: 'Which Sandvik rig uses part 76350018?',
        a: 'Sandvik reference 76350018 is commonly listed on DD210 development-drill and bolter-type rigs, corresponding to the Helac L30-65-S-RF-360-L1-C-H turning-device configuration (360-degree rotation, rear flange, mining L1 build). Because the public evidence for this association is limited and the same rig range can use several turning devices, we confirm the mounting, ports and rotation against your nameplate and a photo or drawing before quoting.',
      },
      {
        q: 'What does the L1 section of the code mean?',
        a: 'In this mining build the L1 suffix identifies a specific rear-flange configuration rather than the standard S1/S2 shaft code; the exact meaning is read from the actuator tag and mounting drawing. Send a tag photo and we confirm the precise build before recommending a replacement.',
      },
    ],
  }
];

export function getModel(slug: string): ModelData | undefined {
  return modelPages.find((m) => m.slug === slug);
}

export const SITE = base;
