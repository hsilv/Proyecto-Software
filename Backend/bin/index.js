import 'dotenv/config';
import app from '../app.js';
import auth from '../routes/auth/index.js';
import recipe from '../routes/recipe/index.js';
import recipeByCategory from '../routes/recipe_category/index.js';

import {
  getAllUsers,
  getAllRecipes,
  getAllRecipeSteps,
  getAllCategories,
  getAllMinis,
  getAllFollows,
  getAllComments,
  getAllSavedRecipes,
  getAllCollections,
} from '../utils/getAllTables.js';

const port = process.env.DEPLOY_PORT;

app.listen(port, async () => {
  console.log(`Server running on ${port}`);
  getAllUsers(); // Falta el nombre real del usuario
});

app.use('/auth/', auth);
app.use('/recipe', recipe);
app.use('/recipeByCategory', recipeByCategory)
