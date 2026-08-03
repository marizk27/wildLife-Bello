const exploreCat = document.getElementById("explore");
let home = document.getElementById("home");
let exploreP = document.getElementById("categories");
const mainDisplay = document.getElementById("exploreCategories");
let animals = [];
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
                <h1>🔎</h1>
                <h2>No encontramos especies</h2>
                <p>No hay resultados para "<strong>${searchText}</strong>"</p>
                <p>Filtro utilizado: ${filterText}</p>
                </div>
    `;
    return;
    };
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
}

async function load() {
    const response = await fetch("./categories.json");
    animals = await response.json();
    mainDisplay.innerHTML = "";
    displayAnimals(animals);
}

load();
// const homeActions = document.getElementById("actionsPan");
// homeActions.addEventListener("click", (e) => {
//     const action = e.target.closest(".actionCard");
// })
const filterCat = document.getElementById("filterCat");
const inp = document.getElementById("filter");
function filterAnimals() {
    let filteredAn = [];
    const text = inp.value.trim().toLowerCase();
    if (text === "") {
        displayAnimals(animals);
        return;
    };
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
    displayAnimals(filteredAn);
}
inp.addEventListener("input", filterAnimals);
filterCat.addEventListener("change", (event) => {
    inp.value = "";
})