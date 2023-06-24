const mongoose = require('mongoose');
const URL = 'mongodb://0.0.0.0:27017/subscriber';
const db = mongoose.connect(URL);
const con = mongoose.connection;
const clientModel = require("../models/clientModel");
const clientes = require("./cliente.json");

async function carregarDados() {
  try {
    await clientModel.deleteMany({});
    for (const cli of clientes) {
      await clientModel.create(cli);
    }
    
  } catch (err) {
    console.log(err);
  } finally {
    return;
    process.exit();
  }
}
con.on('open', async function () {
  try {
    await carregarDados();
    console.log('Conectado ao MongoDB!');
  } catch (error) {
    console.log('Erro ao conectar e carregar dados:', error);
  }
});

con.on('error', function () {
  console.log('Erro na conexão com o MongoDB!');
});

con.on('close', function () {
  console.log('Desconetado do MongoDB!');
});

module.exports = db;
