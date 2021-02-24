import express from 'express';
import Review from '../models/review';
import Place from '../models/place';
import User from '../models/user';

function reviewRouting(app) {
  const router = express.Router();
  app.use('/', router);

  router.get('/places/:place_id/reviews', async (req, res) => {
    const { place_id } = req.params;

    let place;

    try {
      place = await Place.findByPk(place_id);
    } catch (err) {
      console.log(err.message);
      return res.status(404).send('Place Not Found');
    }

    if (!place) return res.status(404).send('Place Not Found');

    let reviews;
    try {
      reviews = await place.getReviews();
    } catch (err) {
      console.log(err.message);
      return res.status(404).send('Reviews Not Found');
    }

    res.status(200).send(reviews);
  });

  router.get('/reviews/:review_id', async (req, res) => {
    const { review_id } = req.params;

    let review;

    try {
      review = await Review.findByPk(review_id);
    } catch (err) {
      console.log(err.message);
      return res.status(404).send('Review Not Found');
    }

    if (!review) return res.status(404).send('Review Not Found');

    return res.status(200).send(review);
  });

  router.delete('/reviews/:review_id', async (req, res) => {
    const { review_id } = req.params;

    let review;

    try {
      review = await Review.findByPk(review_id);
    } catch (err) {
      console.log(err.message);
      return res.status(404).send('Review Not Found');
    }

    if (!review) return res.status(404).send('Review Not Found');

    try {
      await review.destroy();
    } catch (err) {
      console.log(err.message);
      return res.status(404).send('Could Not Delete Review');
    }

    return res.status(200).send();
  });

  router.post('/places/:place_id/reviews', async (req, res) => {
    const { body } = req;

    const { place_id } = req.params;

    if (!place_id) {
      return res.status(404).send('No State Passed');
    }

    const { user_id } = body;

    if (user_id === undefined) {
      return res.status(400).send('Missing user_id');
    }

    if (body.text === undefined) {
      return res.status(400).send('Missing text');
    }

    let place;

    try {
      place = await Place.findByPk(place_id);
    } catch (err) {
      console.log(err.message);
      return res.status(404).send('Place Not Found');
    }

    if (!place) return res.status(404).send('Place Not Found');

    let user;

    try {
      user = await User.findByPk(user_id);
    } catch (err) {
      console.log(err.message);
      return res.status(404).send('User Not Found');
    }

    if (!user) return res.status(404).send('User Not Found');

    const review = Review.build(body);
    review.placeId = place_id;
    review.userId = user_id;

    try {
      await review.save();
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Could Not Create Review');
    }

    return res.status(200).send(review);
  });

  router.put('/reviews/:review_id', async (req, res) => {
    const { review_id } = req.params;
    const { body } = req;

    let review;

    try {
      review = await Review.findByPk(review_id);
    } catch (err) {
      console.log(err.message);
      return res.status(404).send('Review Not Found');
    }

    if (!review) return res.status(404).send('Review Not Found');

    const ignore = ['id', 'userId', 'placeId', 'createdAt', 'updatedAt'];

    for (const [key, value] of Object.entries(body)) {
      if (!ignore.includes(key)) review[key] = value;
    }

    try {
      await review.save();
    } catch (err) {
      return res.status(500).send('Could Not Update Review');
    }

    return res.status(200).send(review);
  });
}

export default reviewRouting;
