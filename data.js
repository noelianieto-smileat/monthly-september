/* ============================================================
   CONTENIDO DEL INFORME — edítalo cada mes
   ------------------------------------------------------------
   - Cambia MES
   - Rellena MIMO (mantener / incorporar / mejorar / omitir)
   - Rellena PROMOS con los lanzamientos del mes (y sus
     creatividades, se muestran en un carrusel dentro de
     cada tarjeta)
   - Rellena META_KPIS_ECOMMERCE / META_KPIS_MARCA / META_CREATIVOS
   - Rellena GOOGLE_KPIS / GOOGLE_CAMPANAS
   - El ORDEN en que escribas las creatividades de Meta es el
     orden en que se muestran → colócalas de mejor a peor.
   ============================================================ */

const MES = "26 jul – 13 sep 2026"; // 👈 rango de este informe (no es un mes natural, sino "desde el último informe")
const COMPARATIVA = "del periodo"; // 👈 este export no trae comparación con el periodo anterior, así que no hay deltas esta vez

/* ------------------------------------------------------------
   MIMO — compartido entre Meta y Google.
   ------------------------------------------------------------ */
const MIMO_SUB = "De cara al próximo mes, y en base a los resultados y aprendizajes obtenidos en Meta Ads y Google Ads, se plantean las siguientes líneas de actuación:";

const MIMO = {
  mantener: [
    "Campaña de seguidores (TOFU) centrada en dar promo a posts de divulgación y a clips del podcast: el podcast aporta alcance, los de divulgación siguen trayendo seguidores que maduran en MOFU y BOFU.",
    "Las creatividades de producto siguen funcionando mejor que las de consumo — pendiente ver si esta tendencia se repite también en toda la parte de suscripción.",
    "Promo de recetas en MOFU, pero con presupuesto reducido.",
    "La prioridad sigue siendo la SUSCRIPCIÓN.",
  ],
  incorporar: [
    "Próximos meses: lanzamiento del tarrito de calabaza y de las barritas KIDS.",
    "Crear más posts de divulgación para poder darles promo y seguir ganando seguidores.",
    "Cuando haya alguna promo de suscripción, meter también creatividades que destaquen el 10% de descuento con el código TANREAL — si no, baja mucho el OTP, y el objetivo es subir tanto suscripción como venta.",
    "Nuevo canal: paid en OpenAI ya activado, y TikTok Shop en configuración (UGCs, vídeos...).",
  ],
  mejorar: [
    "Seguir mejorando la frecuencia de los anuncios.",
    "Continuar incluyendo mejoras en los anuncios.",
  ],
  omitir: [
    // Nada que omitir este periodo
  ],
};

/* ------------------------------------------------------------
   PROMOCIONES / LANZAMIENTOS DEL MES
   Cada promo puede llevar su propio carrusel de creatividades
   (las piezas de imagen/video que formaron esa campaña).
   ------------------------------------------------------------ */
