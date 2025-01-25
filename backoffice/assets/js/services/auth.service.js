/**
 * @file auth.service.js
 * @version 1.0.0
 * @author Puzzle Lab
 * @contributors Bonura Vincenzo, Eand Avdiu
 * @date 2025-01-15
 * @update 2025-01-25
 * @description Service per la gestione dell'autenticazione
 * @see README.md per ulteriori informazioni
 */

import { apiClient } from '../utils/api-client.js';
import { API_BASE_URL } from '../config/config.js';

const TOKEN_KEY = 'jwtToken';

/**
 * Ottiene il token di autenticazione dallo storage locale
 * @function getAuthToken
 * @returns {string} - Il token di autenticazione
 */
export function getAuthToken() {
    return localStorage.getItem(TOKEN_KEY);
}

/**
 * Memorizza il token di autenticazione nello storage locale
 * @function setAuthToken
 * @param {string} token - Il token di autenticazione
 * @private
 */
function setAuthToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

/**
 * Cancella il token di autenticazione dal storage locale
 * @function clearAuthToken
 * @returns {boolean} - True se il token è stato cancellato con successo, false altrimenti
 * @private
 */
function clearAuthToken() {
    try {
        localStorage.removeItem(TOKEN_KEY);
        return getAuthToken() === null;
    } catch (error) {
        return false;
    }
}

/**
 * Controlla se l'utente è loggato
 * @function isAuthenticated
 * @returns {boolean} - True se l'utente è loggato, false altrimenti
 */
export function isAuthenticated() {
    return getAuthToken() !== null;
}

/**
 * Effettua il login dell'utente
 * @function login
 * @param {string} username - Il nome utente
 * @param {string} password - La password
 * @returns {Promise<boolean>} - True se il login è stato effettuato con successo, altrimenti lancia un'eccezione
 * @throws {Error} - Errore con messaggio di feedback
 */
export async function login(username, password) {
    const url = `${API_BASE_URL}/login`;

    try {
        const response = await apiClient(url, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(`${username}:${password}`),
                'Content-Type': 'application/json'
            },
        });

        if (response.token) {
            setAuthToken(response.token);
            return true;
        }
        throw new Error('Credenziali non valide');
        
    } catch (error) {
        throw new Error(error.message || 'Errore durante il login');
    }
}

/**
 * Effettua il logout dell'utente
 * @function logout
 * @returns {boolean} - True se il logout è stato effettuato con successo, false altrimenti
 */
export function logout() {
    return clearAuthToken();
}