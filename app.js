```javascript
// ==================================================
// FAUNO BELO
// APP.JS
// VERSION CORREGIDA
// ==================================================

console.log("================================");
console.log("FAUNO BELO");
console.log("APP.JS INICIADO");
console.log("================================");


// ==================================================
// ELEMENTOS
// ==================================================

const exploreCat = document.getElementById("explore");
const home = document.getElementById("home");
const exploreP = document.getElementById("categories");

const mainDisplay = document.getElementById("exploreCategories");

const filterCat = document.getElementById("filterCat");
const inp = document.getElementById("filter");

const backButton = document.getElementById("back");

const allButton = document.getElementById("all");
const categoriesButton = document.getElementById("categoriesBtn");
const playButton = document.getElementById("play");


// ==================================================
// VARIABLES
// ==================================================

let animals = [];

let exploreState = "all";

let cardArray = [];

let favoriteAnimals = new Set();


// ==================================================
// ABRIR EXPLORAR
// ==================================================

if (exploreCat) {

    exploreCat.addEventListener("click", () => {

        home.classList.add("hidden");

        exploreP.classList.remove("hidden");

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


// ==================================================
// VOLVER
// ==================================================

if (backButton) {

    backButton.addEventListener("click", () => {

        exploreP.classList.add("hidden");

        home.classList.remove("hidden");

        if (inp) {
            inp.value = "";
        }

        exploreState = "all";

    });

}


// ==================================================
// COLORES DE CATEGORÍAS
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
            return "#77a88d";
    }

}


// ==================================================
// MOSTRAR ANIMALES
// ==================================================

function displayAnimals(prods) {

    if (!mainDisplay) {
        return;
    }

    mainDisplay.innerHTML = "";

    mainDisplay.style.display = "grid";


    // ==================================================
    // SIN RESULTADOS
    // ==================================================

    if (!prods || prods.length === 0) {

        mainDisplay.innerHTML = `

            <div class="no-results">

                <p>
                    No se encontraron resultados.
                </p>

            </div>

        `;

        mainDisplay.style.display = "flex";

        mainDisplay.style.flexDirection = "column";

        return;
    }


    // ==================================================
    // TODO
    // ==================================================

    if (exploreState === "all") {

        for (const category of prods) {

            if (!category.especies) {
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
                        alt="${specie.name}"
                    >

                    <div class="animalInfo">

                        <h4>
                            ${specie.name}
                        </h4>

                        <p class="animalScientificName">
                            ${specie.scientificName}
                        </p>

                        <button
                            type="button"
                            class="animalCategory"
                        >
                            ${category.category}
                        </button>

                    </div>

                `;


                const categoryButton =
                    div.querySelector(".animalCategory");


                if (categoryButton) {

                    categoryButton.style.backgroundColor =
                        colorCategory(category.category);

                }


                mainDisplay.appendChild(div);

            }

        }

    }


    // ==================================================
    // CATEGORÍAS
    // ==================================================

    else if (exploreState === "categories") {

        for (const category of prods) {

            const div = document.createElement("div");

            div.classList.add("animalCard");


            div.innerHTML = `

                <h3>
                    ${category.category}
                </h3>

                <img
                    class="animalImg"
                    src="${category.categoryImg}"
                    alt="${category.category}"
                >

            `;


            div.style.backgroundColor =
                colorCategory(category.category);


            mainDisplay.appendChild(div);

        }

    }

}


// ==================================================
// CARGAR JSON
// ==================================================

async function load() {

    try {

        console.log("Cargando initialcategories.json...");


        const response =
            await fetch("./initialcategories.json");


        if (!response.ok) {

            throw new Error(
                "No se pudo cargar initialcategories.json"
            );

        }


        animals = await response.json();


        console.log(
            "Animales cargados:",
            animals
        );


        displayAnimals(animals);

    }

    catch (error) {

        console.error(
            "ERROR CARGANDO LOS ANIMALES:",
            error
        );


        if (mainDisplay) {

            mainDisplay.innerHTML = `

                <div class="no-results">

                    <h3>
                        No se pudo cargar la fauna.
                    </h3>

                    <p>
                        Verifica que
                        initialcategories.json
                        esté en la misma carpeta.
                    </p>

                </div>

            `;

        }

    }

}


