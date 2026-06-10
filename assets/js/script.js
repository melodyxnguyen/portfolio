'use strict';



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR TOGGLE FOR MOBILE
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER
 * active header when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});



/**
 * SCROLL REVEAL
 */

const revealElements = document.querySelectorAll("[data-reveal]");
const revealDelayElements = document.querySelectorAll("[data-reveal-delay]");

const reveal = function () {
  for (let i = 0, len = revealElements.length; i < len; i++) {
    if (revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.2) {
      revealElements[i].classList.add("revealed");
    }
  }
}

for (let i = 0, len = revealDelayElements.length; i < len; i++) {
  revealDelayElements[i].style.transitionDelay = revealDelayElements[i].dataset.revealDelay;
}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);


let currentSlide = 0;

function showSlide(index) {
  const slides = document.querySelectorAll('.carousel-slide');
  const track = document.querySelector('.carousel-track');
  const caption = document.getElementById('carousel-caption');
  const totalSlides = slides.length;

  if (totalSlides === 0) return; // nothing to show

  // Wrap around if index goes out of bounds
  currentSlide = (index + totalSlides) % totalSlides;

  // Move the track to show the current slide
  if (track) {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  // Update caption text based on the current slide's alt text (if present)
  if (caption) {
    caption.textContent = slides[currentSlide] && slides[currentSlide].alt ? slides[currentSlide].alt : '';
  }

  if (autoplayEnabled) {
    scheduleAutoplay();
  }
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

// Carousel autoplay: advances slides automatically and pauses on hover
let autoplayTimer = null;
let autoplayEnabled = false;
const FIRST_AUTOPLAY_DELAY = 8000; // milliseconds for first slide
const AUTOPLAY_DELAY = 6000; // milliseconds for remaining slides

function scheduleAutoplay() {
  if (!autoplayEnabled) return;
  stopAutoplay();
  const delay = currentSlide === 0 ? FIRST_AUTOPLAY_DELAY : AUTOPLAY_DELAY;
  autoplayTimer = setTimeout(() => {
    nextSlide();
  }, delay);
}

function startAutoplay() {
  autoplayEnabled = true;
  scheduleAutoplay();
}

function stopAutoplay() {
  autoplayEnabled = false;
  if (autoplayTimer) {
    clearTimeout(autoplayTimer);
    autoplayTimer = null;
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const cards = document.querySelectorAll(".experience-card");

  const revealCards = () => {
    cards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      const isVisible = cardTop < window.innerHeight - 50;
      
      if (isVisible) {
        card.classList.add("reveal");
      }
    });
  };

  window.addEventListener("scroll", revealCards);
  revealCards(); // Initial call to reveal cards in view on load
  // Initialize carousel state and autoplay if carousel exists
  const slides = document.querySelectorAll('.carousel-slide');
  const carousel = document.querySelector('.carousel');
  if (slides.length && carousel) {
    showSlide(0);
    startAutoplay();

    // Pause autoplay on hover/focus for accessibility
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('focusout', startAutoplay);
  }
});




