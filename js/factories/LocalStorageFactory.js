
/************** LOCALSTORAGE FACTORY ********************/
app.factory('LocalStorageFactory', function($state){

	//Save les datas dans le localstorage
	var setItem = function(itemName,datas){
		this.clear();
		localStorage.setItem(itemName, JSON.stringify(datas));
	}

	//Get localstorage datas
	var getItem = function(itemName){
		return JSON.parse(localStorage.getItem(itemName));
	}

	//Raz le localstorage
	var clear = function(){
		localStorage.clear(); 
	}

	return{
		setItem : setItem,
		getItem : getItem,
		clear : clear
	}

});