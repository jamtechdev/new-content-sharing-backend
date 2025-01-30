'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductSEO extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // ProductSEO.belongsTo(models.Product, {
      //   foreignKey: 'product_id',
      //   onDelete: 'CASCADE',
      // });
    }
  }
  ProductSEO.init({
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    meta_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    meta_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    meta_keywords: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'ProductSEO',
  });
  return ProductSEO;
};