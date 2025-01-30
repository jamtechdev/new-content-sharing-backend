'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductMedia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // ProductMedia.belongsTo(models.Product, {
      //   foreignKey: 'product_id',
      //   onDelete: 'CASCADE',
      // });
    }
  }
  ProductMedia.init({
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    media_type: {
      type: DataTypes.ENUM('image', 'video', 'document'),
      allowNull: false,
    },
    file_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    file_extension: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_main: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_gallery: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }

  }, {
    sequelize,
    modelName: 'ProductMedia',
  });
  return ProductMedia;
};