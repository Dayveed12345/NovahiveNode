'use strict';
import { Model, DataTypes }from 'sequelize';
import sequelize from '../config/database.js';
  class Project extends Model {
    static associate(models) {
      Project.belongsTo(models.Profile, { foreignKey: 'public_key' });
    }
  };

  Project.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    public_key: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Profiles',
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
    }
  }, {
    sequelize,
    modelName: 'Project',
    timestamps: true
  });
export default Project;
