// ==========================================================
// FAUNO BELO
// LÓGICA COMPLETA DE NAVEGACIÓN, EXPLORACIÓN Y FAVORITOS
// ==========================================================

let animals = [];

let currentUser = localStorage.getItem("faunoBeloUser") || null;

let favorites = JSON.parse(
    localStorage.getItem("faunoBeloFavorites") || "[]"
);

// ==========================================================
// DICCIONARIO DE DESCRIPCIONES DE LA GUÍA DE FAUNA
// ==========================================================
const speciesDescriptions = {
    // Anfibios
    "Sapo común": "Grande (10-17 cm), piel verrugosa, marrón/gris. Control de insectos[cite: 1].",
    "Rana común": "Pequeña/mediana (2.5-5 cm), verde, café u oliva. Control de invertebrados[cite: 1].",
    "Rana arboricola": "Pequeña (2-3.5 cm), dorso amarillo/café claro. Control de insectos[cite: 1].",
    "Rana paisa": "Pequeña (2-3.5 cm), color variable. Control de insectos[cite: 1].",
    "Rana arboricola ruidosa": "Mediana/grande (5-8 cm), café/gris/oliva. Polinizador y controlador[cite: 1].",

    // Aves
    "Azulejo": "Gris azulado claro con dorso azul oscuro. Dispersión de semillas[cite: 1].",
    "Batará carcajada": "Líneas en blanco y negro. Dispersión de semillas[cite: 1].",
    "Bichofue": "Cabeza negra, franja blanca, pecho amarillo. Dispersión de semillas[cite: 1].",
    "Canario": "Amarillo brillante en cabeza y vientre. Dispersión de semillas[cite: 1].",
    "Carpintero listado": "Cabeza negra con cresta roja. Dispersión de semillas[cite: 1].",
    "Carriquí pechiblanco": "Azul intenso, cabeza negra, pecho blanco. Dispersión de semillas[cite: 1].",
    "Carriqui vertiamarillo": "Cabeza negra, verde intenso, vientre amarillo. Dispersión de semillas[cite: 1].",
    "Fiofio ventriamarillo": "Café claro, garganta y pecho grisáceos. Dispersión de semillas[cite: 1].",
    "Mirla o mayo": "Marrón oscuro, garganta blancuzca. Dispersión de semillas[cite: 1].",
    "Mosquero cardenal": "Copete rojo carmesí, antifaz negro. Dispersión de semillas[cite: 1].",
    "Pepitero listado": "Macho cabeza negra, hembra marrón. Dispersión de semillas[cite: 1].",
    "Sirirí": "Abdomen amarillo brillante, cabeza gris. Dispersión de semillas[cite: 1].",
    "Tangara cabeciazul": "Cabeza azul brillante, dorso negro. Dispersión de semillas[cite: 1].",
    "Torcaza": "Coloración parda, manchas en el cuello. Dispersión de semillas[cite: 1].",
    "Picogrueso pechirrosa": "Pecho rosado intenso (macho). Dispersión de semillas[cite: 1].",
    "Guacharaca común": "Parda con cuello grisáceo. Dispersión de semillas[cite: 1].",
    "Tangara rastrojera": "Cabeza naranja intenso, dorso negro azulado. Dispersión de semillas[cite: 1].",
    "Cucarachero": "Pardo, garganta beige claro. Dispersión de semillas[cite: 1].",
    "Atlapetes pechiamarillo": "Garganta y abdomen amarillo brillante. Dispersión de semillas[cite: 1].",
    "Colarraqueta de botas blancas": "Pico recto corto, polinizador[cite: 1].",
    "Tangara lacrimosa": "Vientre amarillo brillante, negro azulado[cite: 1].",
    "Mirla patinaranja": "Negra-parduzca, pico y patas anaranjadas. Dispersión de semillas[cite: 1].",
    "Barranquero andino": "Dorso azul intenso. Controlador de insectos[cite: 1].",
    "Carpintero bellotero": "Cabeza negra, corona roja. Controlador de insectos[cite: 1].",
    "Trepatroncos montano": "Pardo rojizo, pico largo y curvado. Control de insectos[cite: 1].",
    "Cernícalo americano": "Macho con cabeza blanca y nuca rojiza. Control de plagas[cite: 1].",
    "Mosquero negro": "Plumaje oscuro con abdomen blanco. Controlador de insectos[cite: 1].",
    "Reinita gorjinaranja": "Garganta anaranjada intensa (macho). Dispersión de semillas[cite: 1].",
    "Jilguero aliblanco": "Cabeza y dorso negros, vientre amarillo. Dispersión de semillas[cite: 1].",
    "Gallinazo": "Negro, cabeza sin plumas. Carroñero[cite: 1].",
    "Martin pescador": "Azul grisáceo con franja rojiza. Control de peces[cite: 1].",
    "Tangara flamigera": "Negro brillante con rabadilla roja. Dispersión de semillas[cite: 1].",
    "Sinsonte": "Gris claro, pecho y vientre blanco. Dispersión de semillas[cite: 1].",
    "Tortolita rojiza": "Marrón rojizo. Dispersión de semillas[cite: 1].",
    "Bienteveo rayado": "Ceja blanca, pecho amarillo con rayas. Dispersión de semillas[cite: 1].",
    "Colibrí coliazul": "Verde brillante, cola azul intenso. Polinización[cite: 1].",
    "Cacique candela": "Negro con vientre rojo brillante (Vulnerable)[cite: 1].",
    "Gavilán pollero": "Gris parduzco, pecho canela. Control de plagas[cite: 1].",
    "Coquito - ibis negro": "Negro metalizado, pico rojo curvado[cite: 1].",
    "Tangara coroninegra": "Cabeza gris claro, dorso azul intenso. Dispersión de semillas[cite: 1].",
    "Gorrión copetón": "Cabeza gris, copete y líneas negras. Dispersión de semillas[cite: 1].",
    "Cuco ardilla común": "Castaño rojizo, cola larga. Controlador de insectos[cite: 1].",
    "Turpial amarillo": "Negro con amarillo dorado. Dispersión de semillas[cite: 1].",
    "Reinita cabecidorada": "Amarillo brillante y gris azulado. Control de insectos[cite: 1].",
    "Garcilla bueyera": "Blanco con tonos anaranjados. Controlador de plagas[cite: 1].",
    "Tordo llanero": "Negro brillante con reflejos púrpuras. Control de insectos[cite: 1].",
    "Polla azul": "Azul purpúreo, placa frontal azul celeste[cite: 1].",
    "Guaco": "Cabeza y dorso negro azulado, ojos rojos[cite: 1].",
    "Garrapatero aní": "Negro con reflejos, pico grueso y curvo. Control de insectos[cite: 1].",
    "Pepitero oliváceo": "Oliva grisáceo, garganta blanca. Dispersión de semillas[cite: 1].",
    "Semillero ventriamarillo": "Macho negro y gris, vientre blanco. Dispersión de semillas[cite: 1].",
    "Pigua": "Cabeza blanca, dorso negro o pardo. Carroñero[cite: 1].",
    "Garcita verdosa": "Corona verde negruzco, cuello castaño[cite: 1].",

    // Insectos
    "Abeja europea": "Bandas amarillas y negras. Polinizador clave[cite: 1].",
    "Mariposa monarca": "Naranja intenso con venas negras. Polinizador[cite: 1].",
    "Mariposa alas de cebra": "Alas negras con franja roja. Polinizador[cite: 1].",
    "Mariposa malaquita": "Verde brillante con bordes marrones[cite: 1].",
    "Mariquita": "Rojo/anaranjado con manchas negras. Control biológico[cite: 1].",
    "Mariposa Morpho azul": "Azul metálico brillante. Polinizador[cite: 1].",
    "Mariposa Rhetus": "Azul metálico intenso y bordes negros[cite: 1].",
    "Mariposa Actinote": "Anaranjado intenso con bordes negros[cite: 1].",
    "Mariposa transparente": "Alas transparentes (alas de cristal)[cite: 1].",
    "Abeja angelita": "Pequeña, dorada a marrón claro (sin aguijón)[cite: 1].",
    "Abeja negra con bandas naranjas": "Robusta, polinizador de orquídeas[cite: 1].",

    // Mamíferos
    "Zorro perro": "Grisáceo con tonos pardos y negros[cite: 1].",
    "Zarigüeya común": "Grisáceo con cola prensil. Control de insectos[cite: 1].",
    "Zarigüeya orejiblanca andina": "Gris oscuro a negruzco[cite: 1].",
    "Ardilla Colorada": "Tonos rojizos, cola esponjosa. Dispersor de semillas[cite: 1].",
    "Armadillo de nueve bandas": "Caparazón con 9 bandas móviles[cite: 1].",
    "Murciélago frugívoro grande": "Marrón oscuro con franja blanca en el rostro[cite: 1].",

    // Reptiles
    "Iguana verde": "Verde brillante a grisáceo, cresta dorsal[cite: 1].",
    "Basilisco común": "Verde oliváceo, cresta prominente, corre sobre el agua[cite: 1].",
    "Anolis de Medellín": "Verde oliváceo a marrón, papada naranja/amarilla[cite: 1].",
    "Serpiente corredora de Daniel": "Marrón oliváceo con línea clara lateral[cite: 1]."
};

