async function cargarAldeanosDesdeAPI(language) {
  const URL_API_ES = "https://run.mocky.io/v3/fa258fad-caf4-49fb-ae21-774cfd13b086"
  const URL_API_EN = "https://run.mocky.io/v3/c30bf7ea-f238-4956-a634-4a8ca5d196b8"
  const apiUrl = language === "es" ? URL_API_ES : URL_API_EN; // Reemplaza con la URL de la API en el idioma correspondiente
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("No se pudo obtener datos de la API");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al cargar aldeanos desde la API:", error);
    throw error;
  }
}

async function cargarAldeanosYCambiarIdioma(language) {
  try {
    const aldeanos = await cargarAldeanosDesdeAPI(language);
    cargarAldeanos(aldeanos);
  } catch (error) {
    console.error("Error al cargar aldeanos:", error);
  }
}
let currentLanguage = localStorage.getItem("lang") || "es";

const aldeanosDiv = document.querySelector("#aldeanosDiv");
const themeButtons = document.querySelectorAll(".themeButton");
const body = document.body;
const themeIcons = document.querySelectorAll(".theme-icon");
const mobileMenu = document.querySelector(".mobile-menu");
const hamburgerMenu = document.querySelector(".hamburger-menu");
const langIcons = document.querySelectorAll(".lang-icon");
const titulo = document.querySelector(".title");

function agregarEnlacesAWiki(regalos, language) {
  if (typeof regalos === "string") {
    const baseUrl =
      language === "es"
        ? "https://es.stardewvalleywiki.com/"
        : "https://stardewvalleywiki.com/";

    // Eliminar los corchetes "[" y "]" de la cadena y dividir los regalos en un arreglo
    const regalosArray = regalos.replace(/^\[|\]$/g, "").split(", ");

    // Crear enlaces para cada regalo en el arreglo
    const regalosEnlaces = regalosArray.map(
      (regalo) =>
        `<a href="${baseUrl}${encodeURIComponent(
          regalo
        )}" target="_blank" rel="nofollow noopener noreferrer">${regalo}</a>`
    );

    return regalosEnlaces.join(", ");
  } else {
    return regalos;
  }
}

function cargarAldeanosHTML(aldeano) {
  return `
    <div class="aldeano">
      <img class="aldeano-img" src="${aldeano.imagen}" alt="${aldeano.Nombre} Stardew Valley">
      <h3 class="aldeano-name">${aldeano.Nombre}</h3>
      <h3 class="aldeano-cumpleaños"><i><img class="cake" src="./assets/svg/cake.svg" alt="Torta de cumpleaños"></i> ${aldeano.Cumpleaños}</h3>
    </div>
  `;
}

function cargarAldeanos(aldeanos) {
  aldeanos.forEach((aldeano) => {
    const div = document.createElement("div");
    div.classList.add("aldeano");
    div.innerHTML = cargarAldeanosHTML(aldeano);
    aldeanosDiv.append(div);

    div.addEventListener("click", () => {
      mostrarPopup(aldeano);
    });
  });
}

function mostrarPopup(aldeano) {
  const aldeanoName = aldeano.Nombre;
  const parrafoRegalos = agregarEnlacesAWiki(aldeano.Regalos, currentLanguage);

  const langPrefix =
    currentLanguage === "es" ? "Mejores regalos para" : "Best gifts for";
  const langUrlPrefix =
    currentLanguage === "es"
      ? "https://es.stardewvalleywiki.com/"
      : "https://stardewvalleywiki.com/";
  const alertBtn = currentLanguage === "es" ? "Aceptar" : "Accept";

  Swal.fire({
    background: "#00A5CF",
    html: `
      <h2 class="h2-alert">${langPrefix} ${aldeanoName}</h2>
      <a href="${langUrlPrefix}${aldeanoName}" target="_blank" rel="nofollow noopener noreferrer"><img src="${aldeano.imagen}" alt="${aldeanoName} Stardew Valley"></a>
      <p class="p-alert">${parrafoRegalos}</p>
    `,
    confirmButtonText: alertBtn,
    confirmButtonColor: "#282828",
    footer: '<p class="p-alert-footer">© 2023 Augusto Natiello</p>',
  });
}

