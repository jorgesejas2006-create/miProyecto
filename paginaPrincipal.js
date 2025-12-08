document.addEventListener('DOMContentLoaded', () => {

  /* ===================== CARRUSELES ===================== */
  const carruseles = document.querySelectorAll('.carousel');

  carruseles.forEach(carrusel => {
    const contenedorTarjetas = carrusel.querySelector('.cards.scroll');
    const flechaIzquierda = carrusel.querySelector('.arrow.left');
    const flechaDerecha = carrusel.querySelector('.arrow.right');

    // Clonar tarjetas
    const tarjetas = Array.from(contenedorTarjetas.children);
    tarjetas.forEach(tarjeta => {
      const clon = tarjeta.cloneNode(true);
      contenedorTarjetas.appendChild(clon);
    });

    // Dimensiones
    const tarjeta = contenedorTarjetas.querySelector('article');
    const estiloTarjeta = window.getComputedStyle(tarjeta);
    const anchoTarjeta = tarjeta.offsetWidth;
    const espacioEntreTarjetas = parseInt(estiloTarjeta.marginRight);
    const desplazamiento = anchoTarjeta + espacioEntreTarjetas;

    // Flecha derecha
    flechaDerecha.addEventListener('click', () => {
      contenedorTarjetas.scrollBy({
        left: desplazamiento,
        behavior: 'smooth'
      });

      if (contenedorTarjetas.scrollLeft + contenedorTarjetas.clientWidth >= contenedorTarjetas.scrollWidth - 1) {
        setTimeout(() => {
          contenedorTarjetas.scrollLeft = 0;
        }, 300);
      }
    });

    // Flecha izquierda
    flechaIzquierda.addEventListener('click', () => {
      if (contenedorTarjetas.scrollLeft === 0) {
        contenedorTarjetas.scrollLeft = contenedorTarjetas.scrollWidth / 2;
      }
      contenedorTarjetas.scrollBy({
        left: -desplazamiento,
        behavior: 'smooth'
      });
    });
  });

  /* ===================== MENÚ HAMBURGUESA ===================== */
  const botonHamburguesa = document.getElementById('botonHamburguesa');
  const menuHamburguesa = document.getElementById('menuHamburguesa');

  botonHamburguesa.addEventListener('click', () => {
    botonHamburguesa.classList.toggle('abrir');   // Animación del botón
    menuHamburguesa.classList.toggle('mostrar');  // Mostrar/ocultar menú lateral
  });

  menuHamburguesa.querySelectorAll('a').forEach(enlace => {
    enlace.addEventListener('click', () => {
      botonHamburguesa.classList.remove('abrir');
      menuHamburguesa.classList.remove('mostrar');
    });
  });

});

