/**
 * @file toast.util.js
 * @version 1.0.0
 * @author Puzzle Lab
 * @contributors Bonura Vincenzo
 * @date 2025-01-25
 * @description Utility per l'accesso centralizzato al componente toast
 * @see README.md per ulteriori informazioni
 */

/**
 * Tipi di toast supportati
 * @typedef {'success' | 'error' | 'warning' | 'info'} ToastType
 */

/**
 * Ottiene l'istanza del toast component
 * @function getToast
 * @returns {HTMLElement|null} Il componente toast o null se non trovato
 * @private
 */
const getToast = () => document.querySelector('toast-component');

/**
 * Mostra un messaggio toast
 * @function showToast
 * @param {ToastType} type - Tipo di toast
 * @param {string} title - Titolo del messaggio
 * @param {string} message - Testo del messaggio
 */
export const showToast = (type, title, message) => {
    const toast = getToast();
    if (toast) {
        toast.showToast(type, title, message);
    } else {
        console.warn('Toast component not found in the DOM');
    }
};