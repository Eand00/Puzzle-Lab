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
                <button class="btn-secondary edit-btn">Modifica</button>
                <button class="btn-primary danger delete-btn">Elimina</button>
            </div>
        </div>
    `;

    return `
        <div class="request-card ${request.status.toLowerCase()}" data-id="${request.id}">
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
                <select data-original-status="${currentStatus}" class="statusSelect">${statusOptions}</select>
                <button class="btn-primary generic disabled save-status-btn" disabled>-</button>
            </div>
            <button class="btn-primary info toggle-details-btn">Mostra dettagli</button>
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

        //dettagli
        if(event.target.matches('.toggle-details-btn')) {
            requestCard.classList.toggle('show-details');
            event.target.textContent = requestCard.classList.contains('show-details') ? 'Nascondi dettagli' : 'Mostra dettagli';
        }

        //salva Status
        if(event.target.matches('.save-status-btn') && !event.target.disabled) {
            const select = requestCard.querySelector('.statusSelect');
            const originalStatus = select.dataset.originalStatus;
            const newStatus = select.value;

            if(originalStatus !== newStatus) {
                try {
                    await updateRequestStatus(requestCard.dataset.id, newStatus);
                    showToast('success', 'Status aggiornato', 'La richiesta è stata aggiornata con successo');
                } catch (error) {
                    showToast('error', 'Errore', error.message);
                } finally {
                    await refreshRequests();
                }
            }
        }
    });

    container.addEventListener('change', async (event) => {
        //status
        if(event.target.matches('.statusSelect')) {
            const select = event.target;
            const saveBtn = select.nextElementSibling;
            const originalStatus = select.dataset.originalStatus;

            //toggle saveBtn
            if(originalStatus !== select.value) {
                saveBtn.disabled = false;
                saveBtn.textContent = 'Salva';
                saveBtn.classList.remove('disabled', 'generic');
                saveBtn.classList.add('success');
            } else {
                saveBtn.disabled = true;
                saveBtn.textContent = '-';
                saveBtn.classList.remove('success');
                saveBtn.classList.add('disabled', 'generic');
            }
        }
    });

    container.addEventListener('click', async (event) => {
        if(event.target.matches('.edit-btn')) {
            const requestCard = event.target.closest('.request-card');
            const requestData = extractRequestDataFromCard(requestCard);
            openEditModal(requestData);
        }
    });

    const modal = document.getElementById('editModal');
    const span = document.querySelector('.close');
    const cancelBtn = document.getElementById('cancelEdit');

    // Gestione chiusura modale
    span.onclick = () => modal.style.display = 'none';
    cancelBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => {
        if(event.target === modal) modal.style.display = 'none';
    }

    // Gestione submit form
    document.getElementById('editForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = getFormData();
        
        try {
            await updateRequest(formData.id, formData);
            showToast('success', 'Modifica effettuata', 'Richiesta aggiornata con successo');
            modal.style.display = 'none';
            await refreshRequests();
        } catch (error) {
            showToast('error', 'Errore', error.message);
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
}

function applyFilters(requests) {
    const filterForm = document.getElementById('filterForm');
    const search = filterForm.querySelector('#search').value.toLowerCase();
    const tipo = filterForm.querySelector('input[name="tipo"]:checked').value;
    const status = filterForm.querySelector('#status').value;

    return requests.filter(request => {
        const matchesSearch =
            request.nome.toLowerCase().includes(search) ||
            request.cognome.toLowerCase().includes(search) ||
            request.organizzazione.toLowerCase().includes(search) ||
            request.email.toLowerCase().includes(search) ||
            request.testo.toLowerCase().includes(search);

        const matchesTipo = tipo === 'all' || request.tipo === tipo;

        const matchesStatus = status === 'all' || request.status === status;

        return matchesSearch && matchesTipo && matchesStatus;
    });
}

function setupFilterEventListeners() {
    const filterForm = document.getElementById('filterForm');
    filterForm.addEventListener('input', async () => {
        try {
            const allRequests = await getAllRequests();

            const filteredRequests = applyFilters(allRequests);

            populateRequests(filteredRequests);
        } catch (error) {
            showToast('error', 'Errore', error.message);
        }
    });
}

function extractRequestDataFromCard(card) {
    const id = card.dataset.id;
    const tipo = card.querySelector('.card-info-tipo').textContent.toLowerCase();
    
    // Estrai dati base
    const titleText = card.querySelector('.basic-info-title').textContent;
    const [namePart, orgPart] = titleText.split('||').map(s => s.trim());
    const [cognome, nome] = namePart.replace('Da ', '').split(' ');
    
    const email = card.querySelector('a[href^="mailto:"]').textContent;
    const numero = card.querySelector('.basic-info-row').lastChild.textContent.trim();
    
    // Estrai testo richiesta
    const testo = card.querySelector('.request-details p').textContent.replace('Note: ', '');
    
    // Inizializza oggetto richiesta
    const requestData = {
        id,
        tipo,
        nome,
        cognome,
        organizzazione: orgPart || '',
        email,
        numero,
        testo
    };
    
    // Estrai dati specifici per prenotazione
    if(tipo === 'prenotazione') {
        const details = card.querySelector('.request-details');
        requestData.dataInizio = details.children[1].textContent.replace('Inizio disponibilità: ', '');
        requestData.dataFine = details.children[2].textContent.replace('Fine disponibilità: ', '');
        requestData.laboratori = details.children[3].textContent.replace('Laboratori: ', '');
        requestData.tipologia = details.children[4].textContent.replace('Tipologia: ', '');
        
        if(requestData.tipologia === 'SOGGIORNO') {
            requestData.numeroGiorni = details.children[5].textContent.replace('Numero giorni: ', '');
        } else {
            requestData.fasciaOraria = details.children[5].textContent.replace('Fascia Oraria: ', '');
        }
    }
    
    return requestData;
}

function openEditModal(data) {
    const modal = document.getElementById('editModal');
    
    // Popola campi base
    document.getElementById('editId').value = data.id;
    document.getElementById('editNome').value = data.nome;
    document.getElementById('editCognome').value = data.cognome;
    document.getElementById('editOrganizzazione').value = data.organizzazione;
    document.getElementById('editEmail').value = data.email;
    document.getElementById('editNumero').value = data.numero;
    
    // Gestione campi prenotazione
    const prenotazioneFields = document.getElementById('prenotazioneFields');
    if(data.tipo === 'prenotazione') {
        prenotazioneFields.style.display = 'block';
        
        document.getElementById('editDataInizio').value = formatDateForInput(data.dataInizio);
        document.getElementById('editDataFine').value = formatDateForInput(data.dataFine);
        document.getElementById('editLaboratori').value = data.laboratori;
        
        // Gestione campi specifici
        if(data.tipologia === 'SOGGIORNO') {
            document.getElementById('editGiorniContainer').style.display = 'block';
            document.getElementById('editFasciaContainer').style.display = 'none';
            document.getElementById('editNumeroGiorni').value = data.numeroGiorni;
        } else {
            document.getElementById('editGiorniContainer').style.display = 'none';
            document.getElementById('editFasciaContainer').style.display = 'block';
            document.getElementById('editFasciaOraria').value = data.fasciaOraria;
        }
    } else {
        prenotazioneFields.style.display = 'none';
    }
    
    modal.style.display = 'block';
}

function formatDateForInput(dateString) {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
}

function getFormData() {
    const formData = {
        id: document.getElementById('editId').value,
        nome: document.getElementById('editNome').value,
        cognome: document.getElementById('editCognome').value,
        organizzazione: document.getElementById('editOrganizzazione').value,
        email: document.getElementById('editEmail').value,
        numero: document.getElementById('editNumero').value,
    };
    
    if(document.getElementById('prenotazioneFields').style.display === 'block') {
        formData.tipo = 'prenotazione';
        formData.dataInizio = document.getElementById('editDataInizio').value;
        formData.dataFine = document.getElementById('editDataFine').value;
        formData.laboratori = document.getElementById('editLaboratori').value;
        
        if(formData.tipologia === 'SOGGIORNO') {
            formData.numeroGiorni = document.getElementById('editNumeroGiorni').value;
        } else {
            formData.fasciaOraria = document.getElementById('editFasciaOraria').value;
        }
    } else {
        formData.tipo = 'informazione';
    }
    
    return formData;
}

/**
 * @function initRequests
 * @description Inizializza la pagina delle richieste
 */
async function initRequests() {
    try {
        const requestsContainer = document.getElementById('requests');
        setupEventListeners(requestsContainer);
        await refreshRequests();
        setupFilterEventListeners();
    } catch (error) {
        showToast('error', 'Errore', error.message);
    }
}

document.addEventListener('DOMContentLoaded', initRequests);