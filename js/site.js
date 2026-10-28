// Small helpers for the LGPH site. No libraries needed.

// 1) Phone menu: the "Menu" button shows/hides the page list.
(function () {
  var nav = document.querySelector('.site-nav');
  var btn = document.querySelector('.nav-toggle');
  if (!nav || !btn) return;
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();

// 2) Lightbox: click a gallery image to see it large. Arrow keys / Esc work too.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('a.lightbox'));
  if (!links.length) return;
  var box, imgEl, index = 0;

  function show(i) {
    index = (i + links.length) % links.length;
    var a = links[index];
    var thumb = a.querySelector('img');
    imgEl.src = a.getAttribute('href');
    imgEl.alt = thumb ? thumb.alt : '';
  }
  function close() {
    if (box) { box.remove(); box = null; document.removeEventListener('keydown', onKey); }
  }
  function onKey(e) {
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') show(index + 1);
    if (e.key === 'ArrowLeft') show(index - 1);
  }
  function open(i) {
    box = document.createElement('div');
    box.className = 'lb';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.innerHTML = '<img alt=""><button class="lb-close" aria-label="Close">&times;</button>' +
      (links.length > 1 ? '<button class="lb-prev" aria-label="Previous">&#8249;</button><button class="lb-next" aria-label="Next">&#8250;</button>' : '');
    imgEl = box.querySelector('img');
    box.addEventListener('click', function (e) {
      if (e.target.classList.contains('lb-prev')) { show(index - 1); return; }
      if (e.target.classList.contains('lb-next')) { show(index + 1); return; }
      if (e.target !== imgEl) close();
    });
    document.body.appendChild(box);
    document.addEventListener('keydown', onKey);
    show(i);
    box.querySelector('.lb-close').focus();
  }
  links.forEach(function (a, i) {
    a.addEventListener('click', function (e) { e.preventDefault(); open(i); });
  });
})();

// 3) Contact form: send without leaving the page and show "*sent into cyberspace*".
//    Works with Formspree. (With Netlify Forms, remove this block or keep it; Netlify also accepts it.)
(function () {
  var form = document.querySelector('.contact-form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    var action = form.getAttribute('action') || '';
    if (action.indexOf('YOUR_FORM_ID') !== -1) {
      e.preventDefault();
      alert('The contact form is not connected yet. See README.md, "Contact form".');
      return;
    }
    e.preventDefault();
    var status = form.querySelector('.form-status');
    var data = new FormData(form);
    var isNetlify = form.hasAttribute('data-netlify');
    var req = isNetlify
      ? fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(data).toString() })
      : fetch(action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
    req.then(function (r) {
      if (!r.ok) throw new Error('bad status');
      form.reset();
      status.textContent = '*sent into cyberspace*';
    }).catch(function () {
      status.textContent = 'Sorry, something went wrong. Please email zoeyrosebest@gmail.com instead.';
    }).then(function () { status.hidden = false; });
  });
})();
