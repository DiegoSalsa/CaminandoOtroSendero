(() => {
    'use strict';

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Menú móvil
    const siteHeader = document.querySelector('.site-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.main-menu');

    const closeMenu = () => {
        if (!menuToggle || !menu) return;
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menú');
        menu.classList.remove('open');
        document.body.classList.remove('menu-open');
    };

    menuToggle?.addEventListener('click', () => {
        const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
        siteHeader?.classList.remove('is-hidden');
        menuToggle.setAttribute('aria-expanded', String(willOpen));
        menuToggle.setAttribute('aria-label', willOpen ? 'Cerrar menú' : 'Abrir menú');
        menu?.classList.toggle('open', willOpen);
        document.body.classList.toggle('menu-open', willOpen);
    });

    menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => {
        if (window.innerWidth > 800) closeMenu();
    });

    // Header móvil: se libera al bajar y vuelve apenas el usuario sube
    const mobileHeaderQuery = window.matchMedia('(max-width: 800px)');
    let previousScrollY = Math.max(window.scrollY, 0);
    let scrollDirection = 0;
    let directionDistance = 0;
    let headerScrollTicking = false;

    const updateHeaderVisibility = () => {
        if (!siteHeader) return;

        const currentScrollY = Math.max(window.scrollY, 0);
        const delta = currentScrollY - previousScrollY;
        const nextDirection = Math.sign(delta);

        if (nextDirection && nextDirection !== scrollDirection) {
            scrollDirection = nextDirection;
            directionDistance = Math.abs(delta);
        } else {
            directionDistance += Math.abs(delta);
        }

        if (!mobileHeaderQuery.matches || document.body.classList.contains('menu-open') || currentScrollY <= 12) {
            siteHeader.classList.remove('is-hidden');
        } else if (scrollDirection < 0 && directionDistance >= 4) {
            siteHeader.classList.remove('is-hidden');
        } else if (scrollDirection > 0 && directionDistance >= 24 && currentScrollY > siteHeader.offsetHeight + 24) {
            siteHeader.classList.add('is-hidden');
        }

        previousScrollY = currentScrollY;
        headerScrollTicking = false;
    };

    window.addEventListener('scroll', () => {
        if (headerScrollTicking) return;
        headerScrollTicking = true;
        window.requestAnimationFrame(updateHeaderVisibility);
    }, { passive: true });

    window.addEventListener('resize', () => {
        previousScrollY = Math.max(window.scrollY, 0);
        scrollDirection = 0;
        directionDistance = 0;
        if (!mobileHeaderQuery.matches) siteHeader?.classList.remove('is-hidden');
    });

    siteHeader?.addEventListener('focusin', () => siteHeader.classList.remove('is-hidden'));

    // Carrusel principal
    const hero = document.querySelector('.hero');
    const slides = [...document.querySelectorAll('.hero-slide')];
    const dots = [...document.querySelectorAll('.slider-dots button')];
    const previousButton = document.querySelector('.slider-arrow.prev');
    const nextButton = document.querySelector('.slider-arrow.next');
    let activeSlide = 0;
    let carouselTimer;

    const loadSlide = (index) => {
        const slide = slides[index];
        if (!slide) return;
        slide.querySelectorAll('[data-srcset]').forEach((source) => {
            source.srcset = source.dataset.srcset;
            source.removeAttribute('data-srcset');
        });
        slide.querySelectorAll('img[data-src]').forEach((image) => {
            image.src = image.dataset.src;
            image.removeAttribute('data-src');
        });
    };

    const showSlide = (index) => {
        if (!slides.length) return;
        activeSlide = (index + slides.length) % slides.length;
        loadSlide(activeSlide);
        slides.forEach((slide, slideIndex) => slide.classList.toggle('active', slideIndex === activeSlide));
        dots.forEach((dot, dotIndex) => {
            const isActive = dotIndex === activeSlide;
            dot.classList.toggle('active', isActive);
            dot.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
        if (slides.length > 1) {
            window.setTimeout(() => loadSlide((activeSlide + 1) % slides.length), 180);
        }
    };

    const stopCarousel = () => window.clearInterval(carouselTimer);
    const startCarousel = () => {
        stopCarousel();
        if (!reducedMotion && slides.length > 1) {
            carouselTimer = window.setInterval(() => showSlide(activeSlide + 1), 5200);
        }
    };

    previousButton?.addEventListener('click', () => { showSlide(activeSlide - 1); startCarousel(); });
    nextButton?.addEventListener('click', () => { showSlide(activeSlide + 1); startCarousel(); });
    dots.forEach((dot, index) => dot.addEventListener('click', () => { showSlide(index); startCarousel(); }));
    const hoverDevice = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (hoverDevice) {
        hero?.addEventListener('mouseenter', stopCarousel);
        hero?.addEventListener('mouseleave', startCarousel);
    }
    hero?.addEventListener('focusin', stopCarousel);
    hero?.addEventListener('focusout', startCarousel);
    document.addEventListener('visibilitychange', () => document.hidden ? stopCarousel() : startCarousel());
    window.addEventListener('pageshow', startCarousel);

    let touchStartX = 0;
    let touchStartY = 0;
    hero?.addEventListener('touchstart', (event) => {
        const touch = event.changedTouches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
    }, { passive: true });
    hero?.addEventListener('touchend', (event) => {
        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - touchStartX;
        const deltaY = touch.clientY - touchStartY;
        if (Math.abs(deltaX) < 45 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
        showSlide(activeSlide + (deltaX < 0 ? 1 : -1));
        startCarousel();
    }, { passive: true });
    startCarousel();
    const loadNextSlide = () => loadSlide((activeSlide + 1) % slides.length);
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(loadNextSlide, { timeout: 2500 });
    } else {
        window.setTimeout(loadNextSlide, 1200);
    }

    // Aparición suave al entrar al viewport
    const revealElements = document.querySelectorAll('.reveal');
    if (reducedMotion || !('IntersectionObserver' in window)) {
        revealElements.forEach((element) => element.classList.add('visible'));
    } else {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -35px' });
        revealElements.forEach((element) => revealObserver.observe(element));
    }

    // Estado activo de la navegación
    const navigationLinks = [...document.querySelectorAll('.main-menu a[href^="#"]')];
    const navigationSections = navigationLinks
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                navigationLinks.forEach((link) => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
                });
            });
        }, { rootMargin: '-30% 0px -60%', threshold: 0 });
        navigationSections.forEach((section) => sectionObserver.observe(section));
    }

    // Galería expandible
    const galleryGrid = document.querySelector('.gallery-grid');
    const galleryButton = document.getElementById('show-gallery');
    galleryButton?.addEventListener('click', () => {
        const expanded = galleryGrid?.classList.toggle('expanded') ?? false;
        galleryButton.setAttribute('aria-expanded', String(expanded));
        galleryButton.textContent = expanded ? 'Mostrar menos' : 'Ver galería completa';
        if (expanded) {
            galleryGrid?.querySelector('.more-gallery')?.focus({ preventScroll: true });
        }
    });

    // Vista ampliada de fotografías
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox?.querySelector('img');
    const lightboxCaption = lightbox?.querySelector('p');
    const lightboxClose = lightbox?.querySelector('.lightbox-close');

    document.querySelectorAll('.gallery-item').forEach((item) => {
        item.addEventListener('click', () => {
            const image = item.querySelector('img');
            if (!image || !lightbox || !lightboxImage || !lightboxCaption) return;
            lightboxImage.src = item.dataset.full || image.currentSrc || image.src;
            lightboxImage.alt = image.alt;
            lightboxCaption.textContent = image.alt;
            lightbox.showModal();
        });
    });

    lightboxClose?.addEventListener('click', () => lightbox?.close());
    lightbox?.addEventListener('click', (event) => {
        const bounds = lightbox.getBoundingClientRect();
        const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
        if (outside) lightbox.close();
    });

    // Formulario sin backend: prepara el correo con todos los datos
    const contactForm = document.getElementById('contact-form');
    contactForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = new FormData(contactForm);
        const name = String(data.get('name') || '').trim();
        const company = String(data.get('company') || '').trim();
        const email = String(data.get('email') || '').trim();
        const service = String(data.get('service') || '').trim();
        const message = String(data.get('message') || '').trim();
        const subject = `Consulta web: ${service}`;
        const body = [
            `Nombre: ${name}`,
            `Empresa: ${company || 'No indicada'}`,
            `Correo: ${email}`,
            `Servicio: ${service}`,
            '',
            'Mensaje:',
            message
        ].join('\n');
        window.location.href = `mailto:eleuiese@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });

    const year = document.getElementById('current-year');
    if (year) year.textContent = String(new Date().getFullYear());
})();
