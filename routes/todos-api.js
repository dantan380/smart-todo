/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/todos,
 *   these routes are mounted onto /api/todos
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const todoQueries = require('../db/queries/todos');
// router.use((req, res, next) => {
//   // TODO: Check cookies to see if logged in, else redirect or something.
//   next();
// });

router.get('/', (req, res) => {
  todoQueries.getTodosById(1)
    .then(todos => res.json(todos))
    .catch(err => {
      res
        .status(401)
        .json({ error: err.message });
    });
});

router.post('/', (req, res) => {
  //createNewTodo(userId, categoryString, nameOfToDo)
  const text = req.body.text;
  const categoryString = 'To Eat';
  todoQueries.createNewTodo(1, categoryString, text)
    .then(newTodo => {
      res.json(newTodo)
        .catch(err => {
          res
            .status(401)
            .json({ error: err.message });
        });
    });
});

router.patch('/:id', (req, res) => {
  // TODO: Get user's id from cookie
  todoQueries.updateCategoryWithId()
    .then(updatedTodo => res.json(updatedTodo))
    .catch(err => {
      res
        .status(300)
        .json({ error: err.message });
    });
});

module.exports = router;
