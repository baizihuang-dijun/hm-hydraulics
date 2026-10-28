import type { Metadata } from 'next';
import Link from 'next/link';
import { getHmrComparison } from '@/lib/hmr/hmr-compare';
import { linkForBase } from '@/lib/hmr/hmr-cross-links';
import { HMR_ALL_DATA } from '@/lib/hmr/hmr-all-series';

const CODE = 'HMR2-050';

export const metadata: Metadata = {
  title: 'HMR2-050 Helical Rotary Actuator — 508 Nm, 180° Foot Mount',
  description:
    'HMR2-050 helical hydraulic rotary actuator: 508 Nm driving torque at 210 bar, 180° rotation, foot mount, 1F/2F output, NV/CB/CS valves. Order code HMR2-050-180-FT-1F-NV.',
  alternates: { canonical: '/products/rotary-actuators/hmr2-050' },
};

const BRAND_ORDER = [
  ['helac', 'Helac'],
  ['hks', 'HKS'],
  ['moveco', 'Moveco'],
  ['sungji', 'Sungji'],
] as const;

export default function Hmr2050Page() {
  const c = getHmrComparison(CODE);
  const model = HMR_ALL_DATA.models.find((m) => m.hmr === CODE);
  if (!c || !model) return null;

  const rows = BRAND_ORDER.flatMap(([key, label]) =>
    ((model.comparable as Record<string, string[] | undefined>)[key] ?? []).map((ref) => ({
      brand: label,
      ref,
      href: linkForBase(ref),
    })),
  );

  const specs: [string, string][] = [
    ['Rated driving torque', `${c.drivingNm.toLocaleString('en-US')} Nm`],
    ['Rated pressure', `${c.pressureBar} bar`],
    ['Rotation', `${c.angles.join('° / ')}°`],
    ['Mounting', c.mounts.join(' · ')],
    ['Output shaft', c.outputs.join(' · ')],
    ['Valve options', c.valves.join(' / ')],
    ['Ordering pattern', c.orderSyntax ?? '—'],
    ['Example order code', c.example ?? '—'],
  ];

  const decode: [string, string][] = [
    ['HMR2', 'Series — helical rotary actuator, foot-mount family, 210 bar rated'],
    ['050', 'Spec size — 508 Nm driving torque class'],
    ['180', 'Rotation — 180° total travel'],
    ['FT', 'Foot mount (standard on this series)'],
    ['1F', 'Output — single flat shaft'],
    ['NV', 'Valve — no valve / plain ports'],
  ];

  return (
    <main>
      <div className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-4">
          <nav className="text-xs text-[#62666C] flex flex-wrap items-center gap-2">
            <Link href="/" className="no-underline text-[#62666C] hover:text-[#2C4A73]">Home</Link>
            <span>/</span>
            <Link href="/products/rotary-actuators" className="no-underline text-[#62666C] hover:text-[#2C4A73]">Rotary actuators</Link>
            <span>/</span>
            <span className="text-[#1B1E20]">HMR2-050</span>
          </nav>
        </div>
      </div>

      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-20">
          <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-3">
            HMR2 series · spec 050 · {c.familyClass}
          </p>
          <h1 className="font-heading text-3xl md:text-5xl font-medium text-[#1B1E20] mb-5 leading-tight">
            HMR2-050 helical rotary actuator
          </h1>
          <p className="text-lg text-[#4A4E54] max-w-3xl mb-8">
            {c.drivingNm.toLocaleString('en-US')} Nm driving torque at {c.pressureBar} bar, 180° rotation, foot
            mount. A compact helical actuator for steering and positioning duties on mobile equipment, built to
            order in the HMR2 family.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
            {[
              [`${c.drivingNm.toLocaleString('en-US')} Nm`, 'Driving torque'],
              [`${c.pressureBar} bar`, 'Rated pressure'],
              [`${c.angles.join(' / ')}°`, 'Rotation'],
              ['FT', 'Foot mount'],
            ].map(([v, k]) => (
              <div key={k} className="border border-[rgba(44,74,115,0.10)] rounded-md bg-white px-4 py-4">
                <div className="font-heading text-xl text-[#1B1E20] mb-1">{v}</div>
                <div className="text-xs text-[#62666C] uppercase tracking-wider">{k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="specs" className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-6">
            Specifications — HMR2-050
          </h2>
          <div className="overflow-hidden border border-[rgba(44,74,115,0.10)] rounded-md bg-white max-w-3xl">
            <table className="w-full text-sm">
              <tbody>
                {specs.map(([k, v]) => (
                  <tr key={k} className="border-b border-[rgba(44,74,115,0.08)] last:border-b-0">
                    <th scope="row" className="text-left py-3.5 px-5 font-medium text-[#1B1E20] w-56 align-top">{k}</th>
                    <td className="py-3.5 px-5 text-[#4A4E54]">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-3">
            What the code means
          </h2>
          <p className="text-sm text-[#62666C] max-w-3xl mb-6">
            Every HMR2 unit is specified the same way. If your tag carries a different suffix, the base size is
            still HMR2-050.
          </p>
          <div className="overflow-hidden border border-[rgba(44,74,115,0.10)] rounded-md bg-white max-w-3xl">
            <table className="w-full text-sm">
              <tbody>
                {decode.map(([seg, meaning]) => (
                  <tr key={seg} className="border-b border-[rgba(44,74,115,0.08)] last:border-b-0">
                    <th scope="row" className="text-left py-3 px-5 font-mono font-medium text-[#2C4A73] w-24">{seg}</th>
                    <td className="py-3 px-5 text-[#4A4E54]">{meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-2">Cross reference</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
            Models customers compare with HMR2-050
          </h2>
          <p className="text-sm text-[#4A4E54] max-w-3xl mb-6">
            These are the models that sit in the same torque class and come up in the same enquiries. They are
            comparable references, not validated substitutions — we confirm the mounting pattern, shaft and port
            details against your unit before quoting.
          </p>
          <div className="overflow-hidden border border-[rgba(44,74,115,0.10)] rounded-md bg-white max-w-3xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(44,74,115,0.10)] bg-[#F7F8FA]">
                  <th className="text-left py-3 px-5 font-medium text-[#1B1E20]">Make</th>
                  <th className="text-left py-3 px-5 font-medium text-[#1B1E20]">Model</th>
                  <th className="text-left py-3 px-5 font-medium text-[#1B1E20]">Reference page</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={`${r.brand}-${r.ref}`} className="border-b border-[rgba(44,74,115,0.08)] last:border-b-0">
                    <td className="py-3 px-5 text-[#1B1E20]">{r.brand}</td>
                    <td className="py-3 px-5 text-[#4A4E54] font-mono text-xs">{r.ref}</td>
                    <td className="py-3 px-5">
                      {r.href ? (
                        <Link href={`/alternatives/${r.href}`} className="text-[#2C4A73] no-underline hover:underline">
                          See the {r.ref} page
                        </Link>
                      ) : (
                        <span className="text-[#62666C]">No page — ask us</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[#62666C] max-w-3xl mt-4">{c.notice}</p>
        </div>
      </section>

      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-6">
            What we check before quoting
          </h2>
          <div className="grid md:grid-cols-2 gap-5 max-w-3xl">
            <div className="border border-[rgba(44,74,115,0.10)] rounded-md bg-white p-5">
              <h3 className="font-medium text-[#1B1E20] mb-2">On the unit</h3>
              <ul className="text-sm text-[#4A4E54] space-y-1.5 list-disc pl-4">
                <li>Mounting pattern and bolt spacing</li>
                <li>Shaft type, spline or keyway, and length</li>
                <li>Port size, thread form and valve arrangement</li>
              </ul>
            </div>
            <div className="border border-[rgba(44,74,115,0.10)] rounded-md bg-white p-5">
              <h3 className="font-medium text-[#1B1E20] mb-2">On the machine</h3>
              <ul className="text-sm text-[#4A4E54] space-y-1.5 list-disc pl-4">
                <li>Available envelope and tie-rod clearance</li>
                <li>Working pressure and flow at the actuator</li>
                <li>Rotation stops and any mechanical limits</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="rfq" className="bg-[#F7F8FA]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-3">
            Send your tag and mounting drawing
          </h2>
          <p className="text-[#4A4E54] max-w-2xl mx-auto mb-7">
            We confirm the fit against HMR2-050, quote the matching build and give you a delivery date.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-[#2C4A73] text-white text-sm font-medium no-underline hover:bg-[#1E3A5F]"
          >
            Request a quote for HMR2-050
          </Link>
        </div>
      </section>
    </main>
  );
}
