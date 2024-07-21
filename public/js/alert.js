function showSubjects() {
  var selectBox = document.getElementById("subjectSelect");
  var selectedValue = selectBox.options[selectBox.selectedIndex].value;
  var subjectTable = document.getElementById("subjectTable");

  if (selectedValue === "") {
    subjectTable.innerHTML = "";
  } else {
    var subjects = [];

    switch (selectedValue) {
      case "Computer Science":
        subjects = [
          "Data Structures",
          "Algorithms",
          "Computer Networks",
          "Database Management",
          "Operating Systems",
        ];
        break;
      case "Physics":
        subjects = [
          "Classical Mechanics",
          "Quantum Mechanics",
          "Electromagnetism",
          "Thermodynamics",
          "Astrophysics",
        ];
        break;
      case "Mathematics":
        subjects = [
          "Calculus",
          "Linear Algebra",
          "Discrete Mathematics",
          "Probability Theory",
          "Number Theory",
        ];
        break;
      case "Environmental Science":
        subjects = [
          "Ecology",
          "Climate Change",
          "Environmental Policy",
          "Sustainability",
          "Conservation Biology",
        ];
        break;
      default:
        break;
    }

    var tableHTML =
      "<table><tr><th>Subjects for " + selectedValue + "</th></tr>";
    for (var i = 0; i < subjects.length; i++) {
      tableHTML += "<tr><td>" + subjects[i] + "</td></tr>";
    }
    tableHTML += "</table>";

    subjectTable.innerHTML = tableHTML;
  }
}
