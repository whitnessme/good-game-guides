"use strict";

let options = {};
options.tableName = 'StatusShelves';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("StatusShelves", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      statusId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Statuses" },
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Users" },
      },
      gameGuideId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "GameGuides" },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }, options);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(options, options);
  },
};
