/**
 * @file index.js
 * @version 1.0.0
 * @author Puzzle Lab
 * @contributors Bonura Vincenzo, Lupano Alberto, Picciotto Luca
 * @date 2024-11-29
 * @description This script handles the client-side logic for the index page
 * @see README_FRONTEND.md for additional information.
 */

const containerScroll = document.getElementById("testimonial-container");

/**
 * Scroll function
 * @description Adds the scroll class to the testimonial-container element.
 */
function scroll() {
    containerScroll.classList.add("scroll");
}

/**
 * Carousel function
 * @description Scrolls the carousel to the next card.
 */
function carousel() {
    const firstElement = document.getElementsByClassName("card")[0];
    containerScroll.classList.remove("scroll");
    firstElement.remove();
    containerScroll.appendChild(firstElement);
    setTimeout(scroll, 4700);
    setTimeout(carousel, 5000);
}

carousel();