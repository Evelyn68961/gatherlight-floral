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
    story: '附陶盆，海綿已吸飽水，收到後直接擺著就好，不需要修剪也不用換水。辦公桌、櫃檯、病房床頭櫃都放得下。',
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
  },
  'blush-rose-bouquet': {
    story: '霧粉色玫瑰配上淺紫繡球，顏色很淡但不會沒精神。生日送這束的人最多，自己買回家放客廳也很合理。',
    size: '高約 45cm・直徑 32cm',
    stems: '玫瑰、繡球、松蟲草',
    care: '每兩天換水並斜剪 1cm，約可放 5–7 天',
    lead: '台北市區可當日配送'
  },
  'mini-bouquet': {
    story: '單手拿得住，不會讓收的人覺得有負擔。臨時要探病、道謝、幫同事慶生的時候最實用，也是店裡賣最好的品項。',
    size: '高約 30cm・直徑 20cm',
    stems: '季節花材 5–7 枝',
    care: '每兩天換水並斜剪 1cm，約可放 5 天',
    lead: '台北市區可當日配送'
  },
  'lily-bouquet': {
    story: '純白百合配桔梗，不加任何彩色花材。用在追思與正式致意的場合，也可以指定不附卡片、不具名送出。',
    size: '高約 55cm・直徑 34cm',
    stems: '白百合、桔梗、文竹',
    care: '每兩天換水並斜剪 1cm，花苞會陸續開',
    lead: '需提前 1 天預訂'
  },
  'celebration-box': {
    story: '花材已固定在吸水海綿上，收到直接擺就好，不用找花瓶。開幕送到店裡、生日送到辦公室都不會造成對方困擾。',
    size: '盒身 24×24cm・高約 30cm',
    stems: '玫瑰、康乃馨、尤加利',
    care: '每 2–3 天於盒內加水約 80ml',
    lead: '需提前 1 天預訂'
  },
  'desk-succulent': {
    story: '放在螢幕旁邊剛剛好的尺寸。兩週澆一次水，忘記了也不太會死，送給不會照顧植物的人很安全。',
    size: '高約 15cm・盆徑 10cm',
    stems: '石蓮、玉露等多肉組合',
    care: '兩週澆一次，澆透即可',
    lead: '現貨，可當日取件'
  },
  'orchid-pot': {
    story: '雙梗蝴蝶蘭，附木質盆器與祝賀立牌。開幕、就職、喬遷最常見的選擇，花期通常可以撐一個月以上。',
    size: '高約 60cm・盆徑 20cm',
    stems: '蝴蝶蘭雙梗、水苔',
    care: '每 7–10 天澆水一次，避免積水',
    lead: '需提前 2 天預訂'
  },
  'recovery-pot': {
    story: '刻意選無香或極淡香的花材，也不用花瓶——病房通常沒地方放，護理站也不見得允許。顏色壓在淺黃與白之間。',
    size: '高約 28cm・盆徑 16cm',
    stems: '小菊、桔梗、綠葉',
    care: '每 2–3 天於盆中加水約 60ml',
    lead: '需提前 1 天預訂'
  },
  'memorial-pot': {
    story: '只用白與綠，形制端正，可以直接放在靈堂或家中。需要具名或不具名、要不要附輓聯，訂購時都可以指定。',
    size: '高約 45cm・盆徑 22cm',
    stems: '白菊、白桔梗、文竹',
    care: '每 2–3 天於盆中加水約 80ml',
    lead: '需提前 1 天預訂'
  },
  'dried-wreath': {
    story: '不上色，保留花材本來的顏色。掛在門上或牆面都可以，開幕送店家很常見，因為完全不用照顧。',
    size: '直徑約 30cm',
    stems: '尤加利、卡斯比亞、麥桿菊',
    care: '避免潮濕與陽光直射，勿沾水',
    lead: '需提前 1 天預訂'
  },
  'dried-jar': {
    story: '含玻璃瓶，拿到就能擺。價格最低的一個品項，常被拿來當作小禮物或婚禮小物。',
    size: '高約 22cm・瓶徑 8cm',
    stems: '兔尾草、星辰花、乾燥尤加利',
    care: '避免潮濕，勿沾水',
    lead: '現貨，可當日取件'
  },
  'preserved-box': {
    story: '以永生花製作，不會枯萎，正常環境下可以放兩年以上。送給不方便照顧鮮花的人，或想留久一點的場合。',
    size: '盒身 20×20cm・高約 12cm',
    stems: '永生玫瑰、繡球、乾燥花材',
    care: '避免潮濕與陽光直射，勿沾水',
    lead: '需提前 2 天預訂'
  },
  'subscription-biweekly': {
    story: '每兩週配送一次。很多人訂了每週後發現花還沒謝就又來一束，這個方案就是為了那些人開的。',
    size: '每束約 18 枝',
    stems: '依當季供應調整',
    care: '附換水與修剪說明卡',
    lead: '每兩週配送，可指定星期'
  },
  'subscription-office': {
    story: '含花器租用與到府更換，配色會依空間光線與品牌色調整。可開立發票、可月結，續約與異動走書面。',
    size: '依空間規劃 2–4 處',
    stems: '依當季供應與空間色調規劃',
    care: '由我們到府更換與維護',
    lead: '每週固定到府，可指定星期'
  },
  'sunflower-bouquet': {
    story: '探病不是每次都要選淡色。想讓對方精神一點的時候，向日葵比白花有用，配上綠葉不會太吵。',
    size: '高約 48cm・直徑 30cm',
    stems: '向日葵、桔梗、綠葉',
    care: '每兩天換水並斜剪 1cm，約可放 7 天',
    lead: '需提前 1 天預訂'
  },
  'fruit-flower-box': {
    story: '一半鮮花一半當季水果。探病時比純花實用，開幕送到店裡也方便分給員工。水果依當日市場調整。',
    size: '盒身 32×24cm',
    stems: '季節花材、當季水果 4–5 樣',
    care: '水果請冷藏，花材每 2 天加水',
    lead: '需提前 1 天預訂'
  },
  'dried-white-bunch': {
    story: '漂白過的卡斯比亞配乾燥尤加利，顏色只有白與灰綠。追思場合用得上，放家裡也不會太搶眼。',
    size: '高約 42cm・直徑 26cm',
    stems: '漂白卡斯比亞、乾燥尤加利、棉花',
    care: '避免潮濕與陽光直射，勿沾水',
    lead: '現貨，可當日取件'
  },
  'dried-wreath-large': {
    story: '直徑 45cm，掛在店面主牆或玄關都撐得住場面。開幕送這個的好處是完全不用照顧，店家不會有壓力。',
    size: '直徑約 45cm',
    stems: '尤加利、卡斯比亞、麥桿菊、松果',
    care: '避免潮濕與陽光直射，勿沾水',
    lead: '需提前 2 天預訂'
  },
  'dried-diy-kit': {
    story: '散裝花材、麻繩與牛皮紙，附一張圖解說明。想自己動手、或當作送小朋友的禮物都可以，綁壞了也不心疼。',
    size: '成品約高 30cm',
    stems: '兔尾草、星辰花、乾燥尤加利、滿天星',
    care: '避免潮濕，勿沾水',
    lead: '現貨，可當日取件'
  },
  'mini-box': {
    story: '單手就能拿的尺寸，放在病床邊的小桌或辦公桌都不佔位子。不用花瓶，也不用每天換水。',
    size: '盒身 14×14cm・高約 16cm',
    stems: '季節花材混搭',
    care: '每 2–3 天於盒內加水約 40ml',
    lead: '台北市區可當日配送'
  },
  'carnation-box': {
    story: '以康乃馨為主，配上滿天星與尤加利。母親節前兩週是全年最忙的時候，那段期間請至少提前一週預訂。',
    size: '盒身 22×22cm・高約 26cm',
    stems: '康乃馨、滿天星、尤加利',
    care: '每 2–3 天於盒內加水約 60ml',
    lead: '需提前 1 天預訂'
  },
  'memorial-box': {
    story: '只用白與綠，形制端正，可以直接送到會場。要不要具名、要不要附卡片，訂購時都可以指定。',
    size: '盒身 28×20cm・高約 24cm',
    stems: '白菊、白桔梗、文竹',
    care: '每 2–3 天於盒內加水約 80ml',
    lead: '需提前 1 天預訂'
  },
  'subscription-monthly': {
    story: '一個月一束。很多人想試訂閱又怕花太多、用不完，這個方案就是給那些人的起點，隨時可以升級或停掉。',
    size: '每束約 12 枝',
    stems: '依當季供應調整',
    care: '附換水與修剪說明卡',
    lead: '每月配送一次，可指定週次'
  },
  'subscription-shop': {
    story: '專為櫃檯與收銀台設計的小尺寸，不擋視線也不佔工作空間。含花器租用與每週到府更換。',
    size: '每處約高 25cm',
    stems: '依當季供應與店內色調規劃',
    care: '由我們到府更換與維護',
    lead: '每週固定到府，可指定星期'
  },
  'subscription-dried': {
    story: '每一季換一次乾燥花佈置。適合沒有人手照顧鮮花、又不想讓空間一成不變的店家，成本也比週花低很多。',
    size: '依空間規劃 2–3 處',
    stems: '乾燥與永生花材，依季節主題調整',
    care: '由我們到府更換與維護',
    lead: '每季到府更換一次'
  }
};

