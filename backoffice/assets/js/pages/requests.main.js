/**
 * @file requests.main.js
 * @version 1.0.0
 * @author Puzzle Lab
 * @contributors Eand Avdiu, Samuele Sicura, Vincenzo Bonura
 * @date 2025-01-15
 * @update 2025-01-27
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

/**
 * @function createRequestCard
 * @description Crea la card per una richiesta
 * @param {Object} request - Richiesta
 * @returns {string} - HTML per la card
 */
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
                <span class="label">Da</span> <span class="lastname">${request.cognome}</span> <span class="firstname">${request.nome}</span> || <span class="organization">${request.organizzazione}</span>
            </div>
            <div class="basic-info-row">
                <span class="label">@</span> 
                <a href="mailto:${request.email}">${request.email}</a>
                <span class="label">T</span> <span class="number">${request.numero}</span>
            </div>
        </div>
        `;
    const details = `
        <div class="request-details">
            <div class="request-details-container">
                <div class="request-details-row">
                    <span class="label">Messaggio</span>
                    <p class="message"s>${request.testo}</p>
                </div>
                ${request.tipo === 'prenotazione' ? createPrenotazioneDetails(request) : ''}
            </div>
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
                <select data-original-status="${currentStatus}" class="statusSelect first" name="request-status">${statusOptions}</select>
                <button class="btn-primary generic disabled save-status-btn" disabled>-</button>
            </div>
            <button class="btn-primary toggle-details-btn">Mostra dettagli</button>
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
    //formatta laboratori
    const labs = request.laboratori.split(',')
        .map(lab => {
            lab = lab.replace(/_/g, ' ');
            return `<span class="lab-name">${lab}</span>`;
        })
        .join('');
    return `
        <div class="request-details-row">
            <span class="label">Tipologia</span> <span class="tipologia">${request.tipologia}</span><br/>
            ${request.tipologia === 'SOGGIORNO' 
                ? `<span class="label">Numero giorni</span> <span class="data">${request.numeroGiorni}</span>` 
                : `<span class="label">Fascia Oraria</span> <span class="data">${request.fasciaOraria}</span>`
            }
        </div>
        <div class="request-details-row">
            <span class="label">Disponibilità dal</span> <span class="dataInizio">${new Date(request.dataInizio).toLocaleDateString()}</span>
            <span class="label">al</span> <span class="dataFine">${new Date(request.dataFine).toLocaleDateString()}</span>
        </div>
        <div class="request-details-row">
            <span class="label">Laboratori</span> ${labs}
        </div>
           
    `;
}

/**
 * @function handleStatusChange
 * @description Gestisce il commportamento del bottone di salvataggio dello status
 * @param {HTMLElement} select - Select per il cambio di status
 */
const handleStatusChange = (select) => {
    const saveBtn = select.nextElementSibling;
    const originalStatus = select.dataset.originalStatus;
    const hasChanged = originalStatus !== select.value;

    saveBtn.disabled = !hasChanged;
    saveBtn.textContent = hasChanged ? 'Salva' : '-';
    saveBtn.classList.toggle('success', hasChanged);
    saveBtn.classList.toggle('disabled', !hasChanged);
    saveBtn.classList.toggle('generic', !hasChanged);
}

/**
 * @function setupCardEventListeners
 * @description Imposta gli event listener per le card delle richieste
 * @param {HTMLElement} container - Contenitore delle richieste
 */
