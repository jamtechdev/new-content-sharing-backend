"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ContentSEO extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       // ContentSEO belongs to a Content item
      //  ContentSEO.belongsTo(models.Content, {
      //   foreignKey: 'content_id',
      //   as: 'content',
      //   onDelete: 'CASCADE'
      // });
    }
  }
  ContentSEO.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      content_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        // references: {
        //   model: "Content",
        //   key: "id",
        // },
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
    },

    {
      sequelize,
      modelName: "ContentSEO",
    }
  );
  return ContentSEO;
};
