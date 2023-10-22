const db = require('../connection');

const getTodosById = (id) => {
  return db.query('SELECT * FROM todos WHERE user_id = $1', [id])
    .then(todos => {
      return todos.rows
    });
};

module.exports = { getTodosById };