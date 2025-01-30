'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCoupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // UserCoupon.belongsTo(models.User, {
      //   foreignKey: 'user_id',
      //   onDelete: 'CASCADE',
      // });

      // Define the association with the Coupon model
      // UserCoupon.belongsTo(models.Coupon, {
      //   foreignKey: 'coupon_id',
      //   onDelete: 'CASCADE',
      // });
    }
  }
  UserCoupon.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    coupon_id: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    usage_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,  // Default value is 0 if no usage yet
    },
  }, {
    sequelize,
    modelName: 'UserCoupon',
  });
  return UserCoupon;
};