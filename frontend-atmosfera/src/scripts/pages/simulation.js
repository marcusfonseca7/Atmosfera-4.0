//id da temperatura
const tempMin = document.getElementById('temp-min');
const tempMax = document.getElementById('temp-max');

//id da umidade
const umidadeMin = document.getElementById('umidade-min');
const umidadeMax = document.getElementById('umidade-max');

//id da pressao
const pressaoMin = document.getElementById('pressao-min');
const pressaoMax = document.getElementById('pressao-max');

//id da altitude
const altitudeMin = document.getElementById('altitude-min');
const altitudeMax = document.getElementById('altitude-max');

//id da direcao do vento
const direcaoVentoMin = document.getElementById('direcao-vento-min');
const direcaoVentoMax = document.getElementById('direcao-vento-max');

//id da velocidade do vento
const velocidadeVentoMin = document.getElementById('velocidade-vento-min');
const velocidadeVentoMax = document.getElementById('velocidade-vento-max');

//id da luminosidade
const luminosidadeMin = document.getElementById('luminosidade-min');
const luminosidadeMax = document.getElementById('luminosidade-max');

//id da intensidade do wi-fi
const wifiMin = document.getElementById('wifi-min');
const wifiMax = document.getElementById('wifi-max');

const startSimulationButton = document.getElementById('start-simulation');
const stopSimulationButton = document.getElementById('stop-simulation');
const frequencyInput = document.querySelector('.frequency-input input');
const frequencyLabel = document.getElementById('frequency-seconds');
const frequencyConfiguredLabel = document.getElementById('frequency-configured');

function getSimulationSettings() {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? JSON.parse(stored) : { frequency: 15, isRunning: false };
  } catch (error) {
    console.error('Erro ao ler configurações da simulação:', error);
    return { frequency: 15, isRunning: false };
  }
}

function saveSimulationSettings(frequency, isRunning = false) {
  try {
    const current = getSimulationSettings();
    const settings = {
      frequency: Number(frequency) || 15,
      isRunning: Boolean(isRunning ?? current.isRunning)
    };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Erro ao salvar configurações da simulação:', error);
  }
}

function setSimulationRunningState(isRunning) {
  const current = getSimulationSettings();
  localStorage.setItem(SETTINGS_KEY, JSON.stringify({
    frequency: Number(current.frequency) || 15,
    isRunning: Boolean(isRunning)
  }));
}

function updateFrequencyLabel() {
  if (!frequencyInput) return;

  const value = Number(frequencyInput.value) || 15;

  if (frequencyLabel) {
    frequencyLabel.textContent = `${value} segundos`;
  }

  if (frequencyConfiguredLabel) {
    frequencyConfiguredLabel.textContent = `${value} segundos`;
  }

  const current = getSimulationSettings();
  saveSimulationSettings(value, Boolean(current.isRunning));
}

frequencyInput?.addEventListener('input', updateFrequencyLabel);
frequencyInput?.addEventListener('change', updateFrequencyLabel);
updateFrequencyLabel();

const metricCards = document.querySelectorAll('.metric-card');

const valuesByMetric = {
  temperatura: { element: metricCards[0], unit: '°C', decimals: 1 },
  umidade: { element: metricCards[1], unit: '%', decimals: 0 },
  pressao: { element: metricCards[2], unit: 'hPa', decimals: 0 },
  altitude: { element: metricCards[3], unit: 'm', decimals: 0 },
  direcaoVento: { element: metricCards[4], unit: '°', decimals: 0 },
  velocidadeVento: { element: metricCards[5], unit: 'km/h', decimals: 0 },
  luminosidade: { element: metricCards[6], unit: 'lux', decimals: 0 },
  wifi: { element: metricCards[7], unit: 'dBm', decimals: 0 }
};

