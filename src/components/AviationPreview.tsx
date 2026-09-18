import { motion } from 'framer-motion';
import { journey } from '../data/content';
import Timeline from './Timeline';

export default function AviationPreview() {
  return (
    <section id="journey" className="section container">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={{ marginBottom: 'var(--space-lg)' }}>{journey.title}</h2>
        {journey.intro.map((p, i) => (
          <p key={i} style={{ color: 'var(--color-muted-foreground)', maxWidth: '48rem' }}>
            {p}
          </p>
        ))}
      </motion.div>

      <motion.figure
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        style={{
          margin: 'var(--space-2xl) 0',
          borderRadius: '0.75rem',
          overflow: 'hidden',
          maxHeight: '480px',
        }}
      >
        <motion.img
          src={journey.photo.src}
          alt={journey.photo.alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', maxHeight: '480px' }}
          loading="lazy"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        />
      </motion.figure>

      <Timeline />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          marginTop: 'var(--space-2xl)',
          paddingTop: 'var(--space-2xl)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <p style={{ color: 'var(--color-muted-foreground)', marginBottom: 'var(--space-md)' }}>
          {journey.readMore.lead}
        </p>
        <a href={journey.readMore.href} className="link-button">
          {journey.readMore.label} →
        </a>
      </motion.div>
    </section>
  );
}
