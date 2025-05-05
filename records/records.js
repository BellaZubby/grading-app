const clearBtn = document.getElementById("deleteRecord");
const tableBody = document.getElementById("recordsTableBody");
const recordText = document.getElementById("recordText");

function displayRecords() {
  let records = JSON.parse(localStorage.getItem("studentRecords")) || [];
  // clear existing rows before updating.
  tableBody.innerHTML = "";

  // loop through the records array to display each student stored data
  records.forEach((record, index) => {
    // for dynamic color
    let color = "";
    if (record.average >= 55) {
      color = "green";
    } else if (record.average >= 40 && record.average < 55) {
      color = "#b58b00";
    } else {
      color = "red";
    }
    let row = `
             <tr>
            <td>${index + 1}</td>
            <td>${record.name}</td>
            <td>${record.scores.join(", ")}</td>
             <td style="color: ${color};">${record.average}</td>
            <td style="color: ${color};">${record.grade}</td>
            <td style="color: ${color};">${record.remark}</td>
            </tr> 
        `;
    tableBody.innerHTML += row;
  });
  console.log(records.length);
}

window.addEventListener("load", displayRecords);

//  text message
function updateRecordMessage() {
  let records = JSON.parse(localStorage.getItem("studentRecords")) || [];

  if (records.length === 0) {
    recordText.innerHTML = "No student grades recorded.";
    localStorage.setItem("isTableEmpty", "true"); // Ensure state persists
  } else {
    recordText.innerHTML = "";
    localStorage.removeItem("isTableEmpty"); // Remove flag if records exist
  }
}
window.addEventListener("load", updateRecordMessage);

// clear record
function clearRecord() {
  localStorage.clear();
  tableBody.innerHTML = " ";
  // localStorage.setItem("isTableEmpty", "true"); // Store empty state
  updateRecordMessage();
}
// Call the function when `records.html` loads
clearBtn.addEventListener("click", clearRecord);
