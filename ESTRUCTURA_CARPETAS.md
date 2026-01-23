# 📋 Estructura de Carpetas - Web Corporativa

```
CaminandoOtroSendero/
│
├── 📄 index.html                    # Página principal (HOME)
├── 📄 script.js                     # JavaScript principal
├── 📄 styles.css                    # Estilos CSS (1900+ líneas)
├── 📄 package.json                  # Dependencias
├── 📄 Favicon.png                   # Icono del sitio
├── 📄 generate_images.py            # Script para generar imágenes
│
├── 📁 js/                           # ⭐ JavaScript modular
│   ├── config.js                    # Configuración global y datos
│   ├── components.js                # Componentes reutilizables
│   └── (script.js - en raíz)
│
├── 📁 pages/                        # ⭐ Páginas corporativas
│   ├── servicios.html               # Servicios detallados
│   ├── sobre-nosotros.html          # Empresa, equipo, publicaciones
│   ├── blog.html                    # Blog y artículos
│   └── contacto.html                # Contacto, cotización, FAQ
│
├── 📁 images/                       # Recursos visuales
│   ├── Logo.png
│   ├── Favicon.png
│   ├── header1.jpg
│   ├── header2.jpg
│   ├── header3.jpg
│   └── header4.jpg
│
├── 📄 README.md                     # Información general
├── 📄 README_IMAGENES.md            # Info sobre imágenes
├── 📄 implementation_plan.md        # Plan de implementación
│
├── 📄 ESTRUCTURA_CORPORATIVA.md     # ⭐ Documentación técnica
├── 📄 GUIA_USO.md                   # ⭐ Tutorial de uso
└── 📄 TRANSFORMACION_RESUMEN.md     # ⭐ Resumen de cambios
```

## 🗂️ Detalle de Archivos Importantes

### Configuración y Lógica

#### js/config.js
```
Datos globales de la aplicación:
- Información de la empresa
- Servicios disponibles
- Publicaciones científicas
- Navegación del sitio
- Utilidades de navegación
```

#### js/components.js
```
Componentes reutilizables:
- Clase Header (navbarpción automática)
- Clase Footer (información + enlaces)
- Inyección automática al cargar DOM
```

#### script.js
```
Funcionalidades principales:
- Carrusel de imágenes
- Navegación responsiva
- Animaciones de scroll
- FAQ interactivo
- Formularios
```

### Páginas

#### index.html (5.8 KB)
```
Secciones:
- Hero con carrusel
- Servicios destacados
- Resumen de empresa
- Publicaciones recientes
- Estadísticas animadas
- CTA Section
```

#### pages/servicios.html (12 KB)
```
Secciones:
- Breadcrumb
- Hero secundario
- Detalle de cada servicio (4)
- Proceso de cotización
- CTA
```

#### pages/sobre-nosotros.html (14 KB)
```
Secciones:
- Breadcrumb
- Hero secundario
- Historia de empresa
- Misión, Visión, Valores
- Equipo
- Timeline de experiencias
- Publicaciones científicas
```

#### pages/blog.html (9 KB)
```
Secciones:
- Breadcrumb
- Hero secundario
- Artículos en grid
- Newsletter
- CTA
```

#### pages/contacto.html (16 KB)
```
Secciones:
- Breadcrumb
- Hero secundario
- Información de contacto
- Formulario de contacto
- Formulario de cotización
- FAQ interactivo
```

### Estilos

#### styles.css (1900+ líneas)
```
Secciones:
- Variables CSS (colores, sombras)
- Estilos base
- Componentes corporativos (300+ líneas)
- Responsive design
- Animaciones
```

## 📍 Rutas de Navegación

```
index.html
│
├─→ pages/servicios.html
│   ├─→ #linea-base-terrestres
│   ├─→ #taxonomia-acuatica
│   ├─→ #capacitaciones
│   └─→ #educacion-ambiental
│
├─→ pages/sobre-nosotros.html
│   └─→ Histórico, equipo, publicaciones
│
├─→ pages/blog.html
│   └─→ Artículos
│
└─→ pages/contacto.html
    ├─→ Formulario de contacto
    ├─→ Formulario de cotización
    └─→ FAQ
```

## 🔄 Flujo de Carga

1. **Carga HTML** → `index.html` o página específica
2. **Carga config.js** → Datos globales disponibles
3. **Carga components.js** → Header y Footer se inyectan
4. **Carga script.js** → Funcionalidades y eventos
5. **Carga styles.css** → Estilos aplicados

## 💾 Tamaño de Archivos

| Archivo | Tamaño | Líneas |
|---------|--------|--------|
| styles.css | ~80 KB | 1900+ |
| script.js | ~25 KB | 512 |
| index.html | ~6 KB | 350 |
| servicios.html | ~12 KB | 300 |
| sobre-nosotros.html | ~14 KB | 350 |
| blog.html | ~9 KB | 220 |
| contacto.html | ~16 KB | 380 |
| config.js | ~6 KB | 120 |
| components.js | ~4 KB | 80 |

## 🎯 Puntos de Entrada

- **Usuarios**: `index.html` (página de inicio)
- **Servicios**: `pages/servicios.html`
- **Información**: `pages/sobre-nosotros.html`
- **Blog**: `pages/blog.html`
- **Contacto**: `pages/contacto.html`

## 🔧 Archivos de Configuración

- `package.json` - Dependencias del proyecto
- `generate_images.py` - Generador de imágenes de demostración
- `js/config.js` - **EDITAR AQUÍ para cambios globales**

## 📚 Documentación

- `ESTRUCTURA_CORPORATIVA.md` - Descripción técnica
- `GUIA_USO.md` - Cómo usar y personalizar
- `TRANSFORMACION_RESUMEN.md` - Resumen de cambios
- `README.md` - Info general del proyecto
- `README_IMAGENES.md` - Info sobre imágenes

---

**Actualizado:** Enero 22, 2026
