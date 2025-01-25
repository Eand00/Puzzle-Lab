/**
 * @file index.js
 * @version 1.0.0
 * @author Puzzle Lab
 * @contributors Bonura Vincenzo, Lupano Alberto, Picciotto Luca
 * @date 2024-11-29
 * @update 2025-01-25
 * @description Questo script gestisce la logica client-side per la pagina index
 * @see README_FRONTEND.md per ulteriori informazioni.
 */

/**
 * @constant containerScroll
 * @type {HTMLElement}
 * @description L'elemento container per il carousel delle testimonianze.
 */
const containerScroll = document.getElementById("testimonial-container");
/**
 * @variable scrollIndex
 * @type {HTMLElement}
 * @description L'indice di setTimeout della funzione scroll.
 */
let scrollIndex;
/**
 * @variable carouselIndex
 * @type {HTMLElement}
 * @description L'indice di setTimeout della funzione carousel.
 */
let carouselIndex;

/**
 * @function scroll
 * @description Aggiunge la classe scroll all'elemento testimonial-container.
 */
function scroll() {
    containerScroll.classList.add("scroll");
}

/**
 * @function carousel
 * @description Scorre il carousel alla prossima card.
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
 * @description Regola il comportamento del carousel in base alle modifiche delle media query.
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

//attende il caricamento del DOM per invocare la funzione di inizializzazione
document.addEventListener('DOMContentLoaded', handleMediaQueries);