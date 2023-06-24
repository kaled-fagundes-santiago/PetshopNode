const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const categoryController = require('../controllers/categoryController');
const orderController = require('../controllers/orderController');
const productController = require('../controllers/productController');
const Client = require('../models/clientModel');
const multer = require('multer');

const upload = multer();
const middleware = require('../middlleware');

// Cadastrar um novo cliente
router.post('/cliente', middleware, upload.single('imagemPerfil'), clientController.create);

// Editar um cliente existente
router.put('/cliente/:id', middleware, clientController.update);

// Obter todos os clientes
router.get('/clientes', middleware, clientController.getAll);

// Obter um cliente pelo código
router.get('/cliente/:codigo', middleware, clientController.getByCode);

// Cadastrar uma nova categoria

router.post('/category', middleware, categoryController.create);

// Rota para atualizar uma categoria existente pelo ID
router.put('/category/:id', middleware, categoryController.update);

// Rota para retornar todas as categorias
router.get('/category', middleware, categoryController.getAll);

// Rota para retornar uma categoria pelo ID
router.get('/category/:id', middleware, categoryController.getByCode);

// Rota para cadastrar um produto
router.post('/produto', middleware, productController.create);

// Rota para editar um produto
router.put('/produto/:id', middleware, productController.update);

// Rota para retornar todos os produtos
router.get('/produto', middleware, productController.getAll);

// Rota para retornar um produto por código
router.get('/produto/:code', middleware, productController.getByCode);

// Rota para efetuar um pedido
router.post('/pedido', middleware, orderController.create);

// Rota para editar o status do pedido
router.put('/pedido/:id/status', middleware, orderController.updateStatus);

// Rota para retornar pedidos por cliente
router.get('/pedido/cliente/:clientId', middleware, orderController.getByClient);

// Rota para retornar a lista completa de pedidos
router.get('/pedido', middleware, orderController.getAll);


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Verificar se o cliente existe com o email fornecido
      const client = await Client.findOne({ email });
      if (!client) {
        return res.status(401).json({ error: 'Cliente não encontrado' });
      }
  
      // Verificar se a senha está correta
      if (password !== client.password) {
        return res.status(401).json({ error: 'Senha incorreta' });
      }
  
      // Gerar token JWT com as informações do cliente
      const token = jwt.sign({ email: client.email }, config.SECRET_KEY, { expiresIn: '1h' });
  
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao efetuar o login' });
    }
  });

module.exports = router;
