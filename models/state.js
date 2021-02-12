import { Sequelize } from 'sequelize';
import db from '../config/database';
import City from './city';

const State = db.define('states', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

State.hasMany(City, {
  foreignKey: { name: 'stateId', allowNull: false },
});
City.belongsTo(State, { foreignKey: { name: 'stateId', allowNull: false } });

export default State;
