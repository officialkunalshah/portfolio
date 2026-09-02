// ============================
// 1. NAVBAR SCROLL EFFECT
// ============================
const navbar = document.getElementById('navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ============================
// 2. SCROLL-TRIGGERED REVEAL ANIMATIONS
// ============================
if (window.IntersectionObserver) {
  const revealElements = document.querySelectorAll(
    '#about, #aviation, #work .work-item, #contact'
  );

  if (revealElements.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });

    revealElements.forEach((el) => {
      el.classList.add('reveal');
      revealObserver.observe(el);
    });
  }
} else {
  // Fallback for browsers without IntersectionObserver
  document.querySelectorAll('#about, #aviation, #work .work-item, #contact').forEach((el) => {
    el.classList.add('in-view');
  });
}

// ============================
// 3. MOBILE MENU TOGGLE
// ============================
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}
// ============================
// 4. CUSTOM CURSOR
// ============================
const cursorDot = document.querySelector('.cursor-dot');

if (window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
  });

  const hoverables = document.querySelectorAll('a, button');
  hoverables.forEach((el) => {
    el.addEventListener('mouseenter', () => cursorDot.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursorDot.classList.remove('hovering'));
  });
}
// ============================
// 5. MAGNETIC BUTTON HOVER
// ============================
const magneticEls = document.querySelectorAll('.btn, .work-link');

magneticEls.forEach((el) => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translate(0, 0)';
  });
});