const statusBadge = document.getElementById('status');
const statusText = statusBadge ? statusBadge.querySelector('p') : null;
const alertMessage = document.querySelector('.alert-message');
const alertText = alertMessage ? alertMessage.querySelector('p') : null;
const recordsCounter = document.querySelectorAll('.session-stat strong')[0];
const elapsedCounter = document.querySelectorAll('.session-stat strong')[1];
const progressBar = document.querySelector('.progress-bar span');
const summaryDateTime = document.getElementById('summary-datetime');
const summaryStatusTitle = document.querySelector('.summary-status strong');
const summaryStatusText = document.querySelector('.summary-status p');

let simulationInterval = null;
let elapsedInterval = null;
let simulationStartTime = null;
let recordsSent = 0;

const STORAGE_KEY = 'atmosfera-simulation-panel-records';
const SETTINGS_KEY = 'atmosfera-simulation-settings';
const BACKEND_ENDPOINT = '/api/simulation';

function buildSimulationPayload(data) {
  return {
    id: `sim-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`,
    timestamp: new Date().toISOString(),
    device: 'Sala de Aula 101 • Teste',
    location: 'Bloco A • Sala 101',
    values: {
      temperatura: data.temperatura,
      umidade: data.umidade,
      pressao: data.pressao,
      altitude: data.altitude,
      direcaoVento: data.direcaoVento,
      velocidadeVento: data.velocidadeVento,
      luminosidade: data.luminosidade,
      wifi: data.wifi
    }
  };
}

function getStoredSimulationRecords() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Erro ao ler registros salvos:', error);
    return [];
  }
}

function saveSimulationRecord(data) {
  try {
    const payload = buildSimulationPayload(data);
    const records = getStoredSimulationRecords();
    records.push(payload);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));

    window.dispatchEvent(new CustomEvent('atmosfera-simulation-update', {
      detail: payload
    }));

    return payload;
  } catch (error) {
    console.error('Erro ao salvar registro no localStorage:', error);
    return null;
  }
}

function syncSimulationRecordWithBackend(record) {
  // TODO: adaptar para um fetch real quando o backend estiver pronto.
  // Exemplo futuro:
  // return fetch(BACKEND_ENDPOINT, {
  //   method: 'GET',
  //   headers: { 'Content-Type': 'application/json' }
  // }).then((response) => response.json());
  return Promise.resolve(record);
}

function loadSimulationRecords() {
  const records = getStoredSimulationRecords();

  return records.map((record) => ({
    ...record,
    timestampLabel: new Date(record.timestamp).toLocaleString('pt-BR')
  }));
}

function getRandomNumber(min, max) {
  const minimum = Number(min);
  const maximum = Number(max);

  if (!Number.isFinite(minimum) || !Number.isFinite(maximum)) {
    return 0;
  }

  if (minimum > maximum) {
    return Math.random() * (minimum - maximum) + maximum;
  }

  return Math.random() * (maximum - minimum) + minimum;
}

function generateRandomValues() {
  const data = {
    temperatura: getRandomNumber(tempMin.value || 18, tempMax.value || 30),
    umidade: getRandomNumber(umidadeMin.value || 40, umidadeMax.value || 80),
    pressao: getRandomNumber(pressaoMin.value || 980, pressaoMax.value || 1030),
    altitude: getRandomNumber(altitudeMin.value || 0, altitudeMax.value || 4000),
    direcaoVento: getRandomNumber(direcaoVentoMin.value || 0, direcaoVentoMax.value || 359),
    velocidadeVento: getRandomNumber(velocidadeVentoMin.value || 0, velocidadeVentoMax.value || 60),
    luminosidade: getRandomNumber(luminosidadeMin.value || 0, luminosidadeMax.value || 1000),
    wifi: getRandomNumber(wifiMin.value || 20, wifiMax.value || 90)
  };

  return data;
}

function formatValue(value, decimals) {
  return Number(value).toFixed(decimals);
}

