const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado com o banco de dados.");
  } catch (e) {
    console.log("ERROR", e);
  }
};

testConnection();

module.exports = sequelize;
