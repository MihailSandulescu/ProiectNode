'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      models.Comment.belongsTo(models.User, { foreignKey: 'userId' });
      models.Comment.belongsTo(models.Article, { foreignKey: 'articleId' });
    }
  };
  Comment.init({
    commentId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    articleId: DataTypes.INTEGER,
    body: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};