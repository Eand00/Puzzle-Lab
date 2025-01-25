/**
 * @file header-components.js
 * @version 1.0.0
 * @author Puzzle Lab
 * @contributors Bonura Vincenzo, Lupano Alberto, Picciotto Luca
 * @date 2024-12-14
 * @description Questo script gestisce il componente header del sito.
 * @extends HTMLElement
 * @see README_FRONTEND.md per ulteriori informazioni.
 */

class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        const basePath = this.getAttribute('base-path') || '.';

        this.template = document.createElement('template');
        this.template.innerHTML = `
            <header class="bg-dark fixed-top">
                <nav class="navbar">
                    <a class="navbar-brand" href="${basePath}/index.html">
                        <div class="row1 text-white">CACCIA</div>
                        <div class="row2 text-white">SAPERI</div>
                    </a>
                    <button class="navbar-toggle" id="navbarBtn" type="button" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse bg-dark text-gray" id="navbarText">
                        <svg class="logo-brand">
                            <use href="${basePath}/assets/images/sprite.svg#logo-brand"></use>
                        </svg>
                        <ul class="navbar-nav">
                            <li class="nav-item text-gray">
                                <a class="nav-link" href="${basePath}/index.html">HOME</a>
                            </li>
                            <li class="nav-item text-gray">
                                <a class="nav-link" href="${basePath}/laboratori.html">LABORATORI</a>
                            </li>
                            <li class="nav-item text-gray">
                                <a class="nav-link" href="${basePath}/chi-siamo.html">CHI SIAMO</a>
                            </li>
                            <li class="nav-item text-gray">
                                <a class="nav-link" href="${basePath}/prenota-ora.html">PRENOTA ORA!</a>
                            </li>
                            <li class="nav-item text-gray">
                                <a class="nav-link" href="${basePath}/contatti.html">CONTATTI</a>
                            </li>
                        </ul>
                        <div class="social-icons">
                            <p class="text-gray">SEGUICI SUI SOCIAL</p>
                            <div class="social-icons-container text-white">
                                <a href="#">
                                    <svg width="32" height="32" fill="currentColor">
                                        <use href="${basePath}/assets/images/sprite.svg?v=1#icon-facebook"></use>
                                    </svg>
                                </a>
                                <a href="#">
                                    <svg width="32" height="32" fill="currentColor">
                                        <use href="${basePath}/assets/images/sprite.svg?v=1#icon-instagram"></use>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        `;
    }

    /**
     * Questo metodo viene invocato quando il componente è collegato al DOM.
     * Viene utilizzato per inizializzare il componente.
     */
    connectedCallback() {
        // Clone the template content and append it to the DOM
        const content = this.template.content.cloneNode(true);
        this.appendChild(content);

        // Set active page
        this.setActivePage();

        // Setup event listeners
        this.setupEventListeners();
    }

    /**
     * Imposta la pagina attiva nella navigazione
     */
    setActivePage() {
        const activePage = this.getAttribute('active-page');
        if (!activePage) return;

        const navLinks = this.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link.href.includes(activePage)) {
                link.parentElement.classList.add('active');
            }
        });
    }

    /**
     * Imposta tutti gli event listeners per il componente
     */
    setupEventListeners() {
        this.setupNavbarToggle();
        this.setupScrollHandler();
    }

    /**
     * Imposta la funzionalità del navbar toggle
     */
    setupNavbarToggle() {
        const navbarToggle = this.querySelector('#navbarBtn');
        const navbarCollapse = this.querySelector('#navbarText');

        if (!navbarToggle || !navbarCollapse) return;

        const toggleNavbar = () => {
            navbarCollapse.classList.toggle('show');
            navbarToggle.classList.toggle('show');
        };

        navbarToggle.addEventListener('click', toggleNavbar);
        navbarCollapse.addEventListener('click', toggleNavbar);
    }

    /**
     * Gestisce lo stile del header in base alla scroll
     */
    setupScrollHandler() {
        const header = this.querySelector('header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            header.classList.toggle('header-scroll', window.scrollY > 0);
        });
    }
}


/**
 * Definisce il componente header-component come custom element.
 */
customElements.define("header-component", HeaderComponent);