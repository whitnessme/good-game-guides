"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Statuses",
      [
        { name: "Want to Play", createdAt: new Date(), updatedAt: new Date() },
        {
          name: "Currently Playing",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { name: "Played", createdAt: new Date(), updatedAt: new Date() },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("Statuses", null, {});
  },
};
