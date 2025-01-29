"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class model_profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasOne(models.users, {
      //   foreignKey: "user_id",
      //   as: "user",
      //   onDelete: "CASCADE",
      // });
      // this.belongsTo(models.Regions, {
      //   foreignKey: "region_id",
      //   as: "region",
      //   onDelete: "CASCADE",
      // });

      // this.belongsTo(models.users, {
      //   foreignKey: "user_id",
      // });
      // this.belongsTo(models.Regions, {
      //   foreignKey: "region_id",
      // });
    }
  }
  model_profile.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      region_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      bio: DataTypes.TEXT,
      profile_picture: DataTypes.STRING,
      cover_photo: DataTypes.STRING,
      website_url: DataTypes.STRING,
      social_links: DataTypes.JSON,
      location: DataTypes.STRING,
      birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("Male", "Female", "Non-Binary", "Other"),
        allowNull: false,
      },
      sexual_orientation: DataTypes.STRING,
      followers_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      earnings: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      subscription_price: {
        type: DataTypes.DECIMAL(6, 2),
        defaultValue: 0.0,
      },
      is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_online: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      premium_access: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      content_visibility: {
        type: DataTypes.ENUM("all", "subscribers_only", "premium_only"),
        defaultValue: "all",
      },
      status: {
        type: DataTypes.ENUM("pending", "approved", "suspended"),
        defaultValue: "pending",
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "model_profile",
    }
  );
  return model_profile;
};
