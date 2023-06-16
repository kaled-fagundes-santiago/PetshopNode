const ProductModel = require('../models/productModel.js');

const productController = {
  create: async (req, res) => {
    try {
      const { name, price, categoryId } = req.body;

      const existingProduct = await ProductModel.findOne({ name });
      if (existingProduct) {
        return res.status(400).json({ error: 'Product already exists' });
      }

      const newProduct = new ProductModel({ name, price, categoryId });
      const createdProduct = await newProduct.save();

      res.status(201).json(createdProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating product' });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price, categoryId } = req.body;

      const existingProduct = await ProductModel.findById(id);
      if (!existingProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }

      existingProduct.name = name;
      existingProduct.price = price;
      existingProduct.categoryId = categoryId;

      const updatedProduct = await existingProduct.save();

      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating product' });
    }
  },

  getAll: async (req, res) => {
    try {
      const products = await ProductModel.find();

      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving all products' });
    }
  },

  getByCode: async (req, res) => {
    try {
      const { code } = req.params;

      const product = await ProductModel.findOne({ code });

      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving product by code' });
    }
  }
};

module.exports = productController;
