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

  router.get('/states/:state_id', async (req, res) => {
    const { state_id } = req.params;

    let state;

    try {
      state = await State.findByPk(state_id);
    } catch (err) {
      return res.status(404).send('Not Found');
    }

    if (!state) return res.status(404).send('Not Found');

    return res.status(200).send(state);
  });

  router.delete('/states/:state_id', async (req, res) => {
    const { state_id } = req.params;

    let state;

    try {
      state = await State.findByPk(state_id);
    } catch (err) {
      return res.status(404).send('Not Found');
    }

    if (!state) return res.status(404).send('Not Found');

    await state.destroy();

    return res.status(200).send();
  });

  router.post('/states', async (req, res) => {
    const { body } = req;

    if (body.name === undefined) {
      return res.status(400).send('Missing name');
    }

    const state = State.build(body);
    await state.save();

    return res.status(200).send(state);
  });

  router.put('/states/:state_id', async (req, res) => {
    const { state_id } = req.params;
    const { body } = req;

    let state;

    try {
      state = await State.findByPk(state_id);
    } catch (err) {
      return res.status(404).send('Not Found');
    }

    if (!state) return res.status(404).send('Not Found');

    const ignore = ['id', 'createdAt', 'updatedAt'];

    for (const [key, value] of Object.entries(body)) {
      if (!ignore.includes(key)) state[key] = value;
    }

    await state.save();

    return res.status(200).send(state);
  });
}

export default stateRouting;
