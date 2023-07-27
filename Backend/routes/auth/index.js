import express from 'express';
import { database } from '../../db/database.cjs';
import { setToken, verifyToken } from '../../utils/signToken.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const result = await database
    .from('usuario')
    .select('*')
    .eq('username', req.body.username)
    .eq('password', req.body.password);
  if (result.data.length === 0) {
    res
      .status(203)
      .json({ status: 203, message: 'Usuario o contraseña incorrectos' });
  } else {
    res.status(200).json({
      token: setToken({
        idUser: result.data[0].id,
        username: result.data[0].username,
        pfp: result.data[0].pfp,
        followers: result.data[0].followers,
        rol: result.data[0].rol,
        email: result.data[0].correo,
      }),
    });
  }
});

router.post('/check', (req, res) => {
  if (req.headers.authorization) {
    const tokenState = verifyToken(req.headers.authorization);
    if (tokenState.error) {
      res.status(200).json(tokenState);
    } else {
      res.status(200).json(tokenState);
    }
  } else {
    res.status(200).json({ error: true, message: 'Header de autorización vacío' });
  }
});

export default router;
