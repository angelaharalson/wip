// Header behaviour: the mobile menu panel and the "More" submenu.
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;

  var menuToggle = header.querySelector('.menu-toggle');
  var nav = header.querySelector('.site-nav');
  var moreToggle = header.querySelector('.site-nav__more-toggle');

  function isOpen(button) {
    return button.getAttribute('aria-expanded') === 'true';
  }

  function setMenu(open) {
    menuToggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  }

  function setMore(open) {
    moreToggle.setAttribute('aria-expanded', String(open));
  }

  menuToggle.addEventListener('click', function () {
    setMenu(!isOpen(menuToggle));
  });

  moreToggle.addEventListener('click', function () {
    setMore(!isOpen(moreToggle));
  });

  document.addEventListener('click', function (event) {
    if (!moreToggle.parentNode.contains(event.target)) setMore(false);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    if (isOpen(moreToggle)) {
      setMore(false);
      moreToggle.focus();
    } else if (isOpen(menuToggle)) {
      setMenu(false);
      menuToggle.focus();
    }
  });
})();
