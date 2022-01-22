"use strict";
module.exports = (sequelize, DataTypes) => {
  const GameGuide = sequelize.define(
    "GameGuide",
    {
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      author: DataTypes.STRING(100),
      releaseDate: DataTypes.DATEONLY,
      publisher: DataTypes.STRING(255),
      summary: DataTypes.TEXT,
      coverImg: DataTypes.STRING,
    },
    {}
  );
  GameGuide.associate = function (models) {
    GameGuide.hasMany(models.CustomShelf, { foreignKey: "gameGuideId" });
    GameGuide.hasMany(models.Review, { foreignKey: "gameGuideId" });
    GameGuide.hasMany(models.StatusShelf, { foreignKey: "gameGuideId" });
  };
  return GameGuide;
};