const PROMOS_SUB = "Campañas y promociones activas · 26 de julio – 13 de septiembre de 2026";
const PROMOS = [
  {
    fecha: "26 jul – 2 ago",
    nombre: "15% Packs / 25% Suscripción",
    descripcion: "Promo de packs con descuento y primer mes de suscripción, activa en Meta y Google.",
    plataformas: ["meta", "google"],
    creatividades: [
      { type: "image", src: "media/packs-15-subs-25-sep/img-1.jpg" },
      { type: "image", src: "media/packs-15-subs-25-sep/img-2.jpg" },
      { type: "video", src: "media/packs-15-subs-25/ugc-hook-1.mp4" },
      { type: "video", src: "media/packs-15-subs-25/ugc-hook-2.mp4" },
      { type: "video", src: "media/packs-15-subs-25/video-consumo.mp4" },
    ],
  },
  {
    fecha: "9 – 16 ago",
    nombre: "Set de cubiertos con tu suscripción",
    descripcion: "Regalo de set de cubiertos al suscribirte.",
    plataformas: ["meta", "google"],
    creatividades: [
      { type: "image", src: "media/cubiertos-agosto/post-1.jpg" },
      { type: "image", src: "media/cubiertos-agosto/post-2.jpg" },
    ],
  },
  {
    fecha: "25 ago", // 👈 fecha tomada del informe anterior, confírmame si es correcta
    nombre: "Lanzamiento Cereales KIDS",
    descripcion: "Lanzamiento de los cereales de la línea KIDS.",
    plataformas: ["meta", "google"], // 👈 en Google corresponde a la nueva campaña "Demand Gen · SMILEAT KIDS"
    creatividades: [
      { type: "image", src: "media/cereales-kids/lanzamiento.jpg" },
      { type: "image", src: "media/cereales-kids/kids-rubio-1.jpg" },
      { type: "image", src: "media/cereales-kids/kids-rubio-2.jpg" },
    ],
  },
  {
    fecha: "30 ago – 7 sep",
    nombre: "Vuelta al cole: 15% en todo / 30% primera suscripción",
    descripcion: "Promo de vuelta al cole con 15% de descuento general y 30% en la primera suscripción.",
    plataformas: ["meta", "google"],
    creatividades: [
      { type: "image", src: "media/vuelta-al-cole/post-1.jpg" },
      { type: "image", src: "media/vuelta-al-cole/post-2.jpg" },
      { type: "image", src: "media/vuelta-al-cole/post-3.jpg" },
    ],
  },
  {
    fecha: "Desde el 8 sep (en curso)", // 👈 confírmame fecha de inicio exacta
    nombre: "Mes de la suscripción",
    descripcion: "3 primeros pedidos al 25% y luego 15% para siempre.",
    plataformas: ["meta", "google"],
    creatividades: [
      { type: "image", src: "media/mes-suscripcion/promo-1.jpg" },
      { type: "image", src: "media/mes-suscripcion/promo-2.jpg" },
    ],
  },
];

/* ------------------------------------------------------------
   META ADS
   KPIs organizados en dos bloques:
   - E-commerce → venta directa (compras, coste/compra, ROAS...)
   - Marca / Alcance → visibilidad y captación (impresiones, CPM,
     visitas a perfil...)
   Quita o añade filas según lo que quieras reportar cada mes.
   ------------------------------------------------------------ */
const META_SUB = "Meta Ads · " + MES + " · España";

// Datos reales del export de campañas de Meta Ads (26 jul – 13 sep 2026).
// 3 campañas activas: BOFU (venta), MOFU (recetas, presupuesto reducido)
// y TOFU (captación de seguidores vía posts de divulgación + podcast).
// Este export no trae periodo de comparación, así que no hay deltas.
// "Valor ventas" de MOFU está estimado a partir de su ROAS × gasto,
// porque a nivel de campaña Meta no desglosa el valor cuando se mezclan
// objetivos distintos entre conjuntos — si tienes el dato exacto, sustitúyelo.
const META_KPIS_ECOMMERCE = [
  { lab: "Inversión", val: "32.021,70 €" },
  { lab: "Compras (venta)", val: "3.147" },
  { lab: "Coste/compra", val: "10,08 €" },
  { lab: "Valor ventas (est.)", val: "142.809,24 €" },
  { lab: "ROAS (est.)", val: "4,50x" },
];
const META_KPIS_MARCA = [
  { lab: "Impresiones", val: "10.862.654" },
  { lab: "CPM", val: "2,95 €" },
  { lab: "Visitas a perfil (TOFU)", val: "4.310" },
  { lab: "Coste/visita perfil", val: "0,07 €" },
];

