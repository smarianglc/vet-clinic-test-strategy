/**
 * Pets: pertencem a um tutor. Se o tutor for removido, seus pets vão junto (CASCADE).
 */
exports.up = async (knex) => {
  await knex.schema.createTable('pets', (t) => {
    t.increments('id').primary();
    t.string('name').notNullable();
    t.string('species').notNullable(); // ex.: cão, gato
    t.string('breed');
    t.date('birth_date');
    t.integer('tutor_id')
      .notNullable()
      .references('id')
      .inTable('tutors')
      .onDelete('CASCADE');
    t.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('pets');
};