function renderSimulationData(data) {
  Object.entries(valuesByMetric).forEach(([key, config]) => {
    const value = data[key];
    const formattedValue = formatValue(value, config.decimals);
    const valueElement = config.element.querySelector('strong');

    if (valueElement) {
      valueElement.innerHTML = `${formattedValue}<small>${config.unit}</small>`;
    }
  });
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateSummaryStatus(isRunning) {
  if (!summaryStatusTitle || !summaryStatusText) return;

  if (isRunning) {
    summaryStatusTitle.textContent = 'Próxima transmissão';
    summaryStatusText.textContent = 'Simulação em execução. Registrando dados em tempo real.';
    return;
  }

  summaryStatusTitle.textContent = 'Próxima transmissão';
  summaryStatusText.textContent = 'Não há registro enviado até o momento.';
}

function updateSessionStatus(isRunning) {
  if (!statusBadge) return;

  statusBadge.classList.toggle('is-active', isRunning);

  if (statusText) {
    statusText.textContent = isRunning ? 'Em execução' : 'Não iniciado';
  }

  if (alertMessage) {
    alertMessage.classList.toggle('is-running', isRunning);
  }

  if (alertText) {
    alertText.textContent = isRunning
      ? 'Simulação em execução: novos registros estão sendo gerados.'
      : 'Modo de demonstração: todos os dados foram gerados.';
  }

  updateSummaryStatus(isRunning);
}

function updateSessionCard() {
  if (recordsCounter) {
    recordsCounter.textContent = String(recordsSent);
  }

  if (!simulationStartTime) {
    if (elapsedCounter) {
      elapsedCounter.textContent = '00:00';
    }
    if (progressBar) {
      progressBar.style.width = '0%';
    }
    return;
  }

  const frequency = Number(frequencyInput.value) || 15;
  const elapsedSeconds = Math.floor((Date.now() - simulationStartTime) / 1000);

  if (elapsedCounter) {
    elapsedCounter.textContent = formatTime(elapsedSeconds);
  }

  if (progressBar) {
    const progress = ((elapsedSeconds % frequency) / frequency) * 100;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
  }
}

function startSimulation() {
  const frequency = Number(frequencyInput.value);

  if (!frequency || frequency < 1) {
    window.alert('Informe uma frequência válida em segundos.');
    return;
  }

  saveSimulationSettings(frequency);
  const settings = getSimulationSettings();

  if (!settings.frequency || settings.frequency < 1) {
    return;
  }

  if (simulationInterval) {
    clearInterval(simulationInterval);
  }

  if (elapsedInterval) {
    clearInterval(elapsedInterval);
  }

  recordsSent = 0;
  simulationStartTime = Date.now();

  const data = generateRandomValues();
  renderSimulationData(data);
  recordsSent += 1;
  updateSessionCard();
  updateSessionStatus(true);
  setSimulationRunningState(true);

  simulationInterval = setInterval(() => {
    const randomData = generateRandomValues();
    renderSimulationData(randomData);
    recordsSent += 1;
    updateSessionCard();

    const savedRecord = saveSimulationRecord(randomData);
    if (savedRecord) {
      syncSimulationRecordWithBackend(savedRecord);
    }
  }, settings.frequency * 1000);

  const firstRecord = saveSimulationRecord(data);
  if (firstRecord) {
    syncSimulationRecordWithBackend(firstRecord);
  }

  elapsedInterval = setInterval(() => {
    updateSessionCard();
  }, 1000);
}

function stopSimulation() {
  if (simulationInterval) {
    clearInterval(simulationInterval);
    simulationInterval = null;
  }

  if (elapsedInterval) {
    clearInterval(elapsedInterval);
    elapsedInterval = null;
  }

  simulationStartTime = null;
  recordsSent = 0;
  updateSessionStatus(false);
  updateSessionCard();
  setSimulationRunningState(false);
}

function formatDateTime(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} • ${hours}:${minutes}:${seconds}`;
}

function updateSummaryDateTime() {
  if (!summaryDateTime) return;

  summaryDateTime.textContent = formatDateTime(new Date());
}

updateSummaryDateTime();
setInterval(updateSummaryDateTime, 1000);

startSimulationButton.addEventListener('click', startSimulation);
stopSimulationButton.addEventListener('click', stopSimulation);

updateSessionStatus(false);
updateSessionCard();

