"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ChatSession extends Model {
    static associate(models) {
      //   ChatSession.belongsTo(models.User, {
      //     foreignKey: "user_id",
      //     as: "user",
      //   });
      //   ChatSession.belongsTo(models.Model, {
      //     foreignKey: "model_id",
      //     as: "model",
      //   });
    }
  }

  ChatSession.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      model_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "approved", "active", "completed"),
        defaultValue: "pending",
        validate: {
          isIn: [["pending", "approved", "active", "completed"]],
        },
      },
      start_time: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        },
      },
      end_time: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
          isAfterStart(value) {
            if (this.start_time && value < this.start_time) {
              throw new Error("End time must be after start time");
            }
          },
        },
      },
      duration: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
        },
      },
      rating: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 5,
          isAllowed(value) {
            if (value && this.status !== "completed") {
              throw new Error("Rating can only be set for completed sessions");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "ChatSession",
      tableName: "ChatSessions",
      timestamps: true,
      underscored: true,
      indexes: [
        { fields: ["user_id"] },
        { fields: ["model_id"] },
        { fields: ["status"] },
      ],
      hooks: {
        beforeUpdate: (session) => {
          if (session.end_time && session.start_time) {
            const duration = Math.floor(
              (session.end_time - session.start_time) / 1000
            );
            session.duration = duration;
          }
        },
      },
    }
  );

  return ChatSession;
};
