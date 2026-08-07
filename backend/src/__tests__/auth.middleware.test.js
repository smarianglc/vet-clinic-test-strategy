const { authenticate, authorize } = require('../middlewares/auth');
const { generateToken } = require('../services/authService');

// Cria um "res" falso: status() e json() encadeáveis, como no Express.
function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('authenticate', () => {
  it('anexa req.user e chama next() com token válido', () => {
    const token = generateToken({ id: 1, role: 'admin' });
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = mockRes();
    const next = jest.fn();

    authenticate(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user.id).toBe(1);
    expect(req.user.role).toBe('admin');
  });

  it('retorna 401 quando não há token', () => {
    const req = { headers: {} };
    const res = mockRes();
    const next = jest.fn();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('retorna 401 com token inválido', () => {
    const req = { headers: { authorization: 'Bearer token.falso' } };
    const res = mockRes();
    const next = jest.fn();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });
});

describe('authorize', () => {
  it('deixa passar quando a role é permitida', () => {
    const req = { user: { role: 'admin' } };
    const res = mockRes();
    const next = jest.fn();

    authorize('admin')(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('retorna 403 quando a role não é permitida', () => {
    const req = { user: { role: 'vet' } };
    const res = mockRes();
    const next = jest.fn();

    authorize('admin')(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });
});