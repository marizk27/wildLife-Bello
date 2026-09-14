//==================================================
// FAUNO BELO
// APP.JS
// SISTEMA PRINCIPAL
//==================================================

//==================================================
// ELEMENTOS DEL DOM
//==================================================

const exploreCat = document.getElementById("explore");
const home = document.getElementById("home");
const exploreP = document.getElementById("categories");
const mainDisplay = document.getElementById("exploreCategories");

const filterCat = document.getElementById("filterCat");
const inp = document.getElementById("filter");

const allBtn = document.getElementById("all");
const categoriesBtn = document.getElementById("categories");
const playBtn = document.getElementById("play");

const exploreButtons = document.querySelector(".exploreButtons");

//==================================================
// VARIABLES PRINCIPALES
//==================================================

let animals = [];
let exploreState = "all";

let cardArray = [];

let favoriteAnimals = new Set();

let factPanel = null;
let factTimeout = null;

//==================================================
// ABRIR EXPLORAR
//==================================================

if (exploreCat) {
    exploreCat.addEventListener("click", () => {

        if (home) {
            home.classList.add("hidden");
        }

        if (exploreP) {
            exploreP.classList.remove("hidden");
        }

        exploreState = "all";

        if (filterCat) {
            filterCat.classList.remove("hidden");
        }

        if (inp) {
            inp.value = "";
        }

        displayAnimals(animals);
    });
}

//==================================================
// COLORES DE CATEGORÍAS
//==================================================

function colorCategory(category) {

    switch (category) {

        case "Anfíbios":
            return "#5fc463";

        case "Aves":
            return "#4a72e0";

        case "Mamíferos":
            return "#b47f2e";

        case "Reptiles":
            return "#e76958";

        case "Insectos":
            return "#85427c";

        default:
            return "#777777";
    }
}

//==================================================
// ELIMINAR INFORMACIÓN EXPANDIDA
//==================================================

function removeExpandedInfo() {

    if (cardArray.length === 0) {
        return;
    }

    const card = cardArray.shift();

    if (!card) {
        return;
    }

    card.classList.remove("expanded");

    const oldInfo = card.querySelector(".expandedInfo");

    if (oldInfo) {
        oldInfo.remove();
    }
}

//==================================================
// MOSTRAR ANIMALES
//==================================================

function displayAnimals(prods) {

    if (!mainDisplay) {
        return;
    }

    // Limpiar tarjeta expandida anterior
    cardArray = [];

    // Limpiar contenido
    mainDisplay.innerHTML = "";

    // Asegurar que recibimos un array
    if (!Array.isArray(prods)) {
        prods = [];
    }

    //==================================================
    // SIN RESULTADOS
    //==================================================

    if (prods.length === 0) {

        mainDisplay.innerHTML = `
            <div class="no-results">
                <img
                    class="no-results-img"
                    src="no-results.png"
                    alt="No se encontraron resultados"
                >
                <p>No se encontraron resultados.</p>
            </div>
        `;

        mainDisplay.style.display = "flex";
        mainDisplay.style.flexDirection = "column";

        return;
    }

    //==================================================
    // MOSTRAR COMO GRID
    //==================================================

    mainDisplay.style.display = "grid";
    mainDisplay.style.flexDirection = "";

    //==================================================
    // TODAS LAS ESPECIES
    //==================================================

    if (exploreState === "all") {

        for (const category of prods) {

            if (!category || !Array.isArray(category.especies)) {
                continue;
            }

            for (const specie of category.especies) {

                const div = document.createElement("div");

                div.dataset.id = specie.id;
                div.classList.add("animalCard");

                div.innerHTML = `
                    <img
                        class="animalImg"
                        src="${specie.img}"
                        alt="${specie.name || "Especie"}"
                    >

                    <div class="animalInfo">

                        <h4>${specie.name || "Sin nombre"}</h4>

                        <p class="animalScientificName">
                            ${specie.scientificName || "Sin nombre científico"}
                        </p>

                        <button
                            class="animalCategory"
                            type="button"
                        >
                            ${category.category}
                        </button>

                    </div>
                `;

                //==================================================
                // COLOR DE CATEGORÍA
                //==================================================

                const categoryButton =
                    div.querySelector(".animalCategory");

                if (categoryButton) {
                    categoryButton.style.backgroundColor =
                        colorCategory(category.category);
                }

                mainDisplay.appendChild(div);
            }
        }

        return;
    }

    //==================================================
    // MOSTRAR CATEGORÍAS
    //==================================================

    if (exploreState === "categories") {

        for (const category of prods) {

            if (!category) {
                continue;
            }

            const div = document.createElement("div");

            div.classList.add("animalCard");

            div.dataset.category = category.category || "";

            div.innerHTML = `
                <h3>${category.category || "Categoría"}</h3>

                <img
                    class="animalImg"
                    src="${category.categoryImg || ""}"
                    alt="${category.category || "Categoría"}"
                >
            `;

            div.style.backgroundColor =
                colorCategory(category.category);

            mainDisplay.appendChild(div);
        }
    }
}

