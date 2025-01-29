"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "contents",
      [
        {
          user_id: 1,
          category_id: 2,
          title: "Sunset Photography",
          description:
            "A beautiful collection of sunset photography from around the world.",
          media_url: "https://example.com/sunset.jpg",
          content_type: "image",
          plan_id: 1,
          premium_access: true,
          region_id: null,
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          category_id: 3,
          title: "Fitness Training Video",
          description: "A full workout session for beginners.",
          media_url: "https://example.com/fitness.mp4",
          content_type: "video",
          plan_id: 2,
          premium_access: false,
          region_id: 1,
          status: "active",
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
