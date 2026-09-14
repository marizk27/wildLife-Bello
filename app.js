// ==========================================================
// FAUNO BELO
// APP.JS COMPLETO
// ==========================================================

let animals = [];

let favoriteAnimals = new Set();

let exploreState = "all";

let gameScore = 0;

let currentGameSpecies = null;


// ==========================================================
// CARGAR ESPECIES
// ==========================================================

async function loadAnimals() {

    try {

        const response =
            await fetch("./initialcategories.json");

        if (!response.ok) {

            throw new Error(
                "No se pudo cargar initialcategories.json"
            );

        }

        animals = await response.json();

        console.log(
            "FAUNO BELO: especies cargadas",
            animals
        );

        return true;

    } catch (error) {

        console.error(
            "Error cargando especies:",
            error
        );

        const container =
            document.getElementById(
                "exploreCategories"
            );

        if (container) {

            container.innerHTML = `

                <div class="no-results">

                    <h3>
                        No se pudo cargar la fauna
                    </h3>

                    <p>
                        Verifica que
                        initialcategories.json
                        esté correctamente ubicado.
                    </p>

                </div>

            `;

        }

        return false;

    }

}


// ==========================================================
// MOSTRAR SECCIÓN
// ==========================================================

function showSection(sectionId) {

    const sections = [

        "home",
        "categories",
        "authSection",
        "userProfileSection",
        "reportSection",
        "gameSection"

    ];


    sections.forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {

            element.classList.add(
                "hidden"
            );

        }

    });


    const target =
        document.getElementById(
            sectionId
        );


    if (target) {

        target.classList.remove(
            "hidden"
        );

    }

}


// ==========================================================
// TODAS LAS ESPECIES EN UNA SOLA LISTA
// ==========================================================

function getAllSpecies() {

    const result = [];


    animals.forEach(category => {

        if (
            category.especies &&
            Array.isArray(category.especies)
        ) {

            category.especies.forEach(specie => {

                result.push({

                    ...specie,

                    category:
                        category.category

                });

            });

        }

    });


    return result;

}


// ==========================================================
// COLOR DE CATEGORÍA
// ==========================================================

function getCategoryColor(category) {

    const value =
        String(category || "")
            .toLowerCase();


    if (
        value.includes("anfib")
    ) {

        return "#2e7d32";

    }


    if (
        value.includes("ave")
    ) {

        return "#2878c8";

    }


    if (
        value.includes("mamífer") ||
        value.includes("mamifer")
    ) {

        return "#9a6728";

    }


    if (
        value.includes("reptil")
    ) {

        return "#c84c3a";

    }


    if (
        value.includes("insect")
    ) {

        return "#7b3f7b";

    }


    return "#397a4b";

}


// ==========================================================
// MOSTRAR TODAS LAS ESPECIES
// ==========================================================

function displayAnimals(data) {

    const container =
        document.getElementById(
            "exploreCategories"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    // ======================================================
    // MODO CATEGORÍAS
    // ======================================================

    if (
        exploreState === "categories"
    ) {

        displayCategories(
            data
        );

        return;

    }


    // ======================================================
    // CREAR TARJETAS
    // ======================================================

    data.forEach(category => {

        if (
            !category.especies ||
            !Array.isArray(category.especies)
        ) {

            return;

        }


        category.especies.forEach(specie => {

            createAnimalCard(
                specie,
                category.category,
                container
            );

        });

    });


    if (
        container.children.length === 0
    ) {

        container.innerHTML = `

            <div class="no-results">

                <h3>
                    No encontramos resultados
                </h3>

                <p>
                    Prueba con otro nombre.
                </p>

            </div>

        `;

    }

}


// ==========================================================
// CREAR TARJETA DE ANIMAL
// ==========================================================

function createAnimalCard(
    specie,
    categoryName,
    container
) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "animalCard";


    card.dataset.id =
        String(specie.id);


    const isFavorite =
        favoriteAnimals.has(
            String(specie.id)
        );


    const categoryColor =
        getCategoryColor(
            categoryName
        );


    card.innerHTML = `

        <div class="animalImageContainer">

            <img
                class="animalImg"
                src="${specie.img || ""}"
                alt="${specie.name || "Especie"}"
                loading="lazy"
            >

        </div>


        <div class="animalInfo">

            <h4>
                ${specie.name || "Sin nombre"}
            </h4>


            <p class="animalScientificName">

                ${specie.scientificName || ""}

            </p>


            <span
                class="animalCategory"
                style="background:${categoryColor};"
            >
                ${categoryName || "Fauna"}
            </span>


            <div class="animalActions">

                <button
                    type="button"
                    class="favoriteBtn ${
                        isFavorite
                            ? "favoriteActive"
                            : ""
                    }"
                    data-id="${specie.id}"
                >

                    ${
                        isFavorite
                            ? "♥ Favorito"
                            : "♡ Favorito"
                    }

                </button>


                <button
                    type="button"
                    class="infoBtn"
                    data-id="${specie.id}"
                >

                    ⓘ Más info

                </button>

            </div>

        </div>

    `;


    container.appendChild(
        card
    );

}


