// models/User.js
import { Model, DataTypes }from 'sequelize';
import sequelize from '../config/database.js';

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  public_key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
 password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},
 {
  sequelize,
  modelName: 'users',
  timestamps: true // Add timestamps (createdAt, updatedAt)
});

export default User;
