/**
 * @file main.js
 * @version 1.0.0
 * @author Puzzle Lab
 * @contributors Bonura Vincenzo, Lupano Alberto, Picciotto Luca
 * @date 2024-11-25
 * @description This script handles the client-side logic for the site, including form submissions and interactions with the API.
 * @see README_FRONTEND.md for additional information.
 */

/**
 * @function showCookieBanner
 * @description Shows a cookie banner
 */
function showCookieBanner() {
    const cookieBanner = document.createElement('div');
    cookieBanner.classList.add('infoBanner');
    cookieBanner.innerHTML = `
        <div class="infoBanner-content text-white">
            <span>Questo sito utilizza cookie per migliorare l'esperienza di navigazione. Accetta i cookie per continuare.</span>
        </div>
        <div class="btn-container">
            <button class="infoBanner-accept bg-primary" onclick="acceptCookies()">Accetta</button>
            <button class="infoBanner-reject" onclick="rejectCookies()">Rifiuta</button>
        </div>
    `;
    document.body.appendChild(cookieBanner);
}

/**
 * @function acceptCookies
 * @description Stores a token in localStorage to indicate that cookies have been accepted
 */
function acceptCookies() { 
    localStorage.setItem('acceptedCookies', 'true');
    closeCookieBanner();
}

/**
 * @function rejectCookies
 * @description Removes the cookie banner from the DOM
 */
function rejectCookies() {
    document.body.removeChild(document.querySelector('.infoBanner'));
}

/**
 * @function closeCookieBanner
 * @description Closes the cookie banner
 */
function closeCookieBanner() {
    let cookieBanner = document.querySelector('.infoBanner');
    cookieBanner.classList.add('closing');
    setTimeout(() => {
        cookieBanner.remove();
    }, 500);
}

//initialize the cookie banner
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded');
    if (!localStorage.getItem('acceptedCookies')) {
        console.log('Cookie banner not accepted');
        showCookieBanner();
    }
});