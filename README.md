# Portafolio · Pascualtobias Rendon

Portafolio de diseño interactivo, realidad virtual, realidad aumentada y UI/UX.
Implementa el diseño **"Modernist"** creado en Claude Design: todo en Archivo, un único rojo sobre gris
claro, rejilla visible, esquinas a 0, líneas de 2px e imágenes en blanco y negro que recuperan el color
al pasar el ratón.

HTML, CSS y JavaScript puros: **sin dependencias ni paso de compilación**. Se abre en cualquier navegador
y se publica gratis en GitHub Pages, Netlify o Vercel.

---

## Estructura

```
Portafolio/
├── index.html                      Inicio: nombre, cinta de disciplinas y lista de proyectos
├── sobre-mi.html                   Sobre mí: retrato, texto, enfoque, herramientas y trayectoria
├── proyectos/
│   ├── pasos-de-tradicion.html     Proyecto 01
│   ├── selva-que-alimenta.html     Proyecto 02
│   └── dissonance.html             Proyecto 03
└── assets/
    ├── css/styles.css              Estilos (los tokens del sistema están al inicio)
    ├── js/main.js                  Lista de proyectos y transiciones entre páginas
    ├── img/                        Favicon y tus imágenes
    └── docs/                       Aquí va tu CV.pdf (crea la carpeta)
```

## Verlo en local

- **Rápido:** doble clic en `index.html`.
- **Recomendado:** VS Code + extensión **Live Server** → clic derecho en `index.html` → *Open with Live Server*.
- **Con Python:** `python -m http.server 5173` y abre <http://localhost:5173>.

Si no ves un cambio de CSS, recarga sin caché con **Ctrl + F5**.

---

## ✏️ Pendiente de completar

Todo lo que hay que editar está marcado en el código con `✏️`. Los textos en gris claro
(«Añadir rol», «Añadir plataforma»…) también son huecos por rellenar.

- [x] **Correo:** pascualtobias@gmail.com en todas las páginas.
- [ ] **LinkedIn:** el enlace apunta a la portada de LinkedIn; pon tu perfil.
- [ ] **CV:** guarda tu CV en `assets/docs/CV.pdf`.
- [ ] **Pasos de tradición:** el contenido, la portada, la imagen de Contexto y el video salen del sitio
      del proyecto. Revisa la sección «Mi rol», añade el SDK de AR que usaste y tus capturas del proceso
      (escena en Unity y prueba en Android). El video pesa 25 MB: conviene comprimirlo antes de publicar.
- [x] **Selva que alimenta y Dissonance:** páginas completas (ver `_material/PLAN-CASOS.md`).
- [ ] **Proceso de cada proyecto:** las fases están redactadas a partir del texto del diseño. Revísalas,
      añade o quita fases y cuenta lo que realmente hiciste.
- [ ] **Imágenes:** vistas previas en el inicio (dos por proyecto: lista y panel), portadas, proceso y
      resultado de cada proyecto, y tu retrato.
- [ ] **Sobre mí:** herramientas y trayectoria.

Truco: en VS Code, **Ctrl + Shift + H** busca y reemplaza en todos los archivos a la vez (por ejemplo, el correo).

---

## Imágenes y videos

Cada hueco gris (`<span class="slot">…</span>`) dice qué imagen va ahí. Sustitúyelo por tu archivo:

```html
<!-- Antes -->
<div class="media">
  <span class="slot">…Portada — fotograma dentro del visor</span>
</div>

<!-- Después -->
<div class="media">
  <img src="../assets/img/selva/portada.jpg" alt="Cocina en la selva vista desde el visor">
</div>
```

Un video en bucle funciona igual (ideal para VR y AR):

```html
<div class="media">
  <video src="../assets/video/selva-loop.mp4" poster="../assets/img/selva/portada.jpg" autoplay muted loop playsinline></video>
</div>
```

