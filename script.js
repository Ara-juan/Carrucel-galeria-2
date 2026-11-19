const items = [
  { url: "imagen1.jpeg",   title: "Una niña muy criticona y buena pal chisme" },
  { url: "imagen2.jpeg",   title: "Siento cariño por ti de una manera que me parece natural y real." },
  { url: "imagen3.jpeg",   title: "La de los gustos musicales de marihuano y pa tomar" },
  { url: "imagen4.jpeg",   title: "Tú has podido y siempre podrás con todo (aunque a ratos hagas cortocircuito)" },
  { url: "imagen5.jpeg",   title: "Recuerda que si crees que eres difícil de querer, estoy yo que demuestra lo contrario" },
  { url: "imagen6.jpeg",   title: "Con vos, las conversaciones aburridas no existen." },
  { url: "imagen7.jpeg",   title: "Hay un cariño tranquilo en ti que siempre quiero cerca." },
  { url: "imagen8.jpeg",   title: "Me alegra que exista alguien que entiende mi manera de ser" },
  { url: "imagen9.jpeg",   title: "Estás en mi lista de personas importantes" },
  { url: "imagen10.jpeg",  title: "Tienes un corazón de oro, nunca dejes de sentir, aunque duela" },
  { url: "imagen11.jpeg",  title: "Cuando me pasa algo bueno, eres a la primera a quien se lo quiero contar" },
  { url: "imagen12.jpeg",  title: "Eres mi recordatorio silencioso de que no estoy solo." },
  { url: "imagen13.jpeg",  title: "Siempre te desearé lo mejor" },
  { url: "imagen14.jpeg",  title: "Si te sientes mal, sabes que puedes contar conmigo" },
  { url: "imagen15.jpeg",  title: "Eres la persona a la que le puedo contar de todo y eso vale mucho" },
  { url: "imagen16.jpeg",  title: "Me gusta tu calidez y tus abrazos 💕" },
  { url: "imagen17.jpeg",  title: "¿Cómo olvidar lo random que fue conocernos?" },
  { url: "imagen18.jpeg",  title: "Para algunos una chica sin sentimientos o creída, para mí una niña muy bonita y cálida" },
  { url: "imagen19.jpeg",  title: "Me gusta escucharte" },
  { url: "imagen20.jpeg",  title: "Quiero seguir conociéndote más" },
  { url: "imagen21.jpeg",  title: "Contigo no hay planes malos." }
];

const total = items.length;
const ring = document.getElementById('ring');
const center = document.getElementById('center');
const centerImg = document.getElementById('centerImg');
const centerTitle = document.getElementById('centerTitle');
const centerSub = document.getElementById('centerSub');
const placeholder = document.getElementById('placeholder');

// Selectores del modal
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalCounter = document.getElementById('modalCounter');
const modalClose = document.getElementById('modalClose');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');

// Efectos y audio
const heartsContainer = document.getElementById('heartsContainer');
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicLabel = document.getElementById('musicLabel');

let currentIndex = -1;
document.documentElement.style.setProperty('--total', total);

/* =========================================
   1. CIELO ESTRELLADO + ESTRELLAS FUGACES
   ========================================= */
