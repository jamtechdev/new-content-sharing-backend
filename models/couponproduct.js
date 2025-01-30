"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CouponProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CouponProduct.belongsTo(models.Coupon, {
        foreignKey: "coupon_id",
        onDelete: "CASCADE",
      });
      CouponProduct.belongsTo(models.Product, {
        foreignKey: "product_id",
        onDelete: "CASCADE",
      });
    }
  }
  CouponProduct.init(
    {
      coupon_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CouponProduct",
    }
  );
  return CouponProduct;
};