// Lectura rápida (Meta), a nivel de conjunto de anuncios dentro de BOFU
// (que es donde está el detalle granular en este export).
const META_CONCLUSIONES = [
  { titulo: "Distribución de la inversión", texto: "el presupuesto se concentra en tres campañas: BOFU (28.025€, foco en conversión), MOFU (3.686€, contenido de recetas con inversión reducida) y TOFU (310€, captación de seguidores)." },
  { titulo: "Mejor rendimiento en BOFU", texto: "Lanzamiento SMILEAT KIDS registra el mejor coste por compra (5,41€; 341 compras), seguido de Vuelta al Cole (8,21€) y Smilados UGC (8,72€). Los resultados refuerzan el buen comportamiento de las creatividades centradas en producto frente a las de consumo." },
  { titulo: "Always-on de suscripción", texto: "los conjuntos de suscripción concentran el mayor volumen, con aprox. 1.000 compras, aunque presentan el coste por compra más elevado de la cuenta (13–18€). Se identifica aquí una oportunidad de optimización mediante la incorporación de creatividades con el código TANREAL, manteniendo el volumen de OTP mientras se potencia la suscripción." },
  { titulo: "Rendimiento estable en promociones", texto: "Cubiertos - Agosto (8,49€; 148 compras) y 15% Packs / 25% Suscripción (7,10€; 192 compras) mantienen un coste por compra competitivo, en línea con la media de la cuenta." },
  { titulo: "Inicio de la campaña de suscripción", texto: "Promo Suscripción - Septiembre alcanza 19 compras a 9,15€ en sus primeros días. Al tratarse de una campaña recién activada, todavía no hay suficiente volumen para extraer conclusiones definitivas." },
  { titulo: "TOFU eficiente en captación", texto: "la campaña de seguidores genera 4.310 visitas al perfil a 0,07€ por visita, mostrando una captación eficiente. Se recomienda mantener el apoyo promocional a contenidos divulgativos y clips del podcast." },
];

// Creatividades individuales — este mes solo tengo el export a nivel de
// conjunto de anuncios (no de anuncio/creatividad suelta), así que no
// puedo montar las tarjetas de "mejor creatividad" con imagen. En cuanto
// tengas el export a nivel de anuncio (o las piezas de las promos
// pendientes), lo relleno con el mismo formato que meses anteriores.
const META_CREATIVOS = [
];

/* ------------------------------------------------------------
   GOOGLE ADS
   Igual que en Meta, se combinan métricas de venta (conversiones,
   CPA, valor de conversión) con métricas de marketing/visibilidad:
   - Impresiones y Cuota de impresiones → cuánto se nos ve y cuánto
     nos dejamos de ver por presupuesto/ranking
   - CPC medio → eficiencia de puja
   - CTR → relevancia del anuncio/búsqueda
   Quita o añade columnas según lo que quieras reportar cada mes.
   ------------------------------------------------------------ */
const GOOGLE_SUB = "Google Ads · " + MES + " · España";

// Datos reales del informe de campaña de Google Ads (26 jul – 13 sep 2026),
// filtrado a solo campañas "ES". Esta vez el export no trae columnas de
// comparación con el periodo anterior, así que no hay deltas.
const GOOGLE_KPIS = [
  { lab: "Inversión", val: "8.176,01 €" },
  { lab: "Impresiones", val: "852.396" },
  { lab: "Clics", val: "33.098" },
  { lab: "CTR", val: "3,88%" },
  { lab: "Conversiones", val: "3.483,44" },
  { lab: "CPA", val: "2,35 €" },
  { lab: "Valor conv.", val: "184.818,08 €" },
  { lab: "ROAS", val: "22,6x" },
];

// Columnas de la tabla de campañas (label, key). Se pueden añadir/quitar.
const GOOGLE_COLUMNAS = [
  ["Campaña", "nombre", "text"],
  ["Tipo", "tipo", "text"],
  ["Gasto", "gasto", "num"],
  ["Impresiones", "impresiones", "num"],
  ["Clics", "clics", "num"],
  ["CTR", "ctr", "num"],
  ["Conversiones", "conversiones", "num"],
  ["CPA", "cpa", "num"],
  ["Valor conv.", "valorConv", "num"],
];

