'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js'; 
class Issue extends Model {
  static associate(models) {
    Issue.belongsTo(models.User, { foreignKey: 'public_key',sourceKey: 'public_key' }); // Adjusted association
  }
};

Issue.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  public_key: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Users', // Corrected reference to 'Users' table
      key: 'public_key'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  plaintiff: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  defendant: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('open','closed'),
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'Issue',
  timestamps: false
});

export default Issue;
