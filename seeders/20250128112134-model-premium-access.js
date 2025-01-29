"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "model_premium_accesses",
      [
        {
          user_id: 1,
          model_id: 2,
          has_premium_access: true,
          premium_expires: new Date(
            new Date().setMonth(new Date().getMonth() + 1)
          ),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 3,
          model_id: 1,
          has_premium_access: false,
          premium_expires: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 4,
          model_id: 2,
          has_premium_access: true,
          premium_expires: new Date(
            new Date().setFullYear(new Date().getFullYear() + 1)
          ),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 5,
          model_id: 3,
          has_premium_access: false,
          premium_expires: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 6,
          model_id: 4,
          has_premium_access: true,
          premium_expires: new Date(
            new Date().setMonth(new Date().getMonth() + 6)
          ),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 7,
          model_id: 5,
          has_premium_access: true,
          premium_expires: new Date(
            new Date().setMonth(new Date().getMonth() + 3)
          ),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 8,
          model_id: 6,
          has_premium_access: false,
          premium_expires: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("model_premium_accesses", null, {});
  },
};
