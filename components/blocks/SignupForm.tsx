'use client';
import { useState, FormEvent } from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

export interface SignupFormProps {
  title?:           string | null;
  intro?:           any;
  showNameField?:   boolean | null;
  nameFieldLabel?:  string | null;
  emailFieldLabel?: string | null;
  submitLabel?:     string | null;
  submitColor?:     string | null;
  submitStyle?:     string | null;
  successAction?:   string | null;
  successMessage?:  string | null;
  redirectUrl?:     string | null;
  titleField?:      string;
  introField?:      string;
}

export default function SignupForm({
  title,
  intro,
  showNameField   = false,
  nameFieldLabel  = 'Your name',
  emailFieldLabel = 'Your email',
  submitLabel     = 'Subscribe',
  submitColor     = '#111827',
  submitStyle     = 'filled',
  successAction   = 'message',
  successMessage  = "Thanks! You're now subscribed.",
  redirectUrl,
  titleField,
  introField,
}: SignupFormProps) {
  const [name,      setName]      = useState('');
  const [email,     setEmail]     = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email) { setError('Email is required.'); return; }

    setLoading(true);
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: showNameField ? name : undefined, email }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      if ((successAction === 'redirect' || successAction === 'both') && redirectUrl) {
        setTimeout(() => { window.location.href = redirectUrl!; }, successAction === 'both' ? 2000 : 0);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const btnStyle: React.CSSProperties =
    submitStyle === 'outlined'
      ? { background: 'transparent', color: submitColor ?? '#111827', border: `2px solid ${submitColor ?? '#111827'}` }
      : { background: submitColor ?? '#111827', color: '#fff', border: 'none' };

  const showSuccess = submitted && (successAction === 'message' || successAction === 'both');

  return (
    <section className="py-16 px-4">
      <div className="max-w-lg mx-auto">
        {title && (
          <h2 className="text-3xl font-bold text-center mb-3" data-tina-field={titleField}>{title}</h2>
        )}
        {intro && (
          <div className="prose text-gray-600 text-center mx-auto mb-8" data-tina-field={introField}>
            {typeof intro === 'string' ? <p>{intro}</p> : <TinaMarkdown content={intro} />}
          </div>
        )}

        {showSuccess ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg font-medium text-gray-800">{successMessage}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {showNameField && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {nameFieldLabel}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={nameFieldLabel ?? 'Your name'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {emailFieldLabel}
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={emailFieldLabel ?? 'Your email'}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-60 cursor-pointer"
              style={btnStyle}
            >
              {loading ? 'Submitting…' : submitLabel}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
