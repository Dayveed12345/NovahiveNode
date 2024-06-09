'use strict';
import { Model, DataTypes }from 'sequelize';
import sequelize from '../config/database.js';
  class Project extends Model {
    static associate(models) {
      Project.belongsTo(models.Profile, { foreignKey: 'id' ,targetKey:'id'});
    }
  };

  Project.init({
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
