import { apiClient } from '../utils/api-client.js';
import { API_BASE_URL } from '../config/config.js';
import { API_RICHIESTE_URL } from '../config/config.js';

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
export async function getAllRequests() {
    return apiClient(API_RICHIESTE_URL);
}



export async function updateRequestStatus(id, status) {
    const response = await apiClient(`${API_RICHIESTE_URL}/status?id=${id}&status=${status}`, {
        method: 'PUT',
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}

export async function deleteRequest(id) {
    const response = await fetch(`${API_RICHIESTE_URL}`, {
        method: 'DELETE',
        body : JSON.stringify(id)
        });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}

/**
 * Update a request
 * @param {Object} request - Request object with updated data
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
