// ==========================================================================
// SISTEMA DE ANIMACIONES - Intersection Observer
// ==========================================================================

(function() {
    'use strict';

    // Configuración
    const CONFIG = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
        animatedClass: 'animated'
    };

    // ==========================================================================
    // Intersection Observer para animaciones de scroll
    // ==========================================================================
    
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('[data-animate]');
        
        if (!animatedElements.length) return;
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(CONFIG.animatedClass);
                        // Opcional: dejar de observar después de animar
                        // observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: CONFIG.threshold,
                rootMargin: CONFIG.rootMargin
            });

            animatedElements.forEach(el => observer.observe(el));
        } else {
            // Fallback para navegadores sin soporte
            animatedElements.forEach(el => el.classList.add(CONFIG.animatedClass));
        }
    }

    // ==========================================================================
    // Animación de contadores numéricos
    // ==========================================================================
    
    function animateCounters() {
        const counters = document.querySelectorAll('[data-counter]');
        
        if (!counters.length) return;

        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const target = entry.target;
                    const finalValue = parseInt(target.getAttribute('data-counter'), 10);
                    const duration = parseInt(target.getAttribute('data-duration') || '2000', 10);
                    const prefix = target.getAttribute('data-prefix') || '';
                    const suffix = target.getAttribute('data-suffix') || '';
                    
                    animateNumber(target, 0, finalValue, duration, prefix, suffix);
                    target.classList.add('counted');
                }
            });
        }, observerOptions);

        counters.forEach(counter => counterObserver.observe(counter));
    }

    function animateNumber(element, start, end, duration, prefix, suffix) {
        const range = end - start;
        const startTime = performance.now();
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (easeOutExpo)
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentValue = Math.floor(start + (range * easeProgress));
            
            element.textContent = prefix + currentValue.toLocaleString() + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        
        requestAnimationFrame(updateNumber);
    }

    // ==========================================================================
    // Barra de progreso de scroll
    // ==========================================================================
    
    function initScrollProgress() {
        // Crear el elemento de progreso si no existe
        let progressBar = document.querySelector('.scroll-progress');
        
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            document.body.prepend(progressBar);
        }

        function updateProgress() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            progressBar.style.width = progress + '%';
        }

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress(); // Initial call
    }

    // ==========================================================================
    // Animación de entrada de página
    // ==========================================================================
    
    function initPageTransition() {
        document.body.classList.add('page-transition');
    }

    // ==========================================================================
    // Parallax simple
    // ==========================================================================
    
    function initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (!parallaxElements.length) return;

        function updateParallax() {
            const scrolled = window.scrollY;
            
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-parallax')) || 0.5;
                const yPos = -(scrolled * speed);
                el.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        }

        window.addEventListener('scroll', updateParallax, { passive: true });
    }

    // ==========================================================================
    // Animaciones hover mejoradas
    // ==========================================================================
    
    function initHoverEffects() {
        // Efecto tilt en cards
        const tiltElements = document.querySelectorAll('[data-tilt]');
        
        tiltElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }

    // ==========================================================================
    // Animación de texto letra por letra
    // ==========================================================================
    
    function initTextAnimations() {
        const textElements = document.querySelectorAll('[data-text-animate]');
        
        textElements.forEach(el => {
            const text = el.textContent;
            const type = el.getAttribute('data-text-animate');
            
            if (type === 'letters') {
                el.innerHTML = text.split('').map((char, i) => 
                    `<span style="animation-delay: ${i * 0.05}s">${char === ' ' ? '&nbsp;' : char}</span>`
                ).join('');
            }
        });
    }

    // ==========================================================================
    // Reveal on scroll con stagger
    // ==========================================================================
    
    function initStaggerReveal() {
        const staggerContainers = document.querySelectorAll('.stagger-children');
        
        if (!staggerContainers.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add(CONFIG.animatedClass);
                        }, index * 100);
                    });
                }
            });
        }, {
            threshold: 0.2
        });

        staggerContainers.forEach(container => observer.observe(container));
    }

    // ==========================================================================
    // Magnetic buttons effect
    // ==========================================================================
    
    function initMagneticButtons() {
        const magneticElements = document.querySelectorAll('[data-magnetic]');
        
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ==========================================================================
    // Smooth scroll para anchors
    // ==========================================================================
    
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ==========================================================================
    // Inicialización
    // ==========================================================================
    
    function init() {
        // Esperar a que el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initAll);
        } else {
            initAll();
        }
    }

    function initAll() {
        initPageTransition();
        initScrollAnimations();
        initScrollProgress();
        animateCounters();
        initParallax();
        initHoverEffects();
        initStaggerReveal();
        initMagneticButtons();
        initSmoothScroll();
        
        // Pequeño delay para asegurar que los estilos están cargados
        setTimeout(() => {
            document.body.classList.add('animations-ready');
        }, 100);
    }

    // Iniciar
    init();

    // Exponer funciones para uso externo
    window.AnimationSystem = {
        refresh: initScrollAnimations,
        animateCounter: animateNumber
    };

})();
