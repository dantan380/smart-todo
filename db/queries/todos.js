const db = require('../connection');

const getTodosById = (id) => {
  return db.query('SELECT * FROM todos WHERE user_id = $1', [id])
    .then(todos => {
      return todos.rows;
    });
};

const updateCategoryWithId = (newCategory, todoId) => {
  // First get category id of new category.
  return db.query(`SELECT id FROM categories WHERE name = $1 LIMIT 1`, [newCategory])
    .then(res => {
      if (!res.rows[0]) {
        throw Error('No category id found from category name.');
      }
      return res.rows[0];
    })
    // Then update user's todo with category id.
    .then(categoryId => db.query(`UPDATE todos SET category_id = $1 WHERE id = $2 RETURNING *`, [categoryId, todoId]))
    .then(res => res.rows)
    .catch(err => {
      console.log('Error occurred:', err.message);
      throw err;
    });
};

module.exports = { getTodosById, updateCategoryWithId };
