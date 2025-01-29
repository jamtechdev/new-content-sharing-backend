"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "notifications",
      [
        {
          user_id: 1,
          message: "Welcome to our platform!",
          type: "system",
          status: "read",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          message: "You have received a new message.",
          type: "message",
          status: "unread",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 3,
          message: "You received a $5 tip!",
          type: "tip",
          status: "unread",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 4,
          message: "Your subscription has been successfully renewed.",
          type: "subscription",
          status: "read",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 5,
          message: "Your post received a new like.",
          type: "like",
          status: "unread",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 6,
          message: "Someone commented on your post.",
          type: "comment",
          status: "unread",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
