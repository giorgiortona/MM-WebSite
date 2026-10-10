/* Catalogo M.M. Group — Segnaletica Luminosa, organizzato con la stessa struttura delle
   serie di segnaletica verticale: famiglia, scheda e varianti illustrate. */

export const lightSeriesFamilies = [
  { id: 'proiettori-led', macro: 'luminosa', label: 'Proiettori LED' },
  { id: 'impianti-alimentazione', macro: 'luminosa', label: 'Impianti e alimentazione' },
  { id: 'marker-stradali', macro: 'luminosa', label: 'Marker stradali' },
  { id: 'dissuasori-radar', macro: 'luminosa', label: 'Dissuasori e radar' },
  { id: 'sicurezza-luminosa', macro: 'luminosa', label: 'Sicurezza e attraversamenti' },
  { id: 'segnali-illuminazione', macro: 'luminosa', label: 'Segnali e illuminazione LED' },
  { id: 'cantiere-luminoso', macro: 'luminosa', label: 'Cantieri, semafori e guide' },
  { id: 'accessori-emergenza', macro: 'luminosa', label: 'Accessori ed emergenza' },
  { id: 'veicoli-strumenti', macro: 'luminosa', label: 'Automezzi e strumenti' },
];

const lightSeries = [
  {
    id: 'serie-proiettori-led',
    cat: 'proiettori-led',
    name: 'Proiettori LED',
    fig: 'Gamma M.M. Group · Proiettori LED',
    desc: 'Proiettori e impianti doppi a LED per segnalazione luminosa, disponibili in diverse dimensioni e configurazioni.',
    purpose: 'segnalare con elevata visibilità punti critici, impianti e pannelli stradali',
    names: `BASIC 100/101 e BASIC 102|BASIC 200|BASIC 201|BASIC 206|BASIC 302/303|Impianto doppio BASIC 201/206`,
    visual: 'lum-proiettori',
  },
  {
    id: 'serie-impianti-alimentazione',
    cat: 'impianti-alimentazione',
    name: 'Impianti sequenziali e alimentazione',
    fig: 'Gamma M.M. Group · Impianti e alimentazione',
    desc: 'Impianti sequenziali cablati o radio e kit di alimentazione da rete o fotovoltaici.',
    purpose: 'alimentare e coordinare dispositivi luminosi fissi o sequenziali',
    names: `Sequenza BASIC 200|D-Solar Radio|Kit fotovoltaici|Kit alimentatore/batteria`,
    visual: 'lum-impianti',
  },
  {
    id: 'serie-marker-stradali',
    cat: 'marker-stradali',
    name: 'Marker stradali e accessori',
    fig: 'Gamma M.M. Group · Marker stradali',
    desc: 'Marker luminosi da superficie o incasso, sistemi per punti pericolosi e accessori dedicati.',
    purpose: 'evidenziare margini, traiettorie e punti pericolosi anche in condizioni di scarsa visibilità',
    names: `Solartop 24|Solarground|Glasstop e Miniglasstop|Powerground 2|RGR|Side 25|Kronos|Kit punti pericolosi|TH200`,
    visual: 'lum-marker',
  },
  {
    id: 'serie-dissuasori-radar',
    cat: 'dissuasori-radar',
    name: 'Dissuasori di velocità e radar',
    fig: 'Gamma M.M. Group · Dissuasori e radar',
    desc: 'Display indicatori e sistemi radar per rilevare la velocità e richiamare l’attenzione del conducente.',
    purpose: 'moderare la velocità e rendere immediatamente percepibili le condizioni di rischio',
    names: `Indicator Flat|Indicator XL / XL Flat|Indicator Text|Indicator Flat+|Indicator Flat 2|Safetyradar|Safetyradar – LED Box`,
    visual: 'lum-radar',
  },
  {
    id: 'serie-sicurezza-luminosa',
    cat: 'sicurezza-luminosa',
    name: 'Dispositivi luminosi di sicurezza',
    fig: 'Gamma M.M. Group · Sicurezza luminosa',
    desc: 'Soluzioni luminose per attraversamenti pedonali, incroci, ghiaccio e attraversamento di animali.',
    purpose: 'rafforzare la sicurezza nei punti in cui la sola segnaletica passiva non è sufficiente',
    names: `Safety Cross – impianto lampeggiante|Safety Cross – configurazioni e alimentazione|Ecosolar|Attraversamento pedonale luminoso LED – Stratos P|Attraversamento pedonale luminoso LED – schema laterale|D-Solar e LED Box|Tempoflash|Animal Guardian e Animal Reflector`,
    visual: 'lum-sicurezza',
  },
  {
    id: 'serie-segnali-illuminazione',
    cat: 'segnali-illuminazione',
    name: 'Segnali e illuminazione LED',
    fig: 'Gamma M.M. Group · Segnali e illuminazione',
    desc: 'Segnali retroilluminati, delineatori d’ostacolo, corpi illuminanti, kit fotovoltaici e contatori di traffico.',
    purpose: 'illuminare e rendere leggibili segnali, attraversamenti e infrastrutture stradali',
    names: `Segnali LED retroilluminati|Delineatore speciale d’ostacolo LED|Segnali LED per passaggi pedonali|Maya|Trilogy Bust|Traffic 3000`,
    visual: 'lum-segnali',
  },
  {
    id: 'serie-cantiere-luminoso',
    cat: 'cantiere-luminoso',
    name: 'Segnaletica luminosa da cantiere',
    fig: 'Gamma M.M. Group · Cantieri e semafori',
    desc: 'Lampade, impianti sequenziali, semafori mobili, guide traffico, frecce e carrelli LED per cantieri.',
    purpose: 'guidare il traffico e delimitare in modo visibile cantieri, deviazioni e restringimenti',
    names: `D-Solo e Mini D-Solo|Super D-Lite|D-Star|D2-BASIC200|D2-Star, D4-Star e BASIC200 Radio|Impianti sequenziali LED senza fili e Tipo B|Visual LED 60×60 retroilluminato|Impianto semaforico mobile LED|Indicatore di direzione e guide traffico LTS|Frecce direzionali Serie ISS|Carrelli LED figure 400/401`,
    visual: 'lum-cantiere',
  },
  {
    id: 'serie-accessori-emergenza',
    cat: 'accessori-emergenza',
    name: 'Accessori, batterie ed emergenza',
    fig: 'Gamma M.M. Group · Accessori ed emergenza',
    desc: 'Accessori di posa, batterie, caricabatterie, torce, kit di emergenza e mini barre luminose.',
    purpose: 'completare, alimentare e rendere operativi gli impianti luminosi e le dotazioni di emergenza',
    names: `Accessori per segnaletica luminosa|Batterie, caricabatterie e D4 Box|Profiler II, Zeus LED, NX270 e torce|Impulse 102 e kit emergenza|Beacon 420, Mini Excalibur e Mini Scimitar`,
    visual: 'lum-emergenza',
  },
  {
    id: 'serie-veicoli-strumenti',
    cat: 'veicoli-strumenti',
    name: 'Dispositivi per automezzi e strumenti',
    fig: 'Gamma M.M. Group · Automezzi e strumenti',
    desc: 'Barre e moduli LED, rotanti, pannelli mobili, fari brandeggianti e strumenti di misura.',
    purpose: 'attrezzare automezzi operativi e supportare il controllo della visibilità della segnaletica',
    names: `Barre LED Excalibur e Scimitar|Rotanti e strobo 275, GF8.8, GDO, Turbo Star, CL199 e R65|Arrow, NCC Stik e BASIC Bar|Moduli LED NCC e pannello a messaggio variabile|NP130, Golight 2020 e Stryker 3051|Reflecto Horizontal e Reflecto Vertical|Reled 10`,
    visual: 'lum-veicoli',
  },
];

export const lightSeriesProducts = lightSeries.map((product) => {
  const variants = product.names.split('|').map((name) => ({
    name,
    desc: `${name}: configurazione disponibile nella gamma M.M. Group. Disponibilità e allestimento vengono definiti in base all’impiego.`,
  }));

  return {
    id: product.id,
    cat: product.cat,
    name: product.name,
    fig: product.fig,
    visual: product.visual,
    desc: `${product.desc} La gamma comprende ${variants.length} configurazioni illustrate e richiedibili singolarmente.`,
    specs: [
      ['Impiego', product.purpose],
      ['Configurazione', 'singola o in impianto, secondo modello'],
      ['Alimentazione', 'da rete, batteria o fotovoltaica, secondo articolo'],
      ['Fornitura', 'modello e accessori definiti su richiesta'],
    ],
    tags: ['segnaletica luminosa', product.cat, 'LED', 'catalogo completo'],
    variants,
  };
});
