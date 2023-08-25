import express from 'express';
import { database } from '../../db/database.cjs';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const {data, error} = await database.rpc('search', {name: req.query.text});
  
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener resultados de la búsqueda' });
    }
  });

export default router;