const { Router } = require('express');
const usersRouter = require('./usersRouter');
const tasksRouter = require('./tasksRouter');

const router = Router();

router.use('/users', usersRouter);
router.use('/tasks', tasksRouter);

module.exports = router;
