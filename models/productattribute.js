'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductAttribute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ProductAttribute.belongsTo(models.Product, {
      //   foreignKey: 'product_id',
      //   onDelete: 'CASCADE',
      // });
      // define association here
    }
  }
  ProductAttribute.init({
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  }, {
    sequelize,
    modelName: 'ProductAttribute',
  });
  return ProductAttribute;
};