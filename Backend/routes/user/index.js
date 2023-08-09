import express from 'express';
import { database } from '../../db/database.cjs';

const router = express.Router();

router.get('/', async (req, res) => {
    let result;
    try {
      if(req.query.id){
        result = await database
          .from('usuario')
          .select(`
            id,
            username,
            nombre,
            pfp,
            followers
        `)
        .eq('username', req.query.id)
      }   
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener datos de recetas' });
    }
  });
  
  export default router;