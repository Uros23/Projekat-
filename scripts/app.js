var suma = 0;
var productCounter = 0;
var cart = [];
var productUrl = 'http://services.odata.org/V3/Northwind/Northwind.svc/Products?$format=json';
var categoriesUrl = 'http://services.odata.org/V3/Northwind/Northwind.svc/Categories?$format=json';

var allCategories = [];
var allProducts = [];
getCategories();
getProducts();

for (var i in allCategories){
    createCategoryOption(allCategories[i].CategoryID, allCategories[i].CategoryName);
    createCategoryOptionFilter(allCategories[i].CategoryID, allCategories[i].CategoryName);
   }
   
function createCategoryOption(CategoryID, CategoryName){
   
   var selectOption = document.getElementById('category');
   var option = document.createElement('option');
   option.setAttribute('value', CategoryID);
   option.innerHTML = CategoryName;
   selectOption.appendChild(option);
   
}

function createCategoryOptionFilter(CategoryID, CategoryName){
   
   var selectOption = document.getElementById('filter-category');
   var option = document.createElement('option');
   option.setAttribute('value', CategoryID);
   option.innerHTML = CategoryName;
   selectOption.appendChild(option);
   
}

function getRandomImagePath(){
    min = 1;
    max = 4;
    var rN = Math.round(Math.random() * (max-min)) + min;
    imgP = 'images/' + rN + ".jpg";
    return imgP;
}

function getProducts(){
   var products = getServiceData(productUrl).value;
  
  for (var i in products){
   products[i].imagePath = getRandomImagePath();
   products[i].datePost = new Date();
   products[i].CategoryName = getCategoryNameByCategoryID(products[i].CategoryID, allCategories);
   allProducts.push(products[i]);
   products[i].quantityInCart = 0;
   showProduct(products[i], 'katalog');
  }
}

function getCategories(){
   allCategories = getServiceData(categoriesUrl).value;
}

function getCategoryNameByCategoryID(categoryId, allCategories){
    for (var i in allCategories){
        if (allCategories[i].CategoryID == categoryId){
            return allCategories[i].CategoryName;
        }
    }
    return "Unknow category";
}

function getServiceData(url,username, password) {

    try {
	var result;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    result = JSON.parse(xmlhttp.response);
                }
                else {
                    return false;
                }
            }
        };
        xmlhttp.open("GET", url, false, username, password);
        xmlhttp.send();
		return result;
    }
    catch (err) {       
        return err;
    }
}


function getProductByProductID(productId, products){
    for(var i in products){
        if(products[i].ProductID == productId){
            return products[i];
        }
    }
    return false;
 }
 
function Add(button){

   var idd = button.id;
   quantity = document.getElementById('quantity' + idd).valueAsNumber;
   
   var product = getProductByProductID(idd, allProducts);
   
   product.quantityInCart += quantity;
   cart.push(product);
   suma += new Number (product.UnitPrice) * quantity;
   document.getElementById("suma").innerHTML =  suma;
    
}

function Remove(button) {
   
   var idd = button.id;
   quantity = document.getElementById('quantity' + idd).valueAsNumber;
   
   var product = getProductByProductID(idd, allProducts);
   
        if (product.ProductID == idd && product.quantityInCart >= quantity){
         
            product.quantityInCart -= quantity;
            suma -= new Number (product.UnitPrice) * quantity;
            document.getElementById("suma").innerHTML =  suma;
          
        }else{
            document.getElementById('remove-validity').innerHTML = 'Nije moguce ukloniti proizvod koji ne postoji u korpi';
        }
}


function showCart(){
    document.getElementById('katalog').hidden = true;
    document.getElementById('list-cart').hidden = false;
    for (var i in cart){
     if(cart[i].quantityInCart > 0)
        showProduct(cart[i], 'list-cart');
    }
}

function showCatalog(){
    document.getElementById('list-cart').innerHTML = '';
    document.getElementById('katalog').hidden = false;
    document.getElementById('list-cart').hidden = true;
    for (var i in allProducts){
        showProduct(allProducts[i], 'katalog');
        
    }
}

function Product(imagePath, UnitPrice, ProductID, ProductName, CategoryID, CategoryName, datePost) {
   this.imagePath = imagePath;
   this.UnitPrice = UnitPrice;
   this.ProductID = ProductID;
   this.ProductName = ProductName;
   this.CategoryID = CategoryID;
   this.CategoryName = CategoryName;
   this.datePost = datePost;
   this.quantityInCart = 0;
}



