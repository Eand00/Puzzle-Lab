/**
 * @file index.js
 * @description Scripts for the index page.
 * @version 1.0.0
 * 
 * This script handles the client-side logic for the index page
 * 
 * @author Puzzle Lab
 * @author Bonura Vincenzo
 * @author Lupano Alberto
 * @author Picciotto Luca
 * @date 2024-11-29
 * 
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