// ==========================================================
// DICCIONARIO EXTENDIDO DE LA GUÍA DE FAUNA
// (descripción completa, función ecológica, áreas protegidas,
// amenazas y estado IUCN de cada especie)
// ==========================================================
// Diccionario indexado por "id" (coincide exactamente con los ids
// de initialcategories.json), evita fallos de coincidencia por nombre
const speciesExtraInfoById = {
    1: {
        name: "Sapo común / Sapo gigante",
        descripcion: "Es un sapo grande (10-17 cm), de cuerpo robusto y piel gruesa, rugosa y verrugosa, generalmente de tonos marrones o grises con un vientre más claro (blanquecino o amarillento).",
        funcionEcologica: "Controlador de insectos; fuente de alimento para depredadores resistentes a su toxina.",
        areasProtegidas: "DRMI Cerro Quitasol - La Holanda, Páramo de las Baldías.",
        amenazas: "Contaminación por plaguicidas, pérdida de hábitat en áreas agrícolas y urbanas.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    2: {
        name: "Rana común",
        descripcion: "Es una rana pequeña a mediana (2,5-5 cm), de cuerpo esbelto y piel lisa o ligeramente granulada, con colores variables entre café, verde u oliva, a menudo con manchas oscuras. Posee dedos largos y delgados con discos expandidos en la punta, que facilitan trepar en la vegetación.",
        funcionEcologica: "Controlador de invertebrados del suelo.",
        areasProtegidas: "",
        amenazas: "Deforestación, fragmentación de bosques y contaminación de fuentes de agua.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    3: {
        name: "Rana arboricola",
        descripcion: "Es una rana pequeña (2-3,5 cm), de cuerpo delgado y piel lisa, con coloración dorsal amarilla a café claro y líneas o manchas oscuras y su vientre es claro. Tiene ojos grandes y dedos con discos expandidos y membranas interdigitales bien desarrolladas, adaptados para trepar.",
        funcionEcologica: "Controlador de insectos voladores; parte de redes tróficas acuáticas.",
        areasProtegidas: "Área de recreación Piamonte, DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Contaminación de humedales, expansión agrícola y cambio climático que altera ciclos de reproducción.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    4: {
        name: "Rana paisa",
        descripcion: "Es una rana pequeña (aprox. 2-3,5 cm), de cuerpo esbelto y piel lisa o ligeramente granulada, con coloración variable entre café, beige o verdosa y manchas irregulares y su vientre es claro, blanquecino o amarillento.",
        funcionEcologica: "Controlador de insectos en sotobosques.",
        areasProtegidas: "Área de recreación Piamonte, DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Deforestación, fragmentación de bosques y contaminación de fuentes de agua.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    5: {
        name: "Rana arboricola ruidosa",
        descripcion: "Es una rana mediana a grande (5-8 cm), con vientre claro y de cuerpo robusto y piel lisa, generalmente de color café, gris u oliva, con manchas o franjas oscuras en el dorso.",
        funcionEcologica: "Polinizador accidental y controlador de insectos.",
        areasProtegidas: "DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Contaminación de cuerpos de agua, alteración de humedales, ruido y luz artificial que interfieren en su reproducción.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    6: {
        name: "Azulejo",
        descripcion: "La cabeza y las partes inferiores gris azulado claro, mientras que el dorso es de azul oscuro con reflejos de verde azulado brillante en alas y cola. Los hombros exhiben distintos matices de azul, lo que realza su apariencia vistosa. Su pico es corto, robusto y gris oscuro.",
        funcionEcologica: "Dispersión de semillas.",
        areasProtegidas: "Área de recreación Piamonte.",
        amenazas: "Pérdida de hábitat y contaminación por agroquímicos.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    7: {
        name: "Batará carcajada",
        descripcion: "El macho tiene todo el cuerpo y la corona con líneas en blanco y negro. La hembra tiene la corona y las partes superiores rojizas e igualmente posee líneas en blanco y negro en el resto del cuerpo.",
        funcionEcologica: "Dispersión de semillas.",
        areasProtegidas: "Área de recreación Piamonte.",
        amenazas: "Fragmentación de bosques secos y húmedos, pérdida de matorrales.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    8: {
        name: "Bichofue",
        descripcion: "Presenta la cabeza negra con una franja blanca que va de la frente a la nuca y una pequeña mancha amarilla en la coronilla. El dorso es de color marrón oliváceo, con alas y cola más oscuras y bordes canela. El pecho y vientre son de un amarillo brillante, contrastando con la garganta blanca.",
        funcionEcologica: "Dispersión de semillas.",
        areasProtegidas: "Área de recreación Piamonte.",
        amenazas: "Pérdida de hábitat y contaminación por agroquímicos.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    9: {
        name: "Canario",
        descripcion: "Presenta un plumaje amarillo brillante en la cabeza, pecho y vientre, más intenso en los machos. El dorso y las alas son de tono oliváceo o pardo amarillento, con plumas más oscuras en los bordes. La cola es parduzca con matices amarillentos.",
        funcionEcologica: "Dispersión de semillas.",
        areasProtegidas: "Área de recreación Piamonte.",
        amenazas: "Captura para comercio ilegal de aves de jaula, pérdida de hábitat.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    10: {
        name: "Carpintero listado",
        descripcion: "Su cabeza es negra con una llamativa cresta roja que se extiende hacia atrás. Tiene una línea blanca que va desde el pico hasta el cuello, pasando por los lados de la cara. Su espalda y alas son negras con algunas zonas blancas visibles en vuelo. El pecho y el vientre son claros con líneas negras verticales. Su pico es largo, fuerte y de color claro, ideal para taladrar la madera.",
        funcionEcologica: "Dispersión de semillas.",
        areasProtegidas: "Área de recreación Piamonte.",
        amenazas: "Tala de árboles y fragmentación de bosques.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    11: {
        name: "Carriquí pechiblanco",
        descripcion: "Presenta un plumaje de azul intenso y brillante en alas, dorso y cola. La cabeza, garganta y parte superior del pecho son de color negro, contrastando con el vientre y pecho inferiores blancos. Además, muestra un anillo ocular de tono azulado que resalta su aspecto.",
        funcionEcologica: "Dispersión de semillas.",
        areasProtegidas: "Área de recreación Piamonte.",
        amenazas: "Deforestación y fragmentación del bosque seco tropical.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    12: {
        name: "Carriqui vertiamarillo",
        descripcion: "Tiene la cabeza negra con una franja celeste brillante que forma una corona desde la frente hasta la nuca. Su espalda, alas y cola son de un verde intenso, mientras que el pecho y el vientre son amarillo claro. Presenta una máscara negra alrededor de los ojos y un pico robusto de color oscuro. Su colorido plumaje la hace fácilmente reconocible en los bosques donde habita.",
        funcionEcologica: "Dispersión de semillas.",
        areasProtegidas: "Área de recreación Piamonte, Páramo de las Baldías.",
        amenazas: "Pérdida y fragmentación del hábitat.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    13: {
        name: "Fiofio ventriamarillo",
        descripcion: "Esta ave tiene un color café claro en la cabeza, la espalda y las alas, en las alas y cola presenta una finas líneas oscuras y la garganta y el pecho son grisáceos.",
        funcionEcologica: "Dispersión de semillas.",
        areasProtegidas: "Área de recreación Piamonte.",
        amenazas: "Pérdida de hábitat y contaminación por agroquímicos.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    14: {
        name: "Mirla o mayo",
        descripcion: "Su plumaje marrón oscuro en el dorso, cola alas y parte superior de la cabeza; garganta blancuzca con líneas oscuras estrechas, que se hacen castañas a oliváceas en el pecho, vientre y coberteras.",
        funcionEcologica: "Dispersión de semillas.",
        areasProtegidas: "Área de recreación Piamonte.",
        amenazas: "Contaminación urbana y pérdida de árboles.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    15: {
        name: "Mosquero cardenal",
        descripcion: "El macho se distingue por su vibrante copete rojo carmesí y un antifaz negro que contrasta con su garganta roja. Su abdomen y pecho son de un intenso color rojo, mientras que su dorso es gris. Las alas y la cola son negras, al igual que su pico. La hembra y los juveniles tienen un color gris claro con pintas blancas distribuidas por todo el cuerpo, excepto en el abdomen, que es de un tono anaranjado.",
        funcionEcologica: "Dispersión de semillas.",
        areasProtegidas: "Área de recreación Piamonte.",
        amenazas: "Pérdida de hábitat en zonas abiertas y contaminación.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    16: {
        name: "Pepitero listado",
        descripcion: "El macho tiene la cabeza negra, hasta el cuello, la espalda es de color oliva grisáceo y el abdomen es claro o amarillento, su pico es grande y plateado. La hembra tiene la cabeza y dorso color marrón, mientras que la garganta y abdomen son más amarillas.",
        funcionEcologica: "Dispersión de semillas.",
        areasProtegidas: "Área de recreación Piamonte.",
        amenazas: "Fragmentación de bosques secos, pérdida de arbustales y matorrales.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    17: {
        name: "Sirirí",
        descripcion: "Su pecho y abdomen es de color amarillo brillante. La cabeza es gris claro con una línea negra difuminada que cruza los ojos. La espalda tiene tonos oliva, mientras que las alas y la cola son oscuras. El pico es corto, recto y de color negro.",
        funcionEcologica: "Dispersión de semillas.",
        areasProtegidas: "Área de recreación Piamonte.",
        amenazas: "Uso de pesticidas que reducen disponibilidad de insectos.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    18: {
        name: "Tangara cabeciazul",
        descripcion: "Su cabeza es de un azul brillante, con la garganta y la nuca de un azul más oscuro. El dorso es negro con reflejos verdes, mientras que las alas son negras con bordes azulados. El pecho y el vientre presentan tonos verdes turquesa con algunas zonas amarillas. Su pico es corto y oscuro.",
        funcionEcologica: "Dispersión de semillas.",
        areasProtegidas: "Área de recreación Piamonte.",
        amenazas: "Deforestación, fragmentación de bosques húmedos de montaña.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    19: {
        name: "Torcaza",
        descripcion: "Presenta una coloración parda que varía según la región corporal. La corona, cola y vientre son de color grisácea. Presenta una línea auricular negra. En el cuello se puede observar unas manchas de color vino.",
        funcionEcologica: "Dispersión de semillas.",
        areasProtegidas: "Área de recreación Piamonte.",
        amenazas: "Pérdida de áreas de cultivo.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    20: {
        name: "Picogrueso pechirrosa",
        descripcion: "El macho presenta la cabeza, la espalda y la parte superior del pecho de color negro. Las alas son negras con manchas blancas bien definidas. El vientre es blanco, y el pecho muestra una banda rosada intensa. La hembra tiene tonos más apagados, con la cabeza y la espalda de color marrón estriado y el pecho de un beige pálido con vetas oscuras. En ambos sexos, el pico es grande, robusto y de color claro.",
        funcionEcologica: "Dispersión de semillas.",
        areasProtegidas: "Área de recreación Piamonte, Reserva Natural de la Sociedad Civil Munnai.",
        amenazas: "Colisiones con estructuras humanas durante migración.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    21: {
        name: "Guacharaca común",
        descripcion: "Presenta una coloración general parda que varía en intensidad según la zona del cuerpo. La cabeza, cuello y pecho son de tono grisáceo, con una línea auricular oscura bien marcada. En los lados del cuello se observan manchas rojizas o color vino. La cola es larga y también de color pardo, con bordes más claros. El pico es curvo y de color oscuro.",
        funcionEcologica: "Dispersión de semillas.",
        areasProtegidas: "Área de recreación Piamonte, DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Cacería y pérdida de hábitat por expansión agrícola.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    22: {
        name: "Tangara rastrojera",
        descripcion: "Presenta la cabeza de color naranja intenso, contrastando con el dorso negro azulado. Las alas son negras con bordes azul brillante. El pecho y el vientre muestran un tono azul celeste que se va aclarando hacia la parte inferior.",
        funcionEcologica: "Dispersión de semillas.",
        areasProtegidas: "DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Deforestación de bosques andinos y fragmentación de su hábitat.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    23: {
        name: "Cucarachero",
        descripcion: "Presenta un plumaje predominantemente pardo, con la parte superior del cuerpo en tonos marrón grisáceo. Las alas y la cola muestran un patrón barrado más oscuro. Su garganta y pecho son de color beige claro, con el vientre algo más grisáceo y un pico delgado, curvo y oscuro.",
        funcionEcologica: "Dispersión de semillas.",
        areasProtegidas: "DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Contaminación urbana y pérdida de áreas arbustivas locales.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    24: {
        name: "Atlapetes pechiamarillo",
        descripcion: "Su espalda es principalmente de color gris, tiene una máscara de color negro a los lados de la cabeza, su coronilla es de color pardo. Su abdomen y garganta es amarillo brillante. Su pico es negro, las alas y cola oscuras y el iris es de color café rojizo oscuro.",
        funcionEcologica: "Dispersión de semillas.",
        areasProtegidas: "Páramo de las Baldías.",
        amenazas: "Pérdida y fragmentación del hábitat.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    25: {
        name: "Colarraqueta de botas blancas - hembra",
        descripcion: "El macho tiene dos plumas externas muy largas, curvadas y terminadas en raquetas de color azul verdoso. Las hembras tienen sus partes inferiores blancas con manchas de verde metálico, la cola es más corta y presenta puntas blancas en las plumas externas, tiene pico recto corto, calcetines y tamaño diminuto.",
        funcionEcologica: "Polinización.",
        areasProtegidas: "Páramo de las Baldías.",
        amenazas: "Pérdida de hábitat por tala y agricultura.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    26: {
        name: "Tangara lacrimosa",
        descripcion: "Ave con la garganta y el vientre de color amarillo brillante y parches del mismo color en la mejilla y debajo del ojo. El resto del cuerpo es negruzco con tonos azules en las alas y la cola.",
        funcionEcologica: "Dispersión de semillas.",
        areasProtegidas: "Páramo de las Baldías.",
        amenazas: "Deforestación de bosques montanos y fragmentación.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    27: {
        name: "Mirla patinaranja",
        descripcion: "Es un ave de tonalidad negra-parduzca, en sus alas, cola y vientre. Se caracteriza por su pico y patas de color amarillo y anaranjado, además, tiene un anillo alrededor del ojo de un fuerte color amarillo.",
        funcionEcologica: "Dispersión de semillas.",
        areasProtegidas: "Páramo de las Baldías.",
        amenazas: "Atropellamientos y pérdida de árboles frutales nativos.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    28: {
        name: "Barranquero andino",
        descripcion: "Es un ave característica por su tono azul intenso en el dorso, alas y cola, mientras que las partes inferiores, como la cabeza y nuca son de un azul más claro. El pico es corto y grueso, de color gris claro.",
        funcionEcologica: "Controlador de insectos.",
        areasProtegidas: "DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Pérdida de bosques húmedos y tala de árboles.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    29: {
        name: "Carpintero bellotero",
        descripcion: "Presenta la cabeza negra con una frente blanca y una corona roja en la parte superior. Tiene una línea blanca que va desde la base del pico hasta el cuello. La espalda y las alas son negras con reflejos azulados, y el pecho y el vientre son blancos con estrías negras. Su cola es negra y su pico es recto, fuerte y de color oscuro.",
        funcionEcologica: "Controlador de insectos.",
        areasProtegidas: "DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Deforestación y pérdida de árboles grandes para anidación.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    30: {
        name: "Trepatroncos montano",
        descripcion: "Presenta un plumaje general pardo rojizo. La cabeza es marrón con una ceja clara y una fina línea oscura que desciende desde el ojo. El dorso y las alas son de color marrón con un leve tinte rojizo, mientras que el pecho y el vientre son beige con un patrón de manchas o escamado claro. Su pico es largo, delgado y curvado hacia abajo, adaptado para buscar insectos en la corteza de los árboles.",
        funcionEcologica: "Control de insectos.",
        areasProtegidas: "DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Deforestación de bosques andinos y fragmentación de su hábitat.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    31: {
        name: "Cernícalo americano",
        descripcion: "El macho presenta la cabeza blanca con dos franjas negras en los laterales del rostro y una nuca rojiza con una mancha negra. Su espalda es anaranjada con puntos negros, las alas son de tono azul grisáceo y la cola es rojiza con una banda negra en la punta. La hembra, tiene la espalda y las alas de color café rojizo con barras oscuras, y su cola también presenta un patrón barrado. Ambos sexos tienen el pecho y el vientre claros con pequeñas manchas oscuras, y un pico corto, curvo y de color gris oscuro.",
        funcionEcologica: "Control de plagas.",
        areasProtegidas: "DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Pérdida de hábitat y persecución por depredar aves de corral.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    32: {
        name: "Mosquero negro",
        descripcion: "Presenta un plumaje oscuro en la cabeza, el dorso, las alas y el pecho, con tonalidades que van del gris oscuro al negruzco. El abdomen es blanco, creando un contraste marcado con las partes superiores. Su pico es delgado, recto y de color negro.",
        funcionEcologica: "Controlador de insectos.",
        areasProtegidas: "DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Contaminación de cuerpos de agua.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    33: {
        name: "Reinita gorjinaranja",
        descripcion: "El macho presenta la cara y la garganta de color anaranjado intenso, rodeadas por una máscara negra que cubre los ojos y se extiende hacia los lados del cuello. La parte superior del cuerpo es negra con vetas blancas en las alas, mientras que el pecho y el abdomen son blancos con flancos anaranjados o amarillentos. La hembra es más apagada, con tonos oliva en el dorso y amarillos suaves en la cara y el pecho.",
        funcionEcologica: "Dispersión de semillas.",
        areasProtegidas: "DRMI Cerro Quitasol - La Holanda, Reserva Natural de la Sociedad Civil Munnai.",
        amenazas: "Deforestación en bosques andinos y colisiones con estructuras, cambio climático que altera migraciones.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    34: {
        name: "Jilguero aliblanco",
        descripcion: "Presenta la cabeza, el dorso y las alas de color negro, con manchas blancas visibles en las alas y un pecho y abdomen de color amarillo brillante. Su pico es negro, corto y tiene la punta de color amarillo brillante.",
        funcionEcologica: "Dispersión de semillas.",
        areasProtegidas: "DRMI Cerro Quitasol - La Holanda, Reserva Natural de la Sociedad Civil Munnai.",
        amenazas: "Captura para comercio ilegal como ave de jaula, pérdida de hábitat arbustivo.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    35: {
        name: "Gallinazo",
        descripcion: "Su plumaje es principalmente negro, tiene el cuello y la cabeza sin plumas, su piel es gris oscura y arrugada. Tiene pico ganchudo y sus patas son blancas casi grises y tiene zonas blancas en el borde interno de las alas que se observan al volar.",
        funcionEcologica: "Carroñero y descomposición de materia orgánica.",
        areasProtegidas: "DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Envenenamientos intencionales por conflictos humanos (ganaderos).",
        estadoIUCN: "Preocupación menor (LC)."
    },
    36: {
        name: "Martin pescador",
        descripcion: "Presenta un plumaje azul grisáceo en el dorso, las alas y la cabeza, con una cresta prominente. Tiene una banda blanca que rodea el cuello y se extiende hacia la garganta. El vientre muestra una franja ancha de tono castaño rojizo. Su pico es largo, recto y robusto, adaptado para capturar peces, y las patas son cortas y de color oscuro.",
        funcionEcologica: "Regular poblaciones de organismos acuáticos.",
        areasProtegidas: "DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Contaminación de cuerpos de agua con pesticidas y mercurio, alteración de riberas.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    37: {
        name: "Tangara flamigera",
        descripcion: "El macho presenta un plumaje negro brillante en la cabeza, el dorso, las alas y la cola, con una rabadilla de color rojo encendido que contrasta fuertemente con el resto del cuerpo. Su pico es grueso, con la base clara y la punta oscura. La hembra presenta un plumaje en tonos oliva en el dorso, con la garganta y el pecho de color anaranjado brillante que se difumina hacia un abdomen amarillo. Su rabadilla muestra un tono rojizo anaranjado más tenue que en el macho. El pico es grueso, de base clara y punta oscura, característico del género.",
        funcionEcologica: "Dispersión de semillas.",
        areasProtegidas: "DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Pérdida de matorrales y bosques húmedos.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    38: {
        name: "Sinsonte",
        descripcion: "Presenta un plumaje gris claro en la cabeza, el dorso y las alas, con el pecho y el vientre de color blanco. Las alas tienen parches blancos visibles especialmente en vuelo, al igual que la parte externa de la cola. Su pico es delgado, ligeramente curvado y de color oscuro. Las patas son largas y negras.",
        funcionEcologica: "Dispersión de semillas.",
        areasProtegidas: "DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Transformación de hábitat y atropellamientos en áreas urbanas.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    39: {
        name: "Tortolita rojiza",
        descripcion: "Presenta un plumaje general de tonos marrón rojizo, más intenso en el dorso, la cabeza y el pecho. Las alas muestran manchas oscuras visibles en reposo y en vuelo. El vientre es más claro, de tono beige o grisáceo. Su pico es corto, delgado y de color oscuro, y las patas son rosadas.",
        funcionEcologica: "Dispersión de semillas.",
        areasProtegidas: "Área de recreación Piamonte, DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Depredación doméstica (gatos) y cacería como ave ornamental.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    40: {
        name: "Bienteveo rayado",
        descripcion: "Presenta la cabeza grisácea con una ceja blanca bien marcada y una corona oculta de color amarillo que a veces muestra en momentos de excitación. El dorso es oliva parduzco, mientras que el pecho y el vientre son amarillos con rayas oscuras verticales. Las alas y la cola son oscuras con bordes pálidos. Su pico es recto, de tamaño mediano y de color negro.",
        funcionEcologica: "Dispersión de semillas.",
        areasProtegidas: "DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Pérdida de hábitat arbustivo y reducción de insectos por uso de pesticidas.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    41: {
        name: "Colibrí coliazul",
        descripcion: "Presenta un plumaje mayormente verde brillante en la cabeza, el dorso y el pecho, con reflejos metálicos que cambian según la luz. La cola es de un azul intenso, lo que le da el nombre común de \"coliazul\". Sus alas son oscuras y el pico es recto, delgado y negro.",
        funcionEcologica: "Polinización.",
        areasProtegidas: "DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Pérdida y fragmentación del hábitat.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    42: {
        name: "Cacique candela",
        descripcion: "Presenta un plumaje negro en la cabeza, cuello y nuca, resalta por su vientre rojo brillante. El pico y las patas son negros y el iris es amarillo.",
        funcionEcologica: "Dispersión de semillas.",
        areasProtegidas: "DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Deforestación de bosques andinos, fragmentación y pérdida de árboles frutales nativos.",
        estadoIUCN: "Vulnerable (VU)."
    },
    43: {
        name: "Gavilán pollero",
        descripcion: "Presenta una cabeza y dorso de color gris parduzco, con el pecho y el abdomen de tonos canela o rojizos finamente barrados con blanco. Las alas son anchas y de color marrón con bandas más claras, y la cola es larga con franjas negras y blancas. El pico es fuerte, curvo y de color oscuro con la base amarilla. Sus patas son amarillas y robustas.",
        funcionEcologica: "Control de plagas.",
        areasProtegidas: "DRMI Cerro Quitasol - La Holanda, Reserva Natural de la Sociedad Civil Munnai.",
        amenazas: "Persecución por depredación de aves de corral y pérdida de hábitat.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    44: {
        name: "Coquito - ibis negro",
        descripcion: "Su plumaje es negro con varias tonalidades metálicas oscuras, cara roja y desnuda, tiene pico curvado y rojizo con patas rojas claras.",
        funcionEcologica: "Control de plagas y reciclaje de materia orgánica.",
        areasProtegidas: "DRMI Cerro Quitasol - La Holanda / Área de recreación Piamonte.",
        amenazas: "Drenaje y contaminación de humedales, reducción de presas acuáticas.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    45: {
        name: "Tangara coroninegra",
        descripcion: "Presenta la cabeza y el pecho de color gris claro con reflejos azulados. El dorso es de un azul intenso, mientras que las alas y la cola son negras con bordes azules brillantes. El abdomen es verde amarillento, generando un contraste llamativo con las partes superiores. Su pico es corto, cónico y de color oscuro.",
        funcionEcologica: "Dispersión de semillas.",
        areasProtegidas: "Reserva Natural de la Sociedad Civil Munnai.",
        amenazas: "Pérdida y fragmentación de bosques húmedos andinos.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    46: {
        name: "Gorrión copetón",
        descripcion: "Es un ave con cabeza de color gris, tiene copete y líneas negras en la corona y detrás de los ojos. La garganta es blanca, con un collar de color castaño. El dorso, las alas y la cola son café con líneas negras.",
        funcionEcologica: "Dispersión de semillas.",
        areasProtegidas: "Área de recreación Piamonte, DRMI Cerro Quitasol - La Holanda, Reserva Natural de la Sociedad Civil Munnai.",
        amenazas: "Captura como ave de jaula, reducción de áreas de matorral y contaminación.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    47: {
        name: "Cuco ardilla común",
        descripcion: "Presenta un cuerpo alargado y esbelto, con la cabeza y el cuello de color castaño rojizo. El dorso es marrón, mientras que las alas son rufas, y la cola es larga, negra con puntas blancas bien marcadas. El pecho y el vientre son gris claro. Su pico es largo, curvado y de color amarillo verdoso, y tiene un anillo ocular desnudo de tono azulado o grisáceo.",
        funcionEcologica: "Controlador de insectos y pequeños vertebrados.",
        areasProtegidas: "DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Pérdida de hábitat, fragmentación de bosques y ocasional cacería.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    48: {
        name: "Turpial amarillo",
        descripcion: "Presenta un plumaje brillante y llamativo, con la cabeza, garganta y parte superior del pecho de color negro intenso, que contrasta fuertemente con el amarillo dorado del resto del cuerpo. Las alas son negras con barras blancas visibles en vuelo, y la cola también es negra con bordes amarillos. Su pico es cónico, puntiagudo y de color oscuro. El ojo es claro, de tono blanco o celeste pálido. Las hembras son similares a los machos pero con colores ligeramente más apagados y un menor contraste.",
        funcionEcologica: "Dispersor de semillas y controlador de insectos.",
        areasProtegidas: "DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Destrucción de hábitat, cacería ocasional y captura ilegal.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    49: {
        name: "Reinita cabecidorada",
        descripcion: "Presenta un plumaje amarillo brillante en la cabeza, el pecho y el abdomen, con un tono más intenso en la frente y el rostro. El dorso y las alas son de color gris azulado, con las plumas de vuelo más oscuras. La rabadilla es amarilla, y el pico es fino, oscuro y ligeramente curvado hacia abajo, adaptado para capturar insectos. Sus patas son grisáceas o azuladas. Las hembras son similares a los machos, aunque con una coloración ligeramente más opaca y menos contraste entre el amarillo y el gris.",
        funcionEcologica: "Control de insectos.",
        areasProtegidas: "DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Pérdida de humedales en áreas de invernada y colisiones con estructuras durante migración.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    50: {
        name: "Garcilla bueyera",
        descripcion: "Su plumaje es blanco, con el pico amarillo y patas amarillo grisáceas. Los adultos desarrollan una coloración anaranjada en las plumas de la espalda, cuello y cresta. Y el pico, las patas y el iris se tornan rojos.",
        funcionEcologica: "Controlador de plagas.",
        areasProtegidas: "DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Contaminación por agroquímicos en potreros y pérdida de insectos por pesticidas.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    51: {
        name: "Tordo llanero",
        descripcion: "Presenta un plumaje negro brillante en todo el cuerpo, con reflejos iridiscentes púrpuras o azulados, especialmente en los machos. Tiene ojos de color amarillo pálido que contrastan con la cabeza oscura, y un pico largo, cónico y ligeramente curvado hacia abajo.",
        funcionEcologica: "Control de insectos y dispersión de semillas.",
        areasProtegidas: "DRMI Cerro Quitasol - La Holanda / RFP Nare / Área de recreación Piamonte.",
        amenazas: "Persecución por conflictos en cultivos y perdida de humedales.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    52: {
        name: "Polla azul",
        descripcion: "Presenta un plumaje vistoso, predominantemente azul purpúreo en el cuello y el pecho, con el dorso y las alas de color verde oliva. El pico es robusto y de color rojo brillante, con una placa frontal azul celeste característica. Sus patas son largas y de color amarillo verdoso, adaptadas para caminar sobre vegetación flotante como la de los humedales.",
        funcionEcologica: "Control de vegetación acuática.",
        areasProtegidas: "DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Drenaje de humedales y contaminación de cuerpos de agua.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    53: {
        name: "Guaco",
        descripcion: "Presenta un plumaje que la cabeza y el dorso son de color negro azulado, mientras que las alas y el abdomen son gris claro. Los ojos son grandes y de color rojo intenso. Tiene un pico recto, robusto y negro. Sus patas son amarillas.",
        funcionEcologica: "Carroñero y descomposición de materia orgánica.",
        areasProtegidas: "DRMI DVARC (Divisoria Valle de Aburrá - Río Cauca).",
        amenazas: "Contaminación de ríos y humedales.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    54: {
        name: "Garrapatero aní",
        descripcion: "Presenta un plumaje completamente negro con reflejos azulados la luz. Tiene un pico grueso, curvo y muy prominente. Sus ojos son oscuros.",
        funcionEcologica: "Control de insectos.",
        areasProtegidas: "DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Pérdida de potreros y áreas abiertas, reducción de insectos por pesticidas.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    55: {
        name: "Pepitero oliváceo",
        descripcion: "Presenta un plumaje principalmente oliva grisáceo en el dorso, con las alas y la cola de tono más oscuro. La garganta es blanca, bordeada por una línea negra distintiva, mientras que el pecho y vientre son de un gris pálido que contrasta suavemente con el resto del cuerpo. Tiene un pico robusto, corto y algo curvado.",
        funcionEcologica: "Dispersión de semillas.",
        areasProtegidas: "DRMI DVARC (Divisoria Valle de Aburrá - Río Cauca), Área de recreación Piamonte.",
        amenazas: "Pérdida de bosques secos y fragmentación de matorrales.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    56: {
        name: "Semillero ventriamarillo",
        descripcion: "El macho tiene un plumaje mayormente negro en la cabeza, garganta y parte superior del pecho, mientras que el dorso, las alas y la cola son de color gris azulado. El vientre es blanco. La hembra, en cambio, tiene tonos marrones y beige en todo el cuerpo, con una coloración más uniforme. Ambos sexos poseen un pico grueso, corto y cónico.",
        funcionEcologica: "Dispersión de semillas.",
        areasProtegidas: "Área de recreación Piamonte.",
        amenazas: "Captura para tráfico de aves de jaula y pérdida de pastizales naturales.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    57: {
        name: "Pigua",
        descripcion: "Presenta una cabeza, cuello y parte superior del pecho de color blanco, a menudo con un leve tinte amarillento, mientras que la corona puede mostrar una pequeña cresta oscura. El dorso, alas y cola son de color negro o pardo muy oscuro, con bandas claras en la cola.",
        funcionEcologica: "Carroñero y controlador de poblaciones de pequeños animales.",
        areasProtegidas: "Área de recreación Piamonte.",
        amenazas: "Envenenamiento intencional y pérdida de hábitat.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    58: {
        name: "Garcita verdosa",
        descripcion: "Presenta un plumaje con la corona y la cresta de color verde negruzco, el dorso verde oscuro con reflejos metálicos, y las alas grisáceas con tonos azulados. El cuello es castaño con líneas blancas, y el pecho y el abdomen son gris claro. El pico es largo, delgado y oscuro.",
        funcionEcologica: "Control de vegetación acuática.",
        areasProtegidas: "DRMI DVARC (Divisoria Valle de Aburrá - Río Cauca), Área de recreación Piamonte.",
        amenazas: "Contaminación de aguas y reducción de presas acuáticas por destrucción de humedales.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    59: {
        name: "Abeja europea / abeja de la miel",
        descripcion: "Mide entre 12 y 15 mm, con cuerpo cubierto de vellos finos y bandas alternas amarillas y negras en el abdomen. Su tórax es marrón oscuro con pelos amarillentos, patas negras con corbículas en las obreras y alas transparentes con nervaduras marrones. Es la abeja productora de miel más común.",
        funcionEcologica: "Polinizador clave de cultivos y plantas silvestres.",
        areasProtegidas: "Área de recreación Piamonte / DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Uso de pesticidas (neonicotinoides), pérdida de flora nativa y enfermedades.",
        estadoIUCN: "Datos Insuficientes (DD)."
    },
    60: {
        name: "Mariposa monarca",
        descripcion: "Mide entre 8 y 10 cm, con alas de un naranja intenso atravesadas por venas negras y bordeadas por una franja negra con puntos blancos. El cuerpo es negro con manchas blancas, y sus patas y antenas también son oscuras.",
        funcionEcologica: "Polinizadora de flores nativas y cultivadas.",
        areasProtegidas: "Área de recreación Piamonte / DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Deforestación en sitios de invernada y cambio climático.",
        estadoIUCN: "Casi amenazado (NT)."
    },
    61: {
        name: "Mariposa alas de cebra",
        descripcion: "Mariposa con alas negras que presentan una franja roja en las anteriores y una banda amarilla o blanca en las posteriores. Su cuerpo es negro con pequeños puntos blancos en la cabeza y el tórax.",
        funcionEcologica: "Polinizadora especializada; coevolución con pasifloras.",
        areasProtegidas: "Área de recreación Piamonte / DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Deforestación en sitios de invernada y cambio climático.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    62: {
        name: "Mariposa malaquita",
        descripcion: "Conocida como malachita, alcanza entre 8 y 10 cm de envergadura, con alas de un verde brillante bordeadas de marrón oscuro. Su cuerpo es marrón con sutiles tonos verdosos, lo que refuerza su aspecto llamativo.",
        funcionEcologica: "Polinizadora de flores y fuente de alimento para aves.",
        areasProtegidas: "Área de recreación Piamonte / DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Fragmentación de bosques y pérdida de plantas hospederas.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    63: {
        name: "Mariquita o catarina",
        descripcion: "Las mariquitas miden entre 5 y 8 mm, con cuerpo redondeado, generalmente rojo o anaranjado con manchas negras. Además, tiene su cabeza y patas negras.",
        funcionEcologica: "Polinizador ocasional y controlador biológico de plagas.",
        areasProtegidas: "Área de recreación Piamonte / DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Uso de pesticidas e introducción de especies exóticas que desplazan nativas.",
        estadoIUCN: "Datos Insuficientes (DD)."
    },
    64: {
        name: "Mariposa Morpho azul",
        descripcion: "Mariposa grande alcanza entre 10 y 12 cm, el reverso de las alas de color marrón decorado con ocelos y el anverso de un azul metálico brillante. Su cuerpo es oscuro con reflejos azulados, lo que la hace muy llamativa en vuelo.",
        funcionEcologica: "Polinizadora ocasional de flores de sotobosque.",
        areasProtegidas: "Área de recreación Piamonte / DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Deforestación de bosques tropicales y pérdida de plantas hospederas.",
        estadoIUCN: "Datos Insuficientes (DD)."
    },
    65: {
        name: "Mariposa Rhetus",
        descripcion: "Sus alas son de color azul metálico intenso y bordes negros. Presenta además colas alargadas en las alas posteriores, y su cuerpo es oscuro con reflejos azulados.",
        funcionEcologica: "Polinizadora de flores de sotobosque.",
        areasProtegidas: "Área de recreación Piamonte / DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Deforestación de bosques tropicales y pérdida de plantas hospederas.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    66: {
        name: "Mariposa Actinote",
        descripcion: "Su cuerpo es negro con manchas blancas en el tórax y sus alas son de color anaranjado intenso con bordes negros bien definidos.",
        funcionEcologica: "Polinizadora y parte de redes tróficas de aves y reptiles.",
        areasProtegidas: "Área de recreación Piamonte / DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Deforestación de bosques tropicales y pérdida de plantas hospederas.",
        estadoIUCN: "Datos Insuficientes (DD)."
    },
    67: {
        name: "Mariposa transparente",
        descripcion: "Conocida como \"alas de cristal\" posee un cuerpo delgado y marrón que se distingue por sus alas transparentes bordeadas de marrón oscuro y blanco.",
        funcionEcologica: "Polinizadora sigilosa; importante en selvas tropicales.",
        areasProtegidas: "Área de recreación Piamonte / DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Deforestación de bosques tropicales y pérdida de plantas hospederas.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    68: {
        name: "Abeja angelita",
        descripcion: "Conocida como \"angelita\", mide entre 4 y 5 mm, con cuerpo pequeño de color dorado a marrón claro. Sus alas son transparentes y, al no tener aguijón, es una especie dócil muy utilizada en la meliponicultura.",
        funcionEcologica: "Polinizadora fundamental de plantas nativas.",
        areasProtegidas: "Área de recreación Piamonte / DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Deforestación de bosques tropicales y pérdida de plantas hospederas.",
        estadoIUCN: "Datos Insuficientes (DD)."
    },
    69: {
        name: "Abeja euglosina negra con bandas naranjas",
        descripcion: "Abeja con cuerpo robusto y negro brillante adornado por bandas anaranjadas en el abdomen, tiene alas son oscuras y traslúcidas.",
        funcionEcologica: "Polinizadora de orquídeas y plantas de bosque húmedo.",
        areasProtegidas: "Área de recreación Piamonte.",
        amenazas: "Pérdida de cavidades para nidificación y deforestación.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    70: {
        name: "Zorro perro",
        descripcion: "Mide entre 60 y 70 cm de longitud, tiene un pelaje grisáceo mezclado con tonos pardos y negros. Su hocico es oscuro y alargado, las patas son negruzcas y la cola es poblada con punta negra.",
        funcionEcologica: "Regula poblaciones de pequeños vertebrados e insectos; dispersor de semillas.",
        areasProtegidas: "Área de recreación Piamonte.",
        amenazas: "Atropellamientos, pérdida de hábitat, cacería por conflictos con humanos y enfermedades transmitidas por perros.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    71: {
        name: "Zarigüeya común",
        descripcion: "Tiene un pelaje grisáceo con tonos blancos y negros. Su rostro es blanco con orejas oscuras, la cola es larga, desnuda y prensil, y posee un hocico alargado con bigotes prominentes.",
        funcionEcologica: "Controlador de insectos y pequeños vertebrados; dispersor de semillas.",
        areasProtegidas: "Área de recreación Piamonte / DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Atropellamientos, persecución por creencias negativas, depredación por perros y gatos.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    72: {
        name: "Zarigüeya orejiblanca andina",
        descripcion: "Presenta un pelaje espeso de color gris oscuro a negruzco. Su rostro es claro con orejas negras y ojos de aspecto oscuro, y posee una cola larga y prensil.",
        funcionEcologica: "Controlador de insectos y carroñero; dispersor de semillas.",
        areasProtegidas: "DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Deforestación de bosques andinos, atropellamientos y cacería ocasional.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    73: {
        name: "Ardilla Colorada",
        descripcion: "Tiene un pelaje de tonos rojizos, cafés o grisáceos según la región. Su cola es larga, poblada y esponjosa, y presenta ojos grandes y oscuros.",
        funcionEcologica: "Dispersor de semillas y frutos; contribuye a la regeneración forestal.",
        areasProtegidas: "Área de recreación Piamonte / DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Pérdida de bosques, cacería ocasional y atropellamientos.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    74: {
        name: "Armadillo de nueve bandas",
        descripcion: "Tiene un cuerpo cubierto por un caparazón marrón grisáceo formado por placas articuladas, donde destacan nueve bandas móviles en el tronco. Su hocico es alargado con orejas grandes y posee una cola larga también protegida por placas.",
        funcionEcologica: "Control biológico de insectos; aireación del suelo por su hábito de excavar.",
        areasProtegidas: "Páramo de las Baldías, San Felix.",
        amenazas: "Cacería por carne, atropellamientos y pérdida de hábitat.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    75: {
        name: "Murciélago frugívoro grande",
        descripcion: "Tiene un pelaje marrón oscuro a grisáceo y una franja blanca en el rostro que lo caracteriza. Sus ojos son grandes y oscuros, el hocico es ancho, y las alas son negras.",
        funcionEcologica: "Polinizador y dispersor de semillas clave en ecosistemas tropicales.",
        areasProtegidas: "Área de recreación Piamonte / DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Deforestación que reduce árboles frutales, persecución por mitos y pérdida de refugios.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    76: {
        name: "Iguana verde",
        descripcion: "Tiene un cuerpo verde brillante a grisáceo, cubierto de escamas. Presenta una cresta de espinas dorsales, papada colgante bajo la garganta y cola larga y robusta con franjas oscuras.",
        funcionEcologica: "Dispersora de semillas; contribuye al control de vegetación.",
        areasProtegidas: "Área de recreación Piamonte / DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Cacería por carne y huevos, tráfico ilegal como mascota y pérdida de hábitat ribereño.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    77: {
        name: "Basilisco común",
        descripcion: "Su cuerpo es verde oliváceo a marrón, frecuentemente con líneas o manchas claras. Posee una cresta dorsal y craneal prominente, patas largas y una cola delgada y extensa, que le permite correr incluso sobre el agua.",
        funcionEcologica: "Controlador de insectos y pequeños vertebrados.",
        areasProtegidas: "DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Depredación por perros y gatos y contaminación de cuerpos de agua.",
        estadoIUCN: "Preocupación menor (LC)."
    },
    78: {
        name: "Anolis de Medellín",
        descripcion: "Su cuerpo es verde oliváceo a marrón claro, capaz de variar de tonalidad según el ambiente. Presenta un pliegue gular (papada) anaranjado o amarillento en los machos y una cola larga y delgada.",
        funcionEcologica: "Controlador de insectos; parte de la dieta de aves y serpientes.",
        areasProtegidas: "Área de recreación Piamonte / DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Deforestación y urbanización en zonas andinas.",
        estadoIUCN: "Datos Insuficientes (DD)."
    },
    79: {
        name: "Serpiente corredora de Daniel",
        descripcion: "Su cuerpo es delgado de color marrón oliváceo y una línea clara que recorre longitudinalmente sus costados. Su cabeza es alargada y ligeramente diferenciada del cuello, y sus ojos son grandes y oscuros.",
        funcionEcologica: "Controlador de poblaciones de anfibios y reptiles.",
        areasProtegidas: "Área de recreación Piamonte / DRMI Cerro Quitasol - La Holanda.",
        amenazas: "Persecución directa por miedo a serpientes, pérdida de hábitat y atropellamientos.",
        estadoIUCN: "Preocupación menor (LC)."
    },
};

