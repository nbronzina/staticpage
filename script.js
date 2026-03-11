// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Back to Top
const backToTopButton = document.getElementById('backToTop');

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
      ticking = false;
    });
    ticking = true;
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Scroll Reveal for Sections
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');

      // Stagger animation for Work section links
      if (entry.target.getAttribute('data-index') === '02') {
        const items = entry.target.querySelectorAll('ul li');
        items.forEach((item, i) => {
          item.style.transitionDelay = `${i * 40}ms`;
        });
      }

      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px'
});

// Observe all sections after a short delay to ensure first section is visible
setTimeout(() => {
  document.querySelectorAll('section').forEach(section => {
    revealObserver.observe(section);
  });
}, 100);
