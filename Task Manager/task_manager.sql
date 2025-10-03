-- Exported SQL for MySQL / MariaDB
-- Database: task_manager

-- 1) Create database and select it
CREATE DATABASE IF NOT EXISTS task_manager CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE task_manager;

-- 2) Tables
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  status ENUM('pending','in_progress','completed') DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_tasks_user FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- 3) Seed data
INSERT INTO users (name, email, created_at) VALUES
('Alice Ahmed', 'alice@example.com', NOW()),
('Badrul Karim', 'badrul@example.com', NOW()),
('Chowdhury Nila', 'nila@example.com', NOW());

INSERT INTO tasks (user_id, title, description, status, created_at) VALUES
(1, 'Design schema', 'Draft initial DB schema', 'completed', NOW()),
(1, 'Seed data', 'Insert sample rows', 'in_progress', NOW()),
(1, 'Write README', 'Outline project details', 'pending', NOW()),
(2, 'API endpoints', 'List CRUD endpoints', 'pending', NOW()),
(2, 'Unit tests', 'Add tests for models', 'in_progress', NOW()),
(2, 'Docs', 'Add API docs', 'pending', NOW()),
(3, 'UI wireframes', 'Low-fidelity wireframes', 'completed', NOW()),
(3, 'Kanban setup', 'Create project board', 'completed', NOW()),
(3, 'Deploy preview', 'Setup staging environment', 'pending', NOW());

-- 4) Example Queries

Select all tasks
SELECT * FROM tasks;

Update a task’s status
UPDATE tasks SET status='completed' WHERE id=2;

Delete a task
DELETE FROM tasks WHERE id=9;

Sorting and pagination
SELECT id, user_id, title, status, created_at FROM tasks
ORDER BY created_at DESC, id DESC
LIMIT 5 OFFSET 0;

Aggregation: How many tasks each user has (and last task timestamp)
SELECT u.id, u.name, COUNT(t.id) AS task_count, MAX(t.created_at) AS last_task_at
FROM users u
LEFT JOIN tasks t ON t.user_id = u.id
GROUP BY u.id, u.name
ORDER BY u.id;

INNER JOIN
SELECT u.name, t.title, t.status
FROM users u
INNER JOIN tasks t ON t.user_id = u.id
ORDER BY u.id, t.id;

LEFT JOIN
SELECT u.name, t.title, t.status
FROM users u
LEFT JOIN tasks t ON t.user_id = u.id
ORDER BY u.id, t.id;

RIGHT JOIN (supported by MySQL/MariaDB)
SELECT u.name, t.title, t.status
FROM users u
RIGHT JOIN tasks t ON t.user_id = u.id
ORDER BY t.id;
