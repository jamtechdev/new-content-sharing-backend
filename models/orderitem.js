"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // OrderItem.belongsTo(models.Order, {
      //   foreignKey: 'order_id',
      //   onDelete: 'CASCADE',
      // });
      // // Association with the Product model
      // OrderItem.belongsTo(models.Product, {
      //   foreignKey: 'product_id',
      //   onDelete: 'CASCADE',
      // });
    }
  }
  OrderItem.init(
    {
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price_per_item: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "OrderItem",
    }
  );
  return OrderItem;
};
