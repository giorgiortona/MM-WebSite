# M.M. Group S.r.l. — sito

Sito vetrina per **M.M. GROUP S.R.L.**, segnaletica stradale (Grosseto).
React + Vite + GSAP, senza backend: tutte le richieste di preventivo passano da
telefono, WhatsApp o posta.

## Avvio

```bash
npm install
npm run dev      # sviluppo su http://localhost:5173
npm run build    # produzione in dist/
npm run preview  # anteprima della build
```

La cartella `dist/` è statica: si pubblica su qualsiasi hosting (Netlify,
Vercel, Aruba, un semplice spazio FTP).

## Struttura

```
public/media/photos/   foto ottimizzate (webp 1800w e 900w + placeholder sfocato)
public/media/clips/    spezzoni video da 8 s con relativo poster
src/pages/Home.jsx     la home, con ScrollSmoother
src/pages/CatalogPage  la pagina catalogo
src/data/              contenuti: catalogo, servizi, foto, dati aziendali
src/components/        una cartella piatta, ogni componente con il suo CSS
src/styles/            token di design e base comune
src/lib/gsap.js        registrazione plugin ed ease dedicate
src/hooks/             ScrollSmoother e rivelazioni allo scroll
```

## Indirizzi

Il catalogo è una pagina a sé, raggiungibile anche da un collegamento diretto:

| Indirizzo | Cosa mostra |
|---|---|
| `/` | la home |
| `/#/catalogo` | le cinque aree |
| `/#/catalogo/verticale` | famiglie e articoli di un'area |
| `/#/catalogo/verticale/disco` | la scheda di un articolo |

La navigazione usa il **cancelletto** (`HashRouter`): i collegamenti diretti
funzionano su qualsiasi hosting, anche su un semplice spazio FTP, senza
regole di riscrittura lato server. Il tasto «indietro» del browser funziona
normalmente.

## Dove si modificano i contenuti

| Cosa | File |
|---|---|
| Telefono, email, PEC, sede, P. IVA | `src/data/site.js` |
| Voci di menu | `src/data/site.js` (`nav`) |
| Catalogo: macro aree, famiglie, articoli | `src/data/catalog.js` |
| Servizi e foto abbinate | `src/data/services.js` |
| Didascalie foto e spezzoni video | `src/data/gallery.js` |

Il numero per i preventivi è **+39 320 246 0847**: compare nell'intestazione,
nel menu, nella barra fissa, nella finestra di preventivo, nei contatti e nel
piè di pagina. Si cambia in un solo punto, `PHONE_DISPLAY` / `PHONE_TEL` /
`PHONE_WA` in `src/data/site.js`.

## Scelte tecniche da tenere presenti

- **Il catalogo ha tre livelli**: macro area → famiglia → scheda articolo.
  `macros`, `families` e `products` in `src/data/catalog.js` sono legati dai
  campi `macro` e `cat`. Per aggiungere un articolo basta una voce in
  `products` con il `cat` di una famiglia esistente, più una figura in
  `src/components/ProductFigure.jsx` con lo stesso `id`.
- **Le figure degli articoli sono disegnate in SVG**, non fotografate. Le
  immagini di segnaletica reperibili in rete sono quasi tutte sotto licenza
  CC BY-SA, che impone attribuzione e condivisione allo stesso modo: un
  vincolo che su un sito commerciale conviene evitare. I disegni ricalcano le
  figure del Codice della Strada, restano nitidi a ogni dimensione e non
  portano vincoli. Se arrivano foto di prodotto vostre, si sostituiscono
  scheda per scheda.
- **La sezione catalogo ha fondo chiaro** per staccare dal resto del sito; le
  bande `.teaser__fade` sopra e sotto sono alte il triplo del riquadro e
  scorrono con la pagina, così il passaggio di colore segue il movimento.
- **Nessun prezzo è esposto.** Ogni scheda porta a «Richiedi preventivo», che
  apre la finestra con il numero di telefono.
- **I prezzi del listino non sono nel repository**: da lì provengono solo
  materiali, misure, classi di pellicola e riferimenti al Codice della Strada.
- **Gli spezzoni video** sono ritagli di 8 s dai filmati originali, senza audio,
  con `preload="none"`: partono solo quando la scheda entra nello schermo. I
  due filmati del capannone sono ritagliati al centro perché il watermark di
  TikTok si sposta lungo tutti i bordi.
- **L'animazione di caricamento** si vede una volta per sessione del browser
  (`sessionStorage`), per non farla rivedere a ogni ricarica.
- **Transform e GSAP**: gli stati iniziali degli elementi animati da GSAP si
  impostano con `gsap.set`, non in CSS. Un `transform` in CSS verrebbe letto da
  GSAP come traslazione in pixel e resterebbe sommato agli spostamenti
  percentuali.
- **`prefers-reduced-motion`** disattiva ScrollSmoother, il parallasse e
  l'animazione di caricamento.

## Rigenerare i media

Le foto e i video di partenza stanno nella cartella superiore. Gli originali
non vengono pubblicati: le versioni web sono generate con `ffmpeg` e `cwebp`
(vedi `public/media/`). Due foto sono state ritagliate in basso per togliere il
watermark della fotocamera, e i filmati del capannone per togliere quello di
TikTok.
# MM-WebSite
