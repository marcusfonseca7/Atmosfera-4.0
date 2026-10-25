(() => {
  /* ============================================================
     CONFIGURAÇÃO (edite apenas esta seção)
     ============================================================ */
  const CONFIG = {
    canvasId: 'luminosityChart',

    // --- DADOS (uma entrada por zona) ---
    zonas: [
      { nome: 'Biblioteca',  lux: 100 },
      { nome: 'Sala 101',    lux: 315 },
      { nome: 'Ginásio',     lux: 365 },
      { nome: 'Refeitório',  lux: 223 },
      { nome: 'Pátio',       lux: 185 },
    ],

    // --- EIXO Y ---
    eixoY: {
      min: 0,
      max: 400,
      passo: 100,
      unidade: 'lx',   // aparece só no tooltip
    },

    // --- BARRAS ---
    barras: {
      corTopo: '#22d3ee',      // degradê: topo da barra
      corBase: '#0a6cff',      // degradê: base da barra
      arredondamento: 6,       // raio dos cantos superiores (px)
      larguraRelativa: 0.62,   // 0 a 1 (largura da barra dentro da categoria)
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
        label: 'Luminosidade',
        data: zonas.map(z => z.lux),
        backgroundColor: B.corBase,   // <- agora é só uma cor (o degradê vem do plugin)
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
          ticks: { color: V.corTexto, font: { size: V.tamanhoFonteX } }
        },
        y: {
          min: Y.min, max: Y.max,
          ticks: { color: V.corTexto, stepSize: Y.passo },
          grid: { color: V.corGrade },
          border: { display: false }
        }
      }
    },
    plugins: [{
      id: 'gradienteBarras',
      beforeDatasetDraw(chart, args) {
        if (args.index !== 0) return;
        const { ctx } = chart;

        args.meta.data.forEach((bar) => {
          // ignora barras ainda sem posição válida
          if (!isFinite(bar.y) || !isFinite(bar.base) || bar.y === bar.base) return;

          const g = ctx.createLinearGradient(0, bar.y, 0, bar.base);
          g.addColorStop(0, B.corTopo);
          g.addColorStop(1, B.corBase);

          // cópia das opções só desta barra (evita afetar as outras)
          bar.options = { ...bar.options, backgroundColor: g };
        });
      }
    }]
  });
})();