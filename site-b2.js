(() => {
  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const desktopNav = window.matchMedia('(min-width: 1180px)');

  // Mobile menu
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const setMenu = (open) => {
    mobileMenu.hidden = !open;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    root.classList.toggle('menu-open', open);
  };
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => setMenu(mobileMenu.hidden));
    mobileMenu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
    desktopNav.addEventListener('change', (e) => { if (e.matches) setMenu(false); });
  }

  // Desktop "More" dropdown
  const more = document.querySelector('.site-nav__more');
  const moreButton = more && more.querySelector('button');
  const setMore = (open) => {
    more.classList.toggle('is-open', open);
    moreButton.setAttribute('aria-expanded', String(open));
  };
  if (moreButton) {
    moreButton.addEventListener('click', () => setMore(!more.classList.contains('is-open')));
    document.addEventListener('click', (e) => { if (!more.contains(e.target)) setMore(false); });
    more.addEventListener('focusout', (e) => { if (!more.contains(e.relatedTarget)) setMore(false); });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (more && more.classList.contains('is-open')) { setMore(false); moreButton.focus(); }
    if (mobileMenu && !mobileMenu.hidden) { setMenu(false); menuToggle.focus(); }
  });

  // Hairline under the sticky header once the page has scrolled
  if (header) {
    const onScroll = () => header.classList.toggle('is-stuck', window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Vacation RentPro booking engine: let the frame's height follow its content.
  // Only possible when the page is served from the same domain as the engine;
  // elsewhere (local preview) the frame keeps the height set in the markup.
  const vrpFrame = document.getElementById('vrpFrameAutoSize');
  if (vrpFrame) {
    const frameBody = () => {
      try { return vrpFrame.contentDocument ? vrpFrame.contentDocument.body : null; } catch (e) { return null; }
    };
    const fit = () => {
      const body = frameBody();
      if (body && body.scrollHeight) vrpFrame.style.height = `${body.scrollHeight}px`;
    };
    vrpFrame.addEventListener('load', () => {
      const body = frameBody();
      if (!body) return;
      fit();
      new vrpFrame.contentWindow.ResizeObserver(fit).observe(body);
    });

    // The engine scrolls its frame into view whenever it loads a page. That helps once a visitor
    // is browsing inside it, but on arrival it would jump past the page heading, so hold the page
    // at the top until the first engine page has settled or the visitor does something.
    const nav = performance.getEntriesByType('navigation')[0];
    if (!location.hash && (!nav || nav.type === 'navigate')) {
      const inputs = ['wheel', 'touchstart', 'pointerdown', 'keydown', 'blur'];
      let holding = true;
      const hold = () => { if (holding && window.scrollY) window.scrollTo(0, 0); };
      const release = () => {
        holding = false;
        window.removeEventListener('scroll', hold);
        inputs.forEach((type) => window.removeEventListener(type, release));
      };
      window.addEventListener('scroll', hold, { passive: true });
      inputs.forEach((type) => window.addEventListener(type, release, { passive: true }));
      // Scroll events are not delivered while the tab is in the background, so check again here.
      vrpFrame.addEventListener('load', () => {
        hold();
        setTimeout(() => { hold(); release(); }, 1000);
      }, { once: true });
    }
  }
})();
