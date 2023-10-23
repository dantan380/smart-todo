INSERT INTO todos (
    user_id,
    category_id,
    title,
    description,
    is_complete
  )
VALUES(
    1,
    (
      SELECT categories.id
      FROM categories
      WHERE categories.name = 'To Eat'
      LIMIT 1
    ), 
    'I want to eat some pho!',
    'Description here',
    false
  );