**En el inicio** hay dos huecos por proyecto: el de la fila (móvil) y el del panel de vista previa
(escritorio). Pon la misma imagen en ambos con `alt=""`, porque el título ya está en la fila.

**Blanco y negro → color:** todas las imágenes se ven en B/N y recuperan el color al pasar el ratón.
En pantallas táctiles se ven siempre en color. Para cambiarlo, edita la variable `--bw` en
`assets/css/styles.css` (pon `--bw: none;` para ver todo siempre en color).

### Tamaños recomendados

| Uso                              | Proporción | Tamaño        |
| -------------------------------- | ---------- | ------------- |
| Vista previa en el inicio        | 4:3        | 1600 × 1200   |
| Portada y resultado del proyecto | 16:9       | 2400 × 1350   |
| Imágenes del proceso             | 4:3        | 1200 × 900    |
| Retrato                          | 4:5        | 1200 × 1500   |

Usa JPG o WebP de menos de 400 KB, y MP4 (H.264) de 5–15 s sin audio para los videos.

---

## Añadir un proyecto

1. Duplica una página de `proyectos/` y renómbrala, por ejemplo `proyectos/nuevo-proyecto.html`.
2. Cambia los textos y, en el `<h1>` y la portada, el nombre de la transición:
   `view-transition-name: title-nuevo-proyecto` y `cover-nuevo-proyecto` (igual que el nombre del archivo).
3. En `index.html`, copia un bloque `<a class="work-row" …>` y un `<div class="work-preview__item" …>`
   y cambia `href`, `data-vt` (el nombre del archivo sin `.html`), `data-line` y `data-work-preview`.
4. Actualiza «Proyecto 0X / 0Y» y los enlaces de **«Siguiente proyecto»** para que formen un ciclo.

## Qué incluye

- Inicio con una frase (el nombre queda arriba) y un cubo 3D que gira y se inclina hacia el ratón.
- Lista de proyectos con vista previa: al pasar por una fila cambian la imagen, el texto y el botón,
  y una etiqueta roja «Ver proyecto →» sigue al cursor.
- Transición entre páginas: la imagen y el título del proyecto "viajan" del inicio a su página
  (Chrome, Edge y Safari; en otros navegadores la página cambia sin animación).
- Cinta de disciplinas siempre en movimiento, como en el diseño.
  La velocidad se cambia en `.marquee__track` (`28s`; más segundos = más lenta).
- Responsive: en móvil la vista previa se convierte en una imagen dentro de cada fila.
- Accesibilidad: HTML semántico, enlace «Saltar al contenido», foco visible en rojo y respeto por la
  preferencia de «reducir movimiento».

## Personalizar el diseño

Los tokens del sistema están al inicio de `assets/css/styles.css`:

| Variable                  | Qué controla                                  |
| ------------------------- | --------------------------------------------- |
| `--color-accent`          | El rojo (botones, números, bloque de contacto) |
| `--color-bg` / `--color-text` | Fondo y tinta                             |
| `--color-surface`         | Fondo de imágenes y fila activa               |
| `--font-heading` / `--font-body` | Tipografía (Archivo, de Google Fonts)  |
| `--bw`                    | Filtro de las imágenes (blanco y negro)       |

Reglas del sistema: sin esquinas redondeadas, textos y botones siempre alineados a la izquierda, líneas
de 2px entre secciones y el rojo solo para la acción principal y pequeños acentos.

---

## Publicar

- **GitHub Pages:** sube la carpeta a un repositorio → *Settings → Pages → Deploy from a branch* → `main` / `root`.
- **Netlify Drop:** arrastra la carpeta a <https://app.netlify.com/drop>.
- **Vercel:** importa el repositorio desde <https://vercel.com/new>.

Antes de compartirlo, añade una imagen para redes sociales de 1200 × 630 (`assets/img/og.jpg`) y esta línea
en el `<head>` de cada página:

```html
<meta property="og:image" content="https://tu-dominio.com/assets/img/og.jpg">
```
