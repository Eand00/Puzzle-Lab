import { getAllRequests, updateRequestStatus, deleteRequest, updateRequest } from '../services/requests.service.js';


async function initRequests() {
    try {
        const requests = await getAllRequests();
        populateRequests(requests);
    } catch (error) {
        const toast = document.querySelector('toast-component');
        toast.showToast('error', 'Errore', error.message);
        }
}

function populateRequests(requests) {
    const requestsContainer = document.getElementById('requests');

    if (!requests.length) {
        requestsContainer.innerHTML = '<p>Nessuna richiesta recente</p>';
        return;
    }

    requestsContainer.innerHTML = requests.map(request => `
        <div class="request">
            <div class="basic-info">
                <h3>Da: ${request.cognome} ${request.nome} ${request.organizzazione}</h3>
                <p>E-mial: ${request.email}</p>
                <p>Telefono: ${request.numero}</p>
                <p>Data creazione: ${new Date(request.dataCreazione).toLocaleDateString()}</p>
                <p>Status: ${request.status}</p>
                <p>Tipo: ${request.tipo}</p>

                <select class="statusSelect">
                    <option value="RICEVUTA" ${request.status === 'RICEVUTA' ? 'selected' : ''}>Ricevuta</option>
                    <option value="PRESA_IN_CARICO" ${request.status === 'PRESA_IN_CARICO' ? 'selected' : ''}>In carico</option>
                    <option value="CONFERMATA" ${request.status === 'CONFERMATA' ? 'selected' : ''}>Confermata</option>
                    <option value="RIFIUTATA" ${request.status === 'RIFIUTATA' ? 'selected' : ''}>Rifiutata</option>
                    <option value="ARCHIVIATA" ${request.status === 'ARCHIVIATA' ? 'selected' : ''}>Archiviata</option>
                </select>
                
                <button class="expand-btn" >
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path d="M7 10l5 5 5-5z"/>
                    </svg>
                </button>
            </div>
            <div class="request-details">
                <p>Note: ${request.testo}</p>
                ${request.tipo === 'prenotazione' ? `
                    <p>Inizio disponibilità: ${new Date(request.dataInizio).toLocaleDateString()}</p>
                    <p>Fine disponibilità: ${new Date(request.dataFine).toLocaleDateString()}</p>
                    <p>Laboratori: ${request.laboratori.replace(/,([^ ])/g, ', $1')}</p>
                    <p>Tipologia: ${request.tipologia}</p>
                    ${request.tipologia === 'SOGGIORNO' ? `
                        <p>Numero giorni: ${request.numeroGiorni}</p>
                    ` : `
                        <p>Fascia Oraria: ${request.fasciaOraria}</p>
                    `}
                ` : ''}
                <button class="delete-btn">Elimina</button>
                <button class="edit-btn">Modifica</button>
            </div>
        </div>
    `);



    const expandButton = document.querySelectorAll('.expand-btn');
    expandButton.forEach((button, index) => {
        button.addEventListener('click', () => {
            const requestDetails = button.parentElement.nextElementSibling; 
            requestDetails.classList.toggle('visible');
        });
    });
    
}


document.addEventListener('DOMContentLoaded', initRequests);
//===============================================
