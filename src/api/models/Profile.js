'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Profile extends Model {
  static associate(models) {
    Profile.belongsTo(models.User, { foreignKey: 'public_key', targetKey: 'public_key' });
  }
}

Profile.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  public_key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('Client', 'Freelancer'),
    allowNull: false
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rating: {
    type: DataTypes.INTEGER,
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
  active_status: {
    type: DataTypes.ENUM('0', '1'),
    allowNull: false,
    defaultValue: '0'
  }
}, {
  sequelize,
  modelName: 'profile',
  timestamps: false
});

export default Profile;
