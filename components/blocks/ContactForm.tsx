'use client';
import { useState, FormEvent } from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

export interface SubjectOption { option?: string | null }

export interface ContactFormProps {
  title?:              string | null;
  intro?:              any;
  // Name
  showNameField?:      boolean | null;
  nameRequired?:       boolean | null;
  nameFieldLabel?:     string | null;
  // Email
  emailFieldLabel?:    string | null;
  // Subject
  showSubjectField?:   boolean | null;
  subjectRequired?:    boolean | null;
  subjectFieldLabel?:  string | null;
  subjectType?:        string | null;
  subjectOptions?:     Array<SubjectOption | null> | null;
  // Message
  messageFieldLabel?:  string | null;
  // Submit
  submitLabel?:        string | null;
  submitColor?:        string | null;
  submitStyle?:        string | null;
  // Success
  successAction?:      string | null;
  successMessage?:     string | null;
  redirectUrl?:        string | null;
  // Tina fields
  titleField?:         string;
  introField?:         string;
}

export default function ContactForm({
  title,
  intro,
  showNameField     = false,
  nameRequired      = false,
  nameFieldLabel    = 'Your name',
  emailFieldLabel   = 'Your email',
  showSubjectField  = false,
  subjectRequired   = false,
  subjectFieldLabel = 'Subject',
  subjectType       = 'text',
  subjectOptions,
  messageFieldLabel = 'Your message',
  submitLabel       = 'Send message',
  submitColor       = '#111827',
  submitStyle       = 'filled',
  successAction     = 'message',
  successMessage    = "Thanks! We'll be in touch soon.",
  redirectUrl,
  titleField,
  introField,
}: ContactFormProps) {
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState('');

  const set = (k: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFields(prev => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(showNameField    ? { name: fields.name }       : {}),
          email: fields.email,
          ...(showSubjectField ? { subject: fields.subject } : {}),
          message: fields.message,
        }),
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

  const inputClass = 'w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400';

  const dropdownOptions = subjectOptions?.filter((o): o is SubjectOption => !!o?.option) ?? [];
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

            {/* Name */}
            {showNameField && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {nameFieldLabel}{nameRequired && <span className="text-red-500 ml-0.5">*</span>}
                </label>
                <input
                  type="text"
                  value={fields.name}
                  onChange={set('name')}
                  placeholder={nameFieldLabel ?? 'Your name'}
                  required={!!nameRequired}
                  className={inputClass}
                />
              </div>
            )}

            {/* Email — always shown, always required */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {emailFieldLabel}<span className="text-red-500 ml-0.5">*</span>
              </label>
              <input
                type="email"
                value={fields.email}
                onChange={set('email')}
                placeholder={emailFieldLabel ?? 'Your email'}
                required
                className={inputClass}
              />
            </div>

            {/* Subject */}
            {showSubjectField && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {subjectFieldLabel}{subjectRequired && <span className="text-red-500 ml-0.5">*</span>}
                </label>
                {subjectType === 'dropdown' && dropdownOptions.length > 0 ? (
                  <select
                    value={fields.subject}
                    onChange={set('subject')}
                    required={!!subjectRequired}
                    className={inputClass}
                  >
                    <option value="">Select {subjectFieldLabel?.toLowerCase() ?? 'subject'}…</option>
                    {dropdownOptions.map((o, i) => (
                      <option key={i} value={o.option!}>{o.option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={fields.subject}
                    onChange={set('subject')}
                    placeholder={subjectFieldLabel ?? 'Subject'}
                    required={!!subjectRequired}
                    className={inputClass}
                  />
                )}
              </div>
            )}

            {/* Message — always shown, always required */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {messageFieldLabel}<span className="text-red-500 ml-0.5">*</span>
              </label>
              <textarea
                value={fields.message}
                onChange={set('message')}
                placeholder={messageFieldLabel ?? 'Your message'}
                required
                rows={5}
                className={`${inputClass} resize-y`}
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-60 cursor-pointer"
              style={btnStyle}
            >
              {loading ? 'Sending…' : submitLabel}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
