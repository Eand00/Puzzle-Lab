/**
 * @file index.js
 * @version 1.0.0
 * @author Puzzle Lab
 * @contributors Bonura Vincenzo, Lupano Alberto, Picciotto Luca
 * @date 2024-11-29
 * @description This script handles the client-side logic for the index page
 * @see README_FRONTEND.md for additional information.
 */

/**
 * @constant containerScroll
 * @type {HTMLElement}
 * @description The container element for the testimonial carousel.
 */
const containerScroll = document.getElementById("testimonial-container");
/**
 * @variable scrollIndex
 * @type {HTMLElement}
 * @description The index of setTimeout of scroll function.
 */
let scrollIndex;
/**
 * @variable carouselIndex
 * @type {HTMLElement}
 * @description The index of setTimeout of carousel function.
 */
let carouselIndex;

/**
 * @function scroll
 * @description Adds the scroll class to the testimonial-container element.
 */
function scroll() {
    containerScroll.classList.add("scroll");
}

/**
 * @function carousel
 * @description Scrolls the carousel to the next card.
 */
function carousel() {
    const firstElement = document.getElementsByClassName("card")[0];
    containerScroll.classList.remove("scroll");
    firstElement.remove();
    containerScroll.appendChild(firstElement);
    scrollIndex = setTimeout(scroll, 4700);
}

/**
 * @function handleMediaQueries
 * @description Adjusts the carousel behavior based on media query changes.
 */
function handleMediaQueries() {
    const mediaQuery = window.matchMedia("(max-width: 1440px)");

    if (mediaQuery.matches) {
        carousel();
    }
    else {
        containerScroll.classList.remove("scroll");
        clearTimeout(scrollIndex);
    }
}

setInterval(handleMediaQueries, 5000);

