import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { site } from '../data/site';
import Footer from '../components/Footer';
import './LegalPage.css';

const LAST_UPDATED = '25 agosto 2026';

function ExternalLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function BackToSite({ variant = 'default' }) {
  return (
    <Link className={`legal__back legal__back--${variant}`} to="/">
      Torna al sito
    </Link>
  );
}

function LegalHeader({ eyebrow, title, lead }) {
  return (
    <header className="legal__hero">
      <div className="shell legal__hero-action">
        <BackToSite variant="hero" />
      </div>
      <div className="shell legal__hero-grid">
        <div>
          <p className="legal__eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
        </div>
        <div className="legal__intro">
          <p>{lead}</p>
          <span>Ultimo aggiornamento: {LAST_UPDATED}</span>
        </div>
      </div>
    </header>
  );
}

function PrivacyContent() {
  return (
    <>
      <LegalHeader
        eyebrow="Informativa ai sensi dell’art. 13 GDPR"
        title="Privacy policy"
        lead="Questa informativa descrive i trattamenti collegati alla consultazione del sito e alle richieste di contatto. Il sito non effettua profilazione e non utilizza analytics."
      />

      <div className="shell legal__layout">
        <nav className="legal__index" aria-label="Indice della privacy policy">
          <span>In questa pagina</span>
          <a href="#titolare">Titolare</a>
          <a href="#dati-finalita">Dati e finalità</a>
          <a href="#contatti-esterni">Contatti e servizi esterni</a>
          <a href="#destinatari">Destinatari e trasferimenti</a>
          <a href="#conservazione">Conservazione</a>
          <a href="#diritti">Diritti</a>
        </nav>

        <article className="legal__article">
          <section id="titolare">
            <p className="legal__section-num">01</p>
            <h2>Titolare del trattamento</h2>
            <p>
              Il titolare è <strong>{site.legal}</strong>, P. IVA e C.F. {site.vat}, con sede in{' '}
              {site.address.street}, {site.address.zip} {site.address.city} ({site.address.province}).
            </p>
            <p>
              Per richieste relative alla protezione dei dati: <a href={`mailto:${site.email}`}>{site.email}</a>{' '}
              oppure PEC <a href={`mailto:${site.pec}`}>{site.pec}</a>.
            </p>
          </section>

          <section id="dati-finalita">
            <p className="legal__section-num">02</p>
            <h2>Dati trattati, finalità e basi giuridiche</h2>
            <div className="legal__cards">
              <div className="legal__card">
                <h3>Dati di navigazione</h3>
                <p>
                  I sistemi che rendono disponibile il sito possono registrare dati tecnici come indirizzo IP,
                  data e ora, pagina richiesta, esito della risposta, browser e sistema operativo. Sono usati per
                  erogare e proteggere il sito, diagnosticare anomalie e prevenire abusi.
                </p>
                <p>
                  <strong>Base giuridica:</strong> legittimo interesse del titolare alla sicurezza e al corretto
                  funzionamento del servizio, art. 6, par. 1, lett. f) GDPR.
                </p>
              </div>
              <div className="legal__card">
                <h3>Dati inseriti per il preventivo</h3>
                <p>
                  Nome, azienda, argomento e dettagli restano nel browser mentre si compone la richiesta. Il sito
                  non li salva e non li invia a un proprio server. Solo l’azione dell’utente apre l’app di posta o
                  WhatsApp con il testo preparato.
                </p>
              </div>
              <div className="legal__card">
                <h3>Dati inviati volontariamente</h3>
                <p>
                  Quando l’utente telefona o invia un messaggio, il titolare tratta i dati ricevuti per rispondere,
                  predisporre un preventivo e gestire eventuali rapporti precontrattuali o contrattuali.
                </p>
                <p>
                  <strong>Base giuridica:</strong> misure precontrattuali o contratto, art. 6, par. 1, lett. b), e,
                  per richieste professionali o istituzionali, legittimo interesse alla gestione del contatto,
                  art. 6, par. 1, lett. f) GDPR. Gli obblighi di legge si basano sull’art. 6, par. 1, lett. c).
                </p>
              </div>
            </div>
          </section>

          <section id="contatti-esterni">
            <p className="legal__section-num">03</p>
            <h2>Contatti e collegamenti esterni</h2>
            <p>
              WhatsApp, Google Maps e Instagram non sono incorporati nella pagina: il sito non carica i loro
              script, mappe, pixel o iframe. La connessione al relativo fornitore avviene soltanto dopo il click
              dell’utente, che lascia questo sito. Da quel momento il trattamento è disciplinato anche
              dall’informativa del servizio scelto.
            </p>
            <p>
              Nel caso di WhatsApp, il testo inserito viene incluso nel collegamento solo quando l’utente seleziona
              “Invia su WhatsApp”; l’invio effettivo richiede un’ulteriore azione nell’applicazione.
            </p>
          </section>

          <section id="destinatari">
            <p className="legal__section-num">04</p>
            <h2>Destinatari e trasferimenti</h2>
            <p>
              Possono accedere ai dati, nei limiti delle rispettive funzioni, personale autorizzato, consulenti e
              fornitori tecnici o di hosting che operano per conto del titolare. I dati possono inoltre essere
              comunicati quando richiesto dalla legge o da un’autorità competente.
            </p>
            <p>
              Il codice del sito non invia automaticamente dati a servizi analytics, pubblicitari o social. Gli
              eventuali trasferimenti collegati al provider di hosting o ai servizi esterni scelti dall’utente
              dipendono dalla loro configurazione e devono avvenire nel rispetto degli artt. 44 e seguenti del
              GDPR, sulla base di una decisione di adeguatezza o di garanzie appropriate quando necessarie.
            </p>
          </section>

          <section id="conservazione">
            <p className="legal__section-num">05</p>
            <h2>Conservazione</h2>
            <p>
              I dati tecnici sono conservati per il tempo strettamente necessario all’erogazione, alla sicurezza e
              alla diagnosi del servizio, salvo esigenze di accertamento di abusi o obblighi di legge. I dati delle
              richieste sono conservati per il tempo necessario a rispondere e gestire il rapporto; quelli relativi
              a preventivi accettati, contratti e documenti amministrativi seguono i termini previsti dalla legge.
            </p>
            <p>Il sito non memorizza in modo persistente i dati digitati nel compositore della richiesta.</p>
          </section>

          <section id="diritti">
            <p className="legal__section-num">06</p>
            <h2>Diritti dell’interessato</h2>
            <p>
              Nei casi previsti, l’interessato può chiedere accesso, rettifica, cancellazione, limitazione,
              portabilità e opposizione al trattamento ai sensi degli artt. 15–22 GDPR. Le richieste possono essere
              inviate ai contatti del titolare indicati sopra.
            </p>
            <p>
              È inoltre possibile proporre reclamo al{' '}
              <ExternalLink href="https://www.garanteprivacy.it/">Garante per la protezione dei dati personali</ExternalLink>{' '}
              o all’autorità di controllo competente nello Stato SEE in cui si vive o lavora, o nel quale si ritiene
              sia avvenuta la violazione.
            </p>
          </section>

          <section>
            <p className="legal__section-num">07</p>
            <h2>Cookie e aggiornamenti</h2>
            <p>
              Per il dettaglio delle tecnologie utilizzate consulta la <Link to="/cookie-policy">cookie policy</Link>.
              L’informativa potrà essere aggiornata quando cambiano servizi, finalità o obblighi normativi; la data
              in alto identifica la versione corrente.
            </p>
          </section>
        </article>
      </div>
    </>
  );
}

