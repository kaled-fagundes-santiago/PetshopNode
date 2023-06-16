const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  codigo: {
    type: Number,
    required: true,
    unique: true
  },
  precoTotal: {
    type: Number,
    required: true
  },
  produtos: [
    {
      produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantidade: {
        type: Number,
        required: true
      }
    }
  ],
  dataHora: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Em andamento', 'Concluído', 'Cancelado'],
    default: 'Em andamento'
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
