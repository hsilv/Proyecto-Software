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

router.get('/allRecipes', async (req, res) => {
  const { error, data } = await database
    .from('receta_guardada')
    .select(
      `
      receta( *,
        usuario (username),
        miniatura ( url )
      ),
      coleccion( nombre )
    `,
    )
    .eq('coleccion_id', req.query.id);
  if (!error && data) {
    if (data.length === 0) {
      const { error: collError, data: collData } = await database
        .from('coleccion')
        .select('*')
        .eq('id', req.query.id);
      if (collError) {
        console.log(collError);
        res
          .status(500)
          .json({ error: true, message: 'Error interno en el servidor' });
      } else if (collData.length === 0) {
        res.status(404).json({
          status: 404,
          message: 'La colección no existe',
        });
      } else {
        res.status(200).json({
          status: 200,
          message: 'La colección aún no tiene recetas :/',
          name: collData[0].nombre,
        });
      }
    } else {
      res.status(200).json(data);
    }
  } else if (error || !data) {
    console.error(error);
    res
      .status(500)
      .json({ error: true, message: 'Error interno en el servidor' });
  }
});

export default router;
