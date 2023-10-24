/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/todos,
 *   these routes are mounted onto /api/todos
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const todoQueries = require('../db/queries/todos');
const googleApi = require('../apis/google-natural-lang-api');
const helpers = require('../apis/helpers');
router.use((req, res, next) => {
  if (!req.session.user) {
    res.status(401).json({ error: 'Please log in first. using /users/<id>' });
    return;
  }
  next();
});

router.get('/', (req, res) => {
  const userCookie = req.session.user;
  todoQueries.getTodosById(userCookie.id)
    .then(todos => res.json(todos))
    .catch(err => {
      res
        .status(401)
        .json({ error: err.message });
    });
});

router.get('/withCategories', (req, res) => {
  const userId = 1;
  todoQueries.getTodosByIdWithCategoryNames(userId)
    .then(todos => res.json(todos))
    .catch(err => {
      res
        .status(401)
        .json({ error: err.message });
    });
});

router.post('/', (req, res) => {
  const text = req.body.text;
  const userCookie = req.session.user;
  googleApi.callClassifyText(text)
    .then(googleCategories => {
      //the category in sql.
      //return 'To Eat', for example.
      console.log(googleCategories);
      return helpers.organizeCategories(googleCategories);
    })
    .then(category => {
      //make the SQL call here:
      return todoQueries.createNewTodo(userCookie.id, category, text);
    })
    .then(newTodo => {
      //return the new record from sql.
      res.json(newTodo);
    })
    .catch(err => {
      res
        .status(401)
        .json({ error: err.message });
    });
});

router.patch('/:id', (req, res) => {
  todoQueries.updateCategoryWithId()
    .then(updatedTodo => res.json(updatedTodo))
    .catch(err => {
      res
        .status(300)
        .json({ error: err.message });
    });
});

module.exports = router;
