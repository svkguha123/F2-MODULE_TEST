let idCount = 0;
let studentList = [];

function addingStudent() {

    const nameVal = document.getElementById('name').value;
    const emailVal = document.getElementById('email').value;
    const ageVal = document.getElementById('age').value;
    const gradeVal = document.getElementById('grade').value;
    const degreeVal = document.getElementById('degree').value;


    if (nameVal == '' || emailVal == '' || ageVal == '' || gradeVal == '' || degreeVal == "") {
        alert("All fields are not fill")
        return;
    }

    
    idCount++;

    studentList.push({
        ID: idCount, 
        name: nameVal, 
        email: emailVal, 
        age: ageVal, 
        grade: gradeVal, 
        degree: degreeVal
    });

    
    localStorage.setItem("studentList", JSON.stringify(studentList));

   
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('age').value = "";
    document.getElementById('grade').value = "";
    document.getElementById('degree').value = "";
    console.log(studentList);
    showingTable();
}

function showingTable() {
    const table = document.getElementById('tbody');
    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }

    table.value = "";
    studentList.forEach((student) => {
        const row = document.createElement("tr");

        let keys = Object.keys(student);
        let id = document.createElement('td');

        const name = document.createElement('td');
        const email = document.createElement('td');
        const age = document.createElement('td');
        const grade = document.createElement('td');
        const degree = document.createElement('td');

        keys.forEach((key) => {
            if (key == 'ID') {
                id.innerHTML = student[key];
            }
            else if (key == 'name') {
                name.innerHTML = student[key];
            }
            else if (key == 'email') {
                email.innerHTML = student[key];
            }
            else if (key == 'age') {
                age.innerHTML = student[key];
            }
            else if (key == 'grade') {
                grade.innerHTML = student[key];
            }
            else
                degree.innerHTML = `<div>${
                    student[key]
                }
                </div> <div class="icons"><a onClick="edit(${student['ID']})" class='fa'>&#xf044;</a> <a onClick="del(${student['ID']})" class='fa'>&#xf1f8;</a> </div> `;

            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(email);
            row.appendChild(age);
            row.appendChild(grade);
            row.appendChild(degree);
        })
        table.appendChild(row);
    })
}

function searching() {
    let input, filter, table, tr, td, i, txtValue, txtValue1, txtValue2;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("tbody");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        td1 = tr[i].getElementsByTagName("td")[2];
        td2 = tr[i].getElementsByTagName("td")[5];

        if (td || td1 || td2) {
            txtValue = td.textContent || td.innerText;
            txtValue1 = td1.textContent || td1.innerText;
            txtValue2 = td2.textContent || td2.innerText;

            if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue1.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            }

            else {
                tr[i].style.display = "none";
            }

        }
    }
}

function edit(id) {
    studentList.forEach((student) => {
        if (student['ID'] == id) {
            document.getElementById('name').value = student['name'];
            document.getElementById('email').value = student['email'];
            document.getElementById('age').value = student['age'];
            document.getElementById('grade').value = student['grade'];
            document.getElementById('degree').value = student['degree'];
            document.getElementById('submit').innerText = 'Edit Student';

            document.getElementById("submit").onclick = function jsFunc() {

                student['name'] = document.getElementById('name').value;
                student['email'] = document.getElementById('email').value;
                student['age'] = document.getElementById('age').value;
                student['grade'] = document.getElementById('grade').value;
                student['degree'] = document.getElementById('degree').value;

                document.getElementById('name').value = "";
                document.getElementById('email').value = "";
                document.getElementById('age').value = "";
                document.getElementById('grade').value = "";
                document.getElementById('degree').value = "";

                document.getElementById('submit').innerText = 'Add Student';

                showingTable();
            }
        }
    })
}

function del(id) {
    studentList.forEach((student, index) => {
        if (student['ID'] == id) {
            studentList.splice(index, 1);
            showingTable();
        }
    })
}

window.onload = () => {
    studentList = JSON.parse(localStorage.getItem('studentList')) || [];
    idCount = studentList.reduce((max, student) => Math.max(max, student.ID), 0);
    showingTable();
};

window.onbeforeunload = () => {
    localStorage.setItem('studentList', JSON.stringify(studentList));
};
