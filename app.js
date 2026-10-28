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

  /* ---------- 4. Copiar alias al portapapeles (página del combo) ---------- */
  var copyBtn = document.getElementById('copyAliasBtn');

  if (copyBtn) {
    var targetSel = copyBtn.getAttribute('data-copy-target') || '#aliasValue';
    var targetEl = document.querySelector(targetSel);

    if (targetEl) {
      var originalLabel = copyBtn.textContent;

      copyBtn.addEventListener('click', function () {
        var text = targetEl.textContent.trim();

        function showCopied() {
          copyBtn.textContent = '¡Copiado!';
          copyBtn.classList.add('is-copied');
          window.setTimeout(function () {
            copyBtn.textContent = originalLabel;
            copyBtn.classList.remove('is-copied');
          }, 2000);
        }

        // API moderna (requiere contexto seguro: https o localhost)
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(showCopied, fallbackCopy);
        } else {
          fallbackCopy();
        }

        // Fallback para contextos sin API de portapapeles
        function fallbackCopy() {
          var textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.setAttribute('readonly', '');
          textarea.style.position = 'absolute';
          textarea.style.left = '-9999px';
          document.body.appendChild(textarea);
          textarea.select();
          try {
            document.execCommand('copy');
            showCopied();
          } catch (err) {
            /* Sin acción: el usuario puede copiar manualmente (user-select: all) */
          }
          document.body.removeChild(textarea);
        }
      });
    }
  }
})();
