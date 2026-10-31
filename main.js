/* ==========================================================================
   Aprender con Vicky — Lógica de Interacción y Formulario Web3Forms
   ========================================================================== */

async function enviarFormulario(event) {
  if (event) event.preventDefault();

  const form = document.getElementById("formularioContacto");
  const mensajeExito = document.getElementById("mensajeExito");
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

  if (!form || !mensajeExito) return;

  const originalBtnContent = submitBtn ? submitBtn.innerHTML : "";
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Enviando mensaje...</span>`;
  }
  form.classList.add("opacity-50", "pointer-events-none");

  try {
    const formData = new FormData(form);
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      form.classList.add("hidden");
      mensajeExito.classList.remove("hidden");
      mensajeExito.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    } else {
      alert(
        data.message ||
          "Hubo un error al enviar el mensaje. Por favor intenta nuevamente.",
      );
      form.classList.remove("opacity-50", "pointer-events-none");
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnContent;
      }
    }
  } catch (error) {
    // Si falla el fetch por algún motivo de red, enviamos de manera tradicional
    form.submit();
  }
}

// Exponer globalmente para compatibilidad con llamadas directas
window.enviarFormulario = enviarFormulario;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formularioContacto");
  if (form) {
    form.addEventListener("submit", enviarFormulario);
  }
});
