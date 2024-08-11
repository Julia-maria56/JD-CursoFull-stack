const criarUser = async (userData) => {
    try {
        const response = await fetch('http://localhost:3001/user', { 
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

const InputNome = document.getElementById('floatingInputGroup1');
const InputEmail = document.getElementById('floatingInput');
const InputSenha = document.getElementById('floatingPassword');
const CadastrarInput = document.getElementById('btn-cadastrar');

CadastrarInput.addEventListener('click', async () => {
    const nome = InputNome.value;
    const email = InputEmail.value;
    const senha = InputSenha.value;

    if (!nome || !email || !senha) {
        return alert('Preencha todos os campos');
    }

    const userData = { username: nome, email, password: senha };
    const user = await criarUser(userData);

    if (user) {
        window.location.href = '/login/index.html'; 
    }
});
