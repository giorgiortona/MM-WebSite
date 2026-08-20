export const PHONE_DISPLAY = '+39 320 246 0847';
export const PHONE_TEL = '+393202460847';
export const PHONE_WA = '393202460847';

export const site = {
  name: 'M.M. Group',
  legal: 'M.M. GROUP S.R.L.',
  payoff: 'Segnaletica stradale',
  phoneDisplay: PHONE_DISPLAY,
  phoneTel: PHONE_TEL,
  email: 'info@mmgroupsrl.cloud',
  pec: 'm.m.groupsrl@pec.it',
  vat: '01777780535',
  address: {
    street: 'Via Renato Pollini 10',
    zip: '58100',
    city: 'Grosseto',
    province: 'GR',
  },
};

/* Riferimenti normativi dichiarati nel listino */
export const compliance = [
  {
    code: 'EN 12899-1:2007',
    title: 'Segnaletica permanente',
    body: 'La segnaletica verticale permanente è prodotta in conformità alla norma armonizzata EN 12899-1:2007.',
  },
  {
    code: 'Marcatura CE',
    title: 'Certificato 0474-CPR-0653',
    body: 'Ogni fornitura è marcata CE sulla base del certificato n. 0474-CPR-0653 rilasciato da Rina Service S.p.A.',
  },
  {
    code: 'Reg. UE 305/11',
    title: 'Dichiarazione D.o.P.',
    body: 'Unitamente alla fornitura viene resa disponibile la Dichiarazione di Prestazione prevista dal Regolamento UE 305/2011.',
  },
];

export const stats = [
  { value: 3, suffix: '', label: 'Classi di pellicola', note: 'cl. 1 · cl. 2 · cl. 3' },
  { value: 10, suffix: '', label: 'Famiglie a catalogo', note: 'dal segnale al cantiere' },
  { value: 700, suffix: '+', label: 'Articoli codificati', note: 'alluminio e ferro' },
  { value: 30, suffix: '/10', label: 'Spessori disponibili', note: 'da 10/10 a 30/10' },
];

/* Voci di navigazione: numerate come progressive chilometriche */
export const nav = [
  { id: 'lavori', label: 'Lavori', km: '01' },
  { id: 'servizi', label: 'Servizi', km: '02' },
  { id: 'cantieri', label: 'Cantieri', km: '03' },
  { id: 'showreel', label: 'In opera', km: '04' },
  { id: 'catalogo', label: 'Catalogo', km: '05' },
  { id: 'qualita', label: 'Qualità', km: '06' },
  { id: 'contatti', label: 'Contatti', km: '07' },
];
