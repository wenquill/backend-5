'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'tasks',
      [
        {
          body: 'do my homework',
          deadline: '2024-02-01',
          user_id: 39,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          body: 'walk',
          deadline: '2024-02-03',
          user_id: 40,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          body: 'change the beds',
          deadline: '2024-02-07',
          user_id: 40,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', null, {});
  },
};
