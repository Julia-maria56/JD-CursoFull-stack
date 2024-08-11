const Logar = async (userData) => {
  try {
      const response = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(userData)
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Resposta do login:', data);
      return data;
  } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao tentar fazer login. Verifique o console para detalhes.');
  }
}

const EmailInput = document.getElementById('floatingInput');
const SenhaInput = document.getElementById('floatingPassword');
const LogarBotao = document.getElementById('logar-btn');

LogarBotao.addEventListener('click', async () => {
  const email = EmailInput.value;
  const senha = SenhaInput.value;

  if (!email || !senha) {
      return alert('Preencha todos os campos');
  }

  const userData = { email, password: senha };
  const user = await Logar(userData);

  if (user && user.message === 'Login bem-sucedido!') {
      localStorage.setItem('user', JSON.stringify(user.user));
      window.location.href = 'http://localhost:3001/front-end/Eventos/eventos.html'; 
  } else {
      alert('Email ou senha inválidos.');
  }
});
