# Vibecoding Playbook: OTA-Provisionsrechner (v2)

**Ziel:** Ein interaktiver Rechner, der Hoteliers, Apartmentvermietern und Property Managern zeigt, wie viel Provision sie jährlich an Vertriebsplattformen zahlen — und ob sich eine eigene Website für sie rechnet. Eigenständige, SEO-fähige Landingpage, verlinkt und eingebettet auf `/el/hospitality`.

**Zielgruppe:** Betreiber mit 1–30 Einheiten, technisch nicht versiert, überwiegend saisonal, primär griechischer Markt.

**Doppelter Nutzen:** Lead-Magnet und Qualifizierungsfilter. Der Rechner sortiert vor, für wen sich welches Paket rechnet, bevor du in ein Gespräch gehst.

---

## 0. Konfiguration

```
DOMAIN            = www.goldvalestudios.com
STACK             = Next.js (App Router, /_next/image bestätigt), i18n über Pfadpräfix /el /de /en
SPRACHEN          = el (primär), de, en — Sprachumschalter wie im bestehenden Header
QUELLSEITE        = https://www.goldvalestudios.com/el/hospitality
                    (+ /de/hospitality, /en/hospitality)
DESIGN            = bestehende Tokens übernehmen: Anthrazit #14161A Hintergrund,
                    Magenta #FF3E7F Akzent, TT Hoves Pro, Kleinschreibung in H1/H2,
                    Eyebrow-Label im Muster "01 — Η Πραγματικότητα",
                    FAQ-Akkordeon mit "+"-Marker
LEAD-ZIEL         = Supabase-Tabelle + Benachrichtigung an hello@goldvalestudios.com
RECHTLICHES       = Verlinkung auf /el/nomika und /el/prostasia-dedomenon im Tool-Footer
```

**Wichtig für die IDE:** Keine neue Farbwelt, keine neuen Schriften, kein eigenes Layoutsystem. Der Rechner muss aussehen wie ein weiterer Abschnitt der bestehenden Seite, nicht wie ein eingebettetes Fremdtool.

---

## 1. Deliverables

```
app/[locale]/(tools)/…/page.tsx   # Landingpage: Intro, Rechner, FAQ, Schema, CTA
components/tools/Calculator.tsx    # Interaktive Komponente
components/tools/LeadForm.tsx      # Lead-Erfassung nach dem Ergebnis
components/tools/Teaser.tsx        # Mini-Version für /hospitality (2 Felder)
lib/ota/calc.ts                    # Reine Rechenlogik, ohne UI-Abhängigkeiten
lib/ota/calc.test.ts               # Testfälle aus Abschnitt 7
lib/ota/defaults.ts                # Voreinstellungen inkl. Stand-Datum und Quellen
messages/{el,de,en}/ota-tool.json  # Alle Texte, keine Strings im Code
```

**Harte Regel:** `calc.ts` enthält keinen UI-Code, keine Formatierung, keine React-Imports. Nur Zahlen rein, Zahlen raus.

---

## 2. Rechenlogik (verbindlich)

> ⚠️ Korrektur zur Konzeptvorlage: Der dort genannte Beispielwert 32.640 € passt nicht zum genannten Input. Korrekt sind **39.984 €**. Maßgeblich ist das Modell unten.

### 2.1 Eingaben

```ts
export interface CalcInput {
  units: number;              // Anzahl Einheiten, 1–500
  openDays: number;           // Betriebstage pro Jahr, 30–365 (Default 365; saisonal z.B. 180)
  occupancyMode: 'rate' | 'nights';
  occupancyRate?: number;     // 0.05–0.95, bezogen auf openDays
  nightsPerUnit?: number;     // Alternative: belegte Nächte je Einheit und Jahr
  adr: number;                // Ø Preis pro Nacht in EUR, 20–2000
  otaShare: number;           // Anteil Plattformbuchungen, 0–1
  otaCommission: number;      // eigene effektive Provision, 0.05–0.30 (Default 0.17)
  directCostRate: number;     // Kosten der Direktbuchung, Default 0.03
  shiftPoints: number;        // Verlagerung in Prozentpunkten, 5 | 10 | 15 | 20
  hasBookingEngine: boolean;
  hasChannelManager: boolean;
  propertyType: 'hotel' | 'apartments' | 'villa' | 'property_manager';
}
```

