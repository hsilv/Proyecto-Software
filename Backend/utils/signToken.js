import 'dotenv/config';
import jwt from 'jsonwebtoken';

// Función que firma el token con la carga establecida por algún JSON que se pase como parámetro
function setToken(payload) {
  return jwt.sign(payload, process.env.SECRET, {
    algorithm: 'HS256',
    expiresIn: '30m',
  });
}

// Función que verifica la validez del token, asimismo elimina algunos datos de la validación y solo devuleve el payload.
function verifyToken(token) {
  let verified;
  try {
    // Se verifica con la llave secreta "privada" del entorno.
    verified = jwt.verify(token, process.env.SECRET);
    delete verified.iat;
    delete verified.exp;
    delete verified.email;
  } catch (e) {
    // Si está expirado devuelve un 203 con el mensaje "Sesión expirada"
    if (e instanceof jwt.TokenExpiredError) {
      verified = { status: 203, message: 'Sesión expirada' };
      // De lo contrario devuelve un error con el mensaje "Token no válido"
    } else if (e instanceof jwt.JsonWebTokenError) {
      verified = { error: true, message: 'Token no válido' };
    }
  }
  return verified;
}

export default setToken;
export { setToken, verifyToken };