function initStarfield() {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const starColors = ['#ffffff', '#d8fff0', '#ffd6e5', '#cfe4ff'];
  const stars = Array.from({ length: 140 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.6 + 0.4,
    alpha: Math.random(),
    speed: (Math.random() * 0.015 + 0.005) * (Math.random() < 0.5 ? 1 : -1),
    color: starColors[Math.floor(Math.random() * starColors.length)]
  }));

  let shootingStar = null;

  function spawnShootingStar() {
    shootingStar = {
      x: Math.random() * width * 0.8,
      y: Math.random() * height * 0.35,
      len: Math.random() * 90 + 60,
      speed: Math.random() * 9 + 8,
      alpha: 1
    };
  }

  setInterval(() => {
    if (!shootingStar && Math.random() > 0.35) {
      spawnShootingStar();
    }
  }, 5500);

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (const s of stars) {
      s.alpha += s.speed;
      if (s.alpha >= 1 || s.alpha <= 0.15) s.speed *= -1;

      ctx.save();
      ctx.globalAlpha = Math.max(0.1, Math.min(1, s.alpha));
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    if (shootingStar) {
      ctx.save();
      const grad = ctx.createLinearGradient(
        shootingStar.x,
        shootingStar.y,
        shootingStar.x - shootingStar.len,
        shootingStar.y - shootingStar.len * 0.5
      );
      grad.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.alpha})`);
      grad.addColorStop(1, 'rgba(124, 255, 178, 0)');

      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(shootingStar.x, shootingStar.y);
      ctx.lineTo(shootingStar.x - shootingStar.len, shootingStar.y - shootingStar.len * 0.5);
      ctx.stroke();
      ctx.restore();

      shootingStar.x += shootingStar.speed;
      shootingStar.y += shootingStar.speed * 0.5;
      shootingStar.alpha -= 0.018;

      if (shootingStar.alpha <= 0) shootingStar = null;
    }

    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  animate();
}

initStarfield();

/* =========================================
   2. LLUVIA DE CORAZONES AL ABRIR IMAGEN
   ========================================= */
function triggerHeartRain(amount = 30) {
  const symbols = ['❤', '💕', '💖', '✨', '💗'];
  const colors = ['#ff7aa2', '#ff4d88', '#ffb3c6', '#7cffb2', '#ffffff'];

  for (let i = 0; i < amount; i++) {
    const heart = document.createElement('span');
    heart.className = 'falling-heart';
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const left = Math.random() * 100;
    const size = Math.random() * 16 + 14;
    const duration = Math.random() * 2.2 + 2.4;
    const delay = Math.random() * 0.9;
    const drift = (Math.random() - 0.5) * 140;
    const rotation = (Math.random() - 0.5) * 360;
    const scale = Math.random() * 0.6 + 0.75;

    heart.style.left = `${left}vw`;
    heart.style.fontSize = `${size}px`;
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    heart.style.setProperty('--dur', `${duration}s`);
    heart.style.setProperty('--drift', `${drift}px`);
    heart.style.setProperty('--rot', `${rotation}deg`);
    heart.style.setProperty('--scale', scale);
    heart.style.animationDelay = `${delay}s`;

    heart.addEventListener('animationend', () => heart.remove());
    heartsContainer.appendChild(heart);
  }
}

/* =========================================
   3. DESTELLOS SUTILES AL MOVER EL CURSOR
   ========================================= */
let lastSparkle = 0;
document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastSparkle < 55) return;
  lastSparkle = now;

  const sparkle = document.createElement('span');
  sparkle.className = 'cursor-sparkle';
  sparkle.style.left = `${e.clientX}px`;
  sparkle.style.top = `${e.clientY}px`;
  sparkle.addEventListener('animationend', () => sparkle.remove());
  document.body.appendChild(sparkle);
});

/* =========================================
   4. MÚSICA DE FONDO Y CONTROL FLOTANTE
   ========================================= */
function updateMusicUI(isPlaying) {
  if (isPlaying) {
    musicToggle.classList.add('playing');
    musicLabel.textContent = 'Puro Parcerito';
  } else {
    musicToggle.classList.remove('playing');
    musicLabel.textContent = 'Música pausada';
  }
}

function initMusic() {
  if (bgMusic && bgMusic.paused) {
    bgMusic.volume = 0.4;
    bgMusic.play()
      .then(() => updateMusicUI(true))
      .catch(() => {});
  }
}

musicToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  if (bgMusic.paused) {
    bgMusic.volume = 0.4;
    bgMusic.play().then(() => updateMusicUI(true)).catch(() => {});
  } else {
    bgMusic.pause();
    updateMusicUI(false);
  }
});

/* =========================================
   5. CARRUSEL Y MODAL CON NAVEGACIÓN
   ========================================= */
function previewItem(index) {
  const data = items[index];
  if (!data) return;
  currentIndex = index;
  centerImg.style.backgroundImage = `url(${data.url})`;
  centerImg.classList.add('active');
  centerTitle.textContent = data.title;
  centerTitle.classList.add('show');
  centerSub.classList.add('show');
  placeholder.style.opacity = 0;
}

function openModal(index, heartCount = 32) {
  if (index < 0 || index >= total) index = 0;
  currentIndex = index;
  const itemData = items[currentIndex];

  previewItem(currentIndex);
  modalImg.src = itemData.url;
  modalTitle.textContent = itemData.title;
  modalCounter.textContent = `${currentIndex + 1} / ${total}`;
  modal.classList.add('open');

  triggerHeartRain(heartCount);
}

items.forEach((data, i) => {
  const el = document.createElement('div');
  el.className = 'item';
  el.style.setProperty('--i', i);

  const img = document.createElement('img');
  img.src = data.url;
  img.alt = data.title;
  img.loading = 'lazy';
  el.appendChild(img);

  el.addEventListener('mouseenter', () => previewItem(i));

  el.addEventListener('click', () => {
    initMusic();
    openModal(i, 32);
  });

  ring.appendChild(el);
});

center.addEventListener('click', () => {
  initMusic();
  openModal(currentIndex === -1 ? 0 : currentIndex, 32);
});

modalPrev.addEventListener('click', (e) => {
  e.stopPropagation();
  const prevIdx = (currentIndex - 1 + total) % total;
  openModal(prevIdx, 14);
});

modalNext.addEventListener('click', (e) => {
  e.stopPropagation();
  const nextIdx = (currentIndex + 1) % total;
  openModal(nextIdx, 14);
});

modalClose.addEventListener('click', () => {
  modal.classList.remove('open');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('open');
  }
});

// Atajos de teclado cuando el modal está abierto
document.addEventListener('keydown', (e) => {
  if (!modal.classList.contains('open')) return;
  if (e.key === 'Escape') modal.classList.remove('open');
  if (e.key === 'ArrowRight') openModal((currentIndex + 1) % total, 14);
  if (e.key === 'ArrowLeft') openModal((currentIndex - 1 + total) % total, 14);
});

document.body.addEventListener('click', () => {
  initMusic();
}, { once: true });