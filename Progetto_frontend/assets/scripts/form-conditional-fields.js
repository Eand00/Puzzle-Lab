/**
 * @file form-conditional-fields.js
 * @version 1.0.0
 * @author Puzzle Lab
 * @contributors Bonura Vincenzo
 * @date 2025-01-24
 * @description This script handles the client-side logic for the conditional fields in the form
 * @see README_FRONTEND.md for additional information.
 */

/**
 * @function handleConditionalFields
 * @description This function handles the conditional fields in the form
 */
function handleConditionalFields() {
    const tipologiaRadios = document.getElementsByName('tipologia');
    const fasciaOrariaGroup = document.getElementById('fasciaOrariaGroup');
    const numeroGiorniGroup = document.getElementById('numeroGiorniGroup');
    const fasciaOrariaInputs = document.getElementsByName('fasciaOraria');
    const numeroGiorniInput = document.getElementById('numeroGiorni');

    /**
     * @function toggleFields
     * @description This function toggles the fields based on the selected 'tipologia' radio button
     */
    function toggleFields() {
        const isSoggiorno = document.getElementById('tipologia_soggiorno').checked;
        
        //toggle the fascia oraria fields
        fasciaOrariaGroup.style.display = isSoggiorno ? 'none' : 'flex';
        fasciaOrariaInputs.forEach(input => {
            input.required = !isSoggiorno;
            if (isSoggiorno) input.checked = false;
        });

        //toggle the numero giorni fields
        numeroGiorniGroup.style.display = isSoggiorno ? 'flex' : 'none';
        numeroGiorniInput.required = isSoggiorno;
        if (!isSoggiorno) {
            numeroGiorniInput.value = '';
            numeroGiorniInput.classList.remove('invalid');
        }
    }

    //initialize the fields state
    toggleFields();

    //add event listeners for the changes
    tipologiaRadios.forEach(radio => {
        radio.addEventListener('change', toggleFields);
    });
}

//initialize the fields state when the DOM is loaded
document.addEventListener('DOMContentLoaded', handleConditionalFields);