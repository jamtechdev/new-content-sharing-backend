"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Associate User with Region using "region_id" without foreign key constraint
      User.belongsTo(models.Regions, {
        foreignKey: "region_id",
        as: "region",
      });
      // Associate User with Role using "role_id" without foreign key constraint
      User.belongsTo(models.roles, {
        foreignKey: "role_id",
        as: "role",
      });
      User.hasOne(models.model_profile, {
        foreignKey: "user_id",
        as: "model_profiles",
      });
    }

    // verifyPassword(plainPassword) {
    //   return bcrypt.compareSync(plainPassword, this.password);
    // }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email_verified_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        // set(value) {
        //   const salt = bcrypt.genSaltSync(10);
        //   const hashedPassword = bcrypt.hashSync(value, salt);
        //   this.setDataValue("password", hashedPassword);
        // },
        // get() {
        //   return () => this.getDataValue("password");
        // },
      },
      is_blocked_by_platform: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      access_token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      platfrom_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      birthdate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      social_links: {
        type: DataTypes.JSON, // Storing social media links as JSON
        allowNull: true,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      region_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW(),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW(),
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return User;
};
