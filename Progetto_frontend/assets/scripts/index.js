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

/**
 * XXX DEV: this script must be deleted before the final release
 * include homepage partials
 */
document.addEventListener('DOMContentLoaded', function () {
    const parts = ['hero', 'problema-soluzione', 'perche-noi', 'come-funziona', 'testimonianze', 'faq', 'cta'];
    let counter = 0;

    parts.forEach(part => {
        fetch(`./parts/${part}.html`)
            .then(response => response.text())
            .then(data => {
                // include HTML partial
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                const wrapper = doc.querySelector('#wrapper');
                document.querySelector(`#${part}`).innerHTML = wrapper.innerHTML;

                // include CSS
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = `./parts/${part}.css`;
                document.head.appendChild(link);

                // include JS
                const script = document.createElement('script');
                script.src = `./parts/${part}.js`;
                document.body.appendChild(script);

                counter++;
                if (counter === parts.length) {
                    console.log('All parts have been included.');
                }
            })
            .catch(error => console.error('Error fetching part:', error));
    });
});