/**
 * Segment-by-segment decode of the competitor model codes we publish pages for.
 *
 * Every meaning below traces to the manufacturer's published ordering key or to a
 * designation already used in our own cross-reference data. Where a segment is not
 * published, it is returned with `confirmed: false` so the page says "confirm on the
 * drawing" instead of inventing a meaning.
 */

export type DecodeRow = {
  segment: string;
  field: string;
  meaning: string;
  /** False when the segment is not in the published key — the page must not assert a meaning. */
  confirmed: boolean;
};

export type DecodeGroup = {
  /** The code being decoded (one page can carry two, e.g. "DA-H 125 / I-DA-H 125"). */
  code: string;
  /** Family label shown above the table. */
  family: string;
  rows: DecodeRow[];
  /** Caveat shown under the table, e.g. where options live outside the code. */
  note?: string;
};

const HELAC_FAMILIES = ['L10', 'L20', 'L30', 'L40', 'T20', 'T30', 'HP', 'HTX'];

const MEASUREMENT: Record<string, string> = {
  E: 'English system — SAE/UNF threads, SAE ports',
  M: 'Metric system — metric threads, BSPP ports',
  S: 'Special / custom build (older tags use S for special) — not a standard E or M unit',
  MS: 'Custom design — metric threads on a special OEM build',
  ES: 'Custom design — imperial threads on a special OEM build',
};

const MOUNT: Record<string, string> = {
  FT: 'Foot mount',
  FF: 'Front flange',
  RF: 'Rear flange',
  RM: 'Rail mount',
  RL: 'Rail mount (L40 style)',
  'RL/RF': 'Rail mount and rear flange combined',
  'RLRF': 'Rail mount and rear flange combined',
};

const SHAFT: Record<string, string> = {
  S1: 'Cantilever — shaft flange only (single)',
  S2: 'Straddle — shaft and end-cap flanges (double)',
};

const VALVE: Record<string, string> = {
  C: 'Counterbalance valve fitted',
  '0': 'No valve (digit zero — not the letter O)',
  O: 'No valve',
  V: 'Valve ready — pad machined, no valve fitted',
  CH: 'Counterbalance valve with standard seals and bearings (C and H written together)',
};

const SEALS: Record<string, string> = {
  H: 'Standard seals and bearings',
  S: 'Special seals and bearings — compound per tag or drawing',
};

function rotationMeaning(value: string): { meaning: string; confirmed: boolean } {
  if (value === '180') return { meaning: 'Standard 180° rotation', confirmed: true };
  if (value === '360') return { meaning: 'Standard 360° rotation', confirmed: true };
  if (value === '90') return { meaning: 'Standard 90° rotation', confirmed: true };
  if (value === '270') return { meaning: 'Standard 270° rotation', confirmed: true };
  if (value.includes('/')) {
    const [base, final] = value.split('/');
    return {
      meaning: `Special rotation — ${base}° base / ${final}° final, set by an internal stop tube in 10° steps`,
      confirmed: true,
    };
  }
  if (/^\d+$/.test(value)) {
    return { meaning: `Non-standard rotation angle (${value}°) — special build`, confirmed: true };
  }
  return { meaning: 'Rotation segment not in the published key', confirmed: false };
}

function unknown(field: string): DecodeRow['meaning'] {
  return `${field} code not in the published ordering key — confirm against the tag or drawing`;
}

