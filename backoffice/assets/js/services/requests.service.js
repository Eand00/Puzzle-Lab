/**
 * @file requests.service.js
 * @version 1.0.0
 * @author Puzzle Lab
 * @contributors Samuele, Sicura, Eand Avdiu, Vincenzo Bonura
 * @date 2025-01-22
 * @update 2025-01-25
 * @description Service per la gestione delle richieste
 * @see README.md per ulteriori informazioni
 */

import { apiClient } from '../utils/api-client.js';
import { API_RICHIESTE_URL } from '../config/config.js';

/**
 * @function calculateStats
 * @description Calcola le statistiche delle richieste
 * @param {Array} requests - Array di richieste
 * @returns {Object} Oggetto contenente le statistiche
 */
function calculateStats(requests) {
    return {
        ricevute: requests.filter(r => r.status === 'RICEVUTA').length,
        inCarico: requests.filter(r => r.status === 'PRESA_IN_CARICO').length,
        rifiutate: requests.filter(r => r.status === 'RIFIUTATA').length,
        completate: requests.filter(r => r.status === 'CONFERMATA' || r.status === 'ARCHIVIATA').length,
        totali: requests.length
    };
}

/**
 * @function getRequestStats
 * @description Recupera le statistiche della dashboard
 * @returns {Promise<Object>} Dati delle statistiche
 */
export async function getRequestStats() {
    const requests = await apiClient(`${API_RICHIESTE_URL}`);
    return calculateStats(requests);
}

/**
 * @function getAllRequests
 * @description Recupera tutte le richieste
 * @returns {Promise<Array>} Array di richieste
 */
export async function getAllRequests() {
    return apiClient(API_RICHIESTE_URL);
}

/**
 * @function getRequestsByStatus
 * @description Recupera le richieste filtrate per status
 * @param {string} status - Status della richiesta
 * @returns {Promise<Array>} Array di richieste
 */
export async function getRequestsByStatus(status) {
    return apiClient(`${API_RICHIESTE_URL}?status=${status}`);
}

/**
 * @function updateRequestStatus
 * @description Aggiorna lo status di una richiesta
 * @param {string} id - ID della richiesta
 * @param {string} status - Status della richiesta
 * @returns {Promise<Object>} Oggetto contenente la richiesta aggiornata
 */
export async function updateRequestStatus(id, status) {
    const response = await apiClient(`${API_RICHIESTE_URL}/status?id=${id}&status=${status}`, {
        method: 'PUT',
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}

/**
 * @function deleteRequest
 * @description Cancella una richiesta
 * @param {string} id - ID della richiesta
 * @returns {Promise<Object>} Oggetto contenente la richiesta cancellata
 */
export async function deleteRequest(id) {
    const response = await fetch(`${API_RICHIESTE_URL}`, {
        method: 'DELETE',
        body : JSON.stringify(id)
        });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}

/**
 * @function updateRequest
 * @description Aggiorna una richiesta
 * @param {Object} request - Oggetto richiesta con i dati aggiornati
 * @returns {Promise<Object>} Updated request
 */
export async function updateRequest(request) {
    const response = await fetch(`${API_RICHIESTE_URL}`, {
        method: 'PUT',
        body: JSON.stringify(request)
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}
