// ============================
// 0. SHARED FLAGS
// ============================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;

// ============================
// 1. NAVBAR SCROLL EFFECT
// ============================
const navbar = document.getElementById('navbar');

if (navbar) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
      ticking = false;
    });
  });
}

// ============================
// 2. SCROLL-TRIGGERED REVEAL
// ============================
const revealTargets = document.querySelectorAll('#about, #aviation, #work .work-item, #contact');

if (window.IntersectionObserver && revealTargets.length) {
  // threshold 0 + a small bottom margin: fires as a section's top edge enters,
  // which stays reliable even for very tall sections (a ratio threshold can
  // never be met when the section is much taller than the viewport).
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -60px 0px' });

  revealTargets.forEach((el) => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
} else {
  revealTargets.forEach((el) => el.classList.add('in-view'));
}

// ============================
// 3. MOBILE MENU TOGGLE
// ============================
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
  const setMenu = (open) => {
    menuToggle.classList.toggle('open', open);
    navLinks.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  };

  menuToggle.addEventListener('click', () => {
    setMenu(!menuToggle.classList.contains('open'));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  // Close with Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
  });
}

// ============================
// 4. HERO VIDEO — play safely, pause when off-screen
// ============================
const heroVideo = document.querySelector('.hero-video');

if (heroVideo) {
  if (prefersReducedMotion) {
    // Keep the poster frame still, don't loop motion.
    heroVideo.removeAttribute('autoplay');
    heroVideo.pause();
  } else {
    // Muted is required for autoplay to be allowed — set it in JS too,
    // some browsers ignore the HTML attribute until the element is scripted.
    heroVideo.muted = true;
    heroVideo.setAttribute('muted', '');

    const startPlayback = () => {
      const attempt = heroVideo.play();
      if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});
    };

    // Try now, and again once there's decodable data.
    startPlayback();
    heroVideo.addEventListener('loadeddata', startPlayback, { once: true });
    heroVideo.addEventListener('canplay', startPlayback, { once: true });

    // Last resort: start on the first interaction, then stop listening.
    const onFirstInteraction = () => {
      startPlayback();
      window.removeEventListener('pointerdown', onFirstInteraction);
      window.removeEventListener('scroll', onFirstInteraction);
    };
    window.addEventListener('pointerdown', onFirstInteraction, { passive: true });
    window.addEventListener('scroll', onFirstInteraction, { passive: true });

    // Save battery/CPU: pause while the hero is off-screen.
    if (window.IntersectionObserver) {
      const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) startPlayback();
          else heroVideo.pause();
        });
      }, { threshold: 0.1 });
      videoObserver.observe(heroVideo);
    }
  }
}

// ============================
// 4b. FLIGHT-PATH JOURNEY (Aviation) — run once when it scrolls in
// ============================
const journey = document.querySelector('.journey');

if (journey) {
  if (prefersReducedMotion || !window.IntersectionObserver) {
    journey.classList.add('is-flying');
  } else {
    const journeyObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          journey.classList.add('is-flying');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.45 });
    journeyObserver.observe(journey);
  }
}

// ============================
// 5. CUSTOM CURSOR (fine pointers, motion allowed)
// ============================
const cursorDot = document.querySelector('.cursor-dot');

if (cursorDot && finePointer && !prefersReducedMotion) {
  window.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
  });

  document.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('mouseenter', () => cursorDot.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursorDot.classList.remove('hovering'));
  });
} else if (cursorDot) {
  cursorDot.style.display = 'none';
}

// ============================
// 6. MAGNETIC BUTTONS (subtle, fine pointers, motion allowed)
// ============================
if (finePointer && !prefersReducedMotion) {
  document.querySelectorAll('.btn').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.12;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.12;
      el.style.setProperty('--btn-shift', `${x}px`);
      el.style.setProperty('--btn-shift', `${y}px`);
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
    });
  });
}
