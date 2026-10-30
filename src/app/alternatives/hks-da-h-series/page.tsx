import type { Metadata } from 'next';
import Link from 'next/link';
import { RfqForm } from '@/components/alternatives/rfq-form';
import { modelPages, parseTorqueNm } from '@/components/alternatives/model-data';

const SERIES = 'DA-H / I-DA-H';

const sizes = modelPages
  .filter((m) => m.series === SERIES)
  .sort((a, b) => parseTorqueNm(a.torque) - parseTorqueNm(b.torque));

const mobile = modelPages
  .filter((m) => (m.series ?? '').startsWith('M-DA-H'))
  .sort((a, b) => parseTorqueNm(a.torque) - parseTorqueNm(b.torque));

export const metadata: Metadata = {
  title: 'HKS DA-H / I-DA-H Series Sourcing | Large-Bore Rotary Actuators',
  description:
    'HKS DA-H and I-DA-H large-bore industrial rotary actuators, bore sizes 40 to 300 and roughly 200 to 76,000 Nm at 210 bar. HM Hydraulics provides technical selection and sourcing / alternative-supply support for these references, with the interface verified against your nameplate before quotation.',
  alternates: { canonical: '/alternatives/hks-da-h-series' },
};

const faqs = [
  {
    q: 'What is the HKS DA-H series?',
    a: 'DA-H is HKS\u2019s large-bore industrial helical rotary actuator programme, rated at 210 bar, with 90, 180, 270 and 360 degree rotations. Hollow-shaft versions are available as HW (DIN 5463 splined bore) and HWP (DIN 6885 keyed bore), subject to configuration confirmation. Bore sizes run from 40 to 300, roughly 200 Nm to 76,000 Nm of output torque. The number in the model is a bore / housing size designation, not a torque figure.',
  },
  {
    q: 'DA-H or I-DA-H \u2014 which one do I have?',
    a: 'Both are the same bore in two programme generations. DA-H is the 210 bar sheet; I-DA-H is the newer 250 bar build with cushioning, an adjustable angle stop and a camshaft as standard, and it is heavier for the same bore. Published rated torque at the same size is the same, because it is set by the displacement, not the pressure rating. The nameplate settles it, and it matters for the interface and for what the rest of the circuit is set to.',
  },
  {
    q: 'Can HM supply these sizes as an alternative?',
    a: 'For every size on this page we offer an alternative unit from our own HMR1 build in the same torque class, plus the selection work around it. We do not hold HKS units as a stocked SKU and do not promise stock, lead time or confirmed availability. Rotation, mounting interface, shaft and port arrangement are checked against your nameplate and drawing before any quotation.',
  },
  {
    q: 'Why is the number 225S listed separately from 225?',
    a: '225S is a reinforced variant of the 225 bore with a higher torque rating: 38,920 Nm at 210 bar against 32,000 Nm for the standard 225, so the two sit in different torque classes. If your nameplate says 225S, treat it as its own size rather than as a 225 with an option code.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function Page() {
  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-12">
        <nav className="text-xs text-[#62666C] mb-6">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/alternatives" className="hover:underline">HKS Alternatives</Link>
          <span className="mx-2">/</span>
          <span>DA-H / I-DA-H</span>
        </nav>
        <p className="font-label text-xs tracking-wider uppercase text-[#62666C] mb-3">HKS sourcing</p>
        <h1 className="font-heading text-3xl md:text-4xl font-medium text-[#1B1E20] mb-6">
          HKS DA-H / I-DA-H Series &mdash; Large-Bore Industrial Rotary Actuators
        </h1>
        <div className="prose prose-sm max-w-3xl text-[#4A4E54] leading-relaxed space-y-4">
          <p>
            The HKS DA-H programme is the large-bore industrial side of HKS&rsquo;s helical rotary actuator range:
            210 bar rated, 90 / 180 / 270 / 360 degree rotation and flanged industrial mounting, with hollow-shaft
            versions in HW (DIN 5463 splined bore) and HWP (DIN 6885 keyed bore). Bore sizes run from 40 to 300, which
            covers roughly 200 Nm to 76,000 Nm of output
            torque. The I-DA-H sheet is the same bores in the newer 250 bar generation, with cushioning, an adjustable
            angle stop and a camshaft as standard.
          </p>
          <p>
            The number in the model code is a bore / housing size designation, not a torque figure, and it does not line
            up with another maker&rsquo;s size number. That is why the sizes below are grouped by torque class rather than
            by model number: it is the only comparison that survives across brands.
          </p>
          <p>
            HM Hydraulics supplies an alternative unit from its own HMR1 build in the same torque class for each size
            below, and supports the selection work around it. We do not hold HKS units as a stocked SKU and do not
            promise stock, lead time or confirmed availability. Rotation, mounting interface, shaft and port arrangement
            are checked against your nameplate and drawing before any quotation.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="font-heading text-2xl font-medium text-[#1B1E20] mb-6">Sizes in this programme</h2>
        <div className="overflow-hidden border border-[rgba(44,74,115,0.12)] rounded-md">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[rgba(44,74,115,0.05)] text-left text-[#1B1E20]">
                <th className="py-3 px-5 font-medium">HKS size</th>
                <th className="py-3 px-5 font-medium">Rated torque @210 bar</th>
                <th className="py-3 px-5 font-medium">Displacement @180&deg;</th>
                <th className="py-3 px-5 font-medium">Weight @180&deg;</th>
                <th className="py-3 px-5 font-medium">HM torque class</th>
              </tr>
            </thead>
            <tbody className="text-[#4A4E54]">
              {sizes.map((m) => (
                <tr key={m.slug} className="border-t border-[rgba(44,74,115,0.08)]">
                  <td className="py-3 px-5">
                    <Link href={`/alternatives/${m.slug}`} className="text-[#2C4A73] hover:underline">
                      {m.model}
                    </Link>
                  </td>
                  <td className="py-3 px-5">{m.catalogSpec?.ratedTorqueNm ? m.catalogSpec.ratedTorqueNm.toLocaleString('en-US') + ' Nm' : m.torque}</td>
                  <td className="py-3 px-5">{m.catalogSpec?.displacementCm3 ?? '\u2014'}</td>
                  <td className="py-3 px-5">{m.catalogSpec?.weightKg ?? m.weight}</td>
                  <td className="py-3 px-5 font-label text-[#1B1E20]">{m.hmr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[#62666C] leading-relaxed mt-3 max-w-3xl">
          Figures are the manufacturer&rsquo;s published values for the DA-H industrial sheet. The HM torque class column
          is an engineering cross-reference by rated output torque; the housing and mounting designs are independent, so
          dimensions are never assumed to match.
        </p>

        <div className="mt-10 p-5 bg-[rgba(44,74,115,0.05)] border border-[rgba(44,74,115,0.12)] rounded-md max-w-3xl">
          <p className="text-sm text-[#4A4E54] leading-relaxed m-0">
            <strong className="text-[#1B1E20]">Note on bores 50 / 63 / 80 / 100.</strong> These bores appear on both the
            industrial DA-H sheet and the mobile M-DA-H sheet, with different ratings and a different housing. The mobile
            builds are documented on our{' '}
            {mobile.slice(0, 1).map((m) => (
              <Link key={m.slug} href={`/alternatives/${m.slug}`} className="text-[#2C4A73] hover:underline">
                M-DA-H pages
              </Link>
            ))}
            . If your nameplate does not make the programme obvious, send the tag and we confirm which sheet your unit
            belongs to before quoting.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="font-heading text-2xl font-medium text-[#1B1E20] mb-6">Frequently asked</h2>
        <div className="space-y-6 max-w-3xl">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-medium text-[#1B1E20] mb-2">{f.q}</h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20">
        <RfqForm context="HKS DA-H / I-DA-H sizing" />
      </section>
    </main>
  );
}
