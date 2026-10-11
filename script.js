/* ==========================================================
   VAPXXMZ — Lógica del sitio
   1) Lista de productos (la parte que TÚ editas)
   2) Menú móvil, catálogo, filtros y animaciones
   ========================================================== */

// Marca que hay JavaScript activo (los estilos dependen de esto).
document.documentElement.classList.add("js");

/* ==========================================================
   1) PRODUCTOS — EDITA SOLO ESTA LISTA
   ----------------------------------------------------------
   Cada producto es un bloque entre llaves { ... } separado por coma.

   Campos:
   - nombre       Nombre del producto.
   - categoria    Categoría (los botones de filtro se crean solos con ellas).
   - descripcion  Texto breve.
   - imagen       Ruta de la foto, p. ej. "assets/productos/mi-foto.jpg".
                  Déjala vacía ("") para mostrar el espacio "Foto pendiente".
   - alt          Descripción de la foto para accesibilidad (opcional;
                  si falta se usa el nombre).
   - etiquetas    Lista de etiquetas informativas, p. ej. ["Color negro"].
                  Puede ir vacía: [].

   Para AGREGAR un producto: copia un bloque completo y cambia sus datos.
   Para QUITAR uno: borra su bloque completo.
   NO agregues precios ni datos que no sean reales.

   Los 6 bloques de abajo son SOLO ESPACIOS DE EJEMPLO. Reemplázalos
   por tus productos reales.
   ========================================================== */
const PRODUCTOS = [
  {
    nombre: "Producto 1 (ejemplo)",
    categoria: "Categoría 1",
    descripcion: "Descripción breve del producto. Reemplaza este texto.",
    imagen: "",
    alt: "",
    etiquetas: []
  },
  {
    nombre: "Producto 2 (ejemplo)",
    categoria: "Categoría 1",
    descripcion: "Descripción breve del producto. Reemplaza este texto.",
    imagen: "",
    alt: "",
    etiquetas: []
  },
  {
    nombre: "Producto 3 (ejemplo)",
    categoria: "Categoría 2",
    descripcion: "Descripción breve del producto. Reemplaza este texto.",
    imagen: "",
    alt: "",
    etiquetas: []
  },
  {
    nombre: "Producto 4 (ejemplo)",
    categoria: "Categoría 2",
    descripcion: "Descripción breve del producto. Reemplaza este texto.",
    imagen: "",
    alt: "",
    etiquetas: []
  },
  {
    nombre: "Producto 5 (ejemplo)",
    categoria: "Categoría 3",
    descripcion: "Descripción breve del producto. Reemplaza este texto.",
    imagen: "",
    alt: "",
    etiquetas: []
  },
  {
    nombre: "Producto 6 (ejemplo)",
    categoria: "Categoría 3",
    descripcion: "Descripción breve del producto. Reemplaza este texto.",
    imagen: "",
    alt: "",
    etiquetas: []
  }
];

// Enlace oficial de Facebook (se usa en los enlaces de cada tarjeta).
const URL_FACEBOOK = "https://www.facebook.com/share/1C8TLNaWrW/?mibextid=wwXIfr";

/* ==========================================================
   2) CÓDIGO DEL SITIO — normalmente no necesitas tocar nada de aquí
   ========================================================== */

const ICONO_FOTO =
  '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">' +
  '<rect x="3" y="5" width="18" height="14" rx="2"/>' +
  '<circle cx="9" cy="11" r="2"/>' +
  '<path d="m21 16-5-5-8 8"/></svg>';

const grid = document.getElementById("catalogo-grid");
const filtros = document.getElementById("filtros");
const vacio = document.getElementById("catalogo-vacio");
let categoriaActiva = "Todos";
let observer = null;

/* ---------- Animación de aparición ---------- */
function prepararObserver() {
  const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducido || !("IntersectionObserver" in window)) return null;
  return new IntersectionObserver(
    (entradas, obs) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
}

function observar(el) {
  if (observer) observer.observe(el);
  else el.classList.add("is-visible");
}

/* ---------- Tarjetas del catálogo ---------- */
function crearPlaceholder() {
  const ph = document.createElement("div");
  ph.className = "placeholder";
  ph.innerHTML = ICONO_FOTO;
  const txt = document.createElement("span");
  txt.textContent = "Foto pendiente";
  ph.appendChild(txt);
  return ph;
}

