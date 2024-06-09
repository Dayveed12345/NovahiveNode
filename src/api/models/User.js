'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class User extends Model {
  // static associate(models) {
  //   User.hasOne(models.Profile, {
  //     foreignKey: 'id',
  //     sourceKey: 'id'
  //   });
  // }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey:true
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
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User',
  timestamps: true
});

export default User;
