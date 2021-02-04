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
User.hasMany(Place, { as: 'places', foreignKey: 'userId' });
Place.belongsTo(User, { foreignKey: 'userId' });

// One to Many
User.hasMany(Review, { as: 'reviews', foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

export default User;
