'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Issues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey:true,
        type: Sequelize.INTEGER
      },
      public_key: {
        type: Sequelize.STRING,
        allowNull: false,
       unique:true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      plaintiff: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      defendant: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_id:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Issues');
  }
};
