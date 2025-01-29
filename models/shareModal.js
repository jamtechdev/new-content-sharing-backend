"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Share extends Model {
    static associate(models) {
      // Define associations
      //   Share.belongsTo(models.User, {
      //     foreignKey: "user_id",
      //     as: "sharing_user",
      //   });
      //   Share.belongsTo(models.Content, {
      //     foreignKey: "content_id",
      //     as: "shared_content",
      //   });
    }
  }

  Share.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
        },
      },
      content_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
        },
      },
      shared_with: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Share",
      tableName: "Shares",
      timestamps: true,
      underscored: true,
      indexes: [
        { fields: ["user_id"] },
        { fields: ["content_id"] },
        { fields: ["shared_with"] },
      ],
    }
  );

  return Share;
};
