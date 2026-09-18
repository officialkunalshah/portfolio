import { motion } from 'framer-motion';
import { journey } from '../data/content';
import Timeline from './Timeline';

export default function AviationFull() {
  return (
    <main style={{ paddingTop: '6rem' }}>
      <section className="section container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 style={{ marginBottom: 'var(--space-lg)' }}>{journey.title}</h1>
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
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          />
        </motion.figure>

        {/* Timeline */}
        <div style={{ marginBottom: 'var(--space-3xl)' }}>
          <Timeline />
        </div>

        {/* Gallery */}
        <div style={{ marginBottom: 'var(--space-3xl)' }}>
          <h3 style={{ fontSize: 'var(--step-1)', marginBottom: 'var(--space-lg)' }}>
            {journey.gallery.title}
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 'var(--space-lg)',
            }}
            className="gallery-grid"
          >
            {journey.gallery.items.map((item, i) => (
              <motion.figure
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  borderRadius: '0.75rem',
                  overflow: 'hidden',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ overflow: 'hidden' }}>
                  <motion.img
                    src={item.image}
                    alt={item.alt}
                    style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
                    loading="lazy"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                  />
                </div>
                <figcaption style={{ padding: 'var(--space-md)' }}>
                  <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{item.title}</p>
                  <p style={{ fontSize: 'var(--step--1)', color: 'var(--color-muted-foreground)', margin: 0 }}>
                    {item.caption}
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>

        {/* Skill Groups */}
        {journey.skillGroups.map((group) => (
          <div key={group.title} style={{ marginBottom: 'var(--space-3xl)' }}>
            <h3 style={{ fontSize: 'var(--step-1)', marginBottom: 'var(--space-lg)' }}>
              {group.title}
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 'var(--space-lg)',
              }}
              className="skills-grid"
            >
              {group.items.map((item, i) => (
                <motion.div
                  key={item.term}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <p
                    style={{ fontWeight: 600, marginBottom: '0.25rem' }}
                    dangerouslySetInnerHTML={{ __html: item.term }}
                  />
                  <p style={{ fontSize: 'var(--step--1)', color: 'var(--color-muted-foreground)', margin: 0 }}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: 'center',
            padding: 'var(--space-2xl) 0',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'var(--step-2)',
              marginBottom: 'var(--space-md)',
            }}
          >
            {journey.closing.lead}
          </p>
          <p style={{ color: 'var(--color-muted-foreground)' }}>{journey.closing.sub}</p>
        </motion.div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .gallery-grid, .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
