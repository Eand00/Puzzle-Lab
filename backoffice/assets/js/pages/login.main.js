import { login, isAuthenticated } from '../services/auth.service.js';
import { showToast } from '../utils/toast.util.js';

//controllo dell'autenticazione e bypass login
if (isAuthenticated()) {
    window.location.href = './index.html';
}

//gestione del form di login
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    //validazione campi e feedback
    if (!username || !password) {
        showToast('warning', 'Attenzione', 'Username e password sono obbligatori.');
        return;
    }

    try {
        //tentativo di login
        const success = await login(username, password);
        if (success) {
            window.location.href = './index.html';
        }
    } catch (error) {
        //gestione errore
        showToast('error', 'Errore', error.message);
    }
});