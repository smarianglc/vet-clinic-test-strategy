const {
  hashPassword,
  verifyPassword,
  generateToken,
  verifyToken,
} = require('../services/authService');

describe('authService — senhas', () => {
  it('gera um hash diferente da senha original', async () => {
    const hash = await hashPassword('minhaSenha123');
    expect(hash).toBeDefined();
    expect(hash).not.toBe('minhaSenha123');
  });

  it('valida a senha correta contra o hash', async () => {
    const hash = await hashPassword('minhaSenha123');
    await expect(verifyPassword('minhaSenha123', hash)).resolves.toBe(true);
  });

  it('rejeita a senha errada', async () => {
    const hash = await hashPassword('minhaSenha123');
    await expect(verifyPassword('senhaErrada', hash)).resolves.toBe(false);
  });
});

describe('authService — tokens JWT', () => {
  it('gera um token e o valida, preservando o payload', () => {
    const token = generateToken({ id: 1, role: 'admin' });
    expect(typeof token).toBe('string');

    const decoded = verifyToken(token);
    expect(decoded.id).toBe(1);
    expect(decoded.role).toBe('admin');
  });

  it('lança erro ao validar um token inválido', () => {
    expect(() => verifyToken('token.invalido.qualquer')).toThrow();
  });
});