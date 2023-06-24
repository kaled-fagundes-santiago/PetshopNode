require("./mongodb");
const mongoose = require("mongoose");
const clientModel = require("../models/clientModel");
const clientes = require("./cliente.json");

async function carregarDados() {
  try {
    await clientModel.deleteMany({});
    for (const cli of clientes) {
      await clientModel.create(cli);
    }
    console.log("Carga de sub feita!");
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
}

carregarDados();
