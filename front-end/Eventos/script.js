const criarEvento = async (event) => {
    try {
        const response = await fetch('http://localhost:3001/events', { // Verifique a URL
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event)
        });
        return response.json();
    } catch (error) {
        alert(error);
    }
}

const deleteEvento = async (eventId) => {
    try {
        await fetch(`http://localhost:3001/events/${eventId}`, { // Corrigido o URL
            method: 'DELETE',
        });
    } catch (error) {
        alert(error);
    }
}

const updateEvento = async (eventId, eventUpdate) => {
    try {
        await fetch(`http://localhost:3001/events/${eventId}`, { // Corrigido o URL
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventUpdate)
        });
    } catch (error) {
        alert(error);
    }
}

const getEvento = async (userId) => {
    try {
        const response = await fetch(`http://localhost:3001/events/${userId}`); // Corrigido o URL
        return response.json();
    } catch (error) {
        alert(error);
    }
}

const userJson = localStorage.getItem("user");

const irParaLogin = () => {
    window.location.href = '/Login/login.html'; // Corrigido o caminho
}

if (!userJson) {
    irParaLogin();
}

const user = JSON.parse(userJson);

const SairBtn = document.getElementById('btn-sair');
const CriarEvtBtn = document.getElementById('criar-ent');
const CriarEvtInput = document.getElementById('floatingTextarea');
const EventoLista = document.getElementById('criar-evn');

SairBtn.addEventListener('click', () => {
    localStorage.removeItem("user");
    irParaLogin();
});

CriarEvtBtn.addEventListener('click', async () => {
    const title = CriarEvtInput.value;
    await criarEvento({ title, completed: false, userId: user.id });
    window.location.reload();
});

getEvento(user.id).then(events => {
    for (const event of events) {
        const liElement = document.createElement('li');
        liElement.className = 'main';

        const checkAndTitleEl = document.createElement('div');
        checkAndTitleEl.className = 'mostrar-evt';

        const checkEl = document.createElement('input');
        checkEl.type = 'checkbox';
        checkEl.checked = event.completed ? "checked" : "";
        checkEl.className = 'form-check-input';

        checkEl.addEventListener('click', async () => {
            await updateEvento(event.id, { completed: !event.completed });
            window.location.reload();
        });

        const titleEl = document.createElement('p');
        titleEl.textContent = event.title;

        const deleteEl = document.createElement('button');
        deleteEl.className = 'btn btn-danger';
        deleteEl.textContent = 'Deletar';

        deleteEl.addEventListener('click', async () => {
            await deleteEvento(event.id);
            window.location.reload();
        });

        checkAndTitleEl.appendChild(checkEl);
        checkAndTitleEl.appendChild(titleEl);

        liElement.appendChild(checkAndTitleEl);
        liElement.appendChild(deleteEl);

        EventoLista.appendChild(liElement);
    }
});