// ==========================================================
// MOSTRAR CATEGORÍAS
// ==========================================================

function displayCategories(data) {

    const container =
        document.getElementById(
            "exploreCategories"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    data.forEach(category => {

        const card =
            document.createElement(
                "article"
            );


        card.className =
            "categoryCard";


        const categoryColor =
            getCategoryColor(
                category.category
            );


        card.innerHTML = `

            <div
                class="categoryColorBar"
                style="
                    background:${categoryColor};
                "
            ></div>


            <div class="categoryContent">

                <h3>
                    ${category.category}
                </h3>


                <p>
                    ${
                        category.especies
                            ? category.especies.length
                            : 0
                    }
                    especies
                </p>


                <button
                    type="button"
                    class="see categoryOpenBtn"
                    data-category="${category.category}"
                >
                    Explorar categoría
                </button>

            </div>

        `;


        container.appendChild(
            card
        );

    });

}


// ==========================================================
// BUSCADOR
// ==========================================================

function filterAnimals() {

    const input =
        document.getElementById(
            "filter"
        );


    const select =
        document.getElementById(
            "filterCat"
        );


    if (
        !input ||
        !select
    ) {

        return;

    }


    const search =
        input.value
            .trim()
            .toLowerCase();


    if (
        search === ""
    ) {

        displayAnimals(
            animals
        );

        return;

    }


    // ======================================================
    // BUSCAR
    // ======================================================

    const filtered =
        animals
            .map(category => {

                // ------------------------------------------
                // CATEGORÍA
                // ------------------------------------------

                if (
                    select.value ===
                    "catego"
                ) {

                    if (
                        category.category
                            .toLowerCase()
                            .includes(search)
                    ) {

                        return category;

                    }

                    return {

                        ...category,

                        especies: []

                    };

                }


                // ------------------------------------------
                // ESPECIES
                // ------------------------------------------

                const species =
                    category.especies.filter(
                        specie => {

                            if (
                                select.value ===
                                "name"
                            ) {

                                return String(
                                    specie.name || ""
                                )
                                .toLowerCase()
                                .includes(search);

                            }


                            if (
                                select.value ===
                                "sciNa"
                            ) {

                                return String(
                                    specie.scientificName || ""
                                )
                                .toLowerCase()
                                .includes(search);

                            }


                            return false;

                        }
                    );


                return {

                    ...category,

                    especies: species

                };

            })


            .filter(
                category =>
                    category.especies &&
                    category.especies.length > 0
            );


    displayAnimals(
        filtered
    );

}


// ==========================================================
// FAVORITOS
// ==========================================================

function toggleFavorite(id) {

    id = String(id);


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


    saveFavorites();


    updateFavoriteButtons();


    updateProfileStats();

}


// ==========================================================
// GUARDAR FAVORITOS
// ==========================================================

function saveFavorites() {

    localStorage.setItem(

        "faunoBeloFavorites",

        JSON.stringify(
            Array.from(
                favoriteAnimals
            )
        )

    );

}


// ==========================================================
// CARGAR FAVORITOS
// ==========================================================

function loadFavorites() {

    try {

        const saved =
            JSON.parse(
                localStorage.getItem(
                    "faunoBeloFavorites"
                ) || "[]"
            );


        favoriteAnimals =
            new Set(
                saved.map(
                    id => String(id)
                )
            );

    } catch {

        favoriteAnimals =
            new Set();

    }

}


// ==========================================================
// ACTUALIZAR BOTONES DE FAVORITO
// ==========================================================

function updateFavoriteButtons() {

    const buttons =
        document.querySelectorAll(
            ".favoriteBtn"
        );


    buttons.forEach(button => {

        const id =
            String(
                button.dataset.id
            );


        const active =
            favoriteAnimals.has(
                id
            );


        if (active) {

            button.textContent =
                "♥ Favorito";


            button.classList.add(
                "favoriteActive"
            );

        } else {

            button.textContent =
                "♡ Favorito";


            button.classList.remove(
                "favoriteActive"
            );

        }

    });

}


// ==========================================================
// ACTUALIZAR PERFIL
// ==========================================================

function updateProfileStats() {

    const favoriteCounter =
        document.getElementById(
            "statFavorites"
        );


    if (favoriteCounter) {

        favoriteCounter.textContent =
            favoriteAnimals.size;

    }


    const reports =
        JSON.parse(
            localStorage.getItem(
                "faunoBeloReports"
            ) || "[]"
        );


    const reportCounter =
        document.getElementById(
            "statReports"
        );


    if (reportCounter) {

        reportCounter.textContent =
            reports.length;

    }

}


// ==========================================================
// MÁS INFORMACIÓN
// ==========================================================

function showSpeciesInfo(specie) {

    const modal =
        document.getElementById(
            "speciesModal"
        );


    const body =
        document.getElementById(
            "modalBody"
        );


    if (
        !modal ||
        !body
    ) {

        return;

    }


    // ======================================================
    // BUSCAR CAMPOS POSIBLES DEL JSON
    // ======================================================

    const description =
        specie.description ||
        specie.descripcion ||
        specie.info ||
        specie.information ||
        "No hay una descripción disponible para esta especie.";


    const habitat =
        specie.habitat ||
        specie.habitatDescription ||
        specie.habitatDescripcion ||
        "Información no disponible.";


    const diet =
        specie.diet ||
        specie.alimentacion ||
        specie.alimentation ||
        "Información no disponible.";


    const conservation =
        specie.conservationStatus ||
        specie.endangered ||
        specie.estadoConservacion ||
        specie.estado ||
        "Información no disponible.";


    const functionEco =
        specie.function ||
        specie.ecologicalFunction ||
        specie.funcion ||
        specie.funcionEcologica ||
        "Información no disponible.";


    const isFavorite =
        favoriteAnimals.has(
            String(specie.id)
        );


    body.innerHTML = `

        <div class="modalAnimalHeader">

            <img
                src="${specie.img || ""}"
                alt="${specie.name || ""}"
            >


            <div>

                <h2>
                    ${specie.name || "Especie"}
                </h2>


                <p class="modalScientific">

                    <em>
                        ${
                            specie.scientificName || ""
                        }
                    </em>

                </p>


                <span class="modalCategory">

                    ${specie.category || "Fauna"}

                </span>

            </div>

        </div>


        <div class="modalInformation">

            <div class="infoBlock">

                <h3>
                    📝 Descripción
                </h3>

                <p>
                    ${description}
                </p>

            </div>


            <div class="infoBlock">

                <h3>
                    🌿 Hábitat
                </h3>

                <p>
                    ${habitat}
                </p>

            </div>


            <div class="infoBlock">

                <h3>
                    🍃 Alimentación
                </h3>

                <p>
                    ${diet}
                </p>

            </div>


            <div class="infoBlock">

                <h3>
                    🛡️ Conservación
                </h3>

                <p>
                    ${conservation}
                </p>

            </div>


            <div class="infoBlock">

                <h3>
                    🌎 Función ecológica
                </h3>

                <p>
                    ${functionEco}
                </p>

            </div>

        </div>


        <button
            type="button"
            class="modalFavoriteBtn ${
                isFavorite
                    ? "favoriteActive"
                    : ""
            }"
            id="modalFavoriteBtn"
        >

            ${
                isFavorite
                    ? "♥ Quitar de favoritos"
                    : "♡ Agregar a favoritos"
            }

        </button>

    `;


    modal.classList.remove(
        "hidden"
    );


    // ======================================================
    // FAVORITO DESDE EL MODAL
    // ======================================================

    const favoriteButton =
        document.getElementById(
            "modalFavoriteBtn"
        );


    if (favoriteButton) {

        favoriteButton.addEventListener(
            "click",
            () => {

                toggleFavorite(
                    String(specie.id)
                );


                const active =
                    favoriteAnimals.has(
                        String(specie.id)
                    );


                favoriteButton.textContent =

                    active

                        ? "♥ Quitar de favoritos"

                        : "♡ Agregar a favoritos";

            }
        );

    }

}


// ==========================================================
// JUEGO
// ==========================================================

function startGame() {

    const species =
        getAllSpecies();


    if (
        species.length < 4
    ) {

        alert(
            "No hay suficientes especies para iniciar la trivia."
        );

        return;

    }


    currentGameSpecies =
        species[
            Math.floor(
                Math.random() *
                species.length
            )
        ];


    const image =
        document.getElementById(
            "gameImage"
        );


    const options =
        document.getElementById(
            "gameOptions"
        );


    if (
        !image ||
        !options
    ) {

        return;

    }


    image.src =
        currentGameSpecies.img;


    options.innerHTML = "";


    const incorrect =
        species
            .filter(
                specie =>
                    specie.id !==
                    currentGameSpecies.id
            )
            .sort(
                () =>
                    Math.random() - 0.5
            )
            .slice(
                0,
                3
            );


    const answers = [

        currentGameSpecies,

        ...incorrect

    ];


    answers.sort(
        () =>
            Math.random() - 0.5
    );


    answers.forEach(
        specie => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "see gameAnswer";


            button.textContent =
                specie.name;


            button.addEventListener(
                "click",
                () => {

                    if (
                        specie.id ===
                        currentGameSpecies.id
                    ) {

                        gameScore++;

                        alert(
                            "¡Correcto!"
                        );

                    } else {

                        alert(
                            "Respuesta incorrecta."
                        );

                    }


                    const score =
                        document.getElementById(
                            "currentScore"
                        );


                    if (score) {

                        score.textContent =
                            gameScore;

                    }


                    startGame();

                }
            );


            options.appendChild(
                button
            );

        }
    );

}


