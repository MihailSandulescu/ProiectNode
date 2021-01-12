'use strict';
const models = require('../models')
const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const usersQuery = await models.User.findAll();
    const articleQuery = await models.Article.findAll();
    const comments = usersQuery.map(user => ({
      userId: user.id,
      articleId: articleQuery[parseInt(Math.floor(Math.random() * Math.floor(articleQuery.length)))].id,
      body: faker.lorem.words(10),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('Comments', comments, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
