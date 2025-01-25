import { getAuthToken } from '../services/auth.service.js';

// Wrapper fetch con gestione del token
export async function apiClient(url, options = {}) {
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const token = getAuthToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    const contentType = response.headers.get('Content-Type');

    if (!response.ok) {
        let errorMessage = 'Errore nella richiesta';
        if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } else {
            errorMessage = await response.text();
        }
        throw new Error(errorMessage);
    }

    if (contentType && contentType.includes('application/json')) {
        return response.json();
    } else {
        return response.text();
    }
}