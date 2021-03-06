'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        fullname: 'admin',
        email: 'admin@literature.com',
        password: '$2a$10$EbjK9SfSaCQR1IbLVnDoBeDb/dXh2XvamwdFYlRZi3D/xH0ynsK0i',
        role: 'admin',
        avatar: 'avatar.png',
        createdAt: '2021-11-24 10:15:55',
        updatedAt: '2021-11-24 10:15:55,',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
