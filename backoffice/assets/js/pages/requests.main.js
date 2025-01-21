
// API URL
const API_BASE_URL = 'http://localhost:8080/back-office/richieste';


// Fetch dei dati
fetch(API_BASE_URL)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const richiesteContainer = document.getElementById('requests');
        const statusSelect = document.getElementById('status');
        const searchInput = document.getElementById('search');
        const tipoRadios = document.querySelectorAll('input[name="tipo"]');

        function mostraRichieste() {
            const statusFiltro = statusSelect.value;
            const testoFiltro = searchInput.value.toLowerCase();
            const tipoFiltro = [...tipoRadios].find(radio => radio.checked).value;
            richiesteContainer.innerHTML = '';

            // Filtra i dati in base allo stato selezionato
            const richiesteFiltrate = data.filter(item => {
                const corrispondeStatus = !statusFiltro || item.status.toLowerCase() === statusFiltro;
                const corrispondeTesto = !testoFiltro || (
                    (item.nome || '').toLowerCase().includes(testoFiltro) ||
                    (item.cognome || '').toLowerCase().includes(testoFiltro) ||
                    (item.email || '').toLowerCase().includes(testoFiltro) ||
                    (item.organizzazione || '').toLowerCase().includes(testoFiltro) // Aggiunto il filtro per organizzazione
                );
                const corrispondeTipo = !tipoFiltro || item.tipo === tipoFiltro;
                return corrispondeStatus && corrispondeTesto && corrispondeTipo;
            });

            // Popola il contenitore con le richieste filtrate
            richiesteFiltrate.forEach(item => {
                const richiesta = document.createElement('details');
                richiesta.className = 'request';
                richiesta.innerHTML = `
                <summary>
                    <h5>Tipo: ${item.tipo || 'N/A'}</h5>
                    <p>Da: ${item.nome || 'N/A'} ${item.cognome || 'N/A'}</p>
                    <p>email: ${item.email || 'N/A'}</p>
                    <p>organizzazione: ${item.organizzazione || 'N/A'}</p>
                    <p>status: ${item.status || 'N/A'}</p>
                </summary>
                `;

                const details = document.createElement('div');
                details.className = 'details';
                details.innerHTML = `
                    <p>numero: ${item.numero || 'N/A'}</p>
                    <p>data: ${item.dataCreazione || 'N/A'}</p>
                `;
                
                if(item.tipo === "prenotazione") {
                    details.innerHTML += `
                        <p>Inizio disponibilità: ${item.dataInizio || 'N/A'}</p>
                        <p>Fine disponibilità: ${item.dataFine || 'N/A'}</p>
                    `;
                } else {
                    details.innerHTML += `
                        <p>Testo: ${item.testo || 'N/A'}</p>
                    `;
                }
                
                richiesta.appendChild(details);
                richiesteContainer.appendChild(richiesta);
            });
        }

        // Event listener per il menu a tendina
        statusSelect.addEventListener('change', mostraRichieste);
        searchInput.addEventListener('input', mostraRichieste);
        tipoRadios.forEach(radio => radio.addEventListener('change', mostraRichieste));

        // Mostra tutte le richieste all'inizio
        mostraRichieste();
    })
    .catch(error => {
        console.error('Errore durante il fetch dei dati:', error);
    });

