import express from 'express';
import db from '../config/database';
import Amenity from '../models/amenity';

function amenityRouting(app) {
  const router = express.Router();
  app.use('/', router);

  router.get('/amenities', async (req, res) => {
    let amenities;
    try {
      amenities = await Amenity.findAll();
    } catch (err) {
      console.log(err.message);
      return res.status(404).send('Not Found');
    }

    res.status(200).send(amenities);
  });

  router.get('/amenities/:amenity_id', async (req, res) => {
    const { amenity_id } = req.params;

    let amenity;

    try {
      amenity = await Amenity.findByPk(amenity_id);
    } catch (err) {
      console.log(err.message);
      return res.status(404).send('Not Found');
    }

    if (!amenity) return res.status(404).send('Not Found');

    return res.status(200).send(amenity);
  });

  router.delete('/amenities/:amenity_id', async (req, res) => {
    const { amenity_id } = req.params;

    let amenity;

    try {
      amenity = await Amenity.findByPk(amenity_id);
    } catch (err) {
      console.log(err.message);
      return res.status(404).send('Not Found');
    }

    if (!amenity) return res.status(404).send('Not Found');

    try {
      await amenity.destroy();
    } catch (err) {
      console.log(err.message);
      return res.status(404).send('Could Not Delete');
    }

    return res.status(200).send();
  });

  router.post('/amenities', async (req, res) => {
    const { body } = req;

    if (body.name === undefined) {
      return res.status(400).send('Missing name');
    }

    const amenity = Amenity.build(body);

    try {
      await amenity.save();
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Could Not Create');
    }

    return res.status(200).send(amenity);
  });

  router.put('/amenities/:amenity_id', async (req, res) => {
    const { amenity_id } = req.params;
    const { body } = req;

    let amenity;

    try {
      amenity = await Amenity.findByPk(amenity_id);
    } catch (err) {
      console.log(err.message);
      return res.status(404).send('Not Found');
    }

    if (!amenity) return res.status(404).send('Not Found');

    const ignore = ['id', 'createdAt', 'updatedAt'];

    for (const [key, value] of Object.entries(body)) {
      if (!ignore.includes(key)) amenity[key] = value;
    }

    try {
      await amenity.save();
    } catch (err) {
      return res.status(500).send('Could Not Update');
    }

    return res.status(200).send(amenity);
  });
}

export default amenityRouting;
