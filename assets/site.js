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

// Experience: expanding city panels
document.querySelectorAll('.cities').forEach((wrap) => {
  wrap.querySelectorAll('.city').forEach((c) => c.addEventListener('click', () => {
    wrap.querySelectorAll('.city').forEach((o) => o.classList.toggle('open', o === c));
  }));
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
