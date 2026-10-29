const STORAGE_KEY = 'atmosfera-simulation-panel-records';
const SETTINGS_KEY = 'atmosfera-simulation-settings';

const chartInstances = {};
let dashboardRefreshInterval = null;

function readSimulationRecords() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Erro ao ler registros do localStorage:', error);
    return [];
  }
}

function readConfiguredFrequencySeconds() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    const parsed = raw ? JSON.parse(raw) : { frequency: 15 };
    const value = Number(parsed.frequency || 15);
    return value > 0 ? value : 15;
  } catch (error) {
    console.error('Erro ao ler frequência da simulação:', error);
    return 15;
  }
}

function readConfiguredFrequency() {
  return readConfiguredFrequencySeconds() * 1000;
}

function getLatestRecord() {
  const records = readSimulationRecords();
  return records.at(-1) || null;
}

function getLastValues() {
  const latest = getLatestRecord();
  if (!latest || !latest.values) {
    return {
      temperatura: 0,
      umidade: 0,
      pressao: 0,
      altitude: 0,
      direcaoVento: 0,
      velocidadeVento: 0,
      luminosidade: 0,
      wifi: 0
    };
  }

  return latest.values;
}

function normalizeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

/**
 * Localiza as partes de um card sem confundir título e subtítulo.
 * - título: o <p> dentro de .card-header
 * - valor: o <h2>
 * - subtítulo: .card-subtitle, ou o último <p> que NÃO está no header
 */
function getCardParts(card) {
  const titleNode = card.querySelector('.card-header p');
  const valueNode = card.querySelector('h2');
  const subtitleNode =
    card.querySelector('.card-subtitle') ||
    Array.from(card.querySelectorAll('p'))
      .filter((p) => !p.closest('.card-header'))
      .pop() ||
    null;

  return { titleNode, valueNode, subtitleNode };
}

function updateDeviceStatePanel(data) {
  const deviceTitle = document.querySelector('.device-info-container .info-text-container h3');
  const deviceSubtitle = document.querySelector('.device-info-container .info-text-container p');
  // Estado fica fora do .info-text-container; se tiver uma classe própria, use-a aqui.
  const deviceState =
    document.querySelector('.device-info-container .device-state') ||
    document.querySelector('.device-info-container > p');
  const metricBlocks = document.querySelectorAll('.device-data-container .data h3');

  if (deviceTitle) deviceTitle.textContent = data.deviceName || 'Dispositivo 1';
  if (deviceSubtitle) deviceSubtitle.textContent = data.location || 'Ex: 101 - Biblioteca';
  if (deviceState) deviceState.textContent = data.isOnline ? 'Online' : 'Offline';

  if (metricBlocks.length >= 3) {
    metricBlocks[0].textContent = `${normalizeNumber(data.temperatura, 0).toFixed(1)} °C`;
    metricBlocks[1].textContent = `${normalizeNumber(data.umidade, 0).toFixed(0)}%`;
    metricBlocks[2].textContent = `${normalizeNumber(data.wifi, 0).toFixed(0)} dBm`;
  }
}

function updateSummaryCards() {
  const latest = getLatestRecord();
  const values = getLastValues();

  const totalDevices = latest ? 1 : 0;
  const cardsData = {
    'Total de dispositivos': {
      value: String(totalDevices).padStart(2, '0'),
      subtitle: totalDevices ? 'Todos online' : 'Nenhum registro'
    },
    'Média do Campus': {
      value: `${normalizeNumber(values.temperatura, 0).toFixed(1)} °C / ${normalizeNumber(values.umidade, 0).toFixed(0)}%`,
      subtitle: 'Temperatura/Umidade'
    },
    'Pressão': {
      value: `${normalizeNumber(values.pressao, 0).toFixed(0)}`,
      subtitle: 'A pressão atual'
    },
    'Altitude': {
      value: `${normalizeNumber(values.altitude, 0).toFixed(0)}m`,
      subtitle: 'Em relação ao nível do mar'
    },
    'Direção do Vento': {
      value: `${normalizeNumber(values.direcaoVento, 0).toFixed(0)}°`,
      subtitle: 'Ventos à direção atual'
    },
    'Velocidade do Vento': {
      value: `${normalizeNumber(values.velocidadeVento, 0).toFixed(0)} km/h`,
      subtitle: 'Velocidade atual'
    },
    'Luminosidade': {
      value: `${normalizeNumber(values.luminosidade, 0).toFixed(0)} lux`,
      subtitle: 'Intensidade luminosa'
    },
    'Sinal Wifi': {
      value: `${normalizeNumber(values.wifi, 0).toFixed(0)} dBm`,
      subtitle: 'Potência do Wi-Fi'
    }
  };

  document.querySelectorAll('.card').forEach((card) => {
    const { titleNode, valueNode, subtitleNode } = getCardParts(card);
    const title = titleNode?.textContent?.trim();
    if (!title || !cardsData[title]) return;

    if (valueNode) valueNode.textContent = cardsData[title].value;
    if (subtitleNode && subtitleNode !== titleNode) {
      subtitleNode.textContent = cardsData[title].subtitle;
    }
  });

  if (!latest) {
    updateDeviceStatePanel({
      deviceName: 'Dispositivo 1',
      location: 'Ex: 101 - Biblioteca',
      isOnline: false,
      temperatura: 0,
      umidade: 0,
      wifi: 0
    });
    return;
  }

  updateDeviceStatePanel({
    deviceName: 'Dispositivo 1',
    location: 'Sala 101 • Teste',
    isOnline: true,
    temperatura: values.temperatura,
    umidade: values.umidade,
    wifi: values.wifi
  });
}

