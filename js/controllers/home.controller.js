/*********************** Controller de la home page ****************/

app.controller('HomeCtrl',function($scope, CategoriesService){

	//Stockage du this
	var home = this;

	$scope.categories = CategoriesService.categories;

});

