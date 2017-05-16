
/************** User Factory ********************/
app.factory('UserFactory', function(){

	this.user = null;

	//Set  user
	var setUser = function(datas){
		this.user = datas;
	}

	//get  user
	var getUser = function(){
		return this.user;
	}

	return{
		setUser : setUser,
		getUser : getUser
	}

});