'use strict';
const { Model, Op } = require('sequelize');
const { hashSync } = require('bcrypt');
const { GENDERS } = require('./../constants');
const { HASH_SALT } = require('./../constants');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate (models) {
      User.hasMany(models.Task, {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
          is: /^[A-Z][a-z]{1, 63}$/,
          len: [2, 64],
        },
      },
      lastName: DataTypes.STRING(64),
      email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
      },
      passwHash: {
        type: DataTypes.STRING,
        allowNull: false,
        set (value) {
          this.setDataValue('passwHash', hashSync(value, HASH_SALT));
        },
      },
      birthday: {
        type: DataTypes.DATEONLY,
        validate: {
          isBefore: new Date().toISOString(),
        },
      },
      gender: {
        type: DataTypes.STRING,
        validate: {
          isIn: [GENDERS],
        },
      },
      image: DataTypes.STRING,
    },
    {
      underscored: true,
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
