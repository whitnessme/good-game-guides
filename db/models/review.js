"use strict";
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      rating: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      reviewText: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Users" },
      },
      gameGuideId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "GameGuides" },
      },
    },
    {}
  );
  Review.associate = function (models) {
    Review.belongsTo(models.User, { foreignKey: "userID" });
  };
  return Review;
};
