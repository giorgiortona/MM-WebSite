/* Esempi di impiego della segnaletica luminosa: scenari reali, indicazioni d'uso
   per singolo prodotto e messaggi tipo per i display. Testi riscritti per il catalogo. */

export const lightExamples = {
  'serie-proiettori-led': {
    intro: 'Dove e come si montano più spesso i proiettori a LED.',
    items: [
      { icon: 'incrocio', title: 'Incroci e cuspidi', text: 'Installati sopra il segnale di precedenza o di pericolo, rendono evidente il punto critico anche di giorno e con scarsa visibilità.' },
      { icon: 'curva', title: 'Curve e punti pericolosi', text: 'Un proiettore singolo o un impianto doppio affiancato al segnale richiama l’attenzione prima della curva.' },
      { icon: 'velocita', title: 'Pannelli stradali', text: 'Si fissano alla sommità del pannello con staffa regolabile, da rete elettrica, batteria o pannello fotovoltaico.' },
    ],
  },
  'serie-impianti-alimentazione': {
    intro: 'Come si alimentano e si coordinano più dispositivi luminosi.',
    items: [
      { icon: 'rotatoria', title: 'Sequenze lungo la carreggiata', text: 'Più lampade si accendono in successione per guidare l’occhio del conducente lungo una deviazione o una curva.' },
      { icon: 'radio', title: 'Collegamento radio', text: 'Con il modello radio non servono cavi sulla sede stradale e il numero di lampade collegate non è limitato.' },
      { icon: 'batteria', title: 'Dove manca la rete', text: 'Kit fotovoltaici e kit batteria alimentano il segnale in punti isolati, senza lavori di scavo.' },
    ],
  },
  'serie-marker-stradali': {
    intro: 'I punti della strada dove i marker luminosi fanno la differenza.',
    items: [
      { icon: 'rotatoria', title: 'Rotatorie e cuspidi', text: 'Una fila di marker sul bordo della rotatoria o sulla cuspide ne disegna la forma di notte.' },
      { icon: 'galleria', title: 'Gallerie', text: 'Marker con led sui due lati segnano le pareti e mantengono leggibile il tracciato.' },
      { icon: 'nebbia', title: 'Curve e svincoli con nebbia', text: 'I marker catarifrangenti e luminosi restano visibili dove la nebbia è frequente.' },
      { icon: 'curva', title: 'Kit per punti pericolosi', text: 'Un impianto completo con marker fotovoltaici, pronto da posare lungo una curva o una strettoia.' },
    ],
  },
  'serie-dissuasori-radar': {
    intro: 'Dove si usano i display di velocità e i radar.',
    items: [
      { icon: 'scuola', title: 'Scuole e ospedali', text: 'Il display mostra la velocità rilevata e invita a rallentare nei punti più sensibili dell’abitato.' },
      { icon: 'cantiere', title: 'Cantieri', text: 'Un segnale attivo davanti al cantiere riduce la velocità di chi si avvicina.' },
      { icon: 'svincolo', title: 'Svincoli e rampe', text: 'Radar e lampeggianti segnalano il superamento del limite in ingresso ai centri abitati e sulle rampe di accesso.' },
      { icon: 'centro', title: 'Centri abitati e sensi unici', text: 'Il sistema con radar doppler attiva i lampeggianti solo quando serve.' },
    ],
    messages: [
      ['RALLENTA', 'INCROCIO'],
      ['PERICOLO', 'SCUOLA'],
      ['ZONA 30'],
      ['CENTRO', 'ABITATO'],
      ['CANTIERE', '1 KM'],
      ['PISTA', 'CICLABILE'],
      ['DIVIETO DI', 'TRANSITO'],
      ['GRAZIE', ':) :) :)'],
    ],
    messagesTitle: 'Messaggi di esempio sui display',
    messagesText: 'I display con testo e i modelli Flat+ permettono di impostare più messaggi su due righe e di attivarli a diverse soglie di velocità.',
  },
  'serie-sicurezza-luminosa': {
    intro: 'Situazioni in cui un dispositivo luminoso rafforza il segnale.',
    items: [
      { icon: 'incrocio', title: 'Incroci senza semaforo', text: 'Le lampade del Safety Cross si attivano su entrambi i lati della strada con trasmissione senza fili, senza cavi sulla sede stradale.' },
      { icon: 'attraversamento', title: 'Attraversamenti pedonali', text: 'Il segnale retroilluminato e i lampeggianti rendono visibile il passaggio, di giorno e di notte.' },
      { icon: 'animali', title: 'Animali selvatici', text: 'Animal Guardian si attiva con la luce dei fari, dal tramonto all’alba: un suono e un led blu lampeggiante tengono gli animali lontani dalla carreggiata.' },
      { icon: 'ghiaccio', title: 'Rischio ghiaccio', text: 'Tempoflash accende due lampeggianti quando la temperatura scende vicino allo zero, li tiene accesi finché risale e mostra la temperatura.' },
    ],
  },
  'serie-segnali-illuminazione': {
    intro: 'Dove si usano segnali retroilluminati e corpi illuminanti LED.',
    items: [
      { icon: 'attraversamento', title: 'Passaggi pedonali', text: 'Segnali e corpi illuminanti con ottica stradale illuminano il passaggio e chi lo attraversa.' },
      { icon: 'scuola', title: 'Scuole e aziende', text: 'Con il Time Box il segnale entra in funzione solo negli orari programmati, con lampeggio sincrono o alternato.' },
      { icon: 'fermata', title: 'Fermate e pensiline', text: 'Il kit fotovoltaico illumina fermate bus, pensiline, cancelli e chioschi dove non arriva la rete.' },
      { icon: 'traffico', title: 'Conteggio del traffico', text: 'Il contatore rileva veicoli e velocità in arrivo, in partenza o in entrambe le direzioni e produce grafici.' },
    ],
  },
  'serie-cantiere-luminoso': {
    intro: 'Come si usano lampade, semafori e frecce nei cantieri.',
    items: [
      { icon: 'cantiere', title: 'Delimitare il cantiere', text: 'Lampade a batteria o solari, singole o in sequenza, segnano margini e restringimenti.' },
      { icon: 'semaforo', title: 'Senso unico alternato', text: 'L’impianto semaforico mobile regola il transito alternato e, secondo la configurazione, anche incroci a T e tra più vie.' },
      { icon: 'svincolo', title: 'Deviazioni e svincoli', text: 'Frecce direzionali e indicatori guidano il traffico verso la corsia o l’uscita corretta.' },
      { icon: 'radio', title: 'Sequenze senza fili', text: 'Gli impianti radio si montano rapidamente, senza cavi tra le lampade e con un numero illimitato di punti luce.' },
    ],
  },
  'serie-accessori-emergenza': {
    intro: 'Dotazioni per completare l’impianto e per le emergenze.',
    items: [
      { icon: 'batteria', title: 'Batterie e ricarica', text: 'Caricabatterie e batterie ricaricabili mantengono operativi lampade e proiettori.' },
      { icon: 'incidente', title: 'Aree di pericolo e incidenti', text: 'Il kit di emergenza a LED segnala subito il pericolo con diversi modi di lampeggio.' },
      { icon: 'strumento', title: 'Torce per uso gravoso', text: 'Lampade portatili robuste per lavoro in strada, in galleria o di notte.' },
    ],
  },
  'serie-veicoli-strumenti': {
    intro: 'Dove servono barre luminose, rotanti e strumenti.',
    items: [
      { icon: 'auto', title: 'Mezzi di cantiere e manutenzione', text: 'Barre LED, rotanti e strobo rendono il veicolo visibile da lontano durante lavori e interventi.' },
      { icon: 'incrocio', title: 'Pannelli a messaggio variabile', text: 'Frecce e moduli sul mezzo indicano la corsia da seguire o il pericolo davanti.' },
      { icon: 'strumento', title: 'Controllo della segnaletica', text: 'Gli strumenti di misura verificano la retroriflessione di segnali e abbigliamento di sicurezza.' },
    ],
  },
};

