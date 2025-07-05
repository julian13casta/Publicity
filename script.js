console.log("¡Tu página ya tiene JavaScript!");

// Código del slider
let current = 0;
const slides = document.querySelector('.slides');
const dots = document.querySelectorAll('.dot');
let autoSlideInterval = null;
const SLIDE_INTERVAL = 5000; // 5 segundos

function showSlide(index) {
  current = index;
  slides.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

function currentSlide(i) {
  showSlide(i);
  restartAutoSlide();
}

function prevSlide() {
  current = (current - 1 + dots.length) % dots.length;
  showSlide(current);
  restartAutoSlide();
}

function nextSlide() {
  current = (current + 1) % dots.length;
  showSlide(current);
  restartAutoSlide();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    current = (current + 1) % dots.length;
    showSlide(current);
  }, SLIDE_INTERVAL);
}

function restartAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Inicializar slider cuando el DOM esté listo
// y asignar eventos a flechas y puntos

document.addEventListener('DOMContentLoaded', function() {
  showSlide(0);
  startAutoSlide();
  // Asignar eventos a flechas si no están en el HTML
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  if (prevBtn) prevBtn.onclick = prevSlide;
  if (nextBtn) nextBtn.onclick = nextSlide;
  // Asignar eventos a puntos
  dots.forEach((dot, i) => {
    dot.onclick = () => currentSlide(i);
  });
});

// Funciones para servicios
function mostrarSeccion(id) {
  document.querySelectorAll('.detalle-servicio').forEach(seccion => {
    seccion.style.display = 'none';
  });
  document.getElementById(id).style.display = 'block';
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function cerrarSeccion() {
  document.querySelectorAll('.detalle-servicio').forEach(seccion => {
    seccion.style.display = 'none';
  });
}
