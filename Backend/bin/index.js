import 'dotenv/config';
import app from '../app.js';
import auth from '../routes/auth/index.js';
import recipe from '../routes/recipe/index.js';
import { getAllUsers } from '../utils/getAllTables.js';


const port = process.env.DEPLOY_PORT;

app.listen(port, async () => {
  console.log(`Server running on ${port}`);
  getAllUsers(); // Falta el nombre real del usuario
});

app.use('/auth/', auth);
app.use('/recipe', recipe);
