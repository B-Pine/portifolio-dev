import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { profile } from '../data/profile.js';

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function ContactView() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ state: 'idle', msg: '' });
  const configured = SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY;

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!configured) {
      setStatus({
        state: 'error',
        msg: 'EmailJS not configured. Add credentials to .env (see .env.example).'
      });
      return;
    }
    setStatus({ state: 'sending', msg: 'sending...' });
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message },
        { publicKey: PUBLIC_KEY }
      );
      setStatus({ state: 'success', msg: 'message sent — i\'ll get back to you soon.' });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ state: 'error', msg: err?.text || 'failed to send. try again.' });
    }
  }

  return (
    <div className="h-full overflow-auto p-8 font-mono text-sm leading-relaxed">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <span className="syntax-keyword text-2xl font-bold font-headline">&lt;Contact /&gt;</span>
          <div className="h-1 w-16 bg-primary mt-2 rounded-full" />
        </div>

        <div className="syntax-comment mb-6">// reach out — i read everything.</div>

        <div className="space-y-2 mb-8">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-3 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-primary">mail</span>
            <span>{profile.email}</span>
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-primary">code</span>
            <span>{profile.github}</span>
          </a>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 bg-surface-container p-6 rounded-xl">
          <div>
            <label className="block text-xs uppercase tracking-wider text-on-surface-variant mb-1">
              name
            </label>
            <input
              required
              value={form.name}
              onChange={update('name')}
              className="w-full bg-surface-container-highest rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-on-surface-variant mb-1">
              email
            </label>
            <input
              required
              type="email"
              value={form.email}
              onChange={update('email')}
              className="w-full bg-surface-container-highest rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-on-surface-variant mb-1">
              message
            </label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={update('message')}
              className="w-full bg-surface-container-highest rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary resize-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={status.state === 'sending'}
              className="bg-primary text-on-primary px-5 py-2 rounded-md text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {status.state === 'sending' ? 'sending...' : 'send message'}
            </button>
            {status.msg && (
              <span className={
                'text-xs ' +
                (status.state === 'success' ? 'text-tertiary' :
                 status.state === 'error'   ? 'text-error' : 'text-on-surface-variant')
              }>
                {status.msg}
              </span>
            )}
          </div>

          {!configured && (
            <div className="syntax-comment text-[11px] pt-2">
              // EmailJS not yet configured — copy <span className="syntax-function">.env.example</span>{' '}
              to <span className="syntax-function">.env</span> and add your IDs.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
