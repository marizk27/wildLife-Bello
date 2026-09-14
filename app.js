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

// Inicializar la aplicación al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
});
