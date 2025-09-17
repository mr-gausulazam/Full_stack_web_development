#!/usr/bin/env node

const readline = require("readline");

// --- Utility: prompt (Promise-based) ---
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const ask = (q) => new Promise((res) => rl.question(q, res));

// --- Data store ---
/** @type {{name:string, marks:number, grade:string, passed:boolean}[]} */
let students = [];

// --- Display Welcome Message (using do-while loop) ---
(function showWelcome() {
  let shown = false;
  do {
    console.log("==============================================");
    console.log("  🎓  Welcome to the Student Grade Manager");
    console.log("==============================================");
    shown = true;
  } while (!shown);
})();

function calculateGrade(marks) {
  if (marks >= 80) return "A";
  else if (marks >= 70) return "B";
  else if (marks >= 60) return "C";
  else if (marks >= 50) return "D";
  else return "F";
}

function toNumberSafe(input) {
  const n = Number(input);
  return Number.isFinite(n) ? n : NaN;
}

function addStudent(name, marks) {
  const grade = calculateGrade(marks);
  const passed = grade !== "F";
  students.push({ name, marks, grade, passed });
}

const deleteStudentByName = (name) => {
  const idx = students.findIndex(function (s) {
    return s.name.toLowerCase() === name.toLowerCase();
  });
  if (idx === -1) return false;
  students.splice(idx, 1);
  return true;
};

function deleteAllFailedStudents() {
  const before = students.length;
  students = students.filter(function (s) {
    return s.passed; // keep only passed; failed are removed
  });
  return before - students.length;
}

// --- Display Student List (using for loop) ---
function displayStudents(list = students) {
  if (list.length === 0) {
    console.log("No students to display.");
    return;
  }
  console.log("\n# Student List");
  console.log("-------------------------------------------------");
  console.log("Name".padEnd(20), "Marks".padEnd(8), "Grade".padEnd(6), "Passed");
  console.log("-------------------------------------------------");
  // REQUIRED: Use a traditional for loop
  for (let i = 0; i < list.length; i++) {
    const s = list[i];
    console.log(
      s.name.padEnd(20),
      String(s.marks).padEnd(8),
      s.grade.padEnd(6),
      s.passed ? "Yes" : "No"
    );
  }
  console.log("-------------------------------------------------\n");
}

// --- Student who secured first position ---
function showTopper() {
  if (students.length === 0) {
    console.log("No students added yet.");
    return;
  }
  // find max marks
  let topper = students[0];
  for (let i = 1; i < students.length; i++) {
    if (students[i].marks > topper.marks) topper = students[i];
  }
  console.log("\n# Topper Details");
  console.log("----------------------------");
  console.log(`Name  : ${topper.name}`);
  console.log(`Marks : ${topper.marks}`);
  console.log(`Grade : ${topper.grade}`);
  console.log(`Passed: ${topper.passed ? "Yes" : "No"}`);
  console.log("----------------------------\n");
}

// --- Student list (only those who passed) ---
function showPassedOnly() {
  const passed = students.filter((s) => s.passed);
  displayStudents(passed);
}

// --- Total and Average (while loop & arrow function) ---
function showTotals() {
  if (students.length === 0) {
    console.log("No students added yet.");
    return;
  }
  let i = 0;
  let total = 0;
  // REQUIRED: Use while loop
  while (i < students.length) {
    total += students[i].marks;
    i++;
  }
  // REQUIRED: Use arrow function
  const average = (sum, count) => sum / count;

  console.log("\n# Totals");
  console.log("----------------------------");
  console.log(`Total Marks  : ${total}`);
  console.log(`Average Marks: ${average(total, students.length).toFixed(2)}`);
  console.log("----------------------------\n");
}

// --- Input Student Name + Marks ---
async function inputStudent() {
  const name = (await ask("Enter student name: ")).trim();
  if (!name) {
    console.log("Name cannot be empty.");
    return;
  }
  const marksInput = await ask("Enter marks (0-100): ");
  const marks = toNumberSafe(marksInput);
  if (!Number.isFinite(marks) || marks < 0 || marks > 100) {
    console.log("Invalid marks. Please enter a number between 0 and 100.");
    return;
  }
  addStudent(name, marks);
  console.log(`✅ Added ${name} with ${marks} marks (grade: ${calculateGrade(marks)}).`);
}

// --- View Details (via name) ---
async function viewDetails() {
  if (students.length === 0) {
    console.log("No students added yet.");
    return;
  }
  const name = (await ask("Enter student name to view details: ")).trim();
  const s = students.find((x) => x.name.toLowerCase() === name.toLowerCase());
  if (!s) {
    console.log(`No student found with name "${name}".`);
    return;
  }
  console.log("\n# Student Details");
  console.log("----------------------------");
  console.log(`Name  : ${s.name}`);
  console.log(`Marks : ${s.marks}`);
  console.log(`Grade : ${s.grade}`);
  console.log(`Passed: ${s.passed ? "Yes" : "No"}`);
  console.log("----------------------------\n");
}

// --- Delete Student(s) ---
async function deleteMenu() {
  if (students.length === 0) {
    console.log("No students to delete.");
    return;
  }
  console.log("\nDelete Options:");
  console.log("1) Delete by name");
  console.log("2) Delete ALL failed students (dynamic)");
  const choice = (await ask("Choose 1-2: ")).trim();
  switch (choice) {
    case "1": {
      const name = (await ask("Enter name to delete: ")).trim();
      const ok = deleteStudentByName(name);
      console.log(ok ? `🗑️ Deleted "${name}".` : `No student found with name "${name}".`);
      break;
    }
    case "2": {
      const removed = deleteAllFailedStudents();
      console.log(removed > 0 ? `🗑️ Removed ${removed} failed student(s).` : "No failed students to remove.");
      break;
    }
    default:
      console.log("Invalid option.");
  }
}


// --- Main Menu (switch case) ---
async function mainMenu() {
  let exit = false;
  while (!exit) {
    console.log("Choose an option:");
    console.log("1) Add student");
    console.log("2) Display all students");
    console.log("3) Show topper (1st position)");
    console.log("4) Display passed students");
    console.log("5) Show total & average marks");
    console.log("6) View details (by name)");
    console.log("7) Delete student(s)");
    console.log("0) Exit");
    const choice = (await ask("Enter choice: ")).trim();

    // REQUIRED: Use switch case for actions
    switch (choice) {
      case "1":
        await inputStudent();
        break;
      case "2":
        displayStudents();
        break;
      case "3":
        showTopper();
        break;
      case "4":
        showPassedOnly();
        break;
      case "5":
        showTotals();
        break;
      case "6":
        await viewDetails();
        break;
      case "7":
        await deleteMenu();
        break;
      case "0":
        exit = true;
        break;
      default:
        console.log("Invalid choice. Please try again.");
    }

    console.log(); // spacing
  }
  rl.close();
  console.log("👋 Goodbye!");
}

// Start the app
mainMenu().catch((err) => {
  console.error("Unexpected error:", err);
  rl.close();
});

