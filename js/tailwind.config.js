/* ==========================================================================
   Configuración de tema Tailwind CSS para Aprender con Vicky
   ========================================================================== */

tailwind.config = {
  theme: {
    extend: {
      colors: {
        arena: {
          50: "#FDFCF9",
          100: "#FAF6EE",
          200: "#F4EFE4",
          300: "#EAE1D2",
          400: "#D9CDB9",
        },
        marron: {
          800: "#3D3128",
          700: "#4D3F35",
          600: "#655447",
          500: "#7E6B5D",
        },
        bosque: {
          50: "#F2F7F4",
          100: "#E2ECE5",
          200: "#C7D9CE",
          600: "#3D6F55",
          700: "#2E5A44",
          800: "#234434",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
        serif: ['"Source Serif 4"', "Georgia", "serif"],
      },
    },
  },
};
