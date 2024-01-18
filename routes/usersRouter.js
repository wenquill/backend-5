const { Router } = require('express');
const { usersController } = require('../controllers');
const { pagination } = require('./../middleware');

const usersRouter = Router();

usersRouter
  .route('/')
  .get(pagination.paginateUsers, usersController.getUsers)
  .post(usersController.createUser);

usersRouter
  .route('/:id')
  .get(usersController.getUserById)
  .patch(usersController.updateUserById)
  .delete(usersController.deleteUserById)
  .put(usersController.updateOrCreateUser, usersController.createUser);

usersRouter.get('/:id/tasks', usersController.getUserTasks);

module.exports = usersRouter;
