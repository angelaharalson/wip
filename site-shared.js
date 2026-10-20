// Shared behaviour for Destin Pet Friendly Condos: header menus on every page,
// plus the FAQ accordion, the Guest Reviews summary and form, and the booking iframe fit.
(function () {
  // ---------- Header: the mobile menu panel and the "More" submenu ----------
  var header = document.querySelector('.site-header');
  if (header) {
    var menuToggle = header.querySelector('.menu-toggle');
    var nav = header.querySelector('.site-nav');
    var moreToggle = header.querySelector('.site-nav__more-toggle');

    var isOpen = function (button) { return button.getAttribute('aria-expanded') === 'true'; };
    var setMenu = function (open) {
      menuToggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    };
    var setMore = function (open) { moreToggle.setAttribute('aria-expanded', String(open)); };

    menuToggle.addEventListener('click', function () { setMenu(!isOpen(menuToggle)); });
    moreToggle.addEventListener('click', function () { setMore(!isOpen(moreToggle)); });

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
  }

  // ---------- FAQ accordion ----------
  document.querySelectorAll('.faq__q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', String(open));
      document.getElementById(btn.getAttribute('aria-controls')).hidden = !open;
    });
  });

  // ---------- Guest Reviews: average rating and count from the published reviews ----------
  var reviewRatings = Array.prototype.slice.call(document.querySelectorAll('[data-review-list] [data-rating]'))
    .map(function (el) { return Number(el.dataset.rating); })
    .filter(function (n) { return n >= 1 && n <= 5; });
  if (reviewRatings.length) {
    var avg = (reviewRatings.reduce(function (a, b) { return a + b; }, 0) / reviewRatings.length).toFixed(1);
    var avgStars = document.querySelector('[data-review-avg-stars]');
    avgStars.style.setProperty('--rating', avg);
    avgStars.setAttribute('aria-label', 'Average rating: ' + avg + ' out of 5 stars');
    document.querySelector('[data-review-avg]').textContent = avg;
    document.querySelector('[data-review-count]').textContent = reviewRatings.length + ' review' + (reviewRatings.length === 1 ? '' : 's');
  }

  // ---------- Guest Reviews: "write a review" form ----------
  // There is no server to store reviews, so a valid form opens the guest's email app
  // with the review filled in, addressed to the form's mailto action.
  var reviewForm = document.getElementById('review-form');
  if (reviewForm) {
    reviewForm.noValidate = true; // inline messages instead of browser pop-ups
    var FIELDS = {
      name: 'Enter your name.',
      email: 'Enter a valid email address.',
      title: 'Add a title for your review.',
      property: 'Tell us which property you stayed at.',
      rating: 'Choose a star rating.',
      review: 'Write your review.'
    };
    var value = function (name) { return String(new FormData(reviewForm).get(name) || '').trim(); };
    var control = function (name) { return reviewForm.querySelector('[name="' + name + '"]'); };
    var isValid = function (name) { return value(name) !== '' && control(name).checkValidity(); };
    var showError = function (name, show) {
      var error = document.getElementById('rv-' + name + '-error');
      error.hidden = !show;
      error.textContent = show ? FIELDS[name] : '';
      if (name !== 'rating') control(name).setAttribute('aria-invalid', String(show));
    };

    // Star picker: fill the stars up to the chosen (or hovered) one
    var starLabels = Array.prototype.slice.call(reviewForm.querySelectorAll('.rating__star'));
    var paintStars = function (n) { starLabels.forEach(function (star, i) { star.classList.toggle('is-on', i < n); }); };
    starLabels.forEach(function (star, i) { star.addEventListener('mouseenter', function () { paintStars(i + 1); }); });
    reviewForm.querySelector('.rating__stars').addEventListener('mouseleave', function () { paintStars(Number(value('rating'))); });

    var onEdit = function (e) {
      if (e.target.name === 'rating') paintStars(Number(value('rating')));
      if (FIELDS[e.target.name] && isValid(e.target.name)) showError(e.target.name, false);
    };
    reviewForm.addEventListener('input', onEdit);
    reviewForm.addEventListener('change', onEdit);

    reviewForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = document.getElementById('review-status');
      var invalid = Object.keys(FIELDS).filter(function (name) { return !isValid(name); });
      Object.keys(FIELDS).forEach(function (name) { showError(name, invalid.indexOf(name) !== -1); });
      if (invalid.length) {
        status.hidden = true;
        control(invalid[0]).focus();
        return;
      }
      var body = [
        'Name: ' + value('name'),
        'Email: ' + value('email'),
        'Property stayed at: ' + value('property'),
        'Rating: ' + value('rating') + ' out of 5',
        'Review title: ' + value('title'),
        '',
        value('review').replace(/\r?\n/g, '\r\n')
      ].join('\r\n');
      var mailLink = status.querySelector('[data-review-mail]');
      mailLink.href = reviewForm.getAttribute('action') + '?subject=' + encodeURIComponent('Guest review: ' + value('title')) + '&body=' + encodeURIComponent(body);
      status.hidden = false;
      status.focus();
      mailLink.click();
    });
  }

  // ---------- Vacation Rentals: size the booking iframe to the page inside it ----------
  // Only possible when the iframe is same-origin (both on destinpetcondos.com); elsewhere
  // the iframe keeps the height set in the HTML. The booking engine also resizes an iframe
  // whose id contains "FrameAutoSize", leaving about 150px spare; FRAME_SPARE lets that stand.
  var vrpFrame = document.getElementById('vrpFrameAutoSize');
  if (vrpFrame) {
    var FRAME_SPARE = 200;
    var frameObserver;
    var frameBody = function () {
      try { return (vrpFrame.contentDocument && vrpFrame.contentDocument.body) || null; } catch (e) { return null; }
    };
    var fitFrame = function () {
      var body = frameBody();
      if (!body) return;
      var content = Math.ceil(Math.max(body.scrollHeight, body.offsetHeight, body.ownerDocument.documentElement.offsetHeight));
      if (!content) return;
      var current = vrpFrame.getBoundingClientRect().height;
      if (current < content || current > content + FRAME_SPARE) vrpFrame.style.height = content + 'px';
    };
    var watchFrame = function () {
      if (frameObserver) frameObserver.disconnect();
      var body = frameBody();
      if (!body) return;
      fitFrame();
      var Observer = vrpFrame.contentWindow.ResizeObserver;
      if (Observer) {
        frameObserver = new Observer(fitFrame);
        frameObserver.observe(body);
      }
    };
    vrpFrame.addEventListener('load', watchFrame);
    watchFrame();
  }
})();
