'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Mailbox } from 'lucide-react';
import { SOCIALS } from '@/lib/constants'

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

function ContactFormContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });

      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) { 
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'An error occurred. Please try again.'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block font-body text-[0.65rem] uppercase tracking-[0.32em] text-pr-grey/55 mb-3">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your name"
          className="w-full px-4 py-3 font-body text-sm bg-white border border-pr-cream/60 text-pr-dark placeholder-pr-grey/35 focus:outline-none focus:border-pr-dark/40 focus:ring-1 focus:ring-pr-dark/20 transition-all"
        />
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block font-body text-[0.65rem] uppercase tracking-[0.32em] text-pr-grey/55 mb-3">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="your.email@example.com"
          className="w-full px-4 py-3 font-body text-sm bg-white border border-pr-cream/60 text-pr-dark placeholder-pr-grey/35 focus:outline-none focus:border-pr-dark/40 focus:ring-1 focus:ring-pr-dark/20 transition-all"
        />
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className="block font-body text-[0.65rem] uppercase tracking-[0.32em] text-pr-grey/55 mb-3">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+234 801 234 5678"
          className="w-full px-4 py-3 font-body text-sm bg-white border border-pr-cream/60 text-pr-dark placeholder-pr-grey/35 focus:outline-none focus:border-pr-dark/40 focus:ring-1 focus:ring-pr-dark/20 transition-all"
        />
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block font-body text-[0.65rem] uppercase tracking-[0.32em] text-pr-grey/55 mb-3">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Tell us about your inquiry, skin concerns, or service interest..."
          rows={6}
          className="w-full px-4 py-3 font-body text-sm bg-white border border-pr-cream/60 text-pr-dark placeholder-pr-grey/35 focus:outline-none focus:border-pr-dark/40 focus:ring-1 focus:ring-pr-dark/20 transition-all resize-none"
        />
      </div>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="flex items-start gap-3 p-4 bg-pr-cream/40 border border-pr-cream">
          <CheckCircle size={20} className="text-pr-dark flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-body font-semibold text-pr-dark text-sm">Message sent successfully!</p>
            <p className="font-body text-xs text-pr-grey mt-1">We`&apos;`ll review your inquiry and get back to you within 24 hours.</p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-start gap-3 p-4 bg-red-50/80 border border-red-200/60">
          <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-body font-semibold text-red-900 text-sm">Unable to send message</p>
            <p className="font-body text-xs text-red-800 mt-1">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-pr-black text-white font-body font-semibold uppercase tracking-[0.2em] text-[0.7rem] transition-all duration-300 hover:bg-pr-dark disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send size={16} />
        {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
      </button>

      <p className="font-body text-[0.6rem] text-pr-grey/50 text-center">
        We respect your privacy. Your information will only be used to respond to your inquiry.
      </p>
    </form>
  );
}

const mailSubject = "P.R. LAB WEB"
const bcc = "chukwudid344@gmail.com"
const cc = ""
const mailBody = encodeURIComponent(
  `Hello,\n\n` +
  `I am interested in learning more about your services at P.R. LAB.\n\n` +
  `Could you please provide more information or help me schedule an appointment?\n\n` +
  `Thank you,\nLooking forward to hearing from you.`
);
const mailBox = `mailto:${SOCIALS.mailBox}?subject=${encodeURIComponent(mailSubject)}&body=${mailBody}&cc=${cc}&bcc=${bcc}`;

export default function ContactForm() {
  return (
    <section id="contact-inquiry" className="relative w-full bg-white py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 lg:gap-16 items-start max-w-5xl">
          {/* Left Content */}
          <div>
            <p className="font-body text-[0.65rem] uppercase tracking-[0.32em] text-pr-grey/55 mb-4">
              Get in Touch
            </p>
            <h2 className="font-futura text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-[0.02em] text-pr-black mb-6">
              INQUIRY & CONTACT
            </h2>
            <div className="space-y-6 font-body text-pr-grey">
              <p className="text-sm leading-7">
                Have questions about our protocols, treatments, or services? Fill out the form and our team will respond within 24 hours to assist you.
              </p>
              <div className="pt-4 border-t border-pr-cream">
                <p className="text-[0.7rem] uppercase tracking-[0.2em] text-pr-grey/50 mb-3">Direct Contact</p>
                <a href={mailBox} className="text-sm text-pr-dark hover:text-pr-black transition-colors">
                  {/* {SOCIALS.mailBox} */}
                  <p><Mailbox size={40} className="text-pr-dark flex-shrink-0 mt-0.5" />👆🏽</p>
                </a>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-pr-cream/25 border border-pr-cream p-6 md:p-8 lg:p-10">
            <ContactFormContent />
          </div>
        </div>
      </div>
    </section>
  );
}
