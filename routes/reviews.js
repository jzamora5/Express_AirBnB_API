import express from 'express';
import db from '../config/database';
import Review from '../models/review';

function reviewRouting(app) {
  const router = express.Router();
  app.use('/', router);

  router.get('/reviews', async (req, res) => {
    let reviews;
    try {
      reviews = await Review.findAll();
    } catch (err) {
      console.log(err.message);
    }

    res.status(200).send(reviews);
  });
}

export default reviewRouting;
