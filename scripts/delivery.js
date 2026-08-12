/* ==========================================================================
   delivery.js — 送達日篩選與排序
   For flowers, *when* is as load-bearing as *what*: a birthday bouquet that
   arrives on Thursday is worth nothing if the birthday was Tuesday. The site
   used to state a lead time inside the quick-view and then never let anyone
   act on it. This turns that lead time into something you can filter by.

   Two rules do the real work, and both come from data already on the page:

     Opening days — the Florist JSON-LD says Tuesday–Saturday, so Sunday and
     Monday are not delivery days. The earliest date rolls forward past them.

     Same-day cut-off — 15:00. Order a same-day item after that and the
     earliest date is tomorrow, which is how every florist in Taipei actually
     works. Saying 「當日配送」 at 23:00 is a promise the shop cannot keep.

   Everything here is injected. The controls cannot work without JS, and every
   date they show depends on what today is — a date baked into static HTML
   would be wrong the next morning.
   ========================================================================== */

(function () {
  'use strict';

  var OPEN_DAYS = [2, 3, 4, 5, 6];   // Tue–Sat, matching the JSON-LD
  var CUTOFF_HOUR = 15;
  var WEEKDAY = ['日', '一', '二', '三', '四', '五', '六'];
  var HORIZON_DAYS = 90;

  var grid = document.getElementById('productGrid');
  var empty = document.getElementById('emptyState');
  if (!grid) return;

  var products = Array.prototype.slice.call(grid.querySelectorAll('.product'));
  if (!products.length) return;

  var emptyDefault = empty ? empty.textContent : '';

  /* ------------------------------------------------------------- dates */
  function midnight(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  function addDays(d, n) {
    var out = new Date(d.getTime());
    out.setDate(out.getDate() + n);
    return out;
  }

  function isOpenDay(d) {
    return OPEN_DAYS.indexOf(d.getDay()) !== -1;
  }

  /* Earliest date a product with this lead time can arrive. Returns null for
     the subscription, which is not a one-off delivery and so has no ETA. */
  function earliest(lead) {
    if (lead === 'sub') return null;
    var now = new Date();
    var days = Number(lead);
    if (isNaN(days)) days = 0;

    var d = midnight(now);
    if (days === 0) {
      // Same-day only counts if there is still a working afternoon left.
      if (now.getHours() >= CUTOFF_HOUR) d = addDays(d, 1);
    } else {
      d = addDays(d, days);
    }
    // Roll past 公休日. Bounded so a bad OPEN_DAYS can't spin forever.
    for (var i = 0; i < 14 && !isOpenDay(d); i++) d = addDays(d, 1);
    return d;
  }

  function fmt(d) {
    return (d.getMonth() + 1) + '/' + d.getDate() + '（' + WEEKDAY[d.getDay()] + '）';
  }

  function iso(d) {
    var m = String(d.getMonth() + 1);
    var day = String(d.getDate());
    return d.getFullYear() + '-' + (m.length < 2 ? '0' + m : m) +
           '-' + (day.length < 2 ? '0' + day : day);
  }

  function parseISO(s) {
    var parts = String(s).split('-');
    if (parts.length !== 3) return null;
    var d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return isNaN(d.getTime()) ? null : d;
  }

  function price(card) {
    var el = card.querySelector('.product__price');
    var digits = el ? el.textContent.replace(/[^0-9]/g, '') : '';
    return digits ? Number(digits) : Infinity;
  }

  /* --------------------------------------------------------- ETA badges */
  function injectEtas() {
    products.forEach(function (card) {
      var priceEl = card.querySelector('.product__price');
      if (!priceEl || card.querySelector('.product__eta')) return;

      var d = earliest(card.dataset.lead);
      var p = document.createElement('p');
      p.className = 'product__eta';
      /* A space before the date but none after it: 「最快 8/13」 needs one because
         a digit follows Chinese, while fmt() already ends in a full-width ）,
         and a space between two full-width characters is just a hole. */
      p.textContent = d ? '最快 ' + fmt(d) + '送達' : '訂閱制，配送日另約';
      priceEl.parentNode.insertBefore(p, priceEl.nextSibling);
    });
  }

  /* ----------------------------------------------------------- controls */
  var dateInput, clearBtn, sortSelect, note;

  function buildControls() {
    var row = document.createElement('div');
    row.className = 'filter-row filter-row--delivery';

    var label = document.createElement('span');
    label.className = 'filter-row__label';
    label.textContent = '送達日';
    row.appendChild(label);

    var controls = document.createElement('div');
    controls.className = 'deliv';

    var today = midnight(new Date());
    dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'delivDate';
    dateInput.className = 'deliv__date';
    dateInput.min = iso(today);
    dateInput.max = iso(addDays(today, HORIZON_DAYS));
    dateInput.setAttribute('aria-label', '希望送達日期');

    clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className = 'deliv__clear';
    clearBtn.textContent = '清除日期';
    clearBtn.hidden = true;

    sortSelect = document.createElement('select');
    sortSelect.id = 'delivSort';
    sortSelect.className = 'deliv__sort';
    sortSelect.setAttribute('aria-label', '排序方式');
    [['default', '推薦排序'], ['soonest', '最快可送達'], ['price', '價格由低到高']]
      .forEach(function (o) {
        var opt = document.createElement('option');
        opt.value = o[0];
        opt.textContent = o[1];
        sortSelect.appendChild(opt);
      });

    note = document.createElement('p');
    note.className = 'deliv__note';
    note.textContent = '週日與週一公休，' + CUTOFF_HOUR + ':00 後下單順延一天。';

    controls.appendChild(dateInput);
    controls.appendChild(sortSelect);
    controls.appendChild(clearBtn);
    controls.appendChild(note);
    row.appendChild(controls);

    // Sits directly above the grid, below the two chip rows.
    grid.parentNode.insertBefore(row, grid);
  }

  /* ------------------------------------------------------------- apply */
  /* Writes data-deliverable and hands off to main.js, which owns `hidden`. */
  function applyDate() {
    var want = dateInput.value ? parseISO(dateInput.value) : null;
    clearBtn.hidden = !want;

    products.forEach(function (card) {
      if (!want) {
        delete card.dataset.deliverable;
        card.classList.remove('is-late');
        return;
      }
      var d = earliest(card.dataset.lead);
      /* The subscription is exempt from the lead-time comparison — it has no
         single delivery date to compare against — but not from 公休. Nothing
         is deliverable on a day the studio is shut, subscription included. */
      var ok = isOpenDay(want) && (d === null || d.getTime() <= want.getTime());
      card.dataset.deliverable = ok ? '1' : '0';
    });

    if (empty) {
      empty.textContent = want && !isOpenDay(want)
        ? '週日與週一公休，這兩天沒有配送，請改選其他日期。'
        : emptyDefault;
    }

    grid.dispatchEvent(new CustomEvent('gl:delivery-change', { bubbles: true }));
  }

  function applySort() {
    var mode = sortSelect.value;
    var order = products.slice();

    if (mode === 'soonest') {
      order.sort(function (a, b) {
        var da = earliest(a.dataset.lead);
        var db = earliest(b.dataset.lead);
        // No ETA (subscription) sorts last rather than pretending to be instant.
        if (!da && !db) return 0;
        if (!da) return 1;
        if (!db) return -1;
        return da.getTime() - db.getTime();
      });
    } else if (mode === 'price') {
      order.sort(function (a, b) { return price(a) - price(b); });
    }

    order.forEach(function (card) { grid.appendChild(card); });
  }

  /* -------------------------------------------------------------- init */
  injectEtas();
  buildControls();

  dateInput.addEventListener('change', applyDate);
  clearBtn.addEventListener('click', function () {
    dateInput.value = '';
    applyDate();
    dateInput.focus();
  });
  sortSelect.addEventListener('change', applySort);
})();
