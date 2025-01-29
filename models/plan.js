"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    static associate(models) {
      // Plan belongs to a specific Model Profile
      // Plan.belongsTo(models.ModelProfile, {
      //   foreignKey: 'model_id',
      //   as: 'model',
      //   onDelete: 'CASCADE'
      // });
    }
  }

  Plan.init(
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
        // references: {
        //   model: "model_profiles",
        //   key: "id",
        // },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      is_premium_access_included: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Plan",
      tableName: "plans",
      timestamps: true,
    }
  );

  return Plan;
};
