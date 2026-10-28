/* ==========================================================================
   Victoria Sanjurjo — Landing Page
   Interacciones esenciales: scroll suave, menú móvil y año del footer.
   Vanilla JS, sin dependencias externas.
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- 1. Scroll suave al hacer clic en enlaces de navegación ---------- */
  var navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      var targetId = link.getAttribute('href');

      // Ignorar el enlace "#" vacío
      if (targetId === '#' || targetId.length < 2) return;

      var target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Actualizar la URL sin salto brusco
      if (history.pushState) {
        history.pushState(null, '', targetId);
      }

      // Cerrar el menú móvil si estaba abierto
      closeMobileMenu();
    });
  });

  /* ---------- 2. Menú de navegación en móvil (hamburguesa) ---------- */
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');

  function closeMobileMenu() {
    if (!navMenu || !navToggle) return;
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Cerrar el menú si cambiamos a escritorio mientras está abierto
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 720) {
        closeMobileMenu();
      }
    });
  }

  /* ---------- 3. Año dinámico en el footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
