import express from 'express';
import db from '../config/database';
import Place from '../models/place';

function placeRouting(app) {
  const router = express.Router();
  app.use('/', router);

  router.get('/places', async (req, res) => {
    let places;
    try {
      reviews = await Review.findAll();
    } catch (err) {
      console.log(err.message);
    }

    res.status(200).send(places);
  });
}

export default placeRouting;
