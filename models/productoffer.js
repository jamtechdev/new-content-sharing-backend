"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductOffer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // ProductOffer.belongsTo(models.Product, {
      //   foreignKey: 'product_id',
      //   onDelete: 'CASCADE',
      // });
      // // Define the relationship for free_product_id for 'buy_x_get_y' offers
      // ProductOffer.belongsTo(models.Product, {
      //   foreignKey: 'free_product_id',
      //   onDelete: 'SET NULL', // Sets to null if free product is deleted
      //   allowNull: true,      // Null allowed if not a 'buy_x_get_y' offer
      // });
    }
  }
  ProductOffer.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      offer_type: {
        type: DataTypes.ENUM(
          "buy_x_get_y",
          "buy_x_get_discount",
          "discount_on_total"
        ),
        allowNull: false,
      },
      buy_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      get_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      free_product_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Null allowed for non-'buy_x_get_y' offers
      },
      discount_value: {
        type: DataTypes.DECIMAL,
        allowNull: true, // Null allowed for 'buy_x_get_y' offers
      },
      region_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Null allowed for global offers
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProductOffer",
    }
  );
  return ProductOffer;
};