//==================================================
// CARGAR DATOS
//==================================================

async function load() {

    try {

        const response =
            await fetch("./initialcategories.json");

        if (!response.ok) {
            throw new Error(
                `Error al cargar initialcategories.json: ${response.status}`
            );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error(
                "initialcategories.json no contiene un array válido."
            );
        }

        animals = data;

        displayAnimals(animals);

    } catch (error) {

        console.error(
            "ERROR CARGANDO LOS ANIMALES:",
            error
        );

        if (mainDisplay) {

            mainDisplay.innerHTML = `
                <div class="no-results">
                    <p>
                        No se pudo cargar la información
                        de las especies.
                    </p>
                </div>
            `;
        }
    }
}

//==================================================
// EJECUTAR CARGA
//==================================================

load();

//==================================================
// FILTRAR ANIMALES
//==================================================

function filterAnimals() {

    if (!inp || !filterCat) {
        return;
    }

    const text =
        inp.value.trim().toLowerCase();

    //==================================================
    // SI EL BUSCADOR ESTÁ VACÍO
    //==================================================

    if (text === "") {

        displayAnimals(animals);

        return;
    }

    let filteredAn = [];

    //==================================================
    // MODO TODAS LAS ESPECIES
    //==================================================

    if (exploreState === "all") {

        switch (filterCat.value) {

            //==================================================
            // BUSCAR POR CATEGORÍA
            //==================================================

            case "catego":

                filteredAn = animals.filter(category => {

                    if (!category.category) {
                        return false;
                    }

                    return category.category
                        .toLowerCase()
                        .includes(text);
                });

                break;

            //==================================================
            // BUSCAR POR NOMBRE COMÚN
            //==================================================

            case "name":

                filteredAn = animals

                    .map(category => {

                        const filteredSpecies =
                            category.especies.filter(specie => {

                                if (!specie.name) {
                                    return false;
                                }

                                return specie.name
                                    .toLowerCase()
                                    .includes(text);
                            });

                        return {
                            ...category,
                            especies: filteredSpecies
                        };
                    })

                    .filter(category =>
                        category.especies.length > 0
                    );

                break;

            //==================================================
            // BUSCAR POR NOMBRE CIENTÍFICO
            //==================================================

            case "sciNa":

                filteredAn = animals

                    .map(category => {

                        const filteredSpecies =
                            category.especies.filter(specie => {

                                if (!specie.scientificName) {
                                    return false;
                                }

                                return specie.scientificName
                                    .toLowerCase()
                                    .includes(text);
                            });

                        return {
                            ...category,
                            especies: filteredSpecies
                        };
                    })

                    .filter(category =>
                        category.especies.length > 0
                    );

                break;

            //==================================================
            // CRITERIO DESCONOCIDO
            //==================================================

            default:

                filteredAn = animals;

                break;
        }
    }

    //==================================================
    // MODO CATEGORÍAS
    //==================================================

    else if (exploreState === "categories") {

        filteredAn = animals.filter(category => {

            if (!category.category) {
                return false;
            }

            return category.category
                .toLowerCase()
                .includes(text);
        });
    }

    //==================================================
    // MOSTRAR RESULTADOS
    //==================================================

    displayAnimals(filteredAn);
}

