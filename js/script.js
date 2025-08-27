// ==========================================
//  DATOS DEL PORTFOLIO CON DESCRIPCIONES SEO
// ==========================================

// Array de objetos con la ruta de la imagen y su texto alternativo (alt) para SEO.
const portfolioImages = [
    { path: "./img/foto1.jpg", alt: "Ventana de aluminio con rotura de puente térmico instalada en O Rosal" },
    { path: "./img/foto2.jpg", alt: "Detalle de puerta de madera a medida en proyecto de carpintería" },
    { path: "./img/foto3.jpg", alt: "Instalación de cerramiento de aluminio para terraza con triple acristalamiento" },
    { path: "./img/foto4.jpg", alt: "Carpintero profesional midiendo e instalando una puerta de madera" },
    { path: "./img/foto5.jpg", alt: "Ventana de PVC con alto aislamiento y vistas a la ría" },
    { path: "./img/foto6.jpg", alt: "Puerta de entrada de madera maciza con cerradura de seguridad" },
    { path: "./img/foto7.jpg", alt: "Cocina con muebles a medida de madera y encimera de cuarzo" },
    { path: "./img/foto8.jpg", alt: "Puerta de interior de madera lacada en blanco y manilla moderna" },
    { path: "./img/foto9.jpg", alt: "Instalación de una ventana de aluminio de gran tamaño con vidrio de seguridad" },
    { path: "./img/foto10.jpg", alt: "Mueble de baño a medida de madera con lavabo integrado" },
    { path: "./img/foto11.jpg", alt: "Revestimiento de pared de madera natural en salón moderno" },
    { path: "./img/foto12.jpg", alt: "Puerta corredera de madera para ahorrar espacio en pasillo" },
    { path: "./img/foto13.jpg", alt: "Ventana de madera de castaño con tratamiento exterior" },
    { path: "./img/foto14.jpg", alt: "Ventanal de aluminio corredero que une el interior con el jardín" },
    {path: "./img/foto15.jpg", alt: "Ventana triple en una esquina de una pared con vistas panorámicas" }
];

// ==========================================
//  VARIABLES Y ELEMENTOS DEL DOM
// ==========================================

let currentIndex = 0;
const portfolioStack = document.getElementById('portfolioStack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let autoRotate;

// ==========================================
//  FUNCIONES DEL PORTFOLIO
// ==========================================

// Genera dinámicamente las tarjetas del portfolio.
function generatePortfolioCards() {
    if (!portfolioStack) return;

    portfolioStack.innerHTML = ''; // Limpia el contenedor
    portfolioImages.forEach((image, index) => {
        const card = document.createElement('div');
        card.className = 'portfolio-card';
        card.innerHTML = `
            <img src="${image.path}" alt="${image.alt}" loading="lazy">
        `;
        card.addEventListener('click', () => navigateToCard(index));
        portfolioStack.appendChild(card);
    });
    navigateToCard(currentIndex);
}

// Navega a una tarjeta específica aplicando clases y z-index.
function navigateToCard(index) {
    if (index < 0 || index >= portfolioImages.length || !portfolioStack) return;
    
    currentIndex = index;
    const cards = portfolioStack.querySelectorAll('.portfolio-card');

    cards.forEach((card, i) => {
        // Limpiamos las clases de estado
        card.classList.remove('active', 'prev', 'next');

        // Asignamos las clases según la posición
        if (i === currentIndex) {
            card.classList.add('active');
        } else if (i < currentIndex) {
            card.classList.add('prev');
        } else {
            card.classList.add('next');
        }

        // Asignamos el z-index de forma dinámica
        card.style.zIndex = portfolioImages.length - Math.abs(i - currentIndex);
    });

    updateControls();
}

// Actualiza el estado de los botones de navegación.
function updateControls() {
    if (prevBtn && nextBtn) {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === portfolioImages.length - 1;
    }
}

// ==========================================
//  MANEJO DE EVENTOS
// ==========================================

// Event listeners para los botones de navegación del portfolio.
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            navigateToCard(currentIndex - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < portfolioImages.length - 1) {
            navigateToCard(currentIndex + 1);
        }
    });
}


// Scroll suave para los enlaces de anclaje.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - document.querySelector('header').offsetHeight,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
//  ANIMACIONES AL HACER SCROLL
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Deja de observar después de la primera visibilidad
        }
    });
}, observerOptions);

// Observa todos los elementos con la clase 'fade-in'.
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// ==========================================
//  AUTO-ROTACIÓN DEL PORTFOLIO
// ==========================================

function startAutoRotate() {
    autoRotate = setInterval(() => {
        const nextIndex = (currentIndex + 1) % portfolioImages.length;
        navigateToCard(nextIndex);
    }, 4000); // Rota cada 4 segundos
}

function stopAutoRotate() {
    clearInterval(autoRotate);
}

// Pausa la auto-rotación cuando el usuario interactúa con el portfolio.
if (portfolioStack) {
    portfolioStack.addEventListener('mouseenter', stopAutoRotate);
    portfolioStack.addEventListener('mouseleave', startAutoRotate);
}

// ==========================================
//  MENÚ DE NAVEGACIÓN MÓVIL
// ==========================================

function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Cierra el menú cuando se hace clic en un enlace
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

// ==========================================
//  INICIALIZACIÓN AL CARGAR LA PÁGINA
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    generatePortfolioCards();
    startAutoRotate(); // Inicia la rotación automáticamente
    setupMobileMenu(); // Configura el menú de navegación móvil

});
