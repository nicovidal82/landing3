# SYNOTEC - Página Web Corporativa

Página web moderna y minimalista para SYNOTEC, consultora de automatización industrial.

## Características

- **Diseño Responsivo**: Compatible con dispositivos móviles, tablets y escritorio
- **Framework**: Bootstrap 5.3.2
- **Tipografía**: Google Fonts - Poppins
- **Paleta de Colores**:
  - Gris Oscuro (#333e48) - Color primario
  - Turquesa (#00c7d3) - Color de acento
  - Blanco (#ffffff) - Fondo principal

## Estructura del Proyecto

```
synotec-website/
├── index.html          # Página principal
├── styles.css          # Estilos personalizados
├── script.js           # JavaScript interactivo
├── images/             # Carpeta de imágenes
│   ├── LogoSynotec.png     # Logo final
│   ├── hero-bg.jpg
│   └── growth-chart.png
└── README.md           # Este archivo
```

## Secciones

1. **Hero Section**: Presentación principal con llamado a la acción
   - Título: "SYNOTEC: Ingeniería y Consultoría para la Rentabilidad Operacional"
   - Subtítulo: "Evaluamos y optimizamos sus procesos industriales con resultados medibles y sostenibles, con experiencia transversal."
   
2. **Servicios**: Tres servicios principales
   - Automatización Industrial
   - Consultoría en ROI
   - **Optimización de Procesos** (destacado con borde turquesa)
   
3. **Contacto**: Formulario de contacto funcional con validación y el logo de SYNOTEC al costado (solo imagen, sin texto de marca).

4. **Footer**: Información de copyright

## Funcionalidades JavaScript

- Navegación suave (smooth scroll)
- Animaciones de entrada para elementos
- Validación de formulario de contacto
- Efecto parallax en el hero
- Navbar con indicador de sección activa
- Diseño responsivo con menú hamburguesa

## Cómo Usar

### Opción 1: Servidor Local con Python

```bash
cd synotec-website
python3 -m http.server 8000
```

Luego abrir en el navegador: `http://localhost:8000`

### Opción 2: Servidor Local con Node.js

```bash
cd synotec-website
npx http-server -p 8000
```

### Opción 3: Abrir directamente

Simplemente abrir el archivo `index.html` en un navegador web moderno.

## Personalización

### Cambiar Colores

Editar las variables CSS en `styles.css`:

```css
:root {
    --color-primary: #333e48;
    --color-accent: #00c7d3;
    --color-bg: #ffffff;
}
```

### Modificar Contenido

El contenido se encuentra en `index.html`. Buscar las secciones correspondientes y editar el texto.

### Agregar Imágenes

Colocar las imágenes en la carpeta `images/` y referenciarlas en el HTML.

## Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript ES6+
- Bootstrap 5.3.2
- Google Fonts (Poppins)

## Navegadores Compatibles

- Chrome (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Edge (últimas 2 versiones)

## Cambios Recientes

### Versión 4.0 (Final)
- **Logo actualizado** con el archivo `Logoconbajadarecorte.png` (renombrado a `LogoSynotec.png`).
- **Texto de marca eliminado** de la sección de contacto, dejando solo la imagen del logo.
- **Paleta de colores** (Gris Oscuro y Turquesa) y **estructura de servicios** (3 columnas con Optimización de Procesos destacado) se mantienen.

## Notas

- El formulario de contacto actualmente simula el envío. Para producción, conectar con un backend o servicio de email.
- Las imágenes son de alta calidad y optimizadas para web.
- El diseño sigue principios de minimalismo y jerarquía visual.

---

**SYNOTEC** - Essential Automation
