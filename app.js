// ==========================================================
// FAUNO BELO - LÓGICA DE NAVEGACIÓN Y VISTAS
// ==========================================================

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

// Inicializar la aplicación y enlazar los botones al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar la sección de inicio por defecto
    showSection('home');

    // Botón Perfil (Pantalla Principal)
    const profileBtn = document.getElementById('profile');
    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            showSection('authSection');
        });
    }

    // Botón Explorar (Pantalla Principal)
    const exploreBtn = document.getElementById('explore');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            showSection('categories');
        });
    }

    // Botón Reportar Avistamiento (Pantalla Principal)
    const reportBtn = document.getElementById('report');
    if (reportBtn) {
        reportBtn.addEventListener('click', () => {
            showSection('reportSection');
        });
    }

    // Botones de "Volver" para regresar al inicio (Home)
    const authBack = document.getElementById('authBack');
    if (authBack) {
        authBack.addEventListener('click', () => showSection('home'));
    }

    const profileBack = document.getElementById('profileBack');
    if (profileBack) {
        profileBack.addEventListener('click', () => showSection('home'));
    }

    const reportBack = document.getElementById('reportBack');
    if (reportBack) {
        reportBack.addEventListener('click', () => showSection('home'));
    }

    const backExplore = document.getElementById('back');
    if (backExplore) {
        backExplore.addEventListener('click', () => showSection('home'));
    }

    // Botón para ir al minijuego desde la sección de explorar
    const playBtn = document.getElementById('play');
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            showSection('gameSection');
        });
    }

    // Botón Volver en el Minijuego (regresa a explorar)
    const gameBack = document.getElementById('gameBack');
    if (gameBack) {
        gameBack.addEventListener('click', () => {
            showSection('categories');
        });
    }
});
