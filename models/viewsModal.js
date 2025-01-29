"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class View extends Model {
    static associate(models) {
      //   View.belongsTo(models.User, {
      //     foreignKey: 'user_id',
      //     as: 'viewer',
      //     allowNull: true
      //   });
      //   View.belongsTo(models.Content, {
      //     foreignKey: 'content_id',
      //     as: 'content'
      //   });
    }
  }

  View.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      content_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ip_address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIP: {
            msg: "Invalid IP address format",
          },
        },
      },
      viewed_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "View",
      tableName: "Views",
      timestamps: false,
      indexes: [
        { fields: ["user_id"] },
        { fields: ["content_id"] },
        { fields: ["viewed_at"] },
      ],
    }
  );

  return View;
};
