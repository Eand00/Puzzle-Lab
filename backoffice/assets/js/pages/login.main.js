import { login } from '../services/auth.service.js';

// Clear the token when the login page loads
document.addEventListener('DOMContentLoaded', () => {
    localStorage.removeItem('jwtToken');
});

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();  // Prevent the form from submitting and refreshing the page

    // Get the values from the form fields
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Simple validation to check if both fields are filled
    if (!username || !password) {
        const toast = document.querySelector('toast-component');
        toast.showToast('warning', 'Attenzione', 'Username e password sono obbligatori.');
        return;
    }

    try {
        // Attempt to log in with the provided credentials (username and password)
        const token = await login(username, password);

        // If a token is received, redirect to the index page
        if (token) {
            setTimeout(() => {
                window.location.href = 'index.html';  // Redirect to the dashboard or home page
            });
        }
    } catch (error) {
        // Error handling is already done in the login function
    }
});