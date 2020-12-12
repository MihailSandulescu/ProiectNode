'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.hasOne(models.Role, { foreignKey: 'userId' });
      models.User.hasMany(models.Article, { foreignKey: 'userId'});
    }
  };
  User.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    role: DataTypes.Role
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
