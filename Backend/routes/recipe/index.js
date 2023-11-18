/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import fs from 'fs';
import path from 'path';
import dayjs from 'dayjs';
import { database } from '../../db/database.cjs';
import { verifyToken } from '../../utils/signToken.js';

const router = express.Router();

router.get('/', async (req, res) => {
  let result;
  try {
    if (req.query.id) {
      result = await database
        .from('receta')
        .select(
          `
          id,
          nombre,
          ingredientes,
          tiempo,
          avg_calificacion,
          descripcion,
          pais,
          calorias,
          porciones,
          usuario (
            id, username
          ),
          miniatura (
              url
          ),
          paso( * ),
          receta_categoria (
            categoria_id!inner(categoria)
          )
      `,
        )
        .eq('id', req.query.id);
    } else {
      result = await database
        .from('receta')
        .select(
          `
          id,
          nombre,
          tiempo,
          avg_calificacion,
          descripcion,
          usuario (
            username
          ),
          miniatura (
              url
          ),
          receta_categoria (
            categoria_id!inner(categoria)
          )
      `,
        )
        .order('avg_calificacion', { ascending: false })
        .limit(5);
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos de recetas' });
  }
});

router.get('/ByCategory', async (req, res) => {
  let result;
  try {
    result = await database.from('receta').select(
      `
          id,
          nombre,
          tiempo,
          avg_calificacion,
          descripcion,
          usuario (
            username
          ),
          miniatura (
              url
          ),
          receta_categoria (
            categoria_id!inner(categoria)
          )
      `,
    );

    const filtered = [];

    result.data.forEach((recipe) => {
      recipe.receta_categoria.forEach((categoria) => {
        if (categoria.categoria_id.categoria === req.query.categoria) {
          filtered.push(recipe);
        }
      });
    });

    res.status(200).json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos de recetas' });
  }
});

router.get('/byUser', async (req, res) => {
  try {
    const result = await database
      .from('receta')
      .select(
        `
      id,
      nombre,
      usuario!inner(username),
      miniatura (
        url
      ),
      tiempo,
      avg_calificacion
    `,
      )
      .eq('usuario.username', req.query.username);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos de recetas' });
  }
});

router.get('/comments', async (req, res) => {
  try {
    const { error, data } = await database
      .from('comentario')
      .select('*, usuario (id, username)')
      .eq('receta_id', req.query.id);
    if (error) {
      res
        .status(500)
        .json({ error: 'Error al obtener comentarios de la receta' });
    } else if (data) {
      if (data.length === 0) {
        res
          .status(200)
          .json({ status: 404, message: 'La receta no tiene comentarios' });
      } else {
        res.status(200).json(data);
      }
    } else {
      res.status(404).json({ status: 404, message: 'La receta no existe' });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    res
      .status(500)
      .json({ error: 'Error al obtener comentarios de la receta' });
  }
});

router.delete('/comments', async (req, res) => {
  if (req.headers.authorization) {
    const tokenState = verifyToken(req.headers.authorization);
    if (tokenState.error) {
      res.status(203).json(tokenState);
    } else {
      const { error, data } = await database
        .from('comentario')
        .delete()
        .eq('receta_id', req.body.id_recipe)
        .eq('autor_id', tokenState.idUser);
      if (data === null && !error) {
        res
          .status(200)
          .json({ status: 200, message: 'Comentario borrado con éxito' });
      } else {
        res.status(500).json({ status: 500, message: 'Error de servidor' });
      }
    }
  } else {
    res
      .status(400)
      .json({ error: true, message: 'Header de autorización vacío' });
  }
});

router.post('/comments/flag', async (req, res) => {
  const day = dayjs().format('DD-MM-YYYY');
  const newReport = `${day}: ${JSON.stringify(req.body)}\n`;
  const reportsDir = './reports';
  const reportsPath = path.join(__dirname, reportsDir);

  if (!fs.existsSync(reportsPath)) {
    try {
      fs.mkdirSync(reportsPath, { recursive: true });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ status: 500, message: 'Error al crear el directorio' });
    }
  }

  const filePath = path.join(reportsPath, `${day}.txt`);

  try {
    fs.appendFileSync(filePath, newReport);
    return res
      .status(200)
      .json({ status: 200, message: 'Denuncia completada :)' });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: 500, message: 'Error al escribir en el archivo' });
  }
});

router.post('/comments/check', async (req, res) => {
  try {
    if (!req.body || !req.body.id_recipe || !req.body.id_user) {
      res.status(400).json({ error: 'Datos insuficientes' });
    } else {
      const { error, data } = await database
        .from('comentario')
        .select('*')
        .eq('receta_id', req.body.id_recipe)
        .eq('autor_id', req.body.id_user);
      if (error) {
        res
          .status(500)
          .json({ error: 'Error al obtener comentarios de la receta' });
      } else if (data) {
        if (data.length === 0) {
          res.status(200).json({ found: false });
        } else {
          res.status(200).json({ found: true });
        }
      } else {
        res.status(404).json({ status: 404, message: 'La receta no existe' });
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('\x1b[1;31m%s\x1b[0m', error);
    res
      .status(500)
      .json({ error: 'Error al obtener comentarios de la receta' });
  }
});

router.post('/comments', async (req, res) => {
  let date = new Date();
  date = date.toUTCString();
  try {
    if (!req.body || !req.body.id_recipe || !req.body.id_user) {
      res
        .status(400)
        .json({ error: 'Datos insuficientes para publicar la receta' });
    } else {
      const { error } = await database.from('comentario').insert({
        autor_id: req.body.id_user,
        receta_id: req.body.id_recipe,
        fecha: date,
        comentario: req.body.comment ? req.body.comment : '',
        calificacion: req.body.qualification,
      });
      if (error) {
        console.log(error);
        throw new Error(error);
      } else {
        res.status(201).json({ message: 'Comentario hecho' });
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    res.status(500).json({ error: 'Error al publicar comentario en receta' });
  }
});

router.post('/postRecipe', async (req, res) => {
  let date = new Date();
  date = date.toUTCString();
  console.log(date);
  try {

    let { error } = await database.from('receta').insert({
      nombre: req.body.name,
      autor_id: req.body.authorId,
      tiempo: req.body.time,
      ingredientes: req.body.ingredients,
      fecha: date,
      avg_calificacion: 0,
      pais: req.body.country,
      descripcion: req.body.desc,
      porciones: req.body.portions,
      calorias: req.body.calories,
    });

    if (error) {
      console.log(error);
      throw new Error(error);
    }

    // Esto se puede porque le puse un constraint a la tabla unique(nombre, autor_id)
    let result = await database.from('receta').select('id').eq('autor_id', req.body.authorId);

    const recipeId = result.data[0].id;

    req.body.steps.map(async (step, index) => {
      error = await database.from('paso').insert({
        receta_id: recipeId,
        numero: index + 1,
        descripcion: step,
      })
    })

    if (error) {
      console.log(error);
      throw new Error(error);
    }

    result = await database.from('categoria').select('id, categoria');

    result.data.map(async (category) => {
      if(req.body.categories.includes(category.categoria)){
        error = await database.from('receta_categoria').insert({
          receta_id: recipeId,
          categoria_id: category.id,
        })
      }
    })

    error = await database.from('miniatura').insert( {
      receta_id: recipeId,
      url: 'https://fakeimg.pl/1000x1000',
    } );

    if (error) {
      res.status(201).json({ message: 'Receta publicada' });
    } else {
      res.status(201).json({ message: 'Receta publicada' });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    res.status(500).json({ error: 'Error al publicar receta' });
  }
});

export default router;
