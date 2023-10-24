const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUserWithId = (userId) => {
  return db.query('SELECT * FROM users WHERE id = $1 LIMIT 1', [userId])
    .then(data => {
      return data.rows[0];
    });
};

module.exports = { getUsers, getUserWithId };
