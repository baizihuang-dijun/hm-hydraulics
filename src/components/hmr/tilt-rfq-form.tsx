'use client';

import { useState, type FormEvent } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ACCESS_KEY = 'e9d0abd1-8bbf-4c81-b984-c76bc78b9b6b';

export function TiltRfqForm() {
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const [sentOk, setSentOk] = useState(false);
  const [invalid, setInvalid] = useState<Partial<Record<'email', boolean>>>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('');

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('f-name') ?? '').trim();
    const email = String(data.get('f-email') ?? '').trim();
    const company = String(data.get('f-company') ?? '').trim();
    const machine = String(data.get('f-machine') ?? '').trim();
    const existingModel = String(data.get('f-existing') ?? '').trim();
    const message = String(data.get('f-message') ?? '').trim();

    const nextInvalid: Partial<Record<'email', boolean>> = {};
    if (!EMAIL_RE.test(email)) nextInvalid.email = true;
    setInvalid(nextInvalid);
    if (Object.keys(nextInvalid).length) return;

    setSending(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: 'Tilt actuator / cross-reference engineering review',
          botcheck: data.get('botcheck'),
          source_page: typeof window !== 'undefined' ? window.location.href : '/products/tilt-actuators',
          name,
          email,
          company,
          machine,
          existing_model_or_part_code: existingModel,
          message,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) {
        setSentOk(true);
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'generate_lead', { form_source: 'tilt_rfq', source_page: window.location.pathname });
        }
        setStatus('Thank you. We have received your enquiry and will reply shortly.');
        form.reset();
      } else {
        setStatus(json.message || 'Submission failed. Please try again or email us directly.');
      }
    } catch {
      setStatus('Network error. Please try again or email us directly.');
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="hidden" name="botcheck" value="" />
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="f-name" className="block text-sm font-medium text-[#1B1E20] mb-1.5">
            Name
          </label>
          <input
            id="f-name"
            name="f-name"
            type="text"
            required
            className="w-full rounded-lg border border-[rgba(44,74,115,0.20)] px-4 py-2.5 text-[#1B1E20] placeholder:text-[#5A6775]/60 focus:border-[#D98A1D] focus:outline-none"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="f-email" className="block text-sm font-medium text-[#1B1E20] mb-1.5">
            Email
          </label>
          <input
            id="f-email"
            name="f-email"
            type="email"
            required
            className={`w-full rounded-lg border px-4 py-2.5 text-[#1B1E20] placeholder:text-[#5A6775]/60 focus:outline-none ${
              invalid.email
                ? 'border-red-500 focus:border-red-500'
                : 'border-[rgba(44,74,115,0.20)] focus:border-[#D98A1D]'
            }`}
            placeholder="you@company.com"
          />
          {invalid.email && <p className="text-xs text-red-600 mt-1">Please enter a valid email.</p>}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="f-company" className="block text-sm font-medium text-[#1B1E20] mb-1.5">
            Company
          </label>
          <input
            id="f-company"
            name="f-company"
            type="text"
            className="w-full rounded-lg border border-[rgba(44,74,115,0.20)] px-4 py-2.5 text-[#1B1E20] placeholder:text-[#5A6775]/60 focus:border-[#D98A1D] focus:outline-none"
            placeholder="Company name"
          />
        </div>
        <div>
          <label htmlFor="f-machine" className="block text-sm font-medium text-[#1B1E20] mb-1.5">
            Machine / tonnage / tilt angle
          </label>
          <input
            id="f-machine"
            name="f-machine"
            type="text"
            className="w-full rounded-lg border border-[rgba(44,74,115,0.20)] px-4 py-2.5 text-[#1B1E20] placeholder:text-[#5A6775]/60 focus:border-[#D98A1D] focus:outline-none"
            placeholder="e.g. 30 t excavator, +/- 90°"
          />
        </div>
      </div>
      <div>
        <label htmlFor="f-existing" className="block text-sm font-medium text-[#1B1E20] mb-1.5">
          Existing model / part code (optional)
        </label>
        <input
          id="f-existing"
          name="f-existing"
          type="text"
          className="w-full rounded-lg border border-[rgba(44,74,115,0.20)] px-4 py-2.5 text-[#1B1E20] placeholder:text-[#5A6775]/60 focus:border-[#D98A1D] focus:outline-none"
          placeholder="e.g. HKS BVC 100, Helac PT-100, or a unit tag"
        />
      </div>
      <div>
        <label htmlFor="f-message" className="block text-sm font-medium text-[#1B1E20] mb-1.5">
          Message
        </label>
        <textarea
          id="f-message"
          name="f-message"
          rows={5}
          required
          className="w-full rounded-lg border border-[rgba(44,74,115,0.20)] px-4 py-3 text-[#1B1E20] placeholder:text-[#5A6775]/60 focus:border-[#D98A1D] focus:outline-none"
          placeholder="Please describe the application, required torque or comparable model, and any interface constraints."
        />
      </div>
      <button
        type="submit"
        disabled={sending}
        className="inline-flex items-center justify-center rounded-lg bg-[#D98A1D] px-8 py-3 text-white font-medium hover:bg-[#c27a18] transition-colors disabled:opacity-60"
      >
        {sending ? 'Sending...' : 'Send enquiry'}
      </button>
      {status && (
        <p className={`text-sm ${sentOk ? 'text-green-700' : 'text-red-600'}`}>{status}</p>
      )}
    </form>
  );
}
