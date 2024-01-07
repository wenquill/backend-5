'use strict';

const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('users', {
      name: 'firstname_constraint',
      type: 'check',
      fields: ['first_name'],
      where: {
        first_name: {
          [Op.regexp]: '/^[A-Z][a-z]{1,63}$/',
        },
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('users', 'firstname_constraint');
  },
};
