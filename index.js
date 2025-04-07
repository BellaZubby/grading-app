// calculates the average
function getAverage(scores) {
    let sum = 0;
    //  using for loop
    for (let i = 0; i < scores.length; i++) {
        sum = sum + scores[i];
    }
    return sum/scores.length  
}
// obtains the grade
function getGrade(average) {
    if (average >= 95) {
        return "A++"
    }else if (average >= 81) {
        return "A"
    }else if (average >= 70) {
        return "B"
    }else if (average >=60) {
        return "C"
    }else if (average >= 50) {
        return "D"
    }else if (average >= 40) {
        return "E"
    }else{
        return "F"
    }
    
}
// console.log(getGrade(95))


function getRemark(score) {
    if(["A++", "A", "B", "C"].includes(getGrade(score))) {
        return `${studentName.value} Passed!`
    }else if (["D", "E"].includes(getGrade(score))){
        return `${studentName.value} had a Weak Pass!`
    }else{
        return `${studentName.value} Failed!`
    }
}
// console.log(getRemark(5))


const scoresInput = document.getElementById("scoresInput");
const calculateAverage = document.getElementById("averageButton");
const studentAverage = document.getElementById("studentAverage");
const studentName = document.getElementById("studentName");
const studentGrade = document.getElementById("studentGrade");
const teacherRemark = document.getElementById("teacherRemark");
const newEntry = document.getElementById("newEntry");
const errorMessage = document.getElementById("errorMessage");
const nameErrorMsg = document.getElementById("nameErrorMsg");

calculateAverage.addEventListener("click", function() {
    const name = studentName.value.trim();
    const scoreValues = scoresInput.value;

    // checks that name and score entry is not empty

    if (!name) {
        nameErrorMsg.innerHTML=`Please enter student's name`
        return;
    }else{
        nameErrorMsg.innerHTML=""
    }

    if (!scoreValues) {
        errorMessage.innerHTML=`Please enter student's scores.`
        return;
    }else{
        errorMessage.innerHTML=""
    }
    
    // checks if score input is valid
    const scores = scoreValues.split("\n")
    for (let i = 0; i < scores.length; i++) {
        if (isNaN(scores[i]) || !scores) {
            errorMessage.innerHTML = `Empty or Invalid entry: "${scores[i]}". Please enter a valid score value.`
            return;
        }else{
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
    if (average >= 50) {
        averageColor = "green";
    } else if (average >= 40 && average < 50) {
        averageColor = "yellow";
    } else {
        averageColor = "red";
    }

    studentAverage.innerHTML = `${average.toFixed(2)}`
    studentAverage.style.color = averageColor;

    studentGrade.innerHTML = `${grade}`
    teacherRemark.innerHTML = `${remark}`
    
    // store data in local storage
    localStorage.setItem("Studentname", name)
    localStorage.setItem("scoreValues", scoreValues)
    localStorage.setItem("studentAverage", studentAverage.innerHTML)
    localStorage.setItem("averageColor", averageColor)
    localStorage.setItem("studentGrade", studentGrade.innerHTML)
    localStorage.setItem("teacherRemark", teacherRemark.innerHTML)
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
    if (storedGrade) studentGrade.innerHTML = storedGrade;
    if (storedRemark) teacherRemark.innerHTML = storedRemark;
});

// reset for new entry
newEntry.addEventListener("click", function(){
    // clear local storage
    localStorage.clear();
    
    scoresInput.value = "";
    studentName.value = "";
    studentAverage.innerHTML = "";
    studentGrade.innerHTML = "";
    teacherRemark.innerHTML = "";
});
console.log(localStorage)
console.log(localStorage.getItem("scoreValues"))
console.log(localStorage.getItem("studentAverage"))
console.log(localStorage.getItem("studentGrade"))
console.log(localStorage.getItem("teacherRemark"))