// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const iconOpen = document.getElementById('menu-icon-open');
const iconClose = document.getElementById('menu-icon-close');

menuBtn.addEventListener('click', () => {
  const isHidden = mobileMenu.classList.contains('hidden');
  mobileMenu.classList.toggle('hidden');
  iconOpen.classList.toggle('hidden', isHidden);
  iconClose.classList.toggle('hidden', !isHidden);
});

document.querySelectorAll('#mobile-menu a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    iconOpen.classList.remove('hidden');
    iconClose.classList.add('hidden');
  });
});

// Header shadow on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 8);
});

// Scroll fade-in animation
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
fadeEls.forEach((el) => observer.observe(el));

// Active nav link highlighting
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -50% 0px' }
);
sections.forEach((section) => sectionObserver.observe(section));

// Copy email to clipboard
const copyBtn = document.getElementById('copy-btn');
const copyToast = document.getElementById('copy-toast');
const email = 'comestar@gmail.com';

copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(email);
  } catch (err) {
    const textarea = document.createElement('textarea');
    textarea.value = email;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
  copyToast.style.opacity = '1';
  setTimeout(() => {
    copyToast.style.opacity = '0';
  }, 2000);
});
