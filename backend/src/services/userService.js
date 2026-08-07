const knex = require('../db/knex');

function findByEmail(email) {
  return knex('users').where({ email }).first();
}

async function createUser({ name, email, passwordHash, role }) {
  const [user] = await knex('users')
    .insert({ name, email, password_hash: passwordHash, role })
    .returning(['id', 'name', 'email', 'role']);
  return user;
}

module.exports = { findByEmail, createUser };