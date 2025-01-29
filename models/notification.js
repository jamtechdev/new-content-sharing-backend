"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Notification.belongsTo(models.User, {
      //   foreignKey: 'user_id',
      //   as: 'user',
      //   onDelete: 'CASCADE'
      // });
    }
  }
  Notification.init(
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
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM(
          "system",
          "message",
          "tip",
          "subscription",
          "like",
          "comment"
        ),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("read", "unread"),
        defaultValue: "unread",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Notification",
    }
  );
  return Notification;
};
