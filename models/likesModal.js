"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      // Define associations
      //   Like.belongsTo(models.User, {
      //     foreignKey: "user_id",
      //     as: "user",
      //   });
      //   Like.belongsTo(models.Content, {
      //     foreignKey: "content_id",
      //     as: "content",
      //   });
    }
  }

  Like.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Like",
      tableName: "Likes",
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ["user_id", "content_id"],
          name: "unique_user_content_like",
        },
      ],
    }
  );

  return Like;
};
