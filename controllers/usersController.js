const _ = require('lodash');
const { User } = require('./../models');

const HASH_SALT = 10;

module.exports.createUser = async (req, res, next) => {
  const { body } = req;

  try {
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

module.exports.getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const foundUser = await User.findByPk(id, {
      raw: true,
      attributes: { exclude: ['passwHash', 'createdAt', 'updatedAt'] },
    });

    if (!foundUser) {
      return res
        .status(404)
        .send([{ status: 404, title: 'User not found ):' }]);
    }

    res.status(200).send({ data: foundUser });
  } catch (err) {
    next(err);
  }
};

module.exports.updateUserById = async (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const [updatedUsersCount, [updatedUser]] = await User.update(body, {
      where: { id },
      raw: true,
      returning: true,
    });

    if (!updatedUsersCount) {
      return res
        .status(404)
        .send([{ status: 404, title: 'User not found ):' }]);
    }

    const preparedUser = _.omit(updatedUser, [
      'passwHash',
      'createdAt',
      'updatedAt',
    ]);

    res.status(200).send({ data: preparedUser });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedUsersCount = await User.destroy({ where: { id } });
    if (!deletedUsersCount) {
      return res
        .status(404)
        .send([{ status: 404, title: 'User not found ):' }]);
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports.updateOrCreateUser = async (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const [updatedUsersCount, [updatedUser]] = await User.update(body, {
      where: { id },
      raw: true,
      returning: true,
    });

    if (!updatedUsersCount) {
      body.id = id;
      return next();
    }

    const preparedUser = _.omit(updatedUser, [
      'passwHash',
      'createdAt',
      'updatedAt',
    ]);

    res.status(200).send({ data: preparedUser });
  } catch (err) {
    next(err);
  }
};