// Datos reales por campaña (fuente interna, no se muestra tabla desglosada
// en el reporte — se deja solo el resumen de KPIs + lectura rápida).
const GOOGLE_CAMPANAS = [
  {
    nombre: "Search · Brand", tipo: "Búsqueda",
    gasto: "928,48 €", impresiones: "30.995", clics: "13.320", ctr: "42,97%",
    conversiones: "2.091,96", cpa: "0,44 €", valorConv: "118.329,90 €",
  },
  {
    nombre: "PMáx · Lanzamientos/Promos", tipo: "Rend. máximo",
    gasto: "1.653,91 €", impresiones: "192.545", clics: "5.752", ctr: "2,99%",
    conversiones: "474,03", cpa: "3,49 €", valorConv: "25.657,89 €",
  },
  {
    nombre: "PMáx · Productos", tipo: "Rend. máximo",
    gasto: "991,43 €", impresiones: "209.775", clics: "4.552", ctr: "2,17%",
    conversiones: "373,01", cpa: "2,66 €", valorConv: "17.274,65 €",
  },
  {
    nombre: "PMáx · Suscripción", tipo: "Rend. máximo",
    gasto: "1.441,43 €", impresiones: "35.956", clics: "3.612", ctr: "10,05%",
    conversiones: "343,25", cpa: "4,20 €", valorConv: "14.345,19 €",
  },
  {
    nombre: "Search · Suscripción", tipo: "Búsqueda",
    gasto: "728,02 €", impresiones: "18.588", clics: "1.327", ctr: "7,14%",
    conversiones: "145,08", cpa: "5,02 €", valorConv: "6.551,14 €",
  },
  {
    nombre: "Demand Gen · SMILEAT KIDS", tipo: "Gen. demanda",
    gasto: "1.146,93 €", impresiones: "167.076", clics: "2.801", ctr: "1,68%",
    conversiones: "26,33", cpa: "43,56 €", valorConv: "1.223,32 €",
  },
  {
    nombre: "Demand Gen · Suscripción", tipo: "Gen. demanda",
    gasto: "869,00 €", impresiones: "151.627", clics: "1.259", ctr: "0,83%",
    conversiones: "22,78", cpa: "38,14 €", valorConv: "1.159,67 €",
  },
  {
    nombre: "Display · RMKT Dinámico", tipo: "Display",
    gasto: "416,81 €", impresiones: "45.834", clics: "475", ctr: "1,04%",
    conversiones: "7,00", cpa: "59,54 €", valorConv: "276,32 €",
  },
];

// Lectura rápida del mes (Google Ads)
const GOOGLE_CONCLUSIONES = [
  { titulo: "Rendimiento global", texto: "la cuenta española genera 3.483 conversiones con una inversión de 8.176€, alcanzando un CPA medio de 2,35€ y un ROAS de 22,6x durante el periodo analizado." },
  { titulo: "Search · Brand, principal motor de conversiones", texto: "aporta 2.092 conversiones a 0,44€, concentrando más de la mitad de las conversiones totales de la cuenta." },
  { titulo: "PMáx · Lanzamientos/Promos", texto: "genera 474 conversiones a 3,49€ de CPA, captando principalmente la demanda asociada a las promociones de packs, suscripción y Vuelta al Cole." },
  { titulo: "Demand Gen · Suscripción", texto: "mantiene un CPA elevado (38,14€), aunque con una inversión significativamente menor respecto al periodo anterior (869€ vs. 1.500€). La reducción de presupuesto es coherente con la estrategia de testar nuevas alternativas de campaña." },
  { titulo: "Nueva Demand Gen · SMILEAT KIDS", texto: "registra 26 conversiones a 43,56€ de CPA. Al encontrarse todavía en una fase inicial, los resultados deben interpretarse con cautela. Su lanzamiento coincide con la activación de la gama SMILEAT KIDS." },
  { titulo: "Display · RMKT Dinámico", texto: "presenta el CPA más elevado de la cuenta (59,54€) con solo 7 conversiones, por lo que se identifica como candidata a revisión y optimización si el rendimiento no mejora." },
];

/* ------------------------------------------------------------
   TOP 10 PRODUCTOS POR INGRESOS (Meta y Google)
   Fuente: GA4 · ingresos por artículo, desglosado por campaña de
   sesión → agrupado y sumado por nombre de producto.
   Datos del periodo del informe. Ordenados de mayor a menor ingreso.
   ------------------------------------------------------------ */
const TOP_META_SUB = "Ingresos por producto (GA4) · " + MES;
const TOP_GOOGLE_SUB = "Ingresos por producto (GA4) · " + MES;

