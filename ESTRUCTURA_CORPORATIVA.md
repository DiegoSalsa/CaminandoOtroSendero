# Caminando Otro Sendero - Web Corporativa

## Descripción
Transformación de la landing page original a una **web corporativa profesional** con múltiples páginas, navegación mejorada y estructura modular.

## Estructura del Proyecto

```
CaminandoOtroSendero/
├── index.html                 # Página de inicio (HOME)
├── pages/
│   ├── servicios.html         # Página detallada de servicios
│   ├── sobre-nosotros.html    # Página sobre la empresa, equipo e historia
│   ├── blog.html              # Página con artículos y publicaciones
│   └── contacto.html          # Página de contacto y cotización
├── js/
│   ├── config.js              # Configuración global y datos
│   ├── components.js          # Componentes reutilizables (Header, Footer)
│   └── script.js              # JavaScript principal
├── styles.css                 # Estilos (actualizado para nuevas páginas)
├── images/                    # Imágenes y recursos
└── generate_images.py         # Script para generar imágenes de demostración
```

## Cambios Principales

### 1. **Estructura Modular**
- **js/config.js**: Configuración centralizada con datos de la empresa, servicios, publicaciones, etc.
- **js/components.js**: Componentes reutilizables (Header, Footer) que se inyectan en cada página
- Facilita el mantenimiento y actualización de datos globales

### 2. **Páginas Corporativas**
- **index.html**: Página de inicio con resumen de servicios, estadísticas e invitación a explorar más
- **servicios.html**: Detalle completo de cada servicio con características y metodología
- **sobre-nosotros.html**: Historia de la empresa, equipo, publicaciones científicas y experiencia
- **blog.html**: Artículos, publicaciones y contenido educativo
- **contacto.html**: Información de contacto, formularios y FAQ

### 3. **Navegación Mejorada**
- Menú desplegable (dropdown) en "Servicios"
- Breadcrumb de navegación en páginas internas
- Enlaces internos coherentes entre secciones

### 4. **Componentes Dinámicos**
- Header y Footer se cargan automáticamente en cada página
- Menú activo actualizado según página actual
- Navegación normalizada en todo el sitio

### 5. **Nuevas Secciones**
- Página de Blog con artículos destacados
- Sección de Sobre Nosotros expandida
- Publicaciones científicas detalladas
- Timeline de experiencias

## Cómo Usar

### Actualizar Información Global
Edita `js/config.js` para cambiar:
- Datos de contacto
- Servicios y descripcionesisticas
- Publicaciones
- Información de navegación

### Agregar Nuevas Páginas
1. Crea un nuevo archivo HTML en `pages/`
2. Incluye los scripts: `config.js`, `components.js`, `script.js`
3. Los componentes se cargarán automáticamente

### Personalizar Estilos
- Actualiza `styles.css` para nuevas secciones
- Los colores y temas se definen en variables CSS

## Ventajas de la Nueva Estructura

✅ **Mantenibilidad**: Datos centralizados en config.js  
✅ **Escalabilidad**: Fácil agregar nuevas páginas y secciones  
✅ **Reutilización**: Header y Footer compartidos  
✅ **Profesionalismo**: Estructura corporativa estándar  
✅ **SEO**: Mejor organización para buscadores  
✅ **UX**: Navegación intuitiva y clara  

## Próximas Mejoras Sugeridas

- [ ] Integrar backend para formularios
- [ ] Sistema de CMS para blog
- [ ] Galería de imágenes de proyectos
- [ ] Sistema de comentarios
- [ ] Newsletter automático
- [ ] Analytics e tracking
- [ ] Multi-idioma (EN/ES)
- [ ] PWA (Progressive Web App)

---

**Creado**: Enero 2026  
**Empresa**: Caminando Otro Sendero E.I.R.L
