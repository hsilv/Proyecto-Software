import express from 'express';
import { database } from '../../db/database.cjs';

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
            username
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
      .select('*, usuario (username)')
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
      res
        .status(404)
        .json({ status: 404, message: 'La receta no existe' });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    res
      .status(500)
      .json({ error: 'Error al obtener comentarios de la receta' });
  }
});

export default router;
