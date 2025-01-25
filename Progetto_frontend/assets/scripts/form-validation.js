/**
 * @file form-validation.js
 * @version 1.0.0
 * @author Puzzle Lab
 * @contributors Bonura Vincenzo, Lupano Alberto, Picciotto Luca
 * @date 2024-12-21
 * @update 2025-01-25
 * @description Questo file contiene la logica di validazione dei campi nei form.
 * @see README_FRONTEND.md per ulteriori informazioni.
 */

/**
 * @constant {{RegExp, string, boolean}} VALIDATION_RULES
 * @description Le regole per la validazione dei campi, con un messaggio di feedback
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
        required: false //impostato dinamicamente dai campi condizionali
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
 * @param {HTMLInputElement} field - Il campo da cui ottenere il valore
 * @returns {string | boolean} - Il valore del campo
 * @description Ottiene il valore corretto del campo filtrato dal tipo
 */
function getFieldValue(field) {
    return field.type === 'checkbox' ? field.checked : field.value;
}

/**
 * @function initErrorMessages(form)
 * @param {HTMLFormElement} form - Il form da inizializzare
 * @description Inserisce gli span per i messaggi di errore nel form
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
 * @param {string} data - Il dato da validare
 * @param {string} type - Il tipo del dato da validare
 * @returns {[boolean, string]} [isValid, message] - Il risultato della validazione
 * @description Valida il dato in base al tipo
 */
function validate(data, type) {
    const rule = VALIDATION_RULES[type];

    //validazione condizionale numeroGiorni
    if(type === 'numeroGiorni') {
        const isSoggiorno = document.getElementById('tipologia_soggiorno').checked;
        if(isSoggiorno) {
            return [data >= 2, 'Il numero di giorni deve essere maggiore di 1'];
        }
    }
    
    //validazione checkbox
    if(['privacy', 'sensibleData', 'tos'].includes(type)) {
        return [data === 'on' || data === true, rule.message];
    }

    //campo non riconosciuto
    if(!rule) {
        return [false, 'Campo non riconosciuto'];
    }

    //campo non obbligatorio
    if(!rule.required) {
        return [true, ''];
    }

    //validazione
    return [rule.regex.test(data), rule.message];
}

/**
 * @function updateFieldStatus(field, isValid, message)
 * @param {string} field - Il campo da aggiornare
 * @param {boolean} isValid - La validità del campo
 * @param {string} message - Il messaggio da visualizzare
 * @description Aggiorna lo stato del campo
 */
function updateFieldStatus(field, isValid, message) {
    const fieldElement = document.getElementById(field);

    //aggiorna lo stato del campo
    fieldElement.classList.toggle('invalid', !isValid);
    fieldElement.classList.toggle('valid', isValid);  

    //aggiorna il messaggio di errore
    fieldElement.parentNode.querySelector('.error-message').textContent = message;
}

/**
 * @function formValidation
 * @param {HTMLFormElement} form - Il form da validare
 * @description Valida il form iterando sui campi e controllando la correttezza dei dati
 */
function formValidation(form) {
    const errors = {};
    const formData = {};
    let isValid = true;
    form.querySelectorAll('input, textarea').forEach(input => {
        //salta la validazione per i radio button
        if(input.type === 'radio') {
            if(input.checked) {
                formData[input.name] = input.value;
            }
            return;
        }
        
        //ottiene il valore del campo
        if(input.type !== 'checkbox') {
            formData[input.name] = input.value;
        }

        if(input.required) {
            //ottiene il valore del campo o lo stato del checkbox
            let value = getFieldValue(input);
            const [fieldValid, message] = validate(value, input.name);

            //feedback UI
            updateFieldStatus(input.name, fieldValid, message);

            //aggiorna gli errori
            if(!fieldValid) {
                errors[input.name] = message;
                isValid = false;
            }
        }
    });

    //gestione degli errori
    if(Object.keys(errors).length > 0) {
        
        //smooth scroll al primo campo invalido
        const invalidFields = form.querySelector('.invalid');
        invalidFields.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });

        //focus al primo campo invalido (timeout per evitare il blocco del smooth scroll)
        setTimeout(() => invalidFields.focus(), 500);

        return false;
    }
    submitFormData(formData);
}

/**
 * @function isLoading
 * @param {boolean} state - Lo stato del caricamento
 * @description Aggiunge o rimuove lo stato di caricamento al body
 */
function isLoading(state = false) {
    document.body.classList.toggle('loading', state);
}

/**
 * @function submitFormData(formData)
 * @param {Object} formData - I dati del form validati
 * @description Gestione dell'invio dei dati del form all'API
 */
function submitFormData(formData) {
    // aggiunge lo stato di caricamento
    isLoading(true);

    // processa i dati e rimuove i campi non necessari in base alle condizioni
    const processedData = { ...formData };
    if(processedData.tipologia === 'VISITA') {
        delete processedData.numeroGiorni;
    }

    // converte i dati processati in JSON
    const jsonFormData = JSON.stringify(processedData);

    // API URL
    const API_BASE_URL = 'http://localhost:8080/richieste/';

    // opzioni della richiesta API
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
            //rimuove lo stato di caricamento
            isLoading(false);
            window.location.href = './feedback.html';
        })
        .catch(error => {
            //rimuove lo stato di caricamento
            isLoading(false);
            //feedback utente
            showErrorToast(error.message);
        });
}

/**
 * @function showErrorToast
 * @param {string} message - Il messaggio di errore da visualizzare
 * @description Mostra un toast con il messaggio di errore
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
    
    // rimuove il toast dopo 5 secondi
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}

//inizializza la validazione del form
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form[data-validate]');

    //disabilita la validazione HTML5
    form.setAttribute('novalidate', '');

    //inizializza i container per i messaggi di errore
    initErrorMessages(form);

    //gestione della validazione sui campi di input
    form.addEventListener('input', (event) => {
        const input = event.target;

        //filtra solo per i campi obbligatori e il campo numeroGiorni
        if(['INPUT', 'TEXTAREA'].includes(input.tagName) && 
            (VALIDATION_RULES[input.name].required || input.name === 'numeroGiorni')) {
            let value = getFieldValue(input);
            const [isValid, message] = validate(value, input.name);
            updateFieldStatus(input.name, isValid, message);
        }
    }, true);

    //gestione della validazione al submit
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        formValidation(form);
    }, true);
});
