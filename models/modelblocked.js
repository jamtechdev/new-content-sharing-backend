"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ModelBlocked extends Model {
    static associate(models) {
      // // Model who blocked the user
      // ModelBlocked.belongsTo(models.ModelProfile, {
      //   foreignKey: "model_id",
      //   as: "model",
      //   onDelete: "CASCADE",
      // });

      // // User who was blocked
      // ModelBlocked.belongsTo(models.User, {
      //   foreignKey: "user_id",
      //   as: "user",
      //   onDelete: "CASCADE",
      // });
    }
  }
  ModelBlocked.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      model_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      block_date: {
        type: DataTypes.DATE,

        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
        allowNull: false,
      },
      subscription_status: {
        type: DataTypes.ENUM("active", "expired"),
        defaultValue: "expired",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "model_blocked",
    }
  );
  return ModelBlocked;
};
