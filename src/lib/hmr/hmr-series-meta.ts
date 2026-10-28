/** Shared HMR series metadata used by both the model pages and the series pages. */

export const MOUNT_LABELS: Record<string, string> = {
  FT: 'Foot mount',
  FF: 'Front flange',
  RF: 'Rear flange',
  FL: 'Flange',
};

export const MOUNT_PHRASE: Record<string, string> = {
  FT: 'foot mount',
  FF: 'front-flange mount',
  RF: 'rear-flange mount',
  FL: 'flange mount',
};

export const MOUNT_PHRASE_BY_SERIES: Record<string, string> = {
  'HMR1-FL': 'flange mount',
  'HMR6-FT': 'straddle mount',
  'HMR5-FL': 'valve mounting flange',
};

export const MOUNT_TITLE_BY_SERIES: Record<string, string> = {
  'HMR6-FT': 'Straddle Mount',
  'HMR5-FL': 'Valve Flange',
};

export const MOUNT_TITLE: Record<string, string> = {
  FT: 'Foot Mount',
  FF: 'Front Flange',
  RF: 'Rear Flange',
  FL: 'Flange',
};

export type SeriesMeta = {
  label: string;
  family: string;
  duty: string;
  angleNote: string;
  pressureNote: string;
};

export const SERIES_META: Record<string, SeriesMeta> = {
  HMR1: {
    label: 'flange-mount',
    family: 'Helical, flange-mount family',
    duty:
      'general positioning, swing and clamping duties where the actuator face-bolts to a machined flange on the machine, and the same housing is specified across four standard rotations',
    angleNote:
      'HMR1 covers 90°, 180°, 270° and 360° as standard rotations; the flange mount is implicit in the order code.',
    pressureNote:
      'HMR1 is rated at 210 bar continuous; the flange pilot diameter and bolt circle are what decide whether the unit sits square on your existing bracket.',
  },
  HMR2: {
    label: 'foot-mount',
    family: 'Helical, foot-mount family',
    duty:
      'steering and positioning duties on mobile equipment, where the housing bolts down onto a flat bracket face and the shaft carries the steering arm',
    angleNote: '180° is the standard rotation on HMR2. A 360° build is quoted only after engineering confirmation.',
    pressureNote:
      'HMR2 is rated at 210 bar continuous; peak pressure and flow at the actuator are checked against your circuit.',
  },
  HMR3: {
    label: 'compact front-flange',
    family: 'Helical, compact front-flange family',
    duty:
      'tight mounting envelopes on aerial work platforms and small booms, where the front flange face carries the load and the body sits inside the boom section',
    angleNote: 'HMR3 is offered in 180° and 360° as standard rotations.',
    pressureNote:
      'HMR3 is rated at 210 bar continuous; the flange bolt pattern and pilot diameter decide whether it drops onto your existing bracket.',
  },
  HMR4: {
    label: 'heavy-duty',
    family: 'Helical, heavy-duty family',
    duty:
      'continuous high-load duties on mining, drilling and material-handling equipment, where the same actuator is specified across foot, front-flange and rear-flange builds',
    angleNote:
      'HMR4 is offered in 180° and 360° as standard rotations, with the same rated performance across FT, FF and RF mounting.',
    pressureNote:
      'HMR4 is rated at 210 bar continuous; at this torque class the tie-rod clearance and bracket stiffness matter as much as the port size.',
  },
  HMR5: {
    label: 'valve-mount',
    family: 'Helical, valve-mount family',
    duty:
      'piloting and positioning duties on valve and damper linkages, where the actuator flange bolts straight to the valve body and swings the spool or lever through a fixed arc',
    angleNote: '90° is the standard rotation on HMR5; other angles are quoted as engineered specials.',
    pressureNote:
      'HMR5 is rated at 135 bar, lower than the other HMR series because the valve-mount duty carries no external load support — the housing is not designed to take radial or bending loads from a linkage.',
  },
  HMR6: {
    label: 'through-shaft straddle',
    family: 'Helical, through-shaft straddle-mount family',
    duty:
      'two-sided drive points on one axis, where the shaft passes right through the housing and both ends drive a load',
    angleNote: '220° is the standard rotation on HMR6; 180° is a special angle that has to be confirmed by engineering.',
    pressureNote:
      'HMR6 is rated at 210 bar continuous; the straddle mount means both bearing faces are loaded, so bracket alignment is checked before quoting.',
  },
};

export function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
