 /* ── CURSOR ── */
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  });
  function animRing() {
    rx += (mx - rx) * .12; ry += (my - ry) * .12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();
  document.querySelectorAll('a, button, .skill-card, .edu-card, .contact-card-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '24px'; cursor.style.height = '24px';
      ring.style.width = '60px'; ring.style.height = '60px';
      ring.style.borderColor = 'rgba(0,229,255,.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '12px'; cursor.style.height = '12px';
      ring.style.width = '40px'; ring.style.height = '40px';
      ring.style.borderColor = 'rgba(255,45,107,.4)';
    });
  });

  /* ── SCROLL PROGRESS ── */
  const prog = document.getElementById('scroll-progress');

  /* ── NAV ── */
  const nav = document.getElementById('navbar');

  /* ── PARALLAX ── */
  const pw1 = document.getElementById('pw1');
  const pw2 = document.getElementById('pw2');

  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    const pct = (sy / (document.body.scrollHeight - window.innerHeight)) * 100;
    prog.style.width = pct + '%';
    nav.classList.toggle('scrolled', sy > 60);

    /* Parallax: كل word يتحرك بسرعة مختلفة */
    if (pw1) pw1.style.transform = `translateY(${sy * 0.4}px) translateX(${sy * -0.05}px)`;
    if (pw2) pw2.style.transform = `translateY(${sy * -0.3}px) translateX(${sy * 0.05}px)`;
  });

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-clip-left, .reveal-clip-right'
  );

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('active');
        /* Animate skill bars */
        const bar = e.target.querySelector('.skill-bar-fill');
        if (bar) {
          const pct = e.target.dataset.pct;
          setTimeout(() => { bar.style.width = pct + '%'; }, 300);
        }
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => obs.observe(el));

  /* ── FLOATING DOTS ── */
  const container = document.getElementById('float-dots-container');
  container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;';
  for (let i = 0; i < 30; i++) {
    const dot = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const colors = ['rgba(255,45,107,.3)', 'rgba(0,229,255,.2)', 'rgba(255,224,51,.15)'];
    dot.style.cssText = `
      position:absolute;border-radius:50%;
      width:${size}px;height:${size}px;
      background:${colors[Math.floor(Math.random()*3)]};
      left:${Math.random()*100}%;
      bottom:-10px;
      animation:floatAnim ${15+Math.random()*20}s ${Math.random()*15}s linear infinite;
    `;
    container.appendChild(dot);
  }

  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });