'use client';

import { useState, type FormEvent } from 'react';

type RfqFormProps = {
  /** Model code or series name used to prefill the inquiry subject. */
  context: string;
};

type FieldKey = 'name' | 'email' | 'machine' | 'qty' | 'helacCode' | 'oemPn' | 'msg';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function RfqForm({ context }: RfqFormProps) {
  const [invalid, setInvalid] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [status, setStatus] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('');

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('f-name') ?? '').trim();
    const email = String(data.get('f-email') ?? '').trim();
    const machine = String(data.get('f-machine') ?? '').trim();
    const qty = String(data.get('f-qty') ?? '').trim();
    const helacCode = String(data.get('f-helac-code') ?? '').trim();
    const oemPn = String(data.get('f-oem-pn') ?? '').trim();
    const msg = String(data.get('f-msg') ?? '').trim();

    const nextInvalid: Partial<Record<FieldKey, boolean>> = {
      email: !EMAIL_RE.test(email),
      msg: msg.length === 0,
    };
    setInvalid(nextInvalid);

    if (nextInvalid.email || nextInvalid.msg) {
      setStatus('Please correct the highlighted fields and try again.');
      return;
    }

    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Original model / part number: ${context}`,
      machine ? `Machine / equipment model: ${machine}` : 'Machine / equipment model: -',
      qty ? `Quantity: ${qty}` : 'Quantity: -',
      `Helac model code: ${helacCode || '-'}`,
      `OEM part number: ${oemPn || '-'}`,
      '',
      `Message: ${msg}`,
    ];

    const subject = `Replacement inquiry — ${context}`;
    window.location.href = `mailto:hm@hmhydraulics.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(lines.join('\n'))}`;

    setStatus('Your email application should now be open. If nothing happened, write to hm@hmhydraulics.com directly.');
  };

  const fieldClass = (key: FieldKey) =>
    `w-full px-3 py-2.5 text-sm bg-white border rounded transition-colors duration-150 outline-none focus:border-[#2C4A73] ${
      invalid[key]
        ? 'border-[#A31919] focus:border-[#A31919]'
        : 'border-[rgba(44,74,115,0.20)]'
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="f-name" className="block font-label text-xs uppercase tracking-wider text-[#62666C] mb-1.5">
            Name
          </label>
          <input id="f-name" name="f-name" type="text" autoComplete="name" className={fieldClass('name')} />
        </div>
        <div>
          <label htmlFor="f-email" className="block font-label text-xs uppercase tracking-wider text-[#62666C] mb-1.5">
            Email <span className="text-[#A31919]">*</span>
          </label>
          <input id="f-email" name="f-email" type="email" autoComplete="email" className={fieldClass('email')} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="f-machine" className="block font-label text-xs uppercase tracking-wider text-[#62666C] mb-1.5">
            Machine / equipment model
          </label>
          <input id="f-machine" name="f-machine" type="text" placeholder="e.g. Atlas Boomer 353" className={fieldClass('machine')} />
        </div>
        <div>
          <label htmlFor="f-qty" className="block font-label text-xs uppercase tracking-wider text-[#62666C] mb-1.5">
            Quantity
          </label>
          <input id="f-qty" name="f-qty" type="text" inputMode="numeric" placeholder="e.g. 2" className={fieldClass('qty')} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="f-helac-code" className="block font-label text-xs uppercase tracking-wider text-[#62666C] mb-1.5">
            Helac model code
          </label>
          <input
            id="f-helac-code"
            name="f-helac-code"
            type="text"
            placeholder="e.g. L10-5-5-M-RF-360-S1-O-H"
            className={fieldClass('helacCode')}
          />
        </div>
        <div>
          <label htmlFor="f-oem-pn" className="block font-label text-xs uppercase tracking-wider text-[#62666C] mb-1.5">
            OEM part number
          </label>
          <input id="f-oem-pn" name="f-oem-pn" type="text" placeholder="e.g. 3128312645" className={fieldClass('oemPn')} />
        </div>
      </div>

      <div>
        <label htmlFor="f-msg" className="block font-label text-xs uppercase tracking-wider text-[#62666C] mb-1.5">
          Your requirement <span className="text-[#A31919]">*</span>
        </label>
        <textarea
          id="f-msg"
          name="f-msg"
          rows={4}
          placeholder="Model on the unit, part number on the tag, and what you need. Please also attach photos of the model tag, mounting face, shaft, and machine nameplate to your email."
          className={fieldClass('msg')}
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center px-5 py-2.5 bg-[#2C4A73] text-white text-sm font-medium rounded no-underline hover:bg-[#1E3A5F] transition-colors duration-150"
      >
        Check compatibility &amp; availability
      </button>

      {status && (
        <p className="text-sm text-[#4A4E54] leading-relaxed" role="status">
          {status}
        </p>
      )}
    </form>
  );
}
