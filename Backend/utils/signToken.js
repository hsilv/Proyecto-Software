import 'dotenv/config';
import jwt from 'jsonwebtoken';

function setToken(payload) {
  return jwt.sign(payload, process.env.SECRET, {
    algorithm: 'HS256',
    expiresIn: '2h',
  });
}

function verifyToken(token) {
  return jwt.verify(token, process.env.SECRET);
}

export default setToken;
export { setToken, verifyToken };