### 2.2 Formeln

```ts
const nights = occupancyMode === 'nights'
  ? units * nightsPerUnit
  : units * openDays * occupancyRate;

const grossRevenue       = nights * adr;
const otaRevenue         = grossRevenue * otaShare;
const annualCommission   = otaRevenue * otaCommission;
const commissionPerMonth = annualCommission / 12;

// Verlagerung in Prozentpunkten des Gesamtumsatzes, begrenzt durch den OTA-Anteil
const shift = Math.min(shiftPoints / 100, otaShare);

const grossSaving = grossRevenue * shift * otaCommission;
const netSaving   = grossRevenue * shift * (otaCommission - directCostRate);
const netSaving3y = netSaving * 3;
const savingPerMonth = netSaving / 12;
```

**Warum netto gerechnet wird:** Direktbuchungen sind nicht kostenlos (Zahlungsgebühren 1,4–2,5 %, Booking Engine 0–3 %). Ein Rechner, der die volle Provision als Ersparnis ausweist, ist im Erstgespräch angreifbar — und rechtlich als Werbeaussage angreifbarer. Die Bruttoprovision ist die Aufmerksamkeitszahl, die Nettoersparnis die Rechengrundlage.

### 2.3 Preisstufen und Amortisation

Richtwerte, netto zzgl. USt., ausdrücklich unverbindlich:

| Segment | Leistungsumfang | Richtwert |
|---|---|---|
| 1–3 Apartments / Villen | Website + Anbindung einer vorhandenen Booking Engine | ca. 1.000 € |
| 4–10 Apartments oder Hotel (bis ca. 30 Einheiten) | Website + Booking Engine + Channel-Manager-Anbindung | 2.000–3.000 € |
| > 30 Einheiten oder Property Manager | Portfolio-Setup, Systemintegration | individuell, **kein Preis anzeigen** |

```ts
function priceTier(units: number, propertyType: PropertyType) {
  if (propertyType === 'property_manager' || units > 30) return { custom: true };
  if (propertyType === 'hotel' || units >= 4)             return { low: 2000, high: 3000 };
  return { low: 900, high: 1200 };
}

const paybackLow  = tier.low  / savingPerMonth;   // Monate
const paybackHigh = tier.high / savingPerMonth;   // Monate
```

Bei `custom: true` wird statt eines Preises das rechnerisch tragfähige Budget ausgegeben: `netSaving * 1.5` (18 Monate Amortisation) als Orientierung.

**Bewertung der Amortisationsdauer:**

| Monate | Aussage im Ergebnis |
|---|---|
| ≤ 18 | „Ein Projekt in dieser Größenordnung wäre unter diesen Annahmen in unter eineinhalb Jahren wieder eingespielt." |
| 19–36 | „Die Investition dürfte sich mittelfristig tragen." |
| 37–60 | „Rechnerisch dauert die Amortisation länger als drei Jahre. Ein kleinerer Umfang ist wahrscheinlich sinnvoller." |
| > 60 oder netSaving ≤ 0 | „Bei diesen Werten trägt sich ein Website-Projekt über die Provisionsersparnis allein nicht." + Vorschlag günstigerer Maßnahmen |

Nicht quantifizierbare Vorteile werden **getrennt und ohne Eurobetrag** genannt, damit die Rechnung sauber bleibt: eigener Gästekontakt und E-Mail-Adresse, Wiederkehrer, Preishoheit, Unabhängigkeit vom Ranking der Plattform.

### 2.4 Voreinstellungen je Betriebsart

| Betriebsart | otaShare | otaCommission | directCostRate | openDays |
|---|---|---|---|---|
| Hotel | 0,65 | 0,17 | 0,03 | 365 |
| Apartments | 0,80 | 0,16 | 0,03 | 210 |
| Villa | 0,85 | 0,16 | 0,03 | 180 |
| Property Manager | 0,75 | 0,18 | 0,035 | 365 |

