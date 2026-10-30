/* ============================================================
   CONFIGURAÇÃO (edite apenas esta seção)
   ============================================================ */
const CONFIG = {
  canvasId: 'tempUmidChart',

  // --- TEMPO (eixo X) ---
  tempo: {
    min: 1,          // primeira hora exibida
    max: 6,          // última hora exibida
    sufixo: 'h',     // "1h", "2h"...
  },

  // --- TEMPERATURA (eixo Y esquerdo) ---
  temperatura: {
    label: 'Temperatura',
    unidade: '°C',
    min: 0,
    max: 40,
    passo: 10,       // intervalo entre os números do eixo
    cor: '#ee2222',
    areaCorTopo: 'rgba(37,99,235,.55)',   // degradê da área
    areaCorBase: 'rgba(37,99,235,.05)',
    preencher: true, // false = sem área colorida
  },

  // --- UMIDADE (eixo Y direito) ---
  umidade: {
    label: 'Umidade',
    unidade: '%',
    min: 0,
    max: 100,
    passo: 25,
    cor: '#2563eb',
    tracejado: [8, 6],   // [traço, espaço]; use [] para linha contínua
  },

  // --- APARÊNCIA ---
  visual: {
    espessuraLinha: 3,
    suavizacao: 0,          // 0 = linhas retas; 0.3 = curvas suaves
    corTexto: '#8d9bb8',    // números dos eixos
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
const leituras = [
  { hora: 1, temp: 18,   umid: 50   },
  { hora: 2, temp: 25,   umid: 34   },
  { hora: 3, temp: 31.5, umid: 27   },
  { hora: 4, temp: 23,   umid: 57.5 },
  { hora: 5, temp: 30,   umid: 56   },
  { hora: 6, temp: 30.3, umid: 43   },
];

/* ============================================================
   CÓDIGO (não precisa mexer)
   ============================================================ */
const { tempo, temperatura: T, umidade: U, visual: V, tooltip: TT } = CONFIG;

// filtra as leituras pelo intervalo de tempo definido
const dados = leituras.filter(l => l.hora >= tempo.min && l.hora <= tempo.max);

const labels   = dados.map(l => `${l.hora}${tempo.sufixo}`);
const dadosT   = dados.map(l => l.temp);
const dadosU   = dados.map(l => l.umid);

const ctx = document.getElementById(CONFIG.canvasId).getContext('2d');

const pointOpts = {
  pointRadius: 0,
  pointHoverRadius: V.raioPontoHover,
  pointHitRadius: V.areaToque,
  pointHoverBackgroundColor: '#fff',
  pointHoverBorderWidth: 2,
};

new Chart(ctx, {
  data: {
    labels,
    datasets: [
      {
        type: 'line', label: T.label, data: dadosT,
        yAxisID: 'yTemp', borderColor: T.cor,
        borderWidth: V.espessuraLinha, tension: V.suavizacao,
        fill: T.preencher,
        backgroundColor: (c) => {
          const a = c.chart.chartArea; if (!a) return null;
          const g = c.chart.ctx.createLinearGradient(0, a.top, 0, a.bottom);
          g.addColorStop(0, T.areaCorTopo);
          g.addColorStop(1, T.areaCorBase);
          return g;
        },
        ...pointOpts
      },
      {
        type: 'line', label: U.label, data: dadosU,
        yAxisID: 'yUmid', borderColor: U.cor,
        borderWidth: V.espessuraLinha, tension: V.suavizacao,
        borderDash: U.tracejado,
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
          label: (c) => {
            const unidade = c.dataset.yAxisID === 'yTemp' ? T.unidade : U.unidade;
            return ` ${c.dataset.label}: ${c.parsed.y} ${unidade}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: V.corTexto }
      },
      yTemp: {
        position: 'left', min: T.min, max: T.max,
        ticks: { color: V.corTexto, stepSize: T.passo },
        grid: { color: V.corGrade }, border: { display: false }
      },
      yUmid: {
        position: 'right', min: U.min, max: U.max,
        ticks: { color: V.corTexto, stepSize: U.passo },
        grid: { display: false }, border: { display: false }
      }
    }
  }
});

window.ATMOSFERA_CHARTS = window.ATMOSFERA_CHARTS || {};
window.ATMOSFERA_CHARTS.temperature = CONFIG;

// O gráfico principal é controlado em src/scripts/database/db.js.
// Isso evita que o mesmo canvas seja recriado e cause flicker na linha em tempo real.