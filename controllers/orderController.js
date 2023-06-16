const Order = require('../models/orderModel.js');

const orderController = {
  create: async (req, res) => {
    try {
      const { client, products } = req.body;

      // Crie o pedido com as informações recebidas
      const newOrder = new Order({ client, products });

      // Salve o novo pedido no banco de dados
      const createdOrder = await newOrder.save();

      res.status(201).json(createdOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating order' });
    }
  },

  updateStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Busque o pedido pelo ID
      const existingOrder = await Order.findById(id);
      if (!existingOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }

      // Atualize o status do pedido
      existingOrder.status = status;

      // Salve as alterações no banco de dados
      const updatedOrder = await existingOrder.save();

      res.status(200).json(updatedOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating order status' });
    }
  },

  getByClient: async (req, res) => {
    try {
      const { clientId } = req.params;

      // Busque todos os pedidos do cliente pelo ID do cliente
      const orders = await Order.find({ client: clientId });

      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving orders by client' });
    }
  },

  getAll: async (req, res) => {
    try {
      // Busque todos os pedidos
      const orders = await Order.find();

      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving all orders' });
    }
  }
};

module.exports = orderController;
