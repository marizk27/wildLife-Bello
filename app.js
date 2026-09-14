// ==================================================
// FAUNO BELO
// APP.JS (FASE 2 - MODAL CON DESCRIPCIÓN Y DETALLES)
// ==================================================

console.log("================================");
console.log("FAUNO BELO - APP.JS");
console.log("SISTEMA INICIADO");
console.log("================================");

const exploreCat = document.getElementById("explore");
const home = document.getElementById("home");
const exploreP = document.getElementById("categories");

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

const backButton = document.getElementById("back");
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
                    // Muestra la descripción completa, estado de conservación, función ecológica y datos adicionales del JSON
                    modalBody.innerHTML = `
                        <div class="modalDetails">
                            <img src="${specie.img}" alt="${specie.name}">
                            <h2>${specie.name}</h2>
                            <p><em>${specie.scientificName}</em></p>
                            <hr style="margin: 15px 0; border: 0; border-top: 1px solid #ddd;">
                            <p><strong>Estado de conservación:</strong> ${specie.endangered}</p>
                            <p><strong>Función ecológica:</strong> ${specie.function}</p>
                            ${specie.description ? `<p><strong>Descripción:</strong> ${specie.description}</p>` : ""}
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
