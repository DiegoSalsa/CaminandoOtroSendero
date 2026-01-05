// ===== NAVEGACIÓN RESPONSIVA =====
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // ===== CARRUSEL DE IMÁGENES =====
    initCarousel();
});

// Carrusel automático
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    const slideInterval = 5000; // Cambiar cada 5 segundos

    function showSlide(n) {
        // Remover clase active de todos
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Añadir clase active al slide actual
        slides[n].classList.add('active');
        indicators[n].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Cambio automático
    setInterval(nextSlide, slideInterval);

    // Click en indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
}


// ===== SMOOTH SCROLL =====
document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        const scrollPosition = window.pageYOffset;
        const parallaxSpeed = element.getAttribute('data-parallax');
        element.style.backgroundPosition = `center ${scrollPosition * parallaxSpeed}px`;
    });
});

// ===== INTERSECTION OBSERVER PARA ANIMACIONES =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-aos-delay') || 0;
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = entry.target.getAttribute('data-aos') === 'fade-up' 
                    ? 'translateY(0)' 
                    : entry.target.getAttribute('data-aos') === 'fade-left'
                    ? 'translateX(0)'
                    : 'translateX(0)';
            }, delay);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach((el, index) => {
    el.style.transition = 'all 0.8s ease';
    el.setAttribute('data-aos-delay', index * 100);
    observer.observe(el);
});

// ===== NAVBAR SCROLL EFFECT =====
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = 'var(--shadow)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ===== ANIMACIÓN DE NÚMEROS =====
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ===== FORMULARIO DE CONTACTO =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formMessage = document.getElementById('formMessage');
        const formData = new FormData(contactForm);
        
        try {
            // Simulamos un envío (en producción usarías un backend)
            // Para envíos reales, necesitarías un servidor configurado
            
            // Mostrar mensaje de éxito
            formMessage.textContent = '¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.';
            formMessage.classList.add('success');
            formMessage.classList.remove('error');
            
            // Limpiar formulario
            contactForm.reset();
            
            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                formMessage.classList.remove('success');
            }, 5000);
            
        } catch (error) {
            formMessage.textContent = 'Error al enviar el mensaje. Intenta nuevamente.';
            formMessage.classList.add('error');
            formMessage.classList.remove('success');
        }
    });
}

// ===== ANIMACIONES DE TEXTO =====
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    
    type();
}

// ===== CONTADOR DE SCROLL =====
let hasScrolled = false;

window.addEventListener('scroll', () => {
    if (!hasScrolled && window.pageYOffset > window.innerHeight * 2) {
        hasScrolled = true;
        // Aquí puedes añadir animaciones que solo ocurren una vez
    }
});

// ===== EFECTO RIPPLE EN BOTONES =====
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        // Añadir estilos para el ripple
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'rippleEffect 0.6s ease-out';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Agregar animación de ripple
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

    /* ===== VANILLA TILT EFFECT ===== */
    const cards = document.querySelectorAll('.service-card, .team-card, .investigacion-card, .galeria-item');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5; // Max rotation X deg
            const rotateY = ((x - centerX) / centerX) * 5;  // Max rotation Y deg

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    /* ===== STAGGERED ANIMATIONS ON SCROLL ===== */
    const observerOptionsStaggered = { // Renamed to avoid conflict
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const staggeredObserver = new IntersectionObserver((entries) => { // Renamed to avoid conflict
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                staggeredObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptionsStaggered);

    // Select elements to animate
    const animatedElements = document.querySelectorAll('.service-card, .about-text, .image-placeholder, .timeline-item, .stat-card, .team-card, .testimonio-card, .especie-card');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        // Add delay based on index for grid items if needed, but simple observer is cleaner for diverse elements
        staggeredObserver.observe(el);
    });


// ===== LAZY LOADING DE IMÁGENES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== DETECCIÓN DE PREFERENCIA DE TEMA =====
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Usuario prefiere modo oscuro (opcional para futuras implementaciones)
}

// ===== ANIMACIÓN BACKGROUND AL CARGAR =====
window.addEventListener('load', () => {
    document.body.style.animation = 'fadeInBody 0.8s ease-in-out';
});

const loadStyle = document.createElement('style');
loadStyle.textContent = `
    @keyframes fadeInBody {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(loadStyle);

// ===== CONTADOR INTERACTIVO DE ELEMENTOS VISIBLES =====
let visibleElements = 0;

const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            visibleElements++;
        } else {
            visibleElements--;
        }
    });
});

document.querySelectorAll('.service-card, .investigacion-card').forEach(el => {
    countObserver.observe(el);
});

// ===== FUNCIONES DE UTILIDAD =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== SCROLL TO TOP BUTTON =====
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.textContent = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: #27ae60;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    z-index: 999;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', debounce(() => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
}, 100));

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.backgroundColor = '#f39c12';
    scrollToTopBtn.style.transform = 'scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.backgroundColor = '#27ae60';
    scrollToTopBtn.style.transform = 'scale(1)';
});

// ===== EFECTO HOVER EN TIMELINE =====
document.querySelectorAll('.timeline-content').forEach(item => {
    item.addEventListener('mouseenter', () => {
        document.querySelectorAll('.timeline-content').forEach(el => {
            el.style.opacity = '0.6';
        });
        item.style.opacity = '1';
    });
    
    item.addEventListener('mouseleave', () => {
        document.querySelectorAll('.timeline-content').forEach(el => {
            el.style.opacity = '1';
        });
    });
});

// ===== NÚMEROS ANIMADOS (ESTADÍSTICAS) =====
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const value = parseInt(stat.getAttribute('data-value'));
        let current = 0;
        const increment = Math.ceil(value / 50);
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                stat.textContent = value;
                clearInterval(timer);
            } else {
                stat.textContent = current;
            }
        }, 30);
    });
}

// Animar estadísticas cuando se vean en viewport
const statsSection = document.querySelector('.estadisticas');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                animateStats();
                entry.target.classList.add('animated');
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    statsObserver.observe(statsSection);
}

// ===== FAQ INTERACTIVO =====
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Cerrar todos los demás
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Abrir el actual si no estaba abierto
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ===== FORMULARIO DE COTIZACIÓN =====
const cotizacionForm = document.getElementById('cotizacionForm');
if (cotizacionForm) {
    cotizacionForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const cotizacionMessage = document.getElementById('cotizacionMessage');
        
        try {
            // Simulamos un envío
            cotizacionMessage.textContent = '¡Cotización enviada exitosamente! Te contactaremos pronto.';
            cotizacionMessage.classList.add('success');
            cotizacionMessage.classList.remove('error');
            
            cotizacionForm.reset();
            
            setTimeout(() => {
                cotizacionMessage.classList.remove('success');
            }, 5000);
            
        } catch (error) {
            cotizacionMessage.textContent = 'Error al enviar la cotización. Intenta nuevamente.';
            cotizacionMessage.classList.add('error');
            cotizacionMessage.classList.remove('success');
        }
    });
}

console.log('✨ Página cargada exitosamente - Caminando Otro Sendero');
