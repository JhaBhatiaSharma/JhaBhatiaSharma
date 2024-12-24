'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      // Define associations here, if any
    }
  }

  Student.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      mobileNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: true
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: true
      },
      linkedinProfile: {
        type: DataTypes.STRING,
        allowNull: true
      },
      githubProfile: {
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
      modelName: 'Student',
      tableName: "students",
    }
  );

  return Student;
};
