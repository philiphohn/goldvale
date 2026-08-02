const fs = require('fs');
const path = require('path');

const otaToolDe = {
  meta_title: "OTA-Provisionsrechner für Hotels & Ferienwohnungen | Goldvale Studios",
  meta_description: "Berechnen Sie, wie viel Provision Sie jährlich an Buchungsplattformen zahlen und wie viel Sie durch mehr Direktbuchungen sparen können.",
  eyebrow: "01 — Provisionsrechner",
  h1: "wie viel zahlen sie jährlich an buchungsplattformen?",
  subtitle: "Berechnen Sie in 60 Sekunden Ihre tatsächlichen Provisionskosten und erfahren Sie, ob sich eine eigene Website für Ihren Betrieb amortisiert.",
  
  property_types: {
    hotel: "Hotel / Boutique Hotel",
    apartments: "Ferienwohnungen / Apartments",
    villa: "Ferienhaus / Villa",
    property_manager: "Property Manager / Agentur"
  },
  
  fields: {
    property_type_label: "Betriebsart",
    units_label: "Anzahl Einheiten / Apartments / Zimmer",
    open_days_label: "Betriebstage pro Jahr",
    occupancy_mode_rate: "Auslastung in %",
    occupancy_mode_nights: "Nächte pro Einheit",
    occupancy_rate_label: "Durchschnittliche Auslastung (%)",
    nights_label: "Belegte Nächte pro Einheit/Jahr",
    adr_label: "Ø Preis pro Nacht (ADR €)",
    ota_share_label: "Anteil Plattformbuchungen (OTA %)",
    ota_commission_label: "Ihre Ø Provision über alle Plattformen (%)",
    more_options: "Genauer rechnen (erweiterte Optionen)",
    less_options: "Weniger Optionen",
    direct_cost_label: "Kosten einer Direktbuchung (Zahlung/Engine %)",
    has_booking_engine: "Booking Engine bereits vorhanden",
    has_channel_manager: "Channel Manager bereits vorhanden"
  },

  scenarios: {
    label: "Szenario: Verlagerung zu Direktbuchungen",
    points_5: "+5 Prozentpunkte",
    points_10: "+10 Prozentpunkte",
    points_15: "+15 Prozentpunkte",
    points_20: "+20 Prozentpunkte"
  },

  results: {
    card1_title: "Geschätzte Jahresprovision",
    card1_sub: "≈ {monthly} € pro Monat",
    card2_title: "Geschätzte Nettoersparnis / Jahr",
    card2_sub: "bei +{points} Prozentpunkten Direktbuchungen",
    card3_title: "Effekt über 3 Jahre",
    card3_sub: "Kumulierte Nettoersparnis",
    card4_title: "Passendes Paket & Amortisation",
    custom_budget: "Orientierungsbudget: ca. {amount} € (18 Monate Amortisation)",
    tier_range: "{low} € – {high} € netto",
    payback_months: "Amortisation in ca. {low}–{high} Monaten",
    payback_single: "Amortisation in ca. {months} Monaten"
  },

  amortization: {
    under_18: "Ein Projekt in dieser Größenordnung wäre unter diesen Annahmen in unter eineinhalb Jahren wieder eingespielt.",
    "19_36": "Die Investition dürfte sich mittelfristig tragen.",
    "37_60": "Rechnerisch dauert die Amortisation länger als drei Jahre. Ein kleinerer Umfang ist wahrscheinlich sinnvoller.",
    not_recommended: "Bei diesen Werten trägt sich ein Website-Projekt über die Provisionsersparnis allein nicht. Wir empfehlen zunächst kleinere Maßnahmen zur Direktbuchungssteigerung."
  },

  recommendations: {
    rec_units_1_3_no_engine: "Eine neue Website mit angebundener Booking Engine genügt. Eine individuelle Buchungsplattform ist nicht nötig.",
    rec_units_4_10_has_cm: "Ihr bestehender Channel Manager lässt sich in der Regel anbinden. Prüfen Sie zuerst die Integration.",
    rec_units_4_10_no_cm: "Ab dieser Größe lohnt die Kombination aus Website, Booking Engine und Channel Manager, damit Verfügbarkeiten synchron bleiben.",
    rec_hotel_11_30: "Entscheidend ist die Anbindung an Ihr bestehendes System. Das klären wir vor dem Design.",
    rec_pm_over_30: "Bei Ihrer Größe entscheidet die Systemarchitektur über das Ergebnis. Erster Schritt ist die Prüfung von PMS und Channel Manager."
  },

  warnings: {
    otaCommissionHigh: "Bitte prüfen Sie diesen Wert für Ihre effektive Provision.",
    occupancyHigh: "Ungewöhnlich hohe Auslastung für Ganzjahresbetrieb.",
    shiftCapped: "Mehr als Ihr aktueller Plattformanteil ist nicht verlagerbar (begrenzt).",
    directCostHigh: "Bei diesen Kosten für Direktbuchungen ergibt sich rechnerisch keine Ersparnis."
  },

  disclaimers: {
    estimation: "Alle Werte sind unverbindliche Schätzungen auf Basis Ihrer Eingaben. Sie stellen keine Zusage über erreichbare Einsparungen dar und ersetzen keine betriebswirtschaftliche, steuerliche oder rechtliche Beratung.",
    pricing: "Richtwerte, netto zzgl. gesetzlicher Umsatzsteuer. Kein verbindliches Angebot; der konkrete Preis richtet sich nach Umfang und Ausgangslage.",
    trademark: "Booking.com, Airbnb und weitere genannte Marken sind eingetragene Marken der jeweiligen Inhaber. Goldvale Studios steht in keiner Geschäfts- oder Partnerschaftsbeziehung zu diesen Unternehmen. Die Nennung erfolgt ausschließlich zu Beschreibungszwecken."
  },

  lead_form: {
    heading: "Möchten Sie eine kostenlose Auswertung mit drei konkreten Maßnahmen für Ihren Betrieb?",
    subheading: "Die Auswertung basiert auf Ihren Rechnereingaben.",
    name_label: "Ihr Name (optional)",
    email_label: "Ihre E-Mail-Adresse *",
    website_label: "Website-Adresse Ihres Betriebs *",
    phone_label: "Telefonnummer (optional)",
    consent_analysis: "Ich stimme zu, dass meine Daten zur Erstellung und Zusendung der Auswertung verarbeitet werden. *",
    consent_newsletter: "Ja, ich möchte gelegentlich nützliche Praxis-Tipps zur Erhöhung von Direktbuchungen per E-Mail erhalten.",
    submit_btn: "Kostenlose Auswertung anfordern",
    submitting: "Wird gesendet...",
    success_title: "Vielen Dank für Ihre Anfrage!",
    success_desc: "Wir prüfen Ihre Eingaben und melden uns innerhalb von zwei Werktagen mit Ihrer individuellen Auswertung.",
    privacy_note: "Ihre Eingaben im Rechner werden erst bei Absenden dieses Formulars übertragen."
  },

  methodology: {
    title: "Methodik & Annahmen",
    p1: "Der Rechner basiert auf der Aufschlüsselung von Bruttoumsatz, Plattformanteil (OTA %) und effektiven Provisionssätzen.",
    p2: "Nettoersparnis berücksichtigt die variablen Eigenkosten einer Direktbuchung (z. B. 1,4–2,5 % Zahlungsanbieter-Gebühren + Booking Engine).",
    p3: "Stand der Richtwerte: August 2026. Alle Berechnungen erfolgen lokal in Ihrem Browser."
  },

  faq: {
    title: "Häufig gestellte Fragen zum Rechner",
    q1: "Sind Direktbuchungen wirklich so viel günstiger als Plattformen?",
    a1: "Ja, da Zahlungsabwicklung und Booking Engine zusammen typischerweise 2–4 % kosten, während Buchungsplattformen 15–25 % Provision verlangen.",
    q2: "Kann eine eigene Website Buchungsplattformen komplett ersetzen?",
    a2: "In der Regel nicht und das ist auch gar nicht das Ziel. Plattformen bieten Reichweite für Erstgäste. Eine eigene Website dient dazu, Stammgäste und gezielte Anfragen ohne Provision direkt zu buchen.",
    q3: "Wie werden die Pakete und Amortisationszeiten berechnet?",
    a3: "Wir vergleichen die geschätzte jährliche Nettoersparnis mit unseren Richtwerten für ein professionelles Website-Projekt inkl. Buchungsintegration.",
    q4: "Wo finde ich meine genaue Provisionsrate?",
    a4: "Ihre tatsächliche Raten- und Gebührenstruktur finden Sie in Ihrem jeweiligen Partner-Extranet bzw. Vertrag."
  },

  teaser: {
    title: "Wie viel Provision zahlen Sie jährlich?",
    subtitle: "Rechnen Sie in 30 Sekunden aus, wie viel Sie sparen können.",
    units_label: "Einheiten",
    adr_label: "Ø Preis / Nacht (€)",
    btn: "Provisionsrechner starten",
    faq_link_text: "Nutzen Sie unseren kostenlosen Provisionsrechner"
  },

  share: {
    btn: "Ergebnis teilen",
    copied: "Link kopiert!"
  }
};

