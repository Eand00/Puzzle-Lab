
// API URL
const API_BASE_URL = 'http://localhost:8080/back-office/';


// Fetch dei dati
fetch(API_BASE_URL+'richieste')
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

            // Filtra i dati in base ai filtri selezionati
            const richiesteFiltrate = data.filter(item => {
                const corrispondeStatus = !statusFiltro || item.status === statusFiltro;
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
                const richiesta = document.createElement('div');
                const proprieta = document.createElement('details');
                richiesta.className = 'request';
                proprieta.innerHTML = `
                <summary>
                    <h5>Tipo: ${item.tipo || 'N/A'}</h5>
                    <p>Da: ${item.nome || 'N/A'} ${item.cognome || 'N/A'}</p>
                    <p>email: ${item.email || 'N/A'}</p>
                    <p>organizzazione: ${item.organizzazione || 'N/A'}</p>
                    <select id="status" name="status">
                        <option value="RICEVUTA">Ricevuta</option>
                        <option value="PRESA_IN_CARICO">Presa in carico</option>
                        <option value="CONFERMATA">Confermata</option>
                        <option value="RIFIUTATA">Rifiutata</option>
                    </select>
                </summary>
                `;

                const details = document.createElement('div');
                details.className = 'details';
                details.innerHTML = `
                    <p>numero: ${item.numero || 'N/A'}</p>
                    <p>data: ${item.dataCreazione || 'N/A'}</p>
                    <p>Testo: ${item.testo || 'N/A'}</p>
                `;
                
                if(item.tipo === "prenotazione") {
                    details.innerHTML += `
                        <p>Inizio disponibilità: ${item.dataInizio || 'N/A'}</p>
                        <p>Fine disponibilità: ${item.dataFine || 'N/A'}</p>
                    `;
                }
                
                // pulsante modifica
                const modificaButton = document.createElement('button');
                modificaButton.textContent = 'Modifica';
                modificaButton.addEventListener('click', () => modificaRichiesta(item, richiesta));
                details.appendChild(modificaButton);

                // pulsante cancella
                const cancellaButton = document.createElement('button');
                cancellaButton.textContent = 'Cancella';
                cancellaButton.addEventListener('click', () => cancellaRichiesta(item, richiesta));
                details.appendChild(cancellaButton);

                proprieta.appendChild(details);
                richiesta.appendChild(proprieta);
                richiesteContainer.appendChild(richiesta);
            });
        }


        function cancellaRichiesta(item, richiesta) {
            const conferma = confirm(`Sei sicuro di voler cancellare la richiesta "${item.id}"?`);
            if (!conferma) return;
        
            fetch(API_BASE_URL + 'richieste', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item.id)
            })
            .then(response => {
                // Controlla se la risposta ha uno status di successo
                if (!response.ok) {
                    // Estrai il testo dell'errore per mostrarlo all'utente
                    return response.text().then(errorMessage => {
                        throw new Error(errorMessage);
                    });
                }
                return response.text(); // Testo del messaggio di successo
            })
            .then(successMessage => {
                alert(successMessage); // Mostra il messaggio di successo
            
                // Rimuove la richiesta dal DOM
                richiesta.remove();
            })
            .catch(error => {
                console.error('Errore durante la cancellazione:', error);
                alert(`Si è verificato un errore: ${error.message}`);
            });
            
        }
        

        function modificaRichiesta(item, richiesta) {
            // Sostituisci il contenuto di `details` con un form
            richiesta.innerHTML = `
                <form class="edit-form">
                    <label>
                        Nome:
                        <input type="text" name="nome" value="${item.nome || ''}">
                    </label>
                    <label>
                        Cognome:
                        <input type="text" name="cognome" value="${item.cognome || ''}">
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" value="${item.email || ''}">
                    </label>
                    <label>
                        Organizzazione:
                        <input type="text" name="organizzazione" value="${item.organizzazione || ''}">
                    </label>
                    <label>
                        Numero:
                        <input type="text" name="numero" value="${item.numero || ''}">
                    </label>
                    <label>
                        Testo:
                        <textarea name="testo">${item.testo || ''}</textarea>
                    </label>
                    ${item.tipo === "prenotazione" ? `
                        <label>
                            Inizio disponibilità:
                            <input type="date" name="dataInizio" value="${item.dataInizio ? new Date(item.dataInizio).toISOString().split('T')[0] : ''}">
                        </label>
                        <label>
                            Fine disponibilità:
                            <input type="date" name="dataFine" value="${item.dataFine ? new Date(item.dataFine).toISOString().split('T')[0] : ''}">
                        </label>
                    ` : ''}
                    <button type="button" class="save-button">Salva</button>
                    <button type="button" class="cancel-button">Annulla</button>
                </form>
            `;
                
            
            const saveButton = richiesta.querySelector('.save-button');
            const cancelButton = richiesta.querySelector('.cancel-button');

            saveButton.addEventListener('click', () => salvaModifiche(item, richiesta));
            cancelButton.addEventListener('click', () => mostraRichieste());
        }

        

        function salvaModifiche(item, richiesta) {
            const form = richiesta.querySelector('.edit-form');
            const formData = new FormData(form);
            
            // Crea un oggetto con i dati modificati
            const updatedData = {
                tipo: item.tipo,
                id: item.id,
                nome: form.elements['nome'].value,
                cognome: form.elements['cognome'].value,
                email: form.elements['email'].value,
                organizzazione: form.elements['organizzazione'].value,
                numero: form.elements['numero'].value,
                dataCreazione: item.dataCreazione,
                cancellato: false,
                dataPrevistaCancellazione: null,
                status: item.status,
                testo: form.elements['testo'].value
            };
            if (item.tipo === 'prenotazione') {
                const dataInizioValue = form.elements['dataInizio'].value; // formato yyyy-MM-dd
                const dataFineValue = form.elements['dataFine'].value; // formato yyyy-MM-dd
            
                if (dataInizioValue) {
                    updatedData.dataInizio = new Date(dataInizioValue).toISOString(); // Converte in formato ISO completo
                }
            
                if (dataFineValue) {
                    updatedData.dataFine = new Date(dataFineValue).toISOString(); // Converte in formato ISO completo
                }
            }
            
            console.log('Dati aggiornati da inviare:', updatedData);
            for (const key in updatedData) {
                if (updatedData.hasOwnProperty(key)) {
                    console.log(`${key}: ${updatedData[key]}`);
                }
            }
        
            const API_URL = API_BASE_URL + (item.tipo === 'prenotazione' ? 'prenotazioni' : 'informazioni');
             // Invio dati aggiornati all'API
            fetch(API_URL, {
                method: 'PUT', // Metodo coerente con l'endpoint
                headers: {
                    'Content-Type': 'application/json', // Specifica il tipo di contenuto
                },
                body: JSON.stringify(updatedData) // Converte l'oggetto updatedData in una stringa JSON
            })
            .then(response => {
                console.log('Status della risposta:', response.status);
                console.log('Tipo di contenuto:', response.headers.get('Content-Type'));
            
                // Controlla lo stato della risposta
                if (!response.ok) {
                    return response.text().then(errorMessage => {
                        throw new Error(errorMessage); // Solleva un errore con il messaggio ricevuto dal backend
                    });
                }
                return response.text(); // Legge il messaggio di successo dal corpo della risposta
            })
            .then(successMessage => {
                console.log('Risposta dal server:', successMessage);
                alert(successMessage); // Mostra il messaggio di successo all'utente
            })
            .catch(error => {
                console.error('Errore durante l\'invio dei dati all\'API:', error);
                alert(`Si è verificato un errore: ${error.message}`); // Mostra il messaggio di errore
            });            
            mostraRichieste();
        }
        
        statusSelect.addEventListener('change', mostraRichieste);
        searchInput.addEventListener('input', mostraRichieste);
        tipoRadios.forEach(radio => radio.addEventListener('change', mostraRichieste));

        mostraRichieste();
    })
    .catch(error => {
        console.error('Errore durante il fetch dei dati:', error);
    });

