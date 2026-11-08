/* MasaPlay legal pages — TR/EN language toggle. No tracking, no network. */
(function () {
  var KEY = 'masaplay-site-language';
  var supported = ['tr', 'en'];
  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  var q = (location.search.match(/[?&]lang=(tr|en)/) || [])[1];
  var browser = (navigator.language || 'tr').toLowerCase().indexOf('tr') === 0 ? 'tr' : 'en';
  function set(lang, persist) {
    var l = supported.indexOf(lang) >= 0 ? lang : 'tr';
    document.documentElement.lang = l;
    document.body.dataset.language = l;
    if (persist) save(l);
    var buttons = document.querySelectorAll('[data-language-button]');
    for (var i = 0; i < buttons.length; i++) {
      var on = buttons[i].getAttribute('data-language-button') === l;
      buttons[i].classList.toggle('is-selected', on);
      buttons[i].setAttribute('aria-pressed', String(on));
    }
    var t = document.body.getAttribute('data-title-' + l);
    if (t) document.title = t;
  }
  var buttons = document.querySelectorAll('[data-language-button]');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () { set(this.getAttribute('data-language-button'), true); });
  }
  set(q || read() || browser, false);
  // #chat (community rules link from the app) → English section when the page shows English
  if (location.hash === '#chat' && document.body.dataset.language === 'en') {
    var c = document.getElementById('chat-en');
    if (c) c.scrollIntoView();
  }
})();
