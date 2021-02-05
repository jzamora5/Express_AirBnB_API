import express from 'express';
import db from '../config/database';
import User from '../models/user';

function userRouting(app) {
  const router = express.Router();
  app.use('/', router);

  router.get('/users', async (req, res) => {
    let users;
    try {
      users = await User.findAll();
    } catch (err) {
      console.log(err.message);
      return res.status(404).send('Not Found');
    }

    res.status(200).send(users);
  });

  router.get('/users/:user_id', async (req, res) => {
    const { user_id } = req.params;

    let user;

    try {
      user = await User.findByPk(user_id);
    } catch (err) {
      console.log(err.message);
      return res.status(404).send('Not Found');
    }

    if (!user) return res.status(404).send('Not Found');

    return res.status(200).send(user);
  });

  router.delete('/users/:user_id', async (req, res) => {
    const { user_id } = req.params;

    let user;

    try {
      user = await User.findByPk(user_id);
    } catch (err) {
      console.log(err.message);
      return res.status(404).send('Not Found');
    }

    if (!user) return res.status(404).send('Not Found');

    try {
      await user.destroy();
    } catch (err) {
      console.log(err.message);
      return res.status(404).send('Could Not Delete');
    }

    return res.status(200).send();
  });

  router.post('/users', async (req, res) => {
    const { body } = req;

    if (body.email === undefined) {
      return res.status(400).send('Missing email');
    }

    if (body.password === undefined) {
      return res.status(400).send('Missing password');
    }

    const user = User.build(body);

    try {
      await user.save();
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Could Not Create');
    }

    return res.status(200).send(user);
  });

  router.put('/users/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const { body } = req;

    let user;

    try {
      user = await User.findByPk(user_id);
    } catch (err) {
      console.log(err.message);
      return res.status(404).send('Not Found');
    }

    if (!user) return res.status(404).send('Not Found');

    const ignore = ['id', 'createdAt', 'updatedAt'];

    for (const [key, value] of Object.entries(body)) {
      if (!ignore.includes(key)) user[key] = value;
    }

    try {
      await user.save();
    } catch (err) {
      return res.status(500).send('Could Not Update');
    }

    return res.status(200).send(user);
  });
}

export default userRouting;
