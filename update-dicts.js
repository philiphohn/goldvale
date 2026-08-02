const fs = require('fs');

const meta = {
  de: {
    home_title: "Goldvale Studios — Digitalstudio für Websites & Apps",
    home_description: "High-End Websites, App-Entwicklung & Markenstrategie für ambitionierte Unternehmen. Jetzt Erstgespräch vereinbaren.",
    work_title: "Ausgewählte Projekte & Referenzen",
    work_description: "Entdecken Sie unsere digitalen Arbeiten für Kunden wie Tolon House, The Lakeside Loft, Eventboot.de & Filoxenos.gr.",
    services_title: "Leistungen | Websites, Apps & Branding",
    services_description: "Von der Idee bis zum Launch: Maßgeschneiderte Websites, Web-Apps, Design-Systeme und Digitalstrategien aus einer Hand.",
    studio_title: "Das Studio — Digitalstrategie & Engineering",
    studio_description: "Erfahren Sie mehr über unsere Arbeitsweise, Werte und Philosophie für nachhaltigen digitalen Erfolg.",
    journal_title: "Journal — Gedanken & Einblicke zu Webdesign & Tech",
    journal_description: "Gedanken, Leitfäden und Analysen zu Web-Performance, UX-Research, KI und Hospitality-Technologie.",
    contact_title: "Erstgespräch vereinbaren",
    contact_description: "Lassen Sie uns über Ihr nächstes Projekt sprechen. Unverbindliches und kostenloses Erstgespräch mit Gründer Philip Hohn."
  },
  en: {
    home_title: "Goldvale Studios — Digital Studio for Websites & Apps",
    home_description: "High-end websites, app development & brand strategy for ambitious companies. Schedule your intro call.",
    work_title: "Selected Projects & Portfolio",
    work_description: "Explore our digital work for clients including Tolon House, The Lakeside Loft, Eventboot.de & Filoxenos.gr.",
    services_title: "Services | Websites, Web Apps & Branding",
    services_description: "From concept to launch: bespoke websites, web apps, design systems, and digital strategies built for longevity and growth.",
    studio_title: "The Studio — Digital Strategy & Engineering",
    studio_description: "A team of strategic thinkers, designers, and developers with a shared vision: digital excellence and sustainable growth.",
    journal_title: "Journal — Thoughts & Insights on Web Design & Tech",
    journal_description: "Insights, articles, and technical breakdowns on web performance, UX research, AI, and hospitality tech.",
    contact_title: "Book an Intro Call",
    contact_description: "Schedule a free, non-binding consultation about your next digital project with founder Philip Hohn."
  },
  el: {
    home_title: "Goldvale Studios — Ψηφιακό Studio για Websites & Εφαρμογές",
    home_description: "Websites υψηλής απόδοσης, web apps και ψηφιακή στρατηγική για φιλόδοξες επιχειρήσεις. Κλείστε μια πρώτη γνωριμία.",
    work_title: "Επιλεγμένα Έργα & Case Studies",
    work_description: "Δείτε τις ψηφιακές μας δουλειές για πελάτες όπως Tolon House, The Lakeside Loft, Eventboot.de και Filoxenos.gr.",
    services_title: "Υπηρεσίες | Websites, Web Apps & Branding",
    services_description: "Από την ιδέα ως το launch: websites, web apps, design systems και ψηφιακή στρατηγική από μία πηγή.",
    studio_title: "Το Studio — Ψηφιακή Στρατηγική & Engineering",
    studio_description: "Στρατηγική, design και ανάπτυξη από μία πηγή. Γνωρίστε την ομάδα και τις αξίες του Goldvale Studios.",
    journal_title: "Journal — Σκέψεις & Αναλύσεις για Web Design & Τεχνολογία",
    journal_description: "Άρθρα και αναλύσεις για web design, performance, SEO και ψηφιακή στρατηγική.",
    contact_title: "Επικοινωνία & Γνωριμία",
    contact_description: "Μιλήστε μας για το επόμενο ψηφιακό σας project. Κλείστε μια δωρεάν, χωρίς δέσμευση συζήτηση με τον Philip Hohn."
  }
};

['de', 'en', 'el'].forEach(lang => {
  const filePath = `./messages/${lang}.json`;
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const json = JSON.parse(fileContent);
  json.Meta = meta[lang];
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
});

console.log('Dictionaries updated!');
