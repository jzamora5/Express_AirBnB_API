import { Sequelize } from 'sequelize';
import db from '../config/database';
import Place from './place';
import Review from './review';

const User = db.define('users', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

// One to Many
User.hasMany(Place, {
  as: 'places',
  foreignKey: { name: 'userId', allowNull: false },
});
Place.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false } });

// One to Many
User.hasMany(Review, {
  as: 'reviews',
  foreignKey: { name: 'userId', allowNull: false },
});
Review.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false } });

export default User;
