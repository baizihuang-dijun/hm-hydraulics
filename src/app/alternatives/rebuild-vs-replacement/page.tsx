import type { Metadata } from 'next';
import Link from 'next/link';
import { RfqForm } from '@/components/alternatives/rfq-form';
import { SITE } from '@/components/alternatives/model-data';

export const metadata: Metadata = {
  title: 'Rotary Actuator Rebuild vs Replacement: Costs, Downtime & Decision Guide | HM Hydraulics',
  description:
    'Should you rebuild or replace your Helac rotary actuator? Compare seal kit costs, downtime, and risk factors. Free engineering assessment for replacement options.',
  alternates: { canonical: '/alternatives/rebuild-vs-replacement' },
};

const pagePath = '/alternatives/rebuild-vs-replacement';

const faqs = [
  {
    q: 'How much does a rotary actuator rebuild cost?',
    a: 'A typical seal-kit rebuild costs $150–$400 for the parts, plus 2–4 hours of labor. Costs rise if the shaft, spline, or housing needs machining or replacement.',
  },
  {
    q: 'When is replacement better than rebuilding?',
    a: 'Replacement is the safer choice when there is combined external and internal leakage, torque loss above 15%, spline wear, shaft scoring, housing cracks, or a history of repeated seal failures.',
  },
  {
    q: 'How long does a replacement actuator take to arrive?',
    a: 'Standard replacement actuators are typically available within 2–4 weeks after we confirm the model code and mounting interface. Exact lead time is quoted per order.',
  },
  {
    q: 'Can I use a seal kit if the housing is intact?',
    a: 'Yes. If inspection confirms the housing bore, shaft, and spline are within specification, a seal kit can restore function at a lower cost than full replacement.',
  },
  {
    q: 'What is the risk of rebuilding a worn actuator?',
    a: 'Rebuilding a unit with worn hard parts often leads to repeat failure within months, because new seals cannot compensate for damaged bores, scored shafts, or distorted housings.',
  },
  {
    q: 'What information do I need for a replacement assessment?',
    a: 'Send the Helac model code, OEM part number, machine model, and photos of the tag, mounting face, shaft, and machine nameplate. We confirm the match before quoting.',
  },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
    { '@type': 'ListItem', position: 2, name: 'Helac Alternatives', item: `${SITE}/alternatives` },
    { '@type': 'ListItem', position: 3, name: 'Rebuild vs Replacement', item: `${SITE}${pagePath}` },
  ],
};

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Rotary Actuator Rebuild vs Replacement: Seal Kit Costs, Downtime & When to Replace',
  description:
    'Should you rebuild or replace your Helac rotary actuator? Compare seal kit costs, downtime, and risk factors.',
  author: {
    '@type': 'Organization',
    name: 'HM Hydraulics Engineering Team',
  },
  publisher: {
    '@type': 'Organization',
    name: 'HM Hydraulics — Qingdao Hydraulic Machinery Co., Ltd.',
    url: SITE,
  },
  datePublished: '2026-09-01',
  dateModified: '2026-09-01',
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function RebuildVsReplacementPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbJsonLd, articleJsonLd, faqJsonLd]) }}
      />

      {/* Breadcrumb */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-6">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-[#62666C]">
            <Link href="/" className="no-underline text-[#62666C] hover:text-[#2C4A73] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/alternatives" className="no-underline text-[#62666C] hover:text-[#2C4A73] transition-colors">
              Helac Alternatives
            </Link>
            <span>/</span>
            <span className="text-[#1B1E20]">Rebuild vs Replacement</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">DECISION GUIDE</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-[#1B1E20] leading-tight mb-6">
            Rotary Actuator Rebuild vs Replacement: Seal Kit Costs, Downtime & When to Replace
          </h1>
          <p className="text-lg text-[#4A4E54] leading-relaxed max-w-3xl mb-4">
            A rotary actuator rebuild makes sense when only seals are worn and the housing, spline,
            and shaft are intact—typically costing $150–$400 for a seal kit plus labor. Replacement
            becomes the better choice when there is external leakage with internal bypass, torque
            loss beyond 15%, spline wear, shaft damage, or housing cracks, because a rebuilt unit in
            poor condition often fails again within months.
          </p>
          <p className="text-sm text-[#62666C]">Last reviewed: September 2026</p>
        </div>
      </section>

      {/* When Rebuild */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-5">
            When Rebuild Is the Right Choice
          </h2>
          <p className="text-[#4A4E54] leading-relaxed max-w-3xl mb-6">
            A rebuild is economical when the internal mechanical condition of the actuator is still
            sound. In these cases, replacing seals and wipers restores pressure holding and
            rotation without the lead time of a full unit.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[#4A4E54] leading-relaxed max-w-3xl">
            <li>Only seals and wipers show wear; housing bore is clean and within tolerance.</li>
            <li>Spline and shaft surfaces are intact with no galling or scoring.</li>
            <li>Unit does not bypass pressure internally when held at working load.</li>
            <li>External leakage is limited to seal areas and stops when seals are replaced.</li>
            <li>Machine downtime must be minimized and a seal kit is immediately available.</li>
          </ul>
        </div>
      </section>

      {/* When Replace */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-5">
            When Replacement Is Necessary
          </h2>
          <p className="text-[#4A4E54] leading-relaxed max-w-3xl mb-6">
            Some wear patterns cannot be fixed with seals alone. Replacing the actuator avoids a
            second failure and protects connected machine components from damage.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[#4A4E54] leading-relaxed max-w-3xl">
            <li>External leakage is accompanied by internal bypass or pressure loss.</li>
            <li>Measured torque output has dropped more than 15% at rated pressure.</li>
            <li>Spline or shaft shows wear, twisting, or scoring that will damage new seals.</li>
            <li>Housing has cracks, distorted mounting faces, or damaged port threads.</li>
            <li>A previous rebuild failed within the same operating interval.</li>
          </ul>
        </div>
      </section>

      {/* Cost Comparison */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">
            Cost Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[rgba(44,74,115,0.20)]">
                  <th className="py-3 pr-4 font-heading text-sm font-medium text-[#1B1E20]">Factor</th>
                  <th className="py-3 px-4 font-heading text-sm font-medium text-[#1B1E20]">Rebuild</th>
                  <th className="py-3 pl-4 font-heading text-sm font-medium text-[#1B1E20]">Replacement</th>
                </tr>
              </thead>
              <tbody className="text-[#4A4E54]">
                <tr className="border-b border-[rgba(44,74,115,0.10)]">
                  <td className="py-3 pr-4 font-medium text-[#1B1E20]">Parts cost</td>
                  <td className="py-3 px-4">$150–$400 (seal kit)</td>
                  <td className="py-3 pl-4">Full actuator cost</td>
                </tr>
                <tr className="border-b border-[rgba(44,74,115,0.10)]">
                  <td className="py-3 pr-4 font-medium text-[#1B1E20]">Labor</td>
                  <td className="py-3 px-4">2–4 hours</td>
                  <td className="py-3 pl-4">1–3 hours</td>
                </tr>
                <tr className="border-b border-[rgba(44,74,115,0.10)]">
                  <td className="py-3 pr-4 font-medium text-[#1B1E20]">Downtime</td>
                  <td className="py-3 px-4">Short, if kit is in stock</td>
                  <td className="py-3 pl-4">2–4 weeks typical lead time</td>
                </tr>
                <tr className="border-b border-[rgba(44,74,115,0.10)]">
                  <td className="py-3 pr-4 font-medium text-[#1B1E20]">Warranty risk</td>
                  <td className="py-3 px-4">Higher if hard parts are worn</td>
                  <td className="py-3 pl-4">Lower, new unit</td>
                </tr>
                <tr className="border-b border-[rgba(44,74,115,0.10)]">
                  <td className="py-3 pr-4 font-medium text-[#1B1E20]">Risk of repeat failure</td>
                  <td className="py-3 px-4">High when housing or shaft is damaged</td>
                  <td className="py-3 pl-4">Low when matched correctly</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-[#1B1E20]">Best for</td>
                  <td className="py-3 px-4">Seal-only wear, sound hard parts</td>
                  <td className="py-3 pl-4">Worn hard parts or repeat failures</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Decision Checklist */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">
            5-Point Decision Checklist
          </h2>
          <ol className="list-decimal pl-5 space-y-4 text-[#4A4E54] leading-relaxed max-w-3xl">
            <li>Inspect the actuator tag and confirm the exact Helac model code and OEM part number.</li>
            <li>Check for external leakage and measure whether the actuator holds pressure under load.</li>
            <li>Inspect the shaft, spline, and housing for scoring, cracks, or distortion.</li>
            <li>Compare current torque output to the original specification; flag any drop above 15%.</li>
            <li>Review service history: has a previous rebuild failed within the same interval?</li>
          </ol>
        </div>
      </section>

      {/* Risk */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-5">
            Risk of Rebuilding a Worn Unit
          </h2>
          <p className="text-[#4A4E54] leading-relaxed max-w-3xl mb-4">
            A seal kit cannot compensate for damaged bores, distorted housings, or worn splines. When
            these defects are present, new seals wear quickly and the unit fails again—often within
            weeks. The second failure adds labor, downtime, and freight costs that exceed the price
            difference of a replacement.
          </p>
          <p className="text-[#4A4E54] leading-relaxed max-w-3xl">
            For critical production equipment, replacement is usually the lower-risk choice when any
            of the hard-part warning signs are present.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section id="rfq" className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="eyebrow mb-4">FREE ASSESSMENT</p>
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
                Get a Free Rebuild vs Replacement Assessment
              </h2>
              <p className="text-[#4A4E54] leading-relaxed mb-6">
                Send us the Helac model code, OEM part number, and photos of the tag and mounting
                face. Our engineering team will advise whether a rebuild is viable or if replacement
                is the safer option.
              </p>
              <p className="text-sm text-[#62666C]">
                Or email directly:{' '}
                <a href="mailto:hm@hmhydraulics.com" className="text-[#2C4A73] no-underline hover:underline">
                  hm@hmhydraulics.com
                </a>
              </p>
            </div>
            <div className="p-6 md:p-8 bg-white border border-[rgba(44,74,115,0.10)] rounded-md">
              <RfqForm context="Rebuild vs replacement assessment" />
            </div>
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-6">
            Related Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/alternatives"
              className="block p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white no-underline hover:border-[rgba(44,74,115,0.25)] transition-colors"
            >
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">Helac Replacement Guide</h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">Browse replacement actuators by Helac series.</p>
            </Link>
            <Link
              href="/alternatives/cross-reference-guide"
              className="block p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white no-underline hover:border-[rgba(44,74,115,0.25)] transition-colors"
            >
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">Cross-Reference Guide</h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">Match OEM part numbers to the right replacement.</p>
            </Link>
            <Link
              href="/alternatives/how-to-identify"
              className="block p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white no-underline hover:border-[rgba(44,74,115,0.25)] transition-colors"
            >
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">How to Identify Your Actuator</h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">Read model tags and decode Helac model codes.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">Questions</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-10">
            Frequently asked questions
          </h2>
          <div className="max-w-3xl divide-y divide-[rgba(44,74,115,0.10)]">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex items-center justify-between cursor-pointer list-none font-heading text-base md:text-lg font-medium text-[#1B1E20]">
                  {f.q}
                  <span className="ml-4 text-[#2C4A73] text-xl leading-none transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[#4A4E54] leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section>
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-12">
          <p className="text-xs text-[#62666C] leading-relaxed max-w-4xl">
            Helac® and all OEM names are trademarks of their respective owners. HM Hydraulics is an
            independent manufacturer and is not affiliated with, sponsored by, or endorsed by Helac,
            Parker, or any listed OEM. Part numbers and model codes are used solely for
            identification and compatibility purposes.
          </p>
        </div>
      </section>
    </>
  );
}
