'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  buildOrderCode,
  findModelsByCompetitorReference,
  findModelsByTorque,
  getMaxDrivingNm,
  getSeriesImage,
  HMR_ALL_DATA,
  HMR_SERIES,
  HMR_SERIES_CODES,
  parseOrderCodeInput,
  type CompetitorDirectResult,
  type HmrModel,
} from '@/lib/hmr/hmr-all-series';
import { HmrRfqForm } from './hmr-rfq-form';

const ANGLE_OPTIONS = ['Any', '90', '180', '270', '360', '220'];

const VALVE_LABELS: Record<string, string> = {
  NV: 'No valve',
  CB: 'Counterbalance valve',
  CS: 'Cushion valve',
};

function classNames(...c: (string | false | undefined)[]) {
  return c.filter(Boolean).join(' ');
}

function candidateNote(m: HmrModel): string {
  if (m.series === 'HMR6') {
    return 'Through-shaft, 220° standard, straddle mount only';
  }
  const schema = HMR_SERIES[m.series];
  const mountLabels = schema.mounts.map((x) => x.label || x.code).join('/');
  return `${mountLabels}, ${schema.angles.join('/')}°`;
}

export function HmrUnifiedSelector() {
  const [referenceQuery, setReferenceQuery] = useState('');
  const [torqueInput, setTorqueInput] = useState('');
  const [angleFilter, setAngleFilter] = useState('Any');

  const [candidates, setCandidates] = useState<HmrModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<HmrModel | null>(null);
  const [noMatchRef, setNoMatchRef] = useState<string | null>(null);
  const [overMax, setOverMax] = useState(false);
  const [searchNote, setSearchNote] = useState<string | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);

  const [angle, setAngle] = useState<string>('');
  const [mount, setMount] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [valve, setValve] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [directInfo, setDirectInfo] = useState<CompetitorDirectResult | null>(null);

  const rfqRef = useRef<HTMLDivElement>(null);

  const maxNm = useMemo(() => getMaxDrivingNm(), []);

  function resetResults() {
    setCandidates([]);
    setSelectedModel(null);
    setNoMatchRef(null);
    setOverMax(false);
    setSearchNote(null);
    setParseError(null);
    setDirectInfo(null);
  }

  function defaultsForModel(m: HmrModel) {
    const schema = HMR_SERIES[m.series];
    const firstAngle = m.rotation[0] || schema.angles[0] || '';
    setAngle(firstAngle);
    const visibleMounts = schema.mounts.filter((x) => !x.implicit);
    setMount(visibleMounts[0]?.code || schema.mounts[0]?.code || '');
    setOutput(schema.outputs[0]?.code || '');
    setValve(schema.valves[0]?.code || '');
  }

  function handleSearch() {
    resetResults();
    if (referenceQuery.trim()) {
      const raw = referenceQuery.trim();
      const upper = raw.toUpperCase();

      // Full or base HMR order code.
      if (upper.startsWith('HMR')) {
        const parsed = parseOrderCodeInput(upper);
        if (parsed.ok) {
          setCandidates([parsed.model]);
          setSelectedModel(parsed.model);
          setAngle(parsed.angle);
          setMount(parsed.mount);
          setOutput(parsed.output);
          setValve(parsed.valve);
        } else {
          setParseError(parsed.error);
        }
        return;
      }

      const { matches, note, direct } = findModelsByCompetitorReference(raw);
      if (direct) {
        setSelectedModel(direct.model);
        setAngle(direct.angle);
        setMount(direct.mount);
        setOutput(direct.output);
        setValve(direct.valve);
        setDirectInfo(direct);
        return;
      }
      setCandidates(matches);
      setSearchNote(note);
      if (matches.length === 1) {
        setSelectedModel(matches[0]);
        defaultsForModel(matches[0]);
      } else if (matches.length === 0) {
        setNoMatchRef(raw);
        window.dispatchEvent(new CustomEvent('hmr:noMatch', { detail: { query: raw } }));
      }
      return;
    }

    const nm = parseInt(torqueInput.trim(), 10);
    if (!Number.isNaN(nm) && nm > 0) {
      if (nm > maxNm) {
        setOverMax(true);
        return;
      }
      const matches = findModelsByTorque(nm, angleFilter === 'Any' ? undefined : angleFilter);
      if (matches.length) {
        setCandidates(matches);
        setSearchNote('Choose the size closest to your torque requirement. Mounting interface must be confirmed by our engineering team before quotation.');
        if (matches.length === 1) {
          setSelectedModel(matches[0]);
          defaultsForModel(matches[0]);
        }
      } else {
        setNoMatchRef(torqueInput.trim());
      }
    }
  }

  function selectCandidate(m: HmrModel) {
    setSelectedModel(m);
    defaultsForModel(m);
    setNoMatchRef(null);
    setOverMax(false);
    const el = document.getElementById(`spec-${m.hmr}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('bg-amber-50');
      setTimeout(() => el.classList.remove('bg-amber-50'), 1500);
    }
  }

  const schema = selectedModel ? HMR_SERIES[selectedModel.series] : null;
  const visibleMounts = schema ? schema.mounts.filter((x) => !x.implicit) : [];
  const implicitMount = schema ? schema.mounts.find((x) => x.implicit) : null;
  const finalMount = implicitMount ? implicitMount.code : mount;

  const orderCode = selectedModel
    ? buildOrderCode(selectedModel.series, selectedModel.spec, angle, finalMount, output, valve)
    : '';

  function copyCode() {
    if (!orderCode) return;
    navigator.clipboard.writeText(orderCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  function quoteCode() {
    if (orderCode && selectedModel) {
      window.dispatchEvent(
        new CustomEvent('hmr:quote', {
          detail: { model: selectedModel.hmr, code: orderCode },
        })
      );
    } else if (noMatchRef) {
      window.dispatchEvent(new CustomEvent('hmr:noMatch', { detail: { query: noMatchRef } }));
    }
    rfqRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  useEffect(() => {
    setAngleFilter('Any');
  }, []);

  return (
    <section id="selector" className="bg-white py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <p className="text-xs font-semibold tracking-widest text-[#D98A1D] uppercase mb-3">Selector</p>
        <h2 className="text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
          Find the right HMR rotary actuator
        </h2>
        <p className="text-[#4A4E54] max-w-2xl mb-10">
          Search by a competitor reference number or enter your required driving torque and rotation angle.
          Results are ranked by rated torque class for engineering evaluation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">
          <div className="md:col-span-5 bg-[#FAFAF7] border border-[rgba(44,74,115,0.10)] rounded-xl p-6">
            <label className="block text-sm font-medium text-[#1B1E20] mb-2">A. By reference number</label>
            <input
              type="text"
              value={referenceQuery}
              onChange={(e) => setReferenceQuery(e.target.value)}
              placeholder="e.g. L30-42, L20-25, F10 150, RR46, SRC-150"
              className="w-full px-4 py-3 rounded-lg border border-[rgba(44,74,115,0.15)] bg-white text-sm focus:outline-none focus:border-[#D98A1D] focus:ring-1 focus:ring-[#D98A1D]"
            />
            <p className="text-xs text-[#62666C] mt-2">
              We can evaluate references from common international rotary actuator families.
            </p>
          </div>

          <div className="md:col-span-1 flex items-center justify-center text-sm text-[#62666C] font-medium">OR</div>

          <div className="md:col-span-6 bg-[#FAFAF7] border border-[rgba(44,74,115,0.10)] rounded-xl p-6">
            <label className="block text-sm font-medium text-[#1B1E20] mb-2">B. By required driving torque</label>
            <div className="flex gap-3 mb-3">
              <input
                type="number"
                min={1}
                value={torqueInput}
                onChange={(e) => setTorqueInput(e.target.value)}
                placeholder="Required torque in Nm"
                className="flex-1 px-4 py-3 rounded-lg border border-[rgba(44,74,115,0.15)] bg-white text-sm focus:outline-none focus:border-[#D98A1D] focus:ring-1 focus:ring-[#D98A1D]"
              />
              <select
                value={angleFilter}
                onChange={(e) => setAngleFilter(e.target.value)}
                className="px-4 py-3 rounded-lg border border-[rgba(44,74,115,0.15)] bg-white text-sm focus:outline-none focus:border-[#D98A1D]"
              >
                {ANGLE_OPTIONS.map((a) => (
                  <option key={a} value={a}>
                    {a === 'Any' ? 'Any angle' : `${a}°`}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-xs text-[#62666C]">
              We recommend the smallest HMR model whose rated driving torque meets or exceeds your value.
            </p>
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="mb-12 inline-flex items-center px-6 py-3 rounded-lg bg-[#D98A1D] text-white text-sm font-medium hover:bg-[#c47a16] transition-colors"
        >
          Find matches
        </button>

        {overMax && (
          <div className="mb-12 p-6 rounded-xl border border-[#D98A1D] bg-[#FFF8EE]">
            <h3 className="font-medium text-[#1B1E20] mb-2">Torque above standard catalogue range</h3>
            <p className="text-sm text-[#4A4E54] mb-4">
              {torqueInput} Nm exceeds the largest standard HMR catalogue model. Engineered, non-standard
              builds may be possible—send your torque and duty cycle for evaluation.
            </p>
            <button
              onClick={quoteCode}
              className="text-sm font-medium text-[#D98A1D] hover:underline"
            >
              Send your requirement →
            </button>
          </div>
        )}

        {candidates.length > 1 && !selectedModel && (
          <div className="mb-12">
            <h3 className="text-lg font-medium text-[#1B1E20] mb-2">Matching HMR references</h3>
            {searchNote && (
              <p className="text-sm text-[#4A4E54] mb-4">{searchNote}</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {candidates.map((m) => (
                <button
                  key={m.hmr}
                  onClick={() => selectCandidate(m)}
                  className="text-left p-5 rounded-xl border border-[rgba(44,74,115,0.10)] bg-white hover:border-[#D98A1D] hover:shadow-sm transition-all"
                >
                  <div className="text-lg font-semibold text-[#1B1E20] font-mono mb-1">{m.hmr}</div>
                  <div className="text-xs text-[#62666C] uppercase tracking-wide mb-2">{m.series}</div>
                  <div className="text-sm text-[#4A4E54]">
                    {m.drivingNm.toLocaleString()} Nm · {HMR_SERIES[m.series].pressureBar} bar
                  </div>
                  <div className="text-xs text-[#62666C] mt-2">
                    Rotation: {m.rotation.map((r) => `${r}°`).join(', ')}
                  </div>
                  <div className="mt-3 inline-block px-2 py-1 rounded text-xs font-medium bg-[#F0F4FA] text-[#2C4A73]">
                    {candidateNote(m)}
                  </div>
                  {m.series === 'HMR2' && (
                    <p className="mt-3 text-xs text-[#62666C]">
                      Foot mount only. Send a request for other mounting arrangements and our
                      engineering team will confirm a configuration.
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {parseError && (
          <div className="mb-12 p-6 rounded-xl border border-[#D98A1D] bg-[#FFF8EE]">
            <h3 className="font-medium text-[#1B1E20] mb-2">Invalid order code</h3>
            <p className="text-sm text-[#4A4E54] mb-4">{parseError}</p>
            <button
              onClick={quoteCode}
              className="text-sm font-medium text-[#D98A1D] hover:underline"
            >
              Send reference for evaluation →
            </button>
          </div>
        )}

        {noMatchRef && !overMax && !parseError && (
          <div className="mb-12 p-6 rounded-xl border border-[rgba(44,74,115,0.10)] bg-[#FAFAF7]">
            <h3 className="font-medium text-[#1B1E20] mb-2">No verified catalogue match</h3>
            <p className="text-sm text-[#4A4E54] mb-4">
              We can evaluate “{noMatchRef}” against our engineering records. Send the reference and
              application details for review.
            </p>
            <button
              onClick={quoteCode}
              className="text-sm font-medium text-[#D98A1D] hover:underline"
            >
              Send reference for evaluation →
            </button>
          </div>
        )}

        {selectedModel && schema && (
          <div className="mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <div className="aspect-[4/3] rounded-xl border border-[rgba(44,74,115,0.10)] bg-[#FAFAF7] overflow-hidden mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getSeriesImage(selectedModel.series, selectedModel.series === 'HMR4' ? mount : undefined)}
                  alt={selectedModel.series === 'HMR4'
                    ? (mount === 'FF' || mount === 'RF'
                      ? 'HMR4 flange-mounted helical rotary actuator'
                      : 'HMR4 foot-mounted helical rotary actuator')
                    : `${selectedModel.series} rotary actuator representative view`}
                  className="w-full h-full object-contain p-4"
                />
              </div>
              <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-[#F0F4FA]">
                <div>
                  <div className="text-xs text-[#62666C]">Selected model</div>
                  <div className="text-xl font-semibold font-mono text-[#1B1E20]">{selectedModel.hmr}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[#62666C]">Driving torque</div>
                  <div className="text-lg font-medium text-[#1B1E20]">{selectedModel.drivingNm.toLocaleString()} Nm</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-[#FAFAF7] border border-[rgba(44,74,115,0.10)] rounded-xl p-6">
                <h3 className="text-lg font-medium text-[#1B1E20] mb-5">Configure your order code</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                  <div>
                    <label className="block text-xs font-medium text-[#62666C] uppercase tracking-wide mb-2">
                      Rotation angle
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedModel.rotation.map((a) => (
                        <button
                          key={a}
                          onClick={() => setAngle(a)}
                          className={classNames(
                            'px-3 py-2 rounded-lg text-sm border transition-colors',
                            angle === a
                              ? 'bg-[#D98A1D] border-[#D98A1D] text-white'
                              : 'bg-white border-[rgba(44,74,115,0.15)] text-[#1B1E20] hover:border-[#D98A1D]'
                          )}
                        >
                          {a}°
                        </button>
                      ))}
                    </div>
                  </div>

                  {visibleMounts.length > 0 && (
                    <div>
                      <label className="block text-xs font-medium text-[#62666C] uppercase tracking-wide mb-2">
                        Mount
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {visibleMounts.map((m) => (
                          <button
                            key={m.code}
                            onClick={() => setMount(m.code)}
                            className={classNames(
                              'px-3 py-2 rounded-lg text-sm border transition-colors',
                              mount === m.code
                                ? 'bg-[#D98A1D] border-[#D98A1D] text-white'
                                : 'bg-white border-[rgba(44,74,115,0.15)] text-[#1B1E20] hover:border-[#D98A1D]'
                            )}
                            title={m.label}
                          >
                            {m.code} <span className="text-xs opacity-80">{m.label}</span>
                          </button>
                        ))}
                      </div>

                      {selectedModel?.series === 'HMR2' && (
                        <p className="mt-2 text-xs text-[#4A4E54]">
                          HMR2 is supplied as foot-mount only (FT). For a flange or any other mounting
                          arrangement, send us a request and our engineering team will confirm a
                          configuration for you.
                        </p>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-[#62666C] uppercase tracking-wide mb-2">
                      Output shaft
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {schema.outputs.map((o) => (
                        <button
                          key={o.code}
                          onClick={() => setOutput(o.code)}
                          className={classNames(
                            'px-3 py-2 rounded-lg text-sm border transition-colors',
                            output === o.code
                              ? 'bg-[#D98A1D] border-[#D98A1D] text-white'
                              : 'bg-white border-[rgba(44,74,115,0.15)] text-[#1B1E20] hover:border-[#D98A1D]'
                          )}
                          title={o.label}
                        >
                          {o.code} <span className="text-xs opacity-80">{o.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#62666C] uppercase tracking-wide mb-2">
                      Valve option
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {schema.valves.map((v) => {
                        const label = v.label || VALVE_LABELS[v.code] || '';
                        return (
                          <button
                            key={v.code}
                            onClick={() => setValve(v.code)}
                            className={classNames(
                              'px-3 py-2 rounded-lg text-sm border transition-colors',
                              valve === v.code
                                ? 'bg-[#D98A1D] border-[#D98A1D] text-white'
                                : 'bg-white border-[rgba(44,74,115,0.15)] text-[#1B1E20] hover:border-[#D98A1D]'
                            )}
                            title={label}
                          >
                            {v.code} <span className="text-xs opacity-80">{label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {implicitMount && (
                  <p className="text-xs text-[#62666C] mb-4">
                    {schema.note || `${implicitMount.label} (${implicitMount.code}) mounting is implicit in the order code.`}
                  </p>
                )}

                {selectedModel.comparableNote && (
                  <div className="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-900">
                    <p className="font-medium">Engineering note</p>
                    <p>{selectedModel.comparableNote}</p>
                  </div>
                )}
                {selectedModel.availability === 'engineered' && !selectedModel.comparableNote && (
                  <div className="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-900">
                    <p>Engineered / non-standard build — confirm mounting interface and duty with our engineering team.</p>
                  </div>
                )}
                {directInfo && (
                  <div className="mb-4 space-y-2">
                    {directInfo.warnings.length > 0 && (
                      <div className="p-3 rounded-lg bg-[#FFF8EE] border border-[#D98A1D] text-sm text-[#1B1E20]">
                        {directInfo.warnings.map((w, i) => (
                          <p key={i}>{w}</p>
                        ))}
                      </div>
                    )}
                    {directInfo.extras.length > 0 && (
                      <div className="p-3 rounded-lg bg-[#F0F4FA] text-sm text-[#4A4E54]">
                        <p className="font-medium text-[#1B1E20] mb-1">Additional requirements / engineering confirmation</p>
                        <ul className="list-disc list-inside space-y-0.5">
                          {directInfo.extras.map((e, i) => (
                            <li key={i}>{e}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="p-3 rounded-lg bg-white border border-[rgba(44,74,115,0.10)] text-sm">
                      <p className="font-medium text-[#1B1E20] mb-2">Engineering confidence</p>
                      <div className="grid sm:grid-cols-3 gap-3">
                        {(
                          [
                            ['Model parse', directInfo.layers.parse],
                            ['HM can manufacture', directInfo.layers.manufacturing],
                            ['Direct install replacement', directInfo.layers.install],
                          ] as const
                        ).map(([label, item]) => (
                          <div key={label} className="rounded-lg bg-[#FAFAF7] p-2.5">
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className={classNames(
                                  'inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold text-white',
                                  item.level === 'A' && 'bg-green-600',
                                  item.level === 'B' && 'bg-[#D98A1D]',
                                  item.level === 'C' && 'bg-[#2C4A73]'
                                )}
                              >
                                {item.level}
                              </span>
                              <span className="font-medium text-[#1B1E20]">{label}</span>
                            </div>
                            <p className="text-xs text-[#4A4E54]">{item.note}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <div className="text-xs text-[#62666C] mb-1">Order code example: {schema.example}</div>
                  <div className="flex items-center gap-3">
                    <code className="flex-1 block px-4 py-3 rounded-lg bg-[#1B1E20] text-[#D98A1D] text-xl md:text-2xl font-mono tracking-wide">
                      {orderCode || '—'}
                    </code>
                    <button
                      onClick={copyCode}
                      className="px-4 py-3 rounded-lg border border-[rgba(44,74,115,0.15)] text-sm font-medium text-[#2C4A73] hover:border-[#2C4A73]"
                    >
                      {copied ? 'Copied' : 'Copy code'}
                    </button>
                  </div>
                </div>

                <button
                  onClick={quoteCode}
                  className="inline-flex items-center px-5 py-2.5 rounded-lg bg-[#2C4A73] text-white text-sm font-medium hover:bg-[#1f3657] transition-colors"
                >
                  Quote this code
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div ref={rfqRef} className="max-w-[1200px] mx-auto px-6 md:px-8 mt-10">
        <HmrRfqForm />
      </div>
    </section>
  );
}
