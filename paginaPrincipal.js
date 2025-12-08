document.addEventListener('DOMContentLoaded', () => {
  const carruseles = document.querySelectorAll('.carousel');

  carruseles.forEach(carrusel => {
    const contenedorTarjetas = carrusel.querySelector('.cards.scroll');
    const flechaIzquierda = carrusel.querySelector('.arrow.left');
    const flechaDerecha = carrusel.querySelector('.arrow.right');

    // Clonar tarjetas para efecto infinito
    const tarjetas = Array.from(contenedorTarjetas.children);
    tarjetas.forEach(tarjeta => {
      const clon = tarjeta.cloneNode(true);
      contenedorTarjetas.appendChild(clon);
    });

    // Calcula el ancho de una tarjeta + gap
    const tarjeta = contenedorTarjetas.querySelector('article');
    const estiloTarjeta = window.getComputedStyle(tarjeta);
    const anchoTarjeta = tarjeta.offsetWidth;
    const espacioEntreTarjetas = parseInt(estiloTarjeta.marginRight);
    const desplazamiento = anchoTarjeta + espacioEntreTarjetas;

    // Scroll hacia la derecha
    flechaDerecha.addEventListener('click', () => {
      contenedorTarjetas.scrollBy({
        left: desplazamiento,
        behavior: 'smooth'
      });
      // Cuando llega al final, vuelve al inicio sin que se note
      if (contenedorTarjetas.scrollLeft + contenedorTarjetas.clientWidth >= contenedorTarjetas.scrollWidth - 1) {
        setTimeout(() => {
          contenedorTarjetas.scrollLeft = 0;
        }, 300);
      }
    });

    // Scroll hacia la izquierda
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
});
document.addEventListener("DOMContentLoaded", () => {

    const botonHamburguesa = document.getElementById("botonHamburguesa");
    const menuMovil = document.getElementById("menuMovil");

    botonHamburguesa.addEventListener("click", () => {
        menuMovil.classList.toggle("abierto");
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

