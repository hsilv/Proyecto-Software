import 'dotenv/config';
import app from '../app.js';
import { database } from '../db/database.cjs';

const port = process.env.DEPLOY_PORT;

app.listen(port, async () => {
  console.log(`Server running on ${port}`);
  const value = await database.from('usuario').select('*');
  console.table(value.data);
});
