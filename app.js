const exploreCat = document.getElementById("explore");
let home = document.getElementById("home");
let exploreP = document.getElementById("categories");
const mainDisplay = document.getElementById("exploreCategories");
let factPanel = null;
let factTimeout = null;
let animals = [];
let exploreState = "all";
exploreCat.addEventListener("click", () => {
    home.classList.add("hidden");
    exploreP.classList.remove("hidden");
})

function colorCategory(category) {
    switch (category) {
        case "Anfíbios":
            return "#5fc463";
            break;
        case "Aves":
            return "#4a72e0";
            break;
        case "Mamíferos":
            return "#b47f2e";
            break;
        case "Reptiles":
            return "#e76958";
            break;
        case "Insectos":
            return "#85427c";
    }
}
function displayAnimals(prods) {
    mainDisplay.innerHTML = "";
    let i = 0;
    if (prods.length === 0) {
        const searchText = inp.value.trim();
        const filterText = filterCat.options[filterCat.selectedIndex].text;
        mainDisplay.innerHTML = `
            <div class="no-results">
                <img class="no-results-img" src="no-results.png" alt="No results found">
            </div>
        `;
        mainDisplay.style.display = "flex";
        mainDisplay.style.flexDirection = "column";
        return;
    };
    mainDisplay.style.display = "grid";
    switch (exploreState) {
        case "all":
            for (let prod of prods) {
                for (let specie of prod.especies) {
                    let div = document.createElement("div");
                    div.dataset.id = specie.id;
                    div.classList.add("animalCard")
                    div.innerHTML = `
                    <img class = "animalImg" src="${specie.img}" alt="">
                    <div class = "animalInfo">
                        <h4>${specie.name}</h4>
                        <p class="animalScientificName">${specie.scientificName}</p>
                        <button class="animalCategory"> ${prod.category}</button>
                    </div>
                `;
                const categoryButtonColor = colorCategory(prod.category);
                const categoryButton = div.querySelector(".animalCategory");
                categoryButton.style.backgroundColor = categoryButtonColor;
                mainDisplay.appendChild(div);
                }
            }
        break;
        case "categories":
            for (let category of prods) {
                console.log(prods)
                console.log(category.categoryImg)
                let div = document.createElement("div");
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
    const response = await fetch("./initialcategories.json");
    animals = await response.json();
    mainDisplay.innerHTML = "";
    displayAnimals(animals);
}

load();
const filterCat = document.getElementById("filterCat");
const inp = document.getElementById("filter");
function filterAnimals() {
    let filteredAn = [];
    const text = inp.value.trim().toLowerCase();
    if (text === "") {
        displayAnimals(animals);
        return;
    };
    switch (exploreState) {
        case "all":
            switch (filterCat.value) {
                case "catego": 
                    filteredAn = animals.filter(value => value.category.toLowerCase().includes(text));
                    break;
                case "name":
                    filteredAn = animals
                        .map(category => {
                            const filteredSpecies = category.especies.filter(specie => specie.name.toLowerCase().includes(text));
                            return {
                                ...category,
                                especies: filteredSpecies
                            };
                        })
                        .filter(category => category.especies.length > 0);
                break;
                case "sciNa":
                    filteredAn = animals
                    .map(category => {
                        const filteredSpecies = category.especies.filter(specie =>
                            specie.scientificName.toLowerCase().includes(text)
                        );
                        return {
                            ...category,
                            especies: filteredSpecies
                        };
                    })
                    .filter(category => category.especies.length > 0);
                break;
            }
        break;
        case "categories":
            filteredAn = animals.filter(value => value.category.includes(text));
    }
    displayAnimals(filteredAn);
}
inp.addEventListener("input", filterAnimals);
filterCat.addEventListener("change", (event) => {
    inp.value = "";
})

const exploreButtons = document.querySelector(".exploreButtons");
exploreButtons.addEventListener("click", (event) => {
    let buttonId = event.target.id;
    switch (buttonId) {
        case "all":
            exploreState = "all";
            filterCat.classList.remove("hidden");
            break;
        case "categories":
            exploreState = "categories";
            filterCat.classList.add("hidden");
            break;
    }
    displayAnimals(animals);
});
let cardarr = [];
mainDisplay.addEventListener("click", (e) => {
    const card = e.target.closest(".animalCard");
    if (cardarr.length > 0) {
        let toSmall = cardarr.shift();
        toSmall.classList.remove("expanded");
        const oldInfo = toSmall.querySelector(".expandedInfo");

        if (oldInfo) {
            oldInfo.remove();
        }
    }

    if (!card) {
        return;
    }
    const specie = animals
        .flatMap(category => category.especies)
        .find(specie => specie.id === Number(card.dataset.id));
    
    const category = animals.find(category =>
        category.especies.some(animal => animal.id === specie.id)
    );

    const randomFact = category.funFacts[
        Math.floor(Math.random() * category.funFacts.length)
    ];
    const animalInfo = card.querySelector(".animalInfo");
    const expandedInfo = document.createElement("div");
    expandedInfo.classList.add("expandedInfo");

    expandedInfo.innerHTML = `
        <p class="conservation">
            🟢 ${specie.endangered}
        </p>

        <p>
            <strong>Función ecológica:</strong><br>
            ${specie.function}
        </p>

        <div class="expandedActions">
            <button class="favoriteBtn">♡ Guardar</button>
            <button class="moreInfoBtn">Más información</button>
        </div>
    `;

    animalInfo.appendChild(expandedInfo);
    card.classList.add("expanded");
    cardarr.push(card);
})

