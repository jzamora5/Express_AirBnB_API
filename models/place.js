import { Sequelize } from 'sequelize';
import db from '../config/database';
import Amenity from './amenity';
import Review from './review';

const Place = db.define('places', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING(1024),
    allowNull: true,
  },
  number_rooms: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  number_bathrooms: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  max_guest: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  price_by_night: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  latitude: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  longitude: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
});

Place.belongsToMany(Amenity, { through: 'place_amenity' });
Amenity.belongsToMany(Place, { through: 'place_amenity' });

Place.hasMany(Review, {
  foreignKey: { name: 'placeId', allowNull: false },
});
Review.belongsTo(Review, { foreignKey: { name: 'placeId', allowNull: false } });

export default Place;
