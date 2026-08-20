import { useRef, useState } from 'react';
import { gsap, useGSAP, SplitText } from '../lib/gsap';
import { site, PHONE_TEL, PHONE_WA } from '../data/site';
import './Contact.css';

const SUBJECTS = [
  'Segnaletica orizzontale',
  'Segnaletica verticale',
  'Barriere e cantiere',
  'Fornitura da catalogo',
  'Altro',
];

/* Il sito è statico: il modulo non invia da solo, compone il messaggio e lo
   consegna al canale scelto (WhatsApp o posta). Nessun dato resta qui. */
export default function Contact() {
  const root = useRef(null);
  const [form, setForm] = useState({
    nome: '',
    azienda: '',
    subject: SUBJECTS[0],
    dettagli: '',
  });

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);

      const split = new SplitText(q('.contact__phone-num'), {
        type: 'chars',
        charsClass: 'contact-char',
        mask: 'chars',
      });

      gsap.from(split.chars, {
        yPercent: 115,
        duration: 0.8,
        ease: 'panel',
        stagger: 0.025,
        scrollTrigger: { trigger: q('.contact__phone'), start: 'top 85%' },
      });

      gsap.from(q('[data-reveal]'), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'brake',
        stagger: 0.06,
        scrollTrigger: { trigger: root.current, start: 'top 72%' },
      });

      return () => split.revert();
    },
    { scope: root }
  );

  const body = () => {
    const lines = [
      `Richiesta: ${form.subject}`,
      form.nome && `Nome: ${form.nome}`,
      form.azienda && `Azienda: ${form.azienda}`,
      '',
      form.dettagli || 'Vorrei ricevere un preventivo.',
    ].filter(Boolean);
    return lines.join('\n');
  };

  const waHref = `https://wa.me/${PHONE_WA}?text=${encodeURIComponent(body())}`;
  const mailHref = `mailto:${site.email}?subject=${encodeURIComponent(
    `Richiesta preventivo — ${form.subject}`
  )}&body=${encodeURIComponent(body())}`;

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <section className="section contact" id="contatti" ref={root}>
      <div className="shell contact__grid">
        <div className="contact__intro">
          <p className="eyebrow" data-reveal>
            <span className="eyebrow__num">07</span> Contatti
          </p>

          <h2 className="section-title" data-reveal>
            Un preventivo si fa in una telefonata
          </h2>

          <a className="contact__phone" href={`tel:${PHONE_TEL}`}>
            <span className="contact__phone-label" data-reveal>
              Chiamaci
            </span>
            <span className="contact__phone-num">{site.phoneDisplay}</span>
          </a>

          <dl className="contact__details">
            <div data-reveal>
              <dt>Sede</dt>
              <dd>
                {site.address.street}
                <br />
                {site.address.zip} {site.address.city} ({site.address.province})
              </dd>
            </div>
            <div data-reveal>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </dd>
            </div>
            <div data-reveal>
              <dt>PEC</dt>
              <dd>
                <a href={`mailto:${site.pec}`}>{site.pec}</a>
              </dd>
            </div>
            <div data-reveal>
              <dt>P. IVA / C.F.</dt>
              <dd>{site.vat}</dd>
            </div>
          </dl>

          <a
            className="contact__map"
            href={`https://maps.google.com/?q=${encodeURIComponent(
              `${site.address.street} ${site.address.zip} ${site.address.city}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal
          >
            Apri la mappa
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 17 17 7m0 0H9m8 0v8" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </a>
        </div>

        <div className="contact__form" data-reveal>
          <h3 className="contact__form-title">Prepara la richiesta</h3>
          <p className="contact__form-note">
            Compila i campi: il testo viene preparato e inviato tramite WhatsApp o posta, così
            arriva completo già alla prima risposta.
          </p>

          <div className="field">
            <label htmlFor="c-nome">Nome e cognome</label>
            <input id="c-nome" type="text" value={form.nome} onChange={set('nome')} placeholder="Mario Rossi" />
          </div>

          <div className="field">
            <label htmlFor="c-azienda">Azienda o ente</label>
            <input
              id="c-azienda"
              type="text"
              value={form.azienda}
              onChange={set('azienda')}
              placeholder="Comune di…"
            />
          </div>

          <div className="field">
            <label htmlFor="c-subject">Di cosa hai bisogno</label>
            <select id="c-subject" value={form.subject} onChange={set('subject')}>
              {SUBJECTS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="c-dettagli">Dettagli</label>
            <textarea
              id="c-dettagli"
              rows={4}
              value={form.dettagli}
              onChange={set('dettagli')}
              placeholder="Quantità, misure, classe di pellicola, luogo di consegna…"
            />
          </div>

          <div className="contact__actions">
            <a className="btn" href={waHref} target="_blank" rel="noopener noreferrer">
              Invia su WhatsApp
            </a>
            <a className="btn btn--ghost" href={mailHref}>
              Invia per email
            </a>
          </div>

          <p className="contact__privacy">
            Nessun dato viene salvato o trasmesso da questa pagina: il messaggio si apre nella tua
            app e lo invii tu.
          </p>
        </div>
      </div>
    </section>
  );
}
