"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      roles.hasMany(models.users, {
        foreignKey: "role_id",
        as: "users",
      });
      roles.hasMany(models.model_profile, {
        foreignKey: "role_id",
        as: "model_profiles",
      });
    }
  }
  roles.init(
    {
      name: DataTypes.STRING,
      guard_name: DataTypes.STRING,
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "roles",
    }
  );
  return roles;
};
