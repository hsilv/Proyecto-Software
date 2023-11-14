const storage = require('node-persist');
require('dotenv').config();
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

/**
 * @function initiStorage(): Función que inicializa una instancia de "localStorage" virtual para el backend.
 * @return No regresa nada, debido a que inicializa este "localStorage" virtual de forma global.
 */
async function initStorage() {
  await storage.init({
    dir: 'storage',
    stringify: JSON.stringify,
    parse: JSON.parse,
    encoding: 'utf-8',
    logging: true,
    ttl: false,
  });
}

/**
 * @function appStorage(): Objeto de una instancia de "localStorage" virtual para el backend, que guarda, lee y elimina algpun elemento del mismo.
 * @method getItem(key): Obtiene el item de "localStorage" virtual.
 * @method setItem(key,value): Guarda el item de "localStorage".
 * @method removeItem(key): Elimina el item de "localStorage".
 */
const appStorage = {
  getItem: (key) => storage.getItemSync(key),
  setItem: (key, value) => {
    storage.setItemSync(key, value);
  },
  removeItem: (key) => {
    storage.removeItemSync(key);
  },
};

/**
 * @data options: Provee una configuración básica para el "localStorage" virtual.
 */
const options = {
  db: {
    schema: 'public',
  },
  auth: {
    storage: appStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: { 'x-my-custom-header': 'my-app-name' },
  },
};

/**
 * @class DatabaseInstance: Instancia normal de una vase de datos, dependiendo de su entorno, ya sea, testing, producción, etc.
 */
class DatabaseInstance {
  constructor() {
    if (!process.env.NODE_ENV) {
      process.env.NODE_ENV = 'development';
    }

    if (process.env.NODE_ENV === 'production') {
      dotenv.config({ path: '.env.production' });
    } else if (process.env.NODE_ENV === 'development') {
      dotenv.config({ path: '.env.development' });
    } else if (process.env.NODE_ENV === 'testing') {
      dotenv.config({ path: '.env.testing' });
    }
    // eslint-disable-next-line no-console
    console.log('Incializando Storage...');
    initStorage();
    this.database = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
      options,
    );
    // eslint-disable-next-line no-console
    console.log('Conexión a base de datos satisfactoria');
  }
}

module.exports = {
  database: new DatabaseInstance().database,
};
