/* ==========================================================================
   services.js — 服務內容資料 + service.html 渲染
   Single source of truth for the three services. service.html reads ?s=1..3
   and renders from here, so one template serves every service page.

   One template serves all three services: service.html renders entirely from
   the SERVICES object below, so adding a fourth service means adding a key,
   not a page.
   ========================================================================== */

var SERVICES = {
  '1': {
    name: '日常花禮',
    en: 'Everyday Flowers',
    lede: '生日、探病、開幕、道歉與道謝。告訴我們對象與場合，我們配一束剛好的花。',
    img: 'assets/images/service-1.svg',
    priceFrom: 'NT$880 起',
    includes: [
      '當日花市選材，依季節調整花材',
      '手綁包裝，可指定色系與包裝紙',
      '附手寫卡片（可代筆或自行填寫）',
      '台北市區當日配送，或到工作室取件'
    ],
    suitFor: ['送給朋友或家人', '開幕與喬遷祝賀', '探病與慰問', '沒有特別理由的日子'],
    steps: [
      { t: '告訴我們對象與場合', d: '用表單或 LINE 說明送給誰、什麼場合、預算與色系偏好。' },
      { t: '我們回覆花材方向', d: '依當季供應提出兩個方向與參考圖，確認後收訂金。' },
      { t: '當日製作', d: '配送當天早上採買，現場手綁，不預先做好放冰箱。' },
      { t: '配送或取件', d: '台北市區機車配送，或到民生工作室自取。' }
    ],
    plans: [
      { name: '小束', price: 'NT$880', unit: '約 15 枝', features: ['桌上型尺寸', '單一色系', '附卡片'] },
      { name: '標準', price: 'NT$1,280', unit: '約 25 枝', features: ['最多人選', '可指定色系', '附卡片與包裝'], featured: true },
      { name: '加大', price: 'NT$1,880', unit: '約 40 枝', features: ['適合開幕與正式場合', '雙色系搭配', '附卡片與提袋'] }
    ],
    faq: [
      { q: '可以指定特定花材嗎？', a: '可以，但要看當季供應。如果指定的花當天花市沒有，我們會先聯絡你討論替代方案，不會自行更換。' },
      { q: '多久前要訂？', a: '一般花束建議提前 2 天。當日急件請直接來電，我們看當天狀況回覆，不保證一定接得下。' },
      { q: '可以匿名送嗎？', a: '可以。卡片上要寫什麼由你決定，我們不會主動透露訂購人資訊。' }
    ]
  },

  '2': {
    name: '婚禮與活動佈置',
    en: 'Wedding & Events',
    lede: '主桌、迎賓區、拍照背板與捧花。先看場地照片與風格參考，再出設計提案。',
    img: 'assets/images/service-2.svg',
    priceFrom: 'NT$18,000 起',
    includes: [
      '場地勘查與設計提案（含參考圖）',
      '主桌、迎賓區、拍照區花藝佈置',
      '新娘捧花、胸花、花圈製作',
      '當日進場施作與撤場回收'
    ],
    suitFor: ['婚禮與婚宴', '求婚與紀念日', '品牌活動與開幕', '拍攝場景佈置'],
    steps: [
      { t: '初步聯繫', d: '提供日期、場地、人數與大致預算，我們確認檔期。' },
      { t: '場勘與提案', d: '看過場地後提出設計方向、花材清單與報價，可修改兩次。' },
      { t: '簽約與訂金', d: '確認提案後簽約，收取 50% 訂金鎖定檔期與花材。' },
      { t: '當日施作', d: '提前進場佈置，活動結束後負責撤場，不留垃圾給場地。' }
    ],
    plans: [
      { name: '輕量', price: 'NT$18,000', unit: '主桌 + 捧花', features: ['主桌花藝', '新娘捧花', '含進撤場'] },
      { name: '標準', price: 'NT$38,000', unit: '主桌 + 迎賓 + 捧花', features: ['最多人選', '含拍照區小型花牆', '胸花 6 份'], featured: true },
      { name: '全場', price: 'NT$68,000 起', unit: '依場地報價', features: ['全場花藝規劃', '含桌花與走道', '專人當日待命'] }
    ],
    faq: [
      { q: '要多久前開始洽談？', a: '建議婚期前 2 個月。旺季（3–5 月、10–12 月）的週末通常提前半年就會被訂走。' },
      { q: '可以只做捧花嗎？', a: '可以，捧花單獨製作 NT$2,800 起。不過捧花單品不含場地佈置與進場服務。' },
      { q: '花可以留下來嗎？', a: '可以。撤場時我們會把還新鮮的花材整理成小束讓賓客帶走，這部分不另外收費。' }
    ]
  },

  '3': {
    name: '空間長期配花',
    en: 'Subscription for Spaces',
    lede: '咖啡廳、選物店、辦公室與診所。每週或每兩週固定更換，含花器與維護。',
    img: 'assets/images/service-3.svg',
    priceFrom: 'NT$2,400 / 月起',
    includes: [
      '依空間光線、色調與坪數規劃花材',
      '每週或雙週固定到府更換',
      '花器租用或代購（可指定風格）',
      '舊花回收與花器清潔'
    ],
    suitFor: ['咖啡廳與餐酒館', '選物店與服飾店', '辦公室與會客室', '診所與工作室'],
    steps: [
      { t: '空間評估', d: '到現場看光線、動線與既有色調，確認擺放位置與數量。' },
      { t: '提案與試作', d: '先做一次試擺，確認風格與尺寸後再談長期合約。' },
      { t: '簽約', d: '以月為單位，最短三個月起，可指定每次更換的日期與時段。' },
      { t: '固定更換', d: '固定人員到府更換，順便清潔花器、回收舊花。' }
    ],
    plans: [
      { name: '單點', price: 'NT$2,400', unit: '／月・雙週一次', features: ['單一擺放位置', '含花器租用', '舊花回收'] },
      { name: '標準', price: 'NT$4,800', unit: '／月・每週一次', features: ['最多人選', '2–3 個擺放位置', '可隨季節換風格'], featured: true },
      { name: '全店', price: 'NT$9,600 起', unit: '／月・每週一次', features: ['全空間規劃', '含吧檯與櫥窗', '季度大改一次'] }
    ],
    faq: [
      { q: '最短要簽多久？', a: '三個月。前面兩次是磨合期，如果風格真的不合，可以在第二次更換後終止，只收已完成的次數。' },
      { q: '花器要另外買嗎？', a: '方案已含花器租用。如果想要特定款式，我們可以代購，花器費用另計，之後歸你所有。' },
      { q: '可以配合節慶調整嗎？', a: '可以。聖誕、春節、情人節這類檔期我們會主動提案，加購與否由你決定，不會自動加價。' }
    ]
  }
};

