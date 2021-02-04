import { Sequelize } from 'sequelize';
import db from '../config/database';
import State from './state';

const City = db.define('cities', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default City;