// ==================================================
// FILTRO
// ==================================================

function filterAnimals() {

    const text =
        inp.value.trim().toLowerCase();


    // Si no hay texto
    if (text === "") {

        displayAnimals(animals);

        return;
    }


    // ==================================================
    // TODO
    // ==================================================

    if (exploreState === "all") {

        let filteredAn = [];


        switch (filterCat.value) {


            // ------------------------------------------
            // POR CATEGORÍA
            // ------------------------------------------

            case "catego":

                filteredAn =
                    animals.filter(category =>

                        category.category
                            .toLowerCase()
                            .includes(text)

                    );

                break;


            // ------------------------------------------
            // NOMBRE COTIDIANO
            // ------------------------------------------

            case "name":

                filteredAn =

                    animals

                        .map(category => {

                            const filteredSpecies =

                                category.especies.filter(specie =>

                                    specie.name
                                        .toLowerCase()
                                        .includes(text)

                                );


                            return {

                                ...category,

                                especies: filteredSpecies

                            };

                        })

                        .filter(category =>
                            category.especies.length > 0
                        );

                break;


            // ------------------------------------------
            // NOMBRE CIENTÍFICO
            // ------------------------------------------

            case "sciNa":

                filteredAn =

                    animals

                        .map(category => {

                            const filteredSpecies =

                                category.especies.filter(specie =>

                                    specie.scientificName
                                        .toLowerCase()
                                        .includes(text)

                                );


                            return {

                                ...category,

                                especies: filteredSpecies

                            };

                        })

                        .filter(category =>
                            category.especies.length > 0
                        );

                break;

        }


        displayAnimals(filteredAn);

        return;
    }


    // ==================================================
    // CATEGORÍAS
    // ==================================================

    if (exploreState === "categories") {

        const filteredCategories =

            animals.filter(category =>

                category.category
                    .toLowerCase()
                    .includes(text)

            );


        displayAnimals(filteredCategories);

    }

}


// ==================================================
// EVENTO DEL BUSCADOR
// ==================================================

if (inp) {

    inp.addEventListener(
        "input",
        filterAnimals
    );

}


// ==================================================
// CAMBIO DE FILTRO
// ==================================================

if (filterCat) {

    filterCat.addEventListener(
        "change",
        () => {

            inp.value = "";

            displayAnimals(animals);

        }
    );

}


// ==================================================
// BOTÓN TODO
// ==================================================

if (allButton) {

    allButton.addEventListener(
        "click",
        () => {

            exploreState = "all";

            filterCat.classList.remove("hidden");

            inp.value = "";

            displayAnimals(animals);

        }
    );

}


// ==================================================
// BOTÓN CATEGORÍAS
// ==================================================

if (categoriesButton) {

    categoriesButton.addEventListener(
        "click",
        () => {

            exploreState = "categories";

            filterCat.classList.add("hidden");

            inp.value = "";

            displayAnimals(animals);

        }
    );

}


// ==================================================
// BOTÓN JUEGA
// ==================================================

if (playButton) {

    playButton.addEventListener(
        "click",
        () => {

            console.log(
                "Botón ¡Juega! presionado"
            );

            // Juego pendiente de desarrollar

        }
    );

}


// ==================================================
// QUITAR INFORMACIÓN ABIERTA
// ==================================================

function removeExpandedInfo() {

    if (cardArray.length > 0) {

        const toSmall =
            cardArray.shift();


        if (toSmall) {

            toSmall.classList.remove(
                "expanded"
            );


            const oldInfo =
                toSmall.querySelector(
                    ".expandedInfo"
                );


            if (oldInfo) {
                oldInfo.remove();
            }

        }

    }

}


