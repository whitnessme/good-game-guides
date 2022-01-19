'use strict';
module.exports = (sequelize, DataTypes) => {
  const GameGuide = sequelize.define('GameGuide', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: DataTypes.STRING,
    releaseDate: DataTypes.DATEONLY,
    publisher: DataTypes.STRING,
    summary: DataTypes.TEXT,
    coverImg: DataTypes.STRING
  }, {});
  GameGuide.associate = function (models) {
    // associations can be defined here
  };
  return GameGuide;
};