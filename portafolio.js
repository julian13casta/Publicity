// Funcionalidad del Portafolio
document.addEventListener('DOMContentLoaded', function() {
  // Filtros de categorías
  const filtroBtns = document.querySelectorAll('.filtro-btn');
  const trabajoItems = document.querySelectorAll('.trabajo-item');

  // Función para filtrar trabajos
  function filtrarTrabajos(categoria) {
    trabajoItems.forEach(item => {
      const itemCategoria = item.getAttribute('data-categoria');
      
      if (categoria === 'todos' || itemCategoria === categoria) {
        item.style.display = 'block';
        item.style.animation = 'fadeInUp 0.6s ease forwards';
      } else {
        item.style.display = 'none';
      }
    });
  }

  // Event listeners para los botones de filtro
  filtroBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remover clase active de todos los botones
      filtroBtns.forEach(b => b.classList.remove('active'));
      
      // Agregar clase active al botón clickeado
      this.classList.add('active');
      
      // Obtener la categoría del botón
      const categoria = this.getAttribute('data-categoria');
      
      // Filtrar los trabajos
      filtrarTrabajos(categoria);
    });
  });

  // Efectos de hover para los trabajos
  trabajoItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Botones "Ver Detalles"
  const btnVerMas = document.querySelectorAll('.btn-ver-mas');
  btnVerMas.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Aquí puedes agregar la funcionalidad para mostrar más detalles
      // Por ejemplo, abrir un modal o navegar a una página de detalles
      alert('Funcionalidad de detalles próximamente disponible');
    });
  });

  // Animación de números en las estadísticas
  function animarNumeros() {
    const stats = document.querySelectorAll('.stat-numero');
    
    stats.forEach(stat => {
      const numero = stat.textContent;
      const numeroFinal = parseInt(numero.replace(/\D/g, ''));
      let contador = 0;
      const incremento = numeroFinal / 50;
      
      const timer = setInterval(() => {
        contador += incremento;
        if (contador >= numeroFinal) {
          contador = numeroFinal;
          clearInterval(timer);
        }
        
        if (numero.includes('+')) {
          stat.textContent = Math.floor(contador) + '+';
        } else if (numero.includes('%')) {
          stat.textContent = Math.floor(contador) + '%';
        } else {
          stat.textContent = Math.floor(contador);
        }
      }, 30);
    });
  }

  // Observador de intersección para animar estadísticas cuando sean visibles
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animarNumeros();
        observer.unobserve(entry.target);
      }
    });
  });

  const statsSection = document.querySelector('.estadisticas-portafolio');
  if (statsSection) {
    observer.observe(statsSection);
  }

  // Smooth scroll para enlaces internos
  const enlacesInternos = document.querySelectorAll('a[href^="#"]');
  enlacesInternos.forEach(enlace => {
    enlace.addEventListener('click', function(e) {
      e.preventDefault();
      const destino = this.getAttribute('href');
      const elementoDestino = document.querySelector(destino);
      
      if (elementoDestino) {
        elementoDestino.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Efecto parallax en el hero
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.portafolio-hero');
    
    if (hero) {
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    }
  });
});

// Agregar estilos CSS para animaciones
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .trabajo-item {
    animation: fadeInUp 0.6s ease forwards;
  }
`;
document.head.appendChild(style); 