const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('../config');

const SALT_ROUNDS = 10;

// Transforma a senha em um hash seguro (o que guardamos no banco).
async function hashPassword(plainPassword) {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
}

// Confere se a senha digitada bate com o hash guardado. Retorna true/false.
async function verifyPassword(plainPassword, hash) {
  return bcrypt.compare(plainPassword, hash);
}

// Cria um JWT assinado com os dados do usuário (ex.: id e role).
function generateToken(payload) {
  return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });
}

// Valida um JWT e devolve o conteúdo. Lança erro se for inválido/expirado.
function verifyToken(token) {
  return jwt.verify(token, jwtSecret);
}

module.exports = { hashPassword, verifyPassword, generateToken, verifyToken };