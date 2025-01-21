import { apiClient } from '../utils/api-client.js';
import { API_BASE_URL } from '../config/config.js';

/**
 * Calculates request statistics
 * @param {Array} requests - Array of requests
 * @returns {Object} Statistics object
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
 * Fetches dashboard statistics
 * @returns {Promise<Object>} Statistics data
 */
export async function getRequestStats() {
    const requests = await apiClient(`${API_BASE_URL}/back-office/richieste`);
    return calculateStats(requests);
}

/**
 * Fetches recent requests
 * @returns {Promise<Array>} Recent requests
 */
export async function getRecentRequests() {
    return apiClient(`${API_BASE_URL}/back-office/richieste`);
}