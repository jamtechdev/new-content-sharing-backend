"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ChatMessages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChatMessages.init(
    {
      chat_session_id: DataTypes.INTEGER,
      sender_id: DataTypes.INTEGER,
      sender_type: { type: DataTypes.ENUM("user", "model") },
      message_type: { type: DataTypes.ENUM("text", "image", "video", "audio") },
      message: DataTypes.STRING,
      media_url: DataTypes.STRING,
      media_type: DataTypes.STRING,
      media_size: DataTypes.INTEGER,
      timestamp: DataTypes.DATE,
      is_deleted: DataTypes.BOOLEAN,
      is_edited: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "ChatMessages",
    }
  );
  return ChatMessages;
};
