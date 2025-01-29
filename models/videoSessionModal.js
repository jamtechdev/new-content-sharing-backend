'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class VideoCallSession extends Model {
    static associate(models) {
    //   VideoCallSession.belongsTo(models.User, {
    //     foreignKey: 'user_id',
    //     as: 'user'
    //   });
      
    //   VideoCallSession.belongsTo(models.Model, {
    //     foreignKey: 'model_id',
    //     as: 'model'
    //   });
    }

    get duration() {
      if (this.start_time && this.end_time) {
        return Math.floor((this.end_time - this.start_time) / 1000);
      }
      return null;
    }
  }

  VideoCallSession.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    model_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'active', 'completed'),
      defaultValue: 'pending',
      validate: {
        isIn: [['pending', 'approved', 'active', 'completed']]
      }
    },
    start_time: {
      type: DataTypes.DATE,
      validate: {
        isDate: true
      }
    },
    end_time: {
      type: DataTypes.DATE,
      validate: {
        isDate: true,
        isAfterStart(value) {
          if (this.start_time && value < this.start_time) {
            throw new Error('End time must be after start time');
          }
        }
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5,
        isAllowed(value) {
          if (value && this.status !== 'completed') {
            throw new Error('Rating can only be set for completed sessions');
          }
        }
      }
    },
    agora_channel_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'VideoCallSession',
    tableName: 'VideoCallSessions',
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ['user_id'] },
      { fields: ['model_id'] },
      { fields: ['status'] },
      { fields: ['agora_channel_id'], unique: true }
    ],
    hooks: {
      beforeSave: (session) => {
        if (session.end_time && session.start_time && !session.duration) {
          session.duration = Math.floor((session.end_time - session.start_time) / 1000);
        }
      }
    }
  });

  return VideoCallSession;
};