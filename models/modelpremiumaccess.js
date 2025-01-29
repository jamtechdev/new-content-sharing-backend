"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ModelPremiumAccess extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // // Premium Access belongs to a user
      // ModelPremiumAccess.belongsTo(models.User, {
      //   foreignKey: "user_id",
      //   as: "user",
      //   onDelete: "CASCADE",
      // });
      // // Premium Access belongs to a model
      // ModelPremiumAccess.belongsTo(models.ModelProfile, {
      //   foreignKey: "model_id",
      //   as: "model",
      //   onDelete: "CASCADE",
      // });
    }
  }
  ModelPremiumAccess.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      model_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      has_premium_access: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      premium_expires: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "ModelPremiumAccess",
      tableName: "model_premium_accesses",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    {
      sequelize,
      modelName: "ModelPremiumAccess",
    }
  );
  return ModelPremiumAccess;
};
