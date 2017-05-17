/*********************** Controller de la home page ****************/


app.controller('HomeCtrl',function($rootScope, NotificationFactory){
app.controller('HomeCtrl',function($scope, UserFactory){

	//Stockage du this
	var home = this;

	$scope.user = UserFactory.getUser();

});

