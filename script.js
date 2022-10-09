var selectedRow = null;

function onFormSubmit() {
  if (validateForm()) {  //check foe vallidate
    var formData = readFormData();
    if (selectedRow == null) insertNewRecord(formData);
    else updateRecord(formData);
    resetForm();
  }
}

// get the hobbies or checkbox
function checkBox() {
  var checkboxes = document.getElementsByName("hobbies"); 
    let values = [];
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        values.push(checkbox.value);
      } 
    });
    // if(values.length < 3){
      
    // }
    return values;
}

// get the data
function  readFormData () {
  var formData = {};
  formData["name"] = document.getElementById("name").value;
  formData["age"] = document.getElementById("age").value;
  formData["mobileNumber"] = document.getElementById("mobileNumber").value;
  formData["email"] = document.getElementById("email").value;
  formData["address"] = document.getElementById("address").value;
  formData["gender"] = document.myForm.gender.value;
  formData["hobbies"] = this.checkBox(); //call the checkbox function for get the hobbies value

  return formData;
}

// insert data into table
function insertNewRecord(data) {
  var table = document.getElementById("demo").getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.name;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.age;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.mobileNumber;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.email;
  cell5 = newRow.insertCell(4);
  cell5.innerHTML = data.address;
  cell6 = newRow.insertCell(5);
  cell6.innerHTML = data.gender;
  cell7 = newRow.insertCell(6);
  cell7.innerHTML = data.hobbies;
  cell8 = newRow.insertCell(7);
  cell8.innerHTML = `<a style="color: blue;"onClick="onEdit(this)">Edit</a>`;
  cell9 = newRow.insertCell(8);
  cell9.innerHTML = `<a style="color: blue;" onClick="onDelete(this)">Delete</a>`;
}

//for the uncheck checkbox
function check(checked = false) {
  const cbs = document.querySelectorAll('input[name="hobbies"]');
  cbs.forEach((cb) => {
      cb.checked = checked;
  });
}

// reset the all value from the from
function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("mobileNumber").value = "";
  document.getElementById("email").value = "";
  document.getElementById("address").value = "";
  document.myForm.hobbies.value = check() ;
  document.myForm.gender.value = "";
  selectedRow = null;
}

// edit and get the old value in form
function onEdit(td) {
  document.getElementById("add").click(); //add button click event
  selectedRow = td.parentElement.parentElement;
  document.getElementById("name").value = selectedRow.cells[0].innerHTML;
  document.getElementById("age").value = selectedRow.cells[1].innerHTML;
  document.getElementById("mobileNumber").value =selectedRow.cells[2].innerHTML;
  document.getElementById("email").value = selectedRow.cells[3].innerHTML;
  document.getElementById("address").value = selectedRow.cells[4].innerHTML;
  document.myForm.gender.value = selectedRow.cells[5].innerHTML;
  document.myForm.hobbies.value = selectedRow.cells[6].innerHTML;
}

// after editing updated value
function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.name;
  selectedRow.cells[1].innerHTML = formData.age;
  selectedRow.cells[2].innerHTML = formData.mobileNumber;
  selectedRow.cells[3].innerHTML = formData.email;
  selectedRow.cells[4].innerHTML = formData.address;
  selectedRow.cells[5].innerHTML = formData.gender;
  selectedRow.cells[6].innerHTML = formData.hobbies;
}

// delete the row from table
function onDelete(td) {
  if (confirm("Are you sure to delete this record ?")) {
    row = td.parentElement.parentElement;
    document.getElementById("demo").deleteRow(row.rowIndex);
    resetForm();
  }
}
//cencel popup
function ceneclForm() {
 if( confirm("you are sure to cencel ?")) {
  resetForm()
 }
}

// print validaton error
function printError(elemId, hintMsg) {
  document.getElementById(elemId).innerHTML = hintMsg;
}

// velidation content

function validateForm() {
  var name = document.getElementById("name").value;
  var age = document.getElementById("age").value;
  var mobileNumber = document.getElementById("mobileNumber").value;
  var email = document.getElementById("email").value;
  var address = document.getElementById("address").value;


  var nameErr = (emailErr = mobileErr = addressErr = hobbiesErr = true);

  // name validation
  if (name == "") {
    nameErr = false;
    printError("nameErr", "Please enter your name");
  } else {
    var regex = /^[a-zA-Z\s]+$/;
    if (regex.test(name) === false) {
      nameErr = false;
      printError("nameErr", "Please enter a valid name");
    } else {
      printError("nameErr", "");
      nameErr = true;
    }
  }

  //email validation
  if (email == "") {
    emailErr = false;
    printError("emailErr", "Please enter your email address");
  } else {
    // Regular expression for basic email validation
    var regex = /^\S+@\S+\.\S+$/;
    if (regex.test(email) === false) {
      emailErr = false;
      printError("emailErr", "Please enter a valid email address");
    } else {
      printError("emailErr", "");
      emailErr = true;
    }
  }

  //mobile Numbre validation
  if (mobileNumber == "") {
    mobileErr = false;
    printError("mobileErr", "Please enter your mobile number");
  } else {
    var regex = /^[1-9]\d{9}$/;
    if (regex.test(mobileNumber) === false) {
      mobileErr = false;
      printError("mobileErr", "Please enter a valid 10 digit mobile number");
    } else {
      printError("mobileErr", "");
      mobileErr = true;
    }
  }

  //Adderss validation
  if (address == "") {
    addressErr = false;
    printError("addressErr", "Please enter your address");
  } else {
    var regex = /^[a-zA-Z 0-9 (,)\s]+$/;
    if (regex.test(address) === false) {
      addressErr = false;
      printError("addressErr", "Please enter a valid address");
    } else {
      printError("addressErr", "");
      addressErr = true;
    }
  }

  // get checkbox 
  let checkBoxValue = checkBox()

  // get minimum 3 value from checkbox validation
  if(checkBoxValue.length < 3){
    printError("hobbiesErr", "minimum 3 hobbies require")
    hobbiesErr = false;

  }else {
    printError("hobbiesErr", "");
    hobbiesErr = true;
  }

  return nameErr && emailErr && mobileErr && addressErr && hobbiesErr;
}