const otaToolEn = {
  meta_title: "OTA Commission Calculator for Hotels & Rentals | Goldvale Studios",
  meta_description: "Calculate how much commission you pay to booking platforms annually and how much you can save with direct bookings.",
  eyebrow: "01 — Commission Calculator",
  h1: "how much do you pay booking platforms every year?",
  subtitle: "Calculate your actual commission costs in 60 seconds and find out if a custom website pays off for your property.",

  property_types: {
    hotel: "Hotel / Boutique Hotel",
    apartments: "Vacation Apartments / Rentals",
    villa: "Villa / Holiday Home",
    property_manager: "Property Manager / Agency"
  },

  fields: {
    property_type_label: "Property Type",
    units_label: "Number of Units / Apartments / Rooms",
    open_days_label: "Operating Days per Year",
    occupancy_mode_rate: "Occupancy Rate (%)",
    occupancy_mode_nights: "Nights per Unit",
    occupancy_rate_label: "Average Occupancy Rate (%)",
    nights_label: "Booked Nights per Unit/Year",
    adr_label: "Average Daily Rate (ADR €)",
    ota_share_label: "Platform Booking Share (OTA %)",
    ota_commission_label: "Average Commission Across Platforms (%)",
    more_options: "Detailed Calculation (Advanced Options)",
    less_options: "Fewer Options",
    direct_cost_label: "Cost per Direct Booking (Payment/Engine %)",
    has_booking_engine: "Booking Engine already available",
    has_channel_manager: "Channel Manager already available"
  },

  scenarios: {
    label: "Scenario: Shift to Direct Bookings",
    points_5: "+5 Percentage Points",
    points_10: "+10 Percentage Points",
    points_15: "+15 Percentage Points",
    points_20: "+20 Percentage Points"
  },

  results: {
    card1_title: "Estimated Annual Commission",
    card1_sub: "≈ {monthly} € per month",
    card2_title: "Estimated Net Savings / Year",
    card2_sub: "at +{points} percentage points direct bookings",
    card3_title: "3-Year Effect",
    card3_sub: "Cumulative Net Savings",
    card4_title: "Recommended Package & Payback",
    custom_budget: "Orientative Budget: approx. {amount} € (18-month payback)",
    tier_range: "{low} € – {high} € net",
    payback_months: "Payback in approx. {low}–{high} months",
    payback_single: "Payback in approx. {months} months"
  },

  amortization: {
    under_18: "A project of this scale would pay for itself in less than 1.5 years under these assumptions.",
    "19_36": "The investment is likely to be viable in the medium term.",
    "37_60": "Payback takes longer than 3 years. A smaller project scope may make more sense.",
    not_recommended: "At these figures, commission savings alone do not justify a website project. We suggest smaller direct booking optimization steps first."
  },

  recommendations: {
    rec_units_1_3_no_engine: "A new website connected to an existing booking engine is sufficient. A custom booking system is not needed.",
    rec_units_4_10_has_cm: "Your existing channel manager can usually be connected. Check integration first.",
    rec_units_4_10_no_cm: "From this size onwards, a website combined with booking engine and channel manager keeps availabilities in sync.",
    rec_hotel_11_30: "Integration with your existing PMS/CMS is key. We clarify this before starting design.",
    rec_pm_over_30: "At your scale, system architecture determines success. Evaluating PMS & channel manager is step one."
  },

  warnings: {
    otaCommissionHigh: "Please verify your effective commission rate.",
    occupancyHigh: "Unusually high occupancy rate for year-round operation.",
    shiftCapped: "Shift capped at your current platform share.",
    directCostHigh: "Direct booking costs equal or exceed commission; no net savings calculated."
  },

  disclaimers: {
    estimation: "All values are non-binding estimates based on your inputs. They do not constitute a guarantee of savings and do not replace professional advice.",
    pricing: "Guide prices, net plus VAT. Not a binding offer; actual pricing depends on scope.",
    trademark: "Booking.com, Airbnb and other mentioned trademarks belong to their respective owners. Goldvale Studios has no affiliation with these companies. Names are used purely for descriptive purposes."
  },

  lead_form: {
    heading: "Would you like a free evaluation with three concrete action points for your property?",
    subheading: "The evaluation is based on your calculator inputs.",
    name_label: "Your Name (optional)",
    email_label: "Your Email Address *",
    website_label: "Your Property Website URL *",
    phone_label: "Phone Number (optional)",
    consent_analysis: "I agree to the processing of my data to receive the free evaluation. *",
    consent_newsletter: "Yes, send me occasional practical tips on increasing direct bookings.",
    submit_btn: "Request Free Evaluation",
    submitting: "Sending...",
    success_title: "Thank you for your request!",
    success_desc: "We will review your inputs and respond with your evaluation within two business days.",
    privacy_note: "Your calculator inputs are only transmitted when submitting this form."
  },

  methodology: {
    title: "Methodology & Assumptions",
    p1: "The calculator breaks down gross revenue, platform share (OTA %), and effective commission rates.",
    p2: "Net savings account for direct booking overhead (e.g. 1.4–2.5% payment fees + booking engine).",
    p3: "Benchmark date: August 2026. All calculations run locally in your browser."
  },

  faq: {
    title: "Frequently Asked Questions",
    q1: "Are direct bookings really that much cheaper than OTAs?",
    a1: "Yes, payment processing and booking engine combined typically cost 2–4%, while platforms charge 15–25% commission.",
    q2: "Can a custom website replace OTAs entirely?",
    a2: "Usually not, and that is not the goal. OTAs provide visibility for new guests. Your website converts returning guests and direct inquiries without commission.",
    q3: "How are packages and payback periods calculated?",
    a3: "We compare estimated annual net savings against our benchmark prices for professional website projects with booking integration.",
    q4: "Where do I find my exact commission rate?",
    a4: "Check your contract or extranet terms with each respective platform."
  },

  teaser: {
    title: "How much commission do you pay per year?",
    subtitle: "Calculate your potential savings in 30 seconds.",
    units_label: "Units",
    adr_label: "Avg. Price / Night (€)",
    btn: "Start Calculator",
    faq_link_text: "Use our free OTA Commission Calculator"
  },

  share: {
    btn: "Share Result",
    copied: "Link copied!"
  }
};

