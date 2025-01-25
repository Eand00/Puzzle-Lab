/**
 * @file header-components.js
 * @version 1.0.0
 * @author Puzzle Lab
 * @contributors Bonura Vincenzo, Eand Avdiu
 * @date 2025-01-07
 * @update 2025-01-25
 * @description Header component with navigation and authentication features
 * @extends HTMLElement
 * @see README.md per ulteriori informazioni
 */

import { logout } from '../services/auth.service.js';
import { showToast } from '../utils/toast.util.js';

/**
 * Componente header con navigazione e titolo della pagina
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
        this.setupEventListeners();
    }

    /**
     * Controlla se il link corrisponde alla pagina corrente
     * @param {string} href - Il percorso del link
     * @returns {boolean}
     * @private
     */
    isCurrentPage(href) {
        const currentPath = window.location.pathname;
        const linkPath = href.split('/').pop();
        return currentPath.endsWith(linkPath);
    }

    /**
     * Gestione del logout
     * @private
     */
    handleLogout() {
        const success =logout();
        if (success) {
            window.location.href = './login.html';
        } else {
            showToast('error', 'Errore', 'Logout fallito');
        }
    }

    render() {
        const pageTitle = this.getAttribute('page-title') || 'Dashboard';

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
    }

    setupEventListeners() {
        this.querySelector('#logoutBtn').addEventListener('click', () => {
            this.handleLogout();
        });
    }
}

customElements.define('header-component', HeaderComponent);
