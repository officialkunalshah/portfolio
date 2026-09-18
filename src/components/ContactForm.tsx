import { useState, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, OWNER_EMAIL, SITE_OWNER_NAME } from '../lib/emailjs-config';

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  company: string; // honeypot — real visitors never fill this in
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  company: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {};

  if (!form.name.trim()) {
    errors.name = 'Please enter your name.';
  }

  if (!form.email.trim()) {
    errors.email = 'Please enter your email.';
  } else if (!EMAIL_RE.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (form.phone.trim() && !/^[+()\d\s-]{7,20}$/.test(form.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.';
  }

  if (!form.message.trim()) {
    errors.message = 'Please enter a message.';
  }

  return errors;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (status === 'sending') return;

    // Honeypot: bots fill every field, humans never see this one.
    if (form.company.trim() !== '') {
      setForm(initialState);
      setStatus('success');
      return;
    }

    const fieldErrors = validate(form);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      return;
    }

    setStatus('sending');

    const submittedAt = new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    try {
      // 1. Notify the site owner.
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.ADMIN_TEMPLATE_ID,
        {
          to_email: OWNER_EMAIL,
          from_name: form.name.trim(),
          from_email: form.email.trim(),
          phone: form.phone.trim() || 'Not provided',
          subject: form.subject.trim() || 'General inquiry',
          message: form.message.trim(),
          submitted_at: submittedAt,
        },
        { publicKey: EMAILJS_CONFIG.PUBLIC_KEY }
      );

      // 2. Auto-reply to the visitor. Requires the AUTOREPLY template's
      // "To email" field (in the EmailJS dashboard) to be set to {{to_email}}.
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.AUTOREPLY_TEMPLATE_ID,
        {
          to_email: form.email.trim(),
          to_name: form.name.trim(),
          company_name: SITE_OWNER_NAME,
        },
        { publicKey: EMAILJS_CONFIG.PUBLIC_KEY }
      );

      setStatus('success');
      setForm(initialState);
    } catch (err) {
      setStatus('error');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem var(--space-md)',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--step--1)',
    color: 'var(--color-foreground)',
    backgroundColor: 'var(--color-card)',
    border: '1px solid var(--color-border)',
    borderRadius: '0.375rem',
    outline: 'none',
    transition: 'border-color 200ms ease',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 'var(--step--2)',
    color: 'var(--color-muted-foreground)',
    marginBottom: '0.35rem',
    textAlign: 'left',
  };

  const errorStyle: React.CSSProperties = {
    color: 'var(--color-destructive)',
    fontSize: 'var(--step--2)',
    marginTop: '0.3rem',
    textAlign: 'left',
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{
        maxWidth: '36rem',
        margin: '0 auto',
        marginTop: 'var(--space-xl)',
        textAlign: 'left',
      }}
    >
      {/* Honeypot field — hidden from real visitors, visible to bots that auto-fill forms */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
      >
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={handleChange('company')}
        />
      </div>

      <div style={{ marginBottom: 'var(--space-md)' }}>
        <label htmlFor="name" style={labelStyle}>
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          value={form.name}
          onChange={handleChange('name')}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          style={{
            ...inputStyle,
            borderColor: errors.name ? 'var(--color-destructive)' : 'var(--color-border)',
          }}
        />
        {errors.name && (
          <p id="name-error" style={errorStyle} role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div style={{ marginBottom: 'var(--space-md)' }}>
        <label htmlFor="email" style={labelStyle}>
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange('email')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          style={{
            ...inputStyle,
            borderColor: errors.email ? 'var(--color-destructive)' : 'var(--color-border)',
          }}
        />
        {errors.email && (
          <p id="email-error" style={errorStyle} role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div style={{ marginBottom: 'var(--space-md)' }}>
        <label htmlFor="phone" style={labelStyle}>
          Phone Number <span style={{ opacity: 0.6 }}>(optional)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          autoComplete="tel"
          value={form.phone}
          onChange={handleChange('phone')}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          style={{
            ...inputStyle,
            borderColor: errors.phone ? 'var(--color-destructive)' : 'var(--color-border)',
          }}
        />
        {errors.phone && (
          <p id="phone-error" style={errorStyle} role="alert">
            {errors.phone}
          </p>
        )}
      </div>

      <div style={{ marginBottom: 'var(--space-md)' }}>
        <label htmlFor="subject" style={labelStyle}>
          Subject / Service <span style={{ opacity: 0.6 }}>(optional)</span>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={form.subject}
          onChange={handleChange('subject')}
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: 'var(--space-lg)' }}>
        <label htmlFor="message" style={labelStyle}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange('message')}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          style={{
            ...inputStyle,
            resize: 'vertical',
            minHeight: '120px',
            borderColor: errors.message ? 'var(--color-destructive)' : 'var(--color-border)',
          }}
        />
        {errors.message && (
          <p id="message-error" style={errorStyle} role="alert">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="link-button"
        style={{
          width: '100%',
          border: 'none',
          opacity: status === 'sending' ? 0.7 : 1,
          cursor: status === 'sending' ? 'not-allowed' : 'pointer',
        }}
      >
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>

      <div aria-live="polite" style={{ marginTop: 'var(--space-md)', textAlign: 'center' }}>
        {status === 'success' && (
          <p style={{ color: 'var(--color-accent)', fontSize: 'var(--step--1)' }}>
            Thank you! Your message has been sent successfully. We've also sent a confirmation email to you.
          </p>
        )}
        {status === 'error' && (
          <p style={{ color: 'var(--color-destructive)', fontSize: 'var(--step--1)' }}>
            Something went wrong. Please try again or contact us directly.
          </p>
        )}
      </div>

      <style>{`
        #contact input:focus,
        #contact textarea:focus {
          border-color: var(--color-accent) !important;
          box-shadow: 0 0 0 3px rgba(161, 98, 7, 0.15);
        }
      `}</style>
    </form>
  );
}
