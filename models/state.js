import { Sequelize } from 'sequelize';
import db from '../config/database';
import City from './city';

const State = db.define('states', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

State.hasMany(City, { as: 'cities', foreignKey: 'stateId' });
City.belongsTo(State, { foreignKey: 'stateId' });

export default State;