Diese Werte liegen in `defaults.ts` mit Feldern `value`, `source`, `checkedAt`. Sie sind im UI als **Startwerte zum Überschreiben** gekennzeichnet und **keiner namentlich genannten Plattform zugeordnet** (siehe Abschnitt 6).

### 2.5 Empfehlungslogik

```
units 1–3, keine Booking Engine
  → "Eine neue Website mit angebundener Booking Engine genügt.
     Eine individuelle Buchungsplattform ist nicht nötig."

units 4–10, Channel Manager vorhanden
  → "Ihr bestehender Channel Manager lässt sich in der Regel anbinden.
     Prüfen Sie zuerst die Integration."

units 4–10, kein Channel Manager
  → "Ab dieser Größe lohnt die Kombination aus Website, Booking Engine
     und Channel Manager, damit Verfügbarkeiten synchron bleiben."

Hotel oder units 11–30
  → "Entscheidend ist die Anbindung an Ihr bestehendes System.
     Das klären wir vor dem Design."

property_manager oder units > 30
  → "Bei Ihrer Größe entscheidet die Systemarchitektur über das Ergebnis.
     Erster Schritt ist die Prüfung von PMS und Channel Manager."
```

Kombiniert mit der Amortisationsbewertung aus 2.3. Die Kombination „kleiner Betrieb + lange Amortisation" muss ehrlich abraten — das kostet ein paar Leads und spart viele unpassende Gespräche.

### 2.6 Validierung

- Alle Eingaben auf Min/Max klemmen, keine negativen Werte, keine Division durch null.
- `otaCommission > 0.30` → Hinweis „Bitte prüfen Sie diesen Wert."
- `occupancyRate > 0.85` bei `openDays = 365` → Hinweis „ungewöhnlich hoch".
- `shiftPoints/100 > otaShare` → auf `otaShare` kappen, Hinweis einblenden: „Mehr als Ihr aktueller Plattformanteil ist nicht verlagerbar."
- `directCostRate >= otaCommission` → Ergebnis 0, Hinweistext statt negativer Zahl.
- Immer ungerundet rechnen, erst bei der Ausgabe auf volle Euro runden (Locale `el-GR` / `de-DE` / `en-GB`).

---

## 3. UI und Ablauf

**Seitenstruktur:**

1. Eyebrow + H1 (Kleinschreibung, Stil der bestehenden Seite) + ein Satz Nutzenversprechen
2. **Rechner sofort sichtbar** — kein Intro-Textblock davor
3. Ergebnisblock, live ohne Absenden-Button
4. Empfehlungsabsatz (2.3 + 2.5)
5. Lead-CTA
6. Methodik und Annahmen, aufklappbar (Formeln, Startwerte, Stand-Datum, Quellen)
7. FAQ, 5–6 Fragen im bestehenden Akkordeon-Stil
8. Rückverweis auf `/el/hospitality`
9. Rechtlicher Footer-Block (Abschnitt 6)

**Eingabe-UX:**
- Pflichtfelder zuerst, optionale hinter „Genauer rechnen".
- Jedes Feld: Slider und Zahlenfeld gekoppelt.
- Live-Neuberechnung, debounced 150 ms.
- Betriebsart setzt Startwerte, überschreibt aber keine bereits geänderten Felder.
- Szenario-Umschalter 5/10/15/20 Prozentpunkte als Segmented Control über den Ergebnissen.

**Vier Ergebniskarten:**

