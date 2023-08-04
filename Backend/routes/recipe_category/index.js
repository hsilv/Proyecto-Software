import express from 'express';
import { database } from '../../db/database.cjs';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await database
      .from('receta')
      .select(`
        nombre,
        usuario (
            username
        ),
        miniatura (
            url
        ),
        categoria (
            categoria
        ),
        tiempo,
        avg_calificacion,
        descripcion
      `)
      .eq('categoria_id', '10')
      .order('avg_calificacion', { ascending: false })
      .limit(5);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos de recetas' });
  }
});

export default router;
