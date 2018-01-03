
//poziva se na klik dugmeta za pretragu
function search(){

	//pretpostavljamo da imamo sve proizvode u globalnoj promenljivoj products
	// ako nemamo onda pozovemo servis kako bismo dobili sve proizvode u products
	
	var searchCategoryId = vrednost izabrana u drop-down-u za pretragu po kategorijama;
	var searchValue = vrednost ukucana u ptext box za search;

	if(searchCategoryId != "all"){
		clearAllProducts();
		products1 = getProductsByCategoryId(searchCategoryId, products);
		if(searchValue != ""){
			products2 = getProductsBySearchValue(searchValue, products1);
			showProducts(products2);
		}
		else{
			showProducts(products1);
		}
	}
	else{
		if(searchValue != ""){
			clearAllProducts();
			products1 = getProductsBySearchValue(searchValue, products);
			showProducts(products1);
		}
		else{
			clearAllProducts();
			showProducts(products);
		}
	}

}

function getProductsBySearchValue(searchParam, products)
	var result = []
	for petlja po products{
		if(ime proizvoda sadrzi searchParam ili ime kategorije proizvoda sadrzi searchParam){
			result.push(product);
		}
	}

	return result;
}

function getProductsByCategoryId(categoryId, products)
	var result = []
	for petlja po products{
		if(id kategorije jednak categoryId){
			result.push(product);
		}
	}

	return result;
}

function clearAllProducts(){
	document.getElementById("idTagaUKomeSuSviProizvodi").innerHTML="";
}