// ==========================================================
// INICIO DE LA APLICACIÓN
// ==========================================================

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        // -----------------------------------------------
        // CARGAR FAVORITOS
        // -----------------------------------------------

        loadFavorites();


        // -----------------------------------------------
        // MOSTRAR HOME
        // -----------------------------------------------

        showSection(
            "home"
        );


        // -----------------------------------------------
        // CARGAR JSON
        // -----------------------------------------------

        await loadAnimals();


        // =================================================
        // PERFIL
        // =================================================

        const profile =
            document.getElementById(
                "profile"
            );


        profile?.addEventListener(
            "click",
            () => {

                const user =
                    localStorage.getItem(
                        "faunoBeloUser"
                    );


                if (user) {

                    document.getElementById(
                        "userNameDisplay"
                    ).textContent =
                        user;


                    updateProfileStats();


                    showSection(
                        "userProfileSection"
                    );

                } else {

                    showSection(
                        "authSection"
                    );

                }

            }
        );


        // =================================================
        // EXPLORAR
        // =================================================

        const explore =
            document.getElementById(
                "explore"
            );


        explore?.addEventListener(
            "click",
            () => {

                exploreState =
                    "all";


                document.getElementById(
                    "filter"
                ).value = "";


                document.getElementById(
                    "filterCat"
                ).classList.remove(
                    "hidden"
                );


                showSection(
                    "categories"
                );


                displayAnimals(
                    animals
                );

            }
        );


        // =================================================
        // TODO
        // =================================================

        document.getElementById(
            "all"
        )?.addEventListener(
            "click",
            () => {

                exploreState =
                    "all";


                document.getElementById(
                    "filter"
                ).value = "";


                document.getElementById(
                    "filterCat"
                ).classList.remove(
                    "hidden"
                );


                displayAnimals(
                    animals
                );

            }
        );


        // =================================================
        // CATEGORÍAS
        // =================================================

        document.getElementById(
            "categoriesBtn"
        )?.addEventListener(
            "click",
            () => {

                exploreState =
                    "categories";


                document.getElementById(
                    "filter"
                ).value = "";


                document.getElementById(
                    "filterCat"
                ).classList.add(
                    "hidden"
                );


                displayAnimals(
                    animals
                );

            }
        );


        // =================================================
        // BUSCADOR
        // =================================================

        document.getElementById(
            "filter"
        )?.addEventListener(
            "input",
            filterAnimals
        );


        document.getElementById(
            "filterCat"
        )?.addEventListener(
            "change",
            filterAnimals
        );


        // =================================================
        // CLIC EN TARJETAS
        // =================================================

        document.getElementById(
            "exploreCategories"
        )?.addEventListener(
            "click",
            event => {

                // -----------------------------------------
                // FAVORITO
                // -----------------------------------------

                const favoriteButton =
                    event.target.closest(
                        ".favoriteBtn"
                    );


                if (favoriteButton) {

                    toggleFavorite(
                        favoriteButton.dataset.id
                    );

                    return;

                }


                // -----------------------------------------
                // MÁS INFO
                // -----------------------------------------

                const infoButton =
                    event.target.closest(
                        ".infoBtn"
                    );


                if (infoButton) {

                    const specie =
                        getAllSpecies()
                            .find(
                                animal =>
                                    String(
                                        animal.id
                                    ) ===
                                    String(
                                        infoButton.dataset.id
                                    )
                            );


                    if (specie) {

                        showSpeciesInfo(
                            specie
                        );

                    }


                    return;

                }


                // -----------------------------------------
                // ABRIR CATEGORÍA
                // -----------------------------------------

                const categoryButton =
                    event.target.closest(
                        ".categoryOpenBtn"
                    );


                if (categoryButton) {

                    const categoryName =
                        categoryButton.dataset.category;


                    const category =
                        animals.find(
                            item =>
                                item.category ===
                                categoryName
                        );


                    if (category) {

                        exploreState =
                            "all";


                        document.getElementById(
                            "filterCat"
                        ).classList.remove(
                            "hidden"
                        );


                        displayAnimals([
                            category
                        ]);

                    }


                    return;

                }

            }
        );


        // =================================================
        // REPORTAR
        // =================================================

        document.getElementById(
            "report"
        )?.addEventListener(
            "click",
            () => {

                showSection(
                    "reportSection"
                );

            }
        );


        // =================================================
        // REPORT FORM
        // =================================================

        document.getElementById(
            "reportForm"
        )?.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const reports =
                    JSON.parse(
                        localStorage.getItem(
                            "faunoBeloReports"
                        ) || "[]"
                    );


                reports.push({

                    species:
                        document.getElementById(
                            "reportSpecies"
                        ).value,

                    location:
                        document.getElementById(
                            "reportLocation"
                        ).value,

                    date:
                        document.getElementById(
                            "reportDate"
                        ).value,

                    notes:
                        document.getElementById(
                            "reportNotes"
                        ).value,

                    createdAt:
                        new Date().toISOString()

                });


                localStorage.setItem(
                    "faunoBeloReports",
                    JSON.stringify(
                        reports
                    )
                );


                updateProfileStats();


                alert(
                    "¡Avistamiento registrado correctamente!"
                );


                event.target.reset();


                showSection(
                    "home"
                );

            }
        );


        // =================================================
        // LOGIN
        // =================================================

        document.getElementById(
            "loginForm"
        )?.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const username =
                    document.getElementById(
                        "loginUser"
                    ).value.trim();


                if (!username) {

                    return;

                }


                localStorage.setItem(
                    "faunoBeloUser",
                    username
                );


                document.getElementById(
                    "userNameDisplay"
                ).textContent =
                    username;


                document.getElementById(
                    "profileBtnText"
                ).textContent =
                    username;


                showSection(
                    "userProfileSection"
                );

            }
        );


        // =================================================
        // REGISTRO
        // =================================================

        document.getElementById(
            "registerForm"
        )?.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const username =
                    document.getElementById(
                        "regUser"
                    ).value.trim();


                if (!username) {

                    return;

                }


                localStorage.setItem(
                    "faunoBeloUser",
                    username
                );


                document.getElementById(
                    "userNameDisplay"
                ).textContent =
                    username;


                document.getElementById(
                    "profileBtnText"
                ).textContent =
                    username;


                showSection(
                    "userProfileSection"
                );

            }
        );


        // =================================================
        // CERRAR SESIÓN
        // =================================================

        document.getElementById(
            "logoutBtn"
        )?.addEventListener(
            "click",
            () => {

                localStorage.removeItem(
                    "faunoBeloUser"
                );


                document.getElementById(
                    "profileBtnText"
                ).textContent =
                    "Perfil";


                showSection(
                    "home"
                );

            }
        );


        // =================================================
        // CAMBIAR LOGIN / REGISTRO
        // =================================================

        document.getElementById(
            "showRegister"
        )?.addEventListener(
            "click",
            event => {

                event.preventDefault();


                document.getElementById(
                    "loginBox"
                ).classList.add(
                    "hidden"
                );


                document.getElementById(
                    "registerBox"
                ).classList.remove(
                    "hidden"
                );

            }
        );


        document.getElementById(
            "showLogin"
        )?.addEventListener(
            "click",
            event => {

                event.preventDefault();


                document.getElementById(
                    "registerBox"
                ).classList.add(
                    "hidden"
                );


                document.getElementById(
                    "loginBox"
                ).classList.remove(
                    "hidden"
                );

            }
        );


        // =================================================
        // CERRAR MODAL
        // =================================================

        document.getElementById(
            "closeModal"
        )?.addEventListener(
            "click",
            () => {

                document.getElementById(
                    "speciesModal"
                ).classList.add(
                    "hidden"
                );

            }
        );


        document.getElementById(
            "speciesModal"
        )?.addEventListener(
            "click",
            event => {

                if (
                    event.target.id ===
                    "speciesModal"
                ) {

                    event.currentTarget.classList.add(
                        "hidden"
                    );

                }

            }
        );


        // =================================================
        // JUEGO
        // =================================================

        document.getElementById(
            "play"
        )?.addEventListener(
            "click",
            () => {

                gameScore =
                    0;


                document.getElementById(
                    "currentScore"
                ).textContent =
                    "0";


                showSection(
                    "gameSection"
                );


                startGame();

            }
        );


        // =================================================
        // VOLVER AL JUEGO
        // =================================================

        document.getElementById(
            "gameBack"
        )?.addEventListener(
            "click",
            () => {

                showSection(
                    "categories"
                );


                displayAnimals(
                    animals
                );

            }
        );


        // =================================================
        // BOTONES VOLVER
        // =================================================

        const backButtons = [

            "authBack",
            "profileBack",
            "reportBack",
            "back"

        ];


        backButtons.forEach(id => {

            document.getElementById(
                id
            )?.addEventListener(
                "click",
                () => {

                    showSection(
                        "home"
                    );

                }
            );

        });


        // =================================================
        // USUARIO GUARDADO
        // =================================================

        const savedUser =
            localStorage.getItem(
                "faunoBeloUser"
            );


        if (savedUser) {

            document.getElementById(
                "profileBtnText"
            ).textContent =
                savedUser;

        }


        // =================================================
        // ESTADÍSTICAS
        // =================================================

        updateProfileStats();


        console.log(
            "FAUNO BELO INICIADO CORRECTAMENTE"
        );

    }
);
