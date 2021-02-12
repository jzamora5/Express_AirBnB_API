import { Sequelize } from 'sequelize';
import db from '../config/database';
import Place from './place';

const City = db.define('cities', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

City.hasMany(Place, {
  foreignKey: { name: 'cityId', allowNull: false },
});
Place.belongsTo(City, { foreignKey: { name: 'cityId', allowNull: false } });

export default City;
