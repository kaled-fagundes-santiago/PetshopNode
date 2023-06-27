const ClientModel = require('../models/clientModel');

const ClientController = {
  create: async (req, res) => {
    try {
      const cliente = JSON.parse(req.body.teste);
      const existingClient = await ClientModel.findOne({  email: cliente.email});
      if (existingClient) {
        return res.status(400).json({ error: 'Client already registered' });
      }

      const newClient = new ClientModel(cliente);
      const image = req.file;

      newClient.imagemPerfil = {
          data: image.buffer,
          contentType: image.mimetype
      };

      const createdClient = await newClient.save();

      res.status(201).json(createdClient);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating client' });
    }
  },

  update: async (req, res) => {
    try {
      const cliente = JSON.parse(req.body.teste);


      const existingClient = await ClientModel.findById( cliente.id);
      if (!existingClient) {
        return res.status(404).json({ error: 'Client not found' });
      }

      existingClient.name = cliente.name;
      existingClient.email = cliente.email;
      existingClient.phone = cliente.phone;
      const image = req.file;

      newClient.imagemPerfil = {
          data: image.buffer,
          contentType: image.mimetype
      };


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
