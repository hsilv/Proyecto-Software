import express from 'express';
import { database } from '../../db/database.cjs';

const router = express.Router();

router.get('/countries', async (req, res) => {
  let result;
  try {
    result = await database
      .from('distinct_country')
      .select();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos de recetas' });
  }
});

router.get('/categories', async (req, res) => {
  let result;
  try {
    result = await database
      .from('categoria')
      .select('categoria');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos de recetas' });
  }
});

export default router;
