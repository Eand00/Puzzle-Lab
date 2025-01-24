
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
                const summary = document.createElement('summary');
                richiesta.className = 'request';
                summary.innerHTML = `
                    <h5>Tipo: ${item.tipo || 'N/A'}</h5>
                    <p>Da: ${item.nome || 'N/A'} ${item.cognome || 'N/A'}</p>
                    <p>email: ${item.email || 'N/A'}</p>
                    <p>organizzazione: ${item.organizzazione || 'N/A'}</p>
                    <p id="data">data: ${item.dataCreazione ? formattaData(item.dataCreazione) : ''}</p>
                `;

                // modifica status
                const modificaStatus = document.createElement('div');
                modificaStatus.innerHTML = `
                    <select class="statusSelect" name="status"> 
                        <option value="RICEVUTA" ${item.status === 'RICEVUTA' ? 'selected' : ''}>Ricevuta</option>
                        <option value="PRESA_IN_CARICO" ${item.status === 'PRESA_IN_CARICO' ? 'selected' : ''}>Presa in carico</option>
                        <option value="CONFERMATA" ${item.status === 'CONFERMATA' ? 'selected' : ''}>Confermata</option>
                        <option value="RIFIUTATA" ${item.status === 'RIFIUTATA' ? 'selected' : ''}>Rifiutata</option>
                    </select>
                    `;
                modificaStatus.addEventListener('change', () => updateStatus(item, richiesta));
                summary.appendChild(modificaStatus);

                const details = document.createElement('details');
                details.innerHTML = `
                    <p>numero: ${item.numero || 'N/A'}</p>
                    <p>Testo: ${item.testo || 'N/A'}</p>
                `;
                
                if(item.tipo === "prenotazione") {
                    details.innerHTML += `
                        <p>Inizio disponibilità: ${item.dataInizio ? formattaData(item.dataInizio) : 'N/A'}</p>
                        <p>Fine disponibilità: ${item.dataFine ? formattaData(item.dataFine) : 'N/A'}</p>
                        <p>Laboratori: ${formattaStringa(item.laboratori)}</p>
                        <p>Tipologia: ${formattaStringa(item.tipologia)}</p>
                    `;
                    if(item.tipologia === "SOGGIORNO"){
                        details.innerHTML += `
                        <p>Numero Giorni: ${item.numeroGiorni || 'N/A'}</p>
                        `;
                    } else {
                        details.innerHTML += `
                        <p>Fascia oraria: ${formattaStringa(item.fasciaOraria)}</p>
                        `;
                    }
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

                summary.appendChild(details);
                richiesta.appendChild(summary);
                richiesteContainer.appendChild(richiesta);
            });
        }

        function formattaStringa(stringa) {
            if (!stringa) return 'N/A';
            return stringa.split(',') // Dividi la stringa in base alla virgola
                .map(lab => lab
                    .toLowerCase() // Trasforma tutto in minuscolo
                    .replace(/_/g, ' ') // Sostituisci gli underscore con spazi
                    .replace(/\b\w/g, char => char.toUpperCase()) // Metti in maiuscolo le iniziali
                )
                .join(', '); // Riconcatena gli elementi con una virgola e uno spazio
        }

        function formattaData(dateString) {
            const [year, month, day] = new Date(dateString).toISOString().split('T')[0].split('-');
            return `${day}-${month}-${year}`;
        }

        function updateStatus(item, richiesta) {
            const select = richiesta.querySelector('.statusSelect');
            const newStatus = select.value; // Ottieni il valore selezionato dal dropdown
            const id = item.id; // ID dell'oggetto originale
            const url = API_BASE_URL+`richieste/status?id=${id}&status=${newStatus}`;
            console.log(url);
            // Effettua la richiesta PUT per aggiornare lo stato
            fetch(API_BASE_URL+`richieste/status?id=${id}&status=${newStatus}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then((response) => {
                if (response.ok) {
                  return response.json();
                } else {
                  throw new Error(`Errore nella modifica dello stato: ${response.status}`);
                }
              })
              .then((updatedItem) => {
                console.log('Stato aggiornato con successo:', updatedItem);
          
                // Aggiorna l'oggetto originale localmente
                item.status = newStatus;
              })
              .catch((error) => {
                console.error('Errore nella richiesta:', error);
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
                            <input type="date" name="dataInizio" value="${item.dataInizio}">
                        </label>
                        <label>
                            Fine disponibilità:
                            <input type="date" name="dataFine" value="${item.dataFine}">
                        </label>
                        <label>
                            Laboratori:
                            <input type="text" name="laboratori" value="${item.laboratori || ''}">
                        </label>
                        <label>
                            Tipologia:
                            <select name="tipologia"> 
                                <option value="VISITA" ${item.tipologia === 'VISITA' ? 'selected' : ''}>Visita</option>
                                <option value="SOGGIORNO" ${item.tipologia === 'SOGGIORNO' ? 'selected' : ''}>Soggiorno</option>
                            </select>
                        </label>
                    ` : ''}
                    ${item.tipo === "prenotazione" && item.tipologia === "SOGGIORNO" ? `
                        <label>
                            Numero giorni:
                            <input type="text" name="numeroGiorni" value="${item.numeroGiorni || ''}">
                        </label>
                    ` : `
                        <label>
                            Fascia oraria:
                            <select name="fasciaOraria"> 
                                <option value="MATTINA" ${item.fasciaOraria === 'MATTINA' ? 'selected' : ''}>MATTINA</option>
                                <option value="POMERIGGIO" ${item.fasciaOraria === 'POMERIGGIO' ? 'selected' : ''}>POMERIGGIO</option>
                            </select>
                        </label>
                    `}
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
                updatedData.dataInizio = form.elements['dataInizio'].value;
                updatedData.dataFine = form.elements['dataFine'].value;
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

