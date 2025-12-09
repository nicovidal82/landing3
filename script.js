// ===========================
// Smooth Scrolling para enlaces de navegación
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Cerrar el menú móvil si está abierto
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// ===========================
// Cambiar estilo del navbar al hacer scroll
// ===========================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = '#ffffff';
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
    }
});

// ===========================
// Animación de entrada para elementos
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar las tarjetas de servicios
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// ===========================
// Función para mostrar mensajes de validación
// ===========================
function mostrarMensaje(mensaje, tipo) {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.textContent = mensaje;
    messageDiv.className = tipo;
    
    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.className = '';
    }, 5000);
}

// ===========================
// Manejo y Validación del formulario de contacto
// ===========================

// IMPORTANTE: Reemplace esta URL con la URL de su Cloudflare Worker desplegado
let WORKER_URL = 'https://SU-URL-DEL-WORKER.workers.dev'; 

document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = this;
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Limpiar mensajes anteriores
    mostrarMensaje('', '');

    // 1. Validación de campos vacíos
    if (!nombre || !email || !mensaje) {
        mostrarMensaje('Por favor, complete todos los campos obligatorios.', 'error');
        return;
    }
    
    // 2. Validación de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mostrarMensaje('Por favor, ingrese un correo electrónico válido.', 'error');
        return;
    }
    
    // Si la validación es exitosa, proceder con el envío
    
    // Deshabilitar botón y mostrar estado de envío
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    try {
        // Usar FormData para enviar los datos al Worker
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('email', email);
        formData.append('mensaje', mensaje);

        const response = await fetch(WORKER_URL, {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (result.success) {
            mostrarMensaje(result.message, 'success');
            form.reset(); // Resetear formulario solo si el envío fue exitoso
        } else {
            // Mostrar mensaje de error del Worker
            mostrarMensaje(result.message || 'Error desconocido al enviar el formulario.', 'error');
        }

    } catch (error) {
        console.error('Error de red o del Worker:', error);
        mostrarMensaje('Error de conexión. Por favor, intente más tarde.', 'error');
    } finally {
        // Restaurar botón
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

// ===========================
// Efecto parallax en el hero
// ===========================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// ===========================
// Preloader (opcional)
// ===========================
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===========================
// Activar link del navbar según sección visible
// ===========================
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// ===========================
// Añadir clase active al CSS
// ===========================
const style = document.createElement('style');
style.textContent = `
    .navbar-nav .nav-link.active {
        color: #00c7d3 !important; /* Turquesa */
        position: relative;
    }
    .navbar-nav .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 30px;
        height: 3px;
        background-color: #00c7d3; /* Turquesa */
        border-radius: 2px;
    }
`;
document.head.appendChild(style);
