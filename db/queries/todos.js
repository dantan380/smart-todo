const db = require('../connection');

/**
 * Creates a new to do.
 * 
 * EX:
 * createNewTodo(1, 'To Eat', 'I want to eat some delicious pho');
 * insert (1, 2, 'I want to eat some delicious pho', false);
 * Get a single row of to do based on the parameters
 * @param {Integer} userId the user_id of the person logged in
 * @param {String} categoryString the title of the category we want to add to.  Ex: 'To Eat'
 * @param {String} nameOfToDo the name of the to do (from  what user entered).
 * @return {Promise<{}>} A promise to the user WITH the new object created.
 * @return {Error} thrown error
 */
const createNewTodo = (userId, categoryString, nameOfToDo) => {
  return db.query(`INSERT INTO todos (
    user_id,
    category_id,
    title,
    description,
    is_complete
  )
VALUES(
    $1,
    (
      SELECT categories.id
      FROM categories
      WHERE categories.name = $2
      LIMIT 1
    ), 
    $3,
    'Description here',
    false
  )
  RETURNING *`, [userId, categoryString, nameOfToDo])
    .then(res => {
      if (!res.rows[0]) {
        throw Error('No new to do has been created.');
      }
      return res.rows[0];
    })
    .catch(err => {
      console.log('Error occurred:', err.message);
      throw err;
    });
};

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

//TODO Remove me when done!
// TESTING ADDING NEW TO DO QUERY
// createNewTodo(1, 'To Eat', 'I want to eat some chicken thighs')
//   .then(res => {
//     console.log("row created", res);
//   });

module.exports = { getTodosById, updateCategoryWithId, createNewTodo };
