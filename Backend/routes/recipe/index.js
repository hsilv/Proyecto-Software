import express from 'express';
import { database } from '../../db/database.cjs';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await database
      .from('receta')
      .select(`
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
      `)
      .order('avg_calificacion', { ascending: false })
      .limit(5);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos de recetas' });
  }
});

export default router;
