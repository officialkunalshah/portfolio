import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { journey } from '../data/content';

const PATH_D =
  'M20,70 C120,10 180,10 280,70 C380,130 440,130 540,70 C640,10 700,10 800,70 C900,130 940,130 980,70';

const STOP_FRACTIONS = [0.03, 0.22, 0.41, 0.59, 0.78, 0.97];

export default function Timeline() {
  const stops = journey.timeline.stops;
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<SVGGElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [pathLength, setPathLength] = useState(0);
  const [activeStops, setActiveStops] = useState<boolean[]>(stops.map(() => false));

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  useEffect(() => {
    if (!isInView || !pathRef.current || !planeRef.current || pathLength === 0) return;
    const path = pathRef.current;
    const plane = planeRef.current;

    const controls = animate(0, 1, {
      duration: 2.4,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (progress) => {
        const point = path.getPointAtLength(progress * pathLength);
        const point2 = path.getPointAtLength(Math.min(progress * pathLength + 1, pathLength));
        const angle = Math.atan2(point2.y - point.y, point2.x - point.x) * (180 / Math.PI);
        plane.setAttribute('transform', `translate(${point.x}, ${point.y}) rotate(${angle})`);

        STOP_FRACTIONS.forEach((frac, i) => {
          if (progress >= frac) {
            setActiveStops((prev) => {
              if (prev[i]) return prev;
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }
        });
      },
    });
    return () => controls.stop();
  }, [isInView, pathLength]);

  return (
    <div ref={containerRef}>
      <h3 style={{ fontSize: 'var(--step-1)', marginBottom: 'var(--space-lg)' }}>
        {journey.timeline.title}
      </h3>

      <div className="flight-path-wrap">
        <svg viewBox="0 0 1000 140" className="flight-path-svg" preserveAspectRatio="none" aria-hidden="true">
          <path d={PATH_D} fill="none" stroke="var(--color-border)" strokeWidth="2" strokeDasharray="5 7" />
          <motion.path
            ref={pathRef}
            d={PATH_D}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2.4, ease: [0.65, 0, 0.35, 1] }}
          />
          <g ref={planeRef} style={{ opacity: isInView ? 1 : 0, transition: 'opacity 200ms' }}>
            <path d="M0,-6 L11,0 L0,6 L3,0 Z" fill="var(--color-accent)" />
          </g>
        </svg>
      </div>

      <div className="stops-grid">
        {stops.map((stop, i) => (
          <motion.div
            key={stop.code}
            className={`stop-card ${activeStops[i] ? 'is-active' : ''}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <div className="stop-num">{i + 1}</div>
            <div>
              <p className="stop-code">{stop.code}</p>
              <p className="stop-name">{stop.name}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .flight-path-wrap {
          margin-bottom: var(--space-xl);
        }

        .flight-path-svg {
          width: 100%;
          height: 90px;
          display: block;
        }

        .stops-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: var(--space-md);
        }

        .stop-card {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding: var(--space-md);
          border: 1px solid var(--color-border);
          border-radius: 0.5rem;
          background: var(--color-card);
          transition: border-color 400ms var(--ease-out), box-shadow 400ms var(--ease-out);
        }

        .stop-card.is-active {
          border-color: var(--color-accent);
          box-shadow: 0 4px 14px rgba(161, 98, 7, 0.18);
        }

        .stop-num {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: var(--step--1);
          color: var(--color-muted-foreground);
          transition: all 400ms var(--ease-out);
        }

        .stop-card.is-active .stop-num {
          border-color: var(--color-accent);
          background: var(--color-accent);
          color: var(--color-on-accent);
        }

        .stop-code {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: var(--step-0);
          color: var(--color-foreground);
          margin: 0 0 0.15rem;
        }

        .stop-name {
          font-size: var(--step--2);
          color: var(--color-muted-foreground);
          margin: 0;
          line-height: 1.3;
        }

        @media (max-width: 640px) {
          .flight-path-svg {
            height: 70px;
          }
          .stops-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 400px) {
          .stops-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .flight-path-wrap { display: none; }
        }
      `}</style>
    </div>
  );
}
