const { hashSync } = require('bcrypt');
const _ = require('lodash');
const { User } = require('./../models');

const HASH_SALT = 10;

module.exports.createUser = async (req, res, next) => {
  const { body } = req;

  try {
    // password hashing
    body.passwHash = hashSync(body.passwHash, HASH_SALT);
    const createdUser = await User.create(body);

    if (!createdUser) {
      // потрібно помилки генерувати за допомогою createHttpErrors!!:
      // next(createHttpErrors(400, 'Something went wrong'))
      return res.status(400).send('Something went wrong...');
    }

    const preparedUser = _.omit(createdUser.get(), [
      'passwHash',
      'createdAt',
      'updatedAt',
    ]);

    res.status(201).send({ data: preparedUser });
  } catch (err) {
    next(err);
  }
};

module.exports.getUsers = async (req, res, next) => {
  const { limit, offset } = req.pagination;

  try {
    const foundUsers = await User.findAll({
      raw: true,
      attributes: { exclude: ['passwHash', 'createdAt', 'updatedAt'] },
      limit,
      offset,
      order: ['id'],
    });

    res.status(200).send({ data: foundUsers });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {};

module.exports.updateUserById = async (req, res, next) => {};

module.exports.deleteUserById = async (req, res, next) => {};
