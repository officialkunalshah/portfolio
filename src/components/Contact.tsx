import { motion } from 'framer-motion';
import { contact } from '../data/content';
import ContactForm from './ContactForm';

export default function Contact() {
  return (
    <section id="contact" className="section container" style={{ textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={{ marginBottom: 'var(--space-md)' }}>{contact.heading}</h2>
        <p style={{ color: 'var(--color-muted-foreground)', marginBottom: 'var(--space-xl)' }}>
          {contact.intro}
        </p>

        <ContactForm />

        <p
          style={{
            color: 'var(--color-muted-foreground)',
            fontSize: 'var(--step--1)',
            marginTop: 'var(--space-2xl)',
            marginBottom: 'var(--space-sm)',
          }}
        >
          Prefer email directly?
        </p>
        <a
          href={`mailto:${contact.email}`}
          style={{
            fontSize: 'var(--step-2)',
            fontFamily: 'var(--font-display)',
            color: 'var(--color-foreground)',
            display: 'block',
            marginBottom: 'var(--space-lg)',
          }}
        >
          {contact.email}
        </a>
        <div style={{ display: 'flex', gap: 'var(--space-lg)', justifyContent: 'center' }}>
          {contact.socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--color-accent)',
                fontWeight: 600,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
