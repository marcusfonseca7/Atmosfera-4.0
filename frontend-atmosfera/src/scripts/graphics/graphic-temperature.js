const ctx = document.getElementById('tempUmidChart').getContext('2d');
const grid = 'rgba(148,163,184,.15)', tick = '#8d9bb8';

new Chart(ctx, {
  data: {
    labels: ['1h','2h','3h','4h','5h','6h'],
    datasets: [
      {
        type: 'line', label: 'Temperatura', data: [18, 25, 31.5, 23, 30, 30.3],
        yAxisID: 'yTemp', borderColor: '#22d3ee', borderWidth: 3,
        pointRadius: 0, tension: 0, fill: true,
        backgroundColor: (c) => {
          const a = c.chart.chartArea; if (!a) return null;
          const g = c.chart.ctx.createLinearGradient(0, a.top, 0, a.bottom);
          g.addColorStop(0, 'rgba(37,99,235,.55)');
          g.addColorStop(1, 'rgba(37,99,235,.05)');
          return g;
        }
      },
      {
        type: 'line', label: 'Umidade', data: [50, 34, 27, 57.5, 56, 43],
        yAxisID: 'yUmid', borderColor: '#2563eb', borderWidth: 3,
        borderDash: [8, 6], pointRadius: 0, tension: 0
      }
    ]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x:     { grid: { display: false }, border: { display: false }, ticks: { color: tick } },
      yTemp: { position: 'left',  min: 0, max: 40,  ticks: { color: tick, stepSize: 10 }, grid: { color: grid }, border: { display: false } },
      yUmid: { position: 'right', min: 0, max: 100, ticks: { color: tick, stepSize: 25 }, grid: { display: false }, border: { display: false } }
    }
  }
});