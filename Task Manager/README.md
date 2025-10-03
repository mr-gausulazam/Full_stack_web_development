# Task Manager Database

**Database name**: `task_manager`

## Tables

### `users`
- `id` INT, primary key, auto-increment
- `name` VARCHAR(100), required
- `email` VARCHAR(150), unique, required
- `created_at` DATETIME, defaults to current timestamp

### `tasks`
- `id` INT, primary key, auto-increment
- `user_id` INT, foreign key to `users.id` (ON DELETE/UPDATE CASCADE)
- `title` VARCHAR(150), required
- `description` TEXT
- `status` ENUM('pending','in_progress','completed'), default 'pending'
- `created_at` DATETIME, defaults to current timestamp

**Relationship**: One-to-many (1:N) from `users` to `tasks`. One `user` can have many `tasks`.

## Seed data
- 3 users inserted: Alice Ahmed, Badrul Karim, Chowdhury Nila
- Multiple tasks for each user

## Example Queries

### Select all tasks
```sql
SELECT * FROM tasks;
```

### Update a task’s status
```sql
UPDATE tasks SET status='completed' WHERE id=2;
```

### Delete a task
```sql
DELETE FROM tasks WHERE id=9;
```

### Sorting and pagination
```sql
SELECT id, user_id, title, status, created_at
FROM tasks
ORDER BY created_at DESC, id DESC
LIMIT 5 OFFSET 0;
```

### Aggregators
```sql
SELECT u.id, u.name, COUNT(t.id) AS task_count, MAX(t.created_at) AS last_task_at
FROM users u
LEFT JOIN tasks t ON t.user_id = u.id
GROUP BY u.id, u.name
ORDER BY u.id;
```

### Joins
**INNER JOIN**
```sql
SELECT u.name, t.title, t.status
FROM users u
INNER JOIN tasks t ON t.user_id = u.id
ORDER BY u.id, t.id;
```

**LEFT JOIN**
```sql
SELECT u.name, t.title, t.status
FROM users u
LEFT JOIN tasks t ON t.user_id = u.id
ORDER BY u.id, t.id;
```

**RIGHT JOIN** (MySQL/MariaDB)
```sql
SELECT u.name, t.title, t.status
FROM users u
RIGHT JOIN tasks t ON t.user_id = u.id
ORDER BY t.id;
```

## How to Use

1. Load `task_manager.sql` into MySQL or MariaDB:
   ```bash
   mysql -u <user> -p < /path/to/task_manager.sql
   ```

2. Run the queries shown above to test selections, updates, deletes, sorting, pagination, aggregation, and joins.

> Note: The live executions shown in this notebook were run against SQLite for demonstration.
> SQLite does not support `RIGHT JOIN`; the provided script targets MySQL/MariaDB.
