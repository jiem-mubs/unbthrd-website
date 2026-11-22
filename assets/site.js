// Mobile menu
const btn = document.querySelector('.menu-btn');
const nav = document.querySelector('.site-header nav');
btn?.addEventListener('click', () => btn.setAttribute('aria-expanded', nav.classList.toggle('open')));

// Slideshows
document.querySelectorAll('.slides').forEach((box) => {
  const imgs = [...box.querySelectorAll('img')];
  if (imgs.length < 2) return;
  let i = 0;
  setInterval(() => { imgs[i].classList.remove('on'); i = (i + 1) % imgs.length; imgs[i].classList.add('on'); }, Number(box.dataset.auto || 3500));
});

// Background videos: load + play only when visible
const io = 'IntersectionObserver' in window ? new IntersectionObserver((es) => es.forEach((e) => {
  const v = e.target;
  if (e.isIntersecting) { if (!v.src) v.src = v.dataset.src; v.play().catch(() => {}); } else v.pause();
}), { rootMargin: '200px' }) : null;
document.querySelectorAll('video[data-src]').forEach((v) => io ? io.observe(v) : (v.src = v.dataset.src));

// Events: city panels. The selected city's drone video plays (looping), the others stay paused,
// and the past events list shows that city first; "See all the cities" pulls down the rest.
document.querySelectorAll('.cities').forEach((wrap) => {
  const list = document.querySelector('.event-list[data-filter]');
  const seeAll = document.querySelector('.see-all');
  const nameEl = document.querySelector('[data-city-name]');
  let showAll = false;
  const filter = (city) => {
    if (!list) return;
    list.dataset.filter = city;
    list.querySelectorAll('.event-card').forEach((card) => {
      const mine = card.dataset.city === city;
      card.classList.toggle('other-city', !mine);
      card.hidden = !mine && !showAll;
    });
    if (nameEl) nameEl.textContent = city;
    const inCity = document.querySelector('.in-city'); if (inCity) inCity.dataset.city = city;
    if (seeAll) { seeAll.textContent = showAll ? `Only show ${city}` : 'See all the cities'; seeAll.setAttribute('aria-expanded', showAll); }
  };
  const select = (c) => {
    wrap.querySelectorAll('.city').forEach((o) => {
      const on = o === c;
      o.classList.toggle('open', on);
      o.setAttribute('aria-pressed', on);
      const v = o.querySelector('video');
      if (!v) return;
      if (on) { v.preload = 'auto'; v.play().catch(() => {}); } else v.pause();
    });
    filter(c.dataset.city);
  };
  wrap.querySelectorAll('.city').forEach((c) => c.addEventListener('click', () => {
    select(c);
  }));
  if (seeAll) seeAll.addEventListener('click', () => { showAll = !showAll; filter(list.dataset.filter); });
  const first = wrap.querySelector('.city.open') || wrap.querySelector('.city');
  if (first) {
    filter(first.dataset.city);
    const v = first.querySelector('video');
    if (v) { const o = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && first.classList.contains('open') ? v.play().catch(() => {}) : v.pause())); o.observe(first); }
  }
});

// Forms (FormSubmit) — contact form goes to the thank-you page
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/unbthrd.contact@gmail.com';
document.querySelectorAll('form[data-formsubmit]').forEach((form) => {
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const req = form.querySelector('[data-require-one]');
    if (req && !req.querySelector('input:checked')) { alert('Please pick at least one service.'); return; }
    const endpoint = form.dataset.to ? `https://formsubmit.co/ajax/${form.dataset.to}` : FORM_ENDPOINT;
    const data = {};
    for (const [k, v] of new FormData(form)) data[k] = data[k] ? `${data[k]}, ${v}` : v;
    data._template = 'table';
    const note = form.querySelector('.form-note');
    try {
      const r = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
      const out = await r.json().catch(() => ({}));
      if (!r.ok || String(out.success) === 'false') throw new Error();
      if (form.dataset.next) { location.href = form.dataset.next; return; }
      form.reset();
      if (note) note.textContent = 'Thanks! You are on the list.';
    } catch {
      if (note) note.textContent = 'Something went wrong. Please try again.';
    }
  });
});

const y = document.querySelector('[data-year]');
if (y) y.textContent = new Date().getFullYear();
