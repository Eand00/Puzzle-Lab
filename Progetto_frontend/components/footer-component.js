/**
 * @file footer-components.js
 * @version 1.0.0
 * @author Puzzle Lab
 * @contributors Bonura Vincenzo, Lupano Alberto, Picciotto Luca
 * @date 2024-12-14
 * @description This script handles the footer component of the site.
 * @extends HTMLElement
 * @see README_FRONTEND.md for additional information.
 */

class FooterComponent extends HTMLElement {
    constructor() {
        super();
        this.template = document.createElement('template');
        this.template.innerHTML = `
            <footer class="py-5 text-light bg-black">
                <div class="container">
                    <div class="logo-footer">
                        <span class="row1">CACCIA</span>
                        <span class="row2">SAPERI</span>
                    </div>
                    <p class="copyright text-center">&copy; 2024 Puzzle Lab Torino</p>
                </div>

                <ul class="footer-nav py-5 px-0">
                    <li><a href="#" class="text-light">PAGINA 1</a></li>
                    <li><a href="#" class="text-light">PAGINA 2</a></li>
                    <li><a href="#" class="text-light">PAGINA 3</a></li>
                </ul>
            </footer>
        `;
    }

    /**
     * This method is called when the component is connected to the DOM.
     * It is used to initialize the component.
     */
    connectedCallback() {
        const content = this.template.content.cloneNode(true);
        this.appendChild(content);
    }
}

customElements.define("footer-component", FooterComponent);
