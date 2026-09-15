/* ============================================================
   SMILEAT · MONTHLY ADVERTISING PERFORMANCE REPORT
   Lógica de renderizado — lee el contenido de data.js
   ============================================================ */

function parseNum(str){
  if (str == null) return NaN;
  const limpio = String(str).replace(/[€%\s]/g, '').replace(/\./g, '').replace(',', '.');
  const n = parseFloat(limpio);
  return isNaN(n) ? NaN : n;
}
function claseColor(valor, umbral){
  if (isNaN(valor)) return null;
  const { dir, bueno, regular } = umbral;
  if (dir === 1){
    if (valor >= bueno) return 'good';
    if (valor >= regular) return 'mid';
    return 'bad';
  } else {
    if (valor <= bueno) return 'good';
    if (valor <= regular) return 'mid';
    return 'bad';
  }
}
function calcularColores(contenido){
  return contenido.map(item => {
    const colorItem = {};
    Object.keys(UMBRALES).forEach(key => {
      if (item.nueva && METRICAS_DEPENDIENTES_DEL_TIEMPO.includes(key)) return;
      const val = parseNum(item.metricas?.[key]);
      const cls = claseColor(val, UMBRALES[key]);
      if (cls) colorItem[key] = cls;
    });
    return colorItem;
  });
}

// ============================================================
// RENDER
// ============================================================

document.getElementById('titulo').textContent = "MONTHLY ADVERTISING PERFORMANCE REPORT";
document.getElementById('subtitulo').textContent = MES;
document.getElementById('pie').textContent = "Smileat · " + MES + " · Meta Ads + Google Ads";

// ---- MIMO ----
const MIMO_META = [
  { key: 'mantener',   label: 'Mantener',   color: 'var(--sec-green)',  tint: 'rgba(146,180,54,0.16)' },
  { key: 'incorporar', label: 'Incorporar', color: 'var(--sec-navy)',   tint: 'rgba(0,63,109,0.10)' },
  { key: 'mejorar',    label: 'Mejorar',    color: 'var(--sec-orange)', tint: 'rgba(254,129,0,0.14)' },
  { key: 'omitir',     label: 'Omitir',     color: 'var(--sec-purple)', tint: 'rgba(106,30,147,0.12)' },
];
document.getElementById('mimo-sub').textContent = MIMO_SUB;
document.getElementById('mimo-grid').innerHTML = MIMO_META.map(({key, label, color, tint}) => {
  const items = MIMO[key] || [];
  const body = items.length
    ? `<ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>`
    : `<p class="empty">Sin elementos todavía.</p>`;
  return `
    <div class="mimo-card" style="--c:${color}; --tint:${tint}">
      <h3>${label}</h3>
      ${body}
    </div>
  `;
}).join('');

// ---- Promos + carrusel ----
document.getElementById('promos-sub').textContent = PROMOS_SUB;
const promosGrid = document.getElementById('promos-grid');

// Índice actualmente mostrado en cada carrusel de promo
const carouselState = {};

function mediaHtml(item){
  return item.type === 'video'
    ? `<video src="${item.src}" muted playsinline controls></video>`
    : `<img src="${item.src}" alt="">`;
}

function carruselHtml(creatividades, promoIdx){
  if (!creatividades || !creatividades.length) return '';
  carouselState[promoIdx] = 0;
  const total = creatividades.length;
  const first = creatividades[0];
  const counter = total > 1 ? `<div class="promo-carousel-counter">1 / ${total}</div>` : '';
  const navs = total > 1
    ? `<button class="promo-carousel-nav prev" data-idx="${promoIdx}" data-dir="-1" aria-label="Anterior">‹</button>
       <button class="promo-carousel-nav next" data-idx="${promoIdx}" data-dir="1" aria-label="Siguiente">›</button>`
    : '';
  return `
    <div class="promo-carousel">
      <div class="promo-carousel-slide" id="slide-${promoIdx}">${mediaHtml(first)}${counter}</div>
      ${navs}
    </div>
  `;
}

function actualizarSlide(promoIdx){
  const creatividades = (PROMOS[promoIdx] && PROMOS[promoIdx].creatividades) || [];
  if (!creatividades.length) return;
  const idx = carouselState[promoIdx];
  const item = creatividades[idx];
  const slide = document.getElementById(`slide-${promoIdx}`);
  const counter = creatividades.length > 1 ? `<div class="promo-carousel-counter">${idx + 1} / ${creatividades.length}</div>` : '';
  if (slide) slide.innerHTML = mediaHtml(item) + counter;
}

promosGrid.innerHTML = PROMOS.length
  ? PROMOS.map((p, i) => `
    <div class="promo-card">
      <div class="promo-fecha">${p.fecha || ''}</div>
      <h4>${p.nombre || ''}</h4>
      <p>${p.descripcion || ''}</p>
      <div class="promo-badges">
        ${(p.plataformas || []).map(pl => `<span class="promo-badge ${pl}">${pl === 'meta' ? 'META' : 'GOOGLE'}</span>`).join('')}
      </div>
      ${carruselHtml(p.creatividades, i)}
    </div>
  `).join('')
  : `<p class="empty" style="grid-column: 1/-1;">Sin promociones registradas todavía.</p>`;

document.querySelectorAll('.promo-carousel-nav').forEach(btn => {
  btn.addEventListener('click', () => {
    const promoIdx = Number(btn.dataset.idx);
    const dir = Number(btn.dataset.dir);
    const total = ((PROMOS[promoIdx] && PROMOS[promoIdx].creatividades) || []).length;
    if (!total) return;
    carouselState[promoIdx] = (carouselState[promoIdx] + dir + total) % total;
    actualizarSlide(promoIdx);
  });
});

