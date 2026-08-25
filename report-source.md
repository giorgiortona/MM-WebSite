# Audit privacy e cookie — fonte interna

**Destinatario:** titolare e manutentore del sito M.M. Group  
**Data:** 25 agosto 2026  
**Ambito:** codice locale React/Vite, build e runtime locale; pubblico Italia e UE/SEE  
**Assunzione verificata dal codice:** sito corporate e catalogo, senza account, pagamenti, newsletter o invio server-side del modulo.

## Risposta diretta

Il progetto rientra nel **Caso A**. Dopo la sostituzione di Google Fonts con file locali, il codice non installa cookie, non usa Web Storage o IndexedDB, non carica analytics, pixel, tag manager, iframe o contenuti social incorporati. Non è necessario un banner di consenso: sono necessarie informative accessibili e coerenti con i trattamenti reali.

## Limiti materiali

- Il dominio `https://www.mmgroupsrl.cloud/` non è risultato raggiungibile in modo affidabile durante l’audit.
- Il repository non identifica provider, regione, configurazione dei log, durata dei log o contratto di nomina del responsabile.
- L’audit non copre strumenti eventualmente iniettati dalla piattaforma di hosting dopo il deployment.
- Il risultato è una verifica tecnica e documentale, non una certificazione di conformità né un parere legale.

## Sintesi dell’evidenza

- Ricerca statica: nessun uso di `document.cookie`, `localStorage`, `sessionStorage`, `indexedDB`, analytics, pixel, tag manager, iframe o beacon.
- Inventario runtime locale: 101 asset osservati, tutti della stessa origine; font serviti da `/fonts/`; nessun asset esterno.
- Compositore preventivo: i valori restano nello stato React; il click prepara `mailto:` o `https://wa.me/` ma nessuna richiesta parte prima dell’azione.
- Nuova sessione: nessun banner, iframe o asset esterno; link alle policy presenti.
- Console: nessun warning o errore nel flusso verificato.

## Ledger claim-to-source

| Affermazione | Fonte primaria | Data/aggiornamento | URL | Confidenza |
|---|---|---|---|---|
| Cookie tecnici e identificatori tecnici richiedono informativa, non consenso | Garante, Linee guida cookie e altri strumenti di tracciamento | 10 giugno 2021 | https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9677876 | Alta |
| Con soli cookie/strumenti tecnici non serve banner | Garante, Linee guida, par. 7.1 e FAQ Cookie n. 12 | 10 giugno 2021; pagina consultata 25 agosto 2026 | https://www.garanteprivacy.it/faq/cookie | Alta |
| Gli strumenti non tecnici richiedono consenso preventivo | Garante, Linee guida cookie e altri strumenti di tracciamento | 10 giugno 2021 | https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9677876 | Alta |
| Il consenso deve essere libero, specifico, informato e inequivocabile; no cookie wall generalizzato | EDPB, Guidelines 05/2020 on consent | 4 maggio 2020 | https://www.edpb.europa.eu/documents/guideline/guidelines-052020-on-consent-under-regulation-2016679_en | Alta |
| Informativa: titolare, finalità, base, destinatari, conservazione, diritti e reclamo | GDPR, artt. 12–13 | testo vigente consultato 25 agosto 2026 | https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=it | Alta |
| Privacy by design/default e minimizzazione | GDPR, art. 25 | testo vigente consultato 25 agosto 2026 | https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=it | Alta |
| Trasferimenti extra SEE soggetti al capo V | GDPR, artt. 44 e seguenti | testo vigente consultato 25 agosto 2026 | https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=it | Alta |

## Criterio di arresto della ricerca

Le regole decisive per la scelta del banner, i contenuti minimi dell’informativa, la minimizzazione e i trasferimenti dispongono di fonti primarie applicabili a Italia/UE. Ulteriore ricerca commerciale o su CMP non cambierebbe la soluzione tecnica del progetto attuale.
