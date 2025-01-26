/**
 * @file requests.main.js
 * @version 1.0.0
 * @author Puzzle Lab
 * @contributors Eand Avdiu, Samuele Sicura, Vincenzo Bonura
 * @date 2025-01-15
 * @update 2025-01-26
 * @description Script per la pagina requests
 * @see README.md per ulteriori informazioni
 */

import { 
    getAllRequests,
    getRequestsByStatus, 
    updateRequestStatus, 
    deleteRequest, 
    updateRequest } from '../services/requests.service.js';
import { showToast } from '../utils/toast.util.js';

const REQUESTS_STATUS = {
    RICEVUTA: 'RICEVUTA',
    PRESA_IN_CARICO: 'PRESA_IN_CARICO',
    CONFERMATA: 'CONFERMATA',
    RIFIUTATA: 'RIFIUTATA',
    ARCHIVIATA: 'ARCHIVIATA'
};


function createRequestCard(request) {
    const cardInfo = `
        <div class="card-info">
            <div class="card-info-row">
                <span class="card-info-id">#${request.id}</span>
                <span class="card-info-tipo">${request.tipo.charAt(0).toUpperCase() + request.tipo.slice(1)}</span>
            </div>
            <div class="card-info-row">
                <span class="card-info-date">${new Date(request.dataCreazione).toLocaleDateString()}</span>
            </div>
        </div>
    `;
    const basicInfo = `
        <div class="basic-info">
            <div class="basic-info-title">
                <span class="label">Da</span> ${request.cognome} ${request.nome} || ${request.organizzazione}
            </div>
            <div class="basic-info-row">
                <span class="label">@</span> 
                <a href="mailto:${request.email}">${request.email}</a>
                <span class="label">T</span> ${request.numero}
            </div>
        </div>
        `;
    const details = `
        <div class="request-details">
            <p>Note: ${request.testo}</p>
            ${request.tipo === 'prenotazione' ? createPrenotazioneDetails(request) : ''}
            <div class="actions">
                <button class="delete-btn">Elimina</button>
                <button class="edit-btn">Modifica</button>
            </div>
        </div>
    `;

    return `
        <div class="request-card ${request.status.toLowerCase()}">
            <div class="row-1">
                ${cardInfo}
                ${basicInfo}
                 ${createStatusSelect(request.status)}
            </div>
            <div class="row-2">
                ${details}
            </div>
        </div>
    `;
}

/**
 * @function createStatusSelect
 * @description Crea il modulo per cambiare lo status della richiesta
 * @param {string} currentStatus - Status corrente della richiesta
 * @returns {string} - HTML per il modulo di modifica dello status
 */
function createStatusSelect(currentStatus) {
    const statusOptions = Object.values(REQUESTS_STATUS).map(status => `
        <option value="${status}" ${status === currentStatus ? 'selected' : ''}>${status.replace(/_/g, ' ')}</option>
    `).join('');

    return `
        <div class="actions-container">
            <div class="status-form">
                <select class="statusSelect">${statusOptions}</select>
                <button class="btn-primary generic disabled save-status-btn">Salva</button>
            </div>
            <button class="btn-primary info toggle-details-btn">Dettagli</button>
        </div>
    `;
}

/**
 * @function createPrenotazioneDetails
 * @description Crea i dettagli della prenotazione
 * @param {Object} request - Richiesta
 * @returns {string} - HTML per i dettagli della prenotazione
 */
function createPrenotazioneDetails(request) {
    return `
        <p>Inizio disponibilità: ${new Date(request.dataInizio).toLocaleDateString()}</p>
        <p>Fine disponibilità: ${new Date(request.dataFine).toLocaleDateString()}</p>
        <p>Laboratori: ${request.laboratori.replace(/,([^ ])/g, ', $1')}</p>
        <p>Tipologia: ${request.tipologia}</p>
        ${request.tipologia === 'SOGGIORNO' 
            ? `<p>Numero giorni: ${request.numeroGiorni}</p>` 
            : `<p>Fascia Oraria: ${request.fasciaOraria}</p>`
        }   
    `;
}

/**
 * @function setupEventListeners
 * @description Imposta gli event listener per le card delle richieste
 * @param {HTMLElement} container - Contenitore delle richieste
 */
function setupEventListeners(container) {
    container.addEventListener('click', async (event) => {
        const requestCard = event.target.closest('.request-card');
        if(!requestCard) return;

        if(event.target.classList.contains('toggle-details-btn')) {
            requestCard.classList.toggle('show-details');
        }
    });
}

/**
 * @function refreshRequests
 * @description Aggiorna la lista delle richieste
 */
async function refreshRequests() {
    const requests = await getAllRequests();
    populateRequests(requests);
}   

/**
 * @function populateRequests
 * @description Popola la lista delle richieste
 * @param {Array} requests - Array di richieste
 */
function populateRequests(requests) {
    const requestsContainer = document.getElementById('requests');

    if (!requests.length) {
        requestsContainer.innerHTML = '<p>Nessuna richiesta.</p>';
        return;
    }

    requestsContainer.innerHTML = requests.map(request => createRequestCard(request)).join('');
    setupEventListeners(requestsContainer);
}

/**
 * @function initRequests
 * @description Inizializza la pagina delle richieste
 */
async function initRequests() {
    try {
        await refreshRequests();
    } catch (error) {
        showToast('error', 'Errore', error.message);
    }
}

document.addEventListener('DOMContentLoaded', initRequests);