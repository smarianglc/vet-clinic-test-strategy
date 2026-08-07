/**
 * Tutores: donos dos pets. Gerenciados pelo Admin.
 */
exports.up = async (knex) => {
  await knex.schema.createTable('tutors', (t) => {
    t.increments('id').primary();
    t.string('name').notNullable();
    t.string('email').notNullable().unique();
    t.string('phone');
    t.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('tutors');
};
