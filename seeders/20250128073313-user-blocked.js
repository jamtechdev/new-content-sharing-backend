"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "user_blocked",
      [
        {
          user_id: 1,
          model_id: 2,
          block_date: new Date(),
          status: "active",
          subscription_status: "expired",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 3,
          model_id: 1,
          block_date: new Date(),
          status: "inactive",
          subscription_status: "expired",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 4,
          model_id: 2,
          block_date: new Date(),
          status: "active",
          subscription_status: "expired",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          model_id: 3,
          block_date: new Date(),
          status: "active",
          subscription_status: "active", // This block will not be enforced
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_blocked", null, {});
  },
};
