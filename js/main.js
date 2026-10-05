document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const navIcon = document.querySelector('.nav-icon');
  const navLinks = document.querySelector('.nav-links');

  // Menu burger (mobile)
  const setMenu = (open) => {
    navLinks.classList.toggle('open', open);
    navIcon.setAttribute('aria-expanded', String(open));
    navIcon.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  };

  if (navIcon && navLinks) {
    navIcon.addEventListener('click', () => {
      setMenu(!navLinks.classList.contains('open'));
    });
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenu(false));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setMenu(false);
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) setMenu(false);
    });
  }

  // Lien actif dans la navigation
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links .item').forEach((link) => {
    if (link.getAttribute('href') === page) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // Header qui change d'apparence au scroll
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Apparition des éléments au scroll
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  // Année dynamique dans le footer
  document.querySelectorAll('.year').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // Formulaire de contact
  const form = document.querySelector('.contact-form');
  if (form) {
    const status = form.querySelector('.form-status');
    const rules = {
      name: (v) => v.trim().length >= 2,
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      event: (v) => v !== '',
      message: (v) => v.trim().length >= 10,
    };

    const validate = (input) => {
      const rule = rules[input.name];
      if (!rule) return true;
      const ok = rule(input.value);
      input.closest('.field').classList.toggle('invalid', !ok);
      input.setAttribute('aria-invalid', String(!ok));
      return ok;
    };

    form.querySelectorAll('input, select, textarea').forEach((input) => {
      input.addEventListener('blur', () => validate(input));
      input.addEventListener('input', () => {
        if (input.closest('.field').classList.contains('invalid')) validate(input);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputs = [...form.querySelectorAll('input, select, textarea')];
      const results = inputs.map(validate);
      if (results.includes(false)) {
        status.classList.remove('visible');
        inputs[results.indexOf(false)].focus();
        return;
      }
      const name = form.elements.name.value.trim();
      status.textContent = `Thank you ${name}! Your request has been sent, we will get back to you within 24 hours.`;
      status.classList.add('visible');
      form.reset();
    });
  }
});
