import { apiClient } from '../utils/api-client.js';
import { API_BASE_URL } from '../config/config.js';

export async function getAllUsers() {
    return apiClient(`${API_BASE_URL}/back-office/utenti`);
}

export async function createUser(userData) {
    return apiClient(`${API_BASE_URL}/back-office/utente`, {
        method: 'POST',
        body: JSON.stringify(userData)
    });
}

export async function updateUser(userData) {
    return apiClient(`${API_BASE_URL}/back-office/utente`, {
        method: 'PUT',
        body: JSON.stringify(userData)
    });
}

export async function deleteUser(email) {
    return apiClient(`${API_BASE_URL}/back-office/utente`, {
        method: 'DELETE',
        body: email
    });
}