const fs = require('fs');

const de = JSON.parse(fs.readFileSync('./messages/de.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('./messages/en.json', 'utf8'));

// Deep detail sections for the subpages
const newContentDe = {
  "WorkDetail": {
    "title": "Unsere Arbeiten",
    "lead": "Digitale Erlebnisse, die Marken stärken und Nutzer begeistern.",
    "cta_title": "Starten wir Ihr nächstes Projekt",
    "cta_desc": "Wir sind immer auf der Suche nach neuen Herausforderungen."
  },
  "ServicesDetail": {
    "title": "Unsere Leistungen",
    "lead": "Von der ersten Idee bis zum fertigen Produkt. Wir begleiten Sie durch den gesamten digitalen Prozess mit Präzision und Weitblick.",
    "process_title": "Unser Ansatz",
    "process_1_title": "Entdeckung",
    "process_1_desc": "Wir analysieren Ihre Marke, Zielgruppe und Wettbewerb, um fundierte Entscheidungen zu treffen.",
    "process_2_title": "Strategie",
    "process_2_desc": "Wir entwickeln einen maßgeschneiderten Fahrplan für Ihren digitalen Erfolg.",
    "process_3_title": "Design & UX",
    "process_3_desc": "Wir gestalten intuitive und ästhetische Interfaces, die begeistern.",
    "process_4_title": "Entwicklung",
    "process_4_desc": "Wir bauen performante und skalierbare Lösungen mit modernen Technologien."
  },
  "StudioDetail": {
    "title": "Das Studio",
    "lead": "Ein Team aus strategischen Denkern, Designern und Entwicklern mit einer gemeinsamen Vision: digitale Exzellenz.",
    "values_title": "Unsere Werte",
    "val_1_title": "Impact",
    "val_1_desc": "Wir schaffen Lösungen, die einen echten Unterschied machen und messbare Ergebnisse liefern.",
    "val_2_title": "Partnerschaft",
    "val_2_desc": "Wir arbeiten eng mit unseren Kunden zusammen und verstehen uns als Teil ihres Teams.",
    "val_3_title": "Langlebigkeit",
    "val_3_desc": "Wir setzen auf zeitloses Design und robuste Architektur für nachhaltigen Erfolg."
  }
};

const newContentEn = {
  "WorkDetail": {
    "title": "Our Work",
    "lead": "Digital experiences that empower brands and delight users.",
    "cta_title": "Let's start your next project",
    "cta_desc": "We are always looking for new challenges."
  },
  "ServicesDetail": {
    "title": "Our Services",
    "lead": "From the first idea to the finished product. We guide you through the entire digital process with precision and vision.",
    "process_title": "Our Approach",
    "process_1_title": "Discovery",
    "process_1_desc": "We analyze your brand, target audience, and competition to make informed decisions.",
    "process_2_title": "Strategy",
    "process_2_desc": "We develop a tailored roadmap for your digital success.",
    "process_3_title": "Design & UX",
    "process_3_desc": "We design intuitive and aesthetic interfaces that inspire.",
    "process_4_title": "Development",
    "process_4_desc": "We build performant and scalable solutions using modern technologies."
  },
  "StudioDetail": {
    "title": "The Studio",
    "lead": "A team of strategic thinkers, designers, and developers with a shared vision: digital excellence.",
    "values_title": "Our Values",
    "val_1_title": "Impact",
    "val_1_desc": "We create solutions that make a real difference and deliver measurable results.",
    "val_2_title": "Partnership",
    "val_2_desc": "We work closely with our clients and see ourselves as part of their team.",
    "val_3_title": "Longevity",
    "val_3_desc": "We rely on timeless design and robust architecture for sustainable success."
  }
};

Object.assign(de, newContentDe);
Object.assign(en, newContentEn);

fs.writeFileSync('./messages/de.json', JSON.stringify(de, null, 2));
fs.writeFileSync('./messages/en.json', JSON.stringify(en, null, 2));

console.log('Translation files updated.');
