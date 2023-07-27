import 'dotenv/config';
import jwt from 'jsonwebtoken';

function setToken(payload) {
  return jwt.sign(payload, process.env.SECRET, {
    algorithm: 'HS256',
    expiresIn: '30000',
  });
}

function verifyToken(token) {
  let verified;
  try {
    verified = jwt.verify(token, process.env.SECRET);
    delete verified.iat;
    delete verified.exp;
    delete verified.email;
    delete verified.idUser;
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      verified = { status: 203, message: 'Sesión expirada' };
    } else if (e instanceof jwt.JsonWebTokenError) {
      verified = { error: true, message: 'Token no válido' };
    }
  }
  return verified;
}

export default setToken;
export { setToken, verifyToken };
