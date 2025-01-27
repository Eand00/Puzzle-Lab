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
 * @function getAllRequests
 * @description Recupera tutte le richieste
 * @param {string} order - Ordine di visualizzazione delle richieste
 * @returns {Promise<Array>} Array di richieste
 * @throws {Error} - Errore con messaggio di feedback
 */
export async function getAllRequests(order = 'DESC') {
    try {
        const requests = await apiClient(API_RICHIESTE_URL);
        return requests.sort((a, b) => order === 'DESC' ? b.id - a.id : a.id - b.id);
    } catch (error) {
        throw new Error(error.message || 'Errore durante il recupero delle richieste');
    }
}

/**
 * @function getRequestsByStatus
 * @description Recupera le richieste filtrate per status
 * @param {string} status - Status della richiesta
 * @param {string} order - Ordine di visualizzazione delle richieste
 * @returns {Promise<Array>} Array di richieste
 * @throws {Error} - Errore con messaggio di feedback
 */
export async function getRequestsByStatus(status, order = 'DESC') {
    try {
        const requests = await apiClient(`${API_RICHIESTE_URL}/status?status=${status}`);
        return requests.sort((a, b) => order === 'DESC' ? b.id - a.id : a.id - b.id);
    } catch (error) {
        throw new Error(error.message || 'Errore durante il recupero delle richieste');
    }
}

/**
 * @function updateRequest
 * @description Aggiorna una richiesta
 * @param {Object} request - Oggetto richiesta con dati aggiornati
 * @returns {Promise<Object>} Richiesta aggiornata
 * @throws {Error} - Errore con messaggio di feedback
 */
export async function updateRequest(request) {
    try {
        return await apiClient(`${API_RICHIESTE_URL}`, {
            method: 'PUT',
            body: JSON.stringify(request)
        });
    } catch (error) {
        throw new Error(error.message || 'Errore durante l\'aggiornamento della richiesta');
    }
}

/**
 * @function updateRequestStatus
 * @description Aggiorna lo status di una richiesta
 * @param {string} id - ID della richiesta
 * @param {string} status - Status della richiesta
 * @returns {Promise<Object>} Oggetto contenente la richiesta aggiornata
 * @throws {Error} - Errore con messaggio di feedback
 */
export async function updateRequestStatus(id, status) {
    try {
        return await apiClient(`${API_RICHIESTE_URL}/status?id=${id}&status=${status}`, {
            method: 'PUT',
        });
    } catch (error) {
        throw new Error(error.message || 'Errore durante l\'aggiornamento della richiesta');
    }
}

/**
 * @function deleteRequest
 * @description Cancella una richiesta
 * @param {string} id - ID della richiesta
 * @returns {Promise<Object>} Oggetto contenente la richiesta cancellata
 * @throws {Error} - Errore con messaggio di feedback
 */
export async function deleteRequest(id) {
    try {
        return await apiClient(`${API_RICHIESTE_URL}`, {
            method: 'DELETE',
            body : JSON.stringify(id)
        });
    } catch (error) {
        throw new Error(error.message || 'Errore durante la cancellazione della richiesta');
    }
}

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