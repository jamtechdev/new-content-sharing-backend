"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Photography",
          description: "Photos and images related content.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Video",
          description: "Short and long-form video content.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Live Streams",
          description: "Live broadcasting content.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Podcasts",
          description:
            "Audio-based content like interviews, discussions, and talks.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Exclusive Articles",
          description:
            "Premium articles and blog posts available only to subscribers.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Behind-the-Scenes",
          description:
            "Exclusive behind-the-scenes content for fans and subscribers.",
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