function createProduct(){
      productId = productCounter + 1;
      imagePath = document.getElementById('photo').value;
      imagePath = imagePath.replace("C:\\fakepath", 'images');
      price = document.getElementById('price').valueAsNumber;
      productName = document.getElementById('name').value;
      productCategory = document.getElementById('category');
      categoryName = productCategory.options[productCategory.selectedIndex].innerHTML;
      dateValue = document.getElementById('date').value;
      datePost= new Date(dateValue);
     
    if (price > 0  && productName != '' ){
      product = new Product(imagePath, price, productId, productName,  null, categoryName, datePost);
      allProducts.push(product);
      showProduct(product, 'katalog');
    }else{
     document.getElementById('validity').innerHTML = 'Polja product name i price nisu pravilno popunjena';
    }
 }

function showProduct(product, idList){
      
      productCounter++;
      var idProizvoda = product.ProductID;
      
      var li = document.createElement('li');
      var ul = document.getElementById(idList);
      ul.appendChild(li);
      
      var imgBox = document.createElement('div');
      imgBox.setAttribute('class', 'img-box');
      li.appendChild(imgBox);
      
      var image = document.createElement('img');
      image.src = product.imagePath;
      imgBox.appendChild(image);
      
      var name = document.createElement('p');
      name.innerHTML = product.ProductName;
      li.appendChild(name);
      
      var category = document.createElement('p');
      category.innerHTML = product.CategoryName;
      li.appendChild(category);
      
      var priceBox = document.createElement('div');
      priceBox.setAttribute('class', 'price-box');
      li.appendChild(priceBox);
      
      if (idList == "list-cart"){
        var p = document.createElement("p");
        p.setAttribute("id", "quantity-cart");
        p.innerHTML = 'Cart Quantity : ' + product.quantityInCart;
        priceBox.appendChild(p);
      }
      
      var pr = document.createElement('p');
      pr.innerHTML = product.UnitPrice;
      pr.id = 'price' + idProizvoda;
      priceBox.appendChild(pr);
      
      var input4 = document.createElement('input');
      input4.setAttribute ('type', 'number');
      input4.setAttribute ('id', 'quantity' + idProizvoda);
      input4.setAttribute ('value', '1');
      priceBox.appendChild(input4);
      
      var button1 = document.createElement('button');
      button1.setAttribute ('type', 'button');
      button1.setAttribute ('id', idProizvoda);
      button1.setAttribute ('onclick', 'Add(this);');
      button1.innerHTML = 'Add';
      priceBox.appendChild(button1);
      
      var button2 = document.createElement('button');
      button2.setAttribute ('type', 'button');
      button2.setAttribute ('id', idProizvoda);
      button2.setAttribute ('onclick', 'Remove(this);');
      button2.innerHTML = 'Remove';
      priceBox.appendChild(button2);
      
      var date = document.createElement('p');
      date.innerHTML = product.datePost.getDate() + "." + (product.datePost.getMonth() + 1) + "." + product.datePost.getFullYear();
      priceBox.appendChild(date);
      
      if (idList == "list-cart"){
        var a = document.createElement("a");
        a.setAttribute('id', 'remove-validity');
        priceBox.appendChild(a);
      }
   }
   
function showProducts(products){
    for(var i in products){
        showProduct(products[i], 'katalog');
    }
}
   
function search(){
 
     var searchCategoryId = document.getElementById('filter-category').value;
     var searchValue = document.getElementById('filter').value.toUpperCase();
     
     if(searchCategoryId != 0){
      
      clearAllProducts();
      
      products1 = getProductsByCategoryId(searchCategoryId, allProducts);
        if(searchValue != ""){
           products2 = getProductsBySearchValue(searchValue, products1);
           showProducts(products2);
       }
         else {
           showProducts(products1);
       }
     }
     else {
      if(searchValue != '') {
       
       clearAllProducts();
       
       products1 = getProductsBySearchValue(searchValue, allProducts);
       showProducts(products1);
      }
      else {
       clearAllProducts();
       showProducts(allProducts);
      }
   }
}

function getProductsBySearchValue(searchValue, products){
 var result = [];
    for (var i in products) {
     if(products[i].ProductName.toUpperCase().indexOf(searchValue)!=-1 || products[i].CategoryName.toUpperCase().indexOf(searchValue) != -1){
      result.push(products[i]);
     }
    }
    return result;
}

function getProductsByCategoryId(searchCategoryId, products) {
 var result = [];
    for (var i in products) {
     if(products[i].CategoryID == searchCategoryId){
      result.push(products[i]);
     }
    }
    return result;
}

function clearAllProducts(){
 document.getElementById('katalog').innerHTML = "";
}


function openForm(){
    var open = document.getElementById("form-product");
    open.style.display = "block";
}

function closeForm() {
    var close = document.getElementById("form-product");
    close.style.display = "none";
}

