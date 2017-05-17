
/************** LOCALSTORAGE FACTORY ********************/
app.factory('LocalStorageFactory', function($state){

	//Raz l'item du localstorage
	var removeItem = function(itemName){
		localStorage.removeItem(itemName); 
	}

	//Save les datas dans le localstorage
	var setItem = function(itemName,datas){
		localStorage.removeItem(itemName);
		localStorage.setItem(itemName, JSON.stringify(datas));
	}

	//Get localstorage datas
	var getItem = function(itemName){
		return JSON.parse(localStorage.getItem(itemName));
	}


	return{
		setItem : setItem,
		getItem : getItem,
		removeItem : removeItem
	}

});