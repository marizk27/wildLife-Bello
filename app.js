// ==========================================================
// FAUNO BELO - LÓGICA DE NAVEGACIÓN Y VISTAS
// ==========================================================
var animals = [];
async function load() {
    const response = await fetch("./initialcategories.json");
    animals = await response.json();
}
load();

function showSection(sectionId) {
    // Lista con los IDs de todas las secciones principales
    const sections = ['home', 'categories', 'authSection', 'userProfileSection', 'reportSection', 'gameSection'];
    
    // Ocultar todas las secciones
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.classList.add('hidden');
        }
    });

    // Mostrar únicamente la sección seleccionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }
}


function displayAnimals(animals) {
    for (let category of animals) {
                for (let specie of category.especies) {
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
                const categories = document.getElementById('categories');
                categories.appendChild(div);
                }
            }
}
// Inicializar la aplicación y enlazar los eventos de los botones al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar la pantalla de inicio por defecto
    showSection('home');

    // --- ENLACE DE BOTONES DE NAVEGACIÓN ---

    // 1. Botón Perfil (Pantalla Principal) -> Va al login o perfil de usuario
    const profileBtn = document.getElementById('profile');
    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            // Puedes cambiar 'authSection' por 'userProfileSection' si ya hay sesión iniciada
            showSection('authSection');
        });
    }

    // 2. Botón Explorar (Pantalla Principal) -> Va a la sección de categorías/exploración
    const exploreBtn = document.getElementById('explore');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            load();
            showSection('categories');  
            displayAnimals(animals)
        });
    }

    // 3. Botón Reportar Avistamiento (Pantalla Principal) -> Va al formulario de reporte
    const reportBtn = document.getElementById('report');
    if (reportBtn) {
        reportBtn.addEventListener('click', () => {
            showSection('reportSection');
        });
    }

    // 4. Botones "Volver" de las distintas secciones -> Regresan al inicio
    const backButtons = ['authBack', 'profileBack', 'reportBack', 'back'];
    backButtons.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('click', () => {
                showSection('home');
            });
        }
    });

    // 5. Botón ¡Juega! (En sección explorar) -> Va al minijuego
    const playBtn = document.getElementById('play');
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            showSection('gameSection');
        });
    }

    // 6. Botón Volver del Minijuego -> Regresa a explorar
    const gameBackBtn = document.getElementById('gameBack');
    if (gameBackBtn) {
        gameBackBtn.addEventListener('click', () => {
            showSection('categories');
        });
    }

    // 7. Alternar entre Iniciar Sesión y Registro
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const loginBox = document.getElementById('loginBox');
    const registerBox = document.getElementById('registerBox');

    if (showRegister && showLogin && loginBox && registerBox) {
        showRegister.addEventListener('click', (e) => {
            e.preventDefault();
            loginBox.classList.add('hidden');
            registerBox.classList.remove('hidden');
        });

        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            registerBox.classList.add('hidden');
            loginBox.classList.remove('hidden');
        });
    }
});
