/* Un'unica anagrafica delle foto: ogni componente visivo pesca da qui. */
export const photos = {
  'rotatoria-aerea': {
    ratio: 1122 / 1402,
    alt: 'Vista aerea di una rotatoria con segnaletica orizzontale gialla e bianca appena realizzata',
    caption: 'Rotatoria completa — zebrature, isole e frecce',
    place: 'Vista aerea',
  },
  'napoli-autostrada': {
    ratio: 2048 / 1412,
    alt: 'Scritta NAPOLI in vernice bianca su corsia autostradale con squadra al lavoro',
    caption: 'Iscrizioni di preselezione su corsia autostradale',
    place: 'Autostrada · diurno',
  },
  'bari-notturna': {
    ratio: 2048 / 1024,
    alt: 'Scritta BARI in vernice bianca realizzata di notte con macchina traccialinee',
    caption: 'Tracciamento notturno con macchina spartitraffico',
    place: 'Autostrada · notturno',
  },
  'cerignola-notte': {
    ratio: 1152 / 1740,
    alt: 'Iscrizione CERIGNOLA su asfalto ripresa di notte dai fari del mezzo operativo',
    caption: 'Resa della pellicola rifrangente sotto i fari',
    place: 'Notturno',
  },
  'casello-autostradale': {
    ratio: 1152 / 2048,
    alt: 'Casello autostradale di notte con segnaletica gialla di cantiere e segnali provvisori',
    caption: 'Deviazione provvisoria in area casello',
    place: 'Casello · cantiere',
  },
  'strada-nuova': {
    ratio: 1152 / 2048,
    alt: 'Strada di nuova costruzione con linea di mezzeria tratteggiata e margine continuo',
    caption: 'Mezzeria e margini su nuovo tappeto',
    place: 'Viabilità nuova',
  },
  'corsia-ciclabile': {
    ratio: 1152 / 2048,
    alt: 'Corsia dedicata con linea tratteggiata e segnaletica verticale di indicazione',
    caption: 'Corsia dedicata e segnale di direzione obbligatoria',
    place: 'Ambito urbano',
  },
  'rotatoria-frecce': {
    ratio: 2048 / 1152,
    alt: 'Rotatoria con zebrature, frecce direzionali e segnale di senso vietato',
    caption: 'Isola di canalizzazione e frecce direzionali',
    place: 'Intersezione',
  },
  'attraversamento-colorato': {
    ratio: 2048 / 1152,
    alt: 'Attraversamento pedonale colorato in rosso e giallo con coni di delimitazione',
    caption: 'Attraversamento ad alta visibilità',
    place: 'Centro abitato',
  },
  'stallo-ricarica': {
    ratio: 2048 / 1152,
    alt: 'Stalli di ricarica per veicoli elettrici delimitati in giallo con simboli blu',
    caption: 'Stalli di ricarica elettrica',
    place: 'Area di sosta',
  },
  'a27-belluno': {
    ratio: 2000 / 1500,
    alt: 'Autostrada A27 verso Belluno con iscrizioni di preselezione e mezzo di scorta',
    caption: 'Preselezione con mezzo di protezione a seguire',
    place: 'A27 · Belluno',
  },
};

export const src = (slug, size = 1800) => `/media/photos/${slug}-${size}.webp`;
export const lqip = (slug) => `/media/photos/${slug}-lqip.jpg`;

/* Scorrimento orizzontale "Cantieri" */
export const cantieriReel = [
  'napoli-autostrada',
  'strada-nuova',
  'rotatoria-frecce',
  'casello-autostradale',
  'attraversamento-colorato',
  'corsia-ciclabile',
  'a27-belluno',
  'stallo-ricarica',
];

/* Mosaico bento */
export const mosaic = [
  { slug: 'bari-notturna', span: 'wide' },
  { slug: 'cerignola-notte', span: 'tall' },
  { slug: 'stallo-ricarica', span: 'std' },
  { slug: 'attraversamento-colorato', span: 'std' },
];

/* Spezzoni video: 8 secondi ciascuno, tagliati dai filmati di cantiere */
export const clips = [
  {
    slug: 'urbano-mezzeria',
    orientation: 'v',
    title: 'Mezzeria urbana',
    note: 'Percorrenza a lavoro concluso',
  },
  {
    slug: 'traccia-in-opera',
    orientation: 'v',
    title: 'Traccia in opera',
    note: 'Macchina spartitraffico su margine',
  },
  {
    slug: 'notturna-rifrangenza',
    orientation: 'v',
    title: 'Rifrangenza notturna',
    note: 'Resa della vernice dopo il tramonto',
  },
  {
    slug: 'urbano-pedonale',
    orientation: 'v',
    title: 'Attraversamenti',
    note: 'Strisce pedonali e linee di arresto',
  },
  {
    slug: 'urbano-svincolo',
    orientation: 'v',
    title: 'Svincolo',
    note: 'Canalizzazione e frecce',
  },
  {
    slug: 'autostrada-zebrata',
    orientation: 'v',
    title: 'Zebratura autostradale',
    note: 'Cuspide di uscita',
  },
  {
    slug: 'capannone-corsie',
    orientation: 'h',
    title: 'Corsie interne',
    note: 'Segnaletica industriale su pavimento',
  },
  {
    slug: 'capannone-stalli',
    orientation: 'h',
    title: 'Stalli e percorsi',
    note: 'Logistica e percorsi pedonali',
  },
];
