const submit  = document.querySelector('.submit');
const name = document.querySelector('#fname');
const contact = document.querySelector('#num');
const email = document.querySelector('#email');
const country = document.querySelector('#country');
const crudTable = document.querySelector('#crudTable');
const generatePdf = document.querySelector('#generatePdf')


let selectedRow = null
 
submit.addEventListener('click', (e)=>{
 

    const nameValue = name.value.trim();
    const contactValue = contact.value.trim();
    const emailValue = email.value.trim();
    const countryValue = country.value.trim();


    //if name is empty
    if(nameValue === '' || contactValue === '' || emailValue === '' ||countryValue === '' ){
        e.preventDefault()
        alert('Please fill the complete details');
        return false;
    }

    //if name is not given with letters  
   if(!isNaN(nameValue)){
    e.preventDefault();
    alert("please provide a valid name");
    name.focus();
    return false;
   }

  //phone num validaations
   if(contactValue.length <10 || contactValue.length >10){
    e.preventDefault();
    alert('Please provide a Valid phone number');
    contact.focus();
    return false;
}

//email validations
if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailValue)) {
    e.preventDefault();
    alert('please provide valid email');
    email.focus();
    return false;
}

if( countryValue.length>3){
    e.preventDefault();
    alert('Country  should be less than 3 number');
    country.focus();
    return false;
}
alert('DATA SAVED SUCCESSFULLY!');


if (selectedRow === null) {
    const table = document.querySelector('#crudTable tbody');
    const newRow = table.insertRow();
    newRow.innerHTML = `
        <td>${nameValue}</td>
        <td>${contactValue}</td>
        <td>${emailValue}</td>
        <td>${countryValue}</td>
        <td>
            <button class="edit" onclick="editRow(this)" style="background-color:orange;color:white">Edit</button>
            <button class="delete" onclick="deleteRow(this)" style="background-color:red;color:white">Delete</button>
        </td>
    `;
} else {
    // Update the selected row
    selectedRow.cells[0].innerText = nameValue;
    selectedRow.cells[1].innerText = contactValue;
    selectedRow.cells[2].innerText = emailValue;
    selectedRow.cells[3].innerText = countryValue;
    selectedRow = null; // Reset selectedRow after updating
    alert('Row updated!!')
}

 // Show the table after the first row is added

    crudTable.style.display = 'table';
    generatePdf.style.display = 'block'
    

//clearing the input fields
clearForm()
})

function clearForm() {
    name.value = '';
    contact.value = '';
    email.value = '';
    country.value = '';
}



//if table is empty remove the table bloc
function checkTableEmpty(){
    let tableBody = document.querySelector('#crudTable tbody');
    let rowCount = tableBody.rows.length;

    if(rowCount === 0){
         crudTable.style.display = 'none';
         generatePdf.style.display = 'none'
    }
}

// Edit a row
function editRow(button) {
    selectedRow = button.parentElement.parentElement;  //selecting entire row (tr)
    name.value = selectedRow.cells[0].innerText;
    contact.value = selectedRow.cells[1].innerText;
    email.value = selectedRow.cells[2].innerText;
    country.value = selectedRow.cells[3].innerText;
}

// Delete a row
function deleteRow(button) {
    if (confirm('Are you sure you want to delete this row?')) {
        const row = button.parentElement.parentElement;
        row.remove(); // Remove the row from the table
        checkTableEmpty();

    }
}

// PDF GENERATOR
generatePdf.addEventListener('click', ()=>{
    
    const {jsPDF} = window.jspdf;
    const doc = new jsPDF();

  const data = [];
  const rows = crudTable.querySelectorAll('tbody tr');

  rows.forEach((row) =>{
    const rowData =[];
    row.querySelectorAll('td').forEach((cell) =>{
        rowData.push(cell.innerText)              // Capture the text content of each cell
    })
    data.push(rowData)
  })


      // Define the columns headers
      const headers = [['NAME', 'CONTACT', 'EMAIL', 'COUNTRY']];

      // Using autoTable to generate the table inside the PDF
      doc.autoTable({
          head: headers, // Table headers
          body: data, // Table data
      });
  
      // Save the PDF
      doc.save("tableList.pdf");

})



