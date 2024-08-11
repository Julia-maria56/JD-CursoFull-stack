const sequelize = require('./db');
const User = require('./models/Users');
const Event = require('./models/Events');

async function syncDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database sincronizada com sucesso');
  } catch (error) {
    console.error('Erro ao sincronizar database', error);
  }
}

syncDatabase();
