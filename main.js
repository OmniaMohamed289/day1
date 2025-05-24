// Selecting elements
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');

let mood='create';
let tmp;

// Retrieve data from localStorage or initialize an empty array
let dataPro = localStorage.product ? JSON.parse(localStorage.product) : [];

// Calculate total function
function getTotal() {
    if (price.value !== '') {
        const res = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = res;
        total.style.background = "green";
    } else {
        total.innerHTML = '';
        total.style.background = "red";
    }
}

// Get data and add to localStorage
function getData() {
    const newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    };
    const countValue = parseInt(count.value, 10) || 1; // Convert count to a number

    if (title.value !== '' && price.value !== '' && count.value !== '' && category.value !== '' && countValue < 100) {
        if (mood === 'create') {
            for (let i = 0; i < countValue; i++) {
                dataPro.push({ ...newPro }); // Add a copy of newPro
            }
        } else {
            dataPro[tmp] = newPro;
            mood = 'create';
            create.innerHTML = 'create';
            total.style.background = "red";
            count.style.display = 'block';
        }

        clearData();
    }

    localStorage.setItem('product', JSON.stringify(dataPro));
    showData();
}

// Clear all input fields
function clearData() {
    if (title.value !== '' && price.value !== '' && count.value !== '' && category.value !== '') {
        title.value = '';
        price.value = '';
        taxes.value = '';
        ads.value = '';
        discount.value = '';
        total.innerHTML = '';
        count.value = '';
        category.value = '';
    }
}


// Show data in the table
function showData() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        if (dataPro[i]) { // Check if dataPro[i] is not null or undefined
            table += `<tr>
                            <td>${i + 1}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick="updateData(${i})" class="bttn">Update</button></td>
                            <td><button onclick="deleteData(${i})" class="bttn">Delete</button></td>
                        </tr>`;
        }
    }
    document.getElementById('tbody').innerHTML = table;

    // bttnDeleteALL
    const btnDelete = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `<button class="bttn" onclick="deleteAll()">Delete All</button>`;
    } else {
        btnDelete.innerHTML = '';
    }
}

// Update data


// Delete data
function deleteData(index) {
    dataPro.splice(index, 1);
    localStorage.setItem('product', JSON.stringify(dataPro));
    showData();
}

// Delete all data
function deleteAll() {
    localStorage.clear();
    dataPro = []; // Clear the dataPro array
    showData();
}

// updateData
function updateData(index){
create.innerHTML ="UpDate";
tmp=index;
mood='update';
title.value=dataPro[index].title;
price.value=dataPro[index].price;
taxes.value=dataPro[index].taxes;
ads.value=dataPro[index].ads;
discount.value=dataPro[index].discount;
category.value=dataPro[index].category;
getTotal()
count.style.display='none';
scroll({
    top:0,
    behavior:"smooth"
})
}
// search
let searchMood='title';

function getSearchMood(id){
    let search= document.getElementById('search');
if (id=='searchTitle'){

   searchMood='title';

}
else{
    searchMood='category';

}
search.placeholder ='search by '+searchMood;

search.focus();
showData()
search.value='';

}
function searchData(value) {
    let table = '';

    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood === 'title') {

                if (dataPro[i] && dataPro[i].title && dataPro[i].title.includes(value.toLowerCase())) {
                    table += `<tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" class="bttn">Update</button></td>
                    <td><button onclick="deleteData(${i})" class="bttn">Delete</button></td>
                </tr>`;            }
            
        } else if (searchMood === 'category') {
    
                if (dataPro[i] &&  dataPro[i].category.includes(value.toLowerCase())) {
                    table += `<tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" class="bttn">Update</button></td>
                    <td><button onclick="deleteData(${i})" class="bttn">Delete</button></td>
                </tr>`;            }
            
        }
    }
    document.getElementById('tbody').innerHTML = table;

}

// Initial call to show data when page loads
showData();
