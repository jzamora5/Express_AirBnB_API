import express from 'express';
import db from '../config/database';
import Place from '../models/place';
import City from '../models/city';
import User from '../models/user';

function placeRouting(app) {
  const router = express.Router();
  app.use('/', router);

  router.get('/cities/:city_id/places', async (req, res) => {
    const { city_id } = req.params;

    let city;
    try {
      city = await City.findByPk(city_id);
    } catch (err) {
      console.log(err.message);
      return res.status(404).send('City Not Found');
    }

    if (!city) return res.status(404).send('City Not Found');

    let places;
    try {
      places = await city.getPlaces();
    } catch (err) {
      console.log(err.message);
      return res.status(404).send('Places Not Found');
    }

    res.status(200).send(places);
  });

  router.get('/places/:place_id', async (req, res) => {
    const { place_id } = req.params;

    let place;

    try {
      place = await Place.findByPk(place_id);
    } catch (err) {
      console.log(err.message);
      return res.status(404).send('Place Not Found');
    }

    if (!place) return res.status(404).send('Place Not Found');

    return res.status(200).send(place);
  });

  router.delete('/places/:place_id', async (req, res) => {
    const { place_id } = req.params;

    let place;

    try {
      place = await Place.findByPk(place_id);
    } catch (err) {
      console.log(err.message);
      return res.status(404).send('Place Not Found');
    }

    if (!place) return res.status(404).send('Place Not Found');

    try {
      await place.destroy();
    } catch (err) {
      console.log(err.message);
      return res.status(404).send('Could Not Delete Place');
    }

    return res.status(200).send();
  });

  router.post('/cities/:city_id/places', async (req, res) => {
    const { body } = req;

    const { city_id } = req.params;

    if (!city_id) {
      return res.status(404).send('No City Passed');
    }

    const { user_id } = body;

    if (user_id === undefined) {
      return res.status(400).send('Missing user_id');
    }

    let city;

    try {
      city = await City.findByPk(city_id);
    } catch (err) {
      console.log(err.message);
      return res.status(404).send('City Not Found');
    }

    if (!city) return res.status(404).send('City Not Found');

    let user;

    try {
      user = await User.findByPk(user_id);
    } catch (err) {
      console.log(err.message);
      return res.status(404).send('User Not Found');
    }

    if (!user) return res.status(404).send('User Not Found');

    const place = Place.build(body);
    place.cityId = city_id;
    place.userId = user_id;

    try {
      await place.save();
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Could Not Create Place');
    }

    return res.status(200).send(place);
  });

  router.put('/places/:place_id', async (req, res) => {
    const { place_id } = req.params;
    const { body } = req;

    let place;

    try {
      place = await Place.findByPk(place_id);
    } catch (err) {
      console.log(err.message);
      return res.status(404).send('Place Not Found');
    }

    if (!place) return res.status(404).send('Place Not Found');

    const ignore = ['id', 'userId', 'cityId', 'createdAt', 'updatedAt'];

    for (const [key, value] of Object.entries(body)) {
      if (!ignore.includes(key)) place[key] = value;
    }

    try {
      await place.save();
    } catch (err) {
      return res.status(500).send('Could Not Update Place');
    }

    return res.status(200).send(place);
  });
}

export default placeRouting;
