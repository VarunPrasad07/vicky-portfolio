// ============================================
//   VIGNESH MANIKANDAN – Portfolio | script.js
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Typing Effect ──
  const typedEl = document.getElementById('typed-role');
  const phrases = [
    'Drug Safety Associate',
    'Clinical Trial Professional',
    'Pharmacovigilance Expert',
    'ICSR Case Processor',
    'Patient Safety Advocate',
  ];
  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;

  function typeLoop() {
    if (!typedEl) return;
    const current = phrases[phraseIndex];

    if (isDeleting) {
      typedEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 55 : 100;

    if (!isDeleting && charIndex === current.length) {
      speed = 2000;          // pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 350;           // pause before next phrase
    }

    setTimeout(typeLoop, speed);
  }

  typeLoop();


  const navbar    = document.getElementById('navbar');
  const scrollBtn = document.getElementById('scroll-top');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    scrollBtn.classList.toggle('visible', window.scrollY > 400);
  });

  scrollBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


  // ── Mobile Nav Toggle ──
  const navToggle = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');

  function closeNav() {
    navLinks.classList.remove('open');
    const [s1, s2, s3] = navToggle.querySelectorAll('span');
    s1.style.transform = s3.style.transform = '';
    s2.style.opacity = '';
  }

  navToggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    const [s1, s2, s3] = navToggle.querySelectorAll('span');
    if (isOpen) {
      s1.style.transform = 'rotate(45deg) translate(5px,5px)';
      s2.style.opacity   = '0';
      s3.style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      closeNav();
    }
  });

  navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));


  // ── Intersection Observer: Fade-up animations ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));


  // ── Skill chips stagger animation ──
  const chipObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-chip').forEach((chip, i) => {
          setTimeout(() => chip.style.opacity = '1', i * 60);
        });
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-group-card').forEach(card => {
    card.querySelectorAll('.skill-chip').forEach(c => c.style.opacity = '0');
    chipObserver.observe(card);
  });


  // ── Active nav link highlighting ──
  const sections   = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.style.color = 'var(--text-primary)';
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => activeObserver.observe(s));


  // ── Contact Form ──
  const form       = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      form.style.display = 'none';
      successMsg.classList.add('show');
    }, 1400);
  });


  // ── Tilt on award cards ──
  document.querySelectorAll('.award-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const rx = ((e.clientY - top)  / height - 0.5) * -8;
      const ry = ((e.clientX - left) / width  - 0.5) *  8;
      card.style.transform = `translateY(-5px) perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = '');
  });


  // ── Footer Year ──
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
