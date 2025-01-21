import { checkAuth } from '../services/auth.service.js';

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    
    // Rimuove la splash-image
    const splash = document.querySelector('.splash');
    console.log('splash');
    splash.classList.add('closing');
    setTimeout(() => {
        splash.remove();
    }, 500);
});