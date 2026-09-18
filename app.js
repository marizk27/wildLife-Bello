// ==========================================================
// CONFIGURACIÓN GENERAL Y ESTADO DE LA APLICACIÓN
// ==========================================================

// Asegúrate de conservar tus funciones globales originales aquí (como loadAnimals, getAllSpecies, showSection, etc.)


// ==========================================================
// LÓGICA DE LA TRIVIA (FAUNO BELO)
// ==========================================================

let gameScore = 0;
let currentCorrectAnswer = null;

function startTriviaGame() {
    // Verificamos de forma segura si la función getAllSpecies existe en tu proyecto
    if (typeof getAllSpecies !== "function") {
        console.warn("La función getAllSpecies no está disponible.");
        return;
    }

    const allSpecies = getAllSpecies();
    
    if (!allSpecies || allSpecies.length === 0) {
        console.warn("No hay especies disponibles para el juego.");
        return;
    }

    updateGameScoreDisplay();

    // 1. Elegir una especie correcta al azar
    const randomIndex = Math.floor(Math.random() * allSpecies.length);
    currentCorrectAnswer = allSpecies[randomIndex];

    // 2. Mostrar la imagen correspondiente
    const gameImage = document.getElementById("gameImage");
    if (gameImage) {
        const imageSrc = currentCorrectAnswer.img || currentCorrectAnswer.image || currentCorrectAnswer.imagen || "";
        gameImage.src = imageSrc;
    }

    // 3. Generar las opciones (1 correcta + hasta 3 incorrectas aleatorias)
    let options = [currentCorrectAnswer];
    
    while (options.length < 4 && options.length < allSpecies.length) {
        const randomOpt = allSpecies[Math.floor(Math.random() * allSpecies.length)];
        if (!options.includes(randomOpt)) {
            options.push(randomOpt);
        }
    }

    // Mezclar las opciones de manera aleatoria
    options.sort(() => Math.random() - 0.5);

    // 4. Pintar los botones en el contenedor del DOM
    const optionsContainer = document.getElementById("gameOptions");
    if (optionsContainer) {
        optionsContainer.innerHTML = "";

        options.forEach(option => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "see"; // Mantiene tu clase de estilo original
            btn.style.margin = "8px";
            btn.textContent = option.name || option.nombre;

            // Escuchar el evento de selección
            btn.addEventListener("click", () => {
                checkTriviaAnswer(option);
            });

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
    startTriviaGame(); // Avanza a la siguiente pregunta
}

function updateGameScoreDisplay() {
    const scoreElement = document.getElementById("currentScore");
    if (scoreElement) {
        scoreElement.textContent = gameScore;
    }
}


// ==========================================================
// INICIALIZACIÓN DE EVENTOS DEL DOM
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
    // Si tienes una función general de carga, ejecútala aquí tal como la tenías:
    // loadAnimals(); 

    // Conexión segura del botón de juego para no pisar otros listeners previos
    const playBtn = document.getElementById("play");
    if (playBtn) {
        playBtn.addEventListener("click", () => {
            if (typeof showSection === "function") {
                showSection("gameSection");
            }
            startTriviaGame();
        });
    }
});
