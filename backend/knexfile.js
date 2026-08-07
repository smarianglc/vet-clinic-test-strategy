// Configuração do Knex. Lê as credenciais do .env na raiz do projeto.
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const base = {
  client: 'pg',
  migrations: { directory: './db/migrations' },
  seeds: { directory: './db/seeds' },
};

const connection = {
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
};

module.exports = {
  development: {
    ...base,
    connection: { ...connection, database: process.env.POSTGRES_DB },
  },

  // Banco isolado só para testes — nunca toca nos dados de desenvolvimento.
  test: {
    ...base,
    connection: {
      ...connection,
      database: process.env.POSTGRES_DB_TEST || `${process.env.POSTGRES_DB}_test`,
    },
  },
};
