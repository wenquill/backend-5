const { Router } = require('express');
const { tasksController } = require('../controllers');

const tasksRouter = Router();

tasksRouter
  .route('/')
  .post(tasksController.createTask)
  .get(tasksController.getTasks);

tasksRouter
  .route('/:id')
  .get(tasksController.getTaskById)
  .patch(tasksController.updateTaskById)
  .delete(tasksController.deleteTaskById);

module.exports = tasksRouter;

// post /api/tasks
// get /api/tasks
// get /api/tasks/:taskId
// patch /api/tasks/:taskId
// delete /api/tasks/:taskId
