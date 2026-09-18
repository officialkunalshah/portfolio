import { motion } from 'framer-motion';
import { work } from '../data/content';

export default function Work() {
  return (
    <section id="work" className="section container">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={{ marginBottom: 'var(--space-md)' }}>{work.heading}</h2>
        <p
          style={{ color: 'var(--color-muted-foreground)', maxWidth: '48rem' }}
          dangerouslySetInnerHTML={{ __html: work.intro }}
        />
      </motion.div>

      {/* Work Items */}
      {work.items.map((item) => (
        <motion.article
          key={item.name}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 'var(--space-3xl)' }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-md)',
              marginBottom: 'var(--space-lg)',
            }}
          >
            <motion.img
              src={item.logo.src}
              alt={item.logo.alt}
              style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
              loading="lazy"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            />
            <div>
              <h3 style={{ fontSize: 'var(--step-2)' }}>{item.name}</h3>
              <p
                style={{ color: 'var(--color-accent)', fontWeight: 500, fontSize: 'var(--step--1)' }}
                dangerouslySetInnerHTML={{ __html: item.role }}
              />
            </div>
          </div>

          {item.blocks.map((block, i) => (
            <div key={i} style={{ marginBottom: 'var(--space-xl)' }}>
              <h4
                style={{
                  fontSize: 'var(--step-0)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                  marginBottom: 'var(--space-sm)',
                  color: 'var(--color-foreground)',
                }}
              >
                {block.heading}
              </h4>
              {block.paragraphs.map((p, j) => (
                <p
                  key={j}
                  style={{ color: 'var(--color-muted-foreground)', marginBottom: 'var(--space-sm)' }}
                  dangerouslySetInnerHTML={{ __html: p }}
                />
              ))}
              {block.stats && (
                <div
                  style={{
                    display: 'flex',
                    gap: 'var(--space-2xl)',
                    marginTop: 'var(--space-md)',
                    flexWrap: 'wrap',
                  }}
                >
                  {block.stats.map((stat) => (
                    <div key={stat.label}>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--step-3)',
                          color: 'var(--color-accent)',
                          fontWeight: 600,
                        }}
                      >
                        {stat.num}
                      </div>
                      <div style={{ fontSize: 'var(--step--1)', color: 'var(--color-muted-foreground)' }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Leadership Highlights - ruled index */}
          <div style={{ marginTop: 'var(--space-xl)' }}>
            <p
              style={{
                fontSize: 'var(--step--1)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--color-muted-foreground)',
                marginBottom: 'var(--space-sm)',
              }}
            >
              {item.capabilities.title}
            </p>
            <ul
              style={{
                listStyle: 'none',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                columnGap: 'var(--space-xl)',
                borderTop: '1px solid var(--color-border)',
              }}
              className="capabilities-list"
            >
              {item.capabilities.items.map((cap) => (
                <li
                  key={cap}
                  style={{
                    padding: '0.9rem 0',
                    borderBottom: '1px solid var(--color-border)',
                    color: 'var(--color-muted-foreground)',
                    fontSize: 'var(--step--1)',
                  }}
                >
                  {cap}
                </li>
              ))}
            </ul>
          </div>

          <a
            href={item.link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              marginTop: 'var(--space-lg)',
              color: 'var(--color-accent)',
              fontWeight: 600,
            }}
          >
            {item.link.label} →
          </a>
        </motion.article>
      ))}

      <style>{`
        @media (max-width: 640px) {
          .capabilities-list { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
