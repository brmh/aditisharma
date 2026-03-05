// ===== NAV SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ===== SCROLL REVEAL =====
const reveals = document.querySelectorAll('.timeline-card, .skill-card, .portfolio-card, .goal-card, .about-card, .contact-item');
reveals.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== STAGGER REVEAL FOR GRIDS =====
const grids = document.querySelectorAll('.skills-grid, .portfolio-grid, .goals-grid');
grids.forEach(grid => {
  const children = grid.querySelectorAll('.reveal');
  const gridObserver = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting)) {
      children.forEach((child, i) => {
        setTimeout(() => {
          child.classList.add('visible');
        }, i * 80);
      });
      gridObserver.disconnect();
    }
  }, { threshold: 0.05 });
  gridObserver.observe(grid);
});

// ===== SKILL BARS ANIMATION =====
const skillBars = document.querySelectorAll('.skill-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.style.getPropertyValue('--pct') ||
        getComputedStyle(entry.target).getPropertyValue('--pct');
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
skillBars.forEach(bar => barObserver.observe(bar));

// ===== CONTACT FORM =====
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  const name = document.getElementById('name').value;
  btn.textContent = '✅ Message Sent!';
  btn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Send Message 🚀';
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 3000);

  // Open email client as fallback
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const type = document.getElementById('type').value;
  const subject = encodeURIComponent(`Portfolio Contact: ${type || 'Opportunity'} from ${name}`);
  const body = encodeURIComponent(`Hi Aditi,\n\nI came across your portfolio and wanted to get in touch.\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`);
  window.open(`mailto:aditisha0907@gmail.com?subject=${subject}&body=${body}`);
}

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navItems.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === `#${current}`) {
      if (!a.classList.contains('cta-btn')) {
        a.style.color = 'var(--coral)';
      }
    }
  });
});

// ===== SMOOTH COUNTER ANIMATION FOR HERO STATS =====
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 1500;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statNums = document.querySelectorAll('.stat-num');
const heroObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    statNums.forEach(el => {
      const text = el.textContent;
      const num = parseInt(text);
      const suffix = text.replace(/[0-9]/g, '');
      animateCounter(el, num, suffix);
    });
    heroObserver.disconnect();
  }
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) heroObserver.observe(heroStats);
