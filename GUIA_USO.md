# Guía de Uso - Web Corporativa Caminando Otro Sendero

## 📋 Inicio Rápido

### 1. Estructura del Proyecto
```
CaminandoOtroSendero/
├── index.html                 # Página principal
├── pages/                     # Páginas internas
│   ├── servicios.html
│   ├── sobre-nosotros.html
│   ├── blog.html
│   └── contacto.html
├── js/                        # Scripts modular
│   ├── config.js             # ⭐ Datos globales
│   ├── components.js         # Componentes reutilizables
│   └── script.js             # Lógica principal
├── styles.css                 # Estilos
└── images/                    # Recursos
```

## 🔧 Cómo Funciona

### Componentes Automáticos
El archivo `js/components.js` inyecta automáticamente:
- **Header** (navegación) en cada página
- **Footer** con enlaces y contacto

Esto significa que cualquier cambio en el header o footer se refleja en todas las páginas automáticamente.

### Datos Centralizados
Todos los datos se guardan en `js/config.js`:
- Información de la empresa
- Servicios disponibles
- Publicaciones
- Enlaces de navegación

## 📝 Guía de Personalización

### 1. Cambiar Información de Contacto
**Archivo**: `js/config.js`

```javascript
contact: {
    email: 'nuevo@email.com',
    phone: '+56 9 XXXX XXXX',
    whatsapp: '+56XXXXXXXXX',
},
```

### 2. Actualizar Servicios
**Archivo**: `js/config.js`

```javascript
services: [
    {
        id: 'nuevo-servicio',
        title: 'Mi Nuevo Servicio',
        icon: '📌',
        description: 'Descripción...',
        features: ['Característica 1', 'Característica 2']
    }
]
```

### 3. Agregar Publicaciones
**Archivo**: `js/config.js`

```javascript
publications: [
    {
        year: 2025,
        title: 'Nuevo Artículo',
        authors: 'Autor',
        journal: 'Revista',
        url: 'https://...'
    }
]
```

### 4. Cambiar Colores
**Archivo**: `styles.css` (líneas 1-18)

```css
:root {
    --primary-color: #27ae60;      /* Verde principal */
    --primary-dark: #229954;        /* Verde oscuro */
    --accent-color: #f39c12;        /* Naranja */
    /* ... otros colores */
}
```

### 5. Actualizar Navegación
**Archivo**: `js/config.js`

```javascript
navigation: [
    { label: 'Inicio', url: 'index.html' },
    { label: 'Servicios', url: 'pages/servicios.html', submenu: true },
    // Agregar más...
]
```

## 🎨 Personalización de Páginas

### Página de Inicio (index.html)
- Carrusel de imágenes
- Servicios destacados
- Resumen de empresa
- Publicaciones recientes
- Estadísticas

### Página de Servicios (servicios.html)
- Detalle completo de cada servicio
- Características
- Metodología
- Proceso de cotización

### Página Sobre Nosotros (sobre-nosotros.html)
- Historia de la empresa
- Misión, Visión, Valores
- Equipo
- Timeline de experiencias
- Publicaciones científicas

### Página Blog (blog.html)
- Artículos destacados
- Newsletter
- Galería de posts

### Página Contacto (contacto.html)
- Información de contacto
- Formulario de contacto
- Formulario de cotización
- FAQ
- Redes sociales

## 🚀 Agregar Nueva Página

### Paso 1: Crear archivo HTML
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <!-- Meta tags -->
    <link rel="stylesheet" href="../styles.css">
</head>
<body>
    <!-- Tu contenido aquí -->
    
    <script src="../js/config.js"></script>
    <script src="../js/components.js"></script>
    <script src="../script.js"></script>
</body>
</html>
```

### Paso 2: Guardar en `pages/` directory

### Paso 3: Agregar a navegación en `config.js`

## ⚡ Funcionalidades Especiales

### Carrusel de Imágenes
- Cambio automático cada 5 segundos
- Indicadores clicables
- Transiciones suaves

### Menú Desplegable
- Dropdown en "Servicios"
- Navegación rápida a servicios
- Responde en mobile

### FAQ Interactivo
- Click para expandir/contraer
- Una pregunta abierta a la vez
- Animaciones suaves

### Scroll Suave
- Navegación interna suave
- Scroll to top automático
- Animaciones al desplazarse

### Estadísticas Animadas
- Contadores que se animan al scrollear
- Efecto visual atractivo

## 📱 Responsividad

La web es totalmente responsive:
- **Desktop**: Experiencia completa
- **Tablet**: Adaptado a pantalla media
- **Mobile**: Menú hamburguesa, grid flexible

## 🔐 Seguridad

Los formularios son de demostración. Para producción:
1. Integra backend con Node.js, PHP o similar
2. Implementa CSRF protection
3. Valida datos en servidor
4. Usa HTTPS

## 🎯 Próximos Pasos

- [ ] Conectar formularios a backend
- [ ] Agregar blog dinámico con CMS
- [ ] Integrar galería de imágenes reales
- [ ] Implementar analytics (Google)
- [ ] Optimizar para SEO
- [ ] Agregar sitemap.xml
- [ ] Crear robots.txt

## 📞 Soporte

Para dudas o cambios, edita los archivos según lo necesites. La estructura está diseñada para ser fácilmente mantenible.

---

**Última actualización**: Enero 2026
