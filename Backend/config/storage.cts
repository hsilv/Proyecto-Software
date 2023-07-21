const { init, getItem, setItem } = require('node-persist');
require('dotenv').config();

class ExpressStorage {
  storage: any;
  constructor() {
    this.storage = require('node-persist'); // Crear instancia de node-persist
    this.initStorage(); // Inicializar la instancia
  }

  async initStorage() {
    await init(process.env.STORAGE_CONFIG); // Uso directo de la función de node-persist
  }

  async getItem(key: string) {
    const value = await getItem(key); // Uso directo de la función de node-persist
    return value;
  }

  async setItem(key: string, value: string) {
    await setItem(key, value); // Uso directo de la función de node-persist
  }
}

module.exports = {storage: ExpressStorage};
