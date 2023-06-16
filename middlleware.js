const jwt = require('jsonwebtoken');
const config = require('./config.cjs');
const Client = require('./models/clientModel');

const middleware = async (request, response, next) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return response.status(401).json({ error: 'Authorization header required' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decodedToken = jwt.verify(token, config.SECRET_KEY);
    const email = decodedToken.email;
    const client = await Client.findOne({ email });
    if (!client) {
      return response.status(401).json({ error: 'Client not found' });
    }

    request.client = client;
    next();
  } catch {
    return response.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = middleware;
