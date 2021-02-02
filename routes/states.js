import express from 'express';
import db from '../config/database';
import State from '../models/state';

function stateRouting(app) {
  const router = express.Router();
  app.use('/', router);

  router.get('/states', async (req, res) => {
    let states;
    try {
      states = await State.findAll();
    } catch (err) {
      console.log(err.message);
    }

    res.status(200).send(states);
  });
}

export default stateRouting;
