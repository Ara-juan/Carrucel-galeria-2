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
const modalClose = document.getElementById('modalClose');

// NUEVO: Selector de la música de fondo
const bgMusic = document.getElementById('bgMusic');

let activeItem = null;

document.documentElement.style.setProperty('--total', total);

// NUEVO: Función para iniciar la música de forma segura ante restricciones del navegador
function initMusic() {
  if (bgMusic && bgMusic.paused) {
    bgMusic.volume = 0.4; // Ajusta el volumen aquí (0.0 es silencio, 1.0 es el máximo)
    bgMusic.play().catch(error => {
      console.log("El navegador bloqueó la reproducción automática inicial hasta otra acción.");
    });
  }
}

// Función para abrir modal emergente
function openModal(itemData) {
  if (!itemData) return;
  modalImg.src = itemData.url;
  modalTitle.textContent = itemData.title;
  modal.classList.add('open');
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

  // Evento Hover
  el.addEventListener('mouseenter', () => {
    centerImg.style.backgroundImage = `url(${data.url})`;
    centerImg.classList.add('active');
    centerTitle.textContent = data.title;
    centerTitle.classList.add('show');
    centerSub.classList.add('show');
    placeholder.style.opacity = 0;
    activeItem = data; 
  });

  // Evento Click en la tarjeta del carrusel
  el.addEventListener('click', () => {
    initMusic(); // Se activa el reproductor de música en el primer clic
    openModal(data);
  });

  ring.appendChild(el);
});

// Evento Click en el círculo central
center.addEventListener('click', () => {
  initMusic(); // Se activa también si hacen clic al centro
  openModal(activeItem);
});

// Evento para cerrar el modal al pulsar la 'X'
modalClose.addEventListener('click', () => {
  modal.classList.remove('open');
});

// Evento para cerrar el modal al hacer click en el fondo oscuro
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('open');
  }
});

// NUEVO: Respaldo para iniciar la música si el usuario da clic en cualquier otra parte libre del fondo
document.body.addEventListener('click', () => {
  initMusic();
}, { once: true }); // '{ once: true }' asegura que este disparador genérico funcione solo en el primer toque.