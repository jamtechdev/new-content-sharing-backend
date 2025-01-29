"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PremiumAccess extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Premium Access belongs to a user
      // PremiumAccess.belongsTo(models.User, {
      //   foreignKey: "user_id",
      //   as: "user",
      //   onDelete: "CASCADE",
      // });
      // // Premium Access belongs to a piece of content
      // PremiumAccess.belongsTo(models.Content, {
      //   foreignKey: "content_id",
      //   as: "content",
      //   onDelete: "CASCADE",
      // });
    }
  }
  PremiumAccess.init(
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
      content_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      access_granted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      access_expires: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "PremiumAccess",
    }
  );
  return PremiumAccess;
};
