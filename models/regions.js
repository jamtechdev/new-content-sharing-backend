"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Regions extends Model {
    static associate(models) {
      //   // Associate Region with Users
      Regions.hasOne(models.users, {
        foreignKey: "region_id",
        as: "region",
      });
    }
  }
  Regions.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
      },
      country_code: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      currency_code: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW(),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW(),
      },
    },
    {
      sequelize,
      modelName: "Regions",
    }
  );
  return Regions;
};
