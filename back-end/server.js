const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const User = require("./models/Users");
const Event = require("./models/Events");
const path = require('path');

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "*",
};

app.use(express.static(path.join(__dirname, '../front-end')));



app.use(cors(corsOptions));

const port = 3001;

app.post('/user', async (req, res) => {
  try {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
      await User.create({ username, email, password });
      res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
  }
});


app.post('/login', async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email, password } });

      if (!user) {
          return res.status(401).json({ message: 'Email ou senha inválidos.' });
      }
      res.status(200).json({ message: 'Login bem-sucedido!', user: { id: user.id, email: user.email } });
  } catch (error) {
      console.error('Erro ao realizar login:', error);
      res.status(500).json({ message: 'Erro ao realizar login.' });
  }
});


app.post('/events', async (req, res) => {
  try {
    const newEvent = await Event.create(req.body)
    res.status(201).json(newEvent)
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar evento' });
  }
});

app.get('/events/:userId', async (req, res) => {

  try {
    const UserId = req.params.userId
    const events = await Event.findAll({ where: { UserId: UserId } });
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao encontrar Id' });
  }
});

app.patch('/events/:eventId', async(req, res) => {
  try {
    const eventId = req.params.eventId
    const events =  await Event.findOne({ where: { id: eventId } });
    events.update(req.body);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.delete('/events/:eventId', async (req, res) => {
  try {
    const eventId= req.params.eventId
    const event = await Event.findOne({ where: { id: eventId } })
    event.destroy();
  } catch (error) {
    res.status(400).json({ error: 'Não foi possível deletar evento' });
  }
});

app.get('/eventos/:userId', async(req, res) => {
  try {
    const userId = req.params.userId
    const events = await Event.findAll({ where: { userId: userId } })
    res.status(200).json(events)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log("Servidor Rodando na url http://localhost:" + port);
  });
});