function decodeHelac(code: string): DecodeGroup | null {
  const tokens = code.split('-').filter(Boolean);
  const rows: DecodeRow[] = [];
  let family = '';

  // HP / HTX write the series and size as one token: HP125-S-RF-360-S1-C-H.
  const merged = tokens[0]?.match(/^(HP|HTX)(\d+)$/i);
  if (merged) {
    family = merged[1].toUpperCase();
    rows.push({
      segment: tokens[0],
      field: 'Series and size',
      meaning: `${family} series, size ${merged[2]} — the ${family} family uses its own key`,
      confirmed: true,
    });
    const rest = tokens.slice(1);
    const [meas, mount, rot, shaft, valve, seals] = rest;
    if (meas) rows.push(measurementRow(meas));
    if (mount) rows.push(mountRow(mount));
    if (rot) rows.push(rotationRow(rot));
    if (shaft) rows.push(shaftRow(shaft));
    if (valve) rows.push(valveRow(valve));
    if (seals) rows.push(sealsRow(seals));
    return {
      code,
      family: `${family} series`,
      rows,
      note: 'The HP/HTX families write the size into the series field; the remaining positions follow the same order as the L-series key.',
    };
  }

  if (tokens.length !== 8 && tokens.length !== 7) return null;
  const [series, size, meas, mount, rot, shaft] = tokens;
  const valve = tokens[6];
  const seals = tokens.length === 8 ? tokens[7] : '';
  if (!HELAC_FAMILIES.includes(series.toUpperCase())) return null;
  family = series.toUpperCase();

  rows.push({
    segment: series,
    field: 'Series',
    meaning: `${family} series — frame size and mounting family`,
    confirmed: true,
  });
  rows.push({
    segment: size,
    field: 'Model size',
    meaning: /^\d+(\.\d+)?$/.test(size)
      ? `Size ${size} — rated drive torque is set by this number (thousand in-lb class in the L/T key)`
      : unknown('Size'),
    confirmed: /^\d+(\.\d+)?$/.test(size),
  });
  rows.push(measurementRow(meas));
  rows.push(mountRow(mount));
  rows.push(rotationRow(rot));
  rows.push(shaftRow(shaft));
  rows.push(valveRow(valve));
  if (seals) rows.push(sealsRow(seals));

  return {
    code,
    family: `${family} series`,
    rows,
    note: seals
      ? undefined
      : 'The valve and seal fields are written together in this code — the last segment covers both.',
  };
}

function measurementRow(value: string): DecodeRow {
  const known = MEASUREMENT[value.toUpperCase()];
  return {
    segment: value,
    field: 'Measurement system',
    meaning: known ?? unknown('Measurement'),
    confirmed: Boolean(known),
  };
}

function mountRow(value: string): DecodeRow {
  const key = value.toUpperCase();
  const known = MOUNT[key];
  return {
    segment: value,
    field: 'Housing / mounting',
    meaning: known ?? unknown('Mounting'),
    confirmed: Boolean(known),
  };
}

function rotationRow(value: string): DecodeRow {
  const r = rotationMeaning(value);
  return { segment: value, field: 'Rotation', meaning: r.meaning, confirmed: r.confirmed };
}

function shaftRow(value: string): DecodeRow {
  const known = SHAFT[value.toUpperCase()];
  return {
    segment: value,
    field: 'Shaft / flanges',
    meaning: known ?? unknown('Shaft'),
    confirmed: Boolean(known),
  };
}

function valveRow(value: string): DecodeRow {
  const key = value.toUpperCase();
  const known = VALVE[key];
  return {
    segment: value,
    field: 'Valve',
    meaning: known ?? unknown('Valve'),
    confirmed: Boolean(known),
  };
}

function sealsRow(value: string): DecodeRow {
  const known = SEALS[value.toUpperCase()];
  return {
    segment: value,
    field: 'Seals and bearings',
    meaning: known ?? unknown('Seal'),
    confirmed: Boolean(known),
  };
}

function decodeHks(code: string): DecodeGroup | null {
  const m = code.match(/^(I-)?(M-DA-H-F7|M-DA-H-F5|M-DA-H-F10|M-DA-H|DA-H|F5|F10)\s+(\d+)$/i);
  if (!m) return null;
  const prefix = m[1] ? 'I-' : '';
  const familyToken = m[2].toUpperCase();
  const size = m[3];

  const familyMeaning: Record<string, string> = {
    'DA-H': 'DA-H series — flange-mount body',
    'M-DA-H': 'M-DA-H — front-flange variant of the DA-H body',
    'M-DA-H-F5': 'M-DA-H-F5 — foot-mount variant of the DA-H body',
    'M-DA-H-F10': 'M-DA-H-F10 — front-flange variant of the DA-H body',
    'M-DA-H-F7': 'M-DA-H-F7 — foot-mount variant of the DA-H body',
    F5: 'F5 series — foot-mount body',
    F10: 'F10 series — flange-mount body',
  };

  const rows: DecodeRow[] = [];
  if (prefix) {
    rows.push({
      segment: prefix,
      field: 'Prefix',
      meaning: 'I- prefix — variant designation in the HKS list; the difference from the plain code is confirmed against the material number',
      confirmed: false,
    });
  }
  rows.push(
    {
        segment: familyToken,
        field: 'Series / mounting',
        meaning: familyMeaning[familyToken] ?? unknown('Series'),
        confirmed: Boolean(familyMeaning[familyToken]),
      },
      {
        segment: size,
        field: 'Size',
        meaning: `Size number ${size} — sets the displacement and the torque class`,
        confirmed: true,
      },
  );

  return {
    code,
    family: 'HKS DA-H family',
    rows,
    note: 'Valve, seal and shaft options on HKS units are coded inside the FU / S9xxxx material number, not in the model code — those are confirmed from the tag or the material list.',
  };
}

