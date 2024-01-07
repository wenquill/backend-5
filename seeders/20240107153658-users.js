'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          first_name: 'John1',
          last_name: 'Doe1',
          email: 'mail1@mail.com',
          birthday: '2000-10-20',
          passw_hash: '1234',
          gender: 'male',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          first_name: 'John2',
          last_name: 'Doe2',
          email: 'mail2@mail.com',
          birthday: '2000-10-20',
          passw_hash: '1234',
          gender: 'female',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          first_name: 'John3',
          last_name: 'Doe3',
          email: 'mail3@mail.com',
          birthday: '2000-10-20',
          passw_hash: '1234',
          gender: 'female',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          first_name: 'John4',
          last_name: 'Doe4',
          email: 'mail4@mail.com',
          birthday: '2000-10-20',
          passw_hash: '1234',
          gender: 'male',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          first_name: 'John5',
          last_name: 'Doe5',
          email: 'mail5@mail.com',
          birthday: '2000-10-20',
          passw_hash: '1234',
          gender: 'other',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
