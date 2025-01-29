"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "subscription_table",
      [
        {
          subscriber_id: 1,
          model_id: 1,
          plan_id: 1,
          start_date: new Date(),
          end_date: new Date(new Date().setMonth(new Date().getMonth() + 1)), 
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          subscriber_id: 2,
          model_id: 1,
          plan_id: 2,
          start_date: new Date(),
          end_date: new Date(
            new Date().setFullYear(new Date().getFullYear() + 1)
          ),
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          subscriber_id: 3,
          model_id: 2,
          plan_id: 3,
          start_date: new Date(),
          end_date: new Date(new Date().setMonth(new Date().getMonth() + 3)), 
          status: "expired",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          subscriber_id: 4,
          model_id: 2,
          plan_id: 2,
          start_date: new Date(),
          end_date: new Date(
            new Date().setFullYear(new Date().getFullYear() + 1)
          ), // 1-year subscription
          status: "canceled",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          subscriber_id: 5,
          model_id: 3,
          plan_id: 4,
          start_date: new Date(),
          end_date: new Date(new Date().setMonth(new Date().getMonth() + 6)),
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          subscriber_id: 6,
          model_id: 4,
          plan_id: 5,
          start_date: new Date(),
          end_date: new Date(new Date().setMonth(new Date().getMonth() + 1)), 
          status: "expired",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          subscriber_id: 7,
          model_id: 4,
          plan_id: 6,
          start_date: new Date(),
          end_date: new Date(
            new Date().setFullYear(new Date().getFullYear() + 1)
          ), // 1-year subscription
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Subscription", null, {});
  },
};
