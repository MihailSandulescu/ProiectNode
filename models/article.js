'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
      models.Article.belongsTo(models.User, { foreignKey: 'userId' });
      models.Article.hasMany(models.Comment, { foreignKey: 'commentId' });
    }
  };
  Article.init({
    articleId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    body: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};