```javascript
// ============================================================
// FAUNO BELO
// APP.JS
// ============================================================

console.log("=================================");
console.log("FAUNO BELO");
console.log("APP.JS CARGANDO");
console.log("=================================");


// ============================================================
// ELEMENTOS
// ============================================================

const home = document.getElementById("home");

const exploreButton =
    document.getElementById("explore");

const reportButton =
    document.getElementById("report");

const profileButton =
    document.getElementById("profile");

const exploreSection =
    document.getElementById("exploreSection");

const backButton =
    document.getElementById("back");

const filterInput =
    document.getElementById("filter");

const filterCategory =
    document.getElementById("filterCat");

const allButton =
    document.getElementById("all");

const categoriesButton =
    document.getElementById("categoriesBtn");

const playButton =
    document.getElementById("play");

const mainDisplay =
    document.getElementById("exploreCategories");


// ============================================================
// VARIABLES
// ============================================================

let animals = [];

let exploreState = "all";

let favoriteAnimals = new Set();

let openedCard = null;


// ============================================================
// COMPROBAR ELEMENTOS
// ============================================================

console.log("home:", home);
console.log("explore:", exploreButton);
console.log("exploreSection:", exploreSection);
console.log("back:", backButton);
console.log("all:", allButton);
console.log("categories:", categoriesButton);
console.log("play:", playButton);
console.log("display:", mainDisplay);


// ============================================================
// FUNCIÓN PARA NORMALIZAR TEXTO
// ============================================================

function normalizeText(text) {

    return String(text || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

}


// ============================================================
// COLORES DE CATEGORÍA
// ============================================================

function colorCategory(category) {

    const normalized =
        normalizeText(category);


    switch (normalized) {

        case "anfibios":
            return "#5fc463";

        case "aves":
            return "#4a72e0";

        case "mamiferos":
            return "#b47f2e";

        case "reptiles":
            return "#e76958";

        case "insectos":
            return "#85427c";

        default:
            return "#777777";

    }

}


// ============================================================
// ABRIR EXPLORAR
// ============================================================

function openExplore() {

    console.log("BOTÓN EXPLORAR PRESIONADO");


    if (!home) {

        console.error(
            "No existe #home"
        );

        return;

    }


    if (!exploreSection) {

        console.error(
            "No existe #exploreSection"
        );

        return;

    }


    home.classList.add("hidden");

    exploreSection.classList.remove("hidden");


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


// ============================================================
// VOLVER
// ============================================================

function goBack() {

    console.log("BOTÓN VOLVER PRESIONADO");


    if (exploreSection) {

        exploreSection.classList.add(
            "hidden"
        );

    }


    if (home) {

        home.classList.remove(
            "hidden"
        );

    }


    closeOpenedCard();

}


// ============================================================
// CERRAR TARJETA ABIERTA
// ============================================================

function closeOpenedCard() {

    if (!openedCard) {

        return;

    }


    openedCard.classList.remove(
        "expanded"
    );


    const expandedInfo =
        openedCard.querySelector(
            ".expandedInfo"
        );


    if (expandedInfo) {

        expandedInfo.remove();

    }


    openedCard = null;

}


// ============================================================
// CREAR TARJETA DE ANIMAL
// ============================================================

function createAnimalCard(
    specie,
    category
) {

    const card =
        document.createElement("div");


    card.classList.add(
        "animalCard"
    );


    card.dataset.id =
        String(specie.id);


    card.dataset.category =
        category.category || "";


    // IMAGEN

    const image =
        document.createElement("img");


    image.classList.add(
        "animalImg"
    );


    image.src =
        specie.img || "";


    image.alt =
        specie.name || "Animal";


    // INFORMACIÓN

    const info =
        document.createElement("div");


    info.classList.add(
        "animalInfo"
    );


    // NOMBRE

    const name =
        document.createElement("h4");


    name.textContent =
        specie.name || "Sin nombre";


    // NOMBRE CIENTÍFICO

    const scientificName =
        document.createElement("p");


    scientificName.classList.add(
        "animalScientificName"
    );


    scientificName.textContent =
        specie.scientificName || "";


    // CATEGORÍA

    const categoryButton =
        document.createElement("button");


    categoryButton.type =
        "button";


    categoryButton.classList.add(
        "animalCategory"
    );


    categoryButton.textContent =
        category.category ||
        "Sin categoría";


    categoryButton.style.backgroundColor =
        colorCategory(
            category.category
        );


    // ARMAR

    info.appendChild(name);

    info.appendChild(
        scientificName
    );

    info.appendChild(
        categoryButton
    );

    card.appendChild(image);

    card.appendChild(info);


    return card;

}


// ============================================================
// CREAR TARJETA DE CATEGORÍA
// ============================================================

function createCategoryCard(
    category
) {

    const card =
        document.createElement("div");


    card.classList.add(
        "animalCard"
    );


    card.dataset.category =
        category.category || "";


    const title =
        document.createElement("h3");


    title.textContent =
        category.category ||
        "Categoría";


    const image =
        document.createElement("img");


    image.classList.add(
        "animalImg"
    );


    image.src =
        category.categoryImg || "";


    image.alt =
        category.category ||
        "Categoría";


    card.style.backgroundColor =
        colorCategory(
            category.category
        );


    card.appendChild(title);

    card.appendChild(image);


    return card;

}


// ============================================================
// MOSTRAR ANIMALES
// ============================================================

function displayAnimals(data) {

    if (!mainDisplay) {

        console.error(
            "No existe #exploreCategories"
        );

        return;

    }


    closeOpenedCard();


    mainDisplay.innerHTML = "";


    mainDisplay.style.display =
        "grid";


    if (
        !Array.isArray(data) ||
        data.length === 0
    ) {

        showNoResults();

        return;

    }


    // ========================================================
    // TODO
    // ========================================================

    if (
        exploreState === "all"
    ) {

        let total =
            0;


        for (
            const category
            of data
        ) {

            if (
                !category ||
                !Array.isArray(
                    category.especies
                )
            ) {

                continue;

            }


            for (
                const specie
                of category.especies
            ) {

                const card =
                    createAnimalCard(
                        specie,
                        category
                    );


                mainDisplay.appendChild(
                    card
                );


                total++;

            }

        }


        if (total === 0) {

            showNoResults();

        }


        return;

    }


    // ========================================================
    // CATEGORÍAS
    // ========================================================

    if (
        exploreState ===
        "categories"
    ) {

        for (
            const category
            of data
        ) {

            const card =
                createCategoryCard(
                    category
                );


            mainDisplay.appendChild(
                card
            );

        }


        return;

    }

}


// ============================================================
// NO HAY RESULTADOS
// ============================================================

function showNoResults() {

    mainDisplay.innerHTML = "";


    const message =
        document.createElement("div");


    message.classList.add(
        "no-results"
    );


    message.innerHTML = `
        <h3>No encontramos resultados</h3>

        <p>
            Intenta con otro nombre
            o cambia el filtro.
        </p>
    `;


    mainDisplay.appendChild(
        message
    );

}


// ============================================================
// ENCONTRAR ANIMAL
// ============================================================

function findAnimal(id) {

    const numericId =
        Number(id);


    for (
        const category
        of animals
    ) {

        if (
            !Array.isArray(
                category.especies
            )
        ) {

            continue;

        }


        const specie =
            category.especies.find(
                item =>
                    Number(item.id) ===
                    numericId
            );


        if (specie) {

            return {
                specie: specie,
                category: category
            };

        }

    }


    return null;

}


// ============================================================
// ABRIR INFORMACIÓN DEL ANIMAL
// ============================================================

function openAnimalCard(
    card,
    specie
) {

    closeOpenedCard();


    const info =
        card.querySelector(
            ".animalInfo"
        );


    if (!info) {

        return;

    }


    const expanded =
        document.createElement(
            "div"
        );


    expanded.classList.add(
        "expandedInfo"
    );


    const conservation =
        document.createElement(
            "p"
        );


    conservation.classList.add(
        "conservation"
    );


    conservation.textContent =
        specie.endangered ||
        "Estado de conservación no disponible";


    const ecologicalFunction =
        document.createElement(
            "p"
        );


    ecologicalFunction.innerHTML =
        "<strong>Función ecológica:</strong><br>";


    const functionText =
        document.createElement(
            "span"
        );


    functionText.textContent =
        specie.function ||
        "Información no disponible.";


    ecologicalFunction.appendChild(
        functionText
    );


    // ========================================================
    // ACCIONES
    // ========================================================

    const actions =
        document.createElement(
            "div"
        );


    actions.classList.add(
        "expandedActions"
    );


    // FAVORITO

    const favoriteButton =
        document.createElement(
            "button"
        );


    favoriteButton.type =
        "button";


    favoriteButton.classList.add(
        "favoriteBtn"
    );


    const id =
        String(specie.id);


    function updateFavorite() {

        if (
            favoriteAnimals.has(id)
        ) {

            favoriteButton.textContent =
                "♥ Guardado";

        } else {

            favoriteButton.textContent =
                "♡ Guardar";

        }

    }


    updateFavorite();


    favoriteButton.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();


            if (
                favoriteAnimals.has(id)
            ) {

                favoriteAnimals.delete(
                    id
                );

            } else {

                favoriteAnimals.add(
                    id
                );

            }


            localStorage.setItem(
                "faunoBeloFavorites",
                JSON.stringify(
                    Array.from(
                        favoriteAnimals
                    )
                )
            );


            updateFavorite();

        }
    );


    // MÁS INFORMACIÓN

    const moreInfoButton =
        document.createElement(
            "button"
        );


    moreInfoButton.type =
        "button";


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

        }
    );


    actions.appendChild(
        favoriteButton
    );


    actions.appendChild(
        moreInfoButton
    );


    expanded.appendChild(
        conservation
    );


    expanded.appendChild(
        ecologicalFunction
    );


    expanded.appendChild(
        actions
    );


    info.appendChild(
        expanded
    );


    card.classList.add(
        "expanded"
    );


    openedCard =
        card;

}


// ============================================================
// FILTRAR
// ============================================================

function filterAnimals() {

    if (
        !filterInput
    ) {

        return;

    }


    const text =
        normalizeText(
            filterInput.value.trim()
        );


    // SIN TEXTO

    if (text === "") {

        displayAnimals(
            animals
        );

        return;

    }


    // ========================================================
    // TODO
    // ========================================================

    if (
        exploreState === "all"
    ) {

        const type =
            filterCategory
                ? filterCategory.value
                : "name";


        // CATEGORÍA

        if (
            type === "catego"
        ) {

            const result =
                animals.filter(
                    category =>
                        normalizeText(
                            category.category
                        ).includes(text)
                );


            displayAnimals(
                result
            );


            return;

        }


        // ESPECIE

        const result =
            animals
                .map(
                    category => {

                        const species =
                            Array.isArray(
                                category.especies
                            )
                                ? category.especies
                                : [];


                        let filtered;


                        if (
                            type ===
                            "sciNa"
                        ) {

                            filtered =
                                species.filter(
                                    specie =>
                                        normalizeText(
                                            specie.scientificName
                                        ).includes(
                                            text
                                        )
                                );

                        } else {

                            filtered =
                                species.filter(
                                    specie =>
                                        normalizeText(
                                            specie.name
                                        ).includes(
                                            text
                                        )
                                );

                        }


                        return {
                            ...category,
                            especies:
                                filtered
                        };

                    }
                )
                .filter(
                    category =>
                        category
                            .especies
                            .length > 0
                );


        displayAnimals(
            result
        );


        return;

    }


    // ========================================================
    // CATEGORÍAS
    // ========================================================

    if (
        exploreState ===
        "categories"
    ) {

        const result =
            animals.filter(
                category =>
                    normalizeText(
                        category.category
                    ).includes(text)
            );


        displayAnimals(
            result
        );

    }

}


// ============================================================
// BOTÓN TODO
// ============================================================

function showAll() {

    console.log(
        "BOTÓN TODO PRESIONADO"
    );


    exploreState =
        "all";


    if (filterCategory) {

        filterCategory.classList.remove(
            "hidden"
        );

    }


    if (filterInput) {

        filterInput.value = "";

    }


    displayAnimals(
        animals
    );

}


// ============================================================
// BOTÓN CATEGORÍAS
// ============================================================

function showCategories() {

    console.log(
        "BOTÓN CATEGORÍAS PRESIONADO"
    );


    exploreState =
        "categories";


    if (filterCategory) {

        filterCategory.classList.add(
            "hidden"
        );

    }


    if (filterInput) {

        filterInput.value = "";

    }


    displayAnimals(
        animals
    );

}


// ============================================================
// BOTÓN EXPLORAR
// ============================================================

if (exploreButton) {

    exploreButton.addEventListener(
        "click",
        function() {

            openExplore();

        }
    );

} else {

    console.error(
        "ERROR: botón #explore no encontrado"
    );

}


// ============================================================
// BOTÓN VOLVER
// ============================================================

if (backButton) {

    backButton.addEventListener(
        "click",
        function() {

            goBack();

        }
    );

} else {

    console.error(
        "ERROR: botón #back no encontrado"
    );

}


// ============================================================
// BOTÓN TODO
// ============================================================

if (allButton) {

    allButton.addEventListener(
        "click",
        function() {

            showAll();

        }
    );

} else {

    console.error(
        "ERROR: botón #all no encontrado"
    );

}


// ============================================================
// BOTÓN CATEGORÍAS
// ============================================================

if (categoriesButton) {

    categoriesButton.addEventListener(
        "click",
        function() {

            showCategories();

        }
    );

} else {

    console.error(
        "ERROR: botón #categoriesBtn no encontrado"
    );

}


// ============================================================
// BOTÓN JUEGA
// ============================================================

if (playButton) {

    playButton.addEventListener(
        "click",
        function() {

            console.log(
                "BOTÓN JUEGA PRESIONADO"
            );

            alert(
                "Los juegos de Fauno Belo estarán disponibles próximamente."
            );

        }
    );

}


// ============================================================
// BUSCADOR
// ============================================================

if (filterInput) {

    filterInput.addEventListener(
        "input",
        function() {

            filterAnimals();

        }
    );

}


// ============================================================
// SELECT DEL FILTRO
// ============================================================

if (filterCategory) {

    filterCategory.addEventListener(
        "change",
        function() {

            if (filterInput) {

                filterInput.value = "";

            }


            displayAnimals(
                animals
            );

        }
    );

}


// ============================================================
// CLIC EN TARJETAS
// ============================================================

if (mainDisplay) {

    mainDisplay.addEventListener(
        "click",
        function(event) {

            const clickedButton =
                event.target.closest(
                    "button"
                );


            if (clickedButton) {

                return;

            }


            const card =
                event.target.closest(
                    ".animalCard"
                );


            if (!card) {

                return;

            }


            // =================================================
            // CATEGORÍAS
            // =================================================

            if (
                exploreState ===
                "categories"
            ) {

                const category =
                    card.dataset.category;


                console.log(
                    "Categoría seleccionada:",
                    category
                );


                return;

            }


            // =================================================
            // ANIMAL
            // =================================================

            const result =
                findAnimal(
                    card.dataset.id
                );


            if (!result) {

                console.error(
                    "No se encontró el animal:",
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


// ============================================================
// REPORTAR
// ============================================================

if (reportButton) {

    reportButton.addEventListener(
        "click",
        function() {

            console.log(
                "BOTÓN REPORTAR PRESIONADO"
            );


            alert(
                "La función de reportar avistamientos estará disponible próximamente."
            );

        }
    );

}


// ============================================================
// PERFIL
// ============================================================

if (profileButton) {

    profileButton.addEventListener(
        "click",
        function() {

            console.log(
                "PERFIL PRESIONADO"
            );


            alert(
                "El perfil estará disponible próximamente."
            );

        }
    );

}


// ============================================================
// CARGAR FAVORITOS
// ============================================================

function loadFavorites() {

    try {

        const saved =
            localStorage.getItem(
                "faunoBeloFavorites"
            );


        if (!saved) {

            favoriteAnimals =
                new Set();

            return;

        }


        const parsed =
            JSON.parse(saved);


        if (
            Array.isArray(parsed)
        ) {

            favoriteAnimals =
                new Set(
                    parsed.map(
                        String
                    )
                );

        }

    } catch (error) {

        console.error(
            "Error cargando favoritos:",
            error
        );

        favoriteAnimals =
            new Set();

    }

}


// ============================================================
// CARGAR JSON
// ============================================================

async function loadAnimals() {

    console.log(
        "Cargando initialcategories.json..."
    );


    try {

        const response =
            await fetch(
                "./initialcategories.json"
            );


        if (!response.ok) {

            throw new Error(
                "HTTP " +
                response.status
            );

        }


        const data =
            await response.json();


        if (
            !Array.isArray(data)
        ) {

            throw new Error(
                "El JSON no contiene un array."
            );

        }


        animals =
            data;


        console.log(
            "JSON cargado correctamente."
        );


        console.log(
            "Categorías:",
            animals.length
        );


        let total =
            0;


        for (
            const category
            of animals
        ) {

            if (
                Array.isArray(
                    category.especies
                )
            ) {

                total +=
                    category.especies.length;

            }

        }


        console.log(
            "Especies:",
            total
        );


        displayAnimals(
            animals
        );


    } catch (error) {

        console.error(
            "ERROR CARGANDO JSON:",
            error
        );


        if (mainDisplay) {

            mainDisplay.innerHTML = `
                <div class="no-results">

                    <h3>
                        No se pudieron cargar
                        los animales
                    </h3>

                    <p>
                        Revisa que
                        initialcategories.json
                        esté en la misma carpeta
                        que index.html.
                    </p>

                </div>
            `;

        }

    }

}


// ============================================================
// INICIO DEL SISTEMA
// ============================================================

loadFavorites();

loadAnimals();


console.log(
    "================================="
);

console.log(
    "FAUNO BELO - APP.JS LISTO"
);

console.log(
    "================================="
);
```
