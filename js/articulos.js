/* ==========================================================================
   Aprender con Vicky — Lógica de Filtrado y Búsqueda de Artículos
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const buscador = document.getElementById("buscadorArticulos");
  const filtroSelect = document.getElementById("filtroCategoria");
  const pills = document.querySelectorAll(".pill-cat");
  const articulos = document.querySelectorAll(".tarjeta-articulo");
  const grilla = document.getElementById("grillaArticulos");
  const estadoVacio = document.getElementById("estadoVacio");
  const contador = document.getElementById("contadorResultados");
  const btnLimpiar = document.getElementById("btnLimpiarFiltros");

  if (!buscador || !filtroSelect || !grilla) return;

  let categoriaActual = "todas";
  let textoBusqueda = "";

  function normalizarTexto(texto) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function aplicarFiltros() {
    let visibles = 0;
    const query = normalizarTexto(textoBusqueda.trim());

    articulos.forEach((articulo) => {
      const cat = articulo.getAttribute("data-categoria");
      const titulo = normalizarTexto(articulo.getAttribute("data-titulo") || "");
      const desc = normalizarTexto(articulo.getAttribute("data-descripcion") || "");

      const coincideCategoria =
        categoriaActual === "todas" || cat === categoriaActual;

      const coincideBusqueda =
        query === "" || titulo.includes(query) || desc.includes(query);

      if (coincideCategoria && coincideBusqueda) {
        articulo.classList.remove("hidden");
        visibles++;
      } else {
        articulo.classList.add("hidden");
      }
    });

    // Actualizar contador y estado vacío
    if (visibles === 0) {
      grilla.classList.add("hidden");
      if (estadoVacio) estadoVacio.classList.remove("hidden");
      if (contador) contador.textContent = "No hay resultados para esta búsqueda";
    } else {
      grilla.classList.remove("hidden");
      if (estadoVacio) estadoVacio.classList.add("hidden");
      if (contador) {
        contador.textContent = `Mostrando ${visibles} artículo${visibles === 1 ? "" : "s"}`;
      }
    }

    // Sincronizar pastillas visuales
    pills.forEach((pill) => {
      if (pill.getAttribute("data-cat") === categoriaActual) {
        pill.classList.remove("bg-arena-200", "text-marron-700");
        pill.classList.add("bg-bosque-700", "text-white");
      } else {
        pill.classList.remove("bg-bosque-700", "text-white");
        pill.classList.add("bg-arena-200", "text-marron-700");
      }
    });

    // Sincronizar select
    if (filtroSelect.value !== categoriaActual) {
      filtroSelect.value = categoriaActual;
    }
  }

  // Eventos
  buscador.addEventListener("input", function (e) {
    textoBusqueda = e.target.value;
    aplicarFiltros();
  });

  filtroSelect.addEventListener("change", function (e) {
    categoriaActual = e.target.value;
    aplicarFiltros();
  });

  pills.forEach((pill) => {
    pill.addEventListener("click", function () {
      categoriaActual = this.getAttribute("data-cat");
      aplicarFiltros();
    });
  });

  if (btnLimpiar) {
    btnLimpiar.addEventListener("click", function () {
      textoBusqueda = "";
      categoriaActual = "todas";
      buscador.value = "";
      filtroSelect.value = "todas";
      aplicarFiltros();
    });
  }

  aplicarFiltros();
});
