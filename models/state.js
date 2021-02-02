import { Sequelize } from 'sequelize';
import db from '../config/database';

const State = db.define('State', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default State;
