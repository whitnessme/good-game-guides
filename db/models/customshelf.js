"use strict";
module.exports = (sequelize, DataTypes) => {
  const CustomShelf = sequelize.define(
    "CustomShelf",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING(50),
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
  CustomShelf.associate = function (models) {
    CustomShelf.belongsTo(models.User, { foreignKey: "userId" });
    CustomShelf.belongsTo(models.GameGuide, { foreignKey: "gameGuideId" });
  };
  return CustomShelf;
};
