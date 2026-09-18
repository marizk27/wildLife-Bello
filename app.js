// ==========================================================
// 1. FUNCIONES Y ESTRUCTURA ORIGINAL DE TU APLICACIÓN
// ==========================================================
// (Aquí deben ir tus funciones originales de carga, búsqueda, 
// manejo de secciones como showSection, y getAllSpecies).

// Ejemplo de referencia de tus funciones originales:
// function showSection(sectionId) { ... }
// function getAllSpecies() { ... }


// ==========================================================
// 2. LÓGICA AISLADA DE LA TRIVIA (FAUNO BELO)
// ==========================================================

let gameScore = 0;
let currentCorrectAnswer = null;

function startTriviaGame() {
    if (typeof getAllSpecies !== "function") return;
    const allSpecies = getAllSpecies();
    
    if (!allSpecies || allSpecies.length === 0) return;

    updateGameScoreDisplay();

    const randomIndex = Math.floor(Math.random() * allSpecies.length);
    currentCorrectAnswer = allSpecies[randomIndex];

    const gameImage = document.getElementById("gameImage");
    if (gameImage) {
        gameImage.src = currentCorrectAnswer.img || currentCorrectAnswer.image || currentCorrectAnswer.imagen || "";
    }

    let options = [currentCorrectAnswer];
    while (options.length < 4 && options.length < allSpecies.length) {
        const randomOpt = allSpecies[Math.floor(Math.random() * allSpecies.length)];
        if (!options.includes(randomOpt)) {
            options.push(randomOpt);
        }
    }

    options.sort(() => Math.random() - 0.5);

    const optionsContainer = document.getElementById("gameOptions");
    if (optionsContainer) {
        optionsContainer.innerHTML = "";
        options.forEach(option => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "see";
            btn.style.margin = "8px";
            btn.textContent = option.name || option.nombre;
            btn.addEventListener("click", () => checkTriviaAnswer(option));
            optionsContainer.appendChild(btn);
        });
    }
}

function checkTriviaAnswer(selectedOption) {
    const correctName = currentCorrectAnswer.name || currentCorrectAnswer.nombre;
    const selectedName = selectedOption.name || selectedOption.nombre;

    if (selectedName === correctName) {
        gameScore += 10;
        alert("¡Correcto! 🎉");
    } else {
        alert(`Incorrecto. Era: ${correctName}`);
    }

    updateGameScoreDisplay();
    startTriviaGame();
}

function updateGameScoreDisplay() {
    const scoreElement = document.getElementById("currentScore");
    if (scoreElement) {
        scoreElement.textContent = gameScore;
    }
}

// ==========================================================
// 3. CONEXIÓN DEL BOTÓN DE JUEGO (SIN AFECTAR LOS DEMÁS)
// ==========================================================

const playBtn = document.getElementById("play");
if (playBtn) {
    playBtn.addEventListener("click", () => {
        if (typeof showSection === "function") {
            showSection("gameSection");
        }
        startTriviaGame();
    });
}
