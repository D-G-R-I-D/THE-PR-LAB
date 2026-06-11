'use client';

import { FormEvent, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage({ type: 'error', text: data.error || 'Subscription failed.' });
        setLoading(false);
        return;
      }

      setMessage({ type: 'success', text: data.message });
      setEmail('');
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          className="flex-1 border border-pr-nude/42 bg-pr-cream/5 px-4 py-3 font-body text-sm text-pr-cream placeholder-pr-nude/42 outline-none transition-colors duration-300 hover:border-pr-nude/60 focus:border-pr-cream disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading}
          className="group inline-flex min-h-12 items-center justify-between gap-3 border border-pr-nude/42 bg-pr-cream/10 px-6 py-3 font-body text-[0.68rem] uppercase tracking-[0.22em] text-pr-cream transition-all duration-300 hover:border-pr-cream hover:bg-pr-cream hover:text-pr-black disabled:opacity-50 sm:px-5"
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
          <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </button>
      </div>
      {message && (
        <p className={`mt-3 font-body text-[0.65rem] uppercase tracking-[0.2em] ${
          message.type === 'success' ? 'text-pr-cream/70' : 'text-red-400'
        }`}>
          {message.text}
        </p>
      )}
    </form>
  );
}
