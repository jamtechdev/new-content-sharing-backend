'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Product.belongsTo(models.ProductCategory, {
      //   foreignKey: 'category_id',
      //   onDelete: 'CASCADE',
      // });

    }
  }
  Product.init({
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    short_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    sale_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.ENUM('draft', 'pending', 'published', 'out_of_stock', 'archived'),
      allowNull: false,
      defaultValue: 'draft',
    },
    attributes: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    region_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};