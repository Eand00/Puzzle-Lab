/**
 * @file index.main.js
 * @version 1.0.0
 * @author Puzzle Lab
 * @contributors Bonura Vincenzo, Eand Avdiu
 * @date 2025-01-15
 * @update 2025-01-25
 * @description Script per la pagina index
 * @see README.md per ulteriori informazioni
 */

import { getRequestStats, getAllRequests, getRequestsByStatus } from '../services/requests.service.js';
import { showToast } from '../utils/toast.util.js';


/**
 * @function populateRecentRequests
 * @description Popola la lista delle richieste recenti
 * @param {Array} requests - Array di richieste recenti
 */
function populateRecentRequests(requests) {
    const container = document.querySelector('.requests-list');
    
    if (!requests.length) {
        container.innerHTML = '<p>Nessuna richiesta recente</p>';
        return;
    }

    container.innerHTML = `
        <div class="requests-grid">
            ${requests.map(request => `
                <div class="request-card" data-expanded="false">
                    <div class="request-card-header">
                        <div class="request-basic-info">
                            <div class="row-1">
                                <span class="request-id">#${request.id}</span>
                                <span class="request-type ${request.tipo.toLowerCase()}">${request.tipo.charAt(0).toUpperCase() + request.tipo.slice(1)}</span> | 
                                <span class="request-date">${new Date(request.dataCreazione).toLocaleDateString()}</span>
                            </div>
                            <div class="row-2">
                                <span class="status-badge ${request.status.toLowerCase()}">${request.nome} ${request.cognome} || ${request.organizzazione}</span>
                            </div>
                        </div>
                        <button class="expand-btn">
                            <svg viewBox="0 0 24 24" width="24" height="24">
                                <path d="M7 10l5 5 5-5z"/>
                            </svg>
                        </button>
                    </div>

                    <div class="request-card-content">
                        <div class="request-info">
                            <p><strong>Nome:</strong> ${request.nome} ${request.cognome}</p>
                            <p><strong>Email:</strong> ${request.email}</p>
                            <p><strong>Organizzazione:</strong> ${request.organizzazione}</p>
                            <p><strong>Numero:</strong> ${request.numero}</p>
                            <p><strong>Data:</strong> ${new Date(request.dataCreazione).toLocaleDateString()}</p>
                            <p><strong>Tipo:</strong> ${request.tipo}</p>
                        </div>

                        <div class="request-details">
                            ${request.tipo === 'informazione' ? `
                                <div class="info-request-details">
                                    <p><strong>Testo:</strong> ${request.testo}</p>
                                </div>
                            ` : request.tipo === 'prenotazione' ? `
                                <div class="booking-request-details">
                                    <p><strong>Data Inizio:</strong> ${new Date(request.dataInizio).toLocaleString()}</p>
                                    <p><strong>Data Fine:</strong> ${new Date(request.dataFine).toLocaleString()}</p>
                                    <p><strong>Testo:</strong> ${request.testo}</p>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    document.querySelectorAll('.expand-btn').forEach(button => {
        button.addEventListener('click', () => toggleRequestCard(button));
    });
}

/**
 * @function toggleRequestCard
 * @description Attiva o disattiva la visualizzazione dei dettagli della richiesta
 * @param {HTMLElement} button - Bottone che ha attivato la funzione
 */
function toggleRequestCard(button) {
    const card = button.closest('.request-card');
    const toggleStatus = card.getAttribute('data-expanded');
    if(toggleStatus === 'false') {
        document.querySelectorAll('.request-card').forEach(card => {
            card.setAttribute('data-expanded', 'false');
        });
    }
    
    card.setAttribute('data-expanded', toggleStatus === 'false' ? 'true' : 'false');

    
}

/**
 * @function updateDashboardStats
 * @description Aggiorna le statistiche della dashboard
 * @param {Object} stats - Oggetto contenente le statistiche
 */
function updateDashboardStats(stats) {
    const statsElements = {
        ricevute: document.querySelector('.stat-card:nth-child(1) .stat-number'),
        inCarico: document.querySelector('.stat-card:nth-child(2) .stat-number'),
        rifiutate: document.querySelector('.stat-card:nth-child(3) .stat-number'),
        completate: document.querySelector('.stat-card:nth-child(4) .stat-number'),
        totali: document.querySelector('.stat-card.total .stat-number')
    };

    Object.entries(statsElements).forEach(([key, element]) => {
        element.textContent = stats[key] || '-';
    });
}

/**
 * @function initDashboard
 * @description Inizializza i componenti della dashboard
 */
async function initDashboard() {
    try {
        const stats = await getRequestStats();
        updateDashboardStats(stats);
        const requests = await getRequestsByStatus('RICEVUTA');

        //ordina dal più recente
        requests.sort((a, b) => new Date(b.id) - new Date(a.id));

        //prende le 10 più recenti
        const recentRequests = requests.length > 10 ? requests.slice(0, 10) : requests;
        populateRecentRequests(recentRequests);
    } catch (error) {
        showToast('error', 'Errore', error.message);
    }
}

document.addEventListener('DOMContentLoaded', initDashboard);