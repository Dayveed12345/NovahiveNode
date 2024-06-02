'use strict';
import { Model, DataTypes }from 'sequelize';
import sequelize from '../config/database.js';
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(models.Project, { foreignKey: 'project_id', targetKey: 'id' });
    }
  };

  Image.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    project_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Images',
    timestamps: false
  });
  export default Image;
