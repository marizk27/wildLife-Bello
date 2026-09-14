// Función para cambiar de sección dinámicamente
function showSection(sectionId) {
    const sections = ['home', 'categories', 'authSection', 'userProfileSection', 'reportSection', 'gameSection'];
    
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.classList.add('hidden');
        }
    });

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }
}
