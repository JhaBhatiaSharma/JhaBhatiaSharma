'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Recruiter extends Model {
    static associate(models) {
      // Define associations here, if any
    }
  }

  Recruiter.init(
    {
      companyName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      companyLogo: {
        type: DataTypes.STRING,
        allowNull: true
      },
      linkedinProfile: {
        type: DataTypes.STRING,
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      }
    },
    {
      sequelize,
      modelName: 'Recruiter',
      tableName: "recruiters",
    }
  );

  return Recruiter;
};
