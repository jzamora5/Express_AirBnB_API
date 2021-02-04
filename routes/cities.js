import express from 'express';
import db from '../config/database';
import City from '../models/city';

function cityRouting(app) {
  const router = express.Router();
  app.use('/', router);

  router.get('/cities', async (req, res) => {
    let cities;
    try {
      cities = await City.findAll();
    } catch (err) {
      console.log(err.message);
    }

    res.status(200).send(cities);
  });
}

export default cityRouting;
