const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  codigo: {
    type: Number,
    unique: true,
    required: false
  },
  nome: {
    type: String,
    required: true
  },
  telefone: {
    type: String,
    required: true
  },
  endereco: {
    type: String,
    required: true
  },
  nomeCartao: {
    type: String,
    required: true
  },
  numeroCartao: {
    type: String,
    required: true
  },
  cvv: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  imagemPerfil: {
    data: {
      type: Buffer
    },
    contentType: {
      type: String
    }
  }
});

module.exports = mongoose.model('Client', clientSchema);
