// Configuración Global de la Aplicación
const CONFIG = {
    siteName: 'Caminando Otro Sendero',
    company: {
        name: 'Caminando Otro Sendero SpA',
        rut: '76.932.987-0',
        founder: 'Luis E. Carrera Suárez',
        founded: 2018,
        description: 'Consultoría ambiental, investigación científica y educación ambiental en Chile',
    },
    contact: {
        email: 'luis.carrera.suarez@caminandootrosendero.cl',
        emailAlt: 'eleuiese@gmail.com',
        phone: '+56 9 9793 5170',
        whatsapp: '+56997935170',
    },
    social: {
        instagram: 'https://www.instagram.com/caminando_otro_sendero/',
    },
    navigation: [
        { label: 'Inicio', url: 'index.html' },
        { label: 'Servicios', url: 'pages/servicios.html', submenu: true },
        { label: 'Nosotros', url: 'pages/sobre-nosotros.html' },
        { label: 'Blog', url: 'pages/blog.html' },
        { label: 'Contacto', url: 'pages/contacto.html' },
    ],
    services: [
        {
            id: 'linea-base-terrestres',
            title: 'Línea Base de Invertebrados Terrestres',
            icon: '🦗',
            description: 'Realizamos la línea base de Invertebrados terrestres (Entomofauna, Artrópodos) para Estudios de Impacto Ambiental (EIA) y Declaraciones de Impacto Ambiental (DIA).',
            features: [
                'Trámite de permiso de captura',
                'Diseño y ejecución de muestreo',
                'Análisis taxonómico',
                'Informe técnico',
            ]
        },
        {
            id: 'taxonomia-acuatica',
            title: 'Taxonomía de Invertebrados Acuáticos',
            icon: '🐠',
            description: 'Análisis taxonómico de muestras de: Fitobentos, Zoobentos, Fitoplancton, Zooplancton y Peces de ecosistemas continentales y salares.',
            features: [
                'Metodología científica rigurosa',
                'Análisis de ecosistemas acuáticos',
                'Estudios de impacto ambiental',
                'Informes técnicos especializados',
            ]
        },
        {
            id: 'capacitaciones',
            title: 'Charlas y Capacitaciones',
            icon: '📚',
            description: 'Capacitaciones especializadas en metodologías de muestreo, taxonomía, entomología y disciplinas ambientales.',
            features: [
                'Talleres personalizados',
                'Metodologías de muestreo',
                'Taxonomía avanzada',
                'Entomología aplicada',
            ]
        },
        {
            id: 'educacion-ambiental',
            title: 'Educación Ambiental',
            icon: '🌱',
            description: 'Talleres, charlas y caminatas para colegios, instituciones y público en general. Fomentamos la conexión con la naturaleza y la conciencia ambiental.',
            features: [
                'Caminatas guiadas',
                'Talleres educativos',
                'Charlas ambientales',
                'Actividades experienciales',
            ]
        },
    ],
    publications: [
        {
            year: 2023,
            title: 'Effects of an extreme drought on the feeding ecology of Bubo magellanicus',
            authors: 'Catchpole, Sam, Carrera-Suárez L.E y Reinaldo Vera',
            journal: 'PeerJ',
            url: 'https://doi.org/10.7717/peerj.15020'
        },
        {
            year: 2021,
            title: 'Effects of electrofishing on tadpoles of Calyptocephalella gayi',
            authors: 'Carrera-Suárez L.E. & Catchpole, Sam',
            journal: 'Boletín chileno de herpetología',
            url: 'http://www.boletindeherpetologia.com/uploads/3/2/2/9/32291217/8._carrerasuarez_catchpole2021.pdf'
        },
        {
            year: 2011,
            title: 'Catálogo de los Noctuidae de la Isla Robinson Crusoe',
            authors: 'Carrera-Suárez L.E., T.S. Olivares & A.O. Angulo',
            journal: 'SHILAP, Revista de Lepidopterología',
            url: 'https://www.redalyc.org/pdf/455/45521385008.pdf'
        },
    ],
};

// Utilidades
const UTILS = {
    getCurrentPage: () => {
        return window.location.pathname.split('/').pop() || 'index.html';
    },
    
    getBasePath: () => {
        const path = window.location.pathname;
        // Páginas en /pages/servicios/ necesitan ../../
        if (path.includes('/pages/servicios/')) {
            return '../../';
        }
        // Páginas en /pages/ necesitan ../
        if (path.includes('/pages/')) {
            return '../';
        }
        return './';
    },
};
