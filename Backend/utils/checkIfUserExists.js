import { database } from '../db/database.cjs';

/**
 *
 * @param {String} username: Nombre de usuario del usuario.
 * @returns {boolean} Regresa true si el usuario ya está tomado, false si el usuario está libre.
 */
async function isUser(username) {
  const value = await database
    .from('usuario')
    .select('*')
    .eq('username', username);
  if (value.data.length === 0) {
    return false;
  }
  return true;
}

/**
 *
 * @param {String} email: Correo electrónico de usuario.
 * @returns {boolean} Regresa true si el email ya está tomado, y false si el email está libre.
 */
async function isEmail(email) {
  const value = await database
    .from('usuario')
    .select('*')
    .eq('correo', email);
  if (value.data.length === 0) {
    return false;
  }
  return true;
}

export { isUser, isEmail };
export default isUser;
