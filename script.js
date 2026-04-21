/* =============================================
   The Crack Era — script.js
   ============================================= */

(function () {
  'use strict';

  /* ---- Mobile nav toggle ---- */
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // Close nav on link click
    mainNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Active nav highlight on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  function setActiveNav() {
    let current = '';
    sections.forEach(function (sec) {
      const top = sec.getBoundingClientRect().top;
      if (top <= 100) current = sec.id;
    });
    navLinks.forEach(function (link) {
      link.style.color = link.getAttribute('href') === '#' + current
        ? '#e6edf3'
        : '';
    });
  }

  window.addEventListener('scroll', setActiveNav, { passive: true });

  /* ---- Reveal on scroll ---- */
  function initReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    if (window.IntersectionObserver) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px', threshold: 0.05 });
      revealEls.forEach(function (el) { observer.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }

    // Fallback for any missed elements
    setTimeout(function () {
      document.querySelectorAll('.reveal:not(.is-visible)').forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight + 100) {
          el.classList.add('is-visible');
        }
      });
    }, 400);
  }

  /* ---- Dynamic year in footer ---- */
  function setYear() {
    const yr = new Date().getFullYear();
    const el = document.getElementById('footer-yr');
    if (el) el.textContent = '© ' + yr;
    const lugoYr = document.getElementById('lugo-year');
    if (lugoYr) lugoYr.textContent = yr;
  }

  /* ---- Smooth header shadow on scroll ---- */
  const header = document.querySelector('.site-header');
  function updateHeader() {
    if (header) {
      header.style.boxShadow = window.scrollY > 20
        ? '0 2px 20px rgba(0,0,0,0.4)'
        : 'none';
    }
  }
  window.addEventListener('scroll', updateHeader, { passive: true });

  /* ---- Init ---- */
  document.addEventListener('DOMContentLoaded', function () {
    setYear();
    initReveal();
    updateHeader();
  });

})();