function decodeMoveco(code: string): DecodeGroup | null {
  const m = code.match(/^(RP|RR|RB|RC|RM|RL)(\d+)$/i);
  if (!m) return null;
  return {
    code,
    family: 'Moveco helical range',
    rows: [
      {
        segment: m[1].toUpperCase(),
        field: 'Series',
        meaning: `${m[1].toUpperCase()} family — body and mounting style`,
        confirmed: true,
      },
      {
        segment: m[2],
        field: 'Size',
        meaning: `Size ${m[2]} — sets the displacement and the torque class`,
        confirmed: true,
      },
    ],
    note: 'Moveco publishes the short family-plus-size designation; longer option suffixes are not public, so the mount, shaft and valve details are confirmed from the drawing.',
  };
}

function decodeSungji(code: string): DecodeGroup | null {
  const tokens = code.split('-').filter(Boolean);
  if (tokens.length < 3) return null;
  const [series, size, ...rest] = tokens;
  if (!/^(SRA|SRB|SRC|SRS)$/i.test(series)) return null;

  const rows: DecodeRow[] = [
    {
      segment: series,
      field: 'Series',
      meaning: `${series.toUpperCase()} series — body and mounting family`,
      confirmed: true,
    },
    {
      segment: size,
      field: 'Size',
      meaning: `Size ${size} — sets the displacement and the torque class`,
      confirmed: true,
    },
  ];

  const sungjiValve: Record<string, string> = {
    CN: 'Counterbalance valve fitted',
    CG: 'Counterbalance valve fitted',
    CO: 'No valve',
  };
  const sungjiMount: Record<string, string> = {
    FT: 'Foot mount',
    RF: 'Rear flange',
    FF: 'Front flange',
  };

  for (const t of rest) {
    const key = t.toUpperCase();
    if (/^\d+$/.test(key)) {
      const r = rotationMeaning(key);
      rows.push({ segment: t, field: 'Rotation', meaning: r.meaning, confirmed: r.confirmed });
      continue;
    }
    if (sungjiValve[key]) {
      rows.push({ segment: t, field: 'Valve', meaning: sungjiValve[key], confirmed: true });
      continue;
    }
    if (sungjiMount[key]) {
      rows.push({ segment: t, field: 'Mounting', meaning: sungjiMount[key], confirmed: true });
      continue;
    }
    if (key === 'SH' || key === 'SE' || key === 'DS') {
      rows.push({
        segment: t,
        field: 'Shaft end',
        meaning: 'Shaft end code — exact profile confirmed against the drawing',
        confirmed: false,
      });
      continue;
    }
    if (key === 'N') {
      rows.push({ segment: t, field: 'Seals', meaning: 'Standard seal package', confirmed: true });
      continue;
    }
    if (key === 'I') {
      rows.push({ segment: t, field: 'Version', meaning: 'Version I build', confirmed: true });
      continue;
    }
    rows.push({ segment: t, field: 'Option', meaning: unknown('Option'), confirmed: false });
  }

  return { code, family: 'Sungji SRA / SRB / SRS range', rows };
}

/** Decode one model code. Returns null when the code is not a model code we can break down. */
export function decodeModelCode(raw: string): DecodeGroup | null {
  const code = raw.trim();
  if (!code) return null;
  if (/^(L10|L20|L30|L40|T20|T30)-/i.test(code)) return decodeHelac(code);
  if (/^(HP|HTX)/i.test(code)) return decodeHelac(code);
  if (/^(I-)?(M-DA-H-F\d+|M-DA-H|DA-H|F5|F10)\s+\d+$/i.test(code)) return decodeHks(code);
  if (/^(RP|RR|RB|RC|RM|RL)\d+$/i.test(code)) return decodeMoveco(code);
  if (/^(SRA|SRB|SRC|SRS)-/i.test(code)) return decodeSungji(code);
  return null;
}

/** Decode a page model string that may carry two codes ("DA-H 125 / I-DA-H 125"). */
export function decodeModelString(raw: string): DecodeGroup[] {
  // Only a slash with spaces separates two codes; "180/90" inside a code is a rotation.
  return raw
    .split(/\s+\/\s+/)
    .map((part) => decodeModelCode(part.trim()))
    .filter((g): g is DecodeGroup => g !== null);
}
