// ==================================================
// FAUNO BELO - APP.JS COMPLETO
// ==================================================

console.log("================================");
console.log("FAUNO BELO - SISTEMA INTEGRADO");
console.log("================================");

const home = document.getElementById("home");
const exploreP = document.getElementById("categories");
const authSection = document.getElementById("authSection");
const userProfileSection = document.getElementById("userProfileSection");

const exploreCat = document.getElementById("explore");
const profileBtn = document.getElementById("profile");
const profileBtnText = document.getElementById("profileBtnText");

const backButton = document.getElementById("back");
const authBack = document.getElementById("authBack");
const profileBack = document.getElementById("profileBack");

const loginBox = document.getElementById("loginBox");
const registerBox = document.getElementById("registerBox");
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const logoutBtn = document.getElementById("logoutBtn");
const userNameDisplay = document.getElementById("userNameDisplay");
const statFavorites = document.getElementById("statFavorites");

const mainDisplay = document.getElementById("exploreCategories");
const filterCat = document.getElementById("filterCat");
const inp = document.getElementById("filter");

const allButton = document.getElementById("all");
const categoriesButton = document.getElementById("categoriesBtn");
const playButton = document.getElementById("play");

const speciesModal = document.getElementById("speciesModal");
const modalBody = document.getElementById("modalBody");
const closeModalBtn = document.getElementById("closeModal");

let animals = [];
let exploreState = "all";
let cardArray = [];
let favoriteAnimals = new Set();

// Manejo de Sesión Activa
let currentUser = localStorage.getItem("faunoBelo_activeUser") || null;

function updateProfileButton() {
    if (profileBtnText) {
        profileBtnText.textContent = currentUser ? currentUser : "Perfil";
    }
}
updateProfileButton();

// Evento de clic en botón de Perfil (Abre login o panel de usuario)
if (profileBtn) {
    profileBtn.addEventListener("click", () => {
        home.classList.add("hidden");
        if (currentUser) {
            if (userNameDisplay) userNameDisplay.textContent = currentUser;
            if (statFavorites) statFavorites.textContent = favoriteAnimals.size;
            if (userProfileSection) userProfileSection.classList.remove("hidden");
        } else {
            if (authSection) authSection.classList.remove("hidden");
        }
    });
}

// Botones Volver
if (authBack) {
    authBack.addEventListener("click", () => {
        authSection.classList.add("hidden");
        home.classList.remove("hidden");
    });
}

if (profileBack) {
    profileBack.addEventListener("click", () => {
        userProfileSection.classList.add("hidden");
        home.classList.remove("hidden");
    });
}

// Alternar entre login y registro
if (showRegister) {
    showRegister.addEventListener("click", (e) => {
        e.preventDefault();
        loginBox.classList.add("hidden");
        registerBox.classList.remove("hidden");
    });
}

if (showLogin) {
    showLogin.addEventListener("click", (e) => {
        e.preventDefault();
        registerBox.classList.add("hidden");
        loginBox.classList.remove("hidden");
    });
}

// REGISTRO DE USUARIO
if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const user = document.getElementById("regUser").value.trim();
        const pass = document.getElementById("regPass").value.trim();

        let usersDB = JSON.parse(localStorage.getItem("faunoBelo_usersDB")) || {};

        if (usersDB[user]) {
            alert("Este nombre de usuario ya existe. Elige otro o inicia sesión.");
            return;
        }

        usersDB[user] = pass;
        localStorage.setItem("faunoBelo_usersDB", JSON.stringify(usersDB));
        
        alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
        document.getElementById("regUser").value = "";
        document.getElementById("regPass").value = "";
        registerBox.classList.add("hidden");
        loginBox.classList.remove("hidden");
    });
}

// INICIO DE SESIÓN
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const user = document.getElementById("loginUser").value.trim();
        const pass = document.getElementById("loginPass").value.trim();

        let usersDB = JSON.parse(localStorage.getItem("faunoBelo_usersDB")) || {};

        if (usersDB[user] && usersDB[user] === pass) {
            currentUser = user;
            localStorage.setItem("faunoBelo_activeUser", currentUser);
            updateProfileButton();
            
            alert(`¡Bienvenido de nuevo, ${currentUser}!`);
            document.getElementById("loginUser").value = "";
            document.getElementById("loginPass").value = "";
            
            authSection.classList.add("hidden");
            home.classList.remove("hidden");
        } else {
            alert("Usuario o contraseña incorrectos.");
        }
    });
}

