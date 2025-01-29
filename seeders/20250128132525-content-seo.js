"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "content_seo",
      [
        {
          content_id: 1,
          meta_title: "Best Photography Tips",
          meta_description:
            "Learn the best photography tips to capture stunning images.",
          meta_keywords: "photography, tips, best shots, camera, DSLR",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          content_id: 2,
          meta_title: "10-Minute Home Workout",
          meta_description:
            "A quick and effective 10-minute home workout routine.",
          meta_keywords: "home workout, fitness, exercise, 10-minute workout",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          content_id: 3,
          meta_title: "Beginner’s Guide to Digital Marketing",
          meta_description:
            "A complete beginner’s guide to understanding digital marketing strategies.",
          meta_keywords:
            "digital marketing, SEO, marketing strategies, beginner guide",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          content_id: 4,
          meta_title: "How to Start a Podcast",
          meta_description:
            "Everything you need to know about starting your first podcast.",
          meta_keywords: "podcast, podcasting, how to start, audio content",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          content_id: 5,
          meta_title: "Travel Vlogging Essentials",
          meta_description:
            "Must-have gear and tips for starting a successful travel vlog.",
          meta_keywords: "travel vlogging, vlogger, YouTube, content creation",
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
