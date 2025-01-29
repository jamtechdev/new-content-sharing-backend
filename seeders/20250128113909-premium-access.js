"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "premium_accesses",
      [
        {
          user_id: 1,
          content_id: 5,
          access_granted: true,
          access_expires: new Date(
            new Date().setMonth(new Date().getMonth() + 1)
          ), // 1-month access
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          content_id: 3,
          access_granted: true,
          access_expires: new Date(
            new Date().setFullYear(new Date().getFullYear() + 1)
          ), // 1-year access
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 3,
          content_id: 8,
          access_granted: false,
          access_expires: null, // No access granted
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 4,
          content_id: 1,
          access_granted: true,
          access_expires: new Date(
            new Date().setMonth(new Date().getMonth() + 6)
          ), // 6-month access
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 5,
          content_id: 9,
          access_granted: true,
          access_expires: new Date(
            new Date().setMonth(new Date().getMonth() + 3)
          ), // 3-month access
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 6,
          content_id: 7,
          access_granted: false,
          access_expires: null, // No access granted
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("premium_accesses", null, {});
  },
};
