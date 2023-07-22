import express from 'express';
import { database } from '../../db/database.cjs';

const router = express.Router();

router.get('/login', async (req, res) => {
  const result = await database.from('usuario').select('*');
  res.json(result.data);
});

router.post('/login', async (req, res) => {
  const result = await database.from('usuario').select('*').eq('username', req.body.username).eq('password', req.body.password);
  if (result.data.length === 0) {
    res.status(203).json({ message: 'Incorrect username or password' });
  } else {
    res.json(result.data);
  }
});

export default router;
