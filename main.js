var title = document.getElementById('title');
var price = document.getElementById('price');
var taxes = document.getElementById('taxes');
var ads = document.getElementById('ads');
var discount = document.getElementById('discount');
var total = document.getElementById('total');
var count = document.getElementById('count');
var category = document.getElementById('category');
var submit = document.getElementById('submit');

var mood ="creat"
var temp;

// get Total

function getTotal() {

    if (price.value != '') {

        var result = (+price.value + +taxes.value + +ads.value)
            - +discount.value;
        total.innerHTML = result;
        total.style.background = "#040";
    }
    else {
        total.innerHTML = "";
        total.style.background = "#a00d02";
    }

}

var dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)//اسال عليها
} else {
    dataPro = [];
}

submit.onclick = function () {
    var newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }
 

    // data[i].title
     if(title.value != '' && price.value != '' && category.value != '' && newPro.count <= 100){//اسال
        if(mood === "creat"){
            if(newPro.count > 1){ // هل ينفع نكتب count يس 
                for(var i = 0 ;i<newPro.count; i++){
                    dataPro.push(newPro);
                }
            }else{
                    dataPro.push(newPro);
                }
          }else{
            dataPro[ temp ] = newPro
            mood = "creat"
            submit.innerHTML = "Creat"
            count.style.display = 'block'
          }
          clearData();
     }

    localStorage.setItem("product", JSON.stringify(dataPro)); 
   
    showData();
}
console.log(dataPro);

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    total.style.background = "#a00d02"
    count.value = '';
    category.value = '';

}

function showData() {

    var table = '';
    for (var i = 0; i < dataPro.length; i++) {

        table += `
        <tr>
         
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})"  id="delete">delete</button></td>

    </tr> 
        `
      
         }
         document.getElementById("tbody").innerHTML = table // لو حطيناه جوا ال for loop
         var deleteData = document.getElementById("deletAll")
         if(dataPro.length > 0){
            deleteData.innerHTML = `
      <td><button onclick="deleteAll()" >delete All (${dataPro.length})</button></td>
      `
         }else{
            deleteData.innerHTML = '';
         }
}
showData()

function deleteData(i){
    dataPro.splice(i,1)
    localStorage.product = JSON.stringify(dataPro)//ازاي حولناها لي اصلهااا
    showData()

}

function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}


function updateData(i){
    title.value = dataPro[i].title
    price.value = dataPro[i].price
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    discount.value = dataPro[i].discount
    getTotal()
    count.style.display = 'none'
    category.value = dataPro[i].category
    submit.innerHTML ='Update'

    mood = "updata"
    temp = i
    scroll({
        top:0,
        behavior:'smooth'
    })

}


var searchMood = 'title';

function getSearchMood(id){    
    var search = document.getElementById("search")
    if(id == 'searchTitle'){
        searchMood = 'title';
        search.placeholder = "Search By Title";
    }else{
        searchMood = 'category'
        search.placeholder = "Search By Category"
    }
    search.focus()
    search.value = '';
    showData()
}

function searchData(value){
var table = '';
    if(searchMood == 'title'){

        for(var i =0 ; i<dataPro.length; i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                 
                <td>${i}</td>
                <td>${dataPro[i].title.replace(value , "<span>"+value+"</span>")}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})"  id="delete">delete</button></td>
        
            </tr> 
                `

            }
         document.getElementById("tbody").innerHTML = table // لو حطيناه جوا ال for loop

        }




    }else{
        for(var i =0 ; i<dataPro.length; i++){
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                 
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})"  id="delete">delete</button></td>
        
            </tr> 
                `

            }

        }
        document.getElementById("tbody").innerHTML = table // لو حطيناه جوا ال for loop

    }
}