"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Order.belongsTo(models.User, {
      //   foreignKey: 'user_id',
      //   onDelete: 'CASCADE',
      // });
      // // Association with the Coupon model
      // Order.belongsTo(models.Coupon, {
      //   foreignKey: 'coupon_id',
      //   onDelete: 'SET NULL',
      // });
    }
  }
  Order.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure unique order number
      },
      payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      payment_status: {
        type: DataTypes.ENUM("completed", "pending", "failed"),
        allowNull: false,
      },
      coupon_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      offer_type: {
        type: DataTypes.STRING, // Store offer as JSON
        allowNull: true,
      },
      discount_applied: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0, // Default value if no discount
      },
      shipping_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shipping_method: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shipping_cost: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "shipped", "delivered", "canceled"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
