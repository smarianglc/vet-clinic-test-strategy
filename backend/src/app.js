const express = require('express');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json()); // faz o Express entender corpo de requisição em JSON

// Rota de saúde: usada por testes e por monitoramento/CI pra saber se a API está viva.
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});
app.use('/auth', authRoutes);

module.exports = app;