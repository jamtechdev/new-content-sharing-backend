"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PaymentOffer extends Model {
    static associate(models) {
      //   PaymentOffer.belongsTo(models.users, {
      //     foreignKey: "user_id",
      //     as: "user",
      //   });
      //   PaymentOffer.belongsTo(models.Model_Profile, {
      //     foreignKey: "model_id",
      //     as: "modelProfile",
      //   });
    }
  }

  PaymentOffer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      model_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      offer_type: {
        type: DataTypes.ENUM("chat_session", "video_call"),
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(
          "active",
          "inactive",
          "accepted",
          "rejected",
          "payment_pending"
        ),
        allowNull: false,
        defaultValue: "inactive",
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "PaymentOffer",
      tableName: "Payment_Offers",
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: false,
          fields: ["user_id"],
        },
        {
          unique: false,
          fields: ["model_id"],
        },
        {
          unique: false,
          fields: ["status"],
        },
        {
          unique: false,
          fields: ["offer_type"],
        },
        {
          unique: false,
          fields: ["start_date", "end_date"],
        },
      ],
    }
  );

  return PaymentOffer;
};
