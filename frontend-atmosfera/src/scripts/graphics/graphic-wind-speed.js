(() => {
  /* ============================================================
     CONFIGURAÇÃO (edite apenas esta seção)
     ============================================================ */
  const CONFIG = {
    canvasId: 'windSpeedChart',

    // --- EIXO X ---
    // Os rótulos são livres: "Início", "3h", "6h"...
    // Cada rótulo precisa de um valor nas duas séries (mesma posição).
    labels: ['Início', '3h', '6h'],

    // --- EIXO Y ---
    eixoY: {
      min: 400,
      max: 800,
      passo: 100,
      unidade: 'km/h',   // aparece só no tooltip
    },

    // --- SÉRIE CONTÍNUA (com área preenchida) ---
    serieContinua: {
      label: 'Série contínua',
      dados: [443, 490, 608],
      cor: '#22d3ee',
      preencher: true,
      areaCorTopo: 'rgba(37,99,235,.45)',
      areaCorBase: 'rgba(37,99,235,.02)',
    },

    // --- SÉRIE TRACEJADA ---
    serieTracejada: {
      label: 'Série tracejada',
      dados: [520, 601, 527],
      cor: '#0a6cff',
      tracejado: [8, 6],   // [traço, espaço]; use [] para linha contínua
    },

    // --- APARÊNCIA ---
    visual: {
      espessuraLinha: 3,
      suavizacao: 0,          // 0 = retas; 0.3 = curvas suaves
      corTexto: '#8d9bb8',
      corGrade: 'rgba(148,163,184,.15)',
      raioPontoHover: 6,
      areaToque: 20,          // área de toque (px) para celular
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
  const { labels, eixoY: Y, serieContinua: S1, serieTracejada: S2, visual: V, tooltip: TT } = CONFIG;

  const canvas = document.getElementById(CONFIG.canvasId);
  if (!canvas) return; // evita erro se o canvas não existir na página

  const pointOpts = {
    pointRadius: 0,
    pointHoverRadius: V.raioPontoHover,
    pointHitRadius: V.areaToque,
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderWidth: 2,
  };

  new Chart(canvas.getContext('2d'), {
    data: {
      labels,
      datasets: [
        {
          type: 'line', label: S1.label, data: S1.dados,
          borderColor: S1.cor,
          borderWidth: V.espessuraLinha, tension: V.suavizacao,
          fill: S1.preencher ? 'start' : false,
          backgroundColor: (c) => {
            const a = c.chart.chartArea; if (!a) return null;
            const g = c.chart.ctx.createLinearGradient(0, a.top, 0, a.bottom);
            g.addColorStop(0, S1.areaCorTopo);
            g.addColorStop(1, S1.areaCorBase);
            return g;
          },
          ...pointOpts
        },
        {
          type: 'line', label: S2.label, data: S2.dados,
          borderColor: S2.cor,
          borderWidth: V.espessuraLinha, tension: V.suavizacao,
          borderDash: S2.tracejado,
          ...pointOpts
        }
      ]
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
          usePointStyle: true,
          callbacks: {
            label: (c) => ` ${c.dataset.label}: ${c.parsed.y} ${Y.unidade}`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: { color: V.corTexto }
        },
        y: {
          min: Y.min, max: Y.max,
          ticks: { color: V.corTexto, stepSize: Y.passo },
          grid: { color: V.corGrade },
          border: { display: false }
        }
      }
    }
  });
})();