/* Indicazioni d'uso per singolo prodotto: sostituiscono il testo generico nella scheda. */
export const lightVariantUses = {
  'serie-impianti-alimentazione::D-Solar Radio': 'si collega via radio, con numero di lampade illimitato e lampeggio sincrono.',
  'serie-marker-stradali::Solartop 24': 'marker fotovoltaico a led con funzionamento crepuscolare, senza cavi di alimentazione.',
  'serie-marker-stradali::RGR': 'segnala curve, svincoli e strettoie, soprattutto dove c’è nebbia.',
  'serie-marker-stradali::Side 25': 'marker per gallerie, rotatorie, cuspidi e punti pericolosi, con led sui due lati.',
  'serie-marker-stradali::Kronos': 'ideale per cuspidi, rotatorie e punti pericolosi, anche con alimentazione fotovoltaica.',
  'serie-marker-stradali::Kit punti pericolosi': 'impianto con marker a led fotovoltaici per cuspidi, rotatorie e punti pericolosi.',
  'serie-dissuasori-radar::Indicator Flat': 'con radar integrato, riduce la velocità vicino a scuole, cantieri e svincoli.',
  'serie-dissuasori-radar::Indicator XL / XL Flat': 'display di grandi dimensioni, leggibile da lontano.',
  'serie-dissuasori-radar::Indicator Text': 'mostra quattro messaggi personalizzabili su due righe, attivati a diverse soglie di velocità.',
  'serie-dissuasori-radar::Indicator Flat+': 'pannello a led con velocità rilevata e quattro messaggi attivabili a soglie diverse.',
  'serie-dissuasori-radar::Indicator Flat 2': 'con radar integrato, riduce la velocità vicino a scuole, cantieri e svincoli.',
  'serie-dissuasori-radar::Safetyradar': 'impianto lampeggiante con radar doppler per rilevare la velocità in prossimità di centri abitati e punti pericolosi.',
  'serie-dissuasori-radar::Safetyradar – LED Box': 'radar doppler con lampeggianti per rampe di accesso, sensi unici e punti pericolosi.',
  'serie-sicurezza-luminosa::Safety Cross – impianto lampeggiante': 'le lampade si attivano insieme sui due lati della strada, senza cavi sulla carreggiata.',
  'serie-sicurezza-luminosa::Safety Cross – configurazioni e alimentazione': 'si installa anche su segnali esistenti, con alimentazione da rete o fotovoltaica.',
  'serie-sicurezza-luminosa::D-Solar e LED Box': 'proiettore ad alte prestazioni per strade a scorrimento veloce, ideale per cuspidi, incroci e punti pericolosi.',
  'serie-sicurezza-luminosa::Tempoflash': 'avvisa della presenza di ghiaccio con due lampeggianti e mostra la temperatura in gradi.',
  'serie-sicurezza-luminosa::Animal Guardian e Animal Reflector': 'si attiva con i fari dal tramonto all’alba, con suono e led blu per tenere lontani gli animali selvatici.',
  'serie-segnali-illuminazione::Delineatore speciale d’ostacolo LED': 'disponibile con segnale retroilluminato e timer per attivarsi solo in certe ore, utile per scuole e aziende.',
  'serie-segnali-illuminazione::Maya': 'progettato per la sicurezza degli attraversamenti pedonali e utilizzabile anche come proiettore.',
  'serie-segnali-illuminazione::Trilogy Bust': 'illumina fermate bus, pensiline, cancelli, giardini e chioschi dove non arriva la rete elettrica.',
  'serie-segnali-illuminazione::Traffic 3000': 'rileva il traffico in arrivo, in partenza o bidirezionale e trasferisce i dati per le analisi.',
  'serie-cantiere-luminoso::D-Solo e Mini D-Solo': 'lampada da cantiere a lente infrangibile, nelle versioni standard e mini.',
  'serie-cantiere-luminoso::Impianti sequenziali LED senza fili e Tipo B': 'nessun limite al numero di lampade, con funzioni crepuscolare e sequenza selezionabili.',
  'serie-cantiere-luminoso::Impianto semaforico mobile LED': 'regola il senso unico alternato e, secondo la configurazione, incroci a T e tra più vie.',
  'serie-cantiere-luminoso::Indicatore di direzione e guide traffico LTS': 'segnala svincoli, spartitraffico, cuspidi e punti pericolosi, con pannello fotovoltaico o rete.',
  'serie-accessori-emergenza::Batterie, caricabatterie e D4 Box': 'il caricabatterie ricarica le batterie ricaricabili a ciclo profondo del catalogo.',
  'serie-accessori-emergenza::Impulse 102 e kit emergenza': 'kit a led per aree di pericolo e incidenti, con diversi modi di lampeggio.',
  'serie-accessori-emergenza::Profiler II, Zeus LED, NX270 e torce': 'lampade portatili robuste per uso gravoso.',
  'serie-veicoli-strumenti::Reflecto Horizontal e Reflecto Vertical': 'strumenti che misurano la retroriflessione di segnali stradali, segnaletica orizzontale e abbigliamento di sicurezza.',
  'serie-veicoli-strumenti::Reled 10': 'lampada portatile da lavoro o lampeggiante, utilizzabile anche all’aperto.',
};