/* ------------------------------------------------------------- rendering */
(function () {
  'use strict';

  var root = document.getElementById('serviceRoot');
  if (!root) return; // not on service.html

  var params = new URLSearchParams(window.location.search);
  var id = params.get('s');
  var svc = SERVICES[id] || SERVICES['1'];
  if (!SERVICES[id]) id = '1';

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* --- head --- */
  document.title = svc.name + '｜拾光花室';
  var meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', svc.lede);

  document.getElementById('svcCrumb').textContent = svc.name;
  document.getElementById('svcEyebrow').textContent = svc.en;
  document.getElementById('svcTitle').textContent = svc.name;
  document.getElementById('svcLede').textContent = svc.lede;
  document.getElementById('svcPrice').textContent = svc.priceFrom;

  var img = document.getElementById('svcImg');
  img.src = svc.img;
  img.alt = svc.name;

  /* --- includes --- */
  var inc = document.getElementById('svcIncludes');
  svc.includes.forEach(function (t) { inc.appendChild(el('li', null, t)); });

  /* --- suitable for --- */
  var suit = document.getElementById('svcSuit');
  svc.suitFor.forEach(function (t) { suit.appendChild(el('li', 'chip-static', t)); });

  /* --- steps --- */
  var steps = document.getElementById('svcSteps');
  svc.steps.forEach(function (s) {
    var li = el('li', 'step');
    li.appendChild(el('h3', null, s.t));
    li.appendChild(el('p', null, s.d));
    steps.appendChild(li);
  });

  /* --- plans --- */
  var plans = document.getElementById('svcPlans');
  svc.plans.forEach(function (p) {
    var card = el('div', 'plan' + (p.featured ? ' plan--featured' : ''));
    if (p.featured) card.appendChild(el('span', 'plan__flag', '最多人選'));
    card.appendChild(el('h3', null, p.name));
    card.appendChild(el('p', 'plan__price', p.price));
    card.appendChild(el('p', 'plan__unit', p.unit));
    var ul = el('ul', 'plan__list');
    p.features.forEach(function (f) { ul.appendChild(el('li', null, f)); });
    card.appendChild(ul);
    plans.appendChild(card);
  });

  /* --- faq --- */
  var faq = document.getElementById('svcFaq');
  svc.faq.forEach(function (f, i) {
    var item = el('div', 'faq__item');
    var btn = el('button', 'faq__q', f.q);
    btn.type = 'button';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'sfa' + i);
    btn.id = 'sfq' + i;

    var ans = el('div', 'faq__a', f.a);
    ans.id = 'sfa' + i;
    ans.setAttribute('role', 'region');
    ans.setAttribute('aria-labelledby', 'sfq' + i);
    ans.hidden = true;

    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      ans.hidden = open;
    });

    item.appendChild(btn);
    item.appendChild(ans);
    faq.appendChild(item);
  });

  /* --- other services --- */
  var others = document.getElementById('svcOthers');
  Object.keys(SERVICES).forEach(function (k) {
    if (k === id) return;
    var o = SERVICES[k];
    var a = el('a', 'card');
    a.href = 'service.html?s=' + k;

    var media = el('div', 'card__media');
    var im = el('img');
    im.src = o.img; im.alt = ''; im.width = 600; im.height = 400; im.loading = 'lazy';
    media.appendChild(im);

    var body = el('div', 'card__body');
    body.appendChild(el('h3', null, o.name));
    body.appendChild(el('p', 'card__desc', o.lede));
    var foot = el('div', 'card__foot');
    foot.appendChild(el('span', 'card__price', o.priceFrom));
    foot.appendChild(el('span', 'link-arrow', '看服務'));
    body.appendChild(foot);

    a.appendChild(media);
    a.appendChild(body);
    others.appendChild(a);
  });

  root.removeAttribute('hidden');
})();