// ---- KPIs ----
function renderKpis(containerId, kpis){
  document.getElementById(containerId).innerHTML = kpis.map(k => {
    // admite tanto el formato viejo [lab, val] como el nuevo {lab, val, delta, cls}
    const isObj = !Array.isArray(k);
    const lab = isObj ? k.lab : k[0];
    const val = isObj ? k.val : k[1];
    const delta = isObj ? k.delta : null;
    const cls = isObj ? (k.cls || 'neutral') : 'neutral';
    return `
    <div class="kpi">
      <div class="kpi-val">${val}</div>
      <div class="kpi-lab">${lab}</div>
      ${delta ? `<div class="kpi-delta ${cls}">${delta}</div>` : ''}
    </div>`;
  }).join('');
}

function renderConclusiones(containerId, conclusiones){
  const el = document.getElementById(containerId);
  if (conclusiones && conclusiones.length){
    el.innerHTML = `
      <h3>Lectura rápida ${COMPARATIVA}</h3>
      <ul>${conclusiones.map(c => `<li><strong>${c.titulo}:</strong> ${c.texto}</li>`).join('')}</ul>
    `;
  } else {
    el.style.display = 'none';
  }
}

document.getElementById('meta-sub').textContent = META_SUB;
document.getElementById('google-sub').textContent = GOOGLE_SUB;
document.getElementById('meta-ecommerce-label').textContent = 'E-commerce';
document.getElementById('meta-marca-label').textContent = 'Marca y alcance';
renderKpis('meta-kpis-ecommerce', META_KPIS_ECOMMERCE);
renderKpis('meta-kpis-marca', META_KPIS_MARCA);
renderKpis('google-kpis', GOOGLE_KPIS);
renderConclusiones('meta-conclusiones', META_CONCLUSIONES);
renderConclusiones('google-conclusiones', GOOGLE_CONCLUSIONES);

// ---- Meta creatividades ----
const colores = calcularColores(META_CREATIVOS);
const listaMeta = document.getElementById('meta-creativos');
listaMeta.innerHTML = META_CREATIVOS.length ? '' : '<p class="empty">Sin creatividades cargadas todavía.</p>';
META_CREATIVOS.forEach((item, i) => {
  const card = document.createElement('div');
  card.className = 'card';
  const mediaEl = item.type === 'video'
    ? `<video src="${item.src}" controls playsinline></video>`
    : `<img src="${item.src}" alt="${item.nota || ''}">`;
  const m = item.metricas || {};
  const colorItem = colores[i] || {};
  const statsHtml = campos.map(([key, label]) => {
    const clsColor = colorItem[key] ? ` ${colorItem[key]}` : '';
    return `
    <div class="stat${clsColor}">
      <div class="val">${m[key] ?? '—'}</div>
      <div class="lab">${label}</div>
    </div>`;
  }).join('');
  const badgeNuevaHtml = item.nueva ? `<span class="badge-new">${item.nueva}</span>` : '';
  card.innerHTML = `
    <div class="rank">#${i + 1}</div>
    <div class="media">${mediaEl}</div>
    <div class="card-body">
      <p class="card-title">${item.nota || ''}</p>
      ${badgeNuevaHtml}
      <div class="stats">${statsHtml}</div>
    </div>
  `;
  listaMeta.appendChild(card);
});

// ---- Top 10 productos por ingresos ----
document.getElementById('top-meta-sub').textContent = TOP_META_SUB;
document.getElementById('top-google-sub').textContent = TOP_GOOGLE_SUB;

function renderTopProductos(tablaId, productos, headClass, total){
  if (!productos.length){
    document.getElementById(tablaId).innerHTML = `
      <tbody><tr><td style="padding:16px;" class="empty">Sin datos de GA4 cargados todavía para este periodo.</td></tr></tbody>
    `;
    return;
  }
  const filas = productos.map((p, i) => `
    <tr>
      <td class="num rank-num">#${i + 1}</td>
      <td class="nombre">${p.nombre}</td>
      <td class="num">${p.comprados.toLocaleString('es-ES')}</td>
      <td class="num">${p.carrito.toLocaleString('es-ES')}</td>
      <td class="num">${p.ingresos}</td>
    </tr>`).join('');
  const filaTotal = total ? `
    <tr class="fila-total">
      <td></td>
      <td class="nombre">Total (todos los productos, no solo el top 10)</td>
      <td class="num">${total.comprados.toLocaleString('es-ES')}</td>
      <td class="num">${total.carrito.toLocaleString('es-ES')}</td>
      <td class="num">${total.ingresos}</td>
    </tr>` : '';
  document.getElementById(tablaId).innerHTML = `
    <thead>
      <tr>
        <th class="num ${headClass}">#</th>
        <th class="${headClass}">Producto</th>
        <th class="num ${headClass}">Comprados</th>
        <th class="num ${headClass}">Añadidos carrito</th>
        <th class="num ${headClass}">Ingresos</th>
      </tr>
    </thead>
    <tbody>${filas}${filaTotal}</tbody>
  `;
}
renderTopProductos('top-google-tabla', TOP_GOOGLE_PRODUCTOS, '', TOP_GOOGLE_TOTAL);
renderTopProductos('top-meta-tabla', TOP_META_PRODUCTOS, 'head-meta', TOP_META_TOTAL);

// Nota: la tabla de campañas de Google no se muestra en el reporte (se deja
// solo el resumen de KPIs + lectura rápida). GOOGLE_CAMPANAS y
// GOOGLE_COLUMNAS se conservan en data.js como fuente interna, por si se
// necesita el detalle en algún momento.