function toggleTheme() {
  body.classList.toggle("dark-theme");
  body.classList.toggle("light-theme");
  themeIcons.forEach((icon) => {
    icon.src = body.classList.contains("dark-theme")
      ? "./assets/svg/moon.svg"
      : "./assets/svg/sun.svg";
  });

  localStorage.setItem(
    "theme",
    body.classList.contains("dark-theme") ? "dark-theme" : "light-theme"
  );
}

function loadPreferences() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.classList.add(savedTheme);
  }

  const tituloText =
    currentLanguage === "es"
      ? "Mejores Regalos Stardew Valley"
      : "Best gifts on Stardew Valley";
  const langIconSrc =
    currentLanguage === "es"
      ? "./assets/svg/spanish.svg"
      : "./assets/svg/english.svg";
  const cumpleanosText = currentLanguage === "es" ? "Verano 3" : "Summer 3";

  aldeanosDiv.innerHTML = `
    <div class="aldeano">
      <a href="https://www.linkedin.com/in/augusto-natiello-119b8a214/" target="_blank">
        <img class="aldeano-img" src="./assets/png/aldeanos/Augusto.png" alt="Augusto Natiello creador de la app dibujado como stardew valley">
      </a>
      <h3 class="aldeano-name">Augusto</h3>
      <p class="aldeano-cumpleaños"><i><img class="cake" src="./assets/svg/cake.svg" alt="Torta de cumpleaños"></i>${cumpleanosText}</p>
    </div>
  `;

  langIcons.forEach((icon) => {
    icon.src = langIconSrc;
  });

  titulo.innerHTML = `<h1 class="title">${tituloText}</h1>`;
}

function changeLanguage() {
  currentLanguage = currentLanguage === "es" ? "en" : "es";
  localStorage.setItem("lang", currentLanguage);

  const tituloText =
    currentLanguage === "es"
      ? "Mejores Regalos Stardew Valley"
      : "Best gifts on Stardew Valley";
  const langIconSrc =
    currentLanguage === "es"
      ? "./assets/svg/spanish.svg"
      : "./assets/svg/english.svg";
  const cumpleanosText = currentLanguage === "es" ? "Verano 3" : "Summer 3";

  aldeanosDiv.innerHTML = `
    <div class="aldeano">
      <a href="https://www.linkedin.com/in/augusto-natiello-119b8a214/" target="_blank">
        <img class="aldeano-img" src="./assets/png/aldeanos/Augusto.png" alt="Augusto Natiello creador de la app dibujado como stardew valley">
      </a>
      <h3 class="aldeano-name">Augusto</h3>
      <p class="aldeano-cumpleaños"><i><img class="cake" src="./assets/svg/cake.svg" alt="Torta de cumpleaños"></i>${cumpleanosText}</p>
    </div>
  `;

  langIcons.forEach((icon) => {
    icon.src = langIconSrc;
  });

  titulo.innerHTML = `<h1 class="title">${tituloText}`;
  // Llama a cargarAldeanosYCambiarIdioma
  cargarAldeanosYCambiarIdioma(currentLanguage);
}

themeButtons.forEach((button) => {
  button.addEventListener("click", toggleTheme);
});

hamburgerMenu.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
});

const botonesIdioma = document.querySelectorAll(".toggleLanguageButton");

botonesIdioma.forEach((button) => {
  button.addEventListener("click", changeLanguage);
});

cargarAldeanosDesdeAPI(currentLanguage)
  .then((aldeanos) => {
    cargarAldeanos(aldeanos);
  })
  .catch((error) => {
    // Manejar errores si la carga de la API falla
    console.error("Error al cargar aldeanos:", error);
  });

// Llama a loadPreferences después de cargar aldeanos
loadPreferences();
