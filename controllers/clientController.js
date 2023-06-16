const ClientModel = require('../models/clientModel');

const ClientController = {
  create: async (req, res) => {
    try {
      const { name, email, phone } = req.body;

      const existingClient = await ClientModel.findOne({ email });
      if (existingClient) {
        return res.status(400).json({ error: 'Client already registered' });
      }

      const newClient = new ClientModel({ name, email, phone });
      const createdClient = await newClient.save();

      res.status(201).json(createdClient);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating client' });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, phone } = req.body;

      const existingClient = await ClientModel.findById(id);
      if (!existingClient) {
        return res.status(404).json({ error: 'Client not found' });
      }

      existingClient.name = name;
      existingClient.email = email;
      existingClient.phone = phone;

      const updatedClient = await existingClient.save();

      res.status(200).json(updatedClient);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating client' });
    }
  },

  getAll: async (req, res) => {
    try {
      const clients = await ClientModel.find();

      res.status(200).json(clients);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving all clients' });
    }
  },

  getByCode: async (req, res) => {
    try {
      const { code } = req.params;

      const client = await ClientModel.findOne({ code });

      if (client) {
        res.status(200).json(client);
      } else {
        res.status(404).json({ error: 'Client not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving client by code' });
    }
  }
};

module.exports = ClientController;
