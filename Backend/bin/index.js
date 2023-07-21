import 'dotenv/config';
import app from '../app.js';

const port = process.env.DEPLOY_PORT;

// Función auxiliar para importar módulos CommonJS
/**
 * @param {string} modulePath
 */
async function importCommonJSModule(modulePath) {
  const { default: module } = await import(modulePath);
  return module;
}

app.listen(port, async () => {
  console.log(`Server running on ${port}`);

  const ExpressStorage = await importCommonJSModule('../config/storage.cts');
  let storage = new ExpressStorage();
});
