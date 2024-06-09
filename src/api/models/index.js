'use strict';

import path from 'path';
import { Sequelize } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js';
import Profile from './profile.js';

// Initialize models
const models = {
  User,
  Profile
};

Object.values(models).forEach(model => {
  model.init(model.attributes, {
    sequelize,
    modelName: model.name.toLowerCase()
  });
});

// Associate models
Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});

User.hasOne(Profile, { as: 'profile', foreignKey: 'user_id' });
// Profile.belongsTo(User, { as: 'user', foreignKey: 'id' });
const db = {
  sequelize,
  Sequelize,
  User,
  Profile
};
export default db;
