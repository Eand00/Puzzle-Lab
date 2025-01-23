import { getRequestStats, getRecentRequests } from '../services/requests.service.js';
import { logout } from '../services/auth.service.js';

/**
 * Populates recent requests list
 * @param {Array} requests - Array of recent requests
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
                            <span class="request-id">#${request.id}</span>
                            <span class="status-badge ${request.status.toLowerCase()}">${request.nome} ${request.cognome} || ${request.organizzazione}</span>
                        </div>
                        <button class="expand-btn" onclick="this.closest('.request-card').setAttribute('data-expanded', this.closest('.request-card').getAttribute('data-expanded') === 'true' ? 'false' : 'true')">
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
}

/**
 * @function updateDashboardStats
 * @param {Object} stats - Dashboard statistics
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
 * @function setupEventListeners
 * @description Setup event listeners for the page
 */
function setupEventListeners() {
    document.addEventListener('logout', () => {
        logout();
    });
}

/**
 * @function initDashboard
 * @description Initializes dashboard components
 */
async function initDashboard() {
    try {
        setupEventListeners();
        const stats = await getRequestStats();
        updateDashboardStats(stats);

        const recentRequests = await getRecentRequests();
        populateRecentRequests(recentRequests);
    } catch (error) {
        const toast = document.querySelector('toast-component');
        toast.showToast('error', 'Errore', error.message);
    }
}

document.addEventListener('DOMContentLoaded', initDashboard);