import { database } from '../db/database.cjs';

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
