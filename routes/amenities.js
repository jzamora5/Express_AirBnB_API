import express from 'express';
import db from '../config/database';
import Amenity from '../models/amenity';

function amenityRouting(app) {
  const router = express.Router();
  app.use('/', router);

  router.get('/amenity', async (req, res) => {
    let amenities;
    try {
      amenities = await Amenity.findAll();
    } catch (err) {
      console.log(err.message);
      return res.status(404).send('Not Found');
    }

    res.status(200).send(amenities);
  });
}

export default amenityRouting;
