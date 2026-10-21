'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';

const ACCESS_KEY = 'e9d0abd1-8bbf-4c81-b984-c76bc78b9b6b';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    company: '',
    email: '',
    product: '',
    message: '',
    botcheck: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formState.botcheck) return;

    setStatus('sending');
    setErrorMessage('');

    const subject = formState.name
      ? `Website inquiry from ${formState.name}`
      : 'Website inquiry';

    const messageBody = [
      `Name: ${formState.name || '-'}`,
      `Company: ${formState.company || '-'}`,
      `Email: ${formState.email || '-'}`,
      `Product of interest: ${formState.product || '-'}`,
      '',
      `Message:`,
      formState.message || '-',
      '',
      `Source page: ${window.location.href}`,
    ].join('\n');

    const payload = {
      access_key: ACCESS_KEY,
      subject,
      name: formState.name,
      email: formState.email,
      from_name: formState.name,
      replyto: formState.email,
      message: messageBody,
      company: formState.company || undefined,
      product_of_interest: formState.product || undefined,
      source_page: window.location.href,
      botcheck: formState.botcheck,
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setFormState({ name: '', company: '', email: '', product: '', message: '', botcheck: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow text-[#2C4A73] mb-4">CONTACT</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-[#1B1E20] mb-4">
            Tell us what you need
          </h1>
          <p className="text-lg text-[#4A4E54] leading-relaxed max-w-2xl">
            Share an existing part, drawing, or application requirement.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section>
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              {status === 'success' ? (
                <div className="p-8 border border-[rgba(44,74,115,0.10)] rounded-md bg-white text-center">
                  <div className="w-12 h-12 rounded-full bg-[rgba(44,74,115,0.08)] flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-6 h-6 text-[#2C4A73]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="m9 12 2 2 4-4" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </div>
                  <h2 className="font-heading text-xl font-medium text-[#1B1E20] mb-2">
                    Thank you, your message has been sent.
                  </h2>
                  <p className="text-sm text-[#4A4E54] leading-relaxed">
                    We will get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input
                    type="text"
                    name="botcheck"
                    value={formState.botcheck}
                    onChange={(e) => setFormState({ ...formState, botcheck: e.target.value })}
                    className="hidden"
                    aria-hidden="true"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-[#1B1E20] mb-1.5"
                      >
                        Name <span className="text-[#6B7280] font-normal">(optional)</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 border border-[rgba(44,74,115,0.15)] rounded text-sm text-[#1B1E20] bg-white placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2C4A73]/20 focus:border-[#2C4A73] transition-colors"
                        placeholder="Your name (optional)"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-[#1B1E20] mb-1.5"
                      >
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formState.company}
                        onChange={(e) =>
                          setFormState({ ...formState, company: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 border border-[rgba(44,74,115,0.15)] rounded text-sm text-[#1B1E20] bg-white placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2C4A73]/20 focus:border-[#2C4A73] transition-colors"
                        placeholder="Company name"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[#1B1E20] mb-1.5"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 border border-[rgba(44,74,115,0.15)] rounded text-sm text-[#1B1E20] bg-white placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2C4A73]/20 focus:border-[#2C4A73] transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="product"
                      className="block text-sm font-medium text-[#1B1E20] mb-1.5"
                    >
                      Product of interest
                    </label>
                    <select
                      id="product"
                      name="product"
                      value={formState.product}
                      onChange={(e) =>
                        setFormState({ ...formState, product: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 border border-[rgba(44,74,115,0.15)] rounded text-sm text-[#1B1E20] bg-white focus:outline-none focus:ring-2 focus:ring-[#2C4A73]/20 focus:border-[#2C4A73] transition-colors"
                    >
                      <option value="">Select inquiry type</option>
                      <option value="alternative-supplier">Alternative Supplier Evaluation</option>
                      <option value="part-replacement">Existing Part Replacement</option>
                      <option value="cost-reduction">Cost Reduction</option>
                      <option value="new-sourcing">New Component Sourcing</option>
                      <option value="supply-continuity">Supply Continuity</option>
                      <option value="technical-validation">Technical Validation</option>
                      <option value="small-batch">Small-Batch Sourcing</option>
                      <option value="custom-component">Custom Component</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[#1B1E20] mb-1.5"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 border border-[rgba(44,74,115,0.15)] rounded text-sm text-[#1B1E20] bg-white placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2C4A73]/20 focus:border-[#2C4A73] transition-colors resize-y"
                      placeholder="Describe your requirements, specifications needed, or any questions..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex items-center px-6 py-3 bg-[#2C4A73] text-white text-sm font-medium rounded hover:bg-[#1E3A5F] transition-colors duration-150 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
                  </button>

                  {status === 'error' && (
                    <p className="text-sm text-[#A31919]" role="alert">
                      {errorMessage || 'Something went wrong. Please try again.'}
                    </p>
                  )}
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {/* Email */}
                <div>
                  <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-2">
                    Email
                  </p>
                  <a
                    href="mailto:hm@hmhydraulics.com"
                    className="text-base text-[#2C4A73] font-medium no-underline hover:underline"
                  >
                    hm@hmhydraulics.com
                  </a>
                </div>

                {/* What to Include */}
                <div>
                  <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-3">
                    Useful information to include
                  </p>
                  <ul className="space-y-2">
                    {[
                      'Target torque, pressure, or flow rate',
                      'Existing part number or brand to compare',
                      'Quantity and expected annual demand',
                      'Operating environment (temperature, IP rating)',
                      'Mounting dimensions or space constraints',
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-[#4A4E54]"
                      >
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#2C4A73] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs text-[#62666C] italic">
                    Don&apos;t have all the details? Send what you have &mdash; we&apos;ll help fill in the gaps.
                  </p>
                </div>

                {/* Company */}
                <div className="pt-6 border-t border-[rgba(44,74,115,0.10)]">
                  <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-2">
                    Company
                  </p>
                  <p className="text-sm text-[#4A4E54]">
                    HM Hydraulics
                    <br />
                    Qingdao Hydraulic Machinery Co., Ltd.
                  </p>
                </div>

                {/* Location */}
                <div className="pt-6 border-t border-[rgba(44,74,115,0.10)]">
                  <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-2">
                    Location
                  </p>
                  <p className="text-sm text-[#4A4E54]">
                    Qingdao, China
                    <br />
                    Serving mining, construction and industrial OEMs worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