function CookieContent() {
  return (
    <>
      <LegalHeader
        eyebrow="Tecnologie presenti nel sito"
        title="Cookie policy"
        lead="Alla data dell’ultima verifica il sito non installa cookie, non usa identificatori nel browser e non carica strumenti analytics, pubblicitari o di profilazione."
      />

      <div className="shell legal__layout">
        <nav className="legal__index" aria-label="Indice della cookie policy">
          <span>In questa pagina</span>
          <a href="#scelta-banner">Scelta del banner</a>
          <a href="#inventario-cookie">Inventario</a>
          <a href="#servizi-link">Servizi esterni</a>
          <a href="#cambiamenti">Aggiornamenti della policy</a>
        </nav>

        <article className="legal__article">
          <section id="scelta-banner">
            <p className="legal__section-num">01</p>
            <h2>Perché non compare un banner</h2>
            <div className="legal__notice">
              <strong>Configurazione attuale: nessun consenso richiesto</strong>
              <p>
                Non sono presenti cookie o strumenti facoltativi. Per questo un banner “Accetta/Rifiuta” non
                offrirebbe una scelta reale. Il Garante prevede che, quando sono utilizzati soltanto strumenti
                tecnici, l’informazione possa essere resa nell’informativa generale senza un banner.
              </p>
            </div>
          </section>

          <section id="inventario-cookie">
            <p className="legal__section-num">02</p>
            <h2>Inventario tecnico</h2>
            <div className="legal__inventory" role="list">
              <div role="listitem">
                <strong>Cookie di prima parte</strong>
                <span>Nessuno impostato dall’applicazione</span>
              </div>
              <div role="listitem">
                <strong>Cookie di terza parte</strong>
                <span>Nessuno caricato dal sito</span>
              </div>
              <div role="listitem">
                <strong>LocalStorage e sessionStorage</strong>
                <span>Non utilizzati</span>
              </div>
              <div role="listitem">
                <strong>IndexedDB</strong>
                <span>Non utilizzato</span>
              </div>
              <div role="listitem">
                <strong>Analytics, pixel e tag manager</strong>
                <span>Non presenti</span>
              </div>
              <div role="listitem">
                <strong>Font e contenuti incorporati</strong>
                <span>Font, immagini e video sono serviti localmente; nessun iframe</span>
              </div>
            </div>
            <p>
              I normali log del server o della rete di distribuzione non sono cookie e non leggono informazioni dal
              dispositivo dell’utente; possono comunque contenere dati di navigazione e sono descritti nella{' '}
              <Link to="/privacy">privacy policy</Link>.
            </p>
          </section>

          <section id="servizi-link">
            <p className="legal__section-num">03</p>
            <h2>Collegamenti a servizi esterni</h2>
            <p>
              I pulsanti verso WhatsApp, Google Maps e Instagram sono normali collegamenti. Prima del click non
              vengono effettuate richieste ai relativi domini e non sono presenti preconnect, iframe o script dei
              fornitori. Aprendo il collegamento si visita un servizio distinto, che può utilizzare cookie secondo
              la propria informativa.
            </p>
          </section>

          <section id="cambiamenti">
            <p className="legal__section-num">04</p>
            <h2>Aggiornamenti della policy</h2>
            <p>
              Se in futuro il sito adotterà nuovi servizi che utilizzano cookie o altre tecnologie facoltative,
              questa informativa verrà aggiornata prima della loro attivazione. Quando richiesto, tali servizi
              saranno disponibili solo dopo una scelta esplicita dell’utente.
            </p>
          </section>

          <section>
            <p className="legal__section-num">05</p>
            <h2>Riferimenti ufficiali</h2>
            <ul className="legal__links">
              <li>
                <ExternalLink href="https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9677876">
                  Garante — Linee guida cookie e altri strumenti di tracciamento, 10 giugno 2021
                </ExternalLink>
              </li>
              <li>
                <ExternalLink href="https://www.garanteprivacy.it/faq/cookie">Garante — FAQ Cookie</ExternalLink>
              </li>
              <li>
                <ExternalLink href="https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=it">
                  EUR-Lex — Regolamento (UE) 2016/679
                </ExternalLink>
              </li>
              <li>
                <ExternalLink href="https://www.edpb.europa.eu/documents/guideline/guidelines-052020-on-consent-under-regulation-2016679_en">
                  EDPB — Guidelines 05/2020 sul consenso
                </ExternalLink>
              </li>
            </ul>
          </section>
        </article>
      </div>
    </>
  );
}

export default function LegalPage({ type, onNavigate }) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${type === 'privacy' ? 'Privacy policy' : 'Cookie policy'} — ${site.legal}`;
    return () => {
      document.title = previousTitle;
    };
  }, [type]);

  const scrollToTop = () => window.scrollTo(0, 0);

  return (
    <div className="legal">
      <main>{type === 'privacy' ? <PrivacyContent /> : <CookieContent />}</main>
      <div className="legal__bottom-action">
        <div className="shell">
          <BackToSite />
        </div>
      </div>
      <Footer onNavigate={onNavigate} onTop={scrollToTop} />
    </div>
  );
}
