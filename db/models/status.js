"use strict";
module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define(
    "Status",
    {
      name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(50),
      },
    },
    {}
  );
  Status.associate = function (models) {
    Status.hasMany(models.StatusShelf, { foreignKey: "statusId" });
  };
  return Status;
};
