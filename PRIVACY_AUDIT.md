# Audit cookie, tracciamento e privacy

**Progetto:** M.M. Group  
**Data della verifica:** 25 agosto 2026  
**Ambito:** codice React/Vite, build e sito locale in esecuzione  
**Pubblico considerato:** Italia e Unione europea/SEE

> Questo documento riporta una verifica tecnica e documentale. Non costituisce certificazione di conformità né sostituisce la valutazione di un professionista legale o del DPO, se nominato.

## Esito sintetico

Il sito è un portale corporate con catalogo e compositore di richieste di preventivo. Non sono presenti account, pagamenti, newsletter, analytics, pubblicità o profilazione.

La soluzione applicabile è il **Caso A**: non è stato aggiunto un banner perché non esistono cookie o strumenti facoltativi da accettare o rifiutare. Sono state aggiunte privacy policy e cookie policy, e i font sono ora ospitati localmente per evitare il contatto automatico con Google.

## Inventario tecnico

| Elemento | Dominio/fornitore | Parte | Finalità e categoria | Durata | Caricamento | Consenso | Trasferimenti extra SEE |
|---|---|---|---|---|---|---|---|
| Applicazione, CSS, immagini e video | Dominio del sito | Prima parte | Erogazione del sito; tecnico | Cache secondo intestazioni del server | All’apertura o lazy load | No | Dipende dall’hosting, da confermare |
| Font Barlow e Barlow Condensed | Dominio del sito, file in `/fonts/` | Prima parte | Presentazione grafica; tecnico | Cache secondo intestazioni del server | Quando richiesti dal CSS | No | Nessuno causato dal font locale |
| Stato del compositore preventivo | Memoria della pagina | Prima parte | Preparazione locale del messaggio; funzionale | Fino a navigazione/ricarica | Durante la digitazione | No | Nessuno prima del click |
| Cookie applicativi | — | — | Non presenti | — | Mai | — | — |
| `localStorage` / `sessionStorage` | — | — | Non utilizzati | — | Mai | — | — |
| IndexedDB | — | — | Non utilizzato | — | Mai | — | — |
| Analytics, pixel, tag manager, beacon, fingerprinting | — | — | Non presenti | — | Mai | — | — |
| Iframe, mappe o video incorporati | — | — | Non presenti | — | Mai | — | — |
| Log tecnici del server/CDN | Provider di hosting da confermare | Infrastruttura prima parte / responsabile | Erogazione, sicurezza, diagnosi; tecnico ma dato personale quando riferibile a un utente | Criterio: tempo necessario a sicurezza e diagnosi; configurazione esatta da confermare | A ogni richiesta HTTP | No | Provider/regione e garanzie da confermare |
| WhatsApp | `wa.me` / WhatsApp | Terza parte | Canale di contatto scelto dall’utente | Secondo il fornitore | Solo dopo click; nessuno script incorporato | Non è consenso cookie del sito; azione volontaria | Possibili secondo informativa e configurazione del fornitore |
| Google Maps | `maps.google.com` / Google | Terza parte | Apertura della sede sulla mappa | Secondo il fornitore | Solo dopo click; nessuna mappa incorporata | Non richiesto sul sito | Possibili secondo informativa del fornitore |
| Instagram | `instagram.com` / Meta | Terza parte | Credito esterno | Secondo il fornitore | Solo dopo click; nessun widget | Non richiesto sul sito | Possibili secondo informativa del fornitore |
| Email e telefono | `mailto:` / `tel:` | Applicazione scelta dall’utente | Contatto | Secondo il canale e il titolare | Solo dopo click | No | Dipende dal fornitore scelto dall’utente |

### Servizio rimosso dal caricamento automatico

Google Fonts (`fonts.googleapis.com` e `fonts.gstatic.com`) era richiamato nel documento iniziale tramite `preconnect` e foglio di stile. I collegamenti sono stati eliminati; otto file font e la licenza OFL sono ora locali.

## Classificazione e motivazione

