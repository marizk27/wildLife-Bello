// ==================================================
// FAUNO BELO
// APP.JS (FASE 2 - MODAL MÁS INFORMACIÓN)
// ==================================================

console.log("================================");
console.log("FAUNO BELO - APP.JS");
console.log("SISTEMA INICIADO");
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

const allButton = document.getElementById("all");
const categoriesButton = document.getElementById("categoriesBtn");
const playButton = document.getElementById("play");

// Elementos del Modal
const speciesModal = document.getElementById("speciesModal");
const modalBody = document.getElementById("modalBody");
const closeModalBtn = document.getElementById("closeModal");


// ==================================================
// VARIABLES
// ==================================================

let animals = [];
let exploreState = "all";
let cardArray = [];
let favoriteAnimals = new Set();


// ==================================================
// BOTÓN EXPLORAR
// ==================================================

if (exploreCat) {
    exploreCat.addEventListener("click", () => {
        console.log("Botón Explorar presionado");
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

const backButton = document.getElementById("back");

if (backButton) {
    backButton.addEventListener("click", () => {
        console.log("Botón Volver presionado");
        exploreP.classList.add("hidden");
        home.classList.remove("hidden");
        exploreState = "all";

        if (inp) {
            inp.value = "";
        }
    });
}


// ==================================================
// COLORES DE CATEGORÍAS
// ==================================================

function colorCategory(category) {
    switch (category) {
        case "Anfibios":
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

    // SIN RESULTADOS
    if (!prods || prods.length === 0) {
        mainDisplay.innerHTML = `
            <div class="no-results">
                <p>No se encontraron resultados.</p>
            </div>
        `;
        mainDisplay.style.display = "flex";
        mainDisplay.style.flexDirection = "column";
        return;
    }

    // MOSTRAR TODO
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
    }

    // MOSTRAR CATEGORÍAS
    else if (exploreState === "categories") {
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


// ==================================================
// CARGAR DATOS
// ==================================================

async function load() {
    try {
        console.log("Cargando initialcategories.json...");
        const response = await fetch("./initialcategories.json");

        if (!response.ok) {
            throw new Error("No se pudo cargar initialcategories.json");
        }

        animals = await response.json();
        console.log("Datos cargados correctamente:", animals.length, "categorías");
        displayAnimals(animals);
    } catch (error) {
        console.error("Error cargando los datos:", error);
        if (mainDisplay) {
            mainDisplay.innerHTML = `
                <div class="no-results">
                    <h3>No se pudo cargar la fauna.</h3>
                    <p>Verifica que initialcategories.json esté en la misma carpeta.</p>
                </div>
            `;
        }
    }
}


// ==================================================
// BUSCADOR
// ==================================================

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
                filteredAn = animals.filter(function (category) {
                    return category.category.toLowerCase().includes(text);
                });
                break;

            case "name":
                filteredAn = animals.map(function (category) {
                    const filteredSpecies = (category.especies || []).filter(function (specie) {
                        return specie.name.toLowerCase().includes(text);
                    });
                    return {
                        ...category,
                        especies: filteredSpecies
                    };
                }).filter(function (category) {
                    return category.especies.length > 0;
                });
                break;

            case "sciNa":
                filteredAn = animals.map(function (category) {
                    const filteredSpecies = (category.especies || []).filter(function (specie) {
                        return specie.scientificName.toLowerCase().includes(text);
                    });
                    return {
                        ...category,
                        especies: filteredSpecies
                    };
                }).filter(function (category) {
                    return category.especies.length > 0;
                });
                break;
        }

        displayAnimals(filteredAn);
        return;
    }

    if (exploreState === "categories") {
        const filteredCategories = animals.filter(function (category) {
            return category.category.toLowerCase().includes(text);
        });
        displayAnimals(filteredCategories);
    }
}


// ==================================================
// EVENTOS DE CONTROL
// ==================================================

if (inp) {
    inp.addEventListener("input", filterAnimals);
}

if (filterCat) {
    filterCat.addEventListener("change", function () {
        inp.value = "";
        displayAnimals(animals);
    });
}

if (allButton) {
    allButton.addEventListener("click", function () {
        console.log("Botón TODO presionado");
        exploreState = "all";
        filterCat.classList.remove("hidden");
        inp.value = "";
        displayAnimals(animals);
    });
}

if (categoriesButton) {
    categoriesButton.addEventListener("click", function () {
        console.log("Botón CATEGORÍAS presionado");
        exploreState = "categories";
        filterCat.classList.add("hidden");
        inp.value = "";
        displayAnimals(animals);
    });
}

if (playButton) {
    playButton.addEventListener("click", function () {
        console.log("Botón JUEGA presionado");
        alert("El juego estará disponible próximamente.");
    });
}


// ==================================================
// CERRAR INFORMACIÓN ABIERTA (TARJETA)
// ==================================================

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


// ==================================================
// CLICK EN TARJETA
// ==================================================

if (mainDisplay) {
    mainDisplay.addEventListener("click", function (e) {
        if (e.target.closest(".favoriteBtn") || e.target.closest(".moreInfoBtn")) {
            return;
        }

        const card = e.target.closest(".animalCard");

        if (!card || !card.dataset.id) {
            return;
        }

        removeExpandedInfo();

        const specie = animals
            .flatMap(function (category) {
                return category.especies || [];
            })
            .find(function (specie) {
                return String(specie.id) === String(card.dataset.id);
            });

        if (!specie) {
            console.error("No se encontró la especie.");
            return;
        }

        const animalInfo = card.querySelector(".animalInfo");
        if (!animalInfo) {
            return;
        }

        const expandedInfo = document.createElement("div");
        expandedInfo.classList.add("expandedInfo");

        card.dataset.status = specie.endangered;
        const isFavorite = favoriteAnimals.has(String(specie.id));

        expandedInfo.innerHTML = `
            <p class="conservation">${specie.endangered}</p>
            <p>
                <strong>Función ecológica:</strong>
                <br>
                ${specie.function}
            </p>
            <div class="expandedActions">
                <button type="button" class="favoriteBtn">
                    ${isFavorite ? "♥ Guardado" : "♡ Guardar"}
                </button>
                <button type="button" class="moreInfoBtn">
                    Más información
                </button>
            </div>
        `;

        animalInfo.appendChild(expandedInfo);
        card.classList.add("expanded");
        cardArray.push(card);

        // FAVORITO
        const favoriteBtn = expandedInfo.querySelector(".favoriteBtn");
        if (favoriteBtn) {
            favoriteBtn.addEventListener("click", function (event) {
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

        // MÁS INFORMACIÓN -> APERTURA DEL MODAL
        const moreInfoBtn = expandedInfo.querySelector(".moreInfoBtn");
        if (moreInfoBtn) {
            moreInfoBtn.addEventListener("click", function (event) {
                event.stopPropagation();
                console.log("Abriendo más información para:", specie.name);

                if (modalBody && speciesModal) {
                    modalBody.innerHTML = `
                        <div class="modalDetails">
                            <img src="${specie.img}" alt="${specie.name}">
                            <h2>${specie.name}</h2>
                            <p><em>${specie.scientificName}</em></p>
                            <hr style="margin: 15px 0; border: 0; border-top: 1px solid #ddd;">
                            <p><strong>Estado de conservación:</strong> ${specie.endangered}</p>
                            <p><strong>Función ecológica:</strong> ${specie.function}</p>
                        </div>
                    `;
                    speciesModal.classList.remove("hidden");
                }
            });
        }
    });
}


// ==================================================
// CONTROLADORES DE CIERRE DEL MODAL
// ==================================================

if (closeModalBtn) {
    closeModalBtn.addEventListener("click", function () {
        if (speciesModal) {
            speciesModal.classList.add("hidden");
        }
    });
}

if (speciesModal) {
    speciesModal.addEventListener("click", function (e) {
        if (e.target === speciesModal) {
            speciesModal.classList.add("hidden");
        }
    });
}


// ==================================================
// INICIAR SISTEMA
// ==================================================

load();
