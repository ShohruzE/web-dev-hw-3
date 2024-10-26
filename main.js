document.getElementById("addRowBtn").addEventListener("click", addRow);
document.getElementById("calculateBtn").addEventListener("click", calculateGPA);
document.getElementById("resetBtn").addEventListener("click", resetForm);

function addRow() {
  const table = document.getElementById("coursesTable");
  const newRow = document.createElement("tr");
  newRow.classList.add("course-row");
  newRow.innerHTML = `
            <td class="w-1/12 text-center">
              <input type="checkbox" class="course-select" checked />
            </td>
            <td class="w-5/12">
              <input
                type="text"
                class="course-name bg-gray-100 rounded p-2 w-full"
              />
            </td>
            <td class="w-3/12">
              <select class="grade-dropdown bg-gray-100 rounded p-2 w-full">
                <option value="" selected>--</option>
                <option value="4.0">A</option>
                <option value="3.7">A-</option>
                <option value="3.3">B+</option>
                <option value="3.0">B</option>
                <option value="2.7">B-</option>
                <option value="2.3">C+</option>
                <option value="2.0">C</option>
                <option value="1.7">C-</option>
                <option value="1.3">D+</option>
                <option value="1.0">D</option>
                <option value="0.7">D-</option>
                <option value="0.0">F</option>
              </select>
            </td>
            <td class="w-2/12">
              <input
                type="number"
                class="credits-input bg-gray-100 rounded p-2 w-full"
                min="0"
              />
            </td>
            <td class="w-1/12 text-center">
              <button class="delete-row text-red-500">X</button>
            </td>
    `;
  table.appendChild(newRow);

  newRow.querySelector(".delete-row").addEventListener("click", () => {
    newRow.remove();
  });
}

function calculateGPA() {
  const rows = document.querySelectorAll(".course-row");
  let totalCredits = 0;
  let totalPoints = 0;

  rows.forEach((row) => {
    const checkbox = row.querySelector(".course-select");
    if (checkbox.checked) {
      const grade = parseFloat(row.querySelector(".grade-dropdown").value) || 0;
      const credits =
        parseFloat(row.querySelector(".credits-input").value) || 0;

      totalPoints += grade * credits;
      totalCredits += credits;
    }
  });

  const gpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : "-";
  document.getElementById("gpaResult").textContent = gpa;
}

function resetForm() {
  document.querySelectorAll(".course-row").forEach((row) => {
    if (!row.querySelector(".course-select").checked) {
      row.querySelector(".course-name").value = "";
      row.querySelector(".grade-dropdown").value = "";
      row.querySelector(".credits-input").value = "";
    }
  });
  document.getElementById("gpaResult").textContent = "-";
}
