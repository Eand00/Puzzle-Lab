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
        regex: /^[a-zA-ZÀ-ù'\s]+$/,
        message: 'Il campo deve contenere solo lettere, apostrofi e spazi',
        required: true
    },
    cognome: {
        regex: /^[a-zA-ZÀ-ù'\s]+$/,
        message: 'Il campo deve contenere solo lettere, apostrofi e spazi',
        required: true
    },
    organizzazione: {
        regex: /.+/,
        message: 'Il campo non può essere vuoto',
        required: true
    },
    email: {
        regex: /^[\w.-]+@[\w.-]+\.[a-z]{2,}$/,
        message: 'Il campo deve contenere un indirizzo email valido',
        required: true
    },
    numero: {
        regex: /^\+?(?:[0-9] ?){6,14}[0-9]$"/,
        message: 'Il campo deve contenere un numero di telefono valido',
        required: false
    },
    dataInizio: {
        regex: /^\d{4}-\d{2}-\d{2}$/,
        message: 'Il campo deve contenere una data valida',
        required: true
    },
    dataFine: {
        regex: /^\d{4}-\d{2}-\d{2}$/,
        message: 'Il campo deve contenere una data valida',
        required: true
    },
    testo: {
        regex: /.+/,
        message: 'Il campo non può essere vuoto',
        required: false
    },
    tipologia: {
        regex: /.*/,
        message: '',
        required: false
    },
    fasciaOraria: {
        regex: /.*/,
        message: '',
        required: false
    },
    numeroGiorni: {
        regex: /^\d+$/,
        message: 'Il campo deve contenere un numero valido',
        required: false //dynamically set by the conditional fields
    },
    'laboratori[]': {
        regex: /.*/,
        message: 'Nessun laboratorio selezionato',
        required: false
    },
    privacy: {
        regex: 'checked',
        message: 'Il campo deve essere selezionato',
        required: true
    },
    sensibleData: {
        regex: 'checked',
        message: 'Il campo deve essere selezionato',
        required: true
    },
    tos: {
        regex: 'checked',
        message: 'Il campo deve essere selezionato',
        required: true
    }
}

/**
 * @function getFieldValue(field)
 * @param {HTMLInputElement} field - The field to get the value from
 * @returns {string | boolean} - The value of the field
 * @description Get the correct value of the field filtered by the type
 */
function getFieldValue(field) {
    return field.type === 'checkbox' ? field.checked : field.value;
}

/**
 * @function initErrorMessages(form)
 * @param {HTMLFormElement} form - The form to initialize
 * @description Insert the span elements for the error messages in the form
 */
function initErrorMessages(form) {
    form.querySelectorAll('input, textarea').forEach(input => {
        const errorMessage = document.createElement('span');
        errorMessage.classList.add('error-message');
        input.parentNode.appendChild(errorMessage);
    });
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

    //numeroGiorni conditional validation
    if(type === 'numeroGiorni') {
        const isSoggiorno = document.getElementById('tipologia_soggiorno').checked;
        if(isSoggiorno) {
            return [data >= 2, 'Il numero di giorni deve essere maggiore di 1'];
        }
    }

    //laboratori
    if(type === 'laboratori[]') {
        return [true, ''];
    }
    
    //checkboxes
    if(['privacy', 'sensibleData', 'tos'].includes(type)) {
        return [data === 'on' || data === true, rule.message];
    }

    //not recognized fields
    if(!rule) {
        return [false, 'Campo non riconosciuto'];
    }

    //not required fields
    if(!rule.required) {
        return [true, ''];
    }

    //validation
    return [rule.regex.test(data), rule.message];
}

/**
 * @function updateFieldStatus(field, isValid, message)
 * @param {string} field - The field to update
 * @param {boolean} isValid - The validity of the field
 * @param {string} message - The message to display
 * @description Updates the status of the field
 */
function updateFieldStatus(field, isValid, message) {
    const fieldElement = document.getElementById(field);

    //update the field status
    fieldElement.classList.toggle('invalid', !isValid);
    fieldElement.classList.toggle('valid', isValid);  

    //update the error message
    fieldElement.parentNode.querySelector('.error-message').textContent = message;
}

/**
 * @function formValidation
 * @param {HTMLFormElement} form - The form to validate
 * @description Validates the form by iterating over the fields and checking the correctness of the data
 */
function formValidation(form) {
    const errors = {};
    const formData = {};
    let isValid = true;
    const laboratori = [];
    form.querySelectorAll('input, textarea').forEach(input => {
        //Skip validation for radio buttons
        if(input.type === 'radio') {
            if(input.checked) {
                formData[input.name] = input.value;
            }
            return;
        }

        //populate the laboratori array
        if(input.name === 'laboratori[]') {
            if(input.checked) {
                laboratori.push(input.value);
            }
            return;
        }

        //get the value of the field
        if(input.type !== 'checkbox') {
            formData[input.name] = input.value;
        }

        if(input.required) {
            //get the value of the field OR the checkbox status
            let value = getFieldValue(input);
            const [fieldValid, message] = validate(value, input.name);

            //UI feedback
            updateFieldStatus(input.name, fieldValid, message);

            //Errors update
            if(!fieldValid) {
                errors[input.name] = message;
                isValid = false;
            }
        }
    });

    //controllo array laboratori
    formData.laboratori = laboratori.length > 0 ? laboratori : ['NESSUNA_SCELTA'];

    //error handling
    if(Object.keys(errors).length > 0) {
        
        //Smooth scroll to the first invalid field
        const invalidFields = form.querySelector('.invalid');
        invalidFields.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });

        //focus the first invalid field (timeout to avoid blocking smooth scroll)
        setTimeout(() => invalidFields.focus(), 500);

        return false;
    }
    submitFormData(formData);
}

/**
 * @function isLoading
 * @param {boolean} state - The state of the loading
 * @description Adds or removes the loading state to the body
 */
function isLoading(state = false) {
    document.body.classList.toggle('loading', state);
}

/**
 * @function submitFormData(formData)
 * @param {Object} formData - The validated form data to submit
 * @description Handles the API submission of the form data
 */
function submitFormData(formData) {
    // add loading state
    isLoading(true);

    // process data and remove unnecessary fields based on conditions
    const processedData = { ...formData };
    if(processedData.tipologia === 'VISITA') {
        delete processedData.numeroGiorni;
    }

    // convert the processed data to JSON
    const jsonFormData = JSON.stringify(processedData);

    // API URL
    const API_BASE_URL = 'http://localhost:8080/richieste/';

    // API request options
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: jsonFormData
    };
    const API_URL = API_BASE_URL + (formData.tipo === 'prenotazione' ? 'prenotazioni' : 'informazioni');

    //XXX test di loading state, rimuovere in produzione
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    delay(2000)
        .then(() => fetch(API_URL, requestOptions))
        .then(response => {
            if(!response.ok) {
                return response.text().then(text => {
                    throw new Error(text || `Errore del server: ${response.status}`);
                });
            }
            return response.text();
        })
        .then(data => {
            //remove loading state
            isLoading(false);
            window.location.href = './feedback.html';
        })
        .catch(error => {
            //remove loading state
            isLoading(false);
            //user feedback
            showErrorToast(error.message);
        });
}

/**
 * @function showErrorToast
 * @param {string} message - The error message to display
 * @description Shows a toast message with the error
 */
function showErrorToast(message) {
    const toast = document.createElement('div');
    toast.classList.add('toast', 'error');
    toast.innerHTML = `
        <div class="toast-content">
            <svg class="toast-icon" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <span>${message}</span>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;
    document.body.appendChild(toast);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}

//initialize the form validation
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form[data-validate]');

    //disable HTML5 validation
    form.setAttribute('novalidate', '');

    //initialize the error messages containers
    initErrorMessages(form);

    //handle validation on input
    form.addEventListener('input', (event) => {
        const input = event.target;

        //filter for only required input and textarea
        if(['INPUT', 'TEXTAREA'].includes(input.tagName) && 
            (VALIDATION_RULES[input.name].required || input.name === 'numeroGiorni')) {
            let value = getFieldValue(input);
            const [isValid, message] = validate(value, input.name);
            updateFieldStatus(input.name, isValid, message);
        }
    }, true);

    //handle the submission validation
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        formValidation(form);
    }, true);
});
