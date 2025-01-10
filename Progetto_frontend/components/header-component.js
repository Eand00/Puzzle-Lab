/**
 * @file header-components.js
 * @version 1.0.0
 * @author Puzzle Lab
 * @contributors Bonura Vincenzo, Lupano Alberto, Picciotto Luca
 * @date 2024-12-14
 * @description This script handles the header component of the site.
 * @extends HTMLElement
 * @see README_FRONTEND.md for additional information.
 */

class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        const basePath = this.getAttribute('base-path') || '.';

        this.template = document.createElement('template');
        this.template.innerHTML = `
            <header class="bg-white fixed-top">
                <nav class="navbar">
                    <a class="navbar-brand" href="${basePath}/index.html">
                        <div class="row1">CACCIA</div>
                        <div class="row2">SAPERI</div>
                    </a>
                    <button class="navbar-toggle" id="navbarBtn" type="button" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse bg-dark text-gray" id="navbarText">
                        <svg class="logo-brand">
                            <use href="${basePath}/assets/images/sprite.svg?v=2#logo-brand"></use>
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
     * This method is called when the component is connected to the DOM.
     * It is used to initialize the component.
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
     * Sets the active page in the navigation
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
     * Sets up all event listeners for the component
     */
    setupEventListeners() {
        this.setupNavbarToggle();
        this.setupScrollHandler();
    }

    /**
     * Sets up the navbar toggle functionality
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
     * Sets up the scroll handler for header styling
     */
    setupScrollHandler() {
        const header = this.querySelector('header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            header.classList.toggle('header-scroll', window.scrollY > 0);
        });
    }
}

customElements.define("header-component", HeaderComponent);