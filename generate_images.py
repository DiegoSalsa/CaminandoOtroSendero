from PIL import Image, ImageFilter
import os

# Asegurar que la carpeta existe
os.makedirs('images', exist_ok=True)

# Crear 4 imágenes de naturaleza/ambiente para el carrusel
images_config = [
    {
        'name': 'nature-1.jpg',
        'colors': [(34, 139, 34), (50, 200, 50), (100, 150, 100)],
        'title': 'Naturaleza Verde'
    },
    {
        'name': 'nature-2.jpg',
        'colors': [(25, 100, 140), (50, 150, 180), (70, 180, 200)],
        'title': 'Agua y Cielo'
    },
    {
        'name': 'nature-3.jpg',
        'colors': [(139, 69, 19), (160, 82, 45), (184, 134, 11)],
        'title': 'Tierra y Suelo'
    },
    {
        'name': 'nature-4.jpg',
        'colors': [(47, 79, 47), (60, 120, 60), (85, 170, 85)],
        'title': 'Bosque Denso'
    },
]

for config in images_config:
    # Crear imagen base
    img = Image.new('RGB', (1920, 1080), color=config['colors'][0])
    pixels = img.load()
    
    # Crear degradado y patrón natural
    for y in range(1080):
        for x in range(1920):
            # Degradado suave
            r = config['colors'][0][0] + (y // 10) % 50
            g = config['colors'][1][1] - (x // 20) % 30
            b = config['colors'][2][2] + (y // 15) % 40
            
            # Limitar valores entre 0 y 255
            r = min(255, max(0, r))
            g = min(255, max(0, g))
            b = min(255, max(0, b))
            
            pixels[x, y] = (r, g, b)
    
    # Aplicar filtro para hacerlo más natural
    img = img.filter(ImageFilter.GaussianBlur(radius=5))
    
    # Guardar imagen
    img.save(f'images/{config["name"]}')
    print(f'✓ Creada imagen: {config["name"]} ({config["title"]})')

print('\n✨ Imágenes del carrusel creadas exitosamente')