(function () {
  'use strict';

  var grid = document.getElementById('productGrid');
  var modal = document.getElementById('quickView');
  if (!grid || !modal) return;

  var panel = modal.querySelector('.modal__panel');
  var lastFocus = null;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --------------------------------------------------------- scroll lock */
  /* Without this the page behind the scrim still scrolls on wheel and
     trackpad, so the modal sits still while the whole site slides around
     underneath it.

     `overflow: hidden` on <body> — not `position: fixed`, and not on <html>.
     Both of those break the sticky header: taking body out of flow drops the
     header back to its natural, already scrolled past, position, and setting
     overflow on the root propagates it to the viewport, which stops the root
     being the scrollport `position: sticky` resolves against. Measured in
     Chrome at scrollY 600, html{overflow:hidden} put the header's viewport
     top at -600 — un-stuck — while body{overflow:hidden} left it at 0 and
     blocked real wheel input just as effectively.

     Hiding the scrollbar also widens the viewport, so the width it gave up is
     handed to body as padding; without that the entire layout shifts sideways
     the moment the modal opens. */
  function lockScroll() {
    var bar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (bar > 0) document.body.style.paddingRight = bar + 'px';
  }

  function unlockScroll() {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

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
    lockScroll();
    modal.setAttribute('data-open', '');
    /* Force the style recalculation before focusing. The dialog is
       visibility:hidden until the attribute change is applied, and a hidden
       element cannot take focus — setAttribute() followed by focus() in the
       same tick can therefore silently do nothing, leaving focus on the page
       behind the scrim where Tab then walks the background. Reading a layout
       property flushes the pending recalc. */
    void modal.offsetHeight;
    modal.querySelector('.modal__close').focus();
  }

  /* `restoreFocus` is false when the caller is about to move focus somewhere
     else itself — sending it back to the card first would scroll the page to
     the card and then away again. */
  function close(restoreFocus) {
    if (!modal.hasAttribute('data-open')) return;
    modal.removeAttribute('data-open');
    unlockScroll();
    if (restoreFocus !== false && lastFocus) lastFocus.focus();
  }

  modal.querySelector('.modal__scrim').addEventListener('click', function () { close(); });
  modal.querySelector('.modal__close').addEventListener('click', function () { close(); });

  /* ------------------------------------------------- in-page links */
  /* 「詢問這款花禮」 points at #contact. Left alone, the browser scrolls the
     page to the contact form while the modal stays open on top of it — you
     press a button and the entire site slides past behind the scrim, which is
     what the bug report described. The dialog has to close first, and only
     then may the page move.

     The href stays a real href so the link still works with the script gone. */
  panel.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;

    var id = link.getAttribute('href').slice(1);
    var target = id && document.getElementById(id);
    if (!target) return;

    e.preventDefault();
    close(false);

    /* Focus lands on the destination rather than back on the product card,
       so the next Tab continues from where the eye is. preventScroll keeps
       focus() from jumping there instantly and stealing the smooth scroll. */
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  });

  document.addEventListener('keydown', function (e) {
    if (!modal.hasAttribute('data-open')) return;

    if (e.key === 'Escape') { close(); return; }

    /* Keep Tab inside the dialog. Without this, tabbing walks straight out
       into the product grid behind the scrim — the same "it isn't really
       modal" problem as the scrolling. */
    if (e.key !== 'Tab') return;
    var f = Array.prototype.slice.call(
      panel.querySelectorAll('a[href], button:not([disabled])')
    ).filter(function (el) { return el.offsetParent !== null; });
    if (!f.length) return;

    var first = f[0];
    var last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  injectButtons();
})();
