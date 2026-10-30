import type { Metadata } from 'next';
import { CookieSettingsButton } from '@/components/cookie-settings-button';

export const metadata: Metadata = {
  title: 'Privacy Policy & Cookie Notice',
  description:
    'How HM Hydraulics collects, uses and protects personal data, which cookies this site sets, and how to withdraw your consent at any time.',
  alternates: { canonical: '/privacy' },
};

const LAST_UPDATED = '30 October 2026';

type Block =
  | { kind: 'p'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'table'; head: string[]; rows: string[][] };

type Section = { id: string; heading: string; blocks: Block[] };

const sections: Section[] = [
  {
    id: 'who-we-are',
    heading: '1. Who we are',
    blocks: [
      {
        kind: 'p',
        text: 'HM Hydraulics is the trading name of Qingdao Hydraulic Machinery Co., Ltd., a company registered in Qingdao, Shandong, People\'s Republic of China. We manufacture and supply helical rotary actuators and hydraulic core components for OEM and aftermarket applications.',
      },
      {
        kind: 'p',
        text: 'For the purposes of the EU General Data Protection Regulation (GDPR), we act as the data controller for personal data collected through this website. Our contact address for all privacy matters is hm@hmhydraulics.com.',
      },
    ],
  },
  {
    id: 'scope',
    heading: '2. What this policy covers',
    blocks: [
      {
        kind: 'p',
        text: 'This policy explains what personal data we collect when you visit www.hmhydraulics.com or contact us through it, why we collect it, who we share it with, how long we keep it, and what rights you have. It covers this website only. Where we link to a third-party site, that site\'s own privacy policy applies.',
      },
    ],
  },
  {
    id: 'what-we-collect',
    heading: '3. What we collect',
    blocks: [
      {
        kind: 'p',
        text: '3.1 Information you give us. When you submit a quote request, technical enquiry or contact form, we receive the details you enter: your name, company name, email address, the product or application you are interested in, your message, and the page you sent it from. If you email or message us directly, we receive whatever you include in that message, which may include a phone number, delivery country or machine details.',
      },
      {
        kind: 'p',
        text: '3.2 Information collected automatically. If — and only if — you accept analytics cookies, we collect aggregated usage information: the pages you view, how long a visit lasts, the approximate location derived from your IP address (typically country or city level), device type, browser and operating system, and the source that referred you to the site. Before you accept, no analytics script is loaded and no analytics cookie is written.',
      },
      {
        kind: 'p',
        text: '3.3 What we do not collect. We do not collect payment card data through this website, we do not process special categories of personal data, and we do not use your data for advertising, retargeting or automated decision-making that produces legal effects.',
      },
    ],
  },
  {
    id: 'cookies',
    heading: '4. Cookies and local storage',
    blocks: [
      {
        kind: 'p',
        text: 'A cookie is a small file a site stores in your browser. We also use your browser\'s local storage to remember your cookie choice. The table below lists everything this site stores.',
      },
      {
        kind: 'table',
        head: ['Name', 'Set by', 'Purpose', 'Type', 'Duration'],
        rows: [
          [
            'hm_analytics_consent',
            'HM Hydraulics (local storage)',
            'Records whether you accepted or rejected analytics, so we do not ask on every page.',
            'Strictly necessary',
            'Until you clear it',
          ],
          [
            '_ga',
            'Google Analytics',
            'Distinguishes one visitor from another by a randomly generated identifier.',
            'Analytics — consent required',
            '2 years',
          ],
          [
            '_ga_*',
            'Google Analytics',
            'Maintains session state for the analytics property.',
            'Analytics — consent required',
            '2 years',
          ],
        ],
      },
      {
        kind: 'p',
        text: 'Google Analytics is only activated after you press "Accept analytics". If you press "Reject analytics", the Google Analytics script is never downloaded and none of the cookies above are created.',
      },
      {
        kind: 'p',
        text: 'You can change or withdraw your choice at any time using the "Cookie settings" link in the footer of every page. This clears your stored choice and shows the banner again. You can also block or delete cookies in your browser settings; blocking the strictly necessary entry will not prevent you from reading the site, but your choice will not be remembered between visits.',
      },
    ],
  },
  {
    id: 'legal-basis',
    heading: '5. Why we are allowed to process it',
    blocks: [
      {
        kind: 'p',
        text: 'Where the GDPR applies, we rely on the following legal bases:',
      },
      {
        kind: 'ul',
        items: [
          'Consent (Article 6(1)(a)) — for analytics cookies and the associated usage data. You may withdraw consent at any time; withdrawal does not affect processing carried out before it.',
          'Steps prior to entering a contract and performance of a contract (Article 6(1)(b)) — for handling your quote request, preparing an offer and fulfilling an order.',
          'Legitimate interests (Article 6(1)(f)) — for replying to business enquiries, keeping records of commercial correspondence, preventing abuse of our forms, and maintaining the security and availability of the site. We balance these interests against your rights and only process what is necessary for them.',
          'Legal obligation (Article 6(1)(c)) — where we must retain commercial or tax records under applicable law.',
        ],
      },
    ],
  },
  {
    id: 'how-we-use',
    heading: '6. How we use your information',
    blocks: [
      {
        kind: 'ul',
        items: [
          'To answer your enquiry and prepare a quotation, including technical clarification and follow-up questions.',
          'To fulfil orders, arrange testing documentation and coordinate shipment.',
          'To understand which technical pages are actually useful to buyers, so we can improve them. This uses aggregated analytics data only.',
          'To keep records of commercial correspondence and to protect against fraudulent or automated misuse of our forms.',
        ],
      },
      {
        kind: 'p',
        text: 'We do not sell your personal data, we do not rent or trade contact lists, and we do not add you to a marketing list you did not ask for.',
      },
    ],
  },
  {
    id: 'sharing',
    heading: '7. Who we share it with',
    blocks: [
      {
        kind: 'p',
        text: 'We share personal data only with service providers that are necessary to run this site and respond to you. Each acts on our instructions as a processor or independent controller for its own statutory obligations:',
      },
      {
        kind: 'ul',
        items: [
          'Web3Forms (api.web3forms.com) — processes the submission of our contact and quote forms and forwards the content to our business email inbox. Web3Forms also performs an automated spam check on submissions.',
          'Google LLC (Google Analytics 4) — provides website usage analytics, only after you have accepted analytics cookies.',
          'Our email and hosting providers — transmit and store the messages you send us and serve the pages of this site.',
        ],
      },
      {
        kind: 'p',
        text: 'We may also disclose data where we are legally required to do so, or where it is necessary to establish, exercise or defend a legal claim.',
      },
    ],
  },
  {
    id: 'transfers',
    heading: '8. International transfers',
    blocks: [
      {
        kind: 'p',
        text: 'We are based in China and some of our service providers process data in the United States. This means your data may be transferred outside your country of residence. Where the GDPR applies, such transfers are covered by appropriate safeguards, including the European Commission\'s Standard Contractual Clauses and, where applicable, the EU–US Data Privacy Framework for certified providers. You may request a copy of the relevant safeguards by writing to hm@hmhydraulics.com.',
      },
    ],
  },
  {
    id: 'retention',
    heading: '9. How long we keep it',
    blocks: [
      {
        kind: 'ul',
        items: [
          'Quote requests and enquiries that do not lead to an order: up to 36 months from our last exchange, so that we can pick up the conversation if the project restarts.',
          'Order, testing and shipping records: for the period required by applicable accounting, tax and product-liability law.',
          'Analytics data: 14 months, after which Google Analytics deletes or aggregates it.',
          'Your cookie choice: until you clear it or press "Cookie settings" again.',
        ],
      },
      {
        kind: 'p',
        text: 'When a retention period ends, we delete the data or irreversibly anonymise it.',
      },
    ],
  },
  {
    id: 'rights',
    heading: '10. Your rights',
    blocks: [
      {
        kind: 'p',
        text: 'Subject to applicable law, you have the right to:',
      },
      {
        kind: 'ul',
        items: [
          'Access the personal data we hold about you and receive a copy.',
          'Have inaccurate or incomplete data corrected.',
          'Have your data erased where there is no longer a lawful reason for us to keep it.',
          'Restrict or object to our processing, including objecting to processing based on legitimate interests.',
          'Receive your data in a structured, machine-readable format, or have it transmitted to another controller.',
          'Withdraw consent for analytics at any time, without affecting the lawfulness of processing before withdrawal.',
          'Lodge a complaint with a supervisory authority in your country of residence, place of work or where the alleged infringement occurred.',
        ],
      },
      {
        kind: 'p',
        text: 'To exercise any of these rights, email hm@hmhydraulics.com with enough detail for us to identify the data concerned. We respond within one month and do not charge a fee for a first request. We may ask for information to confirm your identity before acting, so that we do not disclose data to the wrong person.',
      },
      {
        kind: 'p',
        text: 'California residents. We do not sell or share personal information as those terms are defined by the CCPA/CPRA, and we do not use it for cross-context behavioural advertising. You may still contact us to request access to or deletion of the information you have provided.',
      },
    ],
  },
  {
    id: 'security',
    heading: '11. How we protect it',
    blocks: [
      {
        kind: 'p',
        text: 'This site is served over HTTPS. Access to enquiry inboxes and order records is limited to staff who need it to answer you. Form submissions are transmitted directly to our form processor over an encrypted connection. No method of transmission or storage is completely secure, but we keep the amount of personal data we hold to what is needed to respond to you.',
      },
    ],
  },
  {
    id: 'children',
    heading: '12. Children',
    blocks: [
      {
        kind: 'p',
        text: 'This site is intended for business and industrial audiences. It is not directed at children, and we do not knowingly collect personal data from anyone under 16. If you believe a child has provided us with personal data, contact us and we will delete it.',
      },
    ],
  },
  {
    id: 'changes',
    heading: '13. Changes to this policy',
    blocks: [
      {
        kind: 'p',
        text: 'If we change how we handle personal data — for example by adding a new analytics or form service — we update this page and change the date shown at the top. Where a change materially affects the basis on which we hold your data, we will make that clear on the site.',
      },
    ],
  },
  {
    id: 'contact',
    heading: '14. Contact',
    blocks: [
      {
        kind: 'p',
        text: 'Questions about this policy, or a request relating to your personal data: hm@hmhydraulics.com. We will route privacy requests to the person responsible for data protection within the company.',
      },
    ],
  },
];

