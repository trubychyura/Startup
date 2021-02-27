import 'normalize.css';
import './style.css';

// scroll

const scrollItems = document.querySelectorAll(
  '.menu__link, .burger-menu__link, [data-href]',
);

scrollItems.forEach((elem) => elem.addEventListener('click', itemScrollClick));

function itemScrollClick({ currentTarget }) {
  const targetId =
    currentTarget.getAttribute('href') ||
    currentTarget.getAttribute('data-href');

  const distanceToTarget = document
    .querySelector(targetId)
    .getBoundingClientRect().top;
  const windowPos = window.pageYOffset;
  const TargetPos = distanceToTarget + windowPos;
  const duration = 1000;
  let start = null;
  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;

    let timeProgress = timestamp - start;
    let currentPos = distanceToTarget * (timeProgress / duration) + windowPos;

    if (TargetPos > 0 && currentPos > TargetPos) {
      currentPos = distanceToTarget + windowPos;
    }

    window.scrollTo(0, currentPos);

    if (timeProgress <= duration) window.requestAnimationFrame(step);
  }
}

//arrow-up show/hide

window.addEventListener('scroll', toggleArrowUp);

function toggleArrowUp() {
  const target = document.querySelector('.arrow-up');
  const visibilityHeight = window.screen.height;

  if (window.pageYOffset >= visibilityHeight) {
    target.className = 'arrow-up';
  } else {
    target.className = 'arrow-up arrow-up_hidden';
  }
}

// carusel
const leftBtn = document.querySelector('.arrow_left');
const rightBtn = document.querySelector('.arrow_right');

leftBtn.addEventListener('click', () => slide(-1));
rightBtn.addEventListener('click', () => slide(1));

const carusel = document.querySelector('.carusel');
const caruselSlide = document.querySelector('.carusel__slide');
const items = document.querySelectorAll('.carusel__item');

const viewportWidth = carusel.offsetWidth;
const slideWidth = caruselSlide.scrollWidth;
let counter = 0;
let slidedTo = 0;

checkDisableBtn();

function slide(addition) {
  const itemWidth = items[counter + 1].offsetLeft - items[counter].offsetLeft;

  counter += addition;
  slidedTo += itemWidth;

  caruselSlide.style.transform = `translateX(${-slidedTo}px)`;

  checkDisableBtn();
}

function checkDisableBtn() {
  leftBtn.classList.remove('arrow_disabled');
  rightBtn.classList.remove('arrow_disabled');

  if (counter === 0) {
    leftBtn.classList.add('arrow_disabled');
  } else if (viewportWidth + slidedTo === slideWidth) {
    rightBtn.classList.add('arrow_disabled');
  }
}

//auto carusel
const slides = document.querySelectorAll('.slider__item');
const controlDots = document.querySelectorAll('.control__dot');

let controlCounter = 0;

controlDots[controlCounter].classList.add('control__dot_active');
slides[controlCounter].classList.add('slider__item_active');

controlDots.forEach((dot, index) => {
  dot.addEventListener('click', () => clickControlDot(index));
});

function changeSlide() {
  slides.forEach((slide) => slide.classList.remove('slider__item_active'));

  slides[controlCounter].classList.add('slider__item_active');
}

function changeFocusDot() {
  controlDots.forEach((dot) => dot.classList.remove('control__dot_active'));

  controlDots[controlCounter].classList.add('control__dot_active');
}

function clickControlDot(index) {
  resetTimer();
  controlCounter = index;
  changeFocusDot();
  changeSlide();
}

function autoPlay() {
  controlCounter++;
  if (controlCounter > controlDots.length - 1) {
    controlCounter = 0;
  }
  changeSlide();
  changeFocusDot();
}

let timer = setInterval(autoPlay, 5000);

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(autoPlay, 5000);
}

//filter

const buttons = document.querySelectorAll('.filter__item');
const portfolioItems = document.querySelectorAll('.portfolio__item');

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    for (let j = 0; j < buttons.length; j++) {
      buttons[j].classList.remove('filter__item_active');
    }

    this.classList.add('filter__item_active');

    const target = this.getAttribute('data-target');

    portfolioItems.forEach((item) =>
      item.classList.remove('portfolio__item_disabled'),
    );

    if (target === 'all') return;

    for (let g = 0; g < portfolioItems.length; g++) {
      if (target !== portfolioItems[g].getAttribute('data-id')) {
        portfolioItems[g].classList.add('portfolio__item_disabled');
      }
    }
  });
}

// burger-menu

const toggler = document.querySelector('#burger-toggler');
const menu = document.querySelector('#burger-menu');
const body = document.body;
const menuLinks = document.querySelectorAll('.burger-menu__link');

menuLinks.forEach((link) => link.addEventListener('click', burgerListener));

toggler.addEventListener('click', burgerListener);

function burgerListener() {
  toggleClass(toggler, 'burger-toggler_active');
  toggleClass(menu, 'burger-menu_active');
  toggleClass(body, 'lock-scroll');
}

function toggleClass(target, className) {
  if (target.classList.value.includes(className)) {
    target.classList.remove(className);
  } else {
    target.classList.add(className);
  }
}
