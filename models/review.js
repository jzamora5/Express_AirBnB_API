import { Sequelize } from 'sequelize';
import db from '../config/database';

const Review = db.define('reviews', {
  text: {
    type: Sequelize.STRING(1024),
    allowNull: false,
  },
});

export default Review;