function BlockRenderer({ block }: { block: Block }) {
  if (block.kind === 'p') {
    return <p className="text-[#4A4E54] leading-relaxed mb-4">{block.text}</p>;
  }

  if (block.kind === 'ul') {
    return (
      <ul className="mb-5 space-y-2.5">
        {block.items.map((item, i) => (
          <li key={i} className="flex gap-3 text-[#4A4E54] leading-relaxed">
            <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-[#2C4A73]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="mb-6 -mx-6 px-6 md:mx-0 md:px-0 overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-[rgba(44,74,115,0.20)]">
            {block.head.map((h) => (
              <th key={h} className="text-left font-medium text-[#1B1E20] py-2.5 pr-4 align-bottom">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, ri) => (
            <tr key={ri} className="border-b border-[rgba(44,74,115,0.08)] align-top">
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`py-3 pr-4 text-[#4A4E54] leading-relaxed ${ci === 0 ? 'font-mono text-[13px] text-[#1B1E20] whitespace-nowrap' : ''}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <>
      {/* Header */}
      <section className="border-b border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 pt-16 md:pt-24 pb-10 md:pb-12">
          <p className="eyebrow text-[#2C4A73] mb-4">PRIVACY &amp; COOKIES</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-[#1B1E20] mb-4 max-w-3xl">
            Privacy Policy &amp; Cookie Notice
          </h1>
          <p className="text-lg text-[#4A4E54] leading-relaxed max-w-2xl mb-4">
            What we collect when you use this site, which cookies it sets, and how to change your mind at any time.
          </p>
          <p className="text-sm text-[#6B7280]">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Body */}
      <section className="bg-[#FAFAF7]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-18">
          <div className="max-w-[820px]">
            {sections.map((section) => (
              <div key={section.id} id={section.id} className="mb-10 scroll-mt-24">
                <h2 className="font-heading text-xl md:text-2xl font-medium text-[#1B1E20] mb-4">
                  {section.heading}
                </h2>
                {section.blocks.map((block, i) => (
                  <BlockRenderer key={i} block={block} />
                ))}
              </div>
            ))}

            {/* Inline consent control */}
            <div className="mt-12 p-6 border border-[rgba(44,74,115,0.14)] rounded-md bg-white">
              <h2 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">
                Change your cookie choice
              </h2>
              <p className="text-[#4A4E54] leading-relaxed mb-4">
                Pressing the link below clears your stored choice and brings back the consent banner, where you can accept or reject analytics again.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <CookieSettingsButton className="inline-flex items-center px-4 py-2 border border-[#2C4A73] text-[#2C4A73] text-sm font-medium rounded hover:bg-[#2C4A73] hover:text-white transition-colors duration-150" />
                <span className="text-sm text-[#4A4E54]">
                  or write to{' '}
                  <a href="mailto:hm@hmhydraulics.com" className="text-[#2C4A73] underline decoration-[rgba(44,74,115,0.35)] underline-offset-2 hover:decoration-[#2C4A73]">
                    hm@hmhydraulics.com
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <div className="max-w-xl">
            <h2 className="font-heading text-2xl font-medium text-[#1B1E20] mb-3">
              Questions about your data?
            </h2>
            <p className="text-[#4A4E54] leading-relaxed mb-6">
              Tell us what you need — access, correction or deletion — and we will respond within one month.
            </p>
            <a
              href="mailto:hm@hmhydraulics.com?subject=Privacy%20request"
              className="inline-flex items-center px-5 py-2.5 bg-[#2C4A73] text-white text-sm font-medium rounded no-underline hover:bg-[#1E3A5F] transition-colors duration-150"
            >
              Contact us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
