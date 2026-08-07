const { findByEmail } = require('../services/userService');
const { verifyPassword, generateToken } = require('../services/authService');

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  const user = await findByEmail(email);
  // Mesma mensagem para usuário inexistente e senha errada — não entregamos
  // ao atacante qual dos dois falhou.
  if (!user || !(await verifyPassword(password, user.password_hash))) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  const token = generateToken({ id: user.id, role: user.role });
  return res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
}

module.exports = { login };