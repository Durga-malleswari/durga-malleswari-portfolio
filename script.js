const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

function setTheme(theme) {
  root.classList.toggle('light', theme === 'light');
  themeIcon.textContent = theme === 'light' ? '☀' : '☾';
  localStorage.setItem('portfolio-theme', theme);
}
setTheme(localStorage.getItem('portfolio-theme') || 'dark');
themeToggle.addEventListener('click', () => setTheme(root.classList.contains('light') ? 'dark' : 'light'));

menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));

const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${height ? (scrollTop / height) * 100 : 0}%`;
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();
