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

// 2) Lightbox: click a gallery thumbnail to see it large. Supports images
// and short videos. On the photography/design pages each anchor has its own
// media and prev/next walks across all thumbnails on the page. On the store
// each anchor carries a data-media="[{type,src,alt,poster}, ...]" list and
// prev/next walks within that item's media only.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('a.lightbox'));
  if (!links.length) return;

  var box;
  var mediaList = [];
  var index = 0;

  function parseDataMedia(a) {
    var raw = a.getAttribute('data-media');
    if (!raw) return null;
    try {
      var arr = JSON.parse(raw);
      return Array.isArray(arr) && arr.length ? arr : null;
    } catch (e) {
      return null;
    }
  }

  function render() {
    if (!box) return;
    var m = mediaList[index];
    var stage = box.querySelector('.lb-stage');
    stage.innerHTML = '';
    var el;
    if (m.type === 'video') {
      el = document.createElement('video');
      el.src = m.src;
      el.controls = true;
      el.autoplay = true;
      el.loop = true;
      el.playsInline = true;
      el.muted = true; // allow autoplay
      if (m.poster) el.poster = m.poster;
    } else {
      el = document.createElement('img');
      el.src = m.src;
      el.alt = m.alt || '';
    }
    stage.appendChild(el);
  }

  function show(i) {
    index = (i + mediaList.length) % mediaList.length;
    render();
  }
  function close() {
    if (box) { box.remove(); box = null; document.removeEventListener('keydown', onKey); }
  }
  function onKey(e) {
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') show(index + 1);
    if (e.key === 'ArrowLeft') show(index - 1);
  }
  function open(list, i) {
    mediaList = list;
    index = i;
    box = document.createElement('div');
    box.className = 'lb';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.innerHTML = '<div class="lb-stage"></div>' +
      '<button class="lb-close" aria-label="Close">&times;</button>' +
      (mediaList.length > 1
        ? '<button class="lb-prev" aria-label="Previous">&#8249;</button><button class="lb-next" aria-label="Next">&#8250;</button>'
        : '');
    box.addEventListener('click', function (e) {
      if (e.target.classList.contains('lb-prev')) { show(index - 1); return; }
      if (e.target.classList.contains('lb-next')) { show(index + 1); return; }
      if (e.target.classList.contains('lb-close')) { close(); return; }
      // clicking the dark backdrop closes; clicking the media does nothing
      if (e.target === box) close();
    });
    document.body.appendChild(box);
    document.addEventListener('keydown', onKey);
    render();
    box.querySelector('.lb-close').focus();
  }

  // Build the fallback list (all images on the page, in order) for anchors
  // that carry no data-media attribute. That keeps the photography and
  // design pages working exactly as before.
  var fallbackList = links.map(function (a) {
    var thumb = a.querySelector('img');
    return {
      type: 'image',
      src: a.getAttribute('href'),
      alt: thumb ? thumb.alt : '',
    };
  });

  links.forEach(function (a, i) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var list = parseDataMedia(a);
      if (list) {
        open(list, 0);
      } else {
        open(fallbackList, i);
      }
    });
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
