"use strict";
module.exports = (sequelize, DataTypes) => {
  const StatusShelf = sequelize.define(
    "StatusShelf",
    {
      statusId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Statuses" },
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
  StatusShelf.associate = function (models) {
    StatusShelf.belongsTo(models.User, { foreignKey: "userId" });
    StatusShelf.belongsTo(models.Status, { foreignKey: "statusId" });
    StatusShelf.belongsTo(models.GameGuide, { foreignKey: "gameGuideId" });
  };
  return StatusShelf;
};