Le [Linee guida del Garante del 10 giugno 2021](https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9677876) distinguono gli strumenti tecnici da quelli non tecnici e chiariscono che, in presenza dei soli strumenti tecnici, l’informazione può essere resa nella home o nell’informativa generale senza uno specifico banner. La [FAQ Cookie del Garante](https://www.garanteprivacy.it/faq/cookie) ribadisce che il banner non è obbligatorio in questo caso.

Non è stata installata una CMP e non è stato creato un finto pannello “Accetta/Rifiuta”: senza finalità facoltative sarebbe una scelta priva di oggetto.

## Modifiche implementate

- Aggiunte pagine `#/privacy` e `#/cookie-policy`, accessibili dal footer di tutte le aree.
- Descritto il flusso reale dei dati nel compositore del preventivo e aggiunto il link contestuale alla privacy policy.
- Ospitati localmente Barlow e Barlow Condensed; rimossi Google Fonts e i relativi `preconnect`.
- Aggiunta una Content Security Policy lato documento che limita script, font, immagini, media e connessioni alla stessa origine e impedisce gli iframe.
- Aggiunta una referrer policy `strict-origin-when-cross-origin`.
- Nascosta la barra preventivo nelle pagine legali e corretti titolo documento e navigazione “Torna in cima”.
- Conservata la struttura grafica esistente e non aggiunte dipendenze o servizi a pagamento.

### File principali modificati

- `index.html`
- `src/App.jsx`
- `src/styles/index.css`
- `src/styles/fonts.css`
- `src/pages/LegalPage.jsx`
- `src/pages/LegalPage.css`
- `src/components/Footer.jsx`
- `src/components/Footer.css`
- `src/components/Contact.jsx`
- `src/components/Contact.css`
- `public/fonts/*`

## Test eseguiti

| Scenario richiesto | Esito | Evidenza |
|---|---|---|
| Prima scelta | Superato | Nessun banner, iframe o asset esterno; soltanto risorse della stessa origine |
| Rifiuta tutto | Non applicabile | Non esistono categorie facoltative o consenso |
| Accetta tutto | Non applicabile | Non esistono categorie facoltative o consenso |
| Preferenze granulari | Non applicabile | Nessuna finalità facoltativa |
| Revoca | Non applicabile | Nessun consenso memorizzato |
| Nuova sessione | Superato | Nessun banner o contenuto esterno; policy sempre disponibili |
| Scadenza/cambio versione | Non applicabile oggi | Diventerà necessario solo introducendo strumenti facoltativi |
| Desktop e mobile | Superato | Policy verificate a 1440×900 e 390×844, senza overflow orizzontale |
| Accessibilità | Superato nel perimetro verificato | Indici nominati, controlli con nome accessibile, focus visibile, struttura a titoli e sezioni |
| Console e risorse | Superato | Nessun errore/warning; 101 asset osservati nella home, tutti same-origin; font da `/fonts/` |
| Compositore preventivo | Superato | Dati inclusi nell’href WhatsApp/email solo localmente; nessun asset o embed esterno dopo la compilazione |

Build e lint sono stati eseguiti. Il lint segnala avvisi preesistenti in componenti non introdotti dall’intervento, senza errori bloccanti.

## Informazioni da confermare prima della pubblicazione definitiva

1. Che `M.M. GROUP S.R.L.`, P. IVA/C.F. `01777780535` e Via Renato Pollini 10 siano i dati corretti del titolare e della sede legale, non soltanto della sede operativa.
2. L’eventuale nomina di un DPO/RPD e i relativi contatti.
3. Provider di hosting/CDN, regione di trattamento, durata effettiva dei log, misure di sicurezza, DPA/nomina a responsabile ed eventuali trasferimenti extra SEE.
4. Provider di posta aziendale, accessi interni e tempi adottati per messaggi, richieste e preventivi non conclusi.
5. Configurazione dell’account WhatsApp usato dall’azienda e regole interne di conservazione dei messaggi.
6. Che la piattaforma di pubblicazione non abiliti autonomamente Web Analytics, Speed Insights, bot protection con cookie, chat o altri script non presenti nel repository.

## Rischi residui

- Il dominio pubblico indicato nel progetto non era raggiungibile in modo affidabile durante l’audit; intestazioni HTTP e comportamento della piattaforma di produzione devono essere ricontrollati dopo il deployment.
- La CSP in un meta tag protegge il documento, ma alcune direttive e intestazioni di sicurezza devono essere configurate dal provider HTTP per la copertura completa.
- Policy e inventario vanno aggiornati prima di introdurre analytics, mappe/video incorporati, chat, newsletter, form server-side o altri fornitori.
- I testi sono basati sui dati presenti nel progetto e richiedono la conferma organizzativa sopra indicata.

## Fonti normative ufficiali

- [Garante — Linee guida cookie e altri strumenti di tracciamento, 10 giugno 2021](https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9677876)
- [Garante — FAQ Cookie](https://www.garanteprivacy.it/faq/cookie)
- [EDPB — Guidelines 05/2020 on consent under Regulation 2016/679](https://www.edpb.europa.eu/documents/guideline/guidelines-052020-on-consent-under-regulation-2016679_en)
- [EUR-Lex — Regolamento (UE) 2016/679, in particolare artt. 6, 12–13, 15–22, 25 e 44 ss.](https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=it)
- [EUR-Lex — Direttiva 2002/58/CE, art. 5, par. 3](https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX:02002L0058-20091219)
