'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          first_name: 'John',
          last_name: 'Doe',
          email: 'mail1@mail.com',
          birthday: '2000-10-20',
          passw_hash: '1234',
          gender: 'male',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          first_name: 'Johnn',
          last_name: 'Doee',
          email: 'mail2@mail.com',
          birthday: '2000-10-20',
          passw_hash: '1234',
          gender: 'female',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          first_name: 'Johnnn',
          last_name: 'Doeee',
          email: 'mail3@mail.com',
          birthday: '2000-10-20',
          passw_hash: '1234',
          gender: 'female',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          first_name: 'Johnnnn',
          last_name: 'Doeeee',
          email: 'mail4@mail.com',
          birthday: '2000-10-20',
          passw_hash: '1234',
          gender: 'male',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          first_name: 'Johnnnnn',
          last_name: 'Doeeeee',
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
