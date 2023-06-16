const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  codigo: {
    type: Number,
    required: true,
    unique: true
  },
  nome: {
    type: String,
    required: true
  },
  imagem: {
    data: {
      type: Buffer
    },
    contentType: {
      type: String
    }
  },
  descricao: {
    type: String,
    required: true
  },
  preco: {
    type: Number,
    required: true
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  animal: {
    type: String,
    required: true
  },
  comentarios: [
    {
      texto: {
        type: String,
        required: true
      },
      nota: {
        type: Number,
        required: true
      }
    }
  ],
  notaGeral: {
    type: Number,
    default: 0
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
