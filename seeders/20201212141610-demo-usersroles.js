'use strict';
const models = require('./models')
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
    const userRole = await models.Roles.findOne({ where: { name: 'user' } }).id;
    const usersQuery = await models.User.findAll();
    const usersRoles = usersQuery.map(user => ({
      userId: user.id,
      roleId: userRole,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('UsersRoles', usersRoles, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('UsersRoles', null, {});
  }
};
