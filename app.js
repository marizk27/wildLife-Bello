```javascript
// ==================================================
// FAUNO BELO
// APP.JS PRINCIPAL
// ==================================================

// ==================================================
// ELEMENTOS DEL DOM
// ==================================================

const home = document.getElementById("home");

const exploreButton = document.getElementById("explore");

const exploreSection = document.getElementById("exploreSection");

const backButton = document.getElementById("back");

const mainDisplay = document.getElementById("exploreCategories");

const filterInput = document.getElementById("filter");

const filterCategory = document.getElementById("filterCat");

const exploreButtons = document.querySelector(".exploreButtons");

const allButton = document.getElementById("all");

const categoriesButton = document.getElementById("categoriesBtn");

const playButton = document.getElementById("play");

const reportButton = document.getElementById("report");

const profileButton = document.getElementById("profile");


// ==================================================
// VARIABLES PRINCIPALES
// ==================================================

let animals = [];

let exploreState = "all";

let favoriteAnimals = new Set();

let openedCard = null;


// ==================================================
// COMPROBACIÓN DE ELEMENTOS
// ==================================================

console.log("================================");
console.log("FAUNO BELO");
console.log("APP.JS INICIADO");
console.log("================================");


// ==================================================
// LOCAL STORAGE - FAVORITOS
// ==================================================

function loadFavorites() {

    try {

        const savedFavorites = localStorage.getItem("faunoBeloFavorites");

        if (!savedFavorites) {
            favoriteAnimals = new Set();
            return;
        }

        const parsedFavorites = JSON.parse(savedFavorites);

        if (Array.isArray(parsedFavorites)) {

            favoriteAnimals = new Set(
                parsedFavorites.map(String)
            );

        } else {

            favoriteAnimals = new Set();

        }

    } catch (error) {

        console.error(
            "Error cargando favoritos:",
            error
        );

        favoriteAnimals = new Set();

    }

}


// ==================================================
// GUARDAR FAVORITOS
// ==================================================

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
            "Error guardando favoritos:",
            error
        );

    }

}


// ==================================================
// COLOR DE CATEGORÍAS
// ==================================================

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


// ==================================================
// NORMALIZAR TEXTO
// Sirve para búsquedas sin problemas de mayúsculas
// ==================================================

function normalizeText(text) {

    return String(text ?? "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

}


// ==================================================
// ABRIR EXPLORAR
// ==================================================

function openExplore() {

    if (home) {
        home.classList.add("hidden");
    }

    if (exploreSection) {
        exploreSection.classList.remove("hidden");
    }

    exploreState = "all";

    if (filterCategory) {
        filterCategory.classList.remove("hidden");
    }

    if (filterInput) {
        filterInput.value = "";
    }

    displayAnimals(animals);

}


// ==================================================
// VOLVER AL INICIO
// ==================================================

function goHome() {

    if (exploreSection) {
        exploreSection.classList.add("hidden");
    }

    if (home) {
        home.classList.remove("hidden");
    }

    closeOpenedCard();

}


// ==================================================
// CERRAR TARJETA ABIERTA
// ==================================================

function closeOpenedCard() {

    if (!openedCard) {
        return;
    }

    openedCard.classList.remove("expanded");

    const expandedInfo =
        openedCard.querySelector(".expandedInfo");

    if (expandedInfo) {
        expandedInfo.remove();
    }

    openedCard = null;

}


// ==================================================
// ENCONTRAR ESPECIE POR ID
// ==================================================

function findSpeciesById(id) {

    const numericId = Number(id);

    for (const category of animals) {

        if (!Array.isArray(category.especies)) {
            continue;
        }

        const found = category.especies.find(
            specie => Number(specie.id) === numericId
        );

        if (found) {

            return {
                specie: found,
                category: category
            };

        }

    }

    return null;

}


// ==================================================
// MOSTRAR MENSAJE SIN RESULTADOS
// ==================================================

function showNoResults() {

    mainDisplay.innerHTML = "";

    const noResults = document.createElement("div");

    noResults.classList.add("no-results");

    noResults.innerHTML = `
        <h3>No encontramos resultados</h3>
        <p>
            Intenta buscar otra especie o utiliza
            otro filtro.
        </p>
    `;

    mainDisplay.appendChild(noResults);

}


// ==================================================
// CREAR TARJETA DE ANIMAL
// ==================================================

function createAnimalCard(specie, category) {

    const card = document.createElement("div");

    card.classList.add("animalCard");

    card.dataset.id = String(specie.id);

    card.dataset.category =
        category.category || "";


    // --------------------------------------------------
    // IMAGEN
    // --------------------------------------------------

    const image = document.createElement("img");

    image.classList.add("animalImg");

    image.src = specie.img || "";

    image.alt =
        specie.name || "Animal";


    // --------------------------------------------------
    // INFORMACIÓN
    // --------------------------------------------------

    const info = document.createElement("div");

    info.classList.add("animalInfo");


    // --------------------------------------------------
    // NOMBRE
    // --------------------------------------------------

    const name = document.createElement("h4");

    name.textContent =
        specie.name || "Sin nombre";


    // --------------------------------------------------
    // NOMBRE CIENTÍFICO
    // --------------------------------------------------

    const scientificName =
        document.createElement("p");

    scientificName.classList.add(
        "animalScientificName"
    );

    scientificName.textContent =
        specie.scientificName || "";


    // --------------------------------------------------
    // CATEGORÍA
    // --------------------------------------------------

    const categoryButton =
        document.createElement("button");

    categoryButton.type = "button";

    categoryButton.classList.add(
        "animalCategory"
    );

    categoryButton.textContent =
        category.category || "Sin categoría";

    categoryButton.style.backgroundColor =
        colorCategory(category.category);


    // --------------------------------------------------
    // ARMAR TARJETA
    // --------------------------------------------------

    info.appendChild(name);

    info.appendChild(scientificName);

    info.appendChild(categoryButton);

    card.appendChild(image);

    card.appendChild(info);


    return card;

}


// ==================================================
// MOSTRAR CATEGORÍAS
// ==================================================

function createCategoryCard(category) {

    const card = document.createElement("div");

    card.classList.add("animalCard");

    card.dataset.category =
        category.category || "";


    const title =
        document.createElement("h3");

    title.textContent =
        category.category || "Categoría";


    const image =
        document.createElement("img");

    image.classList.add("animalImg");

    image.src =
        category.categoryImg || "";

    image.alt =
        category.category || "Categoría";


    card.style.backgroundColor =
        colorCategory(category.category);


    card.appendChild(title);

    card.appendChild(image);


    return card;

}


// ==================================================
// MOSTRAR ANIMALES / CATEGORÍAS
// ==================================================

function displayAnimals(products) {

    if (!mainDisplay) {
        return;
    }

    closeOpenedCard();

    mainDisplay.innerHTML = "";

    mainDisplay.style.display = "grid";


    // --------------------------------------------------
    // NO HAY RESULTADOS
    // --------------------------------------------------

    if (!Array.isArray(products) ||
        products.length === 0) {

        showNoResults();

        return;

    }


    // ==================================================
    // MODO TODO
    // ==================================================

    if (exploreState === "all") {

        let cardsCreated = 0;

        for (const category of products) {

            if (!category) {
                continue;
            }

            if (!Array.isArray(category.especies)) {
                continue;
            }


            for (const specie of category.especies) {

                const card =
                    createAnimalCard(
                        specie,
                        category
                    );

                mainDisplay.appendChild(card);

                cardsCreated++;

            }

        }


        if (cardsCreated === 0) {

            showNoResults();

        }

        return;

    }


    // ==================================================
    // MODO CATEGORÍAS
    // ==================================================

    if (exploreState === "categories") {

        let cardsCreated = 0;

        for (const category of products) {

            const card =
                createCategoryCard(category);

            mainDisplay.appendChild(card);

            cardsCreated++;

        }


        if (cardsCreated === 0) {

            showNoResults();

        }

        return;

    }

}


// ==================================================
// CREAR INFORMACIÓN EXPANDIDA
// ==================================================

function openAnimalCard(card, specie) {

    closeOpenedCard();


    const animalInfo =
        card.querySelector(".animalInfo");

    if (!animalInfo) {
        return;
    }


    const expandedInfo =
        document.createElement("div");

    expandedInfo.classList.add(
        "expandedInfo"
    );


    // --------------------------------------------------
    // ESTADO DE CONSERVACIÓN
    // --------------------------------------------------

    const conservation =
        document.createElement("p");

    conservation.classList.add(
        "conservation"
    );

    conservation.textContent =
        specie.endangered ||
        "Estado de conservación no disponible";


    // --------------------------------------------------
    // FUNCIÓN ECOLÓGICA
    // --------------------------------------------------

    const functionText =
        document.createElement("p");

    functionText.innerHTML = `
        <strong>Función ecológica:</strong><br>
    `;

    const functionDescription =
        document.createElement("span");

    functionDescription.textContent =
        specie.function ||
        "Información no disponible.";

    functionText.appendChild(
        functionDescription
    );


    // --------------------------------------------------
    // CONTENEDOR DE BOTONES
    // --------------------------------------------------

    const actions =
        document.createElement("div");

    actions.classList.add(
        "expandedActions"
    );


    // --------------------------------------------------
    // BOTÓN FAVORITO
    // --------------------------------------------------

    const favoriteButton =
        document.createElement("button");

    favoriteButton.type = "button";

    favoriteButton.classList.add(
        "favoriteBtn"
    );


    const animalId =
        String(specie.id);


    function updateFavoriteButton() {

        if (favoriteAnimals.has(animalId)) {

            favoriteButton.textContent =
                "♥ Guardado";

        } else {

            favoriteButton.textContent =
                "♡ Guardar";

        }

    }


    updateFavoriteButton();


    favoriteButton.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();

            if (favoriteAnimals.has(animalId)) {

                favoriteAnimals.delete(
                    animalId
                );

            } else {

                favoriteAnimals.add(
                    animalId
                );

            }

            saveFavorites();

            updateFavoriteButton();

        }
    );


    // --------------------------------------------------
    // BOTÓN MÁS INFORMACIÓN
    // --------------------------------------------------

    const moreInfoButton =
        document.createElement("button");

    moreInfoButton.type = "button";

    moreInfoButton.classList.add(
        "moreInfoBtn"
    );

    moreInfoButton.textContent =
        "Más información";


    moreInfoButton.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();

            console.log(
                "Más información:",
                specie
            );

            // Esta función la desarrollaremos
            // en la siguiente etapa.

        }
    );


    // --------------------------------------------------
    // ARMAR INFORMACIÓN
    // --------------------------------------------------

    actions.appendChild(
        favoriteButton
    );

    actions.appendChild(
        moreInfoButton
    );


    expandedInfo.appendChild(
        conservation
    );

    expandedInfo.appendChild(
        functionText
    );

    expandedInfo.appendChild(
        actions
    );


    animalInfo.appendChild(
        expandedInfo
    );


    card.classList.add("expanded");

    openedCard = card;

}


// ==================================================
// FILTRAR ANIMALES
// ==================================================

function filterAnimals() {

    if (!Array.isArray(animals)) {
        return;
    }


    const text =
        normalizeText(
            filterInput
                ? filterInput.value.trim()
                : ""
        );


    // --------------------------------------------------
    // SI EL BUSCADOR ESTÁ VACÍO
    // --------------------------------------------------

    if (text === "") {

        displayAnimals(animals);

        return;

    }


    // ==================================================
    // MODO TODO
    // ==================================================

    if (exploreState === "all") {

        const filterType =
            filterCategory
                ? filterCategory.value
                : "name";


        // --------------------------------------------------
        // POR CATEGORÍA
        // --------------------------------------------------

        if (filterType === "catego") {

            const filtered =
                animals.filter(
                    category =>
                        normalizeText(
                            category.category
                        ).includes(text)
                );


            displayAnimals(filtered);

            return;

        }


        // --------------------------------------------------
        // POR NOMBRE O CIENTÍFICO
        // --------------------------------------------------

        const filtered =
            animals
                .map(category => {

                    const species =
                        Array.isArray(
                            category.especies
                        )
                            ? category.especies
                            : [];


                    let filteredSpecies;


                    if (filterType === "sciNa") {

                        filteredSpecies =
                            species.filter(
                                specie =>
                                    normalizeText(
                                        specie.scientificName
                                    ).includes(text)
                            );

                    } else {

                        filteredSpecies =
                            species.filter(
                                specie =>
                                    normalizeText(
                                        specie.name
                                    ).includes(text)
                            );

                    }


                    return {
                        ...category,
                        especies: filteredSpecies
                    };

                })
                .filter(
                    category =>
                        category.especies.length > 0
                );


        displayAnimals(filtered);

        return;

    }


    // ==================================================
    // MODO CATEGORÍAS
    // ==================================================

    if (exploreState === "categories") {

        const filtered =
            animals.filter(
                category =>
                    normalizeText(
                        category.category
                    ).includes(text)
            );


        displayAnimals(filtered);

        return;

    }

}


// ==================================================
// CAMBIAR MODO A "TODO"
// ==================================================

function showAllAnimals() {

    exploreState = "all";


    if (filterCategory) {

        filterCategory.classList.remove(
            "hidden"
        );

    }


    if (filterInput) {

        filterInput.value = "";

    }


    displayAnimals(animals);

}


// ==================================================
// CAMBIAR MODO A "CATEGORÍAS"
// ==================================================

function showCategories() {

    exploreState = "categories";


    if (filterCategory) {

        filterCategory.classList.add(
            "hidden"
        );

    }


    if (filterInput) {

        filterInput.value = "";

    }


    displayAnimals(animals);

}


// ==================================================
// EVENTO BOTÓN EXPLORAR
// ==================================================

if (exploreButton) {

    exploreButton.addEventListener(
        "click",
        function() {

            openExplore();

        }
    );

}


// ==================================================
// EVENTO BOTÓN VOLVER
// ==================================================

if (backButton) {

    backButton.addEventListener(
        "click",
        function() {

            goHome();

        }
    );

}


// ==================================================
// BOTONES DE EXPLORACIÓN
// ==================================================

if (exploreButtons) {

    exploreButtons.addEventListener(
        "click",
        function(event) {

            const button =
                event.target.closest("button");


            if (!button) {
                return;
            }


            switch (button.id) {

                case "all":

                    showAllAnimals();

                    break;


                case "categoriesBtn":

                    showCategories();

                    break;


                case "play":

                    console.log(
                        "Juegos próximamente"
                    );

                    break;

            }

        }
    );

}


// ==================================================
// BUSCADOR
// ==================================================

if (filterInput) {

    filterInput.addEventListener(
        "input",
        function() {

            filterAnimals();

        }
    );

}


// ==================================================
// CAMBIO DEL TIPO DE FILTRO
// ==================================================

if (filterCategory) {

    filterCategory.addEventListener(
        "change",
        function() {

            if (filterInput) {

                filterInput.value = "";

            }

            displayAnimals(animals);

        }
    );

}


// ==================================================
// CLIC EN LAS TARJETAS
// ==================================================

if (mainDisplay) {

    mainDisplay.addEventListener(
        "click",
        function(event) {

            const target =
                event.target;


            // --------------------------------------------------
            // SI SE PRESIONÓ UN BOTÓN
            // --------------------------------------------------

            if (
                target.closest(
                    "button"
                )
            ) {

                return;

            }


            // --------------------------------------------------
            // BUSCAR TARJETA
            // --------------------------------------------------

            const card =
                target.closest(
                    ".animalCard"
                );


            if (!card) {
                return;
            }


            // --------------------------------------------------
            // SI ESTAMOS EN CATEGORÍAS
            // --------------------------------------------------

            if (
                exploreState ===
                "categories"
            ) {

                const categoryName =
                    card.dataset.category;

                console.log(
                    "Categoría seleccionada:",
                    categoryName
                );

                // Más adelante aquí
                // mostraremos los animales
                // de la categoría seleccionada.

                return;

            }


            // --------------------------------------------------
            // BUSCAR ESPECIE
            // --------------------------------------------------

            const result =
                findSpeciesById(
                    card.dataset.id
                );


            if (!result) {

                console.warn(
                    "No se encontró la especie:",
                    card.dataset.id
                );

                return;

            }


            openAnimalCard(
                card,
                result.specie
            );

        }
    );

}


// ==================================================
// BOTÓN REPORTAR
// ==================================================

if (reportButton) {

    reportButton.addEventListener(
        "click",
        function() {

            console.log(
                "Reportar avistamiento"
            );

            // Esta sección se desarrollará
            // posteriormente.

        }
    );

}


// ==================================================
// PERFIL
// ==================================================

if (profileButton) {

    profileButton.addEventListener(
        "click",
        function() {

            console.log(
                "Perfil"
            );

            // Esta sección se desarrollará
            // posteriormente.

        }
    );

}


// ==================================================
// CARGAR DATOS
// ==================================================

async function loadAnimals() {

    try {

        console.log(
            "Cargando initialcategories.json..."
        );


        const response =
            await fetch(
                "./initialcategories.json"
            );


        if (!response.ok) {

            throw new Error(
                `Error HTTP ${response.status}`
            );

        }


        const data =
            await response.json();


        if (!Array.isArray(data)) {

            throw new Error(
                "initialcategories.json no contiene un array."
            );

        }


        animals = data;


        console.log(
            "Datos cargados correctamente."
        );

        console.log(
            "Categorías:",
            animals.length
        );


        let totalSpecies = 0;


        for (
            const category
            of animals
        ) {

            if (
                Array.isArray(
                    category.especies
                )
            ) {

                totalSpecies +=
                    category.especies.length;

            }

        }


        console.log(
            "Especies:",
            totalSpecies
        );


        displayAnimals(
            animals
        );

    } catch (error) {

        console.error(
            "No se pudieron cargar los animales:",
            error
        );


        if (mainDisplay) {

            mainDisplay.innerHTML = `
                <div class="no-results">
                    <h3>Error al cargar Fauno Belo</h3>
                    <p>
                        No se pudo cargar
                        initialcategories.json.
                    </p>
                </div>
            `;

        }

    }

}


// ==================================================
// INICIALIZACIÓN
// ==================================================

loadFavorites();

loadAnimals();


// ==================================================
// FIN
// ==================================================

console.log(
    "FAUNO BELO - SISTEMA LISTO"
);
```
