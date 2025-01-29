"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Follower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Follower.belongsTo(models.User, {
      //   foreignKey: "user_id",
      //   as: "followedUser",
      //   onDelete: "CASCADE",
      // });

      // // A user can follow many other users
      // Follower.belongsTo(models.User, {
      //   foreignKey: "follower_id",
      //   as: "follower",
      //   onDelete: "CASCADE",
      // });
    }
  }
  Follower.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      follower_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Follower",
    }
  );
  return Follower;
};
