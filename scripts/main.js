/* ==========================================================================
   main.js — 拾光花室
   Interactions are split into independent init functions on purpose: the case
   description only specifies 切版 + RWD, so any of these may be out of scope.
   Removing one function + its call is enough to drop that feature cleanly.
   ========================================================================== */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------ 1. Header + mobile nav */
  function initHeader() {
    var header = document.getElementById('header');
    var toggle = document.getElementById('navToggle');
    var nav = document.getElementById('nav');
    if (!header || !toggle || !nav) return;

    // Shadow once the page has scrolled away from the top.
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    var close = function () {
      nav.removeAttribute('data-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      if (open) {
        close();
      } else {
        nav.setAttribute('data-open', 'true');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });

    // Tapping a link inside the open mobile panel should close it.
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        close();
        toggle.focus();
      }
    });

    // Leaving the mobile breakpoint must not strand the panel in a half state.
    window.matchMedia('(min-width: 901px)').addEventListener('change', close);
  }

  /* ------------------------------------------------------- 2. Scroll spy */
  /* Smooth scrolling itself is CSS (scroll-behavior + scroll-padding-top).
     This only maintains the active nav state. */
  function initScrollSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));
    if (!links.length || !('IntersectionObserver' in window)) return;

    var map = {};
    var sections = [];
    links.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var section = document.getElementById(id);
      if (section) {
        map[id] = link;
        sections.push(section);
      }
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) { l.classList.remove('is-active'); });
        var active = map[entry.target.id];
        if (active) active.classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* --------------------------------------------------- 3. Product filter */
  /* Three independent dimensions, ANDed together:
       occasion — why you're buying (生日 / 探病 / 開幕…)
       category — what the thing is (花束 / 盆花 / 乾燥花…)
       delivery — whether it can arrive by the date you picked
     Occasion comes first deliberately. People shop for flowers by the reason,
     not the format — nobody wakes up wanting "a 盆花", they want something for
     a friend in hospital. A product carries several occasions, so the match is
     a membership test rather than equality.

     The delivery dimension is owned by scripts/delivery.js, which writes
     data-deliverable onto each card and then fires gl:delivery-change. Only
     this function ever touches `hidden`, so there is exactly one owner of
     visibility no matter how many dimensions get added later.

     Filtering is additive: with the script removed the full grid still renders,
     so the page degrades to a plain list rather than breaking. */
  function initFilter() {
    var catBox = document.getElementById('filterChips');
    var occBox = document.getElementById('occasionChips');
    var grid = document.getElementById('productGrid');
    var empty = document.getElementById('emptyState');
    if (!catBox || !grid) return;

    var products = Array.prototype.slice.call(grid.querySelectorAll('.product'));
    var state = { category: 'all', occasion: 'all' };

    function apply() {
      var shown = 0;
      products.forEach(function (p) {
        var catOk = state.category === 'all' || p.dataset.category === state.category;
        var occs = (p.dataset.occasion || '').split(' ');
        var occOk = state.occasion === 'all' || occs.indexOf(state.occasion) !== -1;
        // Absent attribute means no date has been picked yet — show everything.
        var dateOk = p.dataset.deliverable !== '0';
        var match = catOk && occOk && dateOk;
        p.hidden = !match;
        if (match) shown++;
      });
      if (empty) empty.hidden = shown > 0;
    }

    grid.addEventListener('gl:delivery-change', apply);

    function wire(box, key, attr) {
      if (!box) return;
      var chips = Array.prototype.slice.call(box.querySelectorAll('.chip'));
      box.addEventListener('click', function (e) {
        var chip = e.target.closest('.chip');
        if (!chip) return;
        state[key] = chip.dataset[attr];
        chips.forEach(function (c) {
          c.setAttribute('aria-pressed', String(c === chip));
        });
        apply();
      });
    }

    wire(catBox, 'category', 'filter');
    wire(occBox, 'occasion', 'occasion');

    /* The quick-find band's 「我想送禮」 deep-links here with an occasion. */
    var hash = window.location.hash;
    if (hash.indexOf('#products') === 0 && hash.indexOf('=') > -1) {
      var want = hash.split('=')[1];
      var target = occBox && occBox.querySelector('.chip[data-occasion="' + want + '"]');
      if (target) target.click();
    }

    apply();
  }

  /* ------------------------------------------------------ 4. Reveal on scroll */
  function initReveal() {
    var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    if (!items.length) return;

    // No observer support, or the user asked for less motion: show everything.
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* -------------------------------------------------- 5. Contact form */
  /* Front-end validation and status only — no backend is wired up.
     Pending client confirmation on whether real sending is in scope. */
  function initForm() {
    var form = document.getElementById('contactForm');
    var status = document.getElementById('formStatus');
    if (!form) return;

    var rules = {
      name: function (v) { return v.trim() ? '' : '請填寫姓名'; },
      contact: function (v) {
        if (!v.trim()) return '請留下 Email 或手機號碼';
        var email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
        var phone = /^[0-9+\-() ]{8,}$/.test(v.trim());
        return email || phone ? '' : '請填寫正確的 Email 或手機號碼';
      },
      message: function (v) { return v.trim().length >= 5 ? '' : '請簡單說明需求（至少 5 個字）'; }
    };

    function validateField(input) {
      var rule = rules[input.name];
      if (!rule) return true;
      var msg = rule(input.value);
      var field = input.closest('.field');
      var errorEl = document.getElementById(input.id + '-error');
      if (field) field.classList.toggle('is-invalid', Boolean(msg));
      if (errorEl) errorEl.textContent = msg;
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      return !msg;
    }

    Object.keys(rules).forEach(function (name) {
      var input = form.elements[name];
      if (!input) return;
      // Only nag after the first blur, not on every keystroke.
      input.addEventListener('blur', function () { validateField(input); });
      input.addEventListener('input', function () {
        if (input.closest('.field').classList.contains('is-invalid')) validateField(input);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var firstInvalid = null;
      Object.keys(rules).forEach(function (name) {
        var input = form.elements[name];
        if (input && !validateField(input) && !firstInvalid) firstInvalid = input;
      });

      if (firstInvalid) {
        if (status) status.hidden = true;
        firstInvalid.focus();
        return;
      }

      if (status) {
        status.textContent = '已收到您的諮詢，我們會在 1–2 個工作天內回覆。';
        status.hidden = false;
      }
      form.reset();
    });
  }

  /* ------------------------------------------------------------- boot */
  function init() {
    initHeader();
    initScrollSpy();
    initFilter();
    initReveal();
    initForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
