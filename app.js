// ==========================================================
// LÓGICA DEL JUEGO (TRIVIA)
// ==========================================================

let gameScore = 0;
let currentCorrectAnswer = null;

function startTriviaGame() {
    const allSpecies = getAllSpecies();
    
    if (!allSpecies || allSpecies.length === 0) {
        alert("No hay especies cargadas para jugar.");
        return;
    }

    updateGameScoreDisplay();

    // 1. Elegir una especie correcta al azar
    const randomIndex = Math.floor(Math.random() * allSpecies.length);
    currentCorrectAnswer = allSpecies[randomIndex];

    // 2. Mostrar su imagen en el contenedor correspondiente
    const gameImage = document.getElementById("gameImage");
    const imageSrc = currentCorrectAnswer.img || currentCorrectAnswer.image || currentCorrectAnswer.imagen || "";
    
    if (gameImage) {
        gameImage.src = imageSrc;
    }

    // 3. Generar opciones (la respuesta correcta + 3 opciones incorrectas aleatorias)
    let options = [currentCorrectAnswer];
    
    while (options.length < 4 && options.length < allSpecies.length) {
        const randomOpt = allSpecies[Math.floor(Math.random() * allSpecies.length)];
        if (!options.includes(randomOpt)) {
            options.push(randomOpt);
        }
    }

    // Mezclar las opciones de forma aleatoria
    options.sort(() => Math.random() - 0.5);

    // 4. Pintar los botones de opciones en el DOM
    const optionsContainer = document.getElementById("gameOptions");
    if (optionsContainer) {
        optionsContainer.innerHTML = "";

        options.forEach(option => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "see";
            btn.style.margin = "8px";
            btn.textContent = option.name || option.nombre;

            // Al hacer clic, comprobamos la respuesta
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
    
    // Cargar automáticamente la siguiente pregunta
    startTriviaGame();
}

function updateGameScoreDisplay() {
    const scoreElement = document.getElementById("currentScore");
    if (scoreElement) {
        scoreElement.textContent = gameScore;
    }
}

// ================================================
// CONexión CON EL BOTÓN DE JUEGO (Menú)
// ================================================

const playBtn = document.getElementById("play");

if (playBtn) {
    playBtn.addEventListener(
        "click",
        () => {
            showSection("gameSection");
            startTriviaGame(); // Inicia la trivia automáticamente al entrar a la sección
        }
    );
}
