import raw from './hmr-all-series.PUBLIC.json';

type Comparable = {
  helac?: string[];
  hks?: string[];
  moveco?: string[];
  sungji?: string[];
};

type HmrModel = {
  hmr: string;
  series: string;
  spec: string;
  drivingNm: number;
  rotation: string[];
  comparable: Comparable;
};

type HmrSeries = {
  pressureBar: number;
  familyClass: string;
  angles: string[];
  mounts: { code: string; label?: string; implicit?: boolean }[];
  outputs: { code: string; label?: string }[];
  valves: { code: string }[];
  orderSyntax?: string;
  example?: string;
  note?: string;
};

type HmrData = {
  compareNotice: string;
  series: Record<string, HmrSeries>;
  models: HmrModel[];
};

const data = raw as unknown as HmrData;

export type HmrComparison = {
  /** HM model code, e.g. HMR2-180. */
  code: string;
  seriesCode: string;
  /** Rated driving torque in Nm. */
  drivingNm: number;
  /** Rotation angles offered by the HM series. */
  angles: string[];
  pressureBar: number;
  familyClass: string;
  mounts: string[];
  outputs: string[];
  valves: string[];
  orderSyntax?: string;
  example?: string;
  note?: string;
  /** Standing comparability notice from the cross-reference dataset. */
  notice: string;
};

function label(list: { code: string; label?: string; implicit?: boolean }[]): string[] {
  return list.map((x) => {
    const base = x.label ? `${x.code} — ${x.label}` : x.code;
    return x.implicit ? `${base} (standard)` : base;
  });
}

/**
 * Resolve the HM equivalent for a model page. Returns null when the page has no
 * mapped HM model, so callers can render nothing rather than a placeholder table.
 */
export function getHmrComparison(code?: string): HmrComparison | null {
  if (!code) return null;
  const model = data.models.find((m) => m.hmr === code);
  if (!model) return null;
  const series = data.series[model.series];
  if (!series) return null;
  return {
    code: model.hmr,
    seriesCode: model.series,
    drivingNm: model.drivingNm,
    angles: model.rotation,
    pressureBar: series.pressureBar,
    familyClass: series.familyClass,
    mounts: label(series.mounts as { code: string; label?: string; implicit?: boolean }[]),
    outputs: label(series.outputs as { code: string; label?: string }[]),
    valves: series.valves.map((v) => v.code),
    orderSyntax: series.orderSyntax,
    example: series.example,
    note: series.note,
    notice: data.compareNotice,
  };
}