// Datos reales de GA4 (Productos + vendidos - Google + Meta Ads),
// agregados por producto y ordenados por ingresos. Incluye también
// tráfico de Portugal (el export es "Smileat Global", no solo España).
const TOP_META_PRODUCTOS = [
  { nombre: "100% Frutos secos y cacahuete", comprados: 37, carrito: 139, ingresos: "446,76 €" },
  { nombre: "Tarrito de pavo y verduras", comprados: 194, carrito: 1314, ingresos: "442,37 €" },
  { nombre: "Tarrito de pollo con arroz y guisantes", comprados: 186, carrito: 999, ingresos: "430,90 €" },
  { nombre: "Tarrito de verduras con lubina y merluza", comprados: 175, carrito: 1152, ingresos: "400,37 €" },
  { nombre: "Tarrito de ternera con verduras", comprados: 175, carrito: 1232, ingresos: "400,16 €" },
  { nombre: "Tarrito de brócoli, cordero y chirivía", comprados: 172, carrito: 1046, ingresos: "399,64 €" },
  { nombre: "Tarrito de guisito de alubias", comprados: 160, carrito: 1008, ingresos: "364,71 €" },
  { nombre: "Tarrito de bacalao con patatas y verduras", comprados: 150, carrito: 550, ingresos: "346,45 €" },
  { nombre: "Tarrito de cocidito con ternera y jamón", comprados: 152, carrito: 725, ingresos: "345,48 €" },
  { nombre: "Pack Mix Pouches", comprados: 8, carrito: 19, ingresos: "316,52 €" },
];
// 👈 este mes, a petición de Noelia, ya no se muestra la fila de total en la tabla de Meta.
const TOP_META_TOTAL = null;

const TOP_GOOGLE_PRODUCTOS = [
  { nombre: "Pack Carne y Pescado", comprados: 130, carrito: 256, ingresos: "3.842,81 €" },
  { nombre: "Tarrito de ternera con verduras", comprados: 1438, carrito: 2950, ingresos: "3.540,22 €" },
  { nombre: "Tarrito de brócoli, cordero y chirivía", comprados: 1406, carrito: 2539, ingresos: "3.498,88 €" },
  { nombre: "Tarrito de pavo y verduras", comprados: 1380, carrito: 2952, ingresos: "3.398,95 €" },
  { nombre: "Tarrito de pollo con arroz y guisantes", comprados: 1252, carrito: 2356, ingresos: "3.100,72 €" },
  { nombre: "Tarrito de verduras con merluza", comprados: 1191, carrito: 2105, ingresos: "2.943,72 €" },
  { nombre: "Tarrito de verduras con lubina y merluza", comprados: 1188, carrito: 2460, ingresos: "2.921,74 €" },
  { nombre: "Tarrito de guisito de alubias", comprados: 1123, carrito: 2237, ingresos: "2.780,56 €" },
  { nombre: "Tarrito de bacalao con patatas y verduras", comprados: 1095, carrito: 1714, ingresos: "2.716,60 €" },
  { nombre: "Tarrito de cocidito con ternera y jamón", comprados: 1063, carrito: 1922, ingresos: "2.628,61 €" },
];
const TOP_GOOGLE_TOTAL = { comprados: 33565, carrito: 60874, ingresos: "99.211,85 €" };

/* ------------------------------------------------------------
   SEMÁFORO POR MÉTRICA (Meta) — igual que en el reporte de campaña
   ------------------------------------------------------------ */
const campos = [
  ['resultados', 'Resultados'],
  ['gasto', 'Gasto'],
  ['costeResultado', 'Coste/result.'],
  ['impresiones', 'Impresiones'],
  ['alcance', 'Alcance'],
  ['frecuencia', 'Frecuencia'],
  ['clics', 'Clics'],
  ['ctr', 'CTR'],
  ['valorResultados', 'Ingresos'],
];
const UMBRALES = {
  resultados:      { dir: 1,  bueno: 50,    regular: 0 },
  costeResultado:  { dir: -1, bueno: 6,     regular: 8 },
  frecuencia:      { dir: -1, bueno: 3,     regular: 999 },
  ctr:             { dir: 1,  bueno: 1,     regular: 0.8 },
  alcance:         { dir: 1,  bueno: 15000, regular: 0 },
  valorResultados: { dir: 1,  bueno: 1000,  regular: 0 },
};
const UMBRALES_GOOGLE = {
  cpa:           { dir: -1, bueno: 6,  regular: 8 },
  ctr:           { dir: 1,  bueno: 3,  regular: 1.5 },
  conversiones:  { dir: 1,  bueno: 20, regular: 0 },
  cuotaImpresiones: { dir: 1, bueno: 60, regular: 35 },
};
const METRICAS_DEPENDIENTES_DEL_TIEMPO = ['resultados', 'alcance', 'valorResultados', 'frecuencia'];
