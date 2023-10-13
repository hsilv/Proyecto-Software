import 'dotenv/config';
import app from '../app.js';
import auth from '../routes/auth/index.js';
import recipe from '../routes/recipe/index.js';
import user from '../routes/user/index.js';
import search from '../routes/search/index.js';
import misc from '../routes/misc/index.js';
import collections from '../routes/collections/index.js';
import { getAllCollections, getAllComments, getAllSavedRecipes } from '../utils/getAllTables.js';

const port = process.env.DEPLOY_PORT;

app.listen(port, async () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on ${port}`);
  getAllComments();
  getAllCollections();
  getAllSavedRecipes();
});

app.use('/auth/', auth);
app.use('/recipe/', recipe);
app.use('/user/', user);
app.use('/search/', search);
app.use('/misc/', misc);
app.use('/collections/', collections);

export default app;
