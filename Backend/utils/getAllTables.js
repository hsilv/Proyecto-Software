/* eslint-disable no-console */
import chalk from 'chalk';
import { database } from '../db/database.cjs';

async function getTable(name) {
  console.log(chalk.greenBright(`---------- [TABLA ${name.toUpperCase()}] ----------`));
  const value = await database.from(name.toLowerCase()).select('*');
  console.log(`${chalk.yellowBright('[Cantidad]: ')}${value.data.length}`);
  console.log(`${chalk.yellowBright('[Estado HTTP]: ')}${value.status}`);
  console.table(value.data);
}

async function getAllUsers() {
  await getTable('usuario');
}

async function getAllRecipes() {
  await getTable('receta');
}

async function getAllRecipeSteps() {
  await getTable('paso');
}

async function getAllCategories() {
  await getTable('categoria');
}

async function getAllMinis() {
  await getTable('miniatura');
}

async function getAllFollows() {
  await getTable('follow');
}

async function getAllComments() {
  await getTable('comentario');
}

async function getAllSavedRecipes() {
  await getTable('receta_guardada');
}

async function getAllCollections() {
  await getTable('coleccion');
}

export {
  getAllUsers,
  getAllRecipes,
  getAllRecipeSteps,
  getAllCategories,
  getAllMinis,
  getAllFollows,
  getAllComments,
  getAllSavedRecipes,
  getAllCollections,
};