// CERRAR SESIÓN
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        currentUser = null;
        localStorage.removeItem("faunoBelo_activeUser");
        updateProfileButton();
        userProfileSection.classList.add("hidden");
        home.classList.remove("hidden");
        alert("Has cerrado sesión correctamente.");
    });
}

// Transición a Explorar
if (exploreCat) {
    exploreCat.addEventListener("click", () => {
        home.classList.add("hidden");
        exploreP.classList.remove("hidden");
        exploreState = "all";
        if (filterCat) filterCat.classList.remove("hidden");
        if (inp) inp.value = "";
        displayAnimals(animals);
    });
}

if (backButton) {
    backButton.addEventListener("click", () => {
        exploreP.classList.add("hidden");
        home.classList.remove("hidden");
        exploreState = "all";
        if (inp) inp.value = "";
    });
}

function colorCategory(category) {
    switch (category) {
        case "Anfibios": return "#5fc463";
        case "Aves": return "#4a72e0";
        case "Mamíferos": return "#b47f2e";
        case "Reptiles": return "#e76958";
        case "Insectos": return "#85427c";
        default: return "#77a88d";
    }
}

function displayAnimals(prods) {
    if (!mainDisplay) return;

    mainDisplay.innerHTML = "";
    mainDisplay.style.display = "grid";

    if (!prods || prods.length === 0) {
        mainDisplay.innerHTML = `<div class="no-results"><p>No se encontraron resultados.</p></div>`;
        return;
    }

    if (exploreState === "all") {
        for (const category of prods) {
            if (!category.especies) continue;

            for (const specie of category.especies) {
                const div = document.createElement("div");
                div.dataset.id = specie.id;
                div.classList.add("animalCard");

                div.innerHTML = `
                    <img class="animalImg" src="${specie.img}" alt="${specie.name}">
                    <div class="animalInfo">
                        <h4>${specie.name}</h4>
                        <p class="animalScientificName">${specie.scientificName}</p>
                        <button type="button" class="animalCategory">
                            ${category.category}
                        </button>
                    </div>
                `;

                const categoryButton = div.querySelector(".animalCategory");
                if (categoryButton) {
                    categoryButton.style.backgroundColor = colorCategory(category.category);
                }

                mainDisplay.appendChild(div);
            }
        }
    } else if (exploreState === "categories") {
        for (const category of prods) {
            const div = document.createElement("div");
            div.classList.add("animalCard");

            div.innerHTML = `
                <h3>${category.category}</h3>
                <img class="animalImg" src="${category.categoryImg}" alt="${category.category}">
            `;
            div.style.backgroundColor = colorCategory(category.category);
            mainDisplay.appendChild(div);
        }
    }
}

async function load() {
    try {
        const response = await fetch("./initialcategories.json");
        if (!response.ok) throw new Error("No se pudo cargar initialcategories.json");
        animals = await response.json();
        displayAnimals(animals);
    } catch (error) {
        console.error("Error cargando los datos:", error);
    }
}

function filterAnimals() {
    const text = inp.value.trim().toLowerCase();
    if (text === "") {
        displayAnimals(animals);
        return;
    }

    if (exploreState === "all") {
        let filteredAn = [];
        switch (filterCat.value) {
            case "catego":
                filteredAn = animals.filter(category => category.category.toLowerCase().includes(text));
                break;
            case "name":
                filteredAn = animals.map(category => ({
                    ...category,
                    especies: (category.especies || []).filter(specie => specie.name.toLowerCase().includes(text))
                })).filter(category => category.especies.length > 0);
                break;
            case "sciNa":
                filteredAn = animals.map(category => ({
                    ...category,
                    especies: (category.especies || []).filter(specie => specie.scientificName.toLowerCase().includes(text))
                })).filter(category => category.especies.length > 0);
                break;
        }
        displayAnimals(filteredAn);
    }
}

