// ==========================================================
// FAUNO BELO - LÓGICA DE NAVEGACIÓN Y VISTAS
// ==========================================================

function showSection(sectionId) {
    // Ocultar todas las secciones principales
    const sections = ['home', 'categories', 'authSection', 'userProfileSection', 'reportSection', 'gameSection'];
    
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.classList.add('hidden');
        }
    });

    // Mostrar la sección seleccionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }
}

// Eventos globales al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Por defecto aseguramos que se muestre el inicio y se oculten los demás
    showSection('home');
});
