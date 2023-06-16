const CategoryModel = require('../models/caregoryModel.js');

const CategoryController = {
  create: async (req, res) => {
    try {
      const { idCategoria, descricao } = req.body;

      const existingCategory = await CategoryModel.findOne({ idCategoria });
      if (existingCategory) {
        return res.status(400).json({ error: 'Category already exists' });
      }

      const newCategory = new CategoryModel({ idCategoria, descricao });
      const createdCategory = await newCategory.save();

      res.status(201).json(createdCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating category' });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { descricao } = req.body;

      const existingCategory = await CategoryModel.findById(id);
      if (!existingCategory) {
        return res.status(404).json({ error: 'Category not found' });
      }

      existingCategory.descricao = descricao;

      const updatedCategory = await existingCategory.save();

      res.status(200).json(updatedCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating category' });
    }
  },

  getAll: async (req, res) => {
    try {
      const categories = await CategoryModel.find();

      res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving all categories' });
    }
  },

  getByCode: async (req, res) => {
    try {
      const { idCategoria } = req.params;

      const category = await CategoryModel.findOne({ idCategoria });

      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).json({ error: 'Category not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving category by code' });
    }
  }
};

module.exports = CategoryController;
