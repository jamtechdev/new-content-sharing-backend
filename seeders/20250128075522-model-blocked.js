"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "model_blocked",
      [
        {
          model_id: 1,
          user_id: 2,
          block_date: new Date(),
          status: "active",
          subscription_status: "expired",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          model_id: 3,
          user_id: 1,
          block_date: new Date(),
          status: "inactive",
          subscription_status: "expired",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          model_id: 4,
          user_id: 2,
          block_date: new Date(),
          status: "active",
          subscription_status: "expired",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          model_id: 2,
          user_id: 3,
          block_date: new Date(),
          status: "active",
          subscription_status: "active", // This block will not be enforced
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          model_id: 5,
          user_id: 6,
          block_date: new Date(),
          status: "active",
          subscription_status: "expired",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          model_id: 2,
          user_id: 4,
          block_date: new Date(),
          status: "inactive",
          subscription_status: "expired",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("model_blocked", null, {});
  },
};
