'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    company: '',
    email: '',
    product: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In production, this would send to a backend
    setSubmitted(true);
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
              {submitted ? (
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
                    Message received
                  </h2>
                  <p className="text-sm text-[#4A4E54] leading-relaxed">
                    Thank you for your inquiry. Our team will review your
                    requirements.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-[#1B1E20] mb-1.5"
                      >
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 border border-[rgba(44,74,115,0.15)] rounded text-sm text-[#1B1E20] bg-white placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2C4A73]/20 focus:border-[#2C4A73] transition-colors"
                        placeholder="Your name"
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
                      Inquiry Type
                    </label>
                    <select
                      id="product"
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
                    className="inline-flex items-center px-6 py-3 bg-[#2C4A73] text-white text-sm font-medium rounded hover:bg-[#1E3A5F] transition-colors duration-150 cursor-pointer"
                  >
                    Send Inquiry
                  </button>
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
