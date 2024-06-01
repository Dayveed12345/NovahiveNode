import { Sequelize } from  'sequelize';

const sequelize = new Sequelize('blockdb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});
export default sequelize;
