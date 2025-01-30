"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Coupon.init(
    {
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      discount_type: {
        type: DataTypes.ENUM("flat", "percent"),
        allowNull: false,
      },
      discount_value: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      usage_limit: {
        type: DataTypes.INTEGER,
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
      min_order_amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      max_usage_per_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      region_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      user_type: {
        type: DataTypes.ENUM("new_user", "all_users"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Coupon",
    }
  );
  return Coupon;
};
