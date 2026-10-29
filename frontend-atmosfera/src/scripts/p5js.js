import p5 from 'p5';

// Opacidade do efeito: de 0 (invisível) a 1 (total)
const OPACITY = 0.30;

// Paleta do design Atmosfera 4.0
const C = {
  bg1: '#040a22',
  blue: '#0a7cff',
  cyan: '#22d3ee'
};

let nodes = [], packets = [], t = 0;
const N = 46, LINK = 170;

function setup() {
  const cnv = createCanvas(windowWidth, windowHeight);
  // Fixa o canvas no fundo da página, atrás do conteúdo
  cnv.style('position', 'fixed');
  cnv.style('top', '0');
  cnv.style('left', '0');
  cnv.style('z-index', '0');
  cnv.style('pointer-events', 'none');
  cnv.style('opacity', OPACITY);
  initNodes();
}

function initNodes() {
  nodes = [];
  for (let i = 0; i < N; i++) {
    nodes.push({
      x: random(width), y: random(height),
      vx: random(-0.25, 0.25), vy: random(-0.25, 0.25),
      r: random(2, 3.6), ph: random(TWO_PI),
      alert: i === 7
    });
  }
}

function draw() {
  t += 0.01;
  drawBackground();
  drawGrid();
  updateNodes();
  drawLinks();
  drawPackets();
  drawNodes();
  drawWave(height * 0.80, 70, 0.9, C.cyan, false);
  drawWave(height * 0.80, 55, 0.6, C.blue, true);
}

function drawBackground() {
  const ctx = drawingContext;
  const g = ctx.createLinearGradient(0, 0, width, height);
  g.addColorStop(0, C.bg1);
  g.addColorStop(1, '#06143a');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, width, height);
  const r = ctx.createRadialGradient(width * 0.85, height * 0.9, 0, width * 0.85, height * 0.9, max(width, height) * 0.7);
  r.addColorStop(0, 'rgba(10,80,200,0.55)');
  r.addColorStop(1, 'rgba(10,80,200,0)');
  ctx.fillStyle = r;
  ctx.fillRect(0, 0, width, height);
}

function drawGrid() {
  stroke(34, 211, 238, 12);
  strokeWeight(1);
  const s = 48;
  for (let x = 0; x < width; x += s) line(x, 0, x, height);
  for (let y = 0; y < height; y += s) line(0, y, width, y);
  // linha de varredura
  const sy = (frameCount * 1.2) % (height + 200) - 100;
  const ctx = drawingContext;
  const g = ctx.createLinearGradient(0, sy - 80, 0, sy);
  g.addColorStop(0, 'rgba(34,211,238,0)');
  g.addColorStop(1, 'rgba(34,211,238,0.07)');
  ctx.fillStyle = g;
  ctx.fillRect(0, sy - 80, width, 80);
}

function updateNodes() {
  for (const n of nodes) {
    n.x += n.vx; n.y += n.vy;
    if (n.x < 0 || n.x > width) n.vx *= -1;
    if (n.y < 0 || n.y > height) n.vy *= -1;
    // o mouse afasta levemente os pontos
    const d = dist(mouseX, mouseY, n.x, n.y);
    if (d < 120 && d > 0) {
      n.x += (n.x - mouseX) / d * 0.8;
      n.y += (n.y - mouseY) / d * 0.8;
    }
  }
}

function drawLinks() {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j];
      const d = dist(a.x, a.y, b.x, b.y);
      if (d < LINK) {
        stroke(10, 124, 255, map(d, 0, LINK, 120, 0));
        strokeWeight(1);
        line(a.x, a.y, b.x, b.y);
        if (random() < 0.0016) packets.push({ a, b, p: 0, sp: random(0.012, 0.03) });
      }
    }
  }
}

function drawPackets() {
  noStroke();
  for (let i = packets.length - 1; i >= 0; i--) {
    const k = packets[i];
    k.p += k.sp;
    if (k.p >= 1) { packets.splice(i, 1); continue; }
    const x = lerp(k.a.x, k.b.x, k.p), y = lerp(k.a.y, k.b.y, k.p);
    fill(34, 211, 238, 60); circle(x, y, 12);
    fill(C.cyan); circle(x, y, 4);
  }
}

function drawNodes() {
  noStroke();
  for (const n of nodes) {
    const pulse = 0.5 + 0.5 * sin(t * 3 + n.ph);
    const col = color(n.alert ? '#f5a623' : C.cyan);
    col.setAlpha(40 + pulse * 50);
    fill(col); circle(n.x, n.y, n.r * 5 + pulse * 6);
    fill(n.alert ? '#f5a623' : C.cyan); circle(n.x, n.y, n.r * 2);
  }
}

function drawWave(baseY, amp, speed, col, dashed) {
  const c = color(col);
  noFill();
  stroke(c);
  strokeWeight(2);
  if (dashed) drawingContext.setLineDash([8, 7]);
  beginShape();
  const pts = [];
  for (let x = 0; x <= width; x += 12) {
    const y = baseY + noise(x * 0.003, t * speed) * amp * 1.6 - amp * 0.8
              + sin(x * 0.01 + t * 2) * 6;
    vertex(x, y); pts.push([x, y]);
  }
  endShape();
  drawingContext.setLineDash([]);
  if (!dashed) {
    const ctx = drawingContext;
    const g = ctx.createLinearGradient(0, baseY - amp, 0, height);
    g.addColorStop(0, 'rgba(34,211,238,0.22)');
    g.addColorStop(1, 'rgba(34,211,238,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(0, height);
    pts.forEach(p => ctx.lineTo(p[0], p[1]));
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initNodes();
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;

new p5();