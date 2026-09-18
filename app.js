// ==========================================================
// FAUNO BELO
// LÓGICA COMPLETA DE NAVEGACIÓN, EXPLORACIÓN Y FAVORITOS
// ==========================================================

let animals = [];

let currentUser = localStorage.getItem("faunoBeloUser") || null;

let favorites = JSON.parse(
    localStorage.getItem("faunoBeloFavorites") || "[]"
);

// ==========================================================
// CARGAR ANIMALES
// ==========================================================

async function loadAnimals() {

    try {

        const response = await fetch("./initialcategories.json");

        if (!response.ok) {
            throw new Error(
                "No se pudo cargar initialcategories.json"
            );
        }

        animals = await response.json();

        console.log(
            "FAUNO BELO: animales cargados correctamente:",
            animals
        );

        return animals;

    } catch (error) {

        console.error(
            "Error cargando las especies:",
            error
        );

        animals = [];

        return [];
    }
}

// ==========================================================
// OBTENER TODAS LAS ESPECIES
// ==========================================================

function getAllSpecies() {

    const result = [];

    if (!Array.isArray(animals)) {
        return result;
    }

    for (const category of animals) {

        if (
            !category ||
            !Array.isArray(category.especies)
        ) {
            continue;
        }

        for (const specie of category.especies) {

            result.push({
                ...specie,

                // Guardamos también la categoría
                category:
                    specie.category ||
                    specie.categoria ||
                    category.category ||
                    category.categoria ||
                    category.nombre ||
                    category.name ||
                    "Sin categoría"
            });
        }
    }

    return result;
}

// ==========================================================
// NAVEGACIÓN ENTRE SECCIONES
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
            element.classList.add("hidden");
        }

    });

    const target =
        document.getElementById(sectionId);

    if (target) {
        target.classList.remove("hidden");
    }
}

// ==========================================================
// ESCAPAR HTML
// Evita problemas si algún dato del JSON contiene HTML.
// ==========================================================

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// ==========================================================
// SABER SI UNA ESPECIE ESTÁ EN FAVORITOS
// ==========================================================

function isFavorite(specieId) {

    return favorites.includes(
        String(specieId)
    );
}

// ==========================================================
// GUARDAR FAVORITOS
// ==========================================================

function saveFavorites() {

    localStorage.setItem(
        "faunoBeloFavorites",
        JSON.stringify(favorites)
    );
}

// ==========================================================
// ALTERNAR FAVORITO
// ==========================================================

function toggleFavorite(specieId) {

    const id = String(specieId);

    const index =
        favorites.indexOf(id);

    if (index === -1) {

        favorites.push(id);

    } else {

        favorites.splice(index, 1);
    }

    saveFavorites();

    displayAnimals(
        getAllSpecies()
    );

    updateProfileStats();
}

// ==========================================================
// MOSTRAR ANIMALES
// ==========================================================

