/*********************** Controller de la home page ****************/

app.controller('HomeCtrl',function($scope, CategoriesService, NotificationFactory, UserFactory){

	//Stockage du this
	var home = this;

    home.head ={
								date      :	"Date",
								name      :	"Titre",
							  cost      :	"Montant",
							  category  :	"Categorie"
	};

	$scope.user 		= UserFactory.getUser();
	$scope.categories   = CategoriesService.categories;

	home.body =[{
							date			: "10/05",
							name			: "Cinema Star Trek",
							cost			: "15",
				    	category	: "Other"
		},{
							date			: "08/05",
							name			: "Theatre La luciernaga",
		        	cost			: "10",
		        	category	: "Outings"
		},
		{
							date			: "09/05",
							name			: "Parque Asterix",
	            cost			: "55",
	            category	: "Holidays"
		}
	];



    $scope.selectedProp = 'date';/* utilise pour le trie*/
    $scope.isReversed = true; /* utilise pour le trie*/

    $scope.changeOrder = function(prop) {
        $scope.selectedProp = prop;
        $scope.isReversed = !$scope.isReversed;
    };

    $scope.customFilter = function(element) {

        var val = ($scope.modelCategory)?$scope.modelCategory : 'all';/*il vient du select*/

        if (val != "all") {
	        	var cat = element.category;
	        	if(val == cat){
									return true;
						}else{
	                return false;
						}
        }else {
            return true;
        }
    };



});