function buildChartConfig({ labels, datasets, type = 'line' }) {
  return {
    type,
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 700,
        easing: 'easeOutQuart'
      },
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0b1636',
          borderColor: '#1d4ed8',
          borderWidth: 1,
          titleColor: '#fff',
          bodyColor: '#a9b5cf',
          padding: 10,
          displayColors: false
        }
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: { color: '#8d9bb8' }
        },
        y: {
          grid: { color: 'rgba(148,163,184,.15)' },
          border: { display: false },
          ticks: { color: '#8d9bb8' }
        }
      }
    }
  };
}

function createOrUpdateChart(chartKey, canvasId, config) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  if (!chartInstances[chartKey]) {
    chartInstances[chartKey] = new Chart(canvas.getContext('2d'), buildChartConfig(config));
    return;
  }

  chartInstances[chartKey].data.labels = config.labels;
  chartInstances[chartKey].data.datasets = config.datasets;
  chartInstances[chartKey].update();
}

function buildTimeLabels(data) {
  return data.map((record) => {
    const date = new Date(record.timestamp);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  });
}

function renderTemperatureAndHumidityChart(records) {
  const data = records.slice(-6);
  const labels = buildTimeLabels(data);

  const datasets = [
    {
      label: 'Temperatura',
      data: data.map((record) => normalizeNumber(record.values?.temperatura, 0)),
      borderColor: '#22d3ee',
      backgroundColor: 'rgba(34, 211, 238, 0.18)',
      borderWidth: 3,
      tension: 0.3,
      fill: true
    },
    {
      label: 'Umidade',
      data: data.map((record) => normalizeNumber(record.values?.umidade, 0)),
      borderColor: '#2563eb',
      backgroundColor: 'rgba(37, 99, 235, 0.12)',
      borderWidth: 3,
      tension: 0.3,
      fill: false,
      borderDash: [8, 6]
    }
  ];

  createOrUpdateChart('tempUmid', 'tempUmidChart', { labels, datasets, type: 'line' });
}

function renderWindChart(records) {
  const data = records.slice(-6);
  const labels = buildTimeLabels(data);

  const datasets = [{
    label: 'Velocidade do Vento',
    data: data.map((record) => normalizeNumber(record.values?.velocidadeVento, 0)),
    borderColor: '#22d3ee',
    backgroundColor: 'rgba(34, 211, 238, 0.16)',
    borderWidth: 3,
    tension: 0.2,
    fill: true
  }];

  createOrUpdateChart('windSpeed', 'windSpeedChart', { labels, datasets, type: 'line' });
}

function renderLuminosityChart(records) {
  const data = records.slice(-6);
  const labels = buildTimeLabels(data);

  const datasets = [{
    label: 'Luminosidade',
    data: data.map((record) => normalizeNumber(record.values?.luminosidade, 0)),
    backgroundColor: ['#22d3ee', '#0ea5e9', '#38bdf8', '#60a5fa', '#3b82f6', '#1d4ed8'],
    borderRadius: 8
  }];

  createOrUpdateChart('luminosity', 'luminosityChart', { labels, datasets, type: 'bar' });
}

function renderWifiChart(records) {
  const data = records.slice(-6);
  const labels = buildTimeLabels(data);

  const datasets = [{
    label: 'Sinal WiFi',
    data: data.map((record) => normalizeNumber(record.values?.wifi, 0)),
    backgroundColor: ['#22d3ee', '#0ea5e9', '#38bdf8', '#60a5fa', '#3b82f6', '#1d4ed8'],
    borderRadius: 8
  }];

  createOrUpdateChart('wifi', 'wifiChart', { labels, datasets, type: 'bar' });
}

function renderDashboardFromStorage() {
  const records = readSimulationRecords();
  updateSummaryCards();

  if (!records.length) return;

  renderTemperatureAndHumidityChart(records);
  renderWindChart(records);
  renderLuminosityChart(records);
  renderWifiChart(records);
}

function isSimulationRunning() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    const parsed = raw ? JSON.parse(raw) : { frequency: 15, isRunning: false };
    return Boolean(parsed.isRunning);
  } catch (error) {
    console.error('Erro ao validar se a simulação está ativa:', error);
    return false;
  }
}

function startDashboardAutoRefresh() {
  if (dashboardRefreshInterval) clearInterval(dashboardRefreshInterval);

  if (!isSimulationRunning()) {
    dashboardRefreshInterval = null;
    renderDashboardFromStorage();
    return;
  }

  dashboardRefreshInterval = setInterval(() => {
    renderDashboardFromStorage();
  }, readConfiguredFrequency());
}

window.addEventListener('atmosfera-simulation-update', () => {
  if (isSimulationRunning()) {
    renderDashboardFromStorage();
  }
});

window.addEventListener('storage', (event) => {
  if (event.key === STORAGE_KEY || event.key === SETTINGS_KEY) {
    if (isSimulationRunning()) {
      renderDashboardFromStorage();
      startDashboardAutoRefresh();
    } else {
      if (dashboardRefreshInterval) {
        clearInterval(dashboardRefreshInterval);
        dashboardRefreshInterval = null;
      }
      renderDashboardFromStorage();
    }
  }
});

const frequencyInput = document.querySelector('.frequency-input input');
if (frequencyInput) {
  frequencyInput.value = readConfiguredFrequencySeconds();

  frequencyInput.addEventListener('input', () => {
    const frequency = Number(frequencyInput.value);
    if (frequency > 0) {
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify({
          frequency,
          isRunning: isSimulationRunning()
        }));
      } catch (error) {
        console.error('Erro ao salvar frequência da simulação:', error);
      }
    }

    if (isSimulationRunning()) {
      startDashboardAutoRefresh();
    }
  });
}

function initDashboard() {
  renderDashboardFromStorage();
  startDashboardAutoRefresh();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDashboard);
} else {
  initDashboard();
}