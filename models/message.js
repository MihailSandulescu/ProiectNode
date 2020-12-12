'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      models.Message.belongsTo(models.User, { foreignKey: 'userId' });
      models
    }
  };
  Message.init({
    messageId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    targetUserId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    body: DataTypes.TEXT,

  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};