if (inp) inp.addEventListener("input", filterAnimals);
if (filterCat) filterCat.addEventListener("change", () => { inp.value = ""; displayAnimals(animals); });

if (allButton) {
    allButton.addEventListener("click", () => {
        exploreState = "all";
        filterCat.classList.remove("hidden");
        inp.value = "";
        displayAnimals(animals);
    });
}

if (categoriesButton) {
    categoriesButton.addEventListener("click", () => {
        exploreState = "categories";
        filterCat.classList.add("hidden");
        inp.value = "";
        displayAnimals(animals);
    });
}

if (playButton) {
    playButton.addEventListener("click", () => {
        alert("El juego estará disponible próximamente.");
    });
}

function removeExpandedInfo() {
    if (cardArray.length === 0) return;
    const card = cardArray.shift();
    if (!card) return;
    card.classList.remove("expanded");
    const oldInfo = card.querySelector(".expandedInfo");
    if (oldInfo) oldInfo.remove();
}

if (mainDisplay) {
    mainDisplay.addEventListener("click", function (e) {
        if (e.target.closest(".favoriteBtn") || e.target.closest(".moreInfoBtn")) return;

        const card = e.target.closest(".animalCard");
        if (!card || !card.dataset.id) return;

        removeExpandedInfo();

        const specie = animals.flatMap(c => c.especies || []).find(s => String(s.id) === String(card.dataset.id));
        if (!specie) return;

        const animalInfo = card.querySelector(".animalInfo");
        if (!animalInfo) return;

        const expandedInfo = document.createElement("div");
        expandedInfo.classList.add("expandedInfo");

        const isFavorite = favoriteAnimals.has(String(specie.id));

        expandedInfo.innerHTML = `
            <p class="conservation">${specie.endangered}</p>
            <p><strong>Función ecológica:</strong><br>${specie.function}</p>
            <div class="expandedActions">
                <button type="button" class="favoriteBtn">${isFavorite ? "♥ Guardado" : "♡ Guardar"}</button>
                <button type="button" class="moreInfoBtn">Más información</button>
            </div>
        `;

        animalInfo.appendChild(expandedInfo);
        card.classList.add("expanded");
        cardArray.push(card);

        const favoriteBtn = expandedInfo.querySelector(".favoriteBtn");
        if (favoriteBtn) {
            favoriteBtn.addEventListener("click", (event) => {
                event.stopPropagation();
                if (!currentUser) {
                    alert("Debes iniciar sesión para guardar especies en favoritos.");
                    return;
                }
                const animalId = String(specie.id);
                if (favoriteAnimals.has(animalId)) {
                    favoriteAnimals.delete(animalId);
                    favoriteBtn.textContent = "♡ Guardar";
                } else {
                    favoriteAnimals.add(animalId);
                    favoriteBtn.textContent = "♥ Guardado";
                }
            });
        }

        const moreInfoBtn = expandedInfo.querySelector(".moreInfoBtn");
        if (moreInfoBtn) {
            moreInfoBtn.addEventListener("click", (event) => {
                event.stopPropagation();
                if (modalBody && speciesModal) {
                    modalBody.innerHTML = `
                        <div class="modalDetails">
                            <img src="${specie.img}" alt="${specie.name}">
                            <h2>${specie.name}</h2>
                            <p><em>${specie.scientificName}</em></p>
                            <hr style="margin: 15px 0; border: 0; border-top: 1px solid #ddd;">
                            <p><strong>Estado de conservación:</strong> ${specie.endangered}</p>
                            <p><strong>Función ecológica:</strong> ${specie.function}</p>
                            <p><strong>Descripción:</strong> ${specie.description || specie.function || "Información ecológica detallada de la especie."}</p>
                        </div>
                    `;
                    speciesModal.classList.remove("hidden");
                }
            });
        }
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
        if (speciesModal) speciesModal.classList.add("hidden");
    });
}

if (speciesModal) {
    speciesModal.addEventListener("click", (e) => {
        if (e.target === speciesModal) speciesModal.classList.add("hidden");
    });
}

load();
