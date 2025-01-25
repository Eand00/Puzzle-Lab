import { isAuthenticated } from '../services/auth.service.js';

//Auth Guard
if (!isAuthenticated()) {
    window.location.href = './login.html';
}

document.addEventListener('DOMContentLoaded', () => {
    
    //rimozione splashscreen
    const splash = document.querySelector('.splash');
    splash.classList.add('closing');
    setTimeout(() => {
        splash.remove();
    }, 500);
});