/**
 * Consultas (agendamentos). Ligam um pet a um veterinário num horário.
 * A regra de "conflito de horário" (sobreposição por duração) fica na camada de
 * serviço; aqui garantimos, como rede de segurança no banco, que o mesmo vet não
 * tenha dois agendamentos com exatamente o mesmo horário de início.
 */
exports.up = async (knex) => {
  await knex.schema.createTable('appointments', (t) => {
    t.increments('id').primary();
    t.integer('pet_id')
      .notNullable()
      .references('id')
      .inTable('pets')
      .onDelete('CASCADE');
    t.integer('vet_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('RESTRICT'); // não deixa apagar vet com consultas
    t.timestamp('scheduled_at', { useTz: true }).notNullable();
    t.integer('duration_minutes').notNullable().defaultTo(30);
    t.enu('status', ['scheduled', 'completed', 'cancelled'])
      .notNullable()
      .defaultTo('scheduled');
    t.text('notes'); // observações preenchidas ao concluir a consulta
    t.timestamps(true, true);

    t.unique(['vet_id', 'scheduled_at']);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('appointments');
};
