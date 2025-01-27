/**
 * @file toast-component.js
 * @version 1.0.0
 * @author Puzzle Lab
 * @contributors Bonura Vincenzo
 * @date 2025-01-15
 * @update 2025-01-25
 * @description Componente toast per il backoffice.
 * @extends HTMLElement
 */

/**
 * Tipi di toast supportati
 * @typedef {'success' | 'error' | 'warning' | 'info'} ToastType
 */

/**
 * Componente Toast per notifiche all'utente
 * @customElement toast-component
 * @extends HTMLElement
 */
class ToastComponent extends HTMLElement {
    constructor() {
        super();
        this.toasts = [];
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `<div class="toast-container"></div>`;
    }

    /**
     * Mostra un toast
     * @param {ToastType} type - Tipo di toast (info, success, warning, error)
     * @param {string} title - Titolo del toast
     * @param {string} message - Messaggio del toast
     * @param {number} [duration=5000] - Durata in millisecondi
     */
    showToast(type, title, message, duration = 5000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        toast.innerHTML = `
            <div class="toast-icon">
                ${this.getIcon(type)}
            </div>
            <div class="toast-content">
                <h4 class="toast-title">${title}</h4>
                <p class="toast-message">${message}</p>
            </div>
            <button class="toast-close" aria-label="Close">×</button>
        `;

        const container = this.querySelector('.toast-container');
        container.appendChild(toast);

        // event listener per il pulsante di chiusura
        toast.querySelector('.toast-close')
            ?.addEventListener('click', () => this.removeToast(toast));

        // Rimuovi automaticamente dopo duration
        setTimeout(() => {
            this.removeToast(toast);
        }, duration);
    }

    /**
     * Rimuove un toast con animazione
     * @param {HTMLElement} toast - Toast element da rimuovere
     */
    removeToast(toast) {
        toast.classList.add('removing');
        toast.addEventListener('animationend', () => {
            toast.remove();
        });
    }

    /**
     * Recupera l'icona SVG in base al tipo di toast
     * @param {string} type - Tipo di toast
     * @returns {string} Markup SVG
     */
    getIcon(type) {
        const icons = {
            info: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`,
            success: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`,
            warning: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`,
            error: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`
        };
        return icons[type] || icons.info;
    }
}

customElements.define('toast-component', ToastComponent);
