/**
 * @file users.service.js
 * @version 1.0.0
 * @author Puzzle Lab
 * @contributors Daniele Wei Chen, Eand Avdiu, Vincenzo Bonura
 * @date 2025-01-22
 * @update 2025-01-25
 * @description Service per la gestione degli utenti
 * @see README.md per ulteriori informazioni
 */

import { apiClient } from '../utils/api-client.js';
import { API_BACKOFFICE_URL } from '../config/config.js';

/**
 * @function getAllUsers
 * @description Recupera tutti gli utenti
 * @returns {Promise<Array>} Array di utenti
 */
export async function getAllUsers() {
    return apiClient(`${API_BACKOFFICE_URL}/utenti`);
}

/**
 * @function createUser
 * @description Crea un nuovo utente
 * @param {Object} userData - Dati dell'utente da creare
 * @returns {Promise<Object>} Oggetto contenente l'utente creato
 */
export async function createUser(userData) {
    return apiClient(`${API_BACKOFFICE_URL}/utente`, {
        method: 'POST',
        body: JSON.stringify(userData)
    });
}

/**
 * @function updateUser
 * @description Aggiorna un utente esistente
 * @param {Object} userData - Dati dell'utente da aggiornare
 * @returns {Promise<Object>} Oggetto contenente l'utente aggiornato
 */
export async function updateUser(userData) {
    return apiClient(`${API_BACKOFFICE_URL}/utente`, {
        method: 'PUT',
        body: JSON.stringify(userData)
    });
}

/**
 * @function deleteUser
 * @description Cancella un utente
 * @param {string} email - Email dell'utente da eliminare
 * @returns {Promise<Object>} Oggetto contenente l'utente eliminato
 */
export async function deleteUser(email) {
    return apiClient(`${API_BACKOFFICE_URL}/utente`, {
        method: 'DELETE',
        body: email
    });
}