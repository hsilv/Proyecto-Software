/* eslint-disable class-methods-use-this */
require('dotenv').config();

class ExpressStorage {
  constructor(options) {
    // eslint-disable-next-line global-require
    this.storage = require('node-persist'); // Crear instancia de node-persist
    this.initStorage(options); // Inicializar la instancia
  }

  async initStorage(options) {
    await this.storage.init(options); // Uso directo de la función de node-persist
  }

  getItem(key) {
    const value = this.storage.getItemSync(key); // Uso directo de la función de node-persist
    return value;
  }

  setItem(key, value) {
    this.storage.setItemSync(key, value); // Uso directo de la función de node-persist
  }
}

module.exports = ExpressStorage;
