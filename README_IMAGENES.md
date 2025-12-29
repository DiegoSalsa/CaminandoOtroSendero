📸 CÓMO AGREGAR TUS PROPIAS IMÁGENES AL CARRUSEL
================================================

## 📂 Ubicación de la carpeta de imágenes:
c:\Users\diego\Desktop\CaminandoOtroSendero\images

## ✅ Pasos para agregar imágenes:

1. **Abre la carpeta "images"** en tu explorador de archivos (c:\Users\diego\Desktop\CaminandoOtroSendero\images)

2. **Copia tus fotos** en esa carpeta (JPG, PNG, WebP)

3. **Nombra las imágenes** de forma clara, por ejemplo:
   - imagen1.jpg (naturaleza, bosque)
   - imagen2.jpg (agua, río)
   - imagen3.jpg (invertebrados)
   - imagen4.jpg (educación ambiental)

4. **Listo!** Las imágenes aparecerán automáticamente en el carrusel

## 🎨 Para cambiar las imágenes o agregar más:

Si quieres usar DIFERENTES NOMBRES o AGREGAR MÁS SLIDES:

1. Abre el archivo: index.html
2. Busca esta sección (línea ~30):

```html
<div class="carousel-slide active" style="background-image: url('images/imagen1.jpg')"></div>
<div class="carousel-slide" style="background-image: url('images/imagen2.jpg')"></div>
<div class="carousel-slide" style="background-image: url('images/imagen3.jpg')"></div>
<div class="carousel-slide" style="background-image: url('images/imagen4.jpg')"></div>
```

3. CAMBIA LOS NOMBRES según tus archivos:
   - 'images/imagen1.jpg' → 'images/foto-naturaleza.jpg'
   - etc.

4. Para AGREGAR MÁS imágenes, copia esta línea y pégala:
```html
<div class="carousel-slide" style="background-image: url('images/imagen5.jpg')"></div>
```

5. También agrega un indicador (puntito) en la sección de abajo:
```html
<span class="indicator" data-slide="4"></span>
```

## 📋 Recomendaciones:

✓ Usa imágenes de alta calidad (1920x1080 o superior)
✓ Formatos soportados: JPG, PNG, WebP
✓ Tamaño recomendado por imagen: 1-3 MB
✓ Las imágenes se mostrarán 5 segundos cada una
✓ El overlay verde sobre las imágenes hace que se lean bien los textos

## ⏱️ Cambiar el tiempo entre imágenes:

En script.js, busca:
```javascript
const slideInterval = 5000; // 5000 = 5 segundos
```

Cambia el número:
- 3000 = 3 segundos
- 7000 = 7 segundos
- etc.

¡Listo! Disfruta tu carrusel personalizado 🎬✨
