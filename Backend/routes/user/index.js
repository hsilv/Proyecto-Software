import express from 'express';
import { database } from '../../db/database.cjs';

const router = express.Router();

router.get('/', async (req, res) => {
  let result;
  try {
    if (req.query.id) {
      result = await database
        .from('usuario')
        .select(`
            id,
            username,
            nombre,
            pfp,
            followers
        `)
        .eq('username', req.query.id);
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos de recetas' });
  }
});

router.post('/follow', async (req, res) => {
  const { error } = await database.from('follow').insert({
      seguidor: req.body.uID,
      seguido: req.body.fID,
    });
  if (error) {
    res.status(500).json({ error: true, message: 'Error de servidor' });
  }
  res.status(200).json({ error: false, message: 'Entrada creada exitosamente' });
});

router.get('/isFollowing', async (req, res) => {
  let result;
  try {
    result = await database.from('follow')
      .select('*')
      .eq('seguidor', req.query.uID)
      .eq('seguido', req.query.fID);
    res.status(200).json(result.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener información' });
  }
});

router.delete('/unfollow', async (req, res) => {
  try {
    const { error } = await database.from('follow')
      .delete()
      .eq('seguidor', req.body.uID)
      .eq('seguido', req.body.fID);
      
    if (error) {
      console.error(error);
      res.status(500).json({ error: true, message: 'Error de servidor' });
    } else {
      res.status(200).json({ error: false, message: 'Entry deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Error de servidor' });
  }
});


export default router;
