import { Sequelize } from 'sequelize';
import db from '../config/database';

const Amenity = db.define('amenities', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default Amenity;
