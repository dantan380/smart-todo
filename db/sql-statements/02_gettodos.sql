SELECT todos.id, categories.name, title, description, is_complete, date_created 
FROM todos JOIN categories ON todos.category_id = categories.id
WHERE user_id = 1;