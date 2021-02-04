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
    }

    res.status(200).send(users);
  });
}

export default userRouting;
