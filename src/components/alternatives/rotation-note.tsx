/**
 * Rotation-angle block for cross-brand model pages.
 *
 * Pages that differ only by sweep (180° vs 360°) used to be near-duplicates of each
 * other. The sweep is a real build difference — it is set by the internal stop tube,
 * not by the valve or the plumbing — so each page now states what its own sweep
 * changes and what to check on the unit before matching on torque alone.
 */
export function RotationNote({ rotation }: { rotation?: string }) {
  const value = (rotation ?? '').trim();
  if (!value) return null;

  const hasSlash = value.includes('/');
  const numbers = (value.match(/\d+/g) ?? []).map(Number);
  const isHalfTurn = !hasSlash && numbers.length === 1 && numbers[0] === 180;
  const isFullTurn = !hasSlash && numbers.length === 1 && numbers[0] === 360;
  const isSpecial = !isHalfTurn && !isFullTurn;

  const lead = isHalfTurn
    ? 'A half-turn build: the output travels 180° between two end stops. The sweep is set by the internal stop tube, so a 180° unit cannot be turned into a 360° one by changing the valve or the porting — it is a different internal assembly.'
    : isFullTurn
      ? 'A full-turn build: the output sweeps a complete revolution. The hose loop and its clamping have to survive the whole sweep, which is why a full-turn unit is checked as a hose-routing question as well as a torque question.'
      : hasSlash
        ? 'This reference is listed with more than one sweep. The sweep is part of the build identity, so the unit on the machine has to be identified by its own setting before anything is matched.'
        : `A non-standard sweep: ${value} sits outside the usual 180° / 360° range, which means the stop tube was cut for that angle. A standard-angle unit will not reproduce it, and the stop positions have to be read off the drawing rather than assumed.`;

  const checks = isHalfTurn
    ? [
        'Two positions, 180° apart — confirm the linkage does not rely on an intermediate stop.',
        'Hoses only travel half a turn, so a short service loop is normally enough.',
        'If the duty is a tilt or a quarter-turn swing, this is the sweep the linkage was designed around.',
      ]
    : isFullTurn
      ? [
          'Check the hose loop clears the housing through the full revolution, not just at the rest position.',
          'Confirm the duty actually needs a complete turn — a half-turn build of the same size is the usual choice where it does not.',
          'Rotation stops, if the machine has them, sit outside the actuator and still have to be checked.',
        ]
      : [
          'Read the stop positions off the mounting drawing before ordering — do not infer them from the code alone.',
          'Ask why the original used this sweep; a non-standard angle usually answers a linkage constraint that a standard unit will not fit.',
          'Confirm the sweep on the unit tag matches the code, since special builds are sometimes re-stopped in service.',
        ];

  const fits = isHalfTurn
    ? [
        'Tilt and positioning linkages that only need two end positions — a bucket tilt, a boom offset, a chute flap.',
        'Machines where the hose run is tight: half a turn needs a much shorter service loop than a full one.',
        'Where a mid-position stop is not part of the function, so the two end stops are the whole travel.',
      ]
    : isFullTurn
      ? [
          'Duties that genuinely index through a full revolution — rod handling, turret positioning, continuous swing.',
          'Linkages where the return path is part of the cycle rather than a reversal of the same half turn.',
          'Machines already built around a full-turn hose loop, where a half-turn unit would leave the routing over-travelled.',
        ]
      : [
          'Linkages whose geometry was designed around this exact sweep — the stop positions usually answer a clearance or interference constraint.',
          'Rebuild work where the surrounding mechanism has to stay unchanged, so the sweep cannot be normalised to 180° or 360°.',
          'OEM builds where the sweep was specified by the machine maker rather than chosen from a catalogue.',
        ];

  const confirm = isHalfTurn
    ? [
        'Swing the linkage by hand to both end stops and check the travel is a clean half turn with no mid-travel detent.',
        'Read the stop positions off the mounting drawing rather than counting turns of the output.',
      ]
    : isFullTurn
      ? [
          'Turn the linkage through a full revolution by hand and watch the hose loop — a unit that binds at three quarters of a turn is a routing problem, not a torque problem.',
          'Check whether the machine has an external rotation stop; if it does, the sweep on the tag is not the limit the linkage actually uses.',
        ]
      : [
          'Measure the swing between the mechanical end stops on the machine, not between the positions the linkage happens to use.',
          'Compare the measured swing with the code on the tag; special builds are sometimes re-stopped in service.',
        ];

  return (
    <section className="py-12 border-t border-[rgba(44,74,115,0.10)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-xs font-medium text-[#D98A1D] uppercase tracking-wider mb-3">Rotation</div>
        <h2 className="font-heading text-2xl font-medium text-[#1B1E20] mb-4">
          What the {value} sweep changes on this build
        </h2>
        <p className="text-[#4A4E54] leading-relaxed max-w-3xl mb-5">{lead}</p>
        <ul className="space-y-2 max-w-3xl">
          {checks.map((item) => (
            <li key={item} className="flex gap-3 text-sm text-[#4A4E54] leading-relaxed">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#D98A1D] shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-3xl">
          <div>
            <h3 className="text-sm font-medium text-[#1B1E20] mb-3">When this sweep is the right build</h3>
            <ul className="space-y-2">
              {fits.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-[#4A4E54] leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#2C4A73] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-[#1B1E20] mb-3">Confirming the sweep on the machine</h3>
            <ul className="space-y-2">
              {confirm.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-[#4A4E54] leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#2C4A73] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 max-w-3xl">
          <h3 className="text-sm font-medium text-[#1B1E20] mb-3">How the sweep sits in the order code</h3>
          <p className="text-sm text-[#4A4E54] leading-relaxed mb-3">
            {isHalfTurn
              ? 'The sweep is the fifth segment of the code. Ordering the same size in the other sweep changes that segment and the internal stop tube behind it; the flange pattern, the shaft end and the valve selection do not change with it. That is why a half-turn build and a full-turn build of one size are quoted as two builds rather than one with an option.'
              : isFullTurn
                ? 'The sweep is the fifth segment of the code. Going to the half-turn build of the same size changes that segment and the internal stop tube; flange, shaft and valve stay as they are. Where a machine only needs two positions, the half-turn build is the shorter hose route and the smaller envelope.'
                : 'The sweep is the fifth segment of the code, and here it carries a value outside the standard range. That value is a build instruction, not a selection from a list: it has to travel with the enquiry together with the stop positions, because the stop tube is cut for it.'}
          </p>
          <h3 className="text-sm font-medium text-[#1B1E20] mb-3 mt-5">Where these two builds get mixed up</h3>
          <ul className="space-y-2">
            {(isHalfTurn
              ? [
                  'A half-turn unit is sometimes quoted against a full-turn drawing because the size and mounting match — the sweep is the field that gets dropped in the enquiry.',
                  'A half-turn unit cannot be re-stopped to a full turn in service; if the machine needs more travel, it needs the other build.',
                ]
              : [
                  'A full-turn unit is sometimes quoted where the linkage only swings half a turn, which over-travels the hose loop for no benefit.',
                  'If a full-turn unit will not pass a quarter or half turn under load, the cause is usually hose routing or an external stop, not the actuator.',
                ]
            ).map((item) => (
              <li key={item} className="flex gap-3 text-sm text-[#4A4E54] leading-relaxed">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#D98A1D] shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        {isSpecial && (
          <p className="mt-5 text-sm text-[#62666C] max-w-3xl">
            We do not publish a conversion table between sweeps. If the sweep on your unit differs from the code
            above, send the tag and the mounting drawing and the build is confirmed against them.
          </p>
        )}
      </div>
    </section>
  );
}
