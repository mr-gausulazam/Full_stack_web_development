//Terminal-Based Quiz Application

<?php

function showMenu() {
    echo "\n=== Welcome to the Quiz Application ===\n";
    echo "1. Start Quiz\n";
    echo "2. Exit\n";
    echo "Please enter your choice: ";
}

function startQuiz() {
    echo "\nStarting the quiz...\n";
    
    $questions = [
        [
            'question' => 'What is the capital of France?',
            'answer' => 'paris'
        ],
        [
            'question' => 'What is 5 + 7?',
            'answer' => '12'
        ],
        [
            'question' => 'What is the largest ocean on Earth?',
            'answer' => 'pacific'
        ]
    ];
    
    $score = 0;

    foreach ($questions as $index => $q) {
        echo "\n" . ($index + 1) . ". " . $q['question'] . "\n";
        $userAnswer = trim(fgets(STDIN)); 

        if (strtolower($userAnswer) == strtolower($q['answer'])) {
            echo "Correct!\n";
            $score++;
        } else {
            echo "Wrong! The correct answer is: " . $q['answer'] . "\n";
        }
    }

    echo "\nYour final score is: $score/" . count($questions) . "\n";
}

while (true) {
    showMenu(); 
    $choice = trim(fgets(STDIN)); 

    if ($choice == '1') {
        startQuiz(); 
    } elseif ($choice == '2') {
        echo "\nThank you for using the Quiz Application. Goodbye!\n";
        break; 
    } else {
        echo "\nInvalid choice! Please choose 1 or 2.\n"; 
    }
}

?>

