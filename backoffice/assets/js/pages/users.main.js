// JavaScript per mostrare o nascondere il modulo
document.addEventListener("DOMContentLoaded", () => {
    const addUserBtn = document.getElementById('addUserBtn');
    const createUserFormContainer = document.getElementById('createUserFormContainer');

    // Imposta il modulo come nascosto all'inizio
    createUserFormContainer.style.display = 'none';

    // Alterna la visibilità del modulo al clic sul pulsante
    addUserBtn.addEventListener('click', () => {
        if (createUserFormContainer.style.display === 'none') {
            createUserFormContainer.style.display = 'block';
        } else {
            createUserFormContainer.style.display = 'none';
        }
    });
});

const API_BASE_URL = "http://localhost:8080/back-office/utente";

// Funzione per ottenere tutti gli utenti
async function fetchUsers() {
    try {
        const response = await fetch(API_BASE_URL);
        if (response.ok) {
            const users = await response.json();
            renderUserTable(users);
        } else {
            console.error("Errore nel recupero degli utenti");
        }
    } catch (error) {
        console.error("Errore di rete:", error);
    }
}

// Funzione per rendere dinamica la tabella
function renderUserTable(users) {
    const userTableBody = document.getElementById("userTableBody");
    userTableBody.innerHTML = "";

    if (users.length === 0) {
        userTableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Nessun utente disponibile</td></tr>';
        return;
    }

    users.forEach(user => {
        const row = document.createElement("tr");
        row.classList.add("user-row");

        // Genera la riga della tabella
        row.innerHTML = `
            <td><span class="user-email">${user.email}</span><input type="text" class="editable" value="${user.email}" readonly data-field="email" style="display:none;"></td>
            <td><span class="user-cognome">${user.cognome}</span><input type="text" class="editable" value="${user.cognome}" readonly data-field="cognome" style="display:none;"></td>
            <td><span class="user-nome">${user.nome}</span><input type="text" class="editable" value="${user.nome}" readonly data-field="nome" style="display:none;"></td>
            <td><span class="user-ruolo">${user.ruolo || "N/A"}</span><input type="text" class="editable" value="${user.ruolo || "N/A"}" readonly data-field="ruolo" style="display:none;"></td>
            <td>
                ${
                    user.email !== "eand.avdiu@edu.itspiemonte.it" // email del super admin così non può essere eliminato e modificato
                        ? `
                            <button class="btn btn-info btn-sm edit-btn" data-email="${user.email}">Modifica</button>
                            <button class="btn btn-danger btn-sm delete-btn" data-email="${user.email}">Elimina</button>
                        `
                        : ""
                }
            </td>
        `;

        userTableBody.appendChild(row);
    });

    // Aggiungi EventListener ai pulsanti "Modifica"
    document.querySelectorAll(".edit-btn").forEach(button => {
        button.addEventListener("click", event => {
            const email = event.target.dataset.email;
            toggleEditFields(email);
        });
    });

    // Aggiungi EventListener ai pulsanti "Elimina"
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", event => {
            const email = event.target.dataset.email;
            deleteUser(email);
        });
    });
}

function toggleEditFields(email) {
    // Trova la riga dell'utente
    const row = Array.from(document.querySelectorAll('tr')).find(row => {
        return row.querySelector(`.edit-btn[data-email="${email}"]`);
    });

    // Trova tutti gli input e i dati dell'utente nella riga
    const inputs = row.querySelectorAll(".editable");
    const spans = row.querySelectorAll("span");

    // Mostra o nascondi gli input
    inputs.forEach(input => {
        // Cambia la visibilità degli input
        input.style.display = input.style.display === "none" ? "inline-block" : "none";
        // Rendi gli input modificabili solo quando il bottone "Modifica" viene cliccato
        if (input.style.display === "inline-block") {
            input.removeAttribute("readonly"); // Rendi l'input modificabile
        } else {
            input.setAttribute("readonly", true); // Rendi l'input non modificabile quando è nascosto
        }
    });

    // Mostra o nascondi i dati dell'utente
    spans.forEach(span => {
        span.style.display = span.style.display === "none" ? "inline-block" : "none";
    });

    // Cambia il testo del bottone da "Modifica" a "Salva"
    const editButton = row.querySelector(".edit-btn");
    if (editButton) {
        if (editButton.textContent === "Modifica") {
            editButton.textContent = "Salva";
        } else {
            editButton.textContent = "Modifica";
            // Quando si salva, invia la richiesta di aggiornamento
            const updatedUser = {
                email: row.querySelector('[data-field="email"]').value,
                nome: row.querySelector('[data-field="nome"]').value,
                cognome: row.querySelector('[data-field="cognome"]').value,
                ruolo: row.querySelector('[data-field="ruolo"]').value
            };
            updateUser(updatedUser);
        }
    }
}

async function updateUser(partialUser) {
    try {
        // Recupera l'utente esistente
        const response = await fetch(`${API_BASE_URL}/${partialUser.email}`);
        if (!response.ok) {
            console.error("Errore durante il recupero dell'utente esistente.");
            return;
        }

        const existingUser = await response.json();

        // Combina i campi esistenti con quelli aggiornati
        const updatedUser = {
            ...existingUser,
            ...partialUser,
        };

        // Invia l'aggiornamento
        const updateResponse = await fetch(`${API_BASE_URL}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
        });

        if (!updateResponse.ok) {
            console.error("Errore durante l'aggiornamento dell'utente.");
            alert(await updateResponse.text());
        } else {
            alert("Utente aggiornato con successo.");
        }
    } catch (error) {
        console.error("Errore di rete:", error);
    }
}

// Funzione per creare un nuovo utente
async function createUser(user) {
    try {
        const response = await fetch(API_BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        if (response.ok) {
            await fetchUsers();
        } else {
            console.error("Errore nella creazione dell'utente");
        }
    } catch (error) {
        console.error("Errore di rete durante la creazione:", error);
    }
}

// Funzione per eliminare un utente
async function deleteUser(userEmail) {
    const isConfirmed = confirm("Sei sicuro di voler eliminare questo utente?");
    if (!isConfirmed) {
        return;
    }
    try {
        const response = await fetch(API_BASE_URL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: userEmail })  
        });
        if (response.ok) {
            await fetchUsers();
            alert("Utente eliminato con successo.");
        } else {
            console.error("Errore nell'eliminazione dell'utente");
            alert("Si è verificato un errore durante l'eliminazione.");
        }
    } catch (error) {
        console.error("Errore di rete durante l'eliminazione:", error);
        alert("Errore di rete durante l'eliminazione.");
    }
}


// Event listener per il modulo di creazione
document.getElementById("createUserForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    const cognome = document.getElementById("cognome").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const ruolo = document.getElementById("ruolo").value;

    await createUser({ nome, cognome, email, password, ruolo });
});

// Carica gli utenti all'avvio
fetchUsers();
