/* ============================================================
   RENDER — builds the page from window.SITE_CONTENT (content.js).
   You should not normally need to edit this file: change content.js
   instead. This file just knows how to turn that data into HTML.
   ============================================================ */

(function () {
  const DATA = window.SITE_CONTENT;
  if (!DATA) return;

  // ---------- small helpers ----------
  const $ = (id) => document.getElementById(id);
  const setHTML = (id, html) => { const node = $(id); if (node) node.innerHTML = html == null ? '' : html; };
  const setText = (id, text) => { const node = $(id); if (node) node.textContent = text == null ? '' : text; };
  const isEnabled = (id) => {
    const s = (DATA.sections || []).find((s) => s.id === id);
    return !!(s && s.enabled);
  };
  const make = (tag, className, html) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  };

  // ---------- 1. Remove disabled sections up front ----------
  (DATA.sections || []).forEach((s) => {
    if (!s.enabled) {
      const node = document.getElementById(s.id);
      if (node) node.remove();
    }
  });

  // ---------- 2. Navigation ----------
  setText('nav-logo', (DATA.person && DATA.person.name) || '');

  // Some sections live on their own standalone page (they have a "page"
  // field, e.g. "aviation.html") instead of inline on the homepage. Work
  // out whether THIS html file is one of those pages, so nav links point
  // the right way from wherever the page is loaded. Falls back to
  // "no #hero on this page" so it also works for a plain supplementary
  // page (like aviation.html's own "read more" detail page) that isn't
  // tied to a specific section's "page" field at all.
  const pageSections = (DATA.sections || []).filter((s) => s.page);
  const currentPageSection = pageSections.find((s) => document.getElementById(s.id));
  const onSubPage = !!currentPageSection || !document.getElementById('hero');

  const navHTML = (DATA.sections || [])
    .filter((s) => s.enabled && s.navLabel)
    .map((s) => {
      if (s.page) {
        // Its own page: if we're already there, just scroll to its top
        // (reuses the normal anchor/scroll-spy behaviour); otherwise link
        // straight to that page.
        const isHere = currentPageSection && currentPageSection.id === s.id;
        const href = isHere ? `#${s.id}` : s.page;
        return `<a href="${href}">${s.navLabel}</a>`;
      }
      // Lives on the homepage: a plain in-page anchor when we're already
      // on the homepage, or "index.html#id" when we're on a sub-page.
      const href = onSubPage ? `index.html#${s.id}` : `#${s.id}`;
      return `<a href="${href}">${s.navLabel}</a>`;
    })
    .join('');
  setHTML('nav-links', navHTML);

  const navLogo = $('nav-logo');
  if (navLogo) navLogo.setAttribute('href', onSubPage ? 'index.html' : '#hero');

  // ---------- 3. Hero ----------
  if (isEnabled('hero') || document.getElementById('hero')) {
    const hero = DATA.hero || {};
    setHTML('hero-eyebrow', hero.eyebrow);
    setHTML('hero-headline', (hero.headlineLines || []).join('<br>'));

    const buttonsHTML = (hero.buttons || [])
      .map((b) => `<a href="${b.href}" class="btn ${b.style === 'secondary' ? 'btn-secondary' : 'btn-primary'}">${b.label}</a>`)
      .join('');
    setHTML('hero-buttons', buttonsHTML);

    const video = $('hero-video');
    const bg = hero.background || {};
    if (video) {
      if (bg.type === 'image') {
        // Swap the <video> for a plain background image.
        const img = make('img', null);
        img.src = bg.poster || bg.image || '';
        img.alt = bg.posterAlt || '';
        video.replaceWith(img);
      } else {
        video.poster = bg.poster || '';
        video.innerHTML = `<source src="${bg.video}" type="video/mp4">
          <img src="${bg.poster || ''}" alt="${bg.posterAlt || ''}">`;
      }
    }

    if (hero.showTopoLines === false) {
      const topo = $('topo-lines');
      if (topo) topo.remove();
    }
  }

  // ---------- 4. About ----------
  if (isEnabled('about')) {
    const about = DATA.about || {};
    setText('about-heading', about.heading);
    setHTML('about-lead', about.lead);
    setHTML('about-paragraphs', (about.paragraphs || []).map((p) => `<p>${p}</p>`).join(''));

    const img = $('about-image');
    if (img && about.image) {
      img.src = about.image.src || '';
      img.alt = about.image.alt || '';
    }

    const now = about.now || {};
    setText('about-doing-title', now.doingTitle);
    setHTML('about-doing-list', (now.doingItems || []).map((i) => `<li>${i}</li>`).join(''));
    setText('about-next-title', now.nextTitle);
    setHTML('about-next-text', now.nextText);
  }

  // ---------- 5. Journey (Aviation-style section) ----------
  if (isEnabled('journey')) {
    const j = DATA.journey || {};
    setText('journey-heading', j.title);
    setHTML('journey-intro', (j.intro || []).map((p) => `<p>${p}</p>`).join(''));

    const photo = $('journey-photo');
    if (photo && j.photo) {
      photo.src = j.photo.src || '';
      photo.alt = j.photo.alt || '';
    }

    const timeline = j.timeline || { stops: [] };
    setHTML('journey-timeline-title', timeline.title);

    const stops = timeline.stops || [];
    const n = stops.length;
    const cx = (i) => (n <= 1 ? 300 : 50 + i * (500 / (n - 1)));
    const delayFor = (i) => (0.15 + i * (n > 1 ? 2.85 / (n - 1) : 0)).toFixed(2);

    const dotsSVG = stops.map((s, i) => `<circle class="j-dot" cx="${cx(i)}" cy="15" r="3.5" style="animation-delay:${delayFor(i)}s"></circle>`).join('');
    const svgHTML = `
      <line class="j-base" x1="50" y1="15" x2="550" y2="15"></line>
      <line class="j-line" x1="50" y1="15" x2="550" y2="15" pathLength="1"></line>
      ${dotsSVG}
      <g class="j-plane"><path d="M44,9 L59,15 L44,21 L48,15 Z"></path></g>
    `;
    setHTML('journey-svg', svgHTML);

    const stopsHTML = stops
      .map((s, i) => `<li class="journey-stop" style="--i:${i}"><span class="journey-code">${s.code}</span><span class="journey-name">${s.name}</span></li>`)
      .join('');
    const stopsList = $('journey-stops');
    if (stopsList) {
      stopsList.innerHTML = stopsHTML;
      // A CSS variable, not the property directly — so the mobile
      // media-query breakpoints (which set fixed column counts) still win.
      stopsList.style.setProperty('--stop-count', Math.max(n, 1));
    }

    // Only present on the homepage's shortened version of this section
    // (index.html) — aviation.html shows the full thing instead, so it
    // has no #journey-readmore element and this safely does nothing there.
    if (j.readMore) {
      setHTML('journey-readmore', `<p class="journey-readmore-lead">${j.readMore.lead || ''}</p><a href="${j.readMore.href}" class="work-link">${j.readMore.label}</a>`);
    }

    const gallery = j.gallery || { items: [] };
    setHTML('journey-gallery-title', gallery.title);
    const galleryHTML = (gallery.items || [])
      .map((it) => `<figure class="aircraft-card">
        <img src="${it.image}" alt="${it.alt || ''}" loading="lazy">
        <figcaption><h4>${it.title}</h4><p>${it.caption}</p></figcaption>
      </figure>`)
      .join('');
    setHTML('journey-gallery', galleryHTML);

    const groupsHTML = (j.skillGroups || [])
      .map((g) => `<div class="av-block">
        <h3>${g.title}</h3>
        <dl class="skill-list">
          ${(g.items || []).map((it) => `<div><dt>${it.term}</dt><dd>${it.desc}</dd></div>`).join('')}
        </dl>
      </div>`)
      .join('');
    setHTML('journey-skill-groups', groupsHTML);

    const closing = j.closing || {};
    setHTML('journey-closing-lead', closing.lead);
    setHTML('journey-closing-sub', closing.sub);
  }

  // ---------- 6. Skills (standalone, optional) ----------
  if (isEnabled('skills')) {
    const sk = DATA.skills || {};
    setText('skills-heading', sk.heading);
    setHTML('skills-intro', sk.intro);
    const groupsHTML = (sk.groups || [])
      .map((g) => `<div class="av-block">
        <h3>${g.title}</h3>
        <dl class="skill-list">
          ${(g.items || []).map((it) => `<div><dt>${it.term}</dt><dd>${it.desc}</dd></div>`).join('')}
        </dl>
      </div>`)
      .join('');
    setHTML('skills-groups', groupsHTML);
  }

  // ---------- 7. Work ----------
  if (isEnabled('work')) {
    const w = DATA.work || {};
    setText('work-heading', w.heading);
    setHTML('work-intro', w.intro);

    const coreAreas = w.coreAreas || {};
    setText('work-core-title', coreAreas.title);
    setHTML('work-core-list', (coreAreas.items || []).map((it, i) => `<span style="--i:${i}">${it}</span>`).join(''));

    const itemsHTML = (w.items || [])
      .map((item) => {
        const blocksHTML = (item.blocks || [])
          .map((b) => {
            const statsHTML = b.stats
              ? `<ul class="work-stats">${b.stats.map((s) => `<li><span class="stat-num">${s.num}</span><span class="stat-label">${s.label}</span></li>`).join('')}</ul>`
              : '';
            const paraHTML = (b.paragraphs || []).map((p) => `<p>${p}</p>`).join('');
            return `<div class="work-block"><h4>${b.heading}</h4>${statsHTML}${paraHTML}</div>`;
          })
          .join('');

        const capsHTML = item.capabilities
          ? `<div class="work-caps"><h4>${item.capabilities.title}</h4><ul>${item.capabilities.items.map((c) => `<li>${c}</li>`).join('')}</ul></div>`
          : '';

        const linkHTML = item.link
          ? `<a href="${item.link.href}" target="_blank" rel="noopener noreferrer" class="work-link">${item.link.label}</a>`
          : '';

        return `<article class="work-item${item.reverse ? ' work-item--reverse' : ''}">
          <div class="work-media"><img src="${item.logo.src}" alt="${item.logo.alt || ''}"></div>
          <div class="work-body">
            <span class="work-year">${item.year}</span>
            <h3>${item.name}</h3>
            <p class="work-role">${item.role}</p>
            ${blocksHTML}
            ${capsHTML}
            ${linkHTML}
          </div>
        </article>`;
      })
      .join('');
    setHTML('work-items', itemsHTML);
  }

  // ---------- 8. Services (optional) ----------
  if (isEnabled('services')) {
    const sv = DATA.services || {};
    setText('services-heading', sv.heading);
    setHTML('services-intro', sv.intro);
    setHTML('services-items', (sv.items || [])
      .map((it) => `<div class="service-card"><h3>${it.title}</h3><p>${it.description}</p></div>`)
      .join(''));
  }

  // ---------- 9. Testimonials (optional) ----------
  if (isEnabled('testimonials')) {
    const t = DATA.testimonials || {};
    setText('testimonials-heading', t.heading);
    setHTML('testimonials-intro', t.intro);
    setHTML('testimonials-items', (t.items || [])
      .map((it) => `<figure class="testimonial-card"><blockquote>${it.quote}</blockquote><figcaption>${it.name}${it.role ? ' — ' + it.role : ''}</figcaption></figure>`)
      .join(''));
  }

  // ---------- 10. Contact ----------
  if (isEnabled('contact')) {
    const c = DATA.contact || {};
    setText('contact-heading', c.heading);
    setHTML('contact-intro', c.intro);
    const emailLink = $('contact-email');
    if (emailLink) {
      emailLink.href = `mailto:${c.email}`;
      emailLink.textContent = c.email;
    }
    const socialLinksHTML = (c.socialLinks || [])
      .map((s) => `<a href="${s.href}" target="_blank" rel="noopener noreferrer">${s.label}</a>`)
      .join('');
    const resumeHTML = c.resumeUrl
      ? `<a href="${c.resumeUrl}" target="_blank" rel="noopener noreferrer">${c.resumeLabel || 'Resume / CV'}</a>`
      : '';
    setHTML('contact-social', socialLinksHTML + resumeHTML);
  }

  // ---------- 11. Footer ----------
  const footer = DATA.footer || {};
  setHTML('footer-tagline', footer.tagline);
  const footerEmail = $('footer-email');
  if (footerEmail) {
    footerEmail.href = `mailto:${footer.email}`;
    footerEmail.textContent = footer.email;
  }
  const footerTime = $('footer-time');
  if (footerTime) {
    if (footer.localTime && footer.localTime.enabled) {
      footerTime.setAttribute('aria-label', `Local time in ${footer.localTime.label}`);
    } else {
      footerTime.remove();
    }
  }
  setHTML('footer-legal', `&copy; ${footer.year} ${footer.legalName}. All rights reserved.`);
})();
