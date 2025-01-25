/**
 * @file main.js
 * @version 1.0.0
 * @author Puzzle Lab
 * @contributors Bonura Vincenzo, Lupano Alberto, Picciotto Luca
 * @date 2024-11-25
 * @update 2025-01-25
 * @description Questo script gestisce la logica client-side per il sito, inclusa la gestione dei form e le interazioni con l'API.
 * @see README_FRONTEND.md per ulteriori informazioni.
 */

/**
 * @function showCookieBanner
 * @description Mostra un banner per i cookie
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
 * @description Memorizza un token in localStorage per indicare che i cookie sono stati accettati
 */
function acceptCookies() { 
    localStorage.setItem('acceptedCookies', 'true');
    closeCookieBanner();
}

/**
 * @function rejectCookies
 * @description Rimuove il banner per i cookie dal DOM
 */
function rejectCookies() {
    document.body.removeChild(document.querySelector('.infoBanner'));
}

/**
 * @function closeCookieBanner
 * @description Chiude il banner per i cookie
 */
function closeCookieBanner() {
    let cookieBanner = document.querySelector('.infoBanner');
    cookieBanner.classList.add('closing');
    setTimeout(() => {
        cookieBanner.remove();
    }, 500);
}

//inizializza il banner per i cookie
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded');
    if (!localStorage.getItem('acceptedCookies')) {
        console.log('Cookie banner not accepted');
        showCookieBanner();
    }
});