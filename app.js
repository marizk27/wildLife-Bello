// ==========================================================
// FAUNO BELO
// LÓGICA PRINCIPAL DE NAVEGACIÓN, FAUNA, PERFIL Y JUEGO
// ==========================================================

let animals = [];
let favoriteAnimals = new Set();
let exploreState = "all";

// ==========================================================
// CARGAR DATOS DE FAUNA
// ==========================================================

async function loadAnimals() {
    try {
        const response = await fetch("./initialcategories.json");

        if (!response.ok) {
            throw new Error("No se pudo cargar initialcategories.json");
        }

        animals = await response.json();

        console.log("================================");
        console.log("FAUNA CARGADA CORRECTAMENTE");
        console.log("Categorías:", animals.length);

        let totalSpecies = 0;

        animals.forEach(category => {
            totalSpecies += category.especies.length;
        });

        console.log("Especies:", totalSpecies);
        console.log("================================");

    } catch (error) {
        console.error("ERROR CARGANDO LA FAUNA:", error);

        const mainDisplay =
            document.getElementById("exploreCategories");

        if (mainDisplay) {
            mainDisplay.innerHTML = `
                <div class="no-results">
                    <h3>No se pudo cargar la fauna</h3>
                    <p>Revisa que <strong>initialcategories.json</strong> esté en la misma carpeta que este archivo.</p>
                </div>
            `;
        }
    }
}

// ==========================================================
// CAMBIAR DE SECCIÓN
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

        const element = document.getElementById(id);

        if (element) {
            element.classList.add("hidden");
        }

    });

    const targetSection =
        document.getElementById(sectionId);

    if (targetSection) {
        targetSection.classList.remove("hidden");
    }
}

// ==========================================================
// COLOR DE CATEGORÍAS
// ==========================================================

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
            return "#5c8d65";
    }
}

// ==========================================================
// MOSTRAR TODAS LAS ESPECIES
// ==========================================================