const otaToolEl = {
  meta_title: "Υπολογιστής Προμηθειών OTA για Ξενοδοχεία & Καταλύματα | Goldvale Studios",
  meta_description: "Υπολογίστε πόσα πληρώνετε σε πλατφόρμες κρατήσεων κάθε χρόνο και πόσα μπορείτε να εξοικονομήσετε με περισσότερες απευθείας κρατήσεις.",
  eyebrow: "01 — Υπολογιστής Προμηθειών",
  h1: "ποσα πληρωνετε στις πλατφορμες καθε χρονο;",
  subtitle: "Υπολογίστε σε 60 δευτερόλεπτα το πραγματικό κόστος προμηθειών και ανακαλύψτε αν αποσβένεται ένα δικό σας website.",

  property_types: {
    hotel: "Ξενοδοχείο / Boutique Hotel",
    apartments: "Ενοικιαζόμενα Δωμάτια / Apartments",
    villa: "Βίλα / Εξοχική Κατοικία",
    property_manager: "Property Manager / Διαχειριστής"
  },

  fields: {
    property_type_label: "Τύπος Καταλύματος",
    units_label: "Αριθμός Μονάδων / Δωματίων / Διαμερισμάτων",
    open_days_label: "Ημέρες Λειτουργίας ανά Έτος",
    occupancy_mode_rate: "Πληρότητα σε %",
    occupancy_mode_nights: "Νύχτες ανά Μονάδα",
    occupancy_rate_label: "Μέση Πληρότητα (%)",
    nights_label: "Κρατημένες Νύχτες ανά Μονάδα/Έτος",
    adr_label: "Μέση Τιμή Διανυκτέρευσης (ADR €)",
    ota_share_label: "Ποσοστό Κρατήσεων από Πλατφόρμες (OTA %)",
    ota_commission_label: "Μέση Προμήθεια Πλατφορμών (%)",
    more_options: "Αναλυτικός υπολογισμός (προηγμένες επιλογές)",
    less_options: "Λιγότερες επιλογές",
    direct_cost_label: "Κόστος Απευθείας Κράτησης (Πληρωμές/Engine %)",
    has_booking_engine: "Υπάρχει ήδη Booking Engine",
    has_channel_manager: "Υπάρχει ήδη Channel Manager"
  },

  scenarios: {
    label: "Σενάριο: Μεταφορά σε Απευθείας Κρατήσεις",
    points_5: "+5 ποσοστιαίες μονάδες",
    points_10: "+10 ποσοστιαίες μονάδες",
    points_15: "+15 ποσοστιαίες μονάδες",
    points_20: "+20 ποσοστιαίες μονάδες"
  },

  results: {
    card1_title: "Εκτιμώμενη Ετήσια Προμήθεια",
    card1_sub: "≈ {monthly} € ανά μήνα",
    card2_title: "Εκτιμώμενη Καθαρή Εξοικονόμηση / Έτος",
    card2_sub: "με +{points} ποσοστιαίες μονάδες απευθείας κρατήσεων",
    card3_title: "Όφελος σε 3 Έτη",
    card3_sub: "Συνολική καθαρή εξοικονόμηση",
    card4_title: "Προτεινόμενο Πακέτο & Απόσβεση",
    custom_budget: "Προϋπολογισμός αναφοράς: περ. {amount} € (απόσβεση σε 18 μήνες)",
    tier_range: "{low} € – {high} € καθαρά",
    payback_months: "Απόσβεση σε περ. {low}–{high} μήνες",
    payback_single: "Απόσβεση σε περ. {months} μήνες"
  },

  amortization: {
    under_18: "Ένα έργο αυτής της κλίμακας θα αποσβενόταν σε λιγότερο από 1.5 χρόνο με αυτές τις παραδοχές.",
    "19_36": "Η επένδυση αναμένεται να αποδώσει μεσοπρόθεσμα.",
    "37_60": "Η απόσβεση διαρκεί περισσότερο από 3 χρόνια. Ίσως προέχει μια πιο ευέλικτη λύση.",
    not_recommended: "Με αυτά τα νούμερα, η εξοικονόμηση προμηθειών μόνη της δεν δικαιολογεί ένα νέο website. Προτείνουμε πρώτα μικρότερες βελτιστοποιήσεις."
  },

  recommendations: {
    rec_units_1_3_no_engine: "Ένα νέο website συνδεδεμένο με υπάρχουσα μηχανή κρατήσεων αρκεί. Δεν απαιτείται εξειδικευμένη πλατφόρμα.",
    rec_units_4_10_has_cm: "Ο υπάρχων Channel Manager μπορεί συνήθως να διασυνδεθεί. Ελέγξτε πρώτα τη διασύνδεση.",
    rec_units_4_10_no_cm: "Από αυτό το μέγεθος και πάνω, ο συνδυασμός Website, Booking Engine και Channel Manager κρατά τις διαθεσιμότητες συγχρονισμένες.",
    rec_hotel_11_30: "Κλειδί είναι η διασύνδεση με το υπάρχον σύστημά σας (PMS/CMS). Το ξεκαθαρίζουμε πριν από το σχεδιασμό.",
    rec_pm_over_30: "Στο μέγεθός σας, η αρχιτεκτονική συστημάτων καθορίζει το αποτέλεσμα. Πρώτο βήμα είναι ο έλεγχος PMS & Channel Manager."
  },

  warnings: {
    otaCommissionHigh: "Παρακαλούμε ελέγξτε το ποσοστό προμήθειας.",
    occupancyHigh: "Ασυνήθιστα υψηλή πληρότητα για ετήσια λειτουργία.",
    shiftCapped: "Η μεταφορά περιορίστηκε στο τρέχον ποσοστό πλατφορμών.",
    directCostHigh: "Το κόστος απευθείας κρατήσεων είναι υψηλό, δεν προκύπτει καθαρή εξοικονόμηση."
  },

  disclaimers: {
    estimation: "Όλα τα ποσά είναι μη δεσμευτικές εκτιμήσεις βάσει των καταχωρίσεών σας. Δεν αποτελούν εγγύηση εξοικονόμησης και δεν αντικαθιστούν επιχειρηματική ή νομική συμβουλή.",
    pricing: "Ενδεικτικές τιμές καθαρά (πλέον ΦΠΑ). Δεν αποτελούν δεσμευτική προσφορά.",
    trademark: "Τα Booking.com, Airbnb και λοιπά σήματα ανήκουν στους αντίστοιχους κατόχους τους. Η Goldvale Studios δεν έχει εμπορική σχέση με αυτές τις εταιρείες."
  },

  lead_form: {
    heading: "Θέλετε μια δωρεάν αξιολόγηση με 3 συγκεκριμένες προτάσεις για το κατάλυμά σας;",
    subheading: "Η αξιολόγηση βασίζεται στους υπολογισμούς σας.",
    name_label: "Το όνομά σας (προαιρετικό)",
    email_label: "E-mail επικοινωνίας *",
    website_label: "Ιστοσελίδα καταλύματος *",
    phone_label: "Τηλέφωνο (προαιρετικό)",
    consent_analysis: "Συμφωνώ με την επεξεργασία των στοιχείων μου για τη λήψη της αξιολόγησης. *",
    consent_newsletter: "Ναι, θέλω να λαμβάνω χρήσιμες συμβουλές για αύξηση απευθείας κρατήσεων.",
    submit_btn: "Ζητήστε Δωρεάν Αξιολόγηση",
    submitting: "Αποστολή...",
    success_title: "Σας ευχαριστούμε!",
    success_desc: "Θα εξετάσουμε τα στοιχεία σας και θα επικοινωνήσουμε εντός 2 εργάσιμων ημερών.",
    privacy_note: "Τα δεδομένα του υπολογιστή μεταφέρονται μόνο κατά την υποβολή αυτής της φόρμας."
  },

  methodology: {
    title: "Μεθοδολογία & Παραδοχές",
    p1: "Ο υπολογιστής ανάλυει τα ακαθάριστα έσοδα, το ποσοστό κρατήσεων από πλατφόρμες (OTA %) και τις προμήθειες.",
    p2: "Η καθαρή εξοικονόμηση υπολογίζει τα μεταβλητά έξοδα μιας απευθείας κράτησης (π.χ. 1.4–2.5% προμήθεια κάρτας + booking engine).",
    p3: "Ημερομηνία αναφοράς: Αύγουστος 2026. Όλοι οι υπολογισμοί εκτελούνται τοπικά στον browser σας."
  },

  faq: {
    title: "Συχνές Ερωτήσεις",
    q1: "Είναι πράγματι οι απευθείας κρατήσεις τόσο φθηνότερες από τις πλατφόρμες;",
    a1: "Ναι, καθώς οι προμήθειες καρτών και η μηχανή κρατήσεων κοστίζουν συνολικά 2–4%, ενώ οι πλατφόρμες χρεώνουν 15–25%.",
    q2: "Μπορεί ένα δικό μου website να αντικαταστήσει πλήρως τις πλατφόρμες;",
    a2: "Συνήθως όχι, και αυτός δεν είναι ο στόχος. Οι πλατφόρμες φέρνουν νέους επισκέπτες. Το website μετατρέπει τους επαναλαμβανόμενους επισκέπτες σε απευθείας κρατήσεις.",
    q3: "Πώς υπολογίζονται τα πακέτα και οι χρόνοι απόσβεσης;",
    a3: "Συγκρίνουμε την εκτιμώμενη ετήσια καθαρή εξοικονόμηση με τις ενδεικτικές τιμές για επαγγελματικό website με διασύνδεση κρατήσεων.",
    q4: "Πού μπορώ να βρω το ακριβές ποσοστό προμήθειάς μου;",
    a4: "Ανατρέξτε στη σύμβαση ή στο extranet της κάθε πλατφόρμας."
  },

  teaser: {
    title: "Πόση προμήθεια πληρώνετε κάθε χρόνο;",
    subtitle: "Υπολογίστε σε 30 δευτερόλεπτα πόσα μπορείτε να εξοικονομήσετε.",
    units_label: "Μονάδες",
    adr_label: "Μέση Τιμή / Νύχτα (€)",
    btn: "Έναρξη Υπολογιστή",
    faq_link_text: "Χρησιμοποιήστε τον δωρεάν υπολογιστή προμηθειών"
  },

  share: {
    btn: "Κοινοποίηση Αποτελέσματος",
    copied: "Ο σύνδεσμος αντιγράφηκε!"
  }
};

['de', 'en', 'el'].forEach(lang => {
  const filePath = path.join(__dirname, 'messages', `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  data.otaTool = lang === 'de' ? otaToolDe : lang === 'en' ? otaToolEn : otaToolEl;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated messages/${lang}.json with otaTool dictionary.`);
});
