import { apiClient } from '../utils/api-client.js';
import { API_BASE_URL } from '../config/config.js';


/**
 * Effettua il login dell'utente
 * @function login
 * @param {string} username - Il nome utente
 * @param {string} password - La password
 * @returns {Promise<string>} - Il token JWT
 */
export async function login(username, password) {
    const url = `${API_BASE_URL}/login`;
    const credentials = {
        username: username,
        password: password,
    };

    try {
        const response = await apiClient(url, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(`${username}:${password}`),
                'Content-Type': 'application/json'
            },
        });

        if (typeof response === 'string') {
            throw new Error(response);
        }

        if (response.token) {
            localStorage.setItem('jwtToken', response.token);
            return response.token;
        } else {
            throw new Error('No token received from server.');
        }
    } catch (error) {
        const toast = document.querySelector('toast-component');
        toast.showToast('error', 'Errore di login', error.message);
        throw error;
    }
}

/**
 * Effettua il logout dell'utente
 * @function logout
 */
export function logout() {
    localStorage.removeItem('jwtToken');
    window.location.href = 'login.html';
}

/**
 * Controlla se l'utente è loggato e redirige alla pagina di login se non lo è
 * @function checkAuth
 * @returns {boolean} - True se l'utente è loggato, false altrimenti
 */
export function checkAuth() {
    return localStorage.getItem('jwtToken') !== null;
}