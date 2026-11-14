
const TITLE_TIME = 2600;
const CATS_TIME = 3600; 

const $ = (id) => document.getElementById(id);
document.querySelectorAll('.picture').forEach((box) => {
  const img = box.querySelector('img');
  img.addEventListener('load', () => box.classList.add('loaded'));
  img.addEventListener('error', () => box.classList.remove('loaded'));
  if (img.complete && img.naturalWidth > 0) box.classList.add('loaded');
});

function showScene(id) {
  document.querySelectorAll('.scene').forEach((scene) => {
    scene.classList.toggle('active', scene.id === id);
  });
}

setTimeout(() => showScene('sceneCats'), TITLE_TIME);
setTimeout(() => showScene('scenePhoto'), TITLE_TIME + CATS_TIME);

function showPage(number) {
  $('page1').classList.toggle('shown', number === 1);
  $('page2').classList.toggle('shown', number === 2);
  $('page3').classList.toggle('shown', number === 3);
  $('page4').classList.toggle('shown', number === 4);
  $('page5').classList.toggle('shown', number === 5);
  $('page6').classList.toggle('shown', number === 6);
}

$('nextToLetter').addEventListener('click', () => showPage(2));
$('backButton').addEventListener('click', () => {
  showPage(1);
  showScene('scenePhoto');
  $('speech').classList.remove('shown');
});

$('sealButton').addEventListener('click', () => {
  $('envelope').classList.add('open');
  $('instruction').textContent = 'Тепер потягни листочок вгору ↑';
  $('speech').classList.add('shown');
  $('paperTab').tabIndex = 0;
});

function openLetter() {
  $('envelopeScreen').style.display = 'none';
  $('openedLetter').classList.add('shown');
  $('speech').classList.remove('shown');
}

const tab = $('paperTab');
let startY = null;
let pulled = 0;

tab.addEventListener('pointerdown', (event) => {
  if (!$('envelope').classList.contains('open')) return;
  startY = event.clientY;
  pulled = 0;
  tab.classList.add('dragging');
  tab.setPointerCapture(event.pointerId);
});

tab.addEventListener('pointermove', (event) => {
  if (startY === null) return;
  pulled = Math.max(0, startY - event.clientY);
  tab.style.transform = `translateY(${-55 - pulled}px)`;
});

function finishDrag() {
  if (startY === null) return;
  tab.classList.remove('dragging');
  tab.style.transform = '';
  startY = null;
  if (pulled > 45) openLetter();
}
tab.addEventListener('pointerup', finishDrag);
tab.addEventListener('pointercancel', finishDrag);
tab.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    openLetter();
  }
});

$('closeLetter').addEventListener('click', () => {
  $('openedLetter').classList.remove('shown');
  $('envelopeScreen').style.display = '';
  $('envelope').classList.remove('open');
  $('instruction').textContent = 'Натисни на сердечко, щоб відкрити конверт';
  $('speech').classList.remove('shown');
  tab.tabIndex = -1;
});

$('nextPageButton').addEventListener('click', () => showPage(3));
$('nextToFuture').addEventListener('click', () => {
  showPage(4);
  $('page4').scrollTop = 0;
});

$('nextToStars').addEventListener('click', () => {
  showPage(5);
  window.scrollTo(0, 0);
});
$('nextToFinal').addEventListener('click', () => {
  closeStar();
  showPage(6);
  window.scrollTo(0, 0);
});

const starMessages = [
  'Ти неймовірна! ♡',
  'Я безмежно рада, що колись ми познайомилися.',
  'Нехай у тебе завжди буде час на те, що робить тебе щасливою.',
  'Ти навіть не уявляєш, наскільки ти чудова людина.',
  'Обіймаю тебе міцно-міцно! ♡',
  'Бажаю тобі зустрічати тільки тих людей, поруч із якими можна бути собою.',
  'Я дуже ціную кожен наш спільний спогад.',
  'Ти сильніша, ніж тобі іноді здається.',
  'Якби ти могла подивитися на себе моїми очима, ти б зрозуміла, наскільки ти прекрасна.',
  'Нехай у тебе завжди буде привід усміхатися.',
  'Дякую, що стільки років є частинкою мого життя.',
  'Ти заслуговуєш на любов не за якісь досягнення, а просто за те, що ти є.',
  "Нехай у тебе буде якомога більше днів, які хочеться запам'ятати.",
  'Ніколи не сумнівайся в тому, наскільки ти особлива.',
  'Я дуже пишаюся тобою, навіть якщо не говорю про це.',
  'Нехай у тебе завжди буде людина, якій можна зателефонувати о третій ночі і просто поговорити про все і нічого.',
  'Мені дуже пощастило мати таку подругу.',
  'Ти можеш пишатися собою навіть за маленькі перемоги.',
  'Нехай усі твої мрії поступово стають реальністю.',
  'Як добре, що у світі є така людина, як ти.',
  'Не забувай іноді обирати себе.',
  'Бажаю тобі якомога більше моментів, коли думаєш: «Боже, як же добре жити!»',
  'Дякую за всі моменти, які вже стали частиною моєї історії.',
  'Ти набагато прекрасніша, ніж сама про себе думаєш.',
  'Нехай кожен новий рік приносить тобі щось особливе.',
  "У тебе обов'язково все вийде, а якщо не дуже, я завжди буду поруч.",
  'Я хочу, щоб ти завжди відчувала себе такою ж важливою, якою ти є для мене.',
  'Навіть якщо ми не бачимося щодня, ти все одно залишаєшся мені близькою.',
  'Бажаю тобі безліч приводів пишатися собою.',
  'Дякую, що ти саме така, якою ти є.',
  'Нехай у твоєму житті завжди буде купа маленьких і величезних радощів.',
  'Ти заслуговуєш на людей, які бачитимуть у тобі все те прекрасне, що бачу я.'
];

