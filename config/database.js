import { Sequelize } from 'sequelize';

const db = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'test_user',
  password: 'test_pwd',
  database: 'airbnb_express',
  // By default Sequelize adds createdAt and updatedAt to each model
  // false disables this
  define: {
    timestamps: true,
  },
  logging: false,
});

export default db;
