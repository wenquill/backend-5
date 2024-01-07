const { Router } = require('express');

const usersRouter = Router();

usersRouter
  .route('/')
  .get((req, res) => {})
  .post((req, res) => {});

usersRouter
  .route('/:id')
  .get((req, res) => {})
  .patch((req, res) => {})
  .delete((req, res) => {});

module.exports = usersRouter;
