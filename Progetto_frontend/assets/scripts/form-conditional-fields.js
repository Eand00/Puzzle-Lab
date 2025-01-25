/**
 * @file form-conditional-fields.js
 * @version 1.0.0
 * @author Puzzle Lab
 * @contributors Bonura Vincenzo
 * @date 2025-01-24
 * @update 2025-01-25
 * @description Questo script gestisce la logica lato client per i campi condizionali nei form
 * @see README_FRONTEND.md per ulteriori informazioni.
 */

/**
 * @function handleConditionalFields
 * @description Questa funzione gestisce i campi condizionali nei form
 */
function handleConditionalFields() {
    const tipologiaRadios = document.getElementsByName('tipologia');
    const fasciaOrariaGroup = document.getElementById('fasciaOrariaGroup');
    const numeroGiorniGroup = document.getElementById('numeroGiorniGroup');
    const fasciaOrariaInputs = document.getElementsByName('fasciaOraria');
    const numeroGiorniInput = document.getElementById('numeroGiorni');

    /**
     * @function toggleFields
     * @description Questa funzione attiva o disattiva i campi in base alla selezione del radio button 'tipologia'
     */
    function toggleFields() {
        const isSoggiorno = document.getElementById('tipologia_soggiorno').checked;
        
        //attiva o disattiva il campo fasciaOraria in base alla selezione del radio button 'tipologia'
        fasciaOrariaGroup.style.display = isSoggiorno ? 'none' : 'flex';
        fasciaOrariaInputs.forEach(input => {
            input.required = !isSoggiorno;
            if (isSoggiorno) input.checked = false;
        });

        //attiva o disattiva il campo numeroGiorni in base alla selezione del radio button 'tipologia'
        numeroGiorniGroup.style.display = isSoggiorno ? 'flex' : 'none';
        numeroGiorniInput.required = isSoggiorno;
        if (!isSoggiorno) {
            numeroGiorniInput.value = '';
            numeroGiorniInput.classList.remove('invalid');
        }
    }

    //inizializza lo stato dei campi
    toggleFields();

    //aggiunge event listeners per i cambiamenti
    tipologiaRadios.forEach(radio => {
        radio.addEventListener('change', toggleFields);
    });
}

//attende il caricamento del DOM per invocare la funzione di inizializzazione
document.addEventListener('DOMContentLoaded', handleConditionalFields);