import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      // Setting muted only via the JSX attribute isn't reliable across all
      // mobile browsers — enforce it on the element directly before every
      // play() call so autoplay never comes through with sound.
      video.muted = true;
      video.defaultMuted = true;
      video.play().catch(() => {
        // Autoplay blocked, will retry on interaction
      });
    };

    playVideo();
    video.addEventListener('loadeddata', playVideo);
    video.addEventListener('canplay', playVideo);

    const retryOnInteraction = () => {
      playVideo();
      window.removeEventListener('scroll', retryOnInteraction);
      window.removeEventListener('pointerdown', retryOnInteraction);
    };
    window.addEventListener('scroll', retryOnInteraction, { once: true });
    window.addEventListener('pointerdown', retryOnInteraction, { once: true });

    return () => {
      video.removeEventListener('loadeddata', playVideo);
      video.removeEventListener('canplay', playVideo);
    };
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
      }}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/hero-studio.jpg"
        // React/browsers disagree on the `muted` DOM property after SSR
        // (a long-standing React issue, not a real bug in our markup) —
        // the useEffect above enforces it imperatively regardless, so the
        // mismatch warning is safe to suppress rather than let React
        // discard and rebuild this element after hydration.
        suppressHydrationWarning
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src="/images/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(12,10,9,0.3) 0%, rgba(12,10,9,0.6) 70%, rgba(12,10,9,0.85) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          paddingBottom: 'var(--space-3xl)',
          width: '100%',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <p
            style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: 'var(--step-0)',
              marginBottom: 'var(--space-sm)',
              fontWeight: 500,
              letterSpacing: '0.02em',
            }}
          >
            Founder / Brand &amp; Creative Director
          </p>
          <h1
            style={{
              color: '#ffffff',
              marginBottom: 'var(--space-lg)',
            }}
          >
            Kunal Shah
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: 'var(--step-1)',
              maxWidth: '38rem',
              marginBottom: 'var(--space-xl)',
              fontStyle: 'italic',
              fontFamily: 'var(--font-display)',
            }}
          >
            I fly. I build. I create.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}
        >
          <a href="#work" className="link-button">
            View My Work
          </a>
          <a
            href="#about"
            style={{
              display: 'inline-block',
              padding: 'var(--space-md) var(--space-xl)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#ffffff',
              borderRadius: '0.375rem',
              fontWeight: 600,
              transition: 'all 300ms ease',
            }}
          >
            About Me
          </a>
        </motion.div>
      </div>
    </section>
  );
}
