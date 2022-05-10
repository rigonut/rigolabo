var selectedRow = null;

function onFormSubmit() {
    console.log(validate());
    console.log(formData);
    if (validate()) {
        var formData = readFormData();
        console.log(formData);
        if (selectedRow == null) {
            insertNewRecord(formData);
        } else {
            updateRecord(formData);
        }

        resetForm();
    }
}

function readFormData() {

    var formData = {};
    formData["productcode"] = document.getElementById("productcode").value;
    formData["productname"] = document.getElementById("productname").value;
    formData["etat"] = document.getElementById("etat").value;
    formData["peremtionday"] = document.getElementById("peremtionday").value;
    formData["producttype"] = document.getElementById("producttype").value;

    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("emplist").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);

    cell2 = newRow.insertCell(0);
    cell2.innerHTML = data.productcode;

    cell1 = newRow.insertCell(1);
    cell1.innerHTML = data.productname;

    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.etat;

    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.peremtionday;

    cell4 = newRow.insertCell(4);
    cell4.innerHTML = data.producttype;

    cell4 = newRow.insertCell(5);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                        <a  onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById('productcode').value = '';
    document.getElementById('productname').value = '';
    document.getElementById('etat').value = '';
    document.getElementById('peremtionday').value = '';
    document.getElementById('producttype').value = '';
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById('productcode').value = selectedRow.cells[0].innerHTML;
    document.getElementById('productname').value = selectedRow.cells[1].innerHTML;
    document.getElementById('etat').value = selectedRow.cells[2].innerHTML;
    document.getElementById('peremtionday').value = selectedRow.cells[3].innerHTML;
    document.getElementById('producttype').value = selectedRow.cells[4].innerHTML;
}

function updateRecord(formData) {

    selectedRow.cells[0].innerHTML = formData.productcode;
    selectedRow.cells[1].innerHTML = formData.productname;
    selectedRow.cells[2].innerHTML = formData.etat;
    selectedRow.cells[3].innerHTML = formData.peremtionday;
    selectedRow.cells[4].innerHTML = formData.producttype;

}

function onDelete(td) {
    if (confirm('Are you sure to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById("emplist").deleteRow(row.rowIndex);
        resetForm();
    }

}

function validate() {
    isValid = true;


    if (document.getElementById('productcode').value == "") {
        isValid = false;
        document.getElementById('productCodeValidationError').classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById('productCodeValidationError').classList.remove("hide")) {
            document.getElementById('productCodeValidationError').classList.add("hide");
        }
    }

    return isValid;
}