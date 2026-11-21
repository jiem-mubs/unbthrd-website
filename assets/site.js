// Mobile menu
const btn = document.querySelector('.menu-btn');
const nav = document.querySelector('.site-header nav');
if (btn && nav) {
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
}

// Slideshows
document.querySelectorAll('.slides').forEach((box) => {
  const imgs = [...box.querySelectorAll('img')];
  const count = box.querySelector('.count');
  let i = 0;
  const show = (n) => {
    imgs[i].classList.remove('on');
    i = (n + imgs.length) % imgs.length;
    imgs[i].classList.add('on');
    if (count) count.textContent = `${i + 1}/${imgs.length}`;
  };
  box.querySelector('.prev')?.addEventListener('click', () => show(i - 1));
  box.querySelector('.next')?.addEventListener('click', () => show(i + 1));
  if (box.dataset.auto) setInterval(() => show(i + 1), Number(box.dataset.auto));
});

// Play muted background videos only when on screen
const vids = document.querySelectorAll('video[data-lazy]');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const v = e.target;
      if (e.isIntersecting) {
        if (!v.src) v.src = v.dataset.src;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, { rootMargin: '200px' });
  vids.forEach((v) => io.observe(v));
} else {
  vids.forEach((v) => { v.src = v.dataset.src; });
}

// Forms: show a thank-you message after submit (Netlify Forms)
// Forms are delivered by FormSubmit (formsubmit.co) to the address below.
// After activating, you can replace the email with the private alias FormSubmit gives you.
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/jiem@weareunbthrd.com';

document.querySelectorAll('form[data-formsubmit]').forEach((form) => {
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const req = form.querySelector('[data-require-one]');
    if (req && !req.querySelector('input:checked')) {
      alert('Please pick at least one service.');
      return;
    }
    const data = {};
    for (const [k, v] of new FormData(form)) {
      data[k] = data[k] ? `${data[k]}, ${v}` : v;
    }
    data._template = 'table';
    const note = form.querySelector('.form-note');
    try {
      const r = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      const out = await r.json().catch(() => ({}));
      if (!r.ok || String(out.success) === 'false') throw new Error(out.message || r.status);
      form.reset();
      if (note) note.textContent = 'Thanks! We received your message and will get back to you soon.';
    } catch {
      if (note) note.textContent = 'Something went wrong. Please email us directly or try again.';
    }
  });
});

// Footer year
const y = document.querySelector('[data-year]');
if (y) y.textContent = new Date().getFullYear();
