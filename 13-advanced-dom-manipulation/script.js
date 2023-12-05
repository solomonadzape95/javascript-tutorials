'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (e) {
  e.preventDefault;
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////////////////////////////////////////////////////////
// Smooth Scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', e => {
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // console.log(window.pageXOffset, window.pageYOffset);
  // console.log(
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
  // console.log(e.target.getBoundingClientRect());
  // Scrolling
  // window.scrollTo({
  //   left :s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // }
  // );
  section1.scrollIntoView({ behavior: 'smooth' });
});
////////// Page Navigation /////////////
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
//Event Delegation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // Matching Strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
// Tabbed Component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // Guard Clause
  if (!clicked) return;

  // Deactivating Tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');
  // Activate Content Area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
// Menu Fade Animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
// Passing and "argument" to an Event Handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky Navigation
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });
// Sticky Navigation: Intersection Observer API
// const obsCallback = function (entries,observer) {
//   entries.forEach(entry => console.log(entry)
//   )
// }
// const obsOpts = {
//   root: null,
//   threshold: [0, 0.2],
// }

// const observer = new IntersectionObserver(obsCallback,obsOpts)
// observer.observe(section1)

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect();
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight.height}px`,
});
headerObserver.observe(header);

// Reveal Sections
const allSections = document.querySelectorAll('.section');
const revalSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  secObserver.unobserve(entry.target);
};
const secObserver = new IntersectionObserver(revalSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(section => {
  //section.classList.add('section--hidden');
  secObserver.observe(section);
});

// Lazy Loading Images
const imgTargets = document.querySelectorAll('img[data-src]');
const imgLoader = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.setAttribute('src', entry.target.dataset.src);
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });
  imgObserver.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(imgLoader, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(img => imgObserver.observe(img));

// Slider

const sliderFunc = () => {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const slider = document.querySelector('.slider');
  const dotContainer = document.querySelector('.dots');
  // slider.style.tansform = 'scale(0.5)';
  // slider.style.overflow = 'visible';

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class='dots__dot' data-slide='${i}'></button>`
      );
    });
  };
  let curSlide = 0;

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
      document
        .querySelectorAll('.dots__dot')
        .forEach(dot => dot.classList.remove('dots__dot--active'));
      document
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add('dots__dot--active');
    });
  };

  const nextSlide = () => {
    //Next SLide
    if (curSlide == slides.length - 1) curSlide = 0;
    else curSlide++;
    goToSlide(curSlide);
  };
  const prevSlide = () => {
    //Prev SLide
    if (curSlide == 0) curSlide = slides.length - 1;
    else curSlide--;
    goToSlide(curSlide);
  };
  const init = () => {
    createDots();
    slides.forEach((s, i) => {
      goToSlide(0);
    });
  };
  init();
  // Event Handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
  dotContainer.addEventListener('click', e => {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
    }
  });
  // Keyboard SLiding
  document.addEventListener('keydown', e => {
    e.key === `ArrowLeft` && prevSlide();
    e.key === `ArrowRight` && nextSlide();
  });
};
sliderFunc();

///////////////////////////////////////////////////////////////////////////////////////////
// LECTURES
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Selecting Elements
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// console.log(document.getElementsByTagName('button'));
// getElementsByTagName() and getElementsByClassName() returns a HTML Collecton which is a live collection that changes as the page changes. This does not happen with a NodeList

// Creating and Inserting Element
// .insertAdjacentHTML
// const header = document.querySelector('.header');
// const msg = document.createElement('div');
// msg.classList.add('cookie-message');
// msg.textContent = 'We use cookies for improvede functionality and aanalytics.';
// msg.innerHTML =
//   'We use cookies for improvede functionality and analytics.<button class="btn btn--close-cookie"> Got It </button>';
// These add the elements before or after the main contents
// header.prepend(msg)
// header.append(msg);
// header.append(msg.cloneNode(true))
// these add the elements as siblings to the base
// header.before(msg)
// header.after(msg)
//  Delete Elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', () => msg.remove());

// Styles
// msg.style.backgroundColor = '#37383d';
// msg.style.width = '120%';
// Styles set using DOM in JS are set as inline styles
// console.log(msg.style.width);
// This only works for inline styles you've set yourself
// Otherwise use the getCOmputedStyle method
// console.log(getComputedStyle(msg).color);
// console.log(getComputedStyle(msg).height);
// msg.style.height = parseFloat(getComputedStyle(msg).height, 10) + 30 + 'px';
// Setting CSS custom properties
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);
// This doesn't work for attributes that are non standard to the HTML Element. Use this to do that:
// console.log(logo.getAttribute('designer'));
// Setting Attributes
// logo.setAttribute('company', 'Bankist');
// console.log(logo.getAttribute('company'));
// Incase of a relative url being needed use the getAttribute instead of the .attrNAme form. Since that returns the absolute url

// Data attributes
// These are stored under the dataset of he element and can be accessed as such
//  => msg.dataset.VersionNum for a data attribute with the name data-version-number

// Classes
// classList.add
// classList.remove
// classList.contains
// className should not be used since it overrides all classes set previously

// Events and Event Handlers
// const h1 = document.querySelector('h1');
// const alertH1 = e => {
//   alert('AddEventlistener: You are reading the heading');
//   setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);
// };
// h1.addEventListener('mouseenter', alertH1);
// h1.onmouseenter = e => {
//   alert('Different Mouse Enter Func')
// }

// Event Propagation, Bubbling and Capturing
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   e.stopPropagation()
// });
// document.querySelector('.nav__links').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
// })
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });
// Event listeners take a third boolean arg which determines if the target listens for capturing events or just for bubbling events

// DOM Traversing
// const h1 = document.querySelector('h1');
// console.log(h1.querySelector('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'red';

// // Parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// // Siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// LifeCycle Dom Events : load, beforeunload, DOMLoadedContent
// window.addEventListener('beforeunload', function (e) {
//   console.log(e);
//   e.preventDefault();
//   e.returnValue = 'ghghghghghghghghv';
// });
