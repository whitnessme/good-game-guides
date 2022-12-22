"use strict";

const bcrypt = require("bcryptjs");

let options = {};
options.tableName = 'Users';
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      options,
      [
        {
          email: "demo@demodome.com",
          fullName: "Doug Demo",
          hashedPassword: bcrypt.hashSync("password", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      email: { [Op.in]: ['demo@demodome.com'] }
    }, {});
  },
};