function crearTarjeta(p) {
  const li = document.createElement("li");
  li.className = "card reveal";

  const media = document.createElement("div");
  media.className = "card-media";

  if (p.imagen) {
    const img = document.createElement("img");
    img.src = p.imagen;
    img.alt = p.alt || p.nombre;
    img.width = 800;
    img.height = 1000;
    img.loading = "lazy";
    img.decoding = "async";
    // Si la imagen no carga, se muestra el espacio de foto pendiente.
    img.addEventListener("error", () => {
      media.replaceChildren(crearPlaceholder());
    });
    media.appendChild(img);
  } else {
    media.appendChild(crearPlaceholder());
  }

  const body = document.createElement("div");
  body.className = "card-body";

  const cat = document.createElement("p");
  cat.className = "card-category";
  cat.textContent = p.categoria;

  const titulo = document.createElement("h3");
  titulo.className = "card-title";
  titulo.textContent = p.nombre;

  const desc = document.createElement("p");
  desc.className = "card-desc";
  desc.textContent = p.descripcion;

  body.append(cat, titulo, desc);

  if (Array.isArray(p.etiquetas) && p.etiquetas.length) {
    const ul = document.createElement("ul");
    ul.className = "tags";
    p.etiquetas.forEach((t) => {
      const tag = document.createElement("li");
      tag.className = "tag";
      tag.textContent = t;
      ul.appendChild(tag);
    });
    body.appendChild(ul);
  }

  const enlace = document.createElement("a");
  enlace.className = "card-link";
  enlace.href = URL_FACEBOOK;
  enlace.target = "_blank";
  enlace.rel = "noopener noreferrer";
  enlace.textContent = "Consultar en Facebook";
  const aviso = document.createElement("span");
  aviso.className = "sr-only";
  aviso.textContent = " (se abre en una pestaña nueva)";
  enlace.appendChild(aviso);
  body.appendChild(enlace);

  li.append(media, body);
  return li;
}

function pintarCatalogo() {
  grid.replaceChildren();
  const lista =
    categoriaActiva === "Todos"
      ? PRODUCTOS
      : PRODUCTOS.filter((p) => p.categoria === categoriaActiva);

  lista.forEach((p) => {
    const tarjeta = crearTarjeta(p);
    grid.appendChild(tarjeta);
    observar(tarjeta);
  });
  vacio.hidden = lista.length > 0;
}

/* ---------- Filtros por categoría ---------- */
function pintarFiltros() {
  const categorias = [...new Set(PRODUCTOS.map((p) => p.categoria).filter(Boolean))];
  filtros.replaceChildren();
  // Con una sola categoría no hace falta filtrar.
  if (categorias.length < 2) return;

  ["Todos", ...categorias].forEach((nombre) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip";
    b.textContent = nombre;
    b.setAttribute("aria-pressed", String(nombre === categoriaActiva));
    b.addEventListener("click", () => {
      categoriaActiva = nombre;
      filtros.querySelectorAll(".chip").forEach((c) =>
        c.setAttribute("aria-pressed", String(c === b))
      );
      pintarCatalogo();
    });
    filtros.appendChild(b);
  });
}

/* ---------- Menú móvil ---------- */
function iniciarMenu() {
  const boton = document.querySelector(".nav-toggle");
  const menu = document.getElementById("menu-principal");
  if (!boton || !menu) return;
  const etiqueta = boton.querySelector(".sr-only");

  function abrir(abierto) {
    menu.classList.toggle("is-open", abierto);
    boton.setAttribute("aria-expanded", String(abierto));
    if (etiqueta) etiqueta.textContent = abierto ? "Cerrar menú" : "Abrir menú";
  }

  boton.addEventListener("click", () => abrir(!menu.classList.contains("is-open")));

  // Cierra al elegir una opción.
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => abrir(false)));

  // Cierra con Escape y devuelve el foco al botón.
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) {
      abrir(false);
      boton.focus();
    }
  });

  // Cierra al tocar fuera del menú.
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !boton.contains(e.target)) abrir(false);
  });

  // Si la ventana pasa a tamaño escritorio, restablece el estado.
  window.matchMedia("(min-width: 800px)").addEventListener("change", (e) => {
    if (e.matches) abrir(false);
  });
}

/* ---------- Inicio ---------- */
function iniciar() {
  observer = prepararObserver();
  iniciarMenu();
  pintarFiltros();
  pintarCatalogo();
  document.querySelectorAll(".reveal").forEach((el) => {
    if (!el.closest("#catalogo-grid")) observar(el);
  });
  const anio = document.getElementById("anio");
  if (anio) anio.textContent = new Date().getFullYear();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciar);
} else {
  iniciar();
}
