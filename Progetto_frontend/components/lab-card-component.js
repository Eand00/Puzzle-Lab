/**
 * @file lab-card-component.js
 * @version 1.0.0
 * @author Puzzle Lab
 * @contributors Bonura Vincenzo, Lupano Alberto, Picciotto Luca
 * @date 2024-12-27
 * @description Un componente custom che visualizza una card di un laboratorio
 * @extends HTMLElement
 * @property {string} title - Il titolo del laboratorio
 * @property {string} image - L'immagine del laboratorio
 * @property {string} href - Il link al laboratorio
 * @see README_FRONTEND.md per ulteriori informazioni.
 */

class LabCardComponent extends HTMLElement {
    constructor() {
        super();
    }

    /**
     * @method connectedCallback
     * @description Questo metodo viene invocato quando il componente è collegato al DOM
     */
    connectedCallback() {
        const title = this.getAttribute('title') || 'Laboratorio';
        const image = this.getAttribute('image') || './assets/images/img_placeholder.svg';
        const href  = this.getAttribute('href')  || '#';

        this.innerHTML = `
            <a href="${href}" class="lab-card">
                <div class="lab-card__image border-radius-small" style="--image: url(${image})">
                    <div class="opacity-div border-radius-small"></div>
                    <div class="lab-card__title text-white">${title}</div>
                </div>
            </a>`;
    }
}

/**
 * Definisce il componente lab-card-component come custom element.
 */
customElements.define("lab-card-component", LabCardComponent);