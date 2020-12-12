'use strict';

const roles = ["ADMIN", "MODERATOR", "USER"];

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      models.Role.belongsTo(models.User, { foreignKey: 'userId' });
    }
  };
  Role.init({
    userId: DataTypes.INTEGER,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};