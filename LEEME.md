# VAPXXMZ — Sitio web

Sitio estático (HTML + CSS + JavaScript, sin frameworks ni dependencias).

```
vapxxmz/
├── index.html      Estructura y textos de la página
├── styles.css      Diseño (colores en las variables de :root)
├── script.js       Lista de PRODUCTOS (arriba) + menú, filtros y animaciones
└── assets/
    └── productos/  Aquí van las fotos de tus productos
```

## Cómo abrirlo en tu computadora
1. Descomprime la carpeta.
2. Haz doble clic en `index.html`. Se abre en tu navegador. No necesita internet ni servidor.

## Cómo agregar tus productos reales
1. Guarda tus fotos en `assets/productos/` (formato JPG o WebP, idealmente verticales 4:5, de unos 800×1000 px y menos de 200 KB cada una).
2. Abre `script.js` y busca la lista `PRODUCTOS` (al inicio del archivo).
3. Reemplaza los 6 bloques de ejemplo por tus productos. Cada bloque se ve así:

```js
{
  nombre: "Nombre real del producto",
  categoria: "Nombre de la categoría",
  descripcion: "Descripción breve y real.",
  imagen: "assets/productos/nombre-de-la-foto.jpg",
  alt: "Descripción de la foto (accesibilidad)",
  etiquetas: ["Etiqueta 1", "Etiqueta 2"]
},
```

- Para agregar otro producto, copia un bloque completo (con su coma al final).
- Para quitarlo, borra el bloque completo.
- Los botones de filtro por categoría se crean solos.
- Si `imagen` queda vacía, se muestra el espacio "Foto pendiente".
- No agregues precios ni datos que no sean reales.

## Textos que puedes cambiar
- Frase de portada: `index.html`, busca `hero-tagline`.
- Sección "Nosotros": `index.html`, sección `id="nosotros"`.
- Colores: `styles.css`, variables al inicio (`--accent`, `--bg`, etc.).

## Aviso de privacidad
Cuando tengas el texto, crea `aviso-privacidad.html` y descomenta la línea indicada en el pie de página de `index.html`.

## Cómo publicarlo (gratis) para que cualquiera entre desde un navegador
Elige UNA opción:

**A) Netlify Drop (la más sencilla, sin cuenta técnica)**
1. Entra a https://app.netlify.com/drop
2. Arrastra la carpeta completa `vapxxmz` a la página.
3. Te da una dirección pública (puedes cambiar el nombre en la configuración del sitio).

**B) Cloudflare Pages**
1. Crea una cuenta en https://pages.cloudflare.com
2. Elige "Create a project" → "Upload assets" y sube la carpeta.

**C) GitHub Pages**
1. Crea un repositorio público en GitHub y sube los archivos.
2. En Settings → Pages, elige la rama principal como origen.
3. La dirección queda como `https://TU-USUARIO.github.io/NOMBRE-DEL-REPOSITORIO/`.

Cada vez que cambies productos o fotos, vuelve a subir la carpeta (o los archivos modificados).

## Un dominio propio (opcional)
Puedes comprar un dominio (por ejemplo `vapxxmz.com`) y conectarlo desde el panel de Netlify, Cloudflare o GitHub Pages.
