/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { getUserWithId } = require('../db/queries/users');

// Example http://localhost:8080/users/logout
router.get('/logout', (req, res) => {
  if (!req.session.user) {
    res.status(200).json({ message: 'Nothing to log out from, user was never signed in.' });
    return;
  }

  const user = req.session.user;
  req.session = null;
  res.status(200).json({ message: `Successfully logged out from user: ${user.id}` });
});

// Example http://localhost:8080/users/1
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  getUserWithId(userId)
    .then(user => {
      req.session.user = user;
<<<<<<< HEAD
      return res.redirect('/');
=======
      return res.status(200).json({ message: `Successfully logged in to user: ${req.session.user.id}` });
>>>>>>> 5c74085 (Refactor to set cookie as user object rather than just id)
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
