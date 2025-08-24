
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let search = document.getElementById("search");
let TableBody = document.getElementById("tbody") ;
let btnDeleteAll = document.getElementById("deleteAll");
let mood = "create" ;
let currentIndex ;
//get total
const getTotal = ()=> {
    total.innerHTML= "";
    total.style.backgroundColor= "#993838";
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value - +discount.value);
        total.innerHTML = result ;
        total.style.backgroundColor= "#008000" ;
    }
}

let ProductsData ;
if(localStorage.product != null) {
    ProductsData = JSON.parse(localStorage.product);
}
else 
    ProductsData=[];

//create product
create.onclick = () => {
    let newProduct = {
        title : title.value ,
        price : price.value , 
        taxes : taxes.value , 
        ads :   ads.value , 
        discount : discount.value , 
        total : total.innerHTML ,
        count : count.value , 
        category : category.value
    } ;

    if (mood === "create"){

        if(newProduct.count>1){
            for(let i =0 ; i < newProduct.count ; i++) {
                    ProductsData.push(newProduct) ;
            }
        }
        else   
             ProductsData.push(newProduct) ;
    }
    else
    {
        ProductsData[currentIndex] = newProduct ;
        create.innerText=''
        create.innerText="Create"
        count.style.display="block";

    }


    localStorage.setItem("product" , JSON.stringify(ProductsData) );
    ClearData();
    ReadData();
}

//clear inputs
const ClearData = ()=> {
    title.value = "" ;
 
    price.value = ""  ;

    taxes.value = ""  ;

    ads.value = ""  ;
  
    discount.value = "" ;
    
    total.innerHTML = "" ;
    
    count.value = ""  ;

    category.value = "" ;

}

//read 
const ReadData = ()=> {
    getTotal();
    TableBody.innerHTML = ''
    ProductsData.forEach((product, index) => {
    TableBody.innerHTML += `
        <tr>
            <td>${index}</td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.taxes}</td>
            <td>${product.ads}</td>
            <td>${product.discount}</td>
            <td>${product.total}</td>
            <td>${product.category}</td>
            <td><button onclick=UpdateData(${index}) class="update">Update</button></td>
            <td><button onclick=DeleteData(${index}) class="delete">Delete</button></td>
        </tr>
    `;
});
//count
    if(ProductsData.length > 0 ){
             btnDeleteAll.innerHTML=`
                <button onclick=DeleteAll()>Delete All(${ProductsData.length})</button>
             `          
    }
    else 
        btnDeleteAll.innerHTML=''
}
ReadData();

//delete
const DeleteData = (index)=> {
    ProductsData.splice(index,1);
    localStorage.product = JSON.stringify(ProductsData);
    ReadData();
}

const DeleteAll =()=> {
    ProductsData.splice(0)
    localStorage.product = JSON.stringify(ProductsData);
    ReadData();
}

//update
const UpdateData = (index) => {
    title.value= ProductsData[index].title ;
    price.value= ProductsData[index].price ;
    taxes.value= ProductsData[index].taxes ;
    ads.value= ProductsData[index].ads ;
    discount.value= ProductsData[index].discount;
    total.value= ProductsData[index].total ;
    getTotal();
    category.value= ProductsData[index].category;
    count.style.display="none";
    create.innerText=''
    create.innerText="Update"
    mood = "update";
    currentIndex = index ;
    scroll({
        top : 0 ,
        behavior : "smooth"
    })
}

//search
let searchMood = "title"

const getSearchMood = (id)=> {
    if(id =="searchTitle"){
        searchMood="title" ;
        search.placeholder = "Search By Title" ;
    }
    else{
        searchMood="category" ;
        search.placeholder = "Search By Category" ;
    }
    search.focus();
    search.value= "";
    ReadData();
}

const SearchData = (value) => {

    if(searchMood == "title"){
        TableBody.innerHTML = ''
        for(let i =0 ; i <ProductsData.length ; i++){
            if(ProductsData[i].title.toLowerCase().includes(value.toLowerCase()) )
            {
                TableBody.innerHTML += `
                    <tr>
                        <td>${i}</td>
                        <td>${ProductsData[i].title}</td>
                        <td>${ProductsData[i].price}</td>
                        <td>${ProductsData[i].taxes}</td>
                        <td>${ProductsData[i].ads}</td>
                        <td>${ProductsData[i].discount}</td>
                        <td>${ProductsData[i].total}</td>
                        <td>${ProductsData[i].category}</td>
                        <td><button onclick=UpdateData(${i}) class="update">Update</button></td>
                        <td><button onclick=DeleteData(${i}) class="delete">Delete</button></td>
                    </tr>
                `;
            }
        }
    }
    else{
        TableBody.innerHTML = ''
        for(let i =0 ; i <ProductsData.length ; i++){
            if(ProductsData[i].category.toLowerCase().includes(value.toLowerCase()))
            {
                TableBody.innerHTML += `
                    <tr>
                        <td>${i}</td>
                        <td>${ProductsData[i].title}</td>
                        <td>${ProductsData[i].price}</td>
                        <td>${ProductsData[i].taxes}</td>
                        <td>${ProductsData[i].ads}</td>
                        <td>${ProductsData[i].discount}</td>
                        <td>${ProductsData[i].total}</td>
                        <td>${ProductsData[i].category}</td>
                        <td><button onclick=UpdateData(${i}) class="update">Update</button></td>
                        <td><button onclick=DeleteData(${i}) class="delete">Delete</button></td>
                    </tr>
                `;
            }
        }
    }

}
