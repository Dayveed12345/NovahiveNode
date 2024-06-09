'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Profile extends Model {
  // static associate(models) {
  //   Profile.belongsTo(models.User, { foreignKey: 'id', targetKey: 'id' });
  // }
}

Profile.init({
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
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM('Client', 'Freelancer'),
    allowNull: false
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  experience: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  skill: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  user_id:{
    type: DataTypes.INTEGER,
    allowNull: false, 
  }
}, {
  sequelize,
  modelName: 'Profile',
  timestamps: true
});

export default Profile;
