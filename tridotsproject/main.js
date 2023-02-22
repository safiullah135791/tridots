const addBook = document.querySelector('#add-book');
const modal = document.querySelector('.modal');
const closBtn = document.querySelector('.close-icon')
const registerForm  = document.querySelector('#register-form');
const allInput  = document.querySelectorAll('INPUT');

addBook.onclick = function(){
    modal.classList.add('active')
}

closBtn.addEventListener('click',()=>{
    modal.classList.remove('active')
    let i;
    for(i=0;i<allInput.length;i++){
        allInput[i].value = '';
    }
})

let userData = []
const bookTitle = document.getElementById('booktitle');
const totalAmount = document.querySelector('#amount');
const publicationDate = document.getElementById('publication');
const authorName = document.querySelector('#author');

const registerBtn = document.querySelector('#register-btn');
const updateBtn = document.querySelector('#update-btn');

registerBtn.onclick = function(e){
    e.preventDefault();
    registrationData();
    getDataFormLocal();
    registerForm.reset('');
    closBtn.click();
}

if(localStorage.getItem('userData') != null){
    userData = JSON.parse(localStorage.getItem('userData'))
}
const registrationData = () =>{
    userData.push({
        booktitle : bookTitle.value,
        totalamount : totalAmount.value,
        publicationdate : publicationDate.value,
        authorname : authorName.value,
    })
    let userString = JSON.stringify(userData)
    localStorage.setItem('userData',userString)
    swal("Good job!", "Registration Successfull", "success");
}

let tableData = document.querySelector('#table-data');

let getDataFormLocal = () =>{
    tableData.innerHTML = ''
    userData.forEach((data,index)=>{
        tableData.innerHTML += `
        <tr index = '${index}'>
        <td>${index+1}</td>
        <td>${data.booktitle}</td>
        <td>${data.totalamount}</td>
        <td>${data.publicationdate}</td>
        <td>${data.authorname}</td>
        <td>
            <button class='edit-btn'><i class="fa fa-eye "></i></button>
            <button class='del-btn'><i class="fa fa-trash"></i></button>
        </td>
        </tr>
        `;
    });

    let i;
    const allDataDelete = document.querySelectorAll('.del-btn');
    for(i=0;i<allDataDelete.length;i++){
        allDataDelete[i].onclick = function(){
            let tr = this.parentElement.parentElement;
            let id = tr.getAttribute('index')
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this data!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    userData.splice(id,1)
                    localStorage.setItem('userData',JSON.stringify(userData))
                    tr.remove()
        
                  swal("Poof! Your data has been deleted!", {
                    icon: "success",
                  });
                } else {
                  swal("Your data is safe!");
                }
              });
        }
    }
    let alEditBtn = document.querySelectorAll('.edit-btn');
    for(i=0;i<alEditBtn.length;i++){
        alEditBtn[i].onclick = function(){
            let tr = this.parentElement.parentElement;
            let td = tr.getElementsByTagName('TD')
            var index = tr.getAttribute('index')
            let book_title1 = td[2].getElementsByTagName('totalamount')
            
            let book_title = td[1].innerHTML
            let t_amount = td[2].innerHTML
            let date = td[3].innerHTML
            let a_uthor = td[4].innerHTML
            addBook.click()
            
            registerBtn.disabled = true;
           
            bookTitle.value = book_title
            totalAmount.value = t_amount
            publicationDate.value = date
            authorName.value = a_uthor
           
            updateBtn.disabled = false
            
            console.log(updateBtn);
            // updateBtn.style.backgroundColor = 'blue'
            
            updateBtn.onclick = function(e){
                userData[index] = {
                    booktitle : bookTitle.value,
                    totalamount : totalAmount.value,
                    publicationdate : publicationDate.value,
                    authorname : authorName.value            
                }
                localStorage.setItem("userData",JSON.stringify(userData));
            }
        }
    }
}

getDataFormLocal();

let searchEl = document.querySelector('#bookId');

searchEl.oninput = function(){
    searchFc();
}
function searchFc(){
    let tr = tableData.querySelectorAll('TR');
    let filter = searchEl.value.toLowerCase();
    let i;
    for(i=0;i<tr.length;i++){
        let book = tr[i].getElementsByTagName('TD')[1].innerHTML;
        let amount = tr[i].getElementsByTagName('TD')[2].innerHTML;
        let puplication = tr[i].getElementsByTagName('TD')[3].innerHTML;
        let author = tr[i].getElementsByTagName('TD')[4].innerHTML;
        if(book.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display = ''; 
        }
        else if(amount.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display = ''; 
        }
        else if(book.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display = ''; 
        }
        else if(puplication.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display = ''; 
        }
        else if(author.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display = ''; 
        }
        else{
            tr[i].style.display = 'none';
        }
    }
}

let delAllBtn = document.querySelector('#del-all-btn')
let allDelBox = document.querySelector('#del-all-box')

delAllBtn.addEventListener('click',()=>{
    if(allDelBox.checked == true){
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                localStorage.removeItem('userData');
                window.location = location.href;
              swal("Poof! Your data has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your data is safe!");
            }
          });
    }
    else{
        swal("Check the box!", "Please check the box to delete data", "warning");
    }
})