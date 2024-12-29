/**
 * @file lab-card-component.js
 * @version 1.0.0
 * @author Puzzle Lab
 * @contributors Bonura Vincenzo, Lupano Alberto, Picciotto Luca
 * @date 2024-12-29
 * @description A custom element that renders iterated lab-card-component elements
 * @extends HTMLElement
 * @property {string} data-labs - The data of the laboratories
 * @see README_FRONTEND.md for additional information.
 */

class LabGridCOmponent extends HTMLElement {
    constructor() {
        super();
    }

    /**
     * @method connectedCallback
     * @description This method is called when the component is connected to the DOM
     */
    connectedCallback() {
        let labs = [];
        labs = JSON.parse(this.getAttribute('data-labs') || '[]');

        //prepare the fragment of code to be inserted in the DOM
        const fragment = document.createDocumentFragment();
        const grid = document.createElement('div');
        grid.classList.add('laboratories-grid');

        //insert the labs in the grid
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

customElements.define('lab-grid-component', LabGridCOmponent);