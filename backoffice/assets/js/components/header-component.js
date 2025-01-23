import { logout } from '../services/auth.service.js';

/**
 * Header component with navigation and page title
 * @customElement header-component
 */
class HeaderComponent extends HTMLElement {
    constructor() {
        super();
    }

    // Osserva gli attributi che possono cambiare
    static get observedAttributes() {
        return ['page-title'];
    }

    connectedCallback() {
        this.render();
    }

    /**
     * Determina se il link passato corrisponde alla pagina corrente
     * @param {string} href - Il percorso del link
     * @returns {boolean}
     */
    isCurrentPage(href) {
        const currentPath = window.location.pathname;
        const linkPath = href.split('/').pop(); // Prende solo il nome del file
        return currentPath.endsWith(linkPath);
    }

    render() {
        const pageTitle = this.getAttribute('page-title') || 'Dashboard';
        const isLoggedIn = localStorage.getItem('jwtToken') !== null;

        this.innerHTML = `
            <div class="splash"></div>
            <header class="main-header">
                <div class="header-content">
                    <div class="header-title">
                        <img src="./assets/images/asterisco.svg" 
                             alt="Logo Caccia SAPERI" 
                             class="header-logo"
                             width="32" 
                             height="32">
                        <h1 class="page-title">${pageTitle}</h1>
                    </div>
                    
                    <nav class="main-nav">
                        <ul class="nav-links">
                            <li>
                                <a href="./index.html" 
                                   class="nav-link ${this.isCurrentPage('/index.html') ? 'active' : ''}">
                                   Dashboard
                                </a>
                            </li>
                            <li>
                                <a href="./requests.html" 
                                   class="nav-link ${this.isCurrentPage('/requests.html') ? 'active' : ''}">
                                   Richieste
                                </a>
                            </li>
                            <li>
                                <a href="./users.html" 
                                   class="nav-link ${this.isCurrentPage('/users.html') ? 'active' : ''}">
                                   Utenti
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <button type="button" class="logout-btn" id="logoutBtn">
                        Logout
                    </button>
                </div>
            </header>
        `;

        this.setupEventListeners();
    }



    setupEventListeners() {
        this.querySelector('#logoutBtn').addEventListener('click', () => {
            logout();
        });
    }
}

customElements.define('header-component', HeaderComponent);
