/*********************** Controller de la home page ****************/

app.controller('HomeCtrl',function($scope, $rootScope, categories, NotificationFactory, UserFactory){
	//Stockage du this
	var home = this;


    home.head ={
			date:"Date",
			name: "Titre",
			montant: "Montant",
			categorie: "Categorie"
		};

	$scope.user = UserFactory.getUser();

});


	home.body =[{
			date: "10/05",
			name: "Cinema Star Trek",
			montant: "15",
			categorie: "Shopping"
		},{
			date: "08/05",
			name: "Theatre La luciernaga",
			montant: "10",
			categorie: "Sorties"
		},
			{
				date: "09/05",
				name: "Parque Asterix",
				montant: "55",
				categorie: "Vacances"
			}
		];

    home.sort = {
        column: 'name',
        descending: false
    };

    $scope.selectedProp = 'date';/* utilise pour le trie*/
    $scope.isReversed = true; /* utilise pour le trie*/

    $scope.changeOrder = function(prop) {
        $scope.selectedProp = prop;
        $scope.isReversed = !$scope.isReversed;
    };

    $scope.categories = categories.categories;

    $scope.customFilter = function(element) {

        var val = ($scope.modelCategory)?$scope.modelCategory : 'all';/*il vient du select*/
        console.log(val);
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
})
