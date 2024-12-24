'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OTP extends Model {
    static associate(models) {
      OTP.belongsTo(models.Student, {
        foreignKey: 'studentId',
        as: 'student',
      });
    }
  }

  OTP.init(
    {
      otp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'students',
          key: 'id',
        },
        unique: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'OTP',
      tableName: 'otps',
    }
  );

  return OTP;
};
