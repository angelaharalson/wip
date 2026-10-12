// Shared header, footer and interactions for Destin Pet Friendly Condos (Option A · Coastal Calm).
// Each page sets <body data-page="..."> and includes <div data-site-header></div> / <div data-site-footer></div>.
(function () {
  const ICONS = 'https://unpkg.com/lucide-static@0.460.0/icons/';
  const icon = (name, cls = '') => `<span class="icon ${cls}" style="--i:url(${ICONS}${name}.svg)" aria-hidden="true"></span>`;

  // Logo concept 1: paw over two shoreline waves.
  const logo = (a, b) => `<svg class="brand__mark" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <circle cx="14" cy="27" r="5.5" fill="${a}"/><circle cx="24.5" cy="17" r="5.5" fill="${a}"/>
    <circle cx="39.5" cy="17" r="5.5" fill="${a}"/><circle cx="50" cy="27" r="5.5" fill="${a}"/>
    <path d="M14 45 A18 18 0 0 1 50 45 Z" fill="${a}"/>
    <path d="M9 51 q5.75 -4 11.5 0 t11.5 0 t11.5 0 t11.5 0" fill="none" stroke="${b}" stroke-width="3.2" stroke-linecap="round"/>
    <path d="M15 58 q4.25 -3 8.5 0 t8.5 0 t8.5 0 t8.5 0" fill="none" stroke="${b}" stroke-width="3.2" stroke-linecap="round"/>
  </svg>`;
  window.SiteLogo = logo;

  const MAIN = [
    ['home', 'Home', 'index.html'],
    ['vacation-rentals', 'Vacation Rentals', 'vacation-rentals.html'],
    ['things-to-do', 'Things to Do', 'things-to-do.html'],
    ['reviews', 'Reviews', 'guest-reviews.html'],
    ['about', 'About', 'about-us.html'],
  ];
  const MORE = [
    ['policies', 'Rental Policies', 'rental-policies.html'],
    ['pet-info', 'Pet Info', 'pet-info.html'],
    ['faqs', 'FAQs', 'faqs.html'],
    ['getting-here', 'Getting Here', 'getting-here.html'],
  ];
  const BOOK = 'vacation-rentals.html';
  const PHONE = '678-313-5115';
  const EMAIL = 'thedestinconnection@gmail.com';

  const page = document.body.dataset.page;
  const cur = id => (id === page ? ' aria-current="page"' : '');
  const inMore = MORE.some(([id]) => id === page);
  const brandName = '<span class="brand__name"><span class="brand__line">Destin Pet</span> <span class="brand__line">Friendly Condos</span></span>';

  const header = document.querySelector('[data-site-header]');
  if (header) {
    header.outerHTML = `
<header class="site-header">
  <div class="wrap site-header__bar">
    <a class="brand" href="index.html" aria-label="Destin Pet Friendly Condos, home">${logo('#17324D', '#5E9C90')}${brandName}</a>
    <nav class="main-nav" aria-label="Main">
      ${MAIN.map(([id, label, href]) => `<a href="${href}"${cur(id)}>${label}</a>`).join('')}
      <div class="more">
        <button class="more-toggle${inMore ? ' is-current' : ''}" aria-expanded="false" aria-controls="more-menu">More${icon('chevron-down')}</button>
        <div class="more__menu" id="more-menu">
          ${MORE.map(([id, label, href]) => `<a href="${href}"${cur(id)}>${label}</a>`).join('')}
        </div>
      </div>
    </nav>
    <div class="header-actions">
      <a class="btn btn--primary" href="${BOOK}">Book Now</a>
      <button class="menu-toggle" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">${icon('menu')}</button>
    </div>
  </div>
</header>
<div class="mobile-menu" id="mobile-menu">
  <nav aria-label="Mobile">
    ${MAIN.map(([id, label, href]) => `<a class="mobile-menu__main" href="${href}"${cur(id)}>${label}</a>`).join('')}
    <p class="mobile-menu__label">More</p>
    ${MORE.map(([id, label, href]) => `<a class="mobile-menu__more" href="${href}"${cur(id)}>${label}</a>`).join('')}
  </nav>
  <div class="mobile-menu__contact">
    <a href="tel:6783135115">Call ${PHONE}</a>
    <a href="mailto:${EMAIL}">${EMAIL}</a>
  </div>
</div>`;
  }

  const footer = document.querySelector('[data-site-footer]');
  if (footer) {
    const linksA = [['Vacation Rentals', 'vacation-rentals.html'], ['Things to Do', 'things-to-do.html'], ['Getting Here', 'getting-here.html'], ['Guest Reviews', 'guest-reviews.html']];
    const linksB = [['About Us', 'about-us.html'], ['FAQs', 'faqs.html'], ['Rental Policies', 'rental-policies.html'], ['Pet Info', 'pet-info.html']];
    const list = l => l.map(([label, href]) => `<a href="${href}">${label}</a>`).join('');
    footer.outerHTML = `
<footer class="site-footer">
  <div class="wrap">
    <div class="site-footer__grid">
      <div class="site-footer__about">
        <a class="brand" href="index.html">${logo('#FFFFFF', '#9FD3C7')}<span class="brand__name">Destin Pet Friendly Condos</span></a>
        <p>Pet friendly vacation condos at Maravilla, Destin, Florida.</p>
      </div>
      <div class="site-footer__col site-footer__contact">
        <h2>Contact</h2>
        <a href="tel:6783135115">${icon('phone')}${PHONE}</a>
        <a href="mailto:${EMAIL}">${icon('mail')}${EMAIL}</a>
        <span class="site-footer__loc">${icon('map-pin')}Destin, Florida</span>
      </div>
      <nav class="site-footer__col" aria-label="Plan your stay"><h2>Plan your stay</h2>${list(linksA)}</nav>
      <nav class="site-footer__col" aria-label="Good to know"><h2>Good to know</h2>${list(linksB)}</nav>
    </div>
    <div class="site-footer__legal"><span>© ${new Date().getFullYear()} Destin Pet Friendly Condos</span><span>Destin, Florida · Emerald Coast</span></div>
  </div>
</footer>`;
  }

  // Logo marks placed inside page content: <span data-logo="52"></span>
  document.querySelectorAll('[data-logo]').forEach(el => {
    el.outerHTML = logo('#17324D', '#5E9C90').replace('class="brand__mark"', `class="brand__mark" width="${el.dataset.logo}" height="${el.dataset.logo}" style="width:${el.dataset.logo}px;height:${el.dataset.logo}px"`);
  });

  // "More" dropdown (desktop)
  const moreBtn = document.querySelector('.more-toggle');
  const moreMenu = document.getElementById('more-menu');
  const setMore = open => {
    if (!moreBtn) return;
    moreBtn.setAttribute('aria-expanded', String(open));
    moreMenu.classList.toggle('is-open', open);
  };
  moreBtn?.addEventListener('click', e => { e.stopPropagation(); setMore(moreBtn.getAttribute('aria-expanded') !== 'true'); });
  document.addEventListener('click', e => { if (!e.target.closest('.more')) setMore(false); });

  // Mobile menu (A3). Book Now stays visible in the header while open.
  const menuBtn = document.querySelector('.menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const setMenu = open => {
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menuBtn.querySelector('.icon').style.setProperty('--i', `url(${ICONS}${open ? 'x' : 'menu'}.svg)`);
    menu.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  };
  menuBtn?.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
  menu?.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  window.matchMedia('(min-width: 1081px)').addEventListener('change', e => { if (e.matches) setMenu(false); });

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (moreBtn?.getAttribute('aria-expanded') === 'true') { setMore(false); moreBtn.focus(); }
    if (menuBtn?.getAttribute('aria-expanded') === 'true') { setMenu(false); menuBtn.focus(); }
  });

  // FAQ accordion (A6)
  document.querySelectorAll('.faq__q').forEach(btn => {
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', String(open));
      document.getElementById(btn.getAttribute('aria-controls')).hidden = !open;
      btn.querySelector('.icon').style.setProperty('--i', `url(${ICONS}${open ? 'minus' : 'plus'}.svg)`);
    });
  });

  // Guest Reviews: average rating and count, worked out from the published reviews on the page
  const reviewRatings = [...document.querySelectorAll('[data-review-list] [data-rating]')]
    .map(el => Number(el.dataset.rating)).filter(n => n >= 1 && n <= 5);
  if (reviewRatings.length) {
    const avg = (reviewRatings.reduce((a, b) => a + b, 0) / reviewRatings.length).toFixed(1);
    const avgStars = document.querySelector('[data-review-avg-stars]');
    avgStars.style.setProperty('--rating', avg);
    avgStars.setAttribute('aria-label', `Average rating: ${avg} out of 5 stars`);
    document.querySelector('[data-review-avg]').textContent = avg;
    document.querySelector('[data-review-count]').textContent = `${reviewRatings.length} review${reviewRatings.length === 1 ? '' : 's'}`;
  }

  // Guest Reviews: "write a review" form. There is no server to store reviews, so a valid form
  // opens the guest's email app with the review filled in, addressed to the form's mailto action.
  const reviewForm = document.getElementById('review-form');
  if (reviewForm) {
    reviewForm.noValidate = true; // use the inline messages below instead of browser pop-ups
    const FIELDS = {
      name: 'Enter your name.',
      email: 'Enter a valid email address.',
      title: 'Add a title for your review.',
      property: 'Tell us which property you stayed at.',
      rating: 'Choose a star rating.',
      review: 'Write your review.',
    };
    const value = name => String(new FormData(reviewForm).get(name) || '').trim();
    const control = name => reviewForm.querySelector(`[name="${name}"]`);
    const isValid = name => value(name) !== '' && control(name).checkValidity();
    const showError = (name, show) => {
      const error = document.getElementById(`rv-${name}-error`);
      error.hidden = !show;
      error.textContent = show ? FIELDS[name] : '';
      if (name !== 'rating') control(name).setAttribute('aria-invalid', String(show));
    };

    // Star picker: fill the stars up to the chosen (or hovered) one
    const starLabels = [...reviewForm.querySelectorAll('.rating__star')];
    const paintStars = n => starLabels.forEach((star, i) => star.classList.toggle('is-on', i < n));
    starLabels.forEach((star, i) => star.addEventListener('mouseenter', () => paintStars(i + 1)));
    reviewForm.querySelector('.rating__stars').addEventListener('mouseleave', () => paintStars(Number(value('rating'))));

    const onEdit = e => {
      if (e.target.name === 'rating') paintStars(Number(value('rating')));
      if (FIELDS[e.target.name] && isValid(e.target.name)) showError(e.target.name, false);
    };
    reviewForm.addEventListener('input', onEdit);
    reviewForm.addEventListener('change', onEdit);

    reviewForm.addEventListener('submit', e => {
      e.preventDefault();
      const status = document.getElementById('review-status');
      const invalid = Object.keys(FIELDS).filter(name => !isValid(name));
      Object.keys(FIELDS).forEach(name => showError(name, invalid.includes(name)));
      if (invalid.length) {
        status.hidden = true;
        control(invalid[0]).focus();
        return;
      }
      const body = [
        `Name: ${value('name')}`,
        `Email: ${value('email')}`,
        `Property stayed at: ${value('property')}`,
        `Rating: ${value('rating')} out of 5`,
        `Review title: ${value('title')}`,
        '',
        value('review').replace(/\r?\n/g, '\r\n'),
      ].join('\r\n');
      const mailLink = status.querySelector('[data-review-mail]');
      mailLink.href = `${reviewForm.getAttribute('action')}?subject=${encodeURIComponent(`Guest review: ${value('title')}`)}&body=${encodeURIComponent(body)}`;
      status.hidden = false;
      status.focus();
      mailLink.click();
    });
  }

  // Vacation Rentals: once the booking iframe has loaded, make it as tall as the page inside it,
  // and keep it that way if that page changes size or the guest moves to another booking page.
  //
  // A browser only lets this page measure the iframe when both come from the same address (same
  // origin), e.g. both on destinpetcondos.com. Anywhere else, such as a local preview, the content
  // can't be read and the iframe keeps the height set in the HTML.
  //
  // The booking engine also resizes a same-origin iframe whose id contains "FrameAutoSize", leaving
  // about 150px spare below the content. FRAME_SPARE lets that stand so the two don't fight.
  const vrpFrame = document.getElementById('vrpFrameAutoSize');
  if (vrpFrame) {
    const FRAME_SPARE = 200; // blank space allowed below the content before the iframe is shortened
    let frameObserver;
    const frameBody = () => {
      try { return vrpFrame.contentDocument?.body || null; } catch (e) { return null; } // null when cross-origin
    };
    const fitFrame = () => {
      const body = frameBody();
      if (!body) return;
      const content = Math.ceil(Math.max(body.scrollHeight, body.offsetHeight, body.ownerDocument.documentElement.offsetHeight));
      if (!content) return; // nothing laid out yet (the blank page an iframe starts with)
      const current = vrpFrame.getBoundingClientRect().height;
      if (current < content || current > content + FRAME_SPARE) vrpFrame.style.height = `${content}px`;
    };
    const watchFrame = () => {
      frameObserver?.disconnect();
      const body = frameBody();
      if (!body) return;
      fitFrame();
      const Observer = vrpFrame.contentWindow.ResizeObserver;
      if (Observer) {
        frameObserver = new Observer(fitFrame);
        frameObserver.observe(body);
      }
    };
    vrpFrame.addEventListener('load', watchFrame); // fires for the first page and for every page opened inside the iframe
    watchFrame(); // in case the iframe finished loading before this script ran
  }
})();
