/* Segnale di lavori (figura II 383) ricostruito in vettoriale, in proporzione
   con il segnale originale: triangolo con bordo nero e filetto giallo, campo
   interno giallo e pittogramma dell'operaio con la pala. Le coordinate sono
   quelle del disegno di riferimento (larghezza 1832, altezza 1572). */
const RED = '#BE123C';
const YELLOW = '#F8E616';
const BLACK = '#1A181A';

export default function LavoriSign({ cx, top, width, gloss = false }) {
  const scale = width / 1832;

  return (
    <g transform={`translate(${cx} ${top}) scale(${scale}) translate(-964 -148)`}>
      <path d="M964 287 170 1650H1758z" fill={BLACK} stroke={BLACK} strokeWidth="140" strokeLinejoin="round" />
      <path d="M964 287 170 1650H1758z" fill={YELLOW} stroke={YELLOW} strokeWidth="116" strokeLinejoin="round" />
      <path d="M964 287 170 1650H1758z" fill={RED} stroke={RED} strokeWidth="96" strokeLinejoin="round" />
      <path d="M963 505 378 1523H1548z" fill={YELLOW} />

      <g fill={BLACK}>
        <circle cx="1074" cy="930" r="58" />
        <path d="M806 902H945Q972 902 980 915L1035 990Q1058 1022 1052 1045L966 1205 958 1225 972 1240Q985 1270 970 1300Q925 1385 890 1450Q865 1485 835 1472Q815 1455 828 1425L895 1283 808 1172V1292L768 1448Q755 1482 725 1480Q692 1475 697 1430L735 1292V1125Q735 1100 765 1085Q748 1075 748 1060L715 1030Q710 1015 722 1015L752 1035 776 935Q784 902 806 902Z" />
        <path d="M975 1480Q990 1450 1045 1445Q1045 1410 1085 1408Q1100 1370 1150 1355Q1210 1290 1280 1368Q1335 1360 1340 1420Q1365 1425 1362 1445Q1405 1447 1422 1480Z" />
      </g>
      <path d="M958 1225 1150 1362" stroke={BLACK} strokeWidth="11" fill="none" />
      <path d="M825 972H878L808 1042zM870 1130 955 1092 915 1165z" fill={YELLOW} />
      {gloss && (
        <>
          <defs>
            <linearGradient id="lv-sheen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
              <stop offset="0.42" stopColor="#fff" stopOpacity="0.08" />
              <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
              <stop offset="1" stopColor="#fff" stopOpacity="0.14" />
            </linearGradient>
          </defs>
          <path d="M964 287 170 1650H1758z" fill="url(#lv-sheen)" stroke="url(#lv-sheen)" strokeWidth="96" strokeLinejoin="round" />
        </>
      )}
    </g>
  );
}
