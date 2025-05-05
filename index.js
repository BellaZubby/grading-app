const scoresInput = document.getElementById("scoresInput");
const calculateAverage = document.getElementById("averageButton");
const studentAverage = document.getElementById("studentAverage");
const studentName = document.getElementById("studentName");
const studentGrade = document.getElementById("studentGrade");
const teacherRemark = document.getElementById("teacherRemark");
const newEntry = document.getElementById("newEntry");
const errorMessage = document.getElementById("errorMessage");
const nameErrorMsg = document.getElementById("nameErrorMsg");
const recordsBtn = document.getElementById("recordsBtn");


// calculates the average
function getAverage(scores) {
  let sum = 0;
  //  using for loop
  for (let i = 0; i < scores.length; i++) {
    sum = sum + scores[i];
  }
  return sum / scores.length;
}
// obtains the grade
function getGrade(average) {
  if (average >= 90) {
    return "A++";
  } else if (average >= 81) {
    return "A";
  } else if (average >= 70) {
    return "B";
  } else if (average >= 55) {
    return "C";
  } else if (average >= 54) {
    return "D";
  } else if (average >= 40) {
    return "E";
  } else {
    return "F";
  }
}
// console.log(getGrade(95))

function getRemark(score) {
  if (["A++", "A", "B", "C"].includes(getGrade(score))) {
    return `${studentName.value} Passed!`;
  } else if (["D", "E"].includes(getGrade(score))) {
    return `${studentName.value} had a Weak Pass!`;
  } else {
    return `${studentName.value} Failed!`;
  }
}

// function to store student records

function saveRecord(name, validScore, average, grade, remark) {
  // get existing records or create an empty array
  let records = JSON.parse(localStorage.getItem("studentRecords")) || [];

  // creating a new student object
  const studentRecord = {
    name: name,
    scores: validScore,
    average: average.toFixed(2),
    grade: grade,
    remark: remark,
  };

  // Add new record
  records.push(studentRecord);

  // save update array back to local storage
  localStorage.setItem("studentRecords", JSON.stringify(records));
}

calculateAverage.addEventListener("click", function () {
  const name = studentName.value.trim();
  const scoreValues = scoresInput.value;

  // checks that name and score entry is not empty

  if (!name) {
    nameErrorMsg.innerHTML = `Please enter student's name`;
    return;
  } else {
    nameErrorMsg.innerHTML = "";
  }

  if (!scoreValues) {
    errorMessage.innerHTML = `Please enter student's scores.`;
    return;
  } else {
    errorMessage.innerHTML = "";
  }

  // checks if score input is valid
  const scores = scoreValues.split("\n");
  for (let i = 0; i < scores.length; i++) {
    if (isNaN(scores[i]) || !scores) {
      errorMessage.innerHTML = `Empty or Invalid entry: "${scores[i]}". Please enter a valid score value.`;
      return;
    } else {
      errorMessage.innerHTML = "";
    }
  }

  // const scores = scoreValues.split("\n").map(Number);

  const validScore = scores.map(Number);

  const average = getAverage(validScore);
  const grade = getGrade(average);
  const remark = getRemark(average);

  // color for average score
  let averageColor = "";
  if (average >= 55) {
    averageColor = "#7CCD7C";
  } else if (average >= 40 && average < 55) {
    averageColor = "yellow";
  } else {
    averageColor = "red";
  }

  studentAverage.innerHTML = `${average.toFixed(2)}`;
  studentAverage.style.color = averageColor;

  studentGrade.innerHTML = `${grade}`;
  studentGrade.style.color = averageColor;
  teacherRemark.innerHTML = `${remark}`;
  teacherRemark.style.color = averageColor;

  // store data in local storage
  localStorage.setItem("Studentname", name);
  localStorage.setItem("scoreValues", scoreValues);
  localStorage.setItem("studentAverage", studentAverage.innerHTML);
  localStorage.setItem("averageColor", averageColor);
  localStorage.setItem("studentGrade", studentGrade.innerHTML);
  localStorage.setItem("teacherRemark", teacherRemark.innerHTML);

  // store data as an object
  saveRecord(name, validScore, average, grade, remark);
});

// Load saved data on page reload
window.addEventListener("load", function () {
  const name = localStorage.getItem("Studentname");
  const scoreValues = localStorage.getItem("scoreValues");
  const storedAverage = localStorage.getItem("studentAverage");
  const averageColor = localStorage.getItem("averageColor");
  const storedGrade = localStorage.getItem("studentGrade");
  const storedRemark = localStorage.getItem("teacherRemark");

  if (name) studentName.value = name;
  if (scoreValues) scoresInput.value = scoreValues;
  if (storedAverage) {
    studentAverage.innerHTML = storedAverage;
    studentAverage.style.color = averageColor;
  }
  if (storedGrade) {
    studentGrade.innerHTML = storedGrade;
    studentGrade.style.color = averageColor;
  }
  if (storedRemark) {
    teacherRemark.innerHTML = storedRemark;
    teacherRemark.style.color = averageColor;
  }
});
// reset for new entry
newEntry.addEventListener("click", function () {
  // clear local storage
  // localStorage.clear();

  scoresInput.value = "";
  studentName.value = "";
  studentAverage.innerHTML = "";
  studentGrade.innerHTML = "";
  teacherRemark.innerHTML = "";
});
// console.log(localStorage)
// console.log(localStorage.getItem("scoreValues"))
// console.log(localStorage.getItem("studentAverage"))
// console.log(localStorage.getItem("studentGrade"))
// console.log(localStorage.getItem("teacherRemark"))
