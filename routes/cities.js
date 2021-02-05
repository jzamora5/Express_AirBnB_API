import express from 'express';
import db from '../config/database';
import State from '../models/state';
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
      return res.status(404).send('Not Found');
    }

    res.status(200).send(cities);
  });

  router.get('/cities/:city_id', async (req, res) => {
    const { city_id } = req.params;

    let city;

    try {
      city = await City.findByPk(city_id);
    } catch (err) {
      console.log(err.message);
      return res.status(404).send('Not Found');
    }

    if (!city) return res.status(404).send('Not Found');

    return res.status(200).send(city);
  });

  router.delete('/cities/:city_id', async (req, res) => {
    const { city_id } = req.params;

    let city;

    try {
      city = await City.findByPk(city_id);
    } catch (err) {
      console.log(err.message);
      return res.status(404).send('Not Found');
    }

    if (!city) return res.status(404).send('Not Found');

    try {
      await city.destroy();
    } catch (err) {
      console.log(err.message);
      return res.status(404).send('Could Not Delete');
    }

    return res.status(200).send();
  });

  router.post('/states/:state_id/cities', async (req, res) => {
    const { body } = req;

    const { state_id } = req.params;

    if (!state_id) {
      return res.status(404).send('No State Passed');
    }

    if (body.name === undefined) {
      return res.status(400).send('Missing name');
    }

    let state;

    try {
      state = await State.findByPk(state_id);
    } catch (err) {
      console.log(err.message);
      return res.status(404).send('State Not Found');
    }

    const city = City.build(body);
    city.stateId = state_id;

    try {
      await city.save();
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Could Not Create');
    }

    return res.status(200).send(city);
  });

  router.put('/cities/:city_id', async (req, res) => {
    const { city_id } = req.params;
    const { body } = req;

    let city;

    try {
      city = await City.findByPk(city_id);
    } catch (err) {
      console.log(err.message);
      return res.status(404).send('Not Found');
    }

    if (!city) return res.status(404).send('Not Found');

    const ignore = ['id', 'createdAt', 'updatedAt'];

    for (const [key, value] of Object.entries(body)) {
      if (!ignore.includes(key)) city[key] = value;
    }

    try {
      await city.save();
    } catch (err) {
      return res.status(500).send('Could Not Update');
    }

    return res.status(200).send(city);
  });
}

export default cityRouting;
