<?php
$file = 'tasks.json';

function getTasks() {
    global $file;
    if (file_exists($file)) {
        $data = file_get_contents($file);
        return json_decode($data, true); 
    }
    return [];
}

function saveTasks($tasks) {
    global $file;
    file_put_contents($file, json_encode($tasks, JSON_PRETTY_PRINT));
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['new_task'])) {
    $task = trim($_POST['new_task']);
    if (!empty($task)) {
        $tasks = getTasks();
        $tasks[] = ['task' => htmlspecialchars($task), 'done' => false];
        saveTasks($tasks);
        header('Location: index.php'); 
        exit;
    }
}

if (isset($_GET['mark_done'])) {
    $taskIndex = $_GET['mark_done'];
    $tasks = getTasks();
    if (isset($tasks[$taskIndex])) {
        $tasks[$taskIndex]['done'] = !$tasks[$taskIndex]['done']; 
        saveTasks($tasks);
    }
    header('Location: index.php'); 
    exit;
}


if (isset($_GET['delete_task'])) {
    $taskIndex = $_GET['delete_task'];
    $tasks = getTasks();
    if (isset($tasks[$taskIndex])) {
        array_splice($tasks, $taskIndex, 1); 
        saveTasks($tasks);
    }
    header('Location: index.php'); 
    exit;
}

$tasks = getTasks();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple To-Do App</title>
    <link rel="stylesheet" href="https://unpkg.com/milligram/dist/milligram.min.css">
    <style>
        .task-done {
            text-decoration: line-through;
        }
        .task-container {
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>To-Do App</h1>

        <!-- Add Task Form -->
        <form action="index.php" method="POST">
            <input type="text" name="new_task" placeholder="Enter new task..." required>
            <button type="submit">Add Task</button>
        </form>

        <div class="task-container">
            <!-- Display Tasks -->
            <h3>Your Tasks:</h3>
            <ul>
                <?php foreach ($tasks as $index => $task): ?>
                    <li>
                        <span class="<?php echo $task['done'] ? 'task-done' : ''; ?>">
                            <?php echo htmlspecialchars($task['task']); ?>
                        </span>
                        <a href="?mark_done=<?php echo $index; ?>" class="button">Mark as <?php echo $task['done'] ? 'Undone' : 'Done'; ?></a>
                        <a href="?delete_task=<?php echo $index; ?>" class="button">Delete</a>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>
    </div>
</body>
</html>

