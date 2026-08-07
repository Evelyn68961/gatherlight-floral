/* ==========================================================================
   quickview.js — 商品快速預覽
   The product grid stays static HTML (it must work without JS); this module
   layers a modal on top, pulling the visible card content plus the extra
   detail held in PRODUCTS below.

   The modal reads the visible card for anything already on screen (name,
   price, image) and only stores the extra detail here, so the two cannot
   disagree about a price.
   ========================================================================== */

var PRODUCTS = {
  'spring-bouquet': {
    story: '以陶土色玫瑰為主，配上尤加利與當季綠葉。顏色偏暖，適合祝賀與開幕這種需要一點溫度、又不能太甜的場合。',
    size: '高約 45cm・直徑 30cm',
    stems: '玫瑰、尤加利、季節綠葉',
    care: '每兩天換水並斜剪 1cm，約可放 7 天',
    lead: '台北市區可當日配送'
  },
  'white-green-bouquet': {
    story: '只用白與綠。乾淨、安靜、不會出錯，是探病與正式場合最保險的選擇，也很常被拿來當作道歉的花。',
    size: '高約 50cm・直徑 32cm',
    stems: '桔梗、白玫瑰、尤加利',
    care: '每兩天換水並斜剪 1cm，約可放 7–10 天',
    lead: '需提前 1 天預訂'
  },
  'table-arrangement': {
    story: '附陶盆，海綿已吸飽水，收到後直接擺著就好，不需要修剪也不用換水。辦公桌、櫃檯、床頭櫃都放得下。',
    size: '高約 25cm・盆徑 14cm',
    stems: '季節花材混搭',
    care: '每 2–3 天於盆中加水約 50ml',
    lead: '台北市區可當日配送'
  },
  'potted-greens': {
    story: '耐陰、好照顧、不容易死。送給剛開幕或剛搬家的人很合適，因為他們通常沒空照顧植物。',
    size: '高約 40cm・盆徑 18cm',
    stems: '常春藤、黃金葛、觀葉組合',
    care: '土乾了再澆，避免陽光直射',
    lead: '需提前 2 天預訂'
  },
  'dried-bouquet': {
    story: '不用澆水也不會謝，可以放一年以上。適合當空間佈置，或送給不想照顧鮮花的人。',
    size: '高約 40cm・直徑 25cm',
    stems: '兔尾草、卡斯比亞、乾燥尤加利',
    care: '避免潮濕與陽光直射，勿沾水',
    lead: '現貨，可當日取件'
  },
  'subscription': {
    story: '每週一束當季花材，可以指定色系。想暫停就暫停，不綁約——出國、忙、暫時不想收花都可以直接說。',
    size: '每束約 20 枝',
    stems: '依當季供應調整',
    care: '附換水與修剪說明卡',
    lead: '每週固定配送，可指定星期'
  }
};

(function () {
  'use strict';

  var grid = document.getElementById('productGrid');
  var modal = document.getElementById('quickView');
  if (!grid || !modal) return;

  var lastFocus = null;

  /* Injected, not authored: the button is useless without JS. */
  function injectButtons() {
    grid.querySelectorAll('.product').forEach(function (card) {
      var media = card.querySelector('.product__media');
      if (!media || media.querySelector('.qv-btn')) return;

      var name = card.querySelector('.product__name');
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'qv-btn';
      btn.textContent = '快速預覽';
      btn.setAttribute('aria-label', '快速預覽：' + (name ? name.textContent.trim() : ''));
      btn.addEventListener('click', function () { open(card); });
      media.appendChild(btn);
    });
  }

  function text(card, sel) {
    var el = card.querySelector(sel);
    return el ? el.textContent.trim() : '';
  }

  function open(card) {
    var id = card.dataset.id;
    var extra = PRODUCTS[id] || {};
    var img = card.querySelector('img');

    modal.querySelector('#qvImg').src = img ? img.getAttribute('src') : '';
    modal.querySelector('#qvImg').alt = img ? img.getAttribute('alt') : '';
    modal.querySelector('#qvTag').textContent = text(card, '.product__tag');
    modal.querySelector('#qvName').textContent = text(card, '.product__name');
    modal.querySelector('#qvDesc').textContent = extra.story || text(card, '.product__desc');
    modal.querySelector('#qvPrice').textContent = text(card, '.product__price');

    modal.querySelector('#qvSize').textContent = extra.size || '—';
    modal.querySelector('#qvStems').textContent = extra.stems || '—';
    modal.querySelector('#qvCare').textContent = extra.care || '—';
    modal.querySelector('#qvLead').textContent = extra.lead || '—';

    lastFocus = document.activeElement;
    modal.setAttribute('data-open', '');
    modal.querySelector('.modal__close').focus();
  }

  function close() {
    modal.removeAttribute('data-open');
    if (lastFocus) lastFocus.focus();
  }

  modal.querySelector('.modal__scrim').addEventListener('click', close);
  modal.querySelector('.modal__close').addEventListener('click', close);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.hasAttribute('data-open')) close();
  });

  injectButtons();
})();
