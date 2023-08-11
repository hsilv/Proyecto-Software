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
          categoria (
            categoria
          ),
          paso (
            *
          ),
          usuario (
              username
          ),
          miniatura (
              url
          ),
          tiempo,
          pais,
          avg_calificacion,
          descripcion
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
        usuario (
            username
        ),
        miniatura (
            url
        ),
        tiempo,
        avg_calificacion,
        descripcion
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
    result = await database
      .from('receta')
      .select(
        `
          id,
          nombre,
          ingredientes,
          categoria!inner(categoria),
          usuario (
              username
          ),
          miniatura (
              url
          ),
          tiempo,
          avg_calificacion,
          descripcion
      `,
      )
      .eq('categoria.categoria', req.query.categoria);

    res.status(200).json(result);
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

export default router;
