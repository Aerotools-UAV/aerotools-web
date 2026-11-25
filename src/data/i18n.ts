import { IMAGES } from './images';

export type Lang = 'es' | 'en';

export const ROUTE_PAIRS: Array<{ es: string; en: string }> = [
  { es: '/', en: '/en/' },
  { es: '/contacto', en: '/en/contact' },
  { es: '/aviso-legal', en: '/en/legal-notice' },
  { es: '/politica-de-privacidad', en: '/en/privacy-policy' },
  { es: '/accesibilidad', en: '/en/accessibility' },
  { es: '/mapa-web', en: '/en/sitemap' },
];

export function getAlternatePath(pathname: string, targetLang: Lang): string {
  const normalized = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
  for (const pair of ROUTE_PAIRS) {
    const esNorm = pair.es.length > 1 ? pair.es.replace(/\/$/, '') : pair.es;
    const enNorm = pair.en.length > 1 ? pair.en.replace(/\/$/, '') : pair.en;
    if (normalized === esNorm || normalized === enNorm) {
      return targetLang === 'es' ? pair.es : pair.en;
    }
  }
  return targetLang === 'es' ? '/' : '/en/';
}

export const UI = {
  es: {
    skipToContent: 'Ir al contenido',
    defaultDescription:
      'Aerotools UAV — Ingeniería con drones para aplicaciones industriales, desarrollo de proyectos I+D y operaciones automatizadas con drones.',
    tagline: 'Ingeniería con Drones para aplicaciones industriales',
    nav: [
      { label: 'Drones', href: '/#drones' },
      { label: 'Proyectos', href: '/#proyectos' },
      { label: 'Servicios', href: '/#servicios' },
      { label: 'Contacto', href: '/contacto' },
    ],
    footer: {
      explore: 'Explorar',
      contact: 'Contacto',
      emailCta: 'Déjanos tu email y hablamos',
      emailPlaceholder: 'tu@empresa.com',
      emailLabel: 'Correo electrónico',
      send: 'Enviar',
      legal: [
        { label: 'Aviso Legal', href: '/aviso-legal' },
        { label: 'Privacidad', href: '/politica-de-privacidad' },
        { label: 'Accesibilidad', href: '/accesibilidad' },
        { label: 'Mapa Web', href: '/mapa-web' },
      ],
      rights: 'Todos los derechos reservados.',
    },
    hero: {
      prev: 'Anterior',
      next: 'Siguiente',
      slidesLabel: 'Diapositivas',
      slides: [
        {
          eyebrow: 'DRONES Y SISTEMAS EMBARCADOS',
          title: 'Fusión de tecnologías transversales',
          description:
            'Para usos industriales, agroforestales, de seguridad y defensa. Multirrotores, VTOL, Ala Fija, drones cautivos...',
          image: IMAGES.heroFixedWing,
          ctaLabel: '+ info',
          ctaHref: '/contacto',
        },
        {
          eyebrow: 'CONSORCIOS EUROPEOS Y NACIONALES',
          title: 'Desarrollo de proyectos I+D',
          description:
            'Innovación para la integración de tecnologías innovadoras en nuevos casos de uso. IA, Computer Vision, Edge Computing, Redes 5G y B5G, Cámaras y sensores...',
          image: IMAGES.heroIdDrone,
          ctaLabel: '+ info',
          ctaHref: '/#proyectos',
        },
        {
          eyebrow: 'CAPTURA DE DATOS, PROCESAMIENTO, ANÁLISIS, VISUALIZACIÓN DE RESULTADOS',
          title: 'Operaciones automatizadas con drones',
          description:
            'Para la inspección y monitorización de activos industriales. Solar Fotovoltaica, Instalaciones eléctricas, cubiertas de naves, carreteras, puertos...',
          image: IMAGES.heroSolarPlant,
          ctaLabel: '+ info',
          ctaHref: '/#servicios',
        },
        {
          eyebrow: 'ALCANCE GLOBAL CON PARTNERS LOCALES Y PROCEDIMIENTOS ESTANDARIZADOS',
          title: 'Cobertura mundial de operaciones e inspecciones',
          description: 'Amplia experiencia en más de 12 países.',
          image: IMAGES.heroGlobalMap,
          ctaLabel: '+ info',
          ctaHref: '/contacto',
        },
      ],
    },
    projects: [
      {
        title: 'ATOM - CDTI',
        category: 'I+D · Inspección Inteligente',
        image: IMAGES.proyectoAtomCdti,
      },
      {
        title: 'E-Fly',
        category: 'I+D · Eficiencia y Vuelo',
        image: IMAGES.proyectoEFly,
      },
      {
        title: 'MAT Taludes',
        category: 'I+D · Monitorización Geotécnica',
        image: IMAGES.proyectoMatTaludes,
      },
      {
        title: 'Carreteras',
        category: 'I+D · Infraestructuras Viarias',
        image: IMAGES.proyectoCarreteras,
      },
    ],
    operations: [
      {
        title: 'Inspección de Plantas Fotovoltaicas',
        description:
          'Más de 900 MW inspeccionados en varios países y continentes. Contamos con nuestro Sistema Avanzado para la inspección de grandes plantas fotovoltaicas.',
      },
      {
        title: 'Fotogrametría',
        description:
          'Contamos con personal cualificado y equipos de procesamiento de altas prestaciones para la elaboración de ortomosaicos, modelos de superficie y levantamientos 3D.',
      },
      {
        title: 'Inspección de Líneas Eléctricas',
        description:
          'Contamos con amplia experiencia en la inspección de apoyos y líneas eléctricas de alta tensión.',
      },
      {
        title: 'Inspección de Infraestructuras',
        description:
          'Operaciones de vuelo para la captura de datos con una amplia variedad de sensores.',
      },
      {
        title: 'Aplicaciones Agroforestales',
        description:
          'Tecnologías diseñadas para integrar la agricultura de precisión y la silvicultura.',
      },
      {
        title: 'Vigilancia y Conservación',
        description:
          'Monitorización y protección del medio ambiente y la vida silvestre.',
      },
    ],
  },
  en: {
    skipToContent: 'Skip to content',
    defaultDescription:
      'Aerotools UAV — Drone engineering for industrial applications, R&D projects, and automated UAV inspections worldwide.',
    tagline: 'Drone Engineering for Industrial Applications',
    nav: [
      { label: 'Drones', href: '/en/#drones' },
      { label: 'Projects', href: '/en/#projects' },
      { label: 'Services', href: '/en/#services' },
      { label: 'Contact', href: '/en/contact' },
    ],
    footer: {
      explore: 'Explore',
      contact: 'Contact',
      emailCta: 'Leave us your email and let’s talk',
      emailPlaceholder: 'you@company.com',
      emailLabel: 'Email address',
      send: 'Send',
      legal: [
        { label: 'Legal Notice', href: '/en/legal-notice' },
        { label: 'Privacy Policy', href: '/en/privacy-policy' },
        { label: 'Accessibility', href: '/en/accessibility' },
        { label: 'Sitemap', href: '/en/sitemap' },
      ],
      rights: 'All rights reserved.',
    },
    hero: {
      prev: 'Previous',
      next: 'Next',
      slidesLabel: 'Slides',
      slides: [
        {
          eyebrow: 'DRONES & ONBOARD SYSTEMS',
          title: 'Fusion of cross-cutting technologies',
          description:
            'For industrial, agroforestry, security and defense applications. Multirotors, VTOL, Fixed-Wing, tethered drones...',
          image: IMAGES.heroFixedWing,
          ctaLabel: 'Learn more',
          ctaHref: '/en/contact',
        },
        {
          eyebrow: 'EUROPEAN & NATIONAL CONSORTIA',
          title: 'R&D project development',
          description:
            'Integrating cutting-edge technologies into new industrial use cases: AI, Computer Vision, Edge Computing, 5G & B5G networks, advanced cameras and sensors...',
          image: IMAGES.heroIdDrone,
          ctaLabel: 'Learn more',
          ctaHref: '/en/#projects',
        },
        {
          eyebrow: 'DATA CAPTURE, PROCESSING, ANALYSIS & VISUALIZATION',
          title: 'Automated drone operations',
          description:
            'Inspection and monitoring of industrial assets: utility-scale solar PV plants, power lines, industrial rooftops, roads, ports...',
          image: IMAGES.heroSolarPlant,
          ctaLabel: 'Learn more',
          ctaHref: '/en/#services',
        },
        {
          eyebrow: 'GLOBAL REACH WITH LOCAL PARTNERS & STANDARDIZED PROCEDURES',
          title: 'Worldwide operations & inspection coverage',
          description: 'Proven operational track record across more than 12 countries.',
          image: IMAGES.heroGlobalMap,
          ctaLabel: 'Learn more',
          ctaHref: '/en/contact',
        },
      ],
    },
    projects: [
      {
        title: 'ATOM - CDTI',
        category: 'R&D · Intelligent Inspection',
        image: IMAGES.proyectoAtomCdti,
      },
      {
        title: 'E-Fly',
        category: 'R&D · Flight Efficiency',
        image: IMAGES.proyectoEFly,
      },
      {
        title: 'MAT Taludes',
        category: 'R&D · Geotechnical Monitoring',
        image: IMAGES.proyectoMatTaludes,
      },
      {
        title: 'Roads & Highways',
        category: 'R&D · Road Infrastructure',
        image: IMAGES.proyectoCarreteras,
      },
    ],
    operations: [
      {
        title: 'Solar PV Plant Inspection',
        description:
          'Extensive international experience inspecting utility-scale photovoltaic plants with our proprietary ATOM Advanced Inspection System.',
      },
      {
        title: 'Photogrammetry',
        description:
          'Qualified engineering team and high-performance processing systems for orthomosaics, digital surface models, and 3D surveys.',
      },
      {
        title: 'Power Line Inspection',
        description:
          'Broad experience inspecting high-voltage transmission towers and overhead electrical lines.',
      },
      {
        title: 'Infrastructure Inspection',
        description:
          'Specialized flight operations for data acquisition using a wide variety of radiometric, RGB, and LiDAR sensors.',
      },
      {
        title: 'Agroforestry Applications',
        description:
          'Aerial technologies designed to integrate precision agriculture and sustainable forestry management.',
      },
      {
        title: 'Surveillance & Conservation',
        description:
          'Environmental monitoring and protection of natural habitats and wildlife.',
      },
    ],
  },
} as const;
