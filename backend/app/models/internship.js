'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Internship extends Model {
    /**
     * Define associations here
     */
    static associate(models) {
      Internship.belongsTo(models.Recruiter, {
        foreignKey: 'recruiterId',
        as: 'recruiter',
      });
    }
  }

  Internship.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stipend: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      skillsRequired: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      recruiterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'recruiters',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Internship',
      tableName: 'internships',
    }
  );

  return Internship;
};