const starColors = ['#f79bbe', '#ffe5a2', '#fff5dc', '#edc3de'];
const seenStars = new Set(); 
let activeStar = null;

const starSticker = `<svg viewBox="0 0 100 105" aria-hidden="true" focusable="false">
  <path class="sticker-shadow" d="M50 5 C59 5 64 26 69 29 C75 33 98 28 99 40 C100 51 82 61 80 69 C78 77 86 99 75 103 C65 107 55 92 50 91 C44 91 26 107 17 101 C8 95 21 76 20 69 C19 61 0 51 1 40 C2 28 25 33 31 29 C36 25 41 5 50 5Z"/>
  <path class="sticker-main" d="M50 3 C59 3 64 25 69 28 C75 32 98 27 98 39 C99 50 81 60 79 68 C77 76 86 97 75 101 C65 105 55 89 50 90 C44 90 26 105 17 99 C8 93 21 75 19 68 C18 60 0 50 2 39 C3 27 25 32 31 28 C36 24 41 3 50 3Z"/>
  <path class="sticker-shine" d="M46 16 C38 35 34 39 16 41 M15 46 C19 49 24 54 29 55"/>
  <ellipse class="sticker-spark" cx="50" cy="22" rx="7" ry="11" transform="rotate(-20 50 22)" />
</svg>`;

function closeStar() {
  if (!activeStar) return;
  activeStar.classList.remove('is-open');
  activeStar.setAttribute('aria-expanded', 'false');
  activeStar.setAttribute('aria-label', `Зірочка ${Number(activeStar.dataset.number)}: відкрити повідомлення`);
  activeStar.style.removeProperty('--move-x');
  activeStar.style.removeProperty('--move-y');
  activeStar = null;
}

function toggleStar(button, index) {
  
  if (activeStar === button) {
    closeStar();
    return;
  }
  closeStar();

  const rect = button.parentElement.getBoundingClientRect();
  const starCenterX = rect.left + rect.width / 2;
  const starCenterY = rect.top + rect.height / 2;
  button.style.setProperty('--move-x', `${window.innerWidth / 2 - starCenterX}px`);
  button.style.setProperty('--move-y', `${window.innerHeight / 2 - starCenterY}px`);
  button.classList.add('is-open');
  button.setAttribute('aria-expanded', 'true');
  button.setAttribute('aria-label', `Зірочка ${index + 1}: закрити повідомлення`);
  activeStar = button;
  if (!seenStars.has(index)) {
    seenStars.add(index);
    $('starCounter').textContent = `Відкрито зірочок: ${seenStars.size}/32 ♡`;
  }
}

starMessages.forEach((message, index) => {
  const cell = document.createElement('div');
  cell.className = 'star-cell';
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'wish-star';
  if (message.length >= 95) button.classList.add('wish-long');
  if (message.length >= 62) button.classList.add('wish-medium');
  button.setAttribute('aria-label', `Зірочка ${index + 1}: відкрити повідомлення`);
  button.setAttribute('aria-expanded', 'false');
  button.style.setProperty('--sticker-color', starColors[index % starColors.length]);
  button.style.setProperty('--angle', `${((index * 19) % 37) - 18}deg`);
  button.style.setProperty('--sticker-scale', `${0.87 + ((index * 7) % 5) * 0.09}`);
  button.style.setProperty('--jitter-x', `${((index * 17 + Math.floor(index / 8) * 7) % 45) - 22}px`);
  button.style.setProperty('--jitter-y', `${((index * 11 + Math.floor(index / 8) * 19) % 55) - 27}px`);
  button.innerHTML = `
    <span class="wish-front">${starSticker}</span>
    <span class="wish-back"><span class="wish-text"></span></span>
  `;
  button.querySelector('.wish-text').textContent = message;
  button.addEventListener('click', () => toggleStar(button, index));
  cell.appendChild(button);
  $('starsField').appendChild(cell);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeStar();
});
