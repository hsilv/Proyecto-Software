import 'dotenv/config';
import app from '../app.js';
import auth from '../routes/auth/index.js';
import recipe from '../routes/recipe/index.js';
import user from '../routes/user/index.js';
import search from '../routes/search/index.js'
import { getAllUsers } from '../utils/getAllTables.js';

const port = process.env.DEPLOY_PORT;

app.listen(port, async () => {
  console.log(`Server running on ${port}`);
  getAllUsers();
});

app.use('/auth/', auth);
app.use('/recipe/', recipe);
app.use('/user/', user);
app.use('/search/', search)

export default app;