function setupCardEventListeners(container) {

    /**
     * @function handleToggleDetails
     * @description Gestisce il click sul pulsante per mostrare/nascondere i dettagli della richiesta
     * @param {HTMLElement} btn - Pulsante per mostrare/nascondere i dettagli
     * @param {HTMLElement} card - Card della richiesta
     */
    const handleToggleDetails = (btn, card) => {
        card.classList.toggle('show-details');
        btn.textContent = card.classList.contains('show-details') 
            ? 'Nascondi dettagli' 
            : 'Mostra dettagli';
    }

    /**
     * @function handleStatusUpdate
     * @description Gestisce il click sul pulsante per cambiare lo status della richiesta
     * @param {HTMLElement} btn - Pulsante per cambiare lo status
     * @param {HTMLElement} card - Card della richiesta
     */
    const handleStatusUpdate = async (btn, card) => {
        if(btn.disabled) return;

        /**
         * @function updateCard
         * @description Aggiorna la card con il nuovo status
         * @param {HTMLElement} select - Select per il cambio di status
         * @param {string} newStatus - Status nuovo
         */
        const updateCard = (select, newStatus) => {

            //eliminazione card, se in vista filtro status o ARCHIVIATA
            const filterStatus = filterForm.querySelector('#status').value;
            if(filterStatus !== "all" || newStatus === "ARCHIVIATA") {
                card.classList.add('fade-out');
                setTimeout(() => {
                    card.remove()
                    const remainingCards = document.querySelectorAll('.request-card');
                    if (remainingCards.length === 0) {
                        const container = document.querySelector('#requests');
                        container.innerHTML = '<p>Nessuna richiesta.</p>';
                    }
                }, 500);
                return;
            }

            const classes = {
                old: select.dataset.originalStatus.toLowerCase(),
                new: newStatus.toLowerCase()
            }
            select.dataset.originalStatus = newStatus;
            
            card.classList.remove(classes.old);
            card.classList.add(classes.new);

            handleStatusChange(select);
        }

        const select = card.querySelector('.statusSelect');
        const originalStatus = select.dataset.originalStatus;
        const newStatus = select.value;

        if(originalStatus === newStatus) return;

        try {
            await updateRequestStatus(card.dataset.id, newStatus);
            updateCard(select, newStatus);
            showToast('success', 'Status aggiornato', 'La richiesta è stata aggiornata con successo');
        } catch (error) {
            showToast('error', 'Errore', error.message);
        }
    }

    /**
     * @function handleEditRequest
     * @description Gestisce il click sul pulsante per modificare la richiesta
     * @param {HTMLElement} btn - Pulsante per modificare la richiesta
     * @param {HTMLElement} card - Card della richiesta
     */
    const handleEditRequest = (btn, card) => {
        const requestData = extractRequestDataFromCard(card);
        initEditModal(requestData);
    }

    /**
     * @function handleDeleteRequest
     * @description Gestisce la logica del modale di eliminazione richiesta
     * @param {HTMLElement} btn - Pulsante per eliminare la richiesta
     * @param {HTMLElement} card - Card della richiesta
     */
    const handleDeleteRequest = (btn, card) => {
        const requestId = card.dataset.id;
        const deleteModal = document.getElementById('deleteModal');
        const confirmDeleteBtn = deleteModal.querySelector('#confirmDelete');

        deleteModal.querySelector('.modal-body').innerHTML = `
            <p class="text-center">Sei sicuro di voler eliminare la richiesta #${requestId}?<br>
            <strong>Questa azione non può essere annullata.</strong></p>
        `;

        deleteModal.style.display = 'block';

        const handleConfirmDelete = async () => {
            try {
                await deleteRequest(requestId);
                card.classList.add('fade-out');
                setTimeout(() => {
                    card.remove();
                    const remainingCards = document.querySelectorAll('.request-card');
                    if (remainingCards.length === 0) {
                        const container = document.querySelector('#requests');
                        container.innerHTML = '<p>Nessuna richiesta.</p>';
                    }
                }, 500);
                showToast('success', 'Eliminazione completata', 'La richiesta è stata eliminata con successo');
            } catch (error) {
                showToast('error', 'Errore', error.message);
            } finally {
                deleteModal.style.display = 'none';
                confirmDeleteBtn.removeEventListener('click', handleConfirmDelete);
            }
        }

        confirmDeleteBtn.addEventListener('click', handleConfirmDelete);

        const closeModal = () => {
            deleteModal.style.display = 'none';
            confirmDeleteBtn.removeEventListener('click', handleConfirmDelete);
        };
        
        deleteModal.querySelector('.close').addEventListener('click', closeModal);
        deleteModal.querySelector('#cancelDelete').addEventListener('click', closeModal);
    }

    container.addEventListener('click', async (event) => {
        const requestCard = event.target.closest('.request-card');
        if(!requestCard) return;

        const handlers = {
            '.toggle-details-btn': handleToggleDetails,
            '.save-status-btn': handleStatusUpdate,
            '.edit-btn': handleEditRequest,
            '.delete-btn': handleDeleteRequest
        }

        for(const [selector, handles] of Object.entries(handlers)) {
            if(event.target.matches(selector)) {
                await handles(event.target, requestCard);
                return;
            }
        }
    });
}

