import express from 'express';
import { database } from '../../db/database.cjs';
import { setToken, verifyToken } from '../../utils/signToken.js';
import { isUser } from '../../utils/checkIfUserExists.js';

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

router.post('/register', async (req, res) => {
  if (req.body.username) {
    const userExists = await isUser(req.body.username);
    if (userExists) {
      res
        .status(200)
        .json({
          error: true,
          message: 'El usuario que intentas tomar, ya está en uso',
        });
    } else {
      const { error } = await database.from('usuario').insert({
        username: req.body.username,
        pfp: 'https://fakeimg.pl/600x600',
        followers: 500,
        password: req.body.password,
        rol: 'user',
        correo: req.body.email,
      });
      console.error(error);
      res.status(200).json({ error: false, message: 'Usuario creado con éxito' });
    }
  } else {
    res
      .status(400)
      .json({
        error: true,
        message: 'Faltan campos en el formulario de registro',
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
    res
      .status(200)
      .json({ error: true, message: 'Header de autorización vacío' });
  }
});

export default router;
