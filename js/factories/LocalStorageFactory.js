
/************** LOCALSTORAGE FACTORY ********************/
app.factory('LocalStorageFactory', function($state){

	//Save les datas dans le localstorage
	var setItem = function(datas){
		this.razLocalStorage();
		localStorage.setItem('followyourmoney', JSON.stringify(datas));
	}

	//Get localstorage datas
	var getItem = function(){
		return JSON.parse(localStorage.getItem('followyourmoney'));
	}

	//Raz le localstorage
	var clearLocalStorage = function(){
		localStorage.clear(); 
	}

	return{
		setItem : setItem,
		getItem : getItem,
		clearLocalStorage : clearLocalStorage
	}

});