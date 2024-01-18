const createHttpError = require('http-errors');
const { Task, User } = require('./../models');
const _ = require('lodash');

module.exports.getTasks = async (req, res, next) => {
  try {
    const foundTasks = await Task.findAll({
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        model: User,
        attributes: ['firstName', 'lastName'],
      },
    });

    res.status(200).send({ data: foundTasks });
  } catch (err) {
    next(err);
  }
};

module.exports.createTask = async (req, res, next) => {
  const { body } = req;
  try {
    const createdTask = await Task.create(body);

    if (!createdTask) {
      return next(createHttpError(400, 'Something went wrong...'));
    }

    res.status(201).send({ data: createdTask });
  } catch (err) {
    next(err);
  }
};

module.exports.getTaskById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundTask = await Task.findByPk(id, {
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    if (!foundTask) {
      return next(createHttpError(404, 'Task not found ):'));
    }

    res.status(200).send({ data: foundTask });
  } catch (err) {
    next(err);
  }
};

module.exports.updateTaskById = async (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const [updatedTasksCount, [updatedTask]] = await Task.update(body, {
      where: { id },
      raw: true,
      returning: true,
    });

    if (!updatedTask) {
      return next(createHttpError(404, 'Task not found ):'));
    }

    const preparedTask = _.omit(updatedTask, ['updatedAt', 'createdAt']);

    res.status(200).send({ data: preparedTask });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteTaskById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedTaskCount = await Task.destroy({
      where: { id },
    });

    if (!deletedTaskCount) {
      return next(createHttpError(404, 'Task not found ):'));
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
