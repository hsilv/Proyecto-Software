/* eslint-disable no-console */
import chalk from 'chalk';
import { database } from '../db/database.cjs';

// Función que obtiene toda una tabla de la base de datos.
async function getTable(name) {
  console.log(chalk.greenBright(`---------- [TABLA ${name.toUpperCase()}] ----------`));
  const value = await database.from(name.toLowerCase()).select('*');
  console.log(`${chalk.yellowBright('[Cantidad]: ')}${value.data.length}`);
  console.log(`${chalk.yellowBright('[Estado HTTP]: ')}${value.status}`);
  console.table(value.data);
}

// Obtener todos los usuarios
async function getAllUsers() {
  await getTable('usuario');
}

// Obtener todas las recetas
async function getAllRecipes() {
  await getTable('receta');
}

// Obtener todos los pasos de las recetas
async function getAllRecipeSteps() {
  await getTable('paso');
}

// Obtener todas las categorías disponibles
async function getAllCategories() {
  await getTable('categoria');
}

// Obtener todas las miniaturas disponibles
async function getAllMinis() {
  await getTable('miniatura');
}

// Obtener todos los seguidores "globales"
async function getAllFollows() {
  await getTable('follow');
}

// Obtener todos los comentarios
async function getAllComments() {
  await getTable('comentario');
}

// Obtener las recetas guardadas
async function getAllSavedRecipes() {
  await getTable('receta_guardada');
}

// Obtener todas las colecciones
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
