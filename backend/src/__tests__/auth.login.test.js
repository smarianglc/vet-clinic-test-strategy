const request = require('supertest');
const app = require('../app');
const knex = require('../db/knex');
const { hashPassword } = require('../services/authService');

const TEST_USER = {
  name: 'Admin Teste',
  email: 'admin@teste.com',
  password: 'senha123',
  role: 'admin',
};

beforeAll(async () => {
  await knex('users').del(); // começa com a tabela limpa (banco de teste!)
  await knex('users').insert({
    name: TEST_USER.name,
    email: TEST_USER.email,
    password_hash: await hashPassword(TEST_USER.password),
    role: TEST_USER.role,
  });
});

afterAll(async () => {
  await knex('users').del();
  await knex.destroy(); // fecha a conexão pra o Jest encerrar limpo
});

describe('POST /auth/login', () => {
  it('faz login com credenciais válidas e retorna token', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: TEST_USER.email, password: TEST_USER.password });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user).toMatchObject({ email: TEST_USER.email, role: 'admin' });
  });

  it('rejeita senha errada com 401', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: TEST_USER.email, password: 'senhaErrada' });

    expect(res.status).toBe(401);
    expect(res.body.token).toBeUndefined();
  });

  it('rejeita email inexistente com 401', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'naoexiste@teste.com', password: 'qualquer' });

    expect(res.status).toBe(401);
  });

  it('retorna 400 quando faltam campos', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: TEST_USER.email }); // sem password

    expect(res.status).toBe(400);
  });
});