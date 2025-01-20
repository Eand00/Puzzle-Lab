import { apiClient } from '../utils/api-client.js';
import { API_BASE_URL } from '../config/config.js';

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
            body: JSON.stringify(credentials)
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

export function logout() {
    localStorage.removeItem('jwtToken');
    window.location.href = 'login.html';
}