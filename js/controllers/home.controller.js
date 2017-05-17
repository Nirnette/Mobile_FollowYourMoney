/*********************** Controller de la home page ****************/

app.controller('HomeCtrl',function($scope, CategoriesService, NotificationFactory, UserFactory, LocalStorageFactory){

	//Stockage du this
	var home  = this;
	var myApp = new Framework7();

    home.head = {
		date      : "Date",
		name      : "Expense",
		montant   : "Cost",
	};


	$scope.user 		= UserFactory.getUser();
	$scope.categories   = CategoriesService.categories;
	$scope.catIcons     = CategoriesService.icons;

	var storagedDatas = LocalStorageFactory.getItem('followyourmoney');
	home.body = storagedDatas.datas;

    home.sort = {
        column: 'date',
        descending: true
    };

	home.showModal = function(index){

		var expense = home.body[index];
		console.log(expense);

		if(expense !== undefined){
			var html =  "<b>Cost</b> : "+expense.cost+' €<br>';
			html += "<b>Done at</b> : "+expense.location+'<br>';
			html += "<b>On</b> : "+expense.date+'<br>';
			html += "<b>Category</b> : "+expense.category+'<br>';

			if(expense.comment.length > 0)
				html += "<b>Comment</b> : "+expense.comment;
		}
		myApp.alert(html,expense.name);
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
