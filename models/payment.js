"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      // Payment belongs to a user
      // Payment.belongsTo(models.User, {
      //   foreignKey: 'user_id',
      //   as: 'user',
      //   onDelete: 'CASCADE'
      // });
      // // Payment belongs to a model
      // Payment.belongsTo(models.ModelProfile, {
      //   foreignKey: 'model_id',
      //   as: 'model',
      //   onDelete: 'CASCADE'
      // });
      // // Payment may be linked to a chat session
      // Payment.belongsTo(models.ChatSession, {
      //   foreignKey: 'chat_session_id',
      //   as: 'chat_session',
      //   onDelete: 'SET NULL'
      // });
      // // Payment may be linked to a video call
      // Payment.belongsTo(models.VideoCall, {
      //   foreignKey: 'video_call_id',
      //   as: 'video_call',
      //   onDelete: 'SET NULL'
      // });
      // // Payment may be linked to premium content
      // Payment.belongsTo(models.PremiumContent, {
      //   foreignKey: 'premium_content_id',
      //   as: 'premium_content',
      //   onDelete: 'SET NULL'
      // });
    }
  }
  Payment.init(
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
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      payment_method: {
        type: DataTypes.ENUM(
          "credit card",
          "PayPal",
          "bank transfer",
          "crypto"
        ),
        allowNull: false,
      },
      payment_status: {
        type: DataTypes.ENUM("completed", "pending", "failed"),
        allowNull: false,
      },
      payment_type: {
        type: DataTypes.ENUM(
          "chat_session",
          "video_call",
          "subscription",
          "premium_content",
          "tip"
        ),
        allowNull: false,
      },
      chat_session_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      video_call_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      premium_content_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      transaction_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};
