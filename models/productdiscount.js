'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductDiscount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductDiscount.belongsTo(models.Product, {
        foreignKey: 'product_id',
        onDelete: 'CASCADE',
      });

    }
  }
  ProductDiscount.init({
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    discount_type: {
      type: DataTypes.ENUM('flat', 'percent'),
      // allowNull: false,
    },
    discount_value: {
      type: DataTypes.DECIMAL,
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
  }, {
    sequelize,
    modelName: 'ProductDiscount',
  });
  return ProductDiscount;
};