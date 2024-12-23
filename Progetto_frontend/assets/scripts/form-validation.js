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
 * @constant {{RegExp, string, boolean}} VALIDATION_RULES
 * @description The rules for the validation of the fields, with a feedback message
 */
const VALIDATION_RULES = {
    nome: {
        regex: /^[A-zÀ-ù'\s]+$/,
        message: 'Il campo deve contenere solo lettere, spazi e segni di punteggiatura',
        required: true
    },
    cognome: {
        regex: /^[A-zÀ-ù'\s]+$/,
        message: 'Il campo deve contenere solo lettere, spazi e segni di punteggiatura',
        required: true
    },
    organizzazione: {
        regex: /.+/,
        message: 'Il campo non può essere vuoto',
        required: true
    },
    email: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Il campo deve contenere un indirizzo email valido',
        required: true
    },
    telefono: {
        regex: /^[\+]?[0-9\s]{10,}$/,
        message: 'Il campo deve contenere un numero di telefono valido',
        required: false
    },
    'data-inizio': {
        regex: /^\d{4}-\d{2}-\d{2}$/,
        message: 'Il campo deve contenere una data valida',
        required: true
    },
    'data-fine': {
        regex: /^\d{4}-\d{2}-\d{2}$/,
        message: 'Il campo deve contenere una data valida',
        required: true
    },
    messaggio: {
        regex: /.+/,
        message: 'Il campo non può essere vuoto',
        required: false
    },
    privacy: {
        regex: 'on',
        message: 'Il campo deve essere selezionato',
        required: true
    },
    'sensible-data': {
        regex: 'on',
        message: 'Il campo deve essere selezionato',
        required: true
    },
    'tos': {
        regex: 'on',
        message: 'Il campo deve essere selezionato',
        required: true
    }
}

/**
 * @function validate(data, type)
 * @param {string} data - The data to validate
 * @param {string} type - The type of the data to validate
 * @returns {[boolean, string]} [isValid, message] - The result of the validation
 * @description Validates the data based on the type
 */
function validate(data, type) {
    const rule = VALIDATION_RULES[type];
    
    //checkboxes
    if(['privacy', 'sensibleData', 'tos'].includes(type)) {
        return [data === 'on', 'Campo obbligatorio'];
    }

    //not recognized fields
    if(!rule) {
        return [false, 'Campo non valido'];
    }

    //not required fields
    if(!rule.required) {
        return [true, ''];
    }

    //validation
    return [rule.regex.test(data), rule.message];
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
