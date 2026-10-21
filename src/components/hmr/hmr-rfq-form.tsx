'use client';

import { useEffect, useState, type FormEvent } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ACCESS_KEY = 'e9d0abd1-8bbf-4c81-b984-c76bc78b9b6b';

const URGENCY_OPTIONS = ['Urgent', 'Within 1 month', 'Flexible', 'Just researching'];

type FieldKey = 'email' | 'msg';

export function HmrRfqForm() {
  const [invalid, setInvalid] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const [sentOk, setSentOk] = useState(false);
  const [reference, setReference] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    function onQuote(e: Event) {
      const detail = (e as CustomEvent).detail;
      const code = typeof detail === 'string' ? detail : detail?.code ?? '';
      const model = typeof detail === 'object' && detail?.model ? detail.model : '';
      setReference(String(code));
      setMessage(
        (prev) =>
          prev ||
          `Please quote: ${code}${model ? ` (model ${model})` : ''}\nQuantity:\nApplication / machine:\n(If replacing an existing unit, attach the model code or drawing in your reply email.)`
      );
    }
    function onNoMatch(e: Event) {
      const q = (e as CustomEvent).detail?.query ?? (e as CustomEvent).detail ?? '';
      setReference(String(q));
      setMessage(
        (prev) =>
          prev ||
          `I could not find a verified match for "${q}" in the online selector. Please review and confirm whether an HM part number can be recommended after interface verification.`
      );
    }
    window.addEventListener('hmr:quote', onQuote);
    window.addEventListener('hmr:noMatch', onNoMatch);
    return () => {
      window.removeEventListener('hmr:quote', onQuote);
      window.removeEventListener('hmr:noMatch', onNoMatch);
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('');

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('f-name') ?? '').trim();
    const email = String(data.get('f-email') ?? '').trim();
    const company = String(data.get('f-company') ?? '').trim();
    const country = String(data.get('f-country') ?? '').trim();
    const quantity = String(data.get('f-qty') ?? '').trim();
    const urgency = String(data.get('f-urgency') ?? '').trim();
    const refModel = String(data.get('f-reference') ?? '').trim();
    const msg = String(data.get('f-msg') ?? '').trim();
    const botcheck = String(data.get('botcheck') ?? '').trim();

    const nextInvalid: Partial<Record<FieldKey, boolean>> = {
      email: !EMAIL_RE.test(email),
      msg: msg.length === 0,
    };
    setInvalid(nextInvalid);

    if (nextInvalid.email || nextInvalid.msg) {
      setStatus('Please add your work email and a short inquiry.');
      return;
    }

    setSending(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: refModel
            ? `HMR series enquiry — ${refModel}`
            : 'HMR series enquiry',
          from_name: 'HM Hydraulics Website',
          name: name || '-',
          email,
          replyto: email,
          company: company || '-',
          country: country || '-',
          quantity: quantity || '-',
          urgency: urgency || '-',
          reference_model: refModel || '-',
          message: msg,
          source_page: typeof window !== 'undefined' ? window.location.href : '',
          botcheck,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setSentOk(true);
        form.reset();
        setReference('');
        setMessage('');
        setStatus('Thank you — your enquiry has been sent. We will get back to you shortly.');
      } else {
        setStatus(result.message || 'Sorry, the message could not be sent. Please try again.');
      }
    } catch {
      setStatus('Network error — please check your connection and try again.');
    } finally {
      setSending(false);
    }
  };

  if (sentOk) {
    return (
      <div className="bg-white border border-[#dde5ee] rounded-xl shadow-[0_1px_2px_rgba(15,36,55,0.06),0_8px_24px_rgba(15,36,55,0.06)] p-6 text-center max-w-[760px]">
        <div className="w-10 h-10 rounded-full bg-[#e8f6ef] flex items-center justify-center mx-auto mb-3">
          <svg className="w-5 h-5 text-[#0f7a46]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 12 2 2 4-4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-[#0f2437] mb-1">
          Thank you — your enquiry has been sent.
        </h3>
        <p className="text-sm text-[#3d4d5e] leading-relaxed">
          We will confirm configuration and availability as soon as possible. Reply to our confirmation email with drawings or photos if you have them.
        </p>
      </div>
    );
  }

  const inputClass = (key?: FieldKey) =>
    `w-full px-3 py-2.5 border rounded-lg text-[#0f2437] bg-white focus:outline-none focus:border-[#1b4a78] focus:ring-1 focus:ring-[#1b4a78] ${
      key && invalid[key] ? 'border-[#c0392b]' : 'border-[#dde5ee]'
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-white border border-[#dde5ee] rounded-xl shadow-[0_1px_2px_rgba(15,36,55,0.06),0_8px_24px_rgba(15,36,55,0.06)] p-5 md:p-6 max-w-[760px]">
      <input
        type="text"
        name="botcheck"
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="hmr-f-email" className="block text-sm font-bold text-[#0f2437] mb-1.5">
            Work email <span className="text-[#e08600]">*</span>
          </label>
          <input
            id="hmr-f-email"
            name="f-email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            className={inputClass('email')}
          />
        </div>
        <div>
          <label htmlFor="hmr-f-name" className="block text-sm font-bold text-[#0f2437] mb-1.5">
            Name
          </label>
          <input
            id="hmr-f-name"
            name="f-name"
            type="text"
            autoComplete="name"
            className={inputClass()}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="hmr-f-company" className="block text-sm font-bold text-[#0f2437] mb-1.5">
            Company
          </label>
          <input
            id="hmr-f-company"
            name="f-company"
            type="text"
            autoComplete="organization"
            className={inputClass()}
          />
        </div>
        <div>
          <label htmlFor="hmr-f-country" className="block text-sm font-bold text-[#0f2437] mb-1.5">
            Country
          </label>
          <input
            id="hmr-f-country"
            name="f-country"
            type="text"
            autoComplete="country-name"
            className={inputClass()}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="hmr-f-reference" className="block text-sm font-bold text-[#0f2437] mb-1.5">
            Reference model / order code
          </label>
          <input
            id="hmr-f-reference"
            name="f-reference"
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="e.g. HMR4-500-180-FT-2F-CS"
            className={inputClass()}
          />
        </div>
        <div>
          <label htmlFor="hmr-f-qty" className="block text-sm font-bold text-[#0f2437] mb-1.5">
            Quantity
          </label>
          <input
            id="hmr-f-qty"
            name="f-qty"
            type="number"
            min={1}
            inputMode="numeric"
            placeholder="e.g. 2"
            className={inputClass()}
          />
        </div>
      </div>

      <div className="mb-4">
        <p className="block text-sm font-bold text-[#0f2437] mb-2">Urgency</p>
        <div className="flex flex-wrap gap-4">
          {URGENCY_OPTIONS.map((opt) => (
            <label key={opt} className="inline-flex items-center gap-2 text-sm text-[#3d4d5e]">
              <input
                type="radio"
                name="f-urgency"
                value={opt}
                className="accent-[#e08600]"
              />
              {opt}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <label htmlFor="hmr-f-msg" className="block text-sm font-bold text-[#0f2437] mb-1.5">
          Inquiry <span className="text-[#e08600]">*</span>
        </label>
        <textarea
          id="hmr-f-msg"
          name="f-msg"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Application, machine model, required torque, rotation angle, and any original part numbers."
          className={inputClass('msg')}
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="inline-flex items-center rounded-lg px-6 py-3 font-bold text-sm text-white bg-[#e08600] hover:bg-[#c97600] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {sending ? 'Sending...' : 'Send enquiry'}
      </button>

      {status && (
        <p
          className={`mt-4 text-sm leading-relaxed ${sentOk ? 'text-[#0f7a46]' : 'text-[#3d4d5e]'}`}
          role="status"
        >
          {status}
        </p>
      )}
    </form>
  );
}
