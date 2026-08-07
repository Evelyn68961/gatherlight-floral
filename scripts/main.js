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
  /* Filtering is additive: with the script removed the full product grid
     still renders, so the page degrades to a plain list rather than breaking. */
  function initFilter() {
    var chipBox = document.getElementById('filterChips');
    var grid = document.getElementById('productGrid');
    var empty = document.getElementById('emptyState');
    if (!chipBox || !grid) return;

    var chips = Array.prototype.slice.call(chipBox.querySelectorAll('.chip'));
    var products = Array.prototype.slice.call(grid.querySelectorAll('.product'));

    chipBox.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;

      var filter = chip.dataset.filter;
      chips.forEach(function (c) {
        c.setAttribute('aria-pressed', String(c === chip));
      });

      var shown = 0;
      products.forEach(function (p) {
        var match = filter === 'all' || p.dataset.category === filter;
        p.hidden = !match;
        if (match) shown++;
      });

      if (empty) empty.hidden = shown > 0;
    });
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
