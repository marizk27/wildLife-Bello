// Función para cargar y mostrar los favoritos en el panel de perfil
function loadUserFavorites() {
    const favoritesGrid = document.getElementById('favorites-grid');
    const favCounter = document.getElementById('fav-counter');
    const noFavMsg = document.getElementById('no-favorites-msg');

    // Recuperar favoritos del LocalStorage (asumiendo un array de IDs o nombres)
    const savedFavorites = JSON.parse(localStorage.getItem('fauno_favorites')) || [];
    
    // Actualizar el contador visual
    favCounter.textContent = savedFavorites.length;

    if (savedFavorites.length === 0) {
        noFavMsg.style.display = 'block';
        favoritesGrid.innerHTML = '<p class="text-gray-500 italic col-span-full" id="no-favorites-msg">Aún no tienes especies guardadas como favoritas.</p>';
        return;
    }

    noFavMsg.style.display = 'none';
    favoritesGrid.innerHTML = '';

    // Renderizar cada tarjeta favorita
    savedFavorites.forEach(species => {
        const card = document.createElement('div');
        card.className = 'bg-gray-50 border border-green-200 rounded-lg p-4 shadow-sm flex flex-col justify-between';
        card.innerHTML = `
            <div>
                <img src="${species.imagen || 'placeholder.jpg'}" alt="${species.nombre}" class="w-full h-32 object-cover rounded-md mb-2">
                <h4 class="font-bold text-green-900">${species.nombre}</h4>
                <p class="text-xs text-gray-500 italic">${species.cientifico || ''}</p>
            </div>
            <button onclick="removeFavorite('${species.id}')" class="mt-3 text-red-600 text-xs font-semibold hover:underline">
                Eliminar de favoritos ✕
            </button>
        `;
        favoritesGrid.appendChild(card);
    });
}

// Función para remover un favorito
function removeFavorite(speciesId) {
    let savedFavorites = JSON.parse(localStorage.getItem('fauno_favorites')) || [];
    savedFavorites = savedFavorites.filter(item => item.id !== speciesId);
    localStorage.setItem('fauno_favorites', JSON.stringify(savedFavorites));
    loadUserFavorites(); // Recargar la vista
}

// Ejecutar al cargar la vista de perfil
document.addEventListener('DOMContentLoaded', loadUserFavorites);