function displayAnimals(data) {

    const mainDisplay =
        document.getElementById("exploreCategories");

    if (!mainDisplay) {
        console.error(
            "No existe #exploreCategories"
        );
        return;
    }

    mainDisplay.innerHTML = "";

    mainDisplay.style.display = "grid";

    // ======================================================
    // SI NO HAY RESULTADOS
    // ======================================================

    if (!data || data.length === 0) {

        mainDisplay.innerHTML = `
            <div class="no-results">
                <h3>No encontramos resultados</h3>
                <p>Prueba con otro nombre o categoría.</p>
            </div>
        `;

        return;
    }

    // ======================================================
    // MODO TODO
    // ======================================================

    if (exploreState === "all") {

        for (const category of data) {

            if (!category.especies) {
                continue;
            }

            for (const specie of category.especies) {

                const div =
                    document.createElement("div");

                div.dataset.id = specie.id;

                div.classList.add("animalCard");

                div.innerHTML = `
                    <img
                        class="animalImg"
                        src="${specie.img}"
                        alt="${specie.name}"
                        loading="lazy"
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

        return;
    }

    // ======================================================
    // MODO CATEGORÍAS
    // ======================================================

    if (exploreState === "categories") {

        for (const category of data) {

            const div =
                document.createElement("div");

            div.classList.add("animalCard");

            div.innerHTML = `
                <h3>
                    ${category.category}
                </h3>

                <img
                    class="animalImg"
                    src="${category.categoryImg}"
                    alt="${category.category}"
                    loading="lazy"
                >
            `;

            div.style.backgroundColor =
                colorCategory(category.category);

            mainDisplay.appendChild(div);
        }
    }
}

// ==========================================================
// OBTENER TODAS LAS ESPECIES EN UNA SOLA LISTA
// ==========================================================

function getAllSpecies() {

    return animals.flatMap(
        category => category.especies || []
    );
}

// ==========================================================
// BUSCADOR
// ==========================================================

function filterAnimals() {

    const input =
        document.getElementById("filter");

    const filterCat =
        document.getElementById("filterCat");

    if (!input || !filterCat) {
        return;
    }

    const text =
        input.value.trim().toLowerCase();

    // ======================================================
    // SIN TEXTO
    // ======================================================

    if (text === "") {

        displayAnimals(animals);

        return;
    }

    let filteredAnimals = [];

    // ======================================================
    // MODO TODO
    // ======================================================

    if (exploreState === "all") {

        switch (filterCat.value) {

            // ----------------------------------------------
            // CATEGORÍA
            // ----------------------------------------------

            case "catego":

                filteredAnimals =
                    animals.filter(category =>
                        category.category
                            .toLowerCase()
                            .includes(text)
                    );

                break;

            // ----------------------------------------------
            // NOMBRE COMÚN
            // ----------------------------------------------

            case "name":

                filteredAnimals =
                    animals
                        .map(category => {

                            const filteredSpecies =
                                category.especies.filter(
                                    specie =>
                                        specie.name
                                            .toLowerCase()
                                            .includes(text)
                                );

                            return {
                                ...category,
                                especies: filteredSpecies
                            };

                        })
                        .filter(
                            category =>
                                category.especies.length > 0
                        );

                break;

            // ----------------------------------------------
            // NOMBRE CIENTÍFICO
            // ----------------------------------------------

            case "sciNa":

                filteredAnimals =
                    animals
                        .map(category => {

                            const filteredSpecies =
                                category.especies.filter(
                                    specie =>
                                        specie.scientificName
                                            .toLowerCase()
                                            .includes(text)
                                );

                            return {
                                ...category,
                                especies: filteredSpecies
                            };

                        })
                        .filter(
                            category =>
                                category.especies.length > 0
                        );

                break;
        }
    }

    // ======================================================
    // MODO CATEGORÍAS
    // ======================================================

    else if (exploreState === "categories") {

        filteredAnimals =
            animals.filter(category =>
                category.category
                    .toLowerCase()
                    .includes(text)
            );
    }

    displayAnimals(filteredAnimals);
}

// ==========================================================
// MOSTRAR INFORMACIÓN DE UNA ESPECIE
// ==========================================================

function showSpeciesInfo(specie) {

    const modal =
        document.getElementById("speciesModal");

    const modalBody =
        document.getElementById("modalBody");

    if (!modal || !modalBody) {
        return;
    }

    modalBody.innerHTML = `
        <img
            src="${specie.img}"
            alt="${specie.name}"
            style="
                width:100%;
                max-height:300px;
                object-fit:cover;
                border-radius:15px;
            "
        >

        <h2>
            ${specie.name}
        </h2>

        <p>
            <strong>
                Nombre científico:
            </strong>
            <em>
                ${specie.scientificName}
            </em>
        </p>

        <p>
            <strong>
                Estado de conservación:
            </strong>
            ${specie.endangered || "No disponible"}
        </p>

        <p>
            <strong>
                Función ecológica:
            </strong>
            ${specie.function || "No disponible"}
        </p>

        <button
            type="button"
            id="modalFavoriteBtn"
            class="see"
            style="margin-top:15px;"
        >
            ${
                favoriteAnimals.has(String(specie.id))
                    ? "♥ Guardado"
                    : "♡ Guardar"
            }
        </button>
    `;

    modal.classList.remove("hidden");

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

                favoriteButton.textContent =
                    favoriteAnimals.has(
                        String(specie.id)
                    )
                        ? "♥ Guardado"
                        : "♡ Guardar";
            }
        );
    }
}

// ==========================================================
// FAVORITOS
// ==========================================================

function toggleFavorite(id) {

    id = String(id);

    if (favoriteAnimals.has(id)) {

        favoriteAnimals.delete(id);

    } else {

        favoriteAnimals.add(id);
    }

    updateProfileStats();
}

// ==========================================================
// ACTUALIZAR ESTADÍSTICAS
// ==========================================================

function updateProfileStats() {

    const favorites =
        document.getElementById(
            "statFavorites"
        );

    if (favorites) {

        favorites.textContent =
            favoriteAnimals.size;
    }
}

// ==========================================================
// JUEGO
// ==========================================================

let gameScore = 0;
let currentGameSpecies = null;

// ==========================================================
// INICIAR PREGUNTA
// ==========================================================

function startGame() {

    const species =
        getAllSpecies();

    if (species.length < 4) {
        return;
    }

    const randomIndex =
        Math.floor(
            Math.random() * species.length
        );

    currentGameSpecies =
        species[randomIndex];

    const gameImage =
        document.getElementById(
            "gameImage"
        );

    const gameOptions =
        document.getElementById(
            "gameOptions"
        );

    if (!gameImage || !gameOptions) {
        return;
    }

    gameImage.src =
        currentGameSpecies.img;

    gameOptions.innerHTML = "";

    // Obtener opciones incorrectas
    const incorrectOptions =
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
            .slice(0, 3);

    const options = [
        currentGameSpecies,
        ...incorrectOptions
    ].sort(
        () =>
            Math.random() - 0.5
    );

    options.forEach(specie => {

        const button =
            document.createElement(
                "button"
            );

        button.type = "button";

        button.textContent =
            specie.name;

        button.className =
            "see";

        button.style.margin =
            "5px";

        button.addEventListener(
            "click",
            () => {

                if (
                    specie.id ===
                    currentGameSpecies.id
                ) {

                    gameScore++;

                    alert(
                        "¡Correcto! 🌿"
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

        gameOptions.appendChild(
            button
        );
    });
}

// ==========================================================
// DOM CONTENT LOADED
// ==========================================================

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        // ==================================================
        // PANTALLA INICIAL
        // ==================================================

        showSection("home");

        // ==================================================
        // CARGAR FAUNA ANTES DE USARLA
        // ==================================================

        await loadAnimals();

        // ==================================================
        // BOTÓN PERFIL
        // ==================================================

        const profileBtn =
            document.getElementById(
                "profile"
            );

        if (profileBtn) {

            profileBtn.addEventListener(
                "click",
                () => {

                    showSection(
                        "authSection"
                    );
                }
            );
        }

        // ==================================================
        // BOTÓN EXPLORAR
        // ==================================================

        const exploreBtn =
            document.getElementById(
                "explore"
            );

        if (exploreBtn) {

            exploreBtn.addEventListener(
                "click",
                () => {

                    exploreState =
                        "all";

                    const filterCat =
                        document.getElementById(
                            "filterCat"
                        );

                    if (filterCat) {
                        filterCat.classList.remove(
                            "hidden"
                        );
                    }

                    showSection(
                        "categories"
                    );

                    displayAnimals(
                        animals
                    );
                }
            );
        }

        // ==================================================
        // BOTÓN REPORTAR
        // ==================================================

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

        // ==================================================
        // BOTONES VOLVER
        // ==================================================

        const backButtons = [
            "authBack",
            "profileBack",
            "reportBack"
        ];

        backButtons.forEach(
            btnId => {

                const button =
                    document.getElementById(
                        btnId
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

        // ==================================================
        // VOLVER DESDE EXPLORAR
        // ==================================================

        const backBtn =
            document.getElementById(
                "back"
            );

        if (backBtn) {

            backBtn.addEventListener(
                "click",
                () => {

                    showSection(
                        "home"
                    );
                }
            );
        }

        // ==================================================
        // BOTÓN TODO
        // ==================================================

        const allBtn =
            document.getElementById(
                "all"
            );

        if (allBtn) {

            allBtn.addEventListener(
                "click",
                () => {

                    exploreState =
                        "all";

                    const filterCat =
                        document.getElementById(
                            "filterCat"
                        );

                    if (filterCat) {
                        filterCat.classList.remove(
                            "hidden"
                        );
                    }

                    const input =
                        document.getElementById(
                            "filter"
                        );

                    if (input) {
                        input.value = "";
                    }

                    displayAnimals(
                        animals
                    );
                }
            );
        }

        // ==================================================
        // BOTÓN CATEGORÍAS
        // ==================================================

        const categoriesBtn =
            document.getElementById(
                "categoriesBtn"
            );

        if (categoriesBtn) {

            categoriesBtn.addEventListener(
                "click",
                () => {

                    exploreState =
                        "categories";

                    const filterCat =
                        document.getElementById(
                            "filterCat"
                        );

                    if (filterCat) {
                        filterCat.classList.add(
                            "hidden"
                        );
                    }

                    const input =
                        document.getElementById(
                            "filter"
                        );

                    if (input) {
                        input.value = "";
                    }

                    displayAnimals(
                        animals
                    );
                }
            );
        }

        // ==================================================
        // BOTÓN JUGAR
        // ==================================================

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

                    gameScore = 0;

                    const score =
                        document.getElementById(
                            "currentScore"
                        );

                    if (score) {
                        score.textContent =
                            "0";
                    }

                    startGame();
                }
            );
        }

        // ==================================================
        // VOLVER DEL JUEGO
        // ==================================================

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
                        animals
                    );
                }
            );
        }

        // ==================================================
        // BUSCADOR
        // ==================================================

        const input =
            document.getElementById(
                "filter"
            );

        if (input) {

            input.addEventListener(
                "input",
                filterAnimals
            );
        }

        // ==================================================
        // CAMBIO DEL SELECTOR
        // ==================================================

        const filterCat =
            document.getElementById(
                "filterCat"
            );

        if (filterCat) {

            filterCat.addEventListener(
                "change",
                () => {

                    if (input) {
                        input.value = "";
                    }

                    displayAnimals(
                        animals
                    );
                }
            );
        }

        // ==================================================
        // CERRAR MODAL
        // ==================================================

        const closeModal =
            document.getElementById(
                "closeModal"
            );

        const speciesModal =
            document.getElementById(
                "speciesModal"
            );

        if (closeModal) {

            closeModal.addEventListener(
                "click",
                () => {

                    if (speciesModal) {
                        speciesModal.classList.add(
                            "hidden"
                        );
                    }
                }
            );
        }

        // ==================================================
        // CLICK EN TARJETAS
        // ==================================================

        const mainDisplay =
            document.getElementById(
                "exploreCategories"
            );

        if (mainDisplay) {

            mainDisplay.addEventListener(
                "click",
                event => {

                    const card =
                        event.target.closest(
                            ".animalCard"
                        );

                    if (!card) {
                        return;
                    }

                    // Si estamos viendo categorías,
                    // no abrir ficha de especie.
                    if (
                        exploreState ===
                        "categories"
                    ) {
                        return;
                    }

                    const id =
                        Number(
                            card.dataset.id
                        );

                    const specie =
                        getAllSpecies()
                            .find(
                                specie =>
                                    specie.id ===
                                    id
                            );

                    if (!specie) {
                        return;
                    }

                    // Si pulsó "categoría", no hacer nada
                    if (
                        event.target.classList.contains(
                            "animalCategory"
                        )
                    ) {
                        return;
                    }

                    showSpeciesInfo(
                        specie
                    );
                }
            );
        }

        // ==================================================
        // LOGIN / REGISTRO
        // ==================================================

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

        // ==================================================
        // LOGIN
        // ==================================================

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

                    if (!username) {
                        return;
                    }

                    localStorage.setItem(
                        "faunoBeloUser",
                        username
                    );

                    const userNameDisplay =
                        document.getElementById(
                            "userNameDisplay"
                        );

                    if (userNameDisplay) {
                        userNameDisplay.textContent =
                            username;
                    }

                    const profileBtnText =
                        document.getElementById(
                            "profileBtnText"
                        );

                    if (profileBtnText) {
                        profileBtnText.textContent =
                            username;
                    }

                    updateProfileStats();

                    showSection(
                        "userProfileSection"
                    );
                }
            );
        }

        // ==================================================
        // REGISTRO
        // ==================================================

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

                    if (!username) {
                        return;
                    }

                    localStorage.setItem(
                        "faunoBeloUser",
                        username
                    );

                    const userNameDisplay =
                        document.getElementById(
                            "userNameDisplay"
                        );

                    if (userNameDisplay) {
                        userNameDisplay.textContent =
                            username;
                    }

                    const profileBtnText =
                        document.getElementById(
                            "profileBtnText"
                        );

                    if (profileBtnText) {
                        profileBtnText.textContent =
                            username;
                    }

                    updateProfileStats();

                    showSection(
                        "userProfileSection"
                    );
                }
            );
        }

        // ==================================================
        // CERRAR SESIÓN
        // ==================================================

        const logoutBtn =
            document.getElementById(
                "logoutBtn"
            );

        if (logoutBtn) {

            logoutBtn.addEventListener(
                "click",
                () => {

                    localStorage.removeItem(
                        "faunoBeloUser"
                    );

                    const profileBtnText =
                        document.getElementById(
                            "profileBtnText"
                        );

                    if (profileBtnText) {
                        profileBtnText.textContent =
                            "Perfil";
                    }

                    showSection(
                        "home"
                    );
                }
            );
        }

        // ==================================================
        // REPORTAR AVISTAMIENTO
        // ==================================================

        const reportForm =
            document.getElementById(
                "reportForm"
            );

        if (reportForm) {

            reportForm.addEventListener(
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
                            ).value
                    });

                    localStorage.setItem(
                        "faunoBeloReports",
                        JSON.stringify(
                            reports
                        )
                    );

                    const statReports =
                        document.getElementById(
                            "statReports"
                        );

                    if (statReports) {
                        statReports.textContent =
                            reports.length;
                    }

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

        // ==================================================
        // RECUPERAR USUARIO
        // ==================================================

        const savedUser =
            localStorage.getItem(
                "faunoBeloUser"
            );

        if (savedUser) {

            const userNameDisplay =
                document.getElementById(
                    "userNameDisplay"
                );

            const profileBtnText =
                document.getElementById(
                    "profileBtnText"
                );

            if (userNameDisplay) {
                userNameDisplay.textContent =
                    savedUser;
            }

            if (profileBtnText) {
                profileBtnText.textContent =
                    savedUser;
            }
        }

        // ==================================================
        // ESTADÍSTICAS DE REPORTES
        // ==================================================

        const savedReports =
            JSON.parse(
                localStorage.getItem(
                    "faunoBeloReports"
                ) || "[]"
            );

        const statReports =
            document.getElementById(
                "statReports"
            );

        if (statReports) {
            statReports.textContent =
                savedReports.length;
        }

        updateProfileStats();

        console.log(
            "FAUNO BELO INICIADO CORRECTAMENTE"
        );
    }
);
