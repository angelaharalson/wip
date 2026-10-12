// Header menus: the mobile nav panel and the desktop "More" dropdown.
(() => {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const navToggle = header.querySelector('.nav-toggle');
  const more = header.querySelector('.nav-more');
  const moreToggle = more.querySelector('.nav-more__toggle');

  const setNav = (open) => {
    header.classList.toggle('is-nav-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  };
  const setMore = (open) => {
    more.classList.toggle('is-open', open);
    moreToggle.setAttribute('aria-expanded', String(open));
  };

  navToggle.addEventListener('click', () => setNav(!header.classList.contains('is-nav-open')));
  moreToggle.addEventListener('click', () => setMore(!more.classList.contains('is-open')));

  document.addEventListener('click', (event) => {
    if (!more.contains(event.target)) setMore(false);
    if (!header.contains(event.target)) setNav(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (more.classList.contains('is-open')) {
      setMore(false);
      moreToggle.focus();
    }
    if (header.classList.contains('is-nav-open')) {
      setNav(false);
      navToggle.focus();
    }
  });
})();
