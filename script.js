// Aplica atributos a un elemento a partir de un objeto.
// - "class" acepta un string o un array de strings.
// - "dataset" acepta un objeto y crea atributos data-*.
// - Cualquier otro nombre (id, role, aria-label, title, etc.) usa setAttribute.
function aplicarAtributos(el, atributos = {}) {
  for (const [nombre, valor] of Object.entries(atributos)) {
    if (nombre === "class") {
      el.className = Array.isArray(valor) ? valor.join(" ") : valor;
    } else if (nombre === "dataset") {
      Object.assign(el.dataset, valor);
    } else {
      el.setAttribute(nombre, valor);
    }
  }
}

// Crea un <section> y lo inserta en "padre" (por defecto el body). Lo devuelve.
function generarSection(titulo, atributos = {}, padre = document.body) {
  const section = document.createElement("section");
  aplicarAtributos(section, atributos);
  if (titulo) {
    const h2 = document.createElement("h2");
    h2.textContent = titulo;
    section.appendChild(h2);
  }
  padre.appendChild(section);
  return section;
}

// Crea un elemento (etiqueta + texto + atributos) y lo inserta dentro del section recibido.
function insertarElemento(section, etiqueta = "p", texto = "", atributos = {}) {
  const el = document.createElement(etiqueta);
  el.textContent = texto;
  aplicarAtributos(el, atributos);
  if (section) {
    section.appendChild(el);
  }
  return el;
}

// Inserta código HTML (string) al final del section recibido.
function insertarHTML(section, html) {
  section.insertAdjacentHTML("beforeend", html);
  return section.lastElementChild; // el último elemento insertado
}


// activar una section y ocultar el resto
function activar(btn, section) {
  buttons.forEach(b => {
    b.classList.remove("active");
    b.setAttribute("aria-selected", "false");
  });
  sections.forEach(s => s.classList.remove("active"));

  btn.classList.add("active");
  btn.setAttribute("aria-selected", "true");
  section.classList.add("active");
}

// Agrega un botón (y su section) uno a uno.
function agregarTab(texto, id) {
  const section = generarSection(texto, { id, role: "tabpanel" }, main);
  const btn = insertarElemento(tabs, "button", texto, {
    class: "tab-btn",
    type: "button",
    role: "tab",
    "aria-selected": "false",
    "aria-controls": id
  });

  btn.addEventListener("click", () => activar(btn, section));

  buttons.push(btn);
  sections.push(section);

  // El primero que se agrega queda activo.
  if (buttons.length === 1) activar(btn, section);

  return { btn, section };
}

// agregar entrada 
function insertarEntrada(section, titulo, parrafo, etiqueta, imagen ) {
  const entrada = insertarElemento(section.section,"div", "", {class:"project"});
  insertarElemento(entrada, "img","",{src:imagen});

  const texto = insertarElemento(entrada,"div", "", {class:"project-body"});
  insertarElemento(texto, "h3",titulo,"");
  insertarElemento(texto, "p",parrafo,"");
  insertarElemento(texto, "lbl",etiqueta,"");
}

// agregar intem contacto
function insertarLink(section, titulo, texto, enlace, imagen) {
  const li = insertarElemento(section,"li", "", "");
  insertarElemento(li,"span", titulo, "");

  const a = insertarElemento(li,"a", texto, {href:enlace, target:"_blank", rel:"noopener noreferrer"});
  //insertarElemento(a,"img", "", {src:imagen, class:"icon"})
}

// GENERACION PAGINA
const nav = document.createElement("nav");
const tabs = insertarElemento(nav, "div", "", { class: "tabs", role: "tablist" });
const main = document.createElement("main");

document.body.append(nav, main);

// TABS
const buttons = [];
const sections = [];

const sobreMi = agregarTab("Sobre mí", "sobre-mi");
insertarElemento(sobreMi.section, "img","",{src:"images/profile.jpg", class:"avatar"});
insertarElemento(sobreMi.section, "h1", "Maldonado, Gustavo Emiliano");

insertarElemento(sobreMi.section, "p", `
Estudiante de 3-4º año de Ingeniería en Sistemas de Información en UTN FRC,
   con experiencia académica y práctica trabajando con Java-Maven, Python, Android Studio,
    Node.JS, React, Spring, Git y SQL.
` ,"");

const formacion = agregarTab("Formacion", "formacion");
insertarEntrada(formacion,
  "Ingeniería en Sistemas de Información",
  "Actualmente cursando 3-4º de la carrera.",
  "Universidad Tecnológica Nacional - 2023",
  "images/utn-logo.png"
);
insertarEntrada(formacion,
  "Instructor de Analista del Conocimiento (Java - SQL)",
  "Curso intensivo de desarrollo de aplicaciones de escritorio en java y con bases de datos mySQL.",
  "Plan 111 mil - Complejo de Capacitación Laboral Com.Ca.L - 2018",
  "images/java.jpg"
);
insertarEntrada(formacion,
  "Desarrollo de Apps Móviles (Android - iOS)",
  "Curso intensivo de desarrollo de aplicaciones mobile con AndroidStudio.",
  "Google y Universidad Complutense de Madrid",
  "images/android.png"
);

const proyectos = agregarTab("Proyectos", "proyectos");
insertarEntrada(proyectos,
  "pos26",
  "Sistema de punto de venta, gestion de inventario y cuantas corrientes",
  "Java/Swing - SQLite",
  "https://placehold.co/200x200/2a2822/9c968a?text=P"
);
insertarEntrada(proyectos,
  "UTN_EZ",
  "Calculo de correlativas de las carreras de la UTN, info de materias.",
  "Android - Java",
  "https://placehold.co/200x200/2a2822/9c968a?text=P"
);
insertarEntrada(proyectos,
  "ParkingTime",
  "Calculadora simple de tarifas por hora y fraccion.",
  "Android - Java",
  "https://placehold.co/200x200/2a2822/9c968a?text=P"
);

const contacto = agregarTab("Contacto", "contacto");
const link = insertarElemento(contacto.section,"ul", "", {class:"contact-list"});
insertarLink(link,
  "Correo",
  "m7.gustavo@gmail.com",
  "mailto:m7.gustavo@gmail.com",
  "images/mailW.png"
);
insertarLink(link,
  "GitHub",
  "github.com/EmilianoM7",
  "https://github.com/EmilianoM7",
  "images/Git.png"
);
