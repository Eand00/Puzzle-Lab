/**
 * @file lab-card-component.js
 * @version 1.0.0
 * @author Puzzle Lab
 * @contributors Bonura Vincenzo, Lupano Alberto, Picciotto Luca
 * @date 2024-12-27
 * @description A custom element that displays a laboratory card
 * @extends HTMLElement
 * @property {string} title - The title of the laboratory
 * @property {string} image - The image of the laboratory
 * @property {string} href - The link to the laboratory
 * @see README_FRONTEND.md for additional information.
 */

class LabCardComponent extends HTMLElement {
    constructor() {
        super();
    }

    /**
     * @method connectedCallback
     * @description This method is called when the component is connected to the DOM
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

customElements.define("lab-card-component", LabCardComponent);