//==================================================
// EVENTO DEL BUSCADOR
//==================================================

if (inp) {

    inp.addEventListener(
        "input",
        filterAnimals
    );
}

//==================================================
// CAMBIAR CRITERIO DE BÚSQUEDA
//==================================================

if (filterCat) {

    filterCat.addEventListener(
        "change",
        () => {

            if (inp) {
                inp.value = "";
            }

            displayAnimals(animals);
        }
    );
}

//==================================================
// BOTONES DE EXPLORACIÓN
//==================================================

if (exploreButtons) {

    exploreButtons.addEventListener(
        "click",
        (event) => {

            const button =
                event.target.closest("button");

            if (!button) {
                return;
            }

            switch (button.id) {

                //==================================================
                // TODO
                //==================================================

                case "all":

                    exploreState = "all";

                    if (filterCat) {
                        filterCat.classList.remove("hidden");
                    }

                    if (inp) {
                        inp.value = "";
                    }

                    displayAnimals(animals);

                    break;

                //==================================================
                // CATEGORÍAS
                //==================================================

                case "categories":

                    exploreState = "categories";

                    if (filterCat) {
                        filterCat.classList.add("hidden");
                    }

                    if (inp) {
                        inp.value = "";
                    }

                    displayAnimals(animals);

                    break;

                //==================================================
                // JUEGA
                //==================================================

                case "play":

                    console.log(
                        "El sistema de juegos todavía no está implementado."
                    );

                    break;
            }
        }
    );
}

//==================================================
// SISTEMA DE FAVORITOS
//==================================================

// Verificar si existe localStorage
function loadFavorites() {

    try {

        const saved =
            localStorage.getItem("faunoBeloFavorites");

        if (!saved) {
            return;
        }

        const parsed =
            JSON.parse(saved);

        if (Array.isArray(parsed)) {

            favoriteAnimals =
                new Set(
                    parsed.map(id => String(id))
                );
        }

    } catch (error) {

        console.error(
            "No se pudieron cargar los favoritos:",
            error
        );
    }
}

//==================================================
// GUARDAR FAVORITOS
//==================================================

function saveFavorites() {

    try {

        localStorage.setItem(
            "faunoBeloFavorites",
            JSON.stringify(
                Array.from(favoriteAnimals)
            )
        );

    } catch (error) {

        console.error(
            "No se pudieron guardar los favoritos:",
            error
        );
    }
}

//==================================================
// CAMBIAR ESTADO DE FAVORITO
//==================================================

function toggleFavorite(animalId, button) {

    const id = String(animalId);

    if (favoriteAnimals.has(id)) {

        favoriteAnimals.delete(id);

        if (button) {
            button.textContent =
                "♡ Guardar";
        }

    } else {

        favoriteAnimals.add(id);

        if (button) {
            button.textContent =
                "♥ Guardado";
        }
    }

    saveFavorites();
}

//==================================================
// INICIAR FAVORITOS
//==================================================

loadFavorites();

//==================================================
// CLIC EN TARJETAS
//==================================================