// ==================================================
// CLICK EN TARJETAS
// ==================================================

if (mainDisplay) {

    mainDisplay.addEventListener(
        "click",
        (e) => {


            // ------------------------------------------
            // SI SE PRESIONÓ UN BOTÓN
            // ------------------------------------------

            if (
                e.target.closest(
                    ".favoriteBtn"
                )
            ) {

                return;

            }


            if (
                e.target.closest(
                    ".moreInfoBtn"
                )
            ) {

                return;

            }


            // ------------------------------------------
            // BUSCAR TARJETA
            // ------------------------------------------

            const card =
                e.target.closest(
                    ".animalCard"
                );


            if (!card) {
                return;
            }


            // Solo expandir tarjetas de animales
            if (!card.dataset.id) {
                return;
            }


            removeExpandedInfo();


            // ------------------------------------------
            // BUSCAR ESPECIE
            // ------------------------------------------

            const specie =

                animals

                    .flatMap(
                        category =>
                            category.especies
                    )

                    .find(
                        specie =>
                            String(specie.id) ===
                            String(card.dataset.id)
                    );


            if (!specie) {

                console.error(
                    "No se encontró la especie."
                );

                return;

            }


            // ------------------------------------------
            // INFORMACIÓN
            // ------------------------------------------

            const animalInfo =
                card.querySelector(
                    ".animalInfo"
                );


            if (!animalInfo) {
                return;
            }


            const expandedInfo =
                document.createElement(
                    "div"
                );


            expandedInfo.classList.add(
                "expandedInfo"
            );


            card.dataset.status =
                specie.endangered;


            const isFavorite =
                favoriteAnimals.has(
                    String(specie.id)
                );


            expandedInfo.innerHTML = `

                <p class="conservation">

                    ${specie.endangered}

                </p>


                <p>

                    <strong>
                        Función ecológica:
                    </strong>

                    <br>

                    ${specie.function}

                </p>


                <div class="expandedActions">

                    <button
                        type="button"
                        class="favoriteBtn"
                    >
                        ${
                            isFavorite
                                ? "♥ Guardado"
                                : "♡ Guardar"
                        }
                    </button>


                    <button
                        type="button"
                        class="moreInfoBtn"
                    >
                        Más información
                    </button>

                </div>

            `;


            animalInfo.appendChild(
                expandedInfo
            );


            card.classList.add(
                "expanded"
            );


            cardArray.push(
                card
            );


            // ------------------------------------------
            // FAVORITO
            // ------------------------------------------

            const favoriteBtn =
                expandedInfo.querySelector(
                    ".favoriteBtn"
                );


            if (favoriteBtn) {

                favoriteBtn.addEventListener(
                    "click",
                    (event) => {

                        event.stopPropagation();


                        const animalId =
                            String(specie.id);


                        if (
                            favoriteAnimals.has(
                                animalId
                            )
                        ) {

                            favoriteAnimals.delete(
                                animalId
                            );


                            favoriteBtn.textContent =
                                "♡ Guardar";

                        }

                        else {

                            favoriteAnimals.add(
                                animalId
                            );


                            favoriteBtn.textContent =
                                "♥ Guardado";

                        }

                    }
                );

            }


            // ------------------------------------------
            // MÁS INFORMACIÓN
            // ------------------------------------------

            const moreInfoBtn =
                expandedInfo.querySelector(
                    ".moreInfoBtn"
                );


            if (moreInfoBtn) {

                moreInfoBtn.addEventListener(
                    "click",
                    (event) => {

                        event.stopPropagation();


                        console.log(
                            "Más información:",
                            specie.name
                        );

                    }
                );

            }

        }
    );

}


// ==================================================
// INICIAR
// ==================================================

load();
```
