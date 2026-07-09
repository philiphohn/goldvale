const fs = require('fs');

const de = JSON.parse(fs.readFileSync('./messages/de.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('./messages/en.json', 'utf8'));

de.Cookie = {
  "text": "Wir nutzen Cookies, um unsere Website und unseren Service zu optimieren. Mit Klick auf 'Akzeptieren' stimmen Sie der Nutzung von Google Analytics zu.",
  "accept": "Akzeptieren",
  "reject": "Ablehnen",
  "policy": "Datenschutzerklärung"
};

en.Cookie = {
  "text": "We use cookies to optimize our website and our service. By clicking 'Accept', you consent to the use of Google Analytics.",
  "accept": "Accept",
  "reject": "Decline",
  "policy": "Privacy Policy"
};

fs.writeFileSync('./messages/de.json', JSON.stringify(de, null, 2));
fs.writeFileSync('./messages/en.json', JSON.stringify(en, null, 2));

console.log('Translation files updated for cookies.');
