"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "comment",
      [
        {
          user_id: 1,
          content_id: 2,
          comment_text: "Amazing content! Keep up the good work.",
          status: "approved",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          content_id: 3,
          comment_text: "I found this very informative. Thanks for sharing!",
          status: "pending",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 3,
          content_id: 1,
          comment_text: "This could use some improvement.",
          status: "rejected",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 4,
          content_id: 2,
          comment_text: "Great post! Looking forward to more.",
          status: "approved",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 5,
          content_id: 4,
          comment_text: "Could you provide more details on this topic?",
          status: "pending",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 6,
          content_id: 5,
          comment_text: "Awesome insights, thanks for sharing!",
          status: "approved",
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
