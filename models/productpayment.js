'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductPayment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // ProductPayment.belongsTo(models.Order, {
      //   foreignKey: 'order_id',
      //   onDelete: 'CASCADE',
      // });
    }
  }
  ProductPayment.init({
  order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    transaction_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount_paid: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.ENUM('completed', 'pending', 'failed'),
      allowNull: false,
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    payment_gateway: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'ProductPayment',
  });
  return ProductPayment;
};