if (mainDisplay) {

    mainDisplay.addEventListener(
        "click",
        (e) => {

            //==================================================
            // BOTÓN DE CATEGORÍA
            //==================================================

            const categoryButton =
                e.target.closest(".animalCategory");

            if (categoryButton) {
                e.stopPropagation();
                return;
            }

            //==================================================
            // BOTÓN GUARDAR
            //==================================================

            const favoriteButton =
                e.target.closest(".favoriteBtn");

            if (favoriteButton) {

                e.stopPropagation();

                const card =
                    favoriteButton.closest(".animalCard");

                if (!card) {
                    return;
                }

                const animalId =
                    card.dataset.id;

                toggleFavorite(
                    animalId,
                    favoriteButton
                );

                return;
            }

            //==================================================
            // BOTÓN MÁS INFORMACIÓN
            //==================================================

            const moreInfoButton =
                e.target.closest(".moreInfoBtn");

            if (moreInfoButton) {

                e.stopPropagation();

                const card =
                    moreInfoButton.closest(".animalCard");

                if (!card) {
                    return;
                }

                const animalId =
                    Number(card.dataset.id);

                console.log(
                    "Más información para especie:",
                    animalId
                );

                // Sistema de información completa
                // se implementará posteriormente.

                return;
            }

            //==================================================
            // BUSCAR TARJETA
            //==================================================

            const card =
                e.target.closest(".animalCard");

            if (!card) {
                return;
            }

            //==================================================
            // SI ESTAMOS EN CATEGORÍAS
            //==================================================

            if (exploreState === "categories") {

                console.log(
                    "Categoría seleccionada:",
                    card.dataset.category
                );

                return;
            }

            //==================================================
            // OBTENER ID DE ESPECIE
            //==================================================

            const animalId =
                Number(card.dataset.id);

            if (Number.isNaN(animalId)) {
                return;
            }

            //==================================================
            // BUSCAR ESPECIE
            //==================================================

            const specie =
                animals

                    .flatMap(
                        category => category.especies || []
                    )

                    .find(
                        specie =>
                            Number(specie.id) === animalId
                    );

            if (!specie) {

                console.error(
                    "No se encontró la especie:",
                    animalId
                );

                return;
            }

            //==================================================
            // CERRAR INFORMACIÓN ANTERIOR
            //==================================================

            removeExpandedInfo();

            //==================================================
            // INFORMACIÓN DEL ANIMAL
            //==================================================

            const animalInfo =
                card.querySelector(".animalInfo");

            if (!animalInfo) {
                return;
            }

            //==================================================
            // CREAR INFORMACIÓN EXPANDIDA
            //==================================================

            const expandedInfo =
                document.createElement("div");

            expandedInfo.classList.add(
                "expandedInfo"
            );

            //==================================================
            // ESTADO DE CONSERVACIÓN
            //==================================================

            card.dataset.status =
                specie.endangered || "";

            //==================================================
            // ESTADO DEL FAVORITO
            //==================================================

            const isFavorite =
                favoriteAnimals.has(
                    String(specie.id)
                );

            const favoriteText =
                isFavorite
                    ? "♥ Guardado"
                    : "♡ Guardar";

            //==================================================
            // CONTENIDO EXPANDIDO
            //==================================================

            expandedInfo.innerHTML = `

                <p class="conservation">
                    ${specie.endangered || "Sin información"}
                </p>

                <p>
                    <strong>Función ecológica:</strong><br>
                    ${specie.function || "Sin información disponible."}
                </p>

                <div class="expandedActions">

                    <button
                        class="favoriteBtn"
                        type="button"
                    >
                        ${favoriteText}
                    </button>

                    <button
                        class="moreInfoBtn"
                        type="button"
                    >
                        Más información
                    </button>

                </div>
            `;

            //==================================================
            // AÑADIR INFORMACIÓN
            //==================================================

            animalInfo.appendChild(
                expandedInfo
            );

            card.classList.add(
                "expanded"
            );

            cardArray.push(card);
        }
    );
}

//==================================================
// FIN DE APP.JS
//==================================================

console.log(
    "================================"
);

console.log(
    "FAUNO BELO - APP.JS"
);

console.log(
    "SISTEMA INICIADO CORRECTAMENTE"
);

console.log(
    "================================"
);
