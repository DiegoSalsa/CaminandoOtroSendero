// Componentes Reutilizables
class Header {
    constructor() {
        this.basePath = UTILS.getBasePath();
    }

    render() {
        return `
            <nav class="navbar">
                <div class="nav-container">
                    <div class="logo">
                        <a href="${this.basePath}index.html">
                            <img src="${this.basePath}assets/logo.png" alt="Logo Caminando Otro Sendero" class="logo-img">
                        </a>
                    </div>
                    <ul class="nav-menu" id="navMenu">
                        <li><a href="${this.basePath}index.html" class="nav-link">Inicio</a></li>
                        <li class="nav-dropdown">
                            <a href="${this.basePath}pages/servicios.html" class="nav-link dropdown-toggle">Servicios <span class="dropdown-arrow">▾</span></a>
                            <div class="dropdown-menu">
                                <a href="${this.basePath}pages/servicios/linea-base-terrestre.html">Línea Base Terrestre</a>
                                <a href="${this.basePath}pages/servicios/taxonomia-acuatica.html">Taxonomía Acuática</a>
                                <a href="${this.basePath}pages/servicios/capacitaciones.html">Capacitaciones</a>
                                <a href="${this.basePath}pages/servicios/educacion-ambiental.html">Educación Ambiental</a>
                            </div>
                        </li>
                        <li><a href="${this.basePath}pages/sobre-nosotros.html" class="nav-link">Nosotros</a></li>
                        <li><a href="${this.basePath}pages/contacto.html" class="btn btn-nav">Contacto</a></li>
                    </ul>
                    <div class="hamburger" id="hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>
        `;
    }

    mount(selector) {
        const container = typeof selector === 'string' ? document.querySelector(selector) : selector;
        if (container && !document.querySelector('.navbar')) {
            container.insertAdjacentHTML('afterbegin', this.render());
        }
    }
}

class Footer {
    constructor() {
        this.basePath = UTILS.getBasePath();
        this.config = CONFIG;
    }

    render() {
        const year = new Date().getFullYear();
        return `
            <footer class="footer">
                <div class="footer-main">
                    <div class="container">
                        <div class="footer-grid">
                            <div class="footer-brand">
                                <img src="${this.basePath}assets/logo.png" alt="Logo" class="footer-logo">
                                <p class="footer-desc">${this.config.company.description}</p>
                            </div>
                            <div class="footer-links">
                                <h4>Navegación</h4>
                                <ul>
                                    <li><a href="${this.basePath}index.html">Inicio</a></li>
                                    <li><a href="${this.basePath}pages/servicios.html">Servicios</a></li>
                                    <li><a href="${this.basePath}pages/sobre-nosotros.html">Nosotros</a></li>
                                    <li><a href="${this.basePath}pages/contacto.html">Contacto</a></li>
                                </ul>
                            </div>
                            <div class="footer-links">
                                <h4>Servicios</h4>
                                <ul>
                                    <li><a href="${this.basePath}pages/servicios/linea-base-terrestre.html">Línea Base Terrestre</a></li>
                                    <li><a href="${this.basePath}pages/servicios/taxonomia-acuatica.html">Taxonomía Acuática</a></li>
                                    <li><a href="${this.basePath}pages/servicios/capacitaciones.html">Capacitaciones</a></li>
                                    <li><a href="${this.basePath}pages/servicios/educacion-ambiental.html">Educación Ambiental</a></li>
                                </ul>
                            </div>
                            <div class="footer-contact">
                                <h4>Contacto</h4>
                                <div class="contact-item">
                                    <span class="contact-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></span>
                                    <a href="mailto:${this.config.contact.email}">${this.config.contact.email}</a>
                                </div>
                                <div class="contact-item">
                                    <span class="contact-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
                                    <a href="tel:${this.config.contact.phone.replace(/ /g, '')}">${this.config.contact.phone}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <div class="container">
                        <p>&copy; ${year} ${this.config.company.name} - Todos los derechos reservados</p>
                    </div>
                </div>
            </footer>
        `;
    }

    mount(selector) {
        const container = typeof selector === 'string' ? document.querySelector(selector) : selector;
        if (container && !document.querySelector('.footer')) {
            container.insertAdjacentHTML('beforeend', this.render());
        }
    }
}

// Inicializar componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const header = new Header();
    const footer = new Footer();

    // Usar contenedores específicos o body
    const headerContainer = document.querySelector('#header-container') || document.body;
    const footerContainer = document.querySelector('#footer-container') || document.body;
    
    header.mount(headerContainer);
    footer.mount(footerContainer);

    // Hamburger menu - inicializar inmediatamente después de montar
    initMobileMenu();
});

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (!hamburger || !navMenu) {
        console.error('Menu elements not found');
        return;
    }

    // Toggle del menú
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // También funciona con touch
    hamburger.addEventListener('touchend', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar al hacer click fuera
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active')) {
            if (!e.target.closest('.nav-menu') && !e.target.closest('.hamburger')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });

    // Cerrar menú al hacer click en un link (excepto dropdown)
    document.querySelectorAll('.nav-menu a:not(.dropdown-toggle)').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Dropdown en móvil
    document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) {
            const handleDropdownToggle = function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    // Cerrar otros dropdowns
                    document.querySelectorAll('.nav-dropdown').forEach(d => {
                        if (d !== dropdown) d.classList.remove('open');
                    });
                    dropdown.classList.toggle('open');
                }
            };
            
            toggle.addEventListener('click', handleDropdownToggle);
            toggle.addEventListener('touchend', handleDropdownToggle);
        }
    });

    // Actualizar clase activa en navegación
    if (typeof UTILS !== 'undefined') {
        const currentPage = UTILS.getCurrentPage();
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes(currentPage)) {
                link.classList.add('active');
            }
        });
    }
}
