"use strict";

let options = {};
options.tableName = 'Statuses';
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      options,
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
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,  {
      name: { [Op.in]: ['Want to Play', 'Currently Playing', 'Played'] }
    }, {});
  },
};