| Karte | Inhalt |
|---|---|
| 1 (groß) | Geschätzte jährliche Provisionskosten, darunter klein „≈ X € pro Monat" |
| 2 | Geschätzte Nettoersparnis bei +X Prozentpunkten Direktbuchungen, pro Jahr |
| 3 | Effekt über drei Jahre |
| 4 | Passendes Paket als Preisspanne + Amortisation in Monaten (bzw. „individuell") |

**Signature-Element:** Nur Karte 1 zählt bei Eingabeänderung sichtbar hoch (~400 ms, `prefers-reduced-motion` respektieren), in Magenta gesetzt. Alles andere bleibt ruhig. Nicht vier animierte Karten.

**Zahlen:** `font-variant-numeric: tabular-nums`, damit beim Zählen nichts springt.

**Copy-Regeln:** Konjunktiv bei allen Schätzungen. Keine Wertung der Plattformen, keine Begriffe wie „Abzocke" oder „zu hohe Provision". Neutrale Beschreibung: Vertriebskanal mit Kosten, den man teilweise verlagern kann.

**Quality Floor:** ab 360 px nutzbar, Tastaturbedienung mit sichtbarem Fokus, Labels verknüpft, Ergebnisbereich `aria-live="polite"`, keine Layoutsprünge, Lighthouse ≥ 90.

---

## 4. Lead-Erfassung

Das Hauptergebnis ist **nie** gesperrt.

> **Möchten Sie eine kostenlose Auswertung mit drei konkreten Maßnahmen für Ihren Betrieb?**
> Felder: E-Mail (Pflicht), Website-Adresse (Pflicht), Name (optional), Telefon (optional)

- Consent-Checkbox, unvorausgewählt, eigener Text, Link auf `/el/prostasia-dedomenon`.
- Doppelte Zweckbindung sauber trennen: Auswertung anfragen ≠ Newsletter. Zwei getrennte Checkboxen, Newsletter nur mit Double-Opt-in.
- Rechnereingaben werden mit dem Lead gespeichert — dein Gesprächseinstieg.
- Spamschutz: Honeypot + Mindestverweildauer 3 Sekunden + serverseitiges Rate-Limit pro IP. Kein Captcha.
- Speicherung nur über Server-Route, Keys nie im Client.
- Bestätigung mit realistischer Zusage: „Wir melden uns innerhalb von zwei Werktagen."

---

## 5. SEO und Verlinkung

**URLs** (Muster der Seite: transliteriertes Griechisch wie `erga`, `ypiresies`, `epikoinonia`):

```
/el/ergaleia/ypologistis-promitheion-ota      (primär)
/de/tools/ota-provisionsrechner
/en/tools/ota-commission-calculator
```

Vollständiges `hreflang` inkl. `x-default`, Canonical je Sprache, Aufnahme in die Sitemap.

**Meta Griechisch:**
- Title: `Υπολογιστής Προμηθειών OTA για Ξενοδοχεία & Καταλύματα | Goldvale Studios`
- Description: `Υπολογίστε πόσα πληρώνετε σε πλατφόρμες κρατήσεων κάθε χρόνο και πόσα μπορείτε να εξοικονομήσετε με περισσότερες απευθείας κρατήσεις.`
- H1: `ποσα πληρωνετε στις πλατφορμες καθε χρονο;`

Zur Markenerwähnung in Title und Description siehe Abschnitt 6.2 — im Title **keine** fremden Marken, in der Description und im Fließtext nur beschreibend.

**Strukturierte Daten:** `WebApplication` (applicationCategory `BusinessApplication`, `offers` mit Preis 0) und `FAQPage`, beide als JSON-LD, serverseitig gerendert.

**Teilbarkeit:** Eingaben in Query-Parametern spiegeln (`?units=8&adr=140&occ=0.55&ota=0.7&com=0.17&type=hotel`), Deep-Link stellt den Zustand wieder her, Button „Ergebnis teilen" kopiert die URL. Nur Zahlen, niemals personenbezogene Daten in der URL.

**Rendering:** Seite serverseitig ausliefern, Rechner clientseitig hydrieren. Ohne JavaScript bleiben Text, FAQ und CTA lesbar.

**Einbindung auf `/el/hospitality`:**
- Teaser-Block direkt nach Abschnitt „01 — Η Πραγματικότητα", inhaltlich anschließend an die Karte „Προμήθεια ανά κράτηση": zwei Felder (Einheiten, Ø Preis) + Button → Deep-Link auf die Rechnerseite mit vorbefüllten Parametern.
- Zusätzlich ein Textlink in der ersten FAQ-Antwort („Αξίζει ένα δικό μου website…"), beschreibender Ankertext.
- Neuer Footer-Punkt „Εργαλεία" mit Verlinkung, damit das Tool von jeder Seite erreichbar ist.
- Vom Rechner zurück auf `/el/hospitality` und `/el/epikoinonia` verlinken.

**Tracking (erst nach Consent):** `calc_view`, `calc_first_input`, `calc_result_shown`, `calc_scenario_change`, `calc_share`, `lead_form_open`, `lead_submit`.

---

## 6. Rechtliche Absicherung

> Ich bin kein Anwalt, und das Folgende ist keine Rechtsberatung. Es ist eine Risikoliste mit den üblichen Standards. Da die Seite den griechischen Markt adressiert und Goldvale aus Deutschland heraus tätig ist, kommen griechisches und deutsches Recht sowie EU-Recht in Betracht. Lass den fertigen Text vor Livegang einmal von einem Anwalt für Wettbewerbs- und Markenrecht prüfen — das ist im Verhältnis zum Projekt günstig und schließt genau das Risiko, das dich beschäftigt.

### 6.1 Warum das Risiko real, aber beherrschbar ist

Plattformen gehen üblicherweise nicht gegen Rechner vor, die mit **nutzereigenen Eingaben** rechnen. Sie gehen gegen zwei Dinge vor: gegen **Markennutzung, die Verbindung suggeriert**, und gegen **unwahre Tatsachenbehauptungen über ihre Konditionen**. Beide Risiken lassen sich durch Bauweise ausschließen — nicht durch Kleingedrucktes.

### 6.2 Markennutzung („Booking.com", „Airbnb")

Die Nennung fremder Marken ist als beschreibende Benutzung zulässig, wenn sie erforderlich ist und lauteren Gepflogenheiten entspricht (Art. 14 Abs. 1 lit. c UMV; in Deutschland § 23 MarkenG; in Griechenland Art. 20 N. 4679/2020 zur Umsetzung der RL (EU) 2015/2436).

**Zulässig:**
- Marken als reines Wortzeichen im Fließtext, in der FAQ und in der Meta-Description
- Formulierungen wie „Plattformen wie Booking.com oder Airbnb"

**Zu unterlassen:**
- Logos, Wort-Bild-Marken, Markenfarben, Screenshots der Plattform-Oberflächen, Favicons
- Marken in Domain, Subdomain, URL-Slug, Dateinamen oder `og:image`
- Marke als erstes Wort im Title-Tag oder in der H1
- Google-Ads-Anzeigentexte mit fremden Marken
- Jede Andeutung von Partnerschaft, Autorisierung, Zertifizierung oder Datenbezug
- Herabsetzende oder emotionalisierende Formulierungen über die Plattformen

**Pflicht-Disclaimer im Tool-Footer, in allen drei Sprachen:**

> „Booking.com, Airbnb und weitere genannte Marken sind eingetragene Marken der jeweiligen Inhaber. Goldvale Studios steht in keiner Geschäfts- oder Partnerschaftsbeziehung zu diesen Unternehmen. Die Nennung erfolgt ausschließlich zu Beschreibungszwecken."

### 6.3 Provisionssätze — das Kernrisiko und seine Entschärfung

**Grundprinzip: Das Tool behauptet keine Provisionssätze. Es rechnet mit dem, was der Nutzer eingibt.** Das ist der wichtigste Satz in diesem Playbook. Eine Rechenhilfe für eigene Zahlen ist keine Tatsachenbehauptung über die Konditionen eines Dritten.

Konkrete Umsetzungsregeln:

1. **Feldbezeichnung neutral und nutzerbezogen:** „Ihre durchschnittliche Provision über alle Plattformen (%)" — nicht „Booking.com-Provision".
2. **Startwerte nicht zuordnen:** Der Default 17 % ist als „Startwert, bitte durch Ihren tatsächlichen Satz ersetzen" gekennzeichnet und wird an keiner Stelle einer benannten Plattform zugeschrieben.
3. **Keine Vergleichstabelle der Plattformkonditionen.** Kein „Booking.com 15 %, Airbnb 3 %+14 %". Genau solche Tabellen veralten und werden angreifbar.
4. **Falls im FAQ überhaupt Zahlen genannt werden:** nur als Spanne, nur mit Quelle auf die offizielle Preisseite des Anbieters, mit Datum und dem Zusatz, dass Konditionen je nach Programm, Markt und Vertrag abweichen und sich ändern können. Formulierung im Konjunktiv, nie als feststehender Satz. Sicherste Variante: gar keine Zahlen nennen, sondern schreiben „Ihre tatsächliche Rate finden Sie in Ihrem Extranet-Vertrag."
5. **Stand-Datum und Änderungsprotokoll** sichtbar auf der Seite. Startwerte quartalsweise prüfen und die Prüfung in `defaults.ts` (`checkedAt`) dokumentieren. Das ist dein Sorgfaltsnachweis, falls doch jemand fragt.
6. **Keine Daten von den Plattformen scrapen** und keine plattformeigenen Inhalte übernehmen.
7. **Vergleichende Werbung** (§ 6 UWG, RL 2006/114/EG): Du vergleichst nicht Goldvale mit Booking.com, sondern stellst die Kosten eines Vertriebskanals dar. Das bleibt so, wenn keine Aussage der Form „direkt ist immer günstiger" fällt. Ergänze im Methodik-Abschnitt ausdrücklich, dass Plattformen Reichweite und Auslastung liefern, die eine eigene Website nicht ersetzt.

### 6.4 Aussagen gegenüber deinen eigenen Interessenten

- Alle Ergebnisse als Schätzung kennzeichnen, sichtbar unter den Karten, nicht nur im Akkordeon:
  > „Alle Werte sind unverbindliche Schätzungen auf Basis Ihrer Eingaben. Sie stellen keine Zusage über erreichbare Einsparungen dar und ersetzen keine betriebswirtschaftliche, steuerliche oder rechtliche Beratung."
- **Preisangaben:** „Richtwerte, netto zzgl. gesetzlicher Umsatzsteuer. Kein verbindliches Angebot; der konkrete Preis richtet sich nach Umfang und Ausgangslage."
- Keine Erfolgsversprechen („Sie sparen X"), sondern Bedingungssätze („könnten Sie unter diesen Annahmen einsparen").
- Amortisationsangaben immer mit offengelegten Annahmen.
- Keine Steuer- oder Rechtsberatung, insbesondere nicht zu Kurzzeitvermietung, AMA-Registrierung oder Mehrwertsteuer.

### 6.5 Datenschutz

- Die Berechnung läuft vollständig im Browser. Ohne Absenden des Lead-Formulars werden keine Eingaben gespeichert — und genau das im Formular kurz sagen, das erhöht die Abschlussquote.
- Rechtsgrundlagen: Art. 6 Abs. 1 lit. b DSGVO für die angefragte Auswertung, lit. a für den Newsletter.
- Consent-Protokollierung: Zeitstempel, Textversion, Einwilligungsumfang.
- Auftragsverarbeitungsverträge für Hosting, Supabase und den E-Mail-Versand; Drittlandtransfer prüfen.
- Datenschutzerklärung um Zweck, Empfänger, Speicherdauer (Vorschlag: 24 Monate ohne Geschäftsanbahnung) und Widerruf ergänzen.
- Analytics erst nach Consent laden, Consent-Banner wie auf der übrigen Seite.
- Impressum und Datenschutz aus dem Tool-Footer verlinken.

### 6.6 Prüfpunkte vor Livegang

- [ ] Kein fremdes Logo, kein Screenshot, keine Markenfarbe im gesamten Tool
- [ ] Keine fremde Marke in URL, Dateinamen, `og:image`, Title, H1
- [ ] Kein Default-Wert ist im UI einer benannten Plattform zugeordnet
- [ ] Keine Vergleichstabelle von Plattformkonditionen
- [ ] Marken-Disclaimer in el, de, en vorhanden
- [ ] Schätzungs-Disclaimer sichtbar ohne Aufklappen
- [ ] Preis-Disclaimer (netto, unverbindlich) an jeder Preisnennung
- [ ] Stand-Datum und Quellenliste im Methodik-Abschnitt
- [ ] Screenshot der Live-Seite archiviert, `defaults.ts` versioniert
- [ ] Anwaltliche Kurzprüfung erfolgt

---

## 7. Testfälle (müssen exakt so herauskommen)

Basis: `directCostRate = 0.03`, `shiftPoints = 10`.

**Test 1 — Hotel, ganzjährig**
20 Einheiten, 120 Nächte je Einheit, 140 € ADR, OTA 70 %, Provision 17 %
```
Nächte gesamt          2.400
Bruttoumsatz         336.000 €
Plattformumsatz      235.200 €
Jahresprovision       39.984 €   (3.332 €/Monat)
Bruttoersparnis        5.712 €
Nettoersparnis         4.704 €   (392 €/Monat)
3 Jahre netto         14.112 €
Paket                  2.000–3.000 €  →  Amortisation 5,1–7,7 Monate  →  Stufe "≤ 18"
```

**Test 2 — 3 Apartments, saisonal (Untere Preisstufe)**
3 Einheiten, 200 Betriebstage, 70 % Auslastung, 110 € ADR, OTA 85 %, Provision 16 %
```
Nächte gesamt            420
Bruttoumsatz          46.200 €
Jahresprovision        6.283,20 €
Nettoersparnis           600,60 €  (50,05 €/Monat)
3 Jahre netto          1.801,80 €
Paket                    900–1.200 €  →  Amortisation 18,0–24,0 Monate  →  Stufe "19–36"
```

**Test 3 — 4 Apartments, kurze Saison (Ehrlichkeitsfall)**
4 Einheiten, 180 Betriebstage, 65 % Auslastung, 95 € ADR, OTA 85 %, Provision 16 %
```
Nächte gesamt            468
Bruttoumsatz          44.460 €
Jahresprovision        6.046,56 €
Nettoersparnis           578 €     (48,17 €/Monat)
Paket                  2.000–3.000 €  →  Amortisation 41,5–62,3 Monate
→ Ergebnis muss abraten und das 15/20-Punkte-Szenario sowie kleinere Maßnahmen vorschlagen
```

**Test 4 — Property Manager**
45 Einheiten, 365 Tage, 55 % Auslastung, 120 € ADR, OTA 75 %, Provision 18 %
```
Nächte gesamt          9.033,75
Bruttoumsatz       1.084.050 €
Jahresprovision      146.346,75 €
Nettoersparnis        16.260,75 €
3 Jahre netto         48.782,25 €
Kein Preis, stattdessen Budgetorientierung 24.391 € (18 Monate)
```

**Test 5 — Kappung**
OTA-Anteil 8 %, `shiftPoints` 20 → Verlagerung wird auf 8 Prozentpunkte begrenzt, Hinweistext erscheint.

**Test 6 — Grenzfall**
`otaCommission = 0.03`, `directCostRate = 0.03` → Nettoersparnis 0, kein negativer Wert, Hinweistext statt Karte 4.

---

## 8. Prompts für Antigravity (nacheinander)

**Prompt 1 — Logik**
> Erstelle `lib/ota/calc.ts` mit dem Interface `CalcInput`, der Funktion `calculate(input): CalcResult` und `priceTier()` exakt nach folgender Spezifikation. Keine UI, keine React-Imports, keine Zahlenformatierung. Erstelle zusätzlich `lib/ota/defaults.ts` mit Startwerten inklusive `source` und `checkedAt` sowie `calc.test.ts` mit den sechs Testfällen. Lass die Tests laufen und zeige das Ergebnis. [Abschnitte 2 und 7 einfügen]

**Prompt 2 — Rechner-UI**
> Baue `components/tools/Calculator.tsx` gegen die fertige `calculate()`-Funktion. Übernimm Farben, Typografie, Eyebrow-Stil und Akkordeon-Muster aus der bestehenden Seite `/el/hospitality`; erfinde nichts Neues. Live-Berechnung ohne Absenden-Button, Slider und Zahlenfeld gekoppelt, vier Ergebniskarten, Count-up nur auf Karte 1 in Magenta. Alle Texte aus `messages/el/ota-tool.json`. [Abschnitt 3 einfügen]

**Prompt 3 — Seite, SEO, Lead**
> Erstelle die Landingpage unter den drei angegebenen URLs mit hreflang, Canonical, JSON-LD für WebApplication und FAQPage, Query-Parameter-Sync, Methodik-Akkordeon und FAQ. Ergänze `LeadForm.tsx` mit Honeypot, Zeitfalle, Consent-Protokollierung und serverseitiger Speicherung in Supabase. Keine Secrets im Client. [Abschnitte 4 und 5 einfügen]

**Prompt 4 — Rechtliche Bauvorgaben**
> Setze die folgenden rechtlichen Vorgaben im gesamten Tool um und prüfe anschließend jeden Punkt der Checkliste einzeln gegen den Code. Gib mir eine Liste mit Datei und Zeile je Punkt. [Abschnitt 6 einfügen]

**Prompt 5 — Teaser und QA**
> Erstelle `components/tools/Teaser.tsx` (zwei Felder, Deep-Link mit Query-Parametern) und binde ihn auf `/[locale]/hospitality` nach dem Abschnitt „01 — Η Πραγματικότητα" ein, plus Textlink in der ersten FAQ-Antwort und Footer-Eintrag „Εργαλεία". Prüfe danach: Lighthouse Performance und SEO über 90, Tastaturbedienung, Fokus sichtbar, 360 px Breite, `prefers-reduced-motion`, keine Layoutsprünge, alle Tests grün.

---

## 9. Definition of Done

- [ ] Alle sechs Testfälle grün
- [ ] Ergebnis ohne E-Mail-Eingabe sichtbar
- [ ] Empfehlung und Preisstufe ändern sich korrekt mit Größe, Betriebsart und vorhandener Technik
- [ ] Ehrlichkeitsfall (Test 3) rät nachweislich ab
- [ ] Alle Punkte aus 6.6 abgehakt
- [ ] hreflang, Canonical, JSON-LD validiert (Rich Results Test)
- [ ] Deep-Link stellt Eingaben wieder her, Teilen-Button funktioniert
- [ ] Lead landet in Supabase inklusive Eingaben und Consent-Protokoll, Benachrichtigung kommt an
- [ ] Von `/el/hospitality` verlinkt, Rückverlinkung vorhanden, in Sitemap
- [ ] Griechische Texte muttersprachlich gegengelesen, de und en vollständig
- [ ] Mobil und per Tastatur bedienbar, Lighthouse ≥ 90

---

## 10. Ausbaustufen (nach Livegang)

1. **PDF-Auswertung per E-Mail** — dieselbe Rechnung als Einseiter mit deinem Branding, erzeugt den Anlass für den Rückruf.
2. **Benchmark-Zeile** — „Betriebe Ihrer Größe erreichen typischerweise X % Direktbuchungen." Erst wenn du eigene Daten aus genügend Leads hast; sonst wäre es eine unbelegte Behauptung.
3. **Zweites Tool im Cluster** — z. B. Saison-Deckungsbeitrag je Einheit, verlinkt vom ersten. Ein Tool-Cluster unter `/el/ergaleia/` ist SEO-seitig stärker als ein Einzeltool.
4. **Embed-Version für Partner** — Script-Snippet mit Attributions-Backlink. Die günstigste Linkbuilding-Maßnahme, die dieses Tool hergibt.
5. **Brückenschlag zu Filoxenos.gr** — Betriebe, die den Rechner nutzen, sind exakt die Zielgruppe für die Kurzzeitmiet-Plattform. Ein dezenter Querverweis im Ergebnis liegt nahe.