function displayAnimals(speciesList) {

    const container =
        document.getElementById(
            "exploreCategories"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    if (
        !Array.isArray(speciesList) ||
        speciesList.length === 0
    ) {

        container.innerHTML = `
            <div class="noResults">
                No se encontraron especies.
            </div>
        `;

        return;
    }

    for (const specie of speciesList) {

        const div =
            document.createElement("div");

        div.classList.add("animalCard");

        div.dataset.id =
            specie.id ?? "";

        const id =
            String(specie.id ?? "");

        const image =
            specie.img ||
            specie.image ||
            specie.imagen ||
            "";

        const name =
            specie.name ||
            specie.nombre ||
            "Especie sin nombre";

        const scientificName =
            specie.scientificName ||
            specie.nombreCientifico ||
            specie.scientific_name ||
            "Nombre científico no disponible";

        const category =
            specie.category ||
            specie.categoria ||
            "Sin categoría";

        const favorite =
            isFavorite(id);

        div.innerHTML = `

            <!-- IMAGEN CUADRADA -->

            <div class="animalImgContainer">

                <img
                    class="animalImg"
                    src="${escapeHTML(image)}"
                    alt="${escapeHTML(name)}"
                    loading="lazy"
                >

            </div>


            <!-- INFORMACIÓN -->

            <div class="animalInfo">

                <h4>
                    ${escapeHTML(name)}
                </h4>

                <p class="animalScientificName">
                    ${escapeHTML(scientificName)}
                </p>

                <span class="animalCategory">
                    ${escapeHTML(category)}
                </span>


                <!-- BOTONES -->

                <div class="animalActions">

                    <button
                        type="button"
                        class="favoriteBtn ${
                            favorite
                                ? "isFavorite"
                                : ""
                        }"
                        data-action="favorite"
                        data-id="${escapeHTML(id)}"
                    >
                        ${
                            favorite
                                ? "♥ En favoritos"
                                : "♡ Agregar a favoritos"
                        }
                    </button>


                    <button
                        type="button"
                        class="infoBtn"
                        data-action="info"
                        data-id="${escapeHTML(id)}"
                    >
                        ℹ Más información
                    </button>

                </div>

            </div>
        `;

        // ==================================================
        // BOTÓN FAVORITO
        // ==================================================

        const favoriteBtn =
            div.querySelector(
                '[data-action="favorite"]'
            );

        favoriteBtn.addEventListener(
            "click",
            function () {

                toggleFavorite(
                    this.dataset.id
                );

            }
        );

        // ==================================================
        // BOTÓN INFORMACIÓN
        // ==================================================

        const infoBtn =
            div.querySelector(
                '[data-action="info"]'
            );

        infoBtn.addEventListener(
            "click",
            function () {

                const selected =
                    getAllSpecies().find(
                        animal =>
                            String(animal.id) ===
                            String(this.dataset.id)
                    );

                if (selected) {
                    openSpeciesModal(selected);
                }

            }
        );

        container.appendChild(div);
    }
}

// ==========================================================
// MODAL DE INFORMACIÓN
// ==========================================================

function openSpeciesModal(specie) {

    const modal =
        document.getElementById(
            "speciesModal"
        );

    const modalBody =
        document.getElementById(
            "modalBody"
        );

    if (!modal || !modalBody) {
        return;
    }

    const image =
        specie.img ||
        specie.image ||
        specie.imagen ||
        "";

    const name =
        specie.name ||
        specie.nombre ||
        "Especie";

    const scientificName =
        specie.scientificName ||
        specie.nombreCientifico ||
        specie.scientific_name ||
        "No disponible";

    const category =
        specie.category ||
        specie.categoria ||
        "Sin categoría";


    // ======================================================
    // BUSCAR DIFERENTES POSIBLES NOMBRES EN EL JSON
    // ======================================================

    const description =
        specie.description ||
        specie.descripcion ||
        specie.desc ||
        "";

    const habitat =
        specie.habitat ||
        specie.hábitat ||
        specie.habitatNatural ||
        "";

    const distribution =
        specie.distribution ||
        specie.distribucion ||
        specie.distribución ||
        "";

    const diet =
        specie.diet ||
        specie.dieta ||
        "";

    const conservation =
        specie.conservation ||
        specie.conservacion ||
        specie.conservación ||
        specie.estadoConservacion ||
        "";

    const curiosity =
        specie.curiosity ||
        specie.curiosidad ||
        specie.datoCurioso ||
        "";


    let informationHTML = "";


    if (description) {

        informationHTML += `
            <div class="modalInfoBlock">
                <strong>Descripción</strong>
                <span>
                    ${escapeHTML(description)}
                </span>
            </div>
        `;

    }


    if (habitat) {

        informationHTML += `
            <div class="modalInfoBlock">
                <strong>Hábitat</strong>
                <span>
                    ${escapeHTML(habitat)}
                </span>
            </div>
        `;

    }


    if (distribution) {

        informationHTML += `
            <div class="modalInfoBlock">
                <strong>Distribución</strong>
                <span>
                    ${escapeHTML(distribution)}
                </span>
            </div>
        `;

    }


    if (diet) {

        informationHTML += `
            <div class="modalInfoBlock">
                <strong>Alimentación</strong>
                <span>
                    ${escapeHTML(diet)}
                </span>
            </div>
        `;

    }


    if (conservation) {

        informationHTML += `
            <div class="modalInfoBlock">
                <strong>Estado de conservación</strong>
                <span>
                    ${escapeHTML(conservation)}
                </span>
            </div>
        `;

    }


    if (curiosity) {

        informationHTML += `
            <div class="modalInfoBlock">
                <strong>Dato curioso</strong>
                <span>
                    ${escapeHTML(curiosity)}
                </span>
            </div>
        `;

    }


    if (!informationHTML) {

        informationHTML = `
            <div class="modalInfoBlock">
                <strong>Información</strong>
                <span>
                    Próximamente habrá más información
                    sobre esta especie.
                </span>
            </div>
        `;

    }


    modalBody.innerHTML = `

        <img
            class="modalAnimalImage"
            src="${escapeHTML(image)}"
            alt="${escapeHTML(name)}"
        >

        <h2 class="modalTitle">
            ${escapeHTML(name)}
        </h2>

        <div class="modalScientific">
            ${escapeHTML(scientificName)}
        </div>

        <span class="modalCategory">
            ${escapeHTML(category)}
        </span>

        ${informationHTML}

    `;


    modal.classList.remove("hidden");
}

// ==========================================================
// CERRAR MODAL
// ==========================================================

function closeSpeciesModal() {

    const modal =
        document.getElementById(
            "speciesModal"
        );

    if (modal) {
        modal.classList.add("hidden");
    }
}

// ==========================================================
// BÚSQUEDA
// ==========================================================

function filterAnimals() {

    const searchInput =
        document.getElementById(
            "filter"
        );

    const filterSelect =
        document.getElementById(
            "filterCat"
        );

    if (!searchInput) {
        return;
    }

    const search =
        searchInput.value
            .trim()
            .toLowerCase();

    const selectedType =
        filterSelect
            ? filterSelect.value
            : "catego";


    const allSpecies =
        getAllSpecies();


    if (!search) {

        displayAnimals(
            allSpecies
        );

        return;
    }


    const filtered =
        allSpecies.filter(
            specie => {

                const name =
                    String(
                        specie.name ||
                        specie.nombre ||
                        ""
                    ).toLowerCase();

                const scientific =
                    String(
                        specie.scientificName ||
                        specie.nombreCientifico ||
                        ""
                    ).toLowerCase();

                const category =
                    String(
                        specie.category ||
                        specie.categoria ||
                        ""
                    ).toLowerCase();


                if (
                    selectedType ===
                    "name"
                ) {

                    return name.includes(
                        search
                    );

                }


                if (
                    selectedType ===
                    "sciNa"
                ) {

                    return scientific.includes(
                        search
                    );

                }


                return (
                    name.includes(search) ||
                    scientific.includes(search) ||
                    category.includes(search)
                );

            }
        );


    displayAnimals(filtered);
}

// ==========================================================
// MOSTRAR TODAS
// ==========================================================

function showAllAnimals() {

    const searchInput =
        document.getElementById(
            "filter"
        );

    if (searchInput) {
        searchInput.value = "";
    }

    displayAnimals(
        getAllSpecies()
    );
}

// ==========================================================
// BOTÓN CATEGORÍAS
// ==========================================================

function showCategories() {

    const allSpecies =
        getAllSpecies();

    const categories =
        [
            ...new Set(
                allSpecies.map(
                    animal =>
                        animal.category
                )
            )
        ];


    if (categories.length === 0) {

        displayAnimals(
            allSpecies
        );

        return;
    }


    const container =
        document.getElementById(
            "exploreCategories"
        );

    if (!container) {
        return;
    }


    container.innerHTML = "";


    categories.forEach(
        category => {

            const button =
                document.createElement(
                    "button"
                );

            button.type = "button";

            button.className = "see";

            button.textContent =
                category;


            button.addEventListener(
                "click",
                () => {

                    const filtered =
                        allSpecies.filter(
                            animal =>
                                animal.category ===
                                category
                        );

                    displayAnimals(
                        filtered
                    );

                }
            );


            container.appendChild(
                button
            );

        }
    );
}

// ==========================================================
// ESTADÍSTICAS DEL PERFIL
// ==========================================================

function updateProfileStats() {

    const favoritesElement =
        document.getElementById(
            "statFavorites"
        );

    if (favoritesElement) {

        favoritesElement.textContent =
            favorites.length;

    }


    const reportsElement =
        document.getElementById(
            "statReports"
        );

    if (reportsElement) {

        const reports =
            JSON.parse(
                localStorage.getItem(
                    "faunoBeloReports"
                ) || "[]"
            );

        reportsElement.textContent =
            reports.length;

    }
}

// ==========================================================
// LOGIN / PERFIL
// ==========================================================

function updateProfileView() {

    const profileBtnText =
        document.getElementById(
            "profileBtnText"
        );

    const userNameDisplay =
        document.getElementById(
            "userNameDisplay"
        );


    if (currentUser) {

        if (profileBtnText) {
            profileBtnText.textContent =
                currentUser;
        }

        if (userNameDisplay) {
            userNameDisplay.textContent =
                currentUser;
        }

    } else {
                if (profileBtnText) {
            profileBtnText.textContent =
                "Perfil";
        }

    }

    updateProfileStats();
}


// ==========================================================
// TRIVIA FAUNO BELO
// ==========================================================

let gameScore = 0;
let currentCorrectAnswer = null;

function startTriviaGame() {

    const allSpecies = getAllSpecies();

    if (!allSpecies || allSpecies.length === 0) {
        console.error("Trivia: no hay especies disponibles.");
        return;
    }

    updateGameScoreDisplay();

    const randomIndex =
        Math.floor(Math.random() * allSpecies.length);

    currentCorrectAnswer =
        allSpecies[randomIndex];

    const gameImage =
        document.getElementById("gameImage");

    if (gameImage) {

        gameImage.src =
            currentCorrectAnswer.img ||
            currentCorrectAnswer.image ||
            currentCorrectAnswer.imagen ||
            "";

        gameImage.alt =
            currentCorrectAnswer.name ||
            currentCorrectAnswer.nombre ||
            "Especie misteriosa";
    }

    let options = [currentCorrectAnswer];

    while (
        options.length < 4 &&
        options.length < allSpecies.length
    ) {

        const randomOpt =
            allSpecies[
                Math.floor(Math.random() * allSpecies.length)
            ];

        if (!options.includes(randomOpt)) {
            options.push(randomOpt);
        }
    }

    options.sort(
        () => Math.random() - 0.5
    );

    const optionsContainer =
        document.getElementById("gameOptions");

    if (!optionsContainer) {
        return;
    }

    optionsContainer.innerHTML = "";

    options.forEach(option => {

        const btn =
            document.createElement("button");

        btn.type = "button";
        btn.className = "see";
        btn.style.margin = "8px";

        btn.textContent =
            option.name ||
            option.nombre ||
            "Especie";

        btn.addEventListener(
            "click",
            () => checkTriviaAnswer(option)
        );

        optionsContainer.appendChild(btn);

    });
}

function checkTriviaAnswer(selectedOption) {

    if (!currentCorrectAnswer || !selectedOption) {
        return;
    }

    const correctName =
        currentCorrectAnswer.name ||
        currentCorrectAnswer.nombre ||
        "";

    const selectedName =
        selectedOption.name ||
        selectedOption.nombre ||
        "";

    if (selectedName === correctName) {

        gameScore += 10;

        alert("¡Correcto! 🎉");

    } else {

        alert(
            `Incorrecto. Era: ${correctName}`
        );

    }

    updateGameScoreDisplay();

    startTriviaGame();
}

function updateGameScoreDisplay() {

    const scoreElement =
        document.getElementById("currentScore");

    if (scoreElement) {

        scoreElement.textContent =
            gameScore;

    }
}

// ==========================================================
// DOM READY
// ==========================================================

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        // ================================================
        // INICIO
        // ================================================

        showSection("home");

        updateProfileView();


        // ================================================
        // CARGAR ESPECIES UNA SOLA VEZ
        // ================================================

        await loadAnimals();


        // ================================================
        // PERFIL
        // ================================================

        const profileBtn =
            document.getElementById(
                "profile"
            );

        if (profileBtn) {

            profileBtn.addEventListener(
                "click",
                () => {

                    if (currentUser) {

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

        }


        // ================================================
        // EXPLORAR
        // ================================================

        const exploreBtn =
            document.getElementById(
                "explore"
            );

        if (exploreBtn) {

            exploreBtn.addEventListener(
                "click",
                () => {

                    showSection(
                        "categories"
                    );

                    displayAnimals(
                        getAllSpecies()
                    );

                }
            );

        }


        // ================================================
        // REPORTAR
        // ================================================

        const reportBtn =
            document.getElementById(
                "report"
            );

        if (reportBtn) {

            reportBtn.addEventListener(
                "click",
                () => {

                    showSection(
                        "reportSection"
                    );

                }
            );

        }


        // ================================================
        // BOTONES VOLVER
        // ================================================

        const backButtons = [
            "authBack",
            "profileBack",
            "reportBack"
        ];


        backButtons.forEach(
            buttonId => {

                const button =
                    document.getElementById(
                        buttonId
                    );

                if (button) {

                    button.addEventListener(
                        "click",
                        () => {

                            showSection(
                                "home"
                            );

                        }
                    );

                }

            }
        );


        // ================================================
        // VOLVER DE EXPLORAR
        // ================================================

        const backExplore =
            document.getElementById(
                "back"
            );

        if (backExplore) {

            backExplore.addEventListener(
                "click",
                () => {

                    showSection(
                        "home"
                    );

                }
            );

        }


        // ================================================
        // JUEGO
        // ================================================

        const playBtn =
            document.getElementById(
                "play"
            );

        if (playBtn) {

            playBtn.addEventListener(
                "click",
                () => {

                    showSection(
                        "gameSection"
                    );

                    startTriviaGame();

                }
            );

        }


        // ================================================
        // VOLVER DEL JUEGO
        // ================================================

        const gameBackBtn =
            document.getElementById(
                "gameBack"
            );

        if (gameBackBtn) {

            gameBackBtn.addEventListener(
                "click",
                () => {

                    showSection(
                        "categories"
                    );

                    displayAnimals(
                        getAllSpecies()
                    );

                }
            );

        }


        // ================================================
        // BOTÓN TODO
        // ================================================

        const allBtn =
            document.getElementById(
                "all"
            );

        if (allBtn) {

            allBtn.addEventListener(
                "click",
                showAllAnimals
            );

        }


        // ================================================
        // BOTÓN CATEGORÍAS
        // ================================================

        const categoriesBtn =
            document.getElementById(
                "categoriesBtn"
            );

        if (categoriesBtn) {

            categoriesBtn.addEventListener(
                "click",
                showCategories
            );

        }


        // ================================================
        // BUSCADOR
        // ================================================

        const filterInput =
            document.getElementById(
                "filter"
            );

        if (filterInput) {

            filterInput.addEventListener(
                "input",
                filterAnimals
            );

        }


        // ================================================
        // SELECT DE BÚSQUEDA
        // ================================================

        const filterCat =
            document.getElementById(
                "filterCat"
            );

        if (filterCat) {

            filterCat.addEventListener(
                "change",
                filterAnimals
            );

        }


        // ================================================
        // CERRAR MODAL
        // ================================================

        const closeModal =
            document.getElementById(
                "closeModal"
            );

        if (closeModal) {

            closeModal.addEventListener(
                "click",
                closeSpeciesModal
            );

        }


        // ================================================
        // CERRAR MODAL HACIENDO CLICK AFUERA
        // ================================================

        const speciesModal =
            document.getElementById(
                "speciesModal"
            );

        if (speciesModal) {

            speciesModal.addEventListener(
                "click",
                event => {

                    if (
                        event.target ===
                        speciesModal
                    ) {

                        closeSpeciesModal();

                    }

                }
            );

        }


        // ================================================
        // TECLA ESC PARA CERRAR MODAL
        // ================================================

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape"
                ) {

                    closeSpeciesModal();

                }

            }
        );


        // ================================================
        // MOSTRAR REGISTRO
        // ================================================

        const showRegister =
            document.getElementById(
                "showRegister"
            );

        const showLogin =
            document.getElementById(
                "showLogin"
            );

        const loginBox =
            document.getElementById(
                "loginBox"
            );

        const registerBox =
            document.getElementById(
                "registerBox"
            );


        if (
            showRegister &&
            showLogin &&
            loginBox &&
            registerBox
        ) {

            showRegister.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    loginBox.classList.add(
                        "hidden"
                    );

                    registerBox.classList.remove(
                        "hidden"
                    );

                }
            );


            showLogin.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    registerBox.classList.add(
                        "hidden"
                    );

                    loginBox.classList.remove(
                        "hidden"
                    );

                }
            );

        }


        // ================================================
        // REGISTRO
        // ================================================

        const registerForm =
            document.getElementById(
                "registerForm"
            );

        if (registerForm) {

            registerForm.addEventListener(
                "submit",
                event => {

                    event.preventDefault();

                    const username =
                        document.getElementById(
                            "regUser"
                        ).value.trim();

                    const password =
                        document.getElementById(
                            "regPass"
                        ).value;


                    if (!username || !password) {
                        return;
                    }


                    localStorage.setItem(
                        "faunoBeloAccount",
                        JSON.stringify({
                            username,
                            password
                        })
                    );


                    alert(
                        "Cuenta creada correctamente."
                    );


                    document.getElementById(
                        "loginUser"
                    ).value = username;


                    registerBox.classList.add(
                        "hidden"
                    );

                    loginBox.classList.remove(
                        "hidden"
                    );

                }
            );

        }
                // ================================================
        // LOGIN
        // ================================================

        const loginForm =
            document.getElementById(
                "loginForm"
            );

        if (loginForm) {

            loginForm.addEventListener(
                "submit",
                event => {

                    event.preventDefault();


                    const username =
                        document.getElementById(
                            "loginUser"
                        ).value.trim();

                    const password =
                        document.getElementById(
                            "loginPass"
                        ).value;


                    const account =
                        JSON.parse(
                            localStorage.getItem(
                                "faunoBeloAccount"
                            ) || "null"
                        );


                    if (
                        account &&
                        account.username === username &&
                        account.password === password
                    ) {

                        currentUser =
                            username;

                        localStorage.setItem(
                            "faunoBeloUser",
                            currentUser
                        );


                        updateProfileView();


                        alert(
                            "Sesión iniciada correctamente."
                        );


                        showSection(
                            "userProfileSection"
                        );

                    } else {

                        alert(
                            "Usuario o contraseña incorrectos."
                        );

                    }

                }
            );

        }


        // ================================================
        // CERRAR SESIÓN
        // ================================================

        const logoutBtn =
            document.getElementById(
                "logoutBtn"
            );

        if (logoutBtn) {

            logoutBtn.addEventListener(
                "click",
                () => {

                    currentUser = null;

                    localStorage.removeItem(
                        "faunoBeloUser"
                    );

                    updateProfileView();

                    showSection(
                        "home"
                    );

                }
            );

        }


        // ================================================
        // FORMULARIO DE REPORTES
        // ================================================

        const reportForm =
            document.getElementById(
                "reportForm"
            );

        if (reportForm) {

            reportForm.addEventListener(
                "submit",
                event => {

                    event.preventDefault();


                    const report = {

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

                        user:
                            currentUser || "Visitante",

                        createdAt:
                            new Date().toISOString()

                    };


                    const reports =
                        JSON.parse(
                            localStorage.getItem(
                                "faunoBeloReports"
                            ) || "[]"
                        );


                    reports.push(report);


                    localStorage.setItem(
                        "faunoBeloReports",
                        JSON.stringify(reports)
                    );


                    updateProfileStats();


                    alert(
                        "¡Avistamiento registrado correctamente!"
                    );


                    reportForm.reset();

                    showSection(
                        "home"
                    );

                }
            );

        }

    }
);