// ==========================================================
// CARGAR ANIMALES
// ==========================================================

async function loadAnimals() {

    try {

        const response = await fetch("./initialcategories.json");

        if (!response.ok) {
            throw new Error(
                "No se pudo cargar initialcategories.json"
            );
        }

        animals = await response.json();

        console.log(
            "FAUNO BELO: animales cargados correctamente:",
            animals
        );

        return animals;

    } catch (error) {

        console.error(
            "Error cargando las especies:",
            error
        );

        animals = [];

        return [];
    }
}

// ==========================================================
// OBTENER TODAS LAS ESPECIES
// ==========================================================

function getAllSpecies() {

    const result = [];

    if (!Array.isArray(animals)) {
        return result;
    }

    for (const category of animals) {

        if (
            !category ||
            !Array.isArray(category.especies)
        ) {
            continue;
        }

        for (const specie of category.especies) {

            result.push({
                ...specie,

                category:
                    specie.category ||
                    specie.categoria ||
                    category.category ||
                    category.categoria ||
                    category.nombre ||
                    category.name ||
                    "Sin categoría"
            });
        }
    }

    return result;
}

// ==========================================================
// NAVEGACIÓN ENTRE SECCIONES
// ==========================================================

function showSection(sectionId) {

    const sections = [
        "home",
        "categories",
        "authSection",
        "userProfileSection",
        "reportSection",
        "gameSection"
    ];

    sections.forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {
            element.classList.add("hidden");
        }

    });

    const target =
        document.getElementById(sectionId);

    if (target) {
        target.classList.remove("hidden");
    }
}

