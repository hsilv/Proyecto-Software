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

export { isUser };
export default isUser;
