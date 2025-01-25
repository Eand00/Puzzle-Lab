/**
 * @file lab-grid-component.js
 * @version 1.0.0
 * @author Puzzle Lab
 * @contributors Bonura Vincenzo, Lupano Alberto, Picciotto Luca
 * @date 2024-12-29
 * @description Un componente custom che visualizza una griglia di card di laboratori
 * @extends HTMLElement
 * @property {string} data-labs - I dati dei laboratori
 * @see README_FRONTEND.md per ulteriori informazioni.
 */

class LabGridCOmponent extends HTMLElement {
    constructor() {
        super();
    }

    /**
     * @method connectedCallback
     * @description Questo metodo viene invocato quando il componente è collegato al DOM
     */
    connectedCallback() {
        let labs = [];
        labs = JSON.parse(this.getAttribute('data-labs') || '[]');

        //prepara il frammento di codice da inserire nel DOM
        const fragment = document.createDocumentFragment();
        const grid = document.createElement('div');
        grid.classList.add('laboratories-grid');

        //inserisce i laboratori nella griglia
        for (let lab of labs) {
            const card = document.createElement('lab-card-component');
            card.setAttribute('title', lab.title);
            card.setAttribute('image', lab.image);
            card.setAttribute('href', lab.href);
            grid.appendChild(card);
        }

        fragment.appendChild(grid);
        this.appendChild(fragment);
    }
}

/**
 * Definisce il componente lab-grid-component come custom element.
 */
customElements.define('lab-grid-component', LabGridCOmponent);