// ==========================================================
// ESCAPAR HTML
// ==========================================================

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// ==========================================================
// LEER UNA FOTO SELECCIONADA COMO BASE64
// (usada en el formulario de "Reportar avistamiento")
// ==========================================================

function readFileAsDataURL(file) {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result);
        };

        reader.onerror = () => {
            reject(reader.error);
        };

        reader.readAsDataURL(file);
    });
}

// ==========================================================
// SABER SI UNA ESPECIE ESTÁ EN FAVORITOS
// ==========================================================

function isFavorite(specieId) {

    return favorites.includes(
        String(specieId)
    );
}

// ==========================================================
// GUARDAR FAVORITOS
// ==========================================================

function saveFavorites() {

    localStorage.setItem(
        "faunoBeloFavorites",
        JSON.stringify(favorites)
    );
}

// ==========================================================
// ALTERNAR FAVORITO
// ==========================================================

function toggleFavorite(specieId) {

    const id = String(specieId);

    const index =
        favorites.indexOf(id);

    if (index === -1) {

        favorites.push(id);

    } else {

        favorites.splice(index, 1);
    }

    saveFavorites();

    displayAnimals(
        getAllSpecies()
    );

    updateProfileStats();
}

// ==========================================================
// MOSTRAR ANIMALES
// ==========================================================

function displayAnimals(speciesList) {

    const container =
        document.getElementById(
            "exploreCategories"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    if (
        !Array.isArray(speciesList) ||
        speciesList.length === 0
    ) {

        container.innerHTML = `
            <div class="noResults">
                No se encontraron especies.
            </div>
        `;

        return;
    }

    for (const specie of speciesList) {

        const div =
            document.createElement("div");

        div.classList.add("animalCard");

        div.dataset.id =
            specie.id ?? "";

        const id =
            String(specie.id ?? "");

        const image =
            specie.img ||
            specie.image ||
            specie.imagen ||
            "";

        const name =
            specie.name ||
            specie.nombre ||
            "Especie sin nombre";

        const scientificName =
            specie.scientificName ||
            specie.nombreCientifico ||
            specie.scientific_name ||
            "Nombre científico no disponible";

        const category =
            specie.category ||
            specie.categoria ||
            "Sin categoría";

        const favorite =
            isFavorite(id);

        div.innerHTML = `

            <div class="animalImgContainer">
                <img
                    class="animalImg"
                    src="${escapeHTML(image)}"
                    alt="${escapeHTML(name)}"
                    loading="lazy"
                >
            </div>

            <div class="animalInfo">
                <h4>
                    ${escapeHTML(name)}
                </h4>

                <p class="animalScientificName">
                    ${escapeHTML(scientificName)}
                </p>

                <span class="animalCategory">
                    ${escapeHTML(category)}
                </span>

                <div class="animalActions">
                    <button
                        type="button"
                        class="favoriteBtn ${
                            favorite
                                ? "isFavorite"
                                : ""
                        }"
                        data-action="favorite"
                        data-id="${escapeHTML(id)}"
                    >
                        ${
                            favorite
                                ? "♥ En favoritos"
                                : "♡ Agregar a favoritos"
                        }
                    </button>

                    <button
                        type="button"
                        class="infoBtn"
                        data-action="info"
                        data-id="${escapeHTML(id)}"
                    >
                        ℹ Más información
                    </button>
                </div>
            </div>
        `;

        const favoriteBtn =
            div.querySelector(
                '[data-action="favorite"]'
            );

        favoriteBtn.addEventListener(
            "click",
            function () {
                toggleFavorite(
                    this.dataset.id
                );
            }
        );

        const infoBtn =
            div.querySelector(
                '[data-action="info"]'
            );

        infoBtn.addEventListener(
            "click",
            function () {
                const selected =
                    getAllSpecies().find(
                        animal =>
                            String(animal.id) ===
                            String(this.dataset.id)
                    );

                if (selected) {
                    openSpeciesModal(selected);
                }
            }
        );

        container.appendChild(div);
    }
}

// ==========================================================
// MODAL DE INFORMACIÓN (INTEGRADO CON LA GUÍA)
// ==========================================================

function openSpeciesModal(specie) {

    const modal =
        document.getElementById(
            "speciesModal"
        );

    const modalBody =
        document.getElementById(
            "modalBody"
        );

    if (!modal || !modalBody) {
        return;
    }

    const image =
        specie.img ||
        specie.image ||
        specie.imagen ||
        "";

    const name =
        specie.name ||
        specie.nombre ||
        "Especie";

    const scientificName =
        specie.scientificName ||
        specie.nombreCientifico ||
        specie.scientific_name ||
        "No disponible";

    const category =
        specie.category ||
        specie.categoria ||
        "Sin categoría";

    let description =
        specie.description ||
        specie.descripcion ||
        specie.desc ||
        "";

    // Si el JSON no tiene descripción, la busca en el diccionario de la guía
    if (!description) {
        for (const key in speciesDescriptions) {
            if (
                name.toLowerCase().includes(key.toLowerCase()) ||
                key.toLowerCase().includes(name.toLowerCase())
            ) {
                description = speciesDescriptions[key];
                break;
            }
        }
    }

    // Busca la ficha completa de la especie en el diccionario extendido
    // (función ecológica, áreas protegidas, amenazas, estado IUCN).
    // Se busca primero por "id" (coincide exactamente con initialcategories.json)
    // y solo si no hay id se intenta por nombre, como respaldo.
    let extraInfo = null;

    if (specie.id !== undefined && speciesExtraInfoById[specie.id]) {
        extraInfo = speciesExtraInfoById[specie.id];
    } else {
        for (const key in speciesExtraInfoById) {
            const entry = speciesExtraInfoById[key];

            if (
                entry.name &&
                (
                    name.toLowerCase().includes(entry.name.toLowerCase()) ||
                    entry.name.toLowerCase().includes(name.toLowerCase())
                )
            ) {
                extraInfo = entry;
                break;
            }
        }
    }

    // Si aún no hay descripción, usa la del diccionario extendido
    if (!description && extraInfo && extraInfo.descripcion) {
        description = extraInfo.descripcion;
    }

    const habitat =
        specie.habitat ||
        specie.hábitat ||
        specie.habitatNatural ||
        "";

    const distribution =
        specie.distribution ||
        specie.distribucion ||
        specie.distribución ||
        "";

    const diet =
        specie.diet ||
        specie.dieta ||
        "";

    let conservation =
        specie.conservation ||
        specie.conservacion ||
        specie.conservación ||
        specie.estadoConservacion ||
        "";

    // Si el JSON no trae estado de conservación, usa el de la guía (Estado IUCN)
    if (!conservation && extraInfo && extraInfo.estadoIUCN) {
        conservation = extraInfo.estadoIUCN;
    }

    const curiosity =
        specie.curiosity ||
        specie.curiosidad ||
        specie.datoCurioso ||
        "";

    const ecologicalFunction =
        specie.ecologicalFunction ||
        specie.funcionEcologica ||
        specie.función_ecológica ||
        (extraInfo ? extraInfo.funcionEcologica : "") ||
        "";

    const protectedAreas =
        specie.protectedAreas ||
        specie.areasProtegidas ||
        specie.áreas_protegidas ||
        (extraInfo ? extraInfo.areasProtegidas : "") ||
        "";

    const threats =
        specie.threats ||
        specie.amenazas ||
        (extraInfo ? extraInfo.amenazas : "") ||
        "";

    let informationHTML = "";

    if (description) {
        informationHTML += `
            <div class="modalInfoBlock">
                <strong>Descripción</strong>
                <span>
                    ${escapeHTML(description)}
                </span>
            </div>
        `;
    }

    if (habitat) {
        informationHTML += `
            <div class="modalInfoBlock">
                <strong>Hábitat</strong>
                <span>
                    ${escapeHTML(habitat)}
                </span>
            </div>
        `;
    }

    if (distribution) {
        informationHTML += `
            <div class="modalInfoBlock">
                <strong>Distribución</strong>
                <span>
                    ${escapeHTML(distribution)}
                </span>
            </div>
        `;
    }

    if (diet) {
        informationHTML += `
            <div class="modalInfoBlock">
                <strong>Alimentación</strong>
                <span>
                    ${escapeHTML(diet)}
                </span>
            </div>
        `;
    }

    if (conservation) {
        informationHTML += `
            <div class="modalInfoBlock">
                <strong>Estado de conservación</strong>
                <span>
                    ${escapeHTML(conservation)}
                </span>
            </div>
        `;
    }

    if (curiosity) {
        informationHTML += `
            <div class="modalInfoBlock">
                <strong>Dato curioso</strong>
                <span>
                    ${escapeHTML(curiosity)}
                </span>
            </div>
        `;
    }

    if (ecologicalFunction) {
        informationHTML += `
            <div class="modalInfoBlock">
                <strong>Función ecológica</strong>
                <span>
                    ${escapeHTML(ecologicalFunction)}
                </span>
            </div>
        `;
    }

    if (protectedAreas) {
        informationHTML += `
            <div class="modalInfoBlock">
                <strong>Áreas protegidas</strong>
                <span>
                    ${escapeHTML(protectedAreas)}
                </span>
            </div>
        `;
    }

    if (threats) {
        informationHTML += `
            <div class="modalInfoBlock">
                <strong>Amenazas</strong>
                <span>
                    ${escapeHTML(threats)}
                </span>
            </div>
        `;
    }

    if (!informationHTML) {
        informationHTML = `
            <div class="modalInfoBlock">
                <strong>Información</strong>
                <span>
                    Próximamente habrá más información
                    sobre esta especie.
                </span>
            </div>
        `;
    }

    modalBody.innerHTML = `
        <img
            class="modalAnimalImage"
            src="${escapeHTML(image)}"
            alt="${escapeHTML(name)}"
        >

        <h2 class="modalTitle">
            ${escapeHTML(name)}
        </h2>

        <div class="modalScientific">
            ${escapeHTML(scientificName)}
        </div>

        <span class="modalCategory">
            ${escapeHTML(category)}
        </span>

        ${informationHTML}
    `;

    modal.classList.remove("hidden");
}

// ==========================================================
// CERRAR MODAL
// ==========================================================

function closeSpeciesModal() {

    const modal =
        document.getElementById(
            "speciesModal"
        );

    if (modal) {
        modal.classList.add("hidden");
    }
}

// ==========================================================
// BÚSQUEDA
// ==========================================================

function filterAnimals() {

    const searchInput =
        document.getElementById(
            "filter"
        );

    const filterSelect =
        document.getElementById(
            "filterCat"
        );

    if (!searchInput) {
        return;
    }

    const search =
        searchInput.value
            .trim()
            .toLowerCase();

    const selectedType =
        filterSelect
            ? filterSelect.value
            : "catego";

    const allSpecies =
        getAllSpecies();

    if (!search) {
        displayAnimals(
            allSpecies
        );
        return;
    }

    const filtered =
        allSpecies.filter(
            specie => {

                const name =
                    String(
                        specie.name ||
                        specie.nombre ||
                        ""
                    ).toLowerCase();

                const scientific =
                    String(
                        specie.scientificName ||
                        specie.nombreCientifico ||
                        ""
                    ).toLowerCase();

                const category =
                    String(
                        specie.category ||
                        specie.categoria ||
                        ""
                    ).toLowerCase();

                if (
                    selectedType ===
                    "name"
                ) {
                    return name.includes(
                        search
                    );
                }

                if (
                    selectedType ===
                    "sciNa"
                ) {
                    return scientific.includes(
                        search
                    );
                }

                return (
                    name.includes(search) ||
                    scientific.includes(search) ||
                    category.includes(search)
                );

            }
        );

    displayAnimals(filtered);
}

// ==========================================================
// MOSTRAR TODAS
// ==========================================================

function showAllAnimals() {

    const searchInput =
        document.getElementById(
            "filter"
        );

    if (searchInput) {
        searchInput.value = "";
    }

    displayAnimals(
        getAllSpecies()
    );
}

// ==========================================================
// BOTÓN CATEGORÍAS
// ==========================================================

function showCategories() {

    const allSpecies =
        getAllSpecies();

    const categories =
        [
            ...new Set(
                allSpecies.map(
                    animal =>
                        animal.category
                )
            )
        ];

    if (categories.length === 0) {
        displayAnimals(
            allSpecies
        );
        return;
    }

    const container =
        document.getElementById(
            "exploreCategories"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    categories.forEach(
        category => {

            const button =
                document.createElement(
                    "button"
                );

            button.type = "button";
            button.className = "see";
            button.textContent =
                category;

            button.addEventListener(
                "click",
                () => {
                    const filtered =
                        allSpecies.filter(
                            animal =>
                                animal.category ===
                                category
                        );

                    displayAnimals(
                        filtered
                    );
                }
            );

            container.appendChild(
                button
            );

        }
    );
}

// ==========================================================
// ESTADÍSTICAS DEL PERFIL
// ==========================================================

function updateProfileStats() {

    const favoritesElement =
        document.getElementById(
            "statFavorites"
        );

    if (favoritesElement) {
        favoritesElement.textContent =
            favorites.length;
    }

    const reportsElement =
        document.getElementById(
            "statReports"
        );

    if (reportsElement) {
        const reports =
            JSON.parse(
                localStorage.getItem(
                    "faunoBeloReports"
                ) || "[]"
            );

        reportsElement.textContent =
            reports.length;
    }
}

// ==========================================================
// LOGIN / PERFIL
// ==========================================================

function updateProfileView() {

    const profileBtnText =
        document.getElementById(
            "profileBtnText"
        );

    const userNameDisplay =
        document.getElementById(
            "userNameDisplay"
        );

    if (currentUser) {
        if (profileBtnText) {
            profileBtnText.textContent =
                currentUser;
        }

        if (userNameDisplay) {
            userNameDisplay.textContent =
                currentUser;
        }
    } else {
        if (profileBtnText) {
            profileBtnText.textContent =
                "Perfil";
        }
    }

    updateProfileStats();
}

// ==========================================================
// LÓGICA DE LA TRIVIA (JUEGO)
// ==========================================================

let gameScore = 0;
let currentCorrectAnswer = null;

function startTriviaGame() {
    const allSpecies = getAllSpecies();
    
    if (!allSpecies || allSpecies.length === 0) {
        return;
    }

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
    startTriviaGame();
}

function updateGameScoreDisplay() {
    const scoreElement = document.getElementById("currentScore");
    if (scoreElement) {
        scoreElement.textContent = gameScore;
    }
}

// ==========================================================
// DOM READY
// ==========================================================

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        showSection("home");
        updateProfileView();

        await loadAnimals();

        const profileBtn =
            document.getElementById(
                "profile"
            );

        if (profileBtn) {
            profileBtn.addEventListener(
                "click",
                () => {
                    if (currentUser) {
                        showSection(
                            "userProfileSection"
                        );
                    } else {
                        showSection(
                            "authSection"
                        );
                    }
                }
            );
        }

        const exploreBtn =
            document.getElementById(
                "explore"
            );

        if (exploreBtn) {
            exploreBtn.addEventListener(
                "click",
                () => {
                    showSection(
                        "categories"
                    );
                    displayAnimals(
                        getAllSpecies()
                    );
                }
            );
        }

        const reportBtn =
            document.getElementById(
                "report"
            );

        if (reportBtn) {
            reportBtn.addEventListener(
                "click",
                () => {
                    showSection(
                        "reportSection"
                    );
                }
            );
        }

        const backButtons = [
            "authBack",
            "profileBack",
            "reportBack"
        ];

        backButtons.forEach(
            buttonId => {
                const button =
                    document.getElementById(
                        buttonId
                    );

                if (button) {
                    button.addEventListener(
                        "click",
                        () => {
                            showSection(
                                "home"
                            );
                        }
                    );
                }
            }
        );

        const backExplore =
            document.getElementById(
                "back"
            );

        if (backExplore) {
            backExplore.addEventListener(
                "click",
                () => {
                    showSection(
                        "home"
                    );
                }
            );
        }

        const playBtn =
            document.getElementById(
                "play"
            );

        if (playBtn) {
            playBtn.addEventListener(
                "click",
                () => {
                    showSection(
                        "gameSection"
                    );
                    startTriviaGame();
                }
            );
        }

        const gameBackBtn =
            document.getElementById(
                "gameBack"
            );

        if (gameBackBtn) {
            gameBackBtn.addEventListener(
                "click",
                () => {
                    showSection(
                        "categories"
                    );
                    displayAnimals(
                        getAllSpecies()
                    );
                }
            );
        }

        const allBtn =
            document.getElementById(
                "all"
            );

        if (allBtn) {
            allBtn.addEventListener(
                "click",
                showAllAnimals
            );
        }

        const categoriesBtn =
            document.getElementById(
                "categoriesBtn"
            );

        if (categoriesBtn) {
            categoriesBtn.addEventListener(
                "click",
                showCategories
            );
        }

        const filterInput =
            document.getElementById(
                "filter"
            );

        if (filterInput) {
            filterInput.addEventListener(
                "input",
                filterAnimals
            );
        }

        const filterCat =
            document.getElementById(
                "filterCat"
            );

        if (filterCat) {
            filterCat.addEventListener(
                "change",
                filterAnimals
            );
        }

        const closeModal =
            document.getElementById(
                "closeModal"
            );

        if (closeModal) {
            closeModal.addEventListener(
                "click",
                closeSpeciesModal
            );
        }

        const speciesModal =
            document.getElementById(
                "speciesModal"
            );

        if (speciesModal) {
            speciesModal.addEventListener(
                "click",
                event => {
                    if (
                        event.target ===
                        speciesModal
                    ) {
                        closeSpeciesModal();
                    }
                }
            );
        }

        document.addEventListener(
            "keydown",
            event => {
                if (
                    event.key === "Escape"
                ) {
                    closeSpeciesModal();
                }
            }
        );

        const showRegister =
            document.getElementById(
                "showRegister"
            );

        const showLogin =
            document.getElementById(
                "showLogin"
            );

        const loginBox =
            document.getElementById(
                "loginBox"
            );

        const registerBox =
            document.getElementById(
                "registerBox"
            );

        if (
            showRegister &&
            showLogin &&
            loginBox &&
            registerBox
        ) {
            showRegister.addEventListener(
                "click",
                event => {
                    event.preventDefault();
                    loginBox.classList.add(
                        "hidden"
                    );
                    registerBox.classList.remove(
                        "hidden"
                    );
                }
            );

            showLogin.addEventListener(
                "click",
                event => {
                    event.preventDefault();
                    registerBox.classList.add(
                        "hidden"
                    );
                    loginBox.classList.remove(
                        "hidden"
                    );
                }
            );
        }

        const registerForm =
            document.getElementById(
                "registerForm"
            );

        if (registerForm) {
            registerForm.addEventListener(
                "submit",
                event => {
                    event.preventDefault();

                    const username =
                        document.getElementById(
                            "regUser"
                        ).value.trim();

                    const password =
                        document.getElementById(
                            "regPass"
                        ).value;

                    if (!username || !password) {
                        return;
                    }

                    localStorage.setItem(
                        "faunoBeloAccount",
                        JSON.stringify({
                            username,
                            password
                        })
                    );

                    alert(
                        "Cuenta creada correctamente."
                    );

                    document.getElementById(
                        "loginUser"
                    ).value = username;

                    registerBox.classList.add(
                        "hidden"
                    );

                    loginBox.classList.remove(
                        "hidden"
                    );
                }
            );
        }

        const loginForm =
            document.getElementById(
                "loginForm"
            );

        if (loginForm) {
            loginForm.addEventListener(
                "submit",
                event => {
                    event.preventDefault();

                    const username =
                        document.getElementById(
                            "loginUser"
                        ).value.trim();

                    const password =
                        document.getElementById(
                            "loginPass"
                        ).value;

                    const account =
                        JSON.parse(
                            localStorage.getItem(
                                "faunoBeloAccount"
                            ) || "null"
                        );

                    if (
                        account &&
                        account.username === username &&
                        account.password === password
                    ) {
                        currentUser =
                            username;

                        localStorage.setItem(
                            "faunoBeloUser",
                            currentUser
                        );

                        updateProfileView();

                        alert(
                            "Sesión iniciada correctamente."
                        );

                        showSection(
                            "userProfileSection"
                        );
                    } else {
                        alert(
                            "Usuario o contraseña incorrectos."
                        );
                    }
                }
            );
        }

        const logoutBtn =
            document.getElementById(
                "logoutBtn"
            );

        if (logoutBtn) {
            logoutBtn.addEventListener(
                "click",
                () => {
                    currentUser = null;

                    localStorage.removeItem(
                        "faunoBeloUser"
                    );

                    updateProfileView();

                    showSection(
                        "home"
                    );
                }
            );
        }

        const reportPhotoInput =
            document.getElementById(
                "reportPhoto"
            );

        const reportPhotoPreview =
            document.getElementById(
                "reportPhotoPreview"
            );

        if (reportPhotoInput && reportPhotoPreview) {
            reportPhotoInput.addEventListener(
                "change",
                () => {
                    const file =
                        reportPhotoInput.files[0];

                    if (!file) {
                        reportPhotoPreview.src = "";
                        reportPhotoPreview.classList.add(
                            "hidden"
                        );
                        return;
                    }

                    readFileAsDataURL(file)
                        .then(dataUrl => {
                            reportPhotoPreview.src =
                                dataUrl;

                            reportPhotoPreview.classList.remove(
                                "hidden"
                            );
                        })
                        .catch(() => {
                            reportPhotoPreview.src = "";
                            reportPhotoPreview.classList.add(
                                "hidden"
                            );
                        });
                }
            );
        }

        const reportForm =
            document.getElementById(
                "reportForm"
            );

        if (reportForm) {
            reportForm.addEventListener(
                "submit",
                async event => {
                    event.preventDefault();

                    let photoData = "";

                    const photoFile =
                        reportPhotoInput &&
                        reportPhotoInput.files &&
                        reportPhotoInput.files[0];

                    if (photoFile) {
                        try {
                            photoData =
                                await readFileAsDataURL(
                                    photoFile
                                );
                        } catch (error) {
                            console.error(
                                "No se pudo leer la foto del avistamiento:",
                                error
                            );
                        }
                    }

                    const report = {
                        species:
                            document.getElementById(
                                "reportSpecies"
                            ).value,

                        location:
                            document.getElementById(
                                "reportLocation"
                            ).value,

                        date:
                            document.getElementById(
                                "reportDate"
                            ).value,

                        notes:
                            document.getElementById(
                                "reportNotes"
                            ).value,

                        photo: photoData,

                        user:
                            currentUser || "Visitante",

                        createdAt:
                            new Date().toISOString()
                    };

                    const reports =
                        JSON.parse(
                            localStorage.getItem(
                                "faunoBeloReports"
                            ) || "[]"
                        );

                    reports.push(report);

                    localStorage.setItem(
                        "faunoBeloReports",
                        JSON.stringify(reports)
                    );

                    updateProfileStats();

                    alert(
                        "¡Avistamiento registrado correctamente!"
                    );

                    reportForm.reset();

                    if (reportPhotoPreview) {
                        reportPhotoPreview.src = "";
                        reportPhotoPreview.classList.add(
                            "hidden"
                        );
                    }

                    showSection(
                        "home"
                    );
                }
            );
        }

    }
);
