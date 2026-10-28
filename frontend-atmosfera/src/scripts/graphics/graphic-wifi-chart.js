(() => {
  /* ============================================================
     CONFIGURAÇÃO (edite apenas esta seção)
     ============================================================ */
  const CONFIG = {
    canvasId: 'wifiChart',

    // --- DADOS (uma entrada por sala/zona) ---
    zonas: [
      { nome: 'Biblioteca',  dbm: -42 },
      { nome: 'Sala 101',    dbm: -53 },
      { nome: 'Ginásio',     dbm: -62 },
      { nome: 'Refeitório',  dbm: -48 },
      { nome: 'Pátio',       dbm: -70 },
    ],

    // --- EIXO Y ---
    eixoY: {
      min: -90,
      max: -40,
      passo: 10,
      unidade: 'dBm',   // aparece só no tooltip
    },

    // --- EIXO X ---
    mostrarRotulosX: true,

    // --- BARRAS ---
    barras: {
      corTopo: '#22d3ee',      // degradê: topo da barra
      corBase: '#0a6cff',      // degradê: base da barra
      arredondamento: 6,       // raio dos cantos superiores (px)
      larguraRelativa: 0.62,   // 0 a 1
    },

    // --- APARÊNCIA ---
    visual: {
      corTexto: '#8d9bb8',
      corGrade: 'rgba(148,163,184,.15)',
      tamanhoFonteX: 11,
    },

    // --- TOOLTIP ---
    tooltip: {
      fundo: '#0b1636',
      borda: '#1d4ed8',
      corTitulo: '#fff',
      corTexto: '#a9b5cf',
    },
  };

  /* ============================================================
     CÓDIGO (não precisa mexer)
     ============================================================ */
  const { zonas, eixoY: Y, barras: B, visual: V, tooltip: TT } = CONFIG;

  const canvas = document.getElementById(CONFIG.canvasId);
  if (!canvas) return;

  new Chart(canvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels: zonas.map(z => z.nome),
      datasets: [{
        label: 'Sinal WiFi',
        data: zonas.map(z => z.dbm),
        backgroundColor: B.corBase,   // o degradê vem do plugin abaixo

        // valores negativos: sem "base", as barras ficariam penduradas no topo
        base: Y.min,

        borderRadius: { topLeft: B.arredondamento, topRight: B.arredondamento },
        borderSkipped: false,
        barPercentage: B.larguraRelativa,
        categoryPercentage: 1,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: TT.fundo,
          borderColor: TT.borda,
          borderWidth: 1,
          titleColor: TT.corTitulo,
          bodyColor: TT.corTexto,
          padding: 10,
          displayColors: false,
          callbacks: {
            label: (c) => ` ${c.parsed.y} ${Y.unidade}`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: {
            display: CONFIG.mostrarRotulosX,
            color: V.corTexto,
            font: { size: V.tamanhoFonteX }
          }
        },
        y: {
          min: Y.min, max: Y.max,
          ticks: { color: V.corTexto, stepSize: Y.passo },
          grid: { color: V.corGrade },
          border: { display: false }
        }
      }
    },

    // degradê aplicado na hora de desenhar (posição das barras já conhecida)
    plugins: [{
      id: 'gradienteBarras',
      beforeDatasetDraw(chart, args) {
        if (args.index !== 0) return;
        const { ctx } = chart;

        args.meta.data.forEach((bar) => {
          if (!isFinite(bar.y) || !isFinite(bar.base) || bar.y === bar.base) return;

          const g = ctx.createLinearGradient(0, bar.y, 0, bar.base);
          g.addColorStop(0, B.corTopo);
          g.addColorStop(1, B.corBase);

          bar.options = { ...bar.options, backgroundColor: g };
        });
      }
    }]
  });
})();