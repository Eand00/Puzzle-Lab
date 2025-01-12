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
    privacy: {
        regex: 'checked',
        message: 'Il campo deve essere selezionato',
        required: true
    },
    'sensible-data': {
        regex: 'checked',
        message: 'Il campo deve essere selezionato',
        required: true
    },
    'tos': {
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
    
    //checkboxes
    if(['privacy', 'sensible-data', 'tos'].includes(type)) {
        return [data === 'on' || data === true, 'Campo obbligatorio'];
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
    form.querySelectorAll('input, textarea').forEach(input => {
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

    //error handling
    if(Object.keys(errors).length > 0) {
        
        //Smooth scroll to the first invalid field
        const invalidFields = form.querySelector('.invalid');
        invalidFields.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });

        //focus the first invalid field
        setTimeout(() => invalidFields.focus(), 500);

        return false;
    }
    console.log(formData);
    submitFormData(formData);
}

/**
 * @function addTimeToDate
 * @param {string} dateString - The date string in YYYY-MM-DD format
 * @returns {string} - The date string in ISO format (YYYY-MM-DDThh:mm:ss.sssZ)
 * @description Converts a date string to ISO format with time
 */
function addTimeToDate(dateString, isEndDate = false) {
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    return date.toISOString();
}

/**
 * @function submitFormData(formData)
 * @param {Object} formData - The validated form data to submit
 * @description Handles the API submission of the form data
 */
function submitFormData(formData) {
    //add loading state
    document.body.classList.add('loading');

    // add time to the date fields
    const processedData = { ...formData };
    if (processedData.dataInizio) {
        processedData.dataInizio = addTimeToDate(processedData.dataInizio);
    }
    if (processedData.dataFine) {
        processedData.dataFine = addTimeToDate(processedData.dataFine, true);
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
    delay(3000)
        .then(() => fetch(API_URL, requestOptions))
        .then(response => {
            if(!response.ok) {
                throw new Error(`Errore nella risposta del server: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            //remove loading state
            document.body.classList.remove('loading');
            window.location.href = './feedback.html';
        })
        .catch(error => {
            //remove loading state
            document.body.classList.remove('loading');
            //XXX aggiungere feedback all'utente
            console.error(error);
        });
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
        if(['INPUT', 'TEXTAREA'].includes(input.tagName) && VALIDATION_RULES[input.name].required) {
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
