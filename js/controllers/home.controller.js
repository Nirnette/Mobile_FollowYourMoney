/*********************** Controller de la home page ****************/

app.controller('HomeCtrl',function($scope, CategoriesService, NotificationFactory, UserFactory, LocalStorageFactory){

	//Stockage du this
	var home = this;

    home.head ={
		date      : "Date",
		name      : "Expense",
		montant   : "Cost",
		/*categorie : "Categorie"*/
	};

	$scope.user 		= UserFactory.getUser();
	$scope.categories   = CategoriesService.categories;
	$scope.catIcons     = CategoriesService.icons;

	var storagedDatas = LocalStorageFactory.getItem('followyourmoney');
	home.body = storagedDatas.datas;
	console.log("body : ",home.body);

    home.sort = {
        column: 'date',
        descending: true
    };

    $scope.selectedProp = 'date';/* utilise pour le trie*/
    $scope.isReversed = true; /* utilise pour le trie*/

    $scope.changeOrder = function(prop) {
        $scope.selectedProp = prop;
        $scope.isReversed = !$scope.isReversed;
    };

    $scope.customFilter = function(element) {

        var val = ($scope.modelCategory)?$scope.modelCategory : 'all';/*il vient du select*/
      
        if (val != "all") {
        	var cat = element.categorie;
        	if(val == cat){
				return true;
			}else{
                return false;
			}

        } else {
            return true;
        }
    };
});
