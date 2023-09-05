import express from 'express';
import { database } from '../../db/database.cjs';

const router = express.Router();

router.get('/', async (req, res) => {
  const { error, data } = await database
    .from('coleccion')
    .select('*')
    .eq('id', req.query.id);
  if (!error && data) {
    if (data.length === 0) {
      res.status.json({
        status: 203,
        message: 'No se ha encontrado la colección',
      });
    } else {
      res.status(200).json(data[0]);
    }
  } else if (error || !data) {
    res
      .status(500)
      .json({ error: true, message: 'Error interno en el servidor' });
  }
});

router.get('/ByUser', async (req, res) => {
  const { error, data } = await database
    .from('coleccion')
    .select('*')
    .eq('user_id', req.query.id);
  if (!error && data) {
    if (data.length === 0) {
      res.status(200).json({
        status: 200,
        message: 'El usuario no tiene colecciones',
      });
    } else {
      res.status(200).json(data);
    }
  } else if (error || !data) {
    res
      .status(500)
      .json({ error: true, message: 'Error interno en el servidor' });
  }
});

export default router;
