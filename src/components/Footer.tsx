import { useEffect, useState } from 'react';
import { footer } from '../data/content';

export default function Footer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    if (!footer.localTime.enabled) return;
    const tick = () => {
      try {
        const t = new Date().toLocaleTimeString('en-GB', {
          timeZone: footer.localTime.timezone,
          hour: '2-digit',
          minute: '2-digit',
        });
        setTime(`${footer.localTime.label} ${t}`);
      } catch {
        setTime(footer.localTime.label);
      }
    };
    tick();
    const interval = setInterval(tick, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      style={{
        textAlign: 'center',
        padding: 'var(--space-3xl) var(--space-lg) var(--space-xl)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 'var(--step-3)',
          marginBottom: 'var(--space-lg)',
        }}
      >
        {footer.tagline}
      </p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--space-lg)',
          flexWrap: 'wrap',
          marginBottom: 'var(--space-md)',
          fontSize: 'var(--step--1)',
        }}
      >
        <a href={`mailto:${footer.email}`}>{footer.email}</a>
        {time && (
          <span style={{ color: 'var(--color-muted-foreground)' }}>
            <span
              style={{
                display: 'inline-block',
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-accent)',
                marginRight: '8px',
              }}
            />
            {time}
          </span>
        )}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Back to top
        </a>
      </div>
      <p style={{ fontSize: 'var(--step--2)', color: 'var(--color-muted-foreground)' }}>
        © {footer.year} {footer.legalName}
      </p>
    </footer>
  );
}