/**
 * @function setupStatuschangeListeners
 * @description Imposta gli event listener per il cambio di status
 * @param {HTMLElement} container - Contenitore delle richieste
 */
function setupStatusChangeListeners(container) {
    container.addEventListener('change', (event) => {
        if(event.target.matches('.statusSelect')) {
            handleStatusChange(event.target);
        }
    });
}

/**
 * @function setupModalEventListeners
 * @description Imposta gli event listener per mostrare/nascondere il modale
 */
function setupModalEventListeners() {
    const modal = document.getElementById('editModal');
    const closeElements = [
        document.querySelector('.close'),
        document.getElementById('cancelEdit')
    ]
    
    closeElements.forEach(element => 
        element.addEventListener('click', () => modal.style.display = 'none')
    );
}

/**
 * @function setupEditFormListeners
 * @description Imposta gli event listener per il form di modifica delle richieste
 */
function setupEditFormListeners() {
    
    /**
     * @function handleSubmit
     * @description Gestisce il submit del form
     * @param {Event} e - Evento di submit
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = getFormData();
        const modal = document.getElementById('editModal');

        try {
            await updateRequest(formData);
            showToast('success', 'Modifica effettuata', 'Richiesta aggiornata con successo');
            modal.style.display = 'none';
            await refreshRequests();
        } catch (error) {
            showToast('error', 'Errore', error.message);
        }
    }

    document.getElementById('editForm').addEventListener('submit', handleSubmit);
}

/**
 * @function setupFilterEventListeners
 * @description Imposta gli event listener per i filtri
 */
function setupFilterEventListeners() {
    const filterForm = document.getElementById('filterForm');
    filterForm.addEventListener('input', async (event) => {
        try {
            let requests = [];
            const select = filterForm.querySelector('#status');
            const selectedStatus = filterForm.querySelector('#status').value;
            if(selectedStatus !== "all") {
                requests = await getRequestsByStatus(selectedStatus);
            } else {
                requests = await getAllRequests();
            }
            const filteredRequests = applyFilters(requests);
            populateRequests(filteredRequests);
        } catch (error) {
            showToast('error', 'Errore', error.message);
        }
    });
}

/**
 * @function setupEventListeners
 * @description Imposta gli event listener per le card delle richieste
 * @param {HTMLElement} container - Contenitore delle richieste
 */
function setupEventListeners(container) {
    setupCardEventListeners(container);
    setupStatusChangeListeners(container);
    setupModalEventListeners();
    setupEditFormListeners();
    setupFilterEventListeners();
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

/**
 * @function applyFilters
 * @description Applica i filtri alle richieste
 * @param {Array} requests - Array di richieste
 * @returns {Array} - Array di richieste filtrate
 */
function applyFilters(requests) {
    const filterForm = document.getElementById('filterForm');
    const search = filterForm.querySelector('#search').value.toLowerCase();
    const tipo = filterForm.querySelector('input[name="tipo"]:checked')?.value || 'all';
    const status = filterForm.querySelector('#status').value;

    return requests.filter(request => {
        const matchesSearch =
            request.nome.toLowerCase().includes(search) ||
            request.cognome.toLowerCase().includes(search) ||
            request.organizzazione.toLowerCase().includes(search) ||
            request.email.toLowerCase().includes(search) ||
            request.testo.toLowerCase().includes(search) ||
            (request.laboratori && 
                request.laboratori.toLowerCase().replace(/_/g, ' ').includes(search));

        const matchesTipo = tipo === 'all' || request.tipo.toLowerCase() === tipo;
        const matchesStatus = status === 'all' || request.status === status;
        return matchesSearch && matchesTipo && matchesStatus;
    });
}

/**
 * @function extractRequestDataFromCard
 * @description Estrae i dati della richiesta dalla card
 * @param {HTMLElement} card - Card della richiesta
 * @returns {Object} - Dati della richiesta
 */
function extractRequestDataFromCard(card) {
    const id = card.dataset.id;
    const tipo = card.querySelector('.card-info-tipo').textContent.toLowerCase();
    const status = card.querySelector('.statusSelect').dataset.originalStatus;
    
    // Dati personali
    const titleText = card.querySelector('.basic-info-title').textContent;
    const nome = card.querySelector('.firstname').textContent;
    const cognome = card.querySelector('.lastname').textContent;
    const org = card.querySelector('.organization').textContent;
    const email = card.querySelector('a[href^="mailto:"]').textContent;
    const numero = card.querySelector('.number').textContent.trim();
    
    // Testo messaggio
    const testo = card.querySelector('.message').textContent;
    
    const requestData = {
        id,
        tipo,
        status,
        nome,
        cognome,
        organizzazione: org || '',
        email,
        numero,
        testo
    };
    
    // Dati Prenotazione
    if(tipo === 'prenotazione') {
        const details = card.querySelector('.request-details');
        requestData.dataInizio = details.querySelector('.dataInizio').textContent;
        requestData.dataFine = details.querySelector('.dataFine').textContent;
        requestData.laboratori = Array.from(details.querySelectorAll('.lab-name'))
            .map(lab => lab.textContent.replace(/ /g, '_')).join(',');
        requestData.tipologia = details.querySelector('.tipologia').textContent;
        
        if(requestData.tipologia === 'SOGGIORNO') {
            requestData.numeroGiorni = details.querySelector('.data').textContent;
        } else {
            requestData.fasciaOraria = details.querySelector('.data').textContent;
        }
    }
    return requestData;
}

/**
 * @function initEditModal
 * @description Inizializza il modale di modifica della richiesta
 * @param {Object} data - Dati della richiesta
 */
function initEditModal(data) {
    const modal = document.getElementById('editModal');
    
    // Popola campi base
    document.getElementById('editId').value = data.id;
    document.getElementById('editTipo').value = data.tipo;
    document.getElementById('editStatus').value = data.status;
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

/**
 * @function formatDateForInput
 * @description Formatta la data per l'input
 * @param {string} dateString - Data in formato stringa
 * @returns {string} - Data in formato YYYY-MM-DD
 */
function formatDateForInput(dateString) {
    const [day, month, year] = dateString.split('/');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

/**
 * @function getFormData
 * @description Ottiene i dati del form
 * @returns {Object} - Dati del form
 */
function getFormData() {
    const formData = {
        id: document.getElementById('editId').value,
        status: document.getElementById('editStatus').value,
        nome: document.getElementById('editNome').value,
        cognome: document.getElementById('editCognome').value,
        organizzazione: document.getElementById('editOrganizzazione').value,
        email: document.getElementById('editEmail').value,
        numero: document.getElementById('editNumero').value
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
 * @function stickyFilters
 * @description Gestisce il comportamento della UI del blocco filtri
 */
function stickyFilters() {
    const header = document.querySelector('.requests-list-header');
    
    window.addEventListener('scroll', () => {
        if (!header) return; 
        const headerRect = header.getBoundingClientRect();
        const isStuck = headerRect.top <= 64;
        header.classList.toggle('is-stuck', isStuck);
    });  
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
    } catch (error) {
        showToast('error', 'Errore', error.message);
    }
}

// Inizializza la pagina
document.addEventListener('DOMContentLoaded', () => {
    initRequests();
    stickyFilters();
});