// ==========================================================
// FAUNO BELO - LÓGICA DE NAVEGACIÓN Y DATOS
// ==========================================================

const faunoData = [
    {
        "category": "Anfíbios",
        "funFacts": [
            "Los anfibios pueden servir como indicadores de la salud de los ecosistemas.",
            "Muchos anfibios ayudan a controlar las poblaciones de insectos.",
            "Algunos anfibios pueden absorber agua a través de su piel.",
            "La piel de los anfibios es muy sensible a los cambios del ambiente."
        ],
        "categoryImg": "https://static.techno-science.net/illustrations/definitions/1200px/d/dendropsophus-bogerti_b06189a5b61554343bdd93dabab8b01c.jpg",
        "especies": [
            {"id": 1, "name": "Sapo común", "scientificName": "Rhinella horribilis", "endangered": "LC", "function": "Controlador de insectos y fuente de alimento para resistentes a su toxina.", "img": "https://media.istockphoto.com/id/1720406916/photo/rhinella-horribilis-giant-toad-tortuguero-costa-rica-wildlife.jpg?s=1024x1024&w=is&k=20&c=VvuvDMgKY-aB_Ms9pKYzNBMrzGSGMuMlRVizne0V_e8="},
            {"id": 2, "name": "Rana comunita", "scientificName": "Pristimantis achatinus", "endangered": "LC", "function": "Controlador de invertebrados del suelo.", "img": "https://cdn.pixabay.com/photo/2017/06/06/17/10/frog-2377825_1280.jpg"},
            {"id": 3, "name": "Rana arborícola", "scientificName": "Dendropsophus bogerti", "endangered": "LC", "function": "Controlador de insectos voladores; parte de redes tróficas acuáticas", "img": "https://upload.wikimedia.org/wikipedia/commons/e/e5/Dendropsophus_bogerti02.jpg"},
            {"id": 4, "name": "Rana paisa", "scientificName": "Pristimantis paisa", "endangered": "LC", "function": "Controlador de insectos en sotobosques", "img": "https://inaturalist-open-data.s3.amazonaws.com/photos/57481579/large.jpg"},
            {"id": 5, "name": "Rana arborícola ruidosa", "scientificName": "Boana pugnax", "endangered": "LC", "function": "Controlador de insectos y polinizador accidental", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Hypsiboas_pugnax02.jpg/250px-Hypsiboas_pugnax02.jpg"}
        ]
    }, 
    {
        "category": "Aves",
        "categoryImg": "https://farallonesdelcitara.bioexploradores.com/wp-content/uploads/2022/01/Vista-general-Ortalis-columbiana-Guacharaca-colombiana-Colombian-Chachalaca-1201x901.jpg",
        "especies": [
            {"id": 6, "name": "Azulejo", "scientificName": "Thraupis episcopus", "endangered": "LC", "function": "Dispersión de semillas.", "img": "https://th.bing.com/th/id/OSK.8cvNxgAWbhhFZz54ZYHC3NbdKkrHr03YZKp9ur3pNLQ?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"},
            {"id": 7, "name": "Batará carcajada", "scientificName": "Thamnophilus multistriatus", "endangered": "LC", "function": "Dispersión de semillas.", "img": "https://i.pinimg.com/736x/11/76/85/117685c9e0199ce29b2989613792c5ee.jpg"},
            {"id": 8, "name": "Bichofué", "scientificName": "Pitangus sulphuratus", "endangered": "LC", "function": "Dispersión de semillas.", "img": "https://www.museobolivariano.org.co/wp-content/uploads/2021/07/bichofue-pitangus-sulphuratus-philippe-vermeire-1024x1024.jpg"}
        ]
    },
    {
        "category": "Insectos",
        "categoryImg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIIlRpgeqkiKFUcMeO4tgzB9TSdKb5543RZTOk6ZntBgdNPAoh7t0rGoc&s=10",
        "especies": [
            {"id": 59, "name": "Abeja europea", "scientificName": "Apis mellifera", "endangered": "DD", "function": "Polinización.", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS2ZNoZOUh03Kz3WG8ZMRKRRh0k2_xAtq3haUUD1CJRQ&s=10"}
        ]
    },
    {
        "category": "Mamíferos",
        "categoryImg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6yHHufkigZwhf3Fss9fal6aAgGpM9u2UfYwSmYmwozA0jS0rzn5F4N6Y&s=10",
        "especies": [
            {"id": 70, "name": "Zorro perro", "scientificName": "Cerdocyon thous", "endangered": "LC", "function": "Controlador de insectos.", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPWd3O5ZzaYECIKMdjMFMuy2RpVa6iSSQYe3vjkYOh8bzm-97XUGZ8SpYbUNdx6iJRqrpXEZC5kSz1OIfZIWSJEInIb053IGNuoAi0ow&s=10"}
        ]
    },
    {
        "category": "Reptiles",
        "categoryImg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy4uA9NRkAVwgrMc_jKxgMV5bnoldC_y_8E1YgJQUmBg&s=10",
        "especies": [
            {"id": 76, "name": "Iguana verde", "scientificName": "Iguana iguana", "endangered": "LC", "function": "Dispersión de semillas.", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS70X00lbqzNhxQJ3WaK5XzT6SexyoJaII7V3nUu2teMSKoVLFddF09rXWjZ_NgZ1nxpgonem78rk5ThVgk-q9yEzA5KQTtoPbd81T5KA&s=10"}
        ]
    }
];

// Función para cambiar de sección
function showSection(sectionId) {
    const sections = ['home', 'categories', 'authSection', 'userProfileSection', 'reportSection', 'gameSection'];
    
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });

    const targetSection = document.getElementById(sectionId);
    if (targetSection) targetSection.classList.remove('hidden');
}

// Función para renderizar dinámicamente las categorías en la interfaz
function renderCategories() {
    // Buscamos un contenedor dentro de la sección "categories". Si no existe, lo creamos de forma segura.
    let container = document.getElementById('categoriesGrid');
    const categoriesSection = document.getElementById('categories');

    if (!categoriesSection) return;

    if (!container) {
        container = document.createElement('div');
        container.id = 'categoriesGrid';
        container.style.cssText = "display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; padding: 20px; max-width: 800px; margin: 0 auto;";
        categoriesSection.appendChild(container);
    }

    container.innerHTML = '';

    faunoData.forEach(cat => {
        const card = document.createElement('div');
        card.style.cssText = "background: #132a13; border-radius: 8px; padding: 10px; text-align: center; cursor: pointer; border: 1px solid #31572c; color: white;";
        card.innerHTML = `
            <img src="${cat.categoryImg}" alt="${cat.category}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 6px;">
            <h3 style="margin-top: 10px; font-size: 16px;">${cat.category}</h3>
        `;
        
        // Opcional: Al hacer clic en una categoría puedes ver sus especies o filtrarlas
        card.addEventListener('click', () => {
            alert(`Seleccionaste la categoría: ${cat.category} con ${cat.especies.length} especies registradas.`);
        });

        container.appendChild(card);
    });
}

// Inicialización de eventos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
    renderCategories();

    // Enlaces de navegación principales
    const profileBtn = document.getElementById('profile');
    if (profileBtn) profileBtn.addEventListener('click', () => showSection('authSection'));

    const exploreBtn = document.getElementById('explore');
    if (exploreBtn) exploreBtn.addEventListener('click', () => showSection('categories'));

    const reportBtn = document.getElementById('report');
    if (reportBtn) reportBtn.addEventListener('click', () => showSection('reportSection'));

    // Botones de retroceso ("Volver")
    const authBack = document.getElementById('authBack');
    if (authBack) authBack.addEventListener('click', () => showSection('home'));

    const profileBack = document.getElementById('profileBack');
    if (profileBack) profileBack.addEventListener('click', () => showSection('home'));

    const reportBack = document.getElementById('reportBack');
    if (reportBack) reportBack.addEventListener('click', () => showSection('home'));

    const backExplore = document.getElementById('back');
    if (backExplore) backExplore.addEventListener('click', () => showSection('home'));

    const playBtn = document.getElementById('play');
    if (playBtn) playBtn.addEventListener('click', () => showSection('gameSection'));

    const gameBack = document.getElementById('gameBack');
    if (gameBack) gameBack.addEventListener('click', () => showSection('categories'));
});
