import { motion } from 'framer-motion';
import { about } from '../data/content';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <section
      id="about"
      className="section container"
      style={{ paddingTop: 'calc(var(--space-3xl) + 4rem)' }}
    >
      <div
        className="about-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 'var(--space-2xl)',
          alignItems: 'start',
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          variants={fadeUp}
        >
          <h2 style={{ marginBottom: 'var(--space-lg)' }}>{about.heading}</h2>
          <p
            style={{
              fontSize: 'var(--step-1)',
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              color: 'var(--color-foreground)',
              marginBottom: 'var(--space-lg)',
            }}
          >
            {about.lead}
          </p>
          {about.paragraphs.map((p, i) => (
            <p
              key={i}
              style={{ color: 'var(--color-muted-foreground)', marginBottom: 'var(--space-md)' }}
              dangerouslySetInnerHTML={{ __html: p }}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            borderRadius: '0.75rem',
            overflow: 'hidden',
            aspectRatio: '4/5',
          }}
        >
          <motion.img
            src={about.image.src}
            alt={about.image.alt}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          />
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        variants={fadeUp}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-2xl)',
          marginTop: 'var(--space-3xl)',
          paddingTop: 'var(--space-2xl)',
          borderTop: '1px solid var(--color-border)',
        }}
        className="about-now-grid"
      >
        <div>
          <h3 style={{ fontSize: 'var(--step-1)', marginBottom: 'var(--space-md)' }}>
            {about.now.doingTitle}
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            {about.now.doingItems.map((item, i) => (
              <li
                key={i}
                style={{
                  color: 'var(--color-muted-foreground)',
                  paddingLeft: '1.25rem',
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    color: 'var(--color-accent)',
                  }}
                >
                  →
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 style={{ fontSize: 'var(--step-1)', marginBottom: 'var(--space-md)' }}>
            {about.now.nextTitle}
          </h3>
          <p style={{ color: 'var(--color-muted-foreground)' }}>{about.now.nextText}</p>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .about-now-grid { grid-template-columns: 1fr !important; gap: var(--space-xl) !important; }
        }
      `}</style>
    </section>
  );
}
