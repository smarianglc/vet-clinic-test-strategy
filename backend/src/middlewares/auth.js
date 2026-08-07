const { verifyToken } = require('../services/authService');

// Lê o token do header "Authorization: Bearer <token>", valida e anexa req.user.
function authenticate(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    req.user = verifyToken(token); // { id, role, ... }
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}

// Fábrica de middleware: só deixa passar as roles listadas. Uso: authorize('admin')
function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Acesso negado' });
    }
    return next();
  };
}

module.exports = { authenticate, authorize };