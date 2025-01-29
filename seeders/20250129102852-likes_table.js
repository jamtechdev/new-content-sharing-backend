"use strict";
const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface) {
    const [users, contents] = await Promise.all([
      queryInterface.sequelize.query("SELECT id FROM Users;", {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }),
      queryInterface.sequelize.query("SELECT id FROM Contents;", {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }),
    ]);

    if (users.length === 0 || contents.length === 0) {
      throw new Error("Need at least 1 user and 1 content to create likes");
    }

    const numberOfLikes = 100;
    const likes = [];
    const generatedPairs = new Set();

    while (likes.length < numberOfLikes) {
      const user = faker.helpers.arrayElement(users);
      const content = faker.helpers.arrayElement(contents);
      const pairKey = `${user.id}-${content.id}`;
      if (!generatedPairs.has(pairKey)) {
        generatedPairs.add(pairKey);
        likes.push({
          user_id: user.id,
          content_id: content.id,
          created_at: faker.date.recent({ days: 30 }),
          updated_at: new Date(),
        });
      }
      const maxPossibleLikes = users.length * contents.length;
      if (likes.length >= Math.min(numberOfLikes, maxPossibleLikes)) {
        break;
      }
    }

    return queryInterface.bulkInsert("Likes", likes, {});
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete("Likes", null, {});
  },
};
