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

export async function getAllUsers() {
    return apiClient(`${API_BACKOFFICE_URL}/utenti`);
}

export async function createUser(userData) {
    return apiClient(`${API_BACKOFFICE_URL}/utente`, {
        method: 'POST',
        body: JSON.stringify(userData)
    });
}

export async function updateUser(userData) {
    return apiClient(`${API_BACKOFFICE_URL}/utente`, {
        method: 'PUT',
        body: JSON.stringify(userData)
    });
}

export async function deleteUser(email) {
    return apiClient(`${API_BACKOFFICE_URL}/utente`, {
        method: 'DELETE',
        body: email
    });
}