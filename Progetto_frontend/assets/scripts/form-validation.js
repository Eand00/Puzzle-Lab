/**
 * @file form-validation.js
 * @version 1.0.0
 * @author Puzzle Lab
 * @contributors Bonura Vincenzo, Lupano Alberto, Picciotto Luca
 * @date 2024-12-21
 * @description This script handles the client-side logic for the form validation
 * @see README_FRONTEND.md for additional information.
 */

/**
 * @function validate(data, type)
 * @param {string} data - The data to validate
 * @param {string} type - The type of the data to validate
 * @description Validates the data based on the type
 */
function validate(data, type) {
    let regex, message, skip = false;
    switch(type) {
        case 'nome':
        case 'cognome':
            regex = /^[A-zÀ-ù'\s]+$/;
            message = 'Il campo deve contenere solo lettere, spazi e segni di punteggiatura';
            break;
        case 'organizzazione':
            regex = /.+/;
            message = 'Il campo non può essere vuoto';
            break;
        case 'email':
            regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            message = 'Il campo deve contenere un indirizzo email valido';
            break;
        case 'telefono':
            skip = true; //not required
            /*
            regex = /^[\+]?[0-9\s]{10,}$/;
            message = 'Il campo deve contenere un numero di telefono valido';
            */
            break;
        case 'data-inizio':
        case 'data-fine':
            regex = /^\d{4}-\d{2}-\d{2}$/;
            message = 'Il campo deve contenere una data valida';
            break;
        case 'messaggio':
            skip = true;
            break;
        case 'privacy':
        case 'sensibleData':
        case 'tos':
            skip = data === 'on';
            break;
        default:
            skip = false;
            message = 'Campo non valido';
            break;
    }
    return [skip || regex.test(data), message];
}

/**
 * @function formValitation
 * @param {HTMLFormElement} form - The form to validate
 * @description Validates the form by iterating over the fields and checking the correctness of the data
 */
function formValitation(form) {
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData);
    for(const [key, value] of Object.entries(formObject)) {
        if(validate(value, key)[0]) {
            document.getElementById(key).classList.remove('invalid');
            document.getElementById(key).classList.add('valid');
            console.log(`${key} is valid`);
        } else {
            document.getElementById(key).classList.remove('valid');
            document.getElementById(key).classList.add('invalid');
            console.log(`${key} is not valid: ${validate(value, key)[1]}`);
        }
    }
}

//initialize the form validation
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        formValitation(form);
    });
});
