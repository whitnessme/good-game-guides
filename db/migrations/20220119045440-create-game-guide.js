"use strict";

let options = {};
options.tableName = 'GameGuides';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("GameGuides", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      author: {
        type: Sequelize.STRING(100),
      },
      releaseDate: {
        type: Sequelize.DATEONLY,
      },
      publisher: {
        type: Sequelize.STRING(255),
      },
      summary: {
        type: Sequelize.TEXT,
      },
      coverImg: {
        type: Sequelize.STRING,
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
  async down (queryInterface, Sequelize){
    await queryInterface.dropTable(options, options);
  },
};
