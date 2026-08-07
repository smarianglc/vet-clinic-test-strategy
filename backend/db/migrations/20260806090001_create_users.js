/**
 * Tabela de usuários com login: Admin e Veterinário (diferenciados por `role`).
 */
exports.up = async (knex) => {
  await knex.schema.createTable('users', (t) => {
    t.increments('id').primary();
    t.string('name').notNullable();
    t.string('email').notNullable().unique();
    t.string('password_hash').notNullable();
    t.enu('role', ['admin', 'vet']).notNullable().defaultTo('vet');
    t.timestamps(true, true); // created_at e updated_at, com default